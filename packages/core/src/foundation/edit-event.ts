/** 
 * @since 0.0.1
 * 
 * Intent to `parent.insertBefore(node, reference)` 
 */
export type Insert = {
  parent: Node;
  node: Node;
  reference: Node | null;
};

/**
 * @since 0.0.1
 */
export type NamespacedAttributeValue = {
  value: string | null;
  namespaceURI: string | null;
};

/**
 * @since 0.0.1
 */
export type AttributeValue = string | null | NamespacedAttributeValue;

/** 
 * @since 0.0.1
 * 
 * Intent to set or remove (if null) attributes on element 
 */
export type Update = {
  element: Element;
  attributes: Partial<Record<string, AttributeValue>>;
};

/** 
 * @since 0.0.1
 * 
 * Intent to remove a node from its ownerDocument 
 */
export type Remove = {
  node: Node;
};

/** 
 * @since 0.0.1
 * 
 * Represents the user's intent to change an XMLDocument 
 */
export type Edit = Insert | Update | Remove | Edit[];

/**
 * @since 0.0.1
 * 
 * @param edit {@link Edit}
 * 
 * @returns Edit[] {@link Edit} 
 */
export function isComplex(edit: Edit): edit is Edit[] {
  return edit instanceof Array;
}


/**
 * @since 0.0.1
 * 
 * @param edit {@link Edit}
 * 
 * @returns Insert {@link Insert}
 */
export function isInsert(edit: Edit): edit is Insert {
  return (edit as Insert).parent !== undefined;
}

/**
 * @since 0.0.1
 * 
 * @param value {@link AttributeValue}
 * @returns NamespacedAttributeValue {@link NamespacedAttributeValue}
 */
export function isNamespaced(
  value: AttributeValue
): value is NamespacedAttributeValue {
  return value !== null && typeof value !== 'string';
}

/**
 * @since 0.0.1
 * 
 * @param edit {@link Edit}
 * @returns Update {@link Update}
 */
export function isUpdate(edit: Edit): edit is Update {
  return (edit as Update).element !== undefined;
}

/**
 * @since 0.0.1
 * 
 * @param edit {@link Edit}
 * @returns Remove {@link Remove}
 */
export function isRemove(edit: Edit): edit is Remove {
  return (
    (edit as Insert).parent === undefined && (edit as Remove).node !== undefined
  );
}

/**
 * @since 0.0.1
 */
export type EditEvent<E extends Edit = Edit> = CustomEvent<E>;

/**
 * @since 0.0.1
 * 
 * Creates a new EditEvent from the provided `Edit`
 * 
 * @param edit {@link Edit}
 * @returns EditEvent {@link EditEvent}
 */
export function newEditEvent<E extends Edit>(edit: E): EditEvent<E> {
  return new CustomEvent<E>('oscd-edit', {
    composed: true,
    bubbles: true,
    detail: edit,
  });
}

declare global {
  interface ElementEventMap {
    ['oscd-edit']: EditEvent;
  }
}
