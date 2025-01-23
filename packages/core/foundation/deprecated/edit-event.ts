/**
 * @deprecated Use the new edit event V2 API instead.
 */
export type Initiator = 'user' | 'system' | 'undo' | 'redo' | string;

/**
 * @deprecated Use the new edit event V2 API instead.
 */
export type Insert = {
  parent: Node;
  node: Node;
  reference: Node | null;
};

/**
 * @deprecated Use the new edit event V2 API instead.
 */
export type NamespacedAttributeValue = {
  value: string | null;
  namespaceURI: string | null;
};
/**
 * @deprecated Use the new edit event V2 API instead.
 */
export type AttributeValue = string | null | NamespacedAttributeValue;
/**
 * @deprecated Use the new edit event V2 API instead.
 */
export type Update = {
  element: Element;
  attributes: Partial<Record<string, AttributeValue>>;
};

/**
 * @deprecated Use the new edit event V2 API instead.
 */
export type Remove = {
  node: Node;
};

/**
 * @deprecated Use the new edit event V2 API instead.
 */
export type Edit = Insert | Update | Remove | Edit[];

/**
 * @deprecated Use the new edit event V2 API instead.
 */
export function isComplex(edit: Edit): edit is Edit[] {
  return edit instanceof Array;
}

/**
 * @deprecated Use the new edit event V2 API instead.
 */
export function isInsert(edit: Edit): edit is Insert {
  return (edit as Insert).parent !== undefined;
}

/**
 * @deprecated Use the new edit event V2 API instead.
 */
export function isNamespaced(
  value: AttributeValue
): value is NamespacedAttributeValue {
  return value !== null && typeof value !== 'string';
}

/**
 * @deprecated Use the new edit event V2 API instead.
 */
export function isUpdate(edit: Edit): edit is Update {
  return (edit as Update).element !== undefined;
}

/**
 * @deprecated Use the new edit event V2 API instead.
 */
export function isRemove(edit: Edit): edit is Remove {
  return (
    (edit as Insert).parent === undefined && (edit as Remove).node !== undefined
  );
}

/**
 * @deprecated Use the new edit event V2 API instead.
 */
export interface EditEventDetail<E extends Edit = Edit> {
  edit: E;
  initiator: Initiator;
}

/**
 * @deprecated Use the new edit event V2 API instead.
 */
export type EditEvent = CustomEvent<EditEventDetail>;

/**
 * @deprecated Use the new edit event V2 API instead.
 */
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
