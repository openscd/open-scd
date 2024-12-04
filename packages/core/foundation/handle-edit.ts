import {
  Edit,
  Insert,
  isComplex,
  isInsert,
  isRemove,
  isSetAttributes,
  isSetTextContent,
  Remove,
  SetAttributes,
  SetTextContent,
} from './edit.js';

function handleSetTextContent({
  element,
  textContent,
}: SetTextContent): (SetTextContent | Insert)[] {
  const { childNodes } = element;
  
  const restoreChildNodes: Insert[] = Array.from(childNodes).map((node) => ({
    parent: element,
    node,
    reference: null,
  }));
  
  element.textContent = textContent;
  
  const undoTextContent: SetTextContent = { element, textContent: '' };
  
  return [undoTextContent, ...restoreChildNodes];
}

function uniqueNSPrefix(element: Element, ns: string): string {
  let i = 1;
  const attributes = Array.from(element.attributes);
  const hasSamePrefix = (attribute: Attr) =>
    attribute.prefix === `ens${i}` && attribute.namespaceURI !== ns;
  const nsOrNull = new Set([null, ns]);
  const differentNamespace = (prefix: string) =>
    !nsOrNull.has(element.lookupNamespaceURI(prefix));
  while (differentNamespace(`ens${i}`) || attributes.find(hasSamePrefix))
    i += 1;
  return `ens${i}`;
}

const xmlAttributeName = /^(?!xml|Xml|xMl|xmL|XMl|xML|XmL|XML)[A-Za-z_][A-Za-z0-9-_.]*(:[A-Za-z_][A-Za-z0-9-_.]*)?$/;

function validName(name: string): boolean {
  return xmlAttributeName.test(name);
}

function handleSetAttributes({
  element,
  attributes,
  attributesNS,
}: SetAttributes): SetAttributes {
  const oldAttributes = { ...attributes };
  const oldAttributesNS = { ...attributesNS };
  
  // save element's non-prefixed attributes for undo
  Object.keys(attributes)
    .reverse()
    .forEach((name) => {
      oldAttributes[name] = element.getAttribute(name);
    });
  
  // change element's non-prefixed attributes
  for (const entry of Object.entries(attributes)) {
    try {
      const [name, value] = entry as [string, string | null];
      if (value === null) element.removeAttribute(name);
      else element.setAttribute(name, value);
    } catch (_e) {
      // undo nothing if update didn't work on this attribute
      delete oldAttributes[entry[0]];
    }
  }
  
  // save element's namespaced attributes for undo
  Object.entries(attributesNS).forEach(([ns, attrs]) => {
    Object.keys(attrs!)
      .filter(validName)
      .reverse()
      .forEach((name) => {
        oldAttributesNS[ns] = {
          ...oldAttributesNS[ns],
          [name]: element.getAttributeNS(ns, name.split(':').pop()!),
        };
      });
      Object.keys(attrs!)
      .filter((name) => !validName(name))
      .forEach((name) => {
        delete oldAttributesNS[ns]![name];
      });
  });
  
  // change element's namespaced attributes
  for (const nsEntry of Object.entries(attributesNS)) {
    const [ns, attrs] = nsEntry as [
      string,
      Partial<Record<string, string | null>>,
    ];
    for (const entry of Object.entries(attrs).filter(([name]) =>
      validName(name),
  )) {
    try {
      const [name, value] = entry as [string, string | null];
      if (value === null) {
        element.removeAttributeNS(ns, name.split(':').pop()!);
      } else {
        let qualifiedName = name;
        if (!qualifiedName.includes(':')) {
          let prefix = element.lookupPrefix(ns);
          if (!prefix) prefix = uniqueNSPrefix(element, ns);
          qualifiedName = `${prefix}:${name}`;
        }
        element.setAttributeNS(ns, qualifiedName, value);
      }
    } catch (_e) {
      delete oldAttributesNS[ns]![entry[0]];
    }
  }
}

return {
  element,
  attributes: oldAttributes,
  attributesNS: oldAttributesNS,
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

function handleInsert({
  parent,
  node,
  reference,
}: Insert): Insert | Remove | [] {
  try {
    const { parentNode, nextSibling } = node;
    parent.insertBefore(node, reference);
    if (parentNode) {
      // undo: move child node back to original place
      return {
        node,
        parent: parentNode,
        reference: nextSibling,
      };
    }

    // undo: remove orphaned node
    return { node };
  } catch (_e) {
    // undo nothing if insert doesn't work on these nodes
    return [];
  }
}

/** Applies an Edit, returning the corresponding 'undo' Edit. */
export function handleEdit(edit: Edit): Edit {
  if (isInsert(edit)) return handleInsert(edit);
  if (isRemove(edit)) return handleRemove(edit);
  if (isSetAttributes(edit)) return handleSetAttributes(edit);
  if (isSetTextContent(edit)) return handleSetTextContent(edit);
  if (isComplex(edit)) return edit.map((edit) => handleEdit(edit)).reverse();
  
  return [];
}
