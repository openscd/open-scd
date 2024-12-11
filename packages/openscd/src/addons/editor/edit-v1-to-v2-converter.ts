import { Edit, EditV2, isComplex, isInsert, isNamespaced, isRemove, isUpdate, Update } from '@openscd/core';

export function convertEditV1toV2(edit: Edit): EditV2 {
  if (isComplex(edit)) {
    return edit.map(convertEditV1toV2);
  } else if (isRemove(edit)) {
    return edit as EditV2;
  } else if (isInsert(edit)) {
    return edit as EditV2;
  } else if (isUpdate(edit)) {
    return convertUpdate(edit);
  } else {
    throw new Error('Unknown edit type');
  }
}

function convertUpdate(edit: Update): EditV2 {
  const attributes: Partial<Record<string, string | null>> = {};
  const attributesNS: Partial<
    Record<string, Partial<Record<string, string | null>>>
  > = {};

  Object.entries(edit.attributes).forEach(([key, value]) => {
    if (isNamespaced(value!)) {
      const ns = value.namespaceURI;
      if (!ns) return;

      if (!attributesNS[ns]) {
        attributesNS[ns] = {};
      }
      attributesNS[ns][key] = value.value;
    } else attributes[key] = value;
  });

  return { element: edit.element, attributes, attributesNS };
}
