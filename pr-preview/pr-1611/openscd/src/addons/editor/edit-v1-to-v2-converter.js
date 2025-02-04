import {isComplex, isInsert, isNamespaced, isRemove, isUpdate} from "../../../../_snowpack/link/packages/core/dist/foundation.js";
export function convertEditV1toV2(edit) {
  if (isComplex(edit)) {
    return edit.map(convertEditV1toV2);
  } else if (isRemove(edit)) {
    return edit;
  } else if (isInsert(edit)) {
    return edit;
  } else if (isUpdate(edit)) {
    return convertUpdate(edit);
  } else {
    throw new Error("Unknown edit type");
  }
}
function convertUpdate(edit) {
  const attributes = {};
  const attributesNS = {};
  Object.entries(edit.attributes).forEach(([key, value]) => {
    if (isNamespaced(value)) {
      const ns = value.namespaceURI;
      if (!ns)
        return;
      if (!attributesNS[ns]) {
        attributesNS[ns] = {};
      }
      attributesNS[ns][key] = value.value;
    } else
      attributes[key] = value;
  });
  return {element: edit.element, attributes, attributesNS};
}
