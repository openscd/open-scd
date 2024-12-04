import {get} from "../../../../_snowpack/pkg/lit-translate.js";
import {identity} from "../../../../openscd/src/foundation.js";
import {
  getAdjacentClass,
  validateChildren
} from "./foundation.js";
import {iec6185074} from "../../../../openscd/src/foundation/nsd.js";
async function getMandatoryDataObject(base) {
  const lnodeclasses = getAdjacentClass(await iec6185074, base);
  return lnodeclasses.flatMap((lnodeclass) => Array.from(lnodeclass.querySelectorAll('DataObject[presCond="M"]')));
}
async function missingMandatoryChildren(lnodetype, lnClass) {
  const errors = [];
  const mandatorydos = await (await getMandatoryDataObject(lnClass)).map((DO) => DO.getAttribute("name"));
  mandatorydos.forEach((mandatorydo) => {
    if (!lnodetype.querySelector(`DO[name="${mandatorydo}"]`))
      errors.push({
        title: get("validator.templates.mandatoryChild", {
          tag: "lnClass",
          id: lnClass,
          childTag: "DO",
          childId: mandatorydo
        }),
        message: `${identity(lnodetype)} > ${mandatorydo}`
      });
  });
  return errors;
}
export async function lNodeTypeValidator(element) {
  const errors = [];
  const lnClass = element.getAttribute("lnClass");
  if (!lnClass)
    return [
      {
        title: get("validator.templates.missingAttribute", {
          attr: "lnClass",
          element: element.tagName
        }),
        message: `${identity(element)}`
      }
    ];
  const missingChildren = await missingMandatoryChildren(element, lnClass);
  const issuesChildren = await validateChildren(element);
  return errors.concat(missingChildren, issuesChildren);
}
