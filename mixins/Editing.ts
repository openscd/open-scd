import { property } from 'lit/decorators.js';

import {
  EditorAction,
  EditorActionEvent,
  Insert,
  isComplex,
  isInsert,
  isRemove,
  LitElementConstructor,
  OpenDocEvent,
  Remove,
} from '../foundation.js';

const nothing = new Document().createElement('nothing');
const noOp = {
  remove: { node: nothing },
  insert: { node: nothing, parent: nothing, reference: null },
};

function onInsertAction({ parent, node, reference }: Insert): Insert | Remove {
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

function onRemoveAction({ node }: Remove): Insert {
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

function onEditorAction(action: EditorAction): EditorAction {
  if (isInsert(action)) return onInsertAction(action);
  if (isRemove(action)) return onRemoveAction(action);
  if (isComplex(action)) return action.map(onEditorAction).reverse();
  throw new Error('Unknown action type');
}

type LogEntry = { undo: EditorAction; redo: EditorAction };

/** A mixin for editing a set of [[docs]] using [[EditorActionEvent]]s */
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

    private onOpenDoc({ detail: { docName, doc } }: OpenDocEvent) {
      this.docName = docName;
      this.docs[this.docName] = doc;
    }

    private onEditorActionEvent(event: EditorActionEvent) {
      const action = event.detail;
      this.history.splice(this.next);
      this.history.push({ undo: onEditorAction(action), redo: action });
      this.next += 1;
    }

    /** Undo the last `n` [[EditorAction]]s committed */
    undo(n = 1) {
      if (!this.canUndo || n < 1) return;
      onEditorAction(this.history[this.last!].undo);
      this.next -= 1;
      if (n > 1) this.undo(n - 1);
    }

    /** Redo the last `n` [[EditorAction]]s that have been undone */
    redo(n = 1) {
      if (!this.canRedo || n < 1) return;
      onEditorAction(this.history[this.next].redo);
      this.next += 1;
      if (n > 1) this.redo(n - 1);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);

      this.addEventListener('open-doc', this.onOpenDoc);
      this.addEventListener('editor-action', event =>
        this.onEditorActionEvent(event)
      );
    }
  }
  return EditingElement;
}
