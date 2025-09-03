import {get} from "../../../../_snowpack/pkg/lit-translate.js";
import {identity} from "../../../../openscd/src/foundation.js";
import {getTypeChild, isTypeMissing} from "./foundation.js";
export async function dOValidator(element) {
  if (isTypeMissing(element))
    return [
      {
        title: get("validator.templates.missingAttribute", {
          attr: "type",
          element: element.tagName
        }),
        message: `${identity(element)}`
      }
    ];
  const child = getTypeChild(element);
  if (child === null)
    return [
      {
        title: get("validator.templates.missingReference", {
          tag: "DO",
          name: element.getAttribute("name")
        }),
        message: `${identity(element)}`
      }
    ];
  return [];
}
