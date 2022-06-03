const functionTypeElementTags = [
  'Function',
  'SubFunction',
  'EqFunction',
  'EqSubFunction',
];

/**
 * @param element - Some element Function, SubFunction, EqFunction or EqSubFunction
 * @returns Whether the element is a leaf function acc. to IEC 61850-6-100
 * */
export function isLeafFunction(element: Element | null): boolean {
  if (!element) return false;

  if (element.tagName !== 'SubFunction' && element.tagName !== 'EqSubFunction')
    return false;

  return (
    element.children.length === 1 && element.children[0].tagName === 'LNode'
  );
}

/** @returns closest non-leaf function type parent element */
export function getNonLeafParent(element: Element | null): Element | null {
  if (!element) return null;

  const directParent = element.parentElement;
  if (!directParent || !functionTypeElementTags.includes(directParent.tagName))
    return null;

  if (isLeafFunction(directParent)) return getNonLeafParent(directParent);

  return directParent;
}
