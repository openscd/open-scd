export type Initiator = 'user' | 'system' | 'undo' | 'redo' | string;

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
export type Edit = Insert | Update | Remove | Edit[];

export function isComplex(edit: Edit): edit is Edit[] {
  return edit instanceof Array;
}

export function isInsert(edit: Edit): edit is Insert {
  return (edit as Insert).parent !== undefined;
}

export function isNamespaced(
  value: AttributeValue
): value is NamespacedAttributeValue {
  return value !== null && typeof value !== 'string';
}

export function isUpdate(edit: Edit): edit is Update {
  return (edit as Update).element !== undefined;
}

export function isRemove(edit: Edit): edit is Remove {
  return (
    (edit as Insert).parent === undefined && (edit as Remove).node !== undefined
  );
}

export interface EditEventDetail<E extends Edit = Edit> {
  edit: E;
  initiator: Initiator;
}

export type EditEvent = CustomEvent<EditEventDetail>;

export function newEditEvent<E extends Edit>(
  edit: E,
  initiator: Initiator = 'user'
): EditEvent {
  return new CustomEvent<EditEventDetail>('oscd-edit', {
    composed: true,
    bubbles: true,
    detail: {
      edit: edit,
      initiator: initiator,
    },
  });
}

declare global {
  interface ElementEventMap {
    ['oscd-edit']: EditEvent;
  }
}
