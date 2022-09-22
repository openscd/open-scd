/** Intent to `parent.insertBefore(node, reference)` */
export type Insert = {
  parent: Node;
  node: Node;
  reference: Node | null;
};

export type NamespacedAttributeValue = {
  value: string | null;
  namespaceURI: string | null;
};
export type AttributeValue = string | null | NamespacedAttributeValue;
/** Intent to set or remove (if null) attributes on element */
export type Update = {
  element: Element;
  attributes: Partial<Record<string, AttributeValue>>;
};

/** Intent to remove a node from its ownerDocument */
export type Remove = {
  node: Node;
};

/** Represents the user's intent to change an XMLDocument */
export type EditorAction = Insert | Update | Remove | EditorAction[];

export function isComplex(action: EditorAction): action is EditorAction[] {
  return action instanceof Array;
}

export function isInsert(action: EditorAction): action is Insert {
  return (action as Insert).parent !== undefined;
}

export function isNamespaced(
  value: AttributeValue
): value is NamespacedAttributeValue {
  return value !== null && typeof value !== 'string';
}

export function isUpdate(action: EditorAction): action is Update {
  return (action as Update).element !== undefined;
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
