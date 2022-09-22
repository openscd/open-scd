/** Intent to `parent.insertBefore(node, reference)` */
export type Insert = {
  parent: Node;
  node: Node;
  reference: Node | null;
};

/** Intent to remove a node from its ownerDocument */
export type Remove = {
  node: Node;
};

/** Represents the user's intent to change an XMLDocument */
export type EditorAction = Insert | Remove | EditorAction[];

export function isComplex(action: EditorAction): action is EditorAction[] {
  return action instanceof Array;
}

export function isInsert(action: EditorAction): action is Insert {
  return (action as Insert).parent !== undefined;
}

export function isRemove(action: EditorAction): action is Remove {
  return (
    (action as Insert).parent === undefined &&
    (action as Remove).node !== undefined
  );
}

export type EditorActionEvent<E extends EditorAction = EditorAction> =
  CustomEvent<E>;

export function newActionEvent<E extends EditorAction>(
  action: E
): EditorActionEvent<E> {
  return new CustomEvent<E>('editor-action', {
    composed: true,
    bubbles: true,
    detail: action,
  });
}

declare global {
  interface ElementEventMap {
    ['editor-action']: EditorActionEvent;
  }
}
