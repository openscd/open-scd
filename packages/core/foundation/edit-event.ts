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

export type EditEvent<E extends Edit = Edit> = CustomEvent<E>;

export function newEditEvent<E extends Edit>(edit: E): EditEvent<E> {
  return new CustomEvent<E>('oscd-edit', {
    composed: true,
    bubbles: true,
    detail: edit,
  });
}

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

export function handleEdit(edit: Edit): Edit {
  if (isInsert(edit)) return handleInsert(edit);
  if (isUpdate(edit)) return handleUpdate(edit);
  if (isRemove(edit)) return handleRemove(edit);
  if (isComplex(edit)) return edit.map(handleEdit).reverse();
  return [];
}

declare global {
  interface ElementEventMap {
    ['oscd-edit']: EditEvent;
  }
}
