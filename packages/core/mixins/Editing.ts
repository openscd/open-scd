import { LitElement } from 'lit';

import { property, state } from 'lit/decorators.js';

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

function localAttributeName(attribute: string): string {
  return attribute.includes(':') ? attribute.split(':', 2)[1] : attribute;
}

function handleInsert({
  parent,
  node,
  reference,
}: Insert): Insert | Remove | [] {
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
    return [];
  }
}

function handleUpdate({ element, attributes }: Update): Update {
  const oldAttributes = { ...attributes };
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

function handleRemove({ node }: Remove): Insert | [] {
  const { parentNode: parent, nextSibling: reference } = node;
  node.parentNode?.removeChild(node);
  if (parent)
    return {
      node,
      parent,
      reference,
    };
  return [];
}

function handleEdit(edit: Edit): Edit {
  if (isInsert(edit)) return handleInsert(edit);
  if (isUpdate(edit)) return handleUpdate(edit);
  if (isRemove(edit)) return handleRemove(edit);
  if (isComplex(edit)) return edit.map(handleEdit).reverse();
  return [];
}

export type LogEntry = { undo: Edit; redo: Edit };

export interface EditingMixin {
  doc: XMLDocument;
  history: LogEntry[];
  editCount: number;
  last: number;
  canUndo: boolean;
  canRedo: boolean;
  docs: Record<string, XMLDocument>;
  docName: string;
  handleOpenDoc(evt: OpenEvent): void;
  handleEditEvent(evt: EditEvent): void;
  undo(n?: number): void;
  redo(n?: number): void;
}

type ReturnConstructor = new (...args: any[]) => LitElement & EditingMixin;

/** A mixin for editing a set of [[docs]] using [[EditEvent]]s */
export function Editing<TBase extends LitElementConstructor>(
  Base: TBase
): TBase & ReturnConstructor {
  class EditingElement extends Base {
    @state()
    /** The `XMLDocument` currently being edited */
    get doc(): XMLDocument {
      return this.docs[this.docName];
    }

    @state()
    history: LogEntry[] = [];

    @state()
    editCount: number = 0;

    @state()
    get last(): number {
      return this.editCount - 1;
    }

    @state()
    get canUndo(): boolean {
      return this.last >= 0;
    }

    @state()
    get canRedo(): boolean {
      return this.editCount < this.history.length;
    }

    /**
     * The set of `XMLDocument`s currently loaded
     *
     * @prop {Record} docs - Record of loaded XML documents
     */
    @state()
    docs: Record<string, XMLDocument> = {};

    /**
     * The name of the [[`doc`]] currently being edited
     *
     * @prop {String} docName - name of the document that is currently being edited
     */
    @property({ type: String, reflect: true }) docName = '';

    handleOpenDoc({ detail: { docName, doc } }: OpenEvent) {
      this.docName = docName;
      this.docs[this.docName] = doc;
    }

    handleEditEvent(event: EditEvent) {
      const edit = event.detail;
      this.history.splice(this.editCount);
      this.history.push({ undo: handleEdit(edit), redo: edit });
      this.editCount += 1;
    }

    /** Undo the last `n` [[Edit]]s committed */
    undo(n = 1) {
      if (!this.canUndo || n < 1) return;
      handleEdit(this.history[this.last!].undo);
      this.editCount -= 1;
      if (n > 1) this.undo(n - 1);
    }

    /** Redo the last `n` [[Edit]]s that have been undone */
    redo(n = 1) {
      if (!this.canRedo || n < 1) return;
      handleEdit(this.history[this.editCount].redo);
      this.editCount += 1;
      if (n > 1) this.redo(n - 1);
    }

    constructor(...args: any[]) {
      super(...args);

      this.addEventListener('oscd-open', this.handleOpenDoc);
      this.addEventListener('oscd-edit', event => this.handleEditEvent(event));
    }
  }
  return EditingElement;
}
