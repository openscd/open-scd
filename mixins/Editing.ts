import { property } from 'lit/decorators.js';

import {
  AttributeValue,
  Edit,
  EditEvent,
  Insert,
  isComplex,
  isInsert,
  isNamespaced,
  isRemove,
  isUpdate,
  LitElementConstructor,
  OpenEvent,
  Remove,
  Update,
} from '../foundation.js';

const nothing = new Document().createElement('nothing');
const noOp = {
  remove: { node: nothing },
  update: { element: nothing, attributes: {} },
  insert: { node: nothing, parent: nothing, reference: null },
};

function localAttributeName(attribute: string): string {
  return attribute.includes(':') ? attribute.split(':', 2)[1] : attribute;
}

function handleInsert({ parent, node, reference }: Insert): Insert | Remove {
  try {
    const { parentNode, nextSibling } = node;
    parent.insertBefore(node, reference);
    if (parentNode)
      return {
        node,
        parent: parentNode,
        reference: nextSibling,
      };
    return { node };
  } catch (e) {
    // do nothing if insert doesn't work on these nodes
    return noOp.remove;
  }
}

function handleUpdate({ element, attributes }: Update): Update {
  let oldAttributes: typeof attributes = {};
  if (Object.hasOwnProperty.call(attributes, '__proto__'))
    oldAttributes = { ['__proto__']: undefined }; // make __proto__ settable
  Object.entries(attributes)
    .reverse()
    .forEach(([name, value]) => {
      let oldAttribute: AttributeValue;
      if (isNamespaced(value!))
        oldAttribute = {
          value: element.getAttributeNS(
            value.namespaceURI,
            localAttributeName(name)
          ),
          namespaceURI: value.namespaceURI,
        };
      else
        oldAttribute = element.getAttributeNode(name)?.namespaceURI
          ? {
              value: element.getAttribute(name),
              namespaceURI: element.getAttributeNode(name)!.namespaceURI!,
            }
          : element.getAttribute(name);
      oldAttributes[name] = oldAttribute;
    });
  for (const entry of Object.entries(attributes)) {
    try {
      const [attribute, value] = entry as [string, AttributeValue];
      if (isNamespaced(value)) {
        if (value.value === null)
          element.removeAttributeNS(
            value.namespaceURI,
            localAttributeName(attribute)
          );
        else element.setAttributeNS(value.namespaceURI, attribute, value.value);
      } else if (value === null) element.removeAttribute(attribute);
      else element.setAttribute(attribute, value);
    } catch (e) {
      // do nothing if update doesn't work on this attribute
      delete oldAttributes[entry[0]];
    }
  }
  return {
    element,
    attributes: oldAttributes,
  };
}

function handleRemove({ node }: Remove): Insert {
  const { parentNode: parent, nextSibling: reference } = node;
  node.parentNode?.removeChild(node);
  if (parent)
    return {
      node,
      parent,
      reference,
    };
  return noOp.insert;
}

function handleEdit(edit: Edit): Edit {
  if (isInsert(edit)) return handleInsert(edit);
  if (isUpdate(edit)) return handleUpdate(edit);
  if (isRemove(edit)) return handleRemove(edit);
  if (isComplex(edit)) return edit.map(handleEdit).reverse();
  throw new Error('Unknown edit type');
}

export type LogEntry = { undo: Edit; redo: Edit };

/** A mixin for editing a set of [[docs]] using [[EditEvent]]s */
export function Editing<TBase extends LitElementConstructor>(Base: TBase) {
  class EditingElement extends Base {
    /** The `XMLDocument` currently being edited */
    get doc(): XMLDocument {
      return this.docs[this.docName];
    }

    private history: LogEntry[] = [];

    private next: number = 0;

    private get last(): number | undefined {
      return this.next > 0 ? this.next - 1 : undefined;
    }

    private get canUndo(): boolean {
      return this.last !== undefined;
    }

    private get canRedo(): boolean {
      return this.next < this.history.length;
    }

    /** The set of `XMLDocument`s currently loaded */
    @property({ attribute: false })
    docs: Record<string, XMLDocument> = {};

    /** The name of the [[`doc`]] currently being edited */
    @property({ type: String }) docName = '';

    protected onOpenDoc({ detail: { docName, doc } }: OpenEvent) {
      this.docName = docName;
      this.docs[this.docName] = doc;
    }

    protected handleEditEvent(event: EditEvent) {
      const edit = event.detail;
      this.history.splice(this.next);
      this.history.push({ undo: handleEdit(edit), redo: edit });
      this.next += 1;
    }

    /** Undo the last `n` [[Edit]]s committed */
    undo(n = 1) {
      if (!this.canUndo || n < 1) return;
      handleEdit(this.history[this.last!].undo);
      this.next -= 1;
      if (n > 1) this.undo(n - 1);
    }

    /** Redo the last `n` [[Edit]]s that have been undone */
    redo(n = 1) {
      if (!this.canRedo || n < 1) return;
      handleEdit(this.history[this.next].redo);
      this.next += 1;
      if (n > 1) this.redo(n - 1);
    }

    constructor(...args: any[]) {
      super(...args);

      this.addEventListener('oscd-open', this.onOpenDoc);
      this.addEventListener('oscd-edit', event => this.handleEditEvent(event));
    }
  }
  return EditingElement;
}
