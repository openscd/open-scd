import {find, identity} from "../foundation.js";
const fcdaReferences = [
  "ldInst",
  "lnClass",
  "lnInst",
  "prefix",
  "doName",
  "daName"
];
export function getFcdaReferences(elementContainingFcdaReferences) {
  return fcdaReferences.map((fcdaRef) => elementContainingFcdaReferences.getAttribute(fcdaRef) ? `[${fcdaRef}="${elementContainingFcdaReferences.getAttribute(fcdaRef)}"]` : "").join("");
}
const controlReferences = ["srcLDInst", "srcLNClass", "srcLNInst", "srcCBName"];
export function getControlReferences(extRef) {
  return controlReferences.map((controlRef) => extRef.getAttribute(controlRef) ? `[${controlRef}="${extRef.getAttribute(controlRef)}"]` : "").join("");
}
export function emptyInputsDeleteActions(extRefDeleteActions) {
  if (!extRefDeleteActions.length)
    return [];
  const inputDeleteActions = [];
  const inputsMap = {};
  for (const extRefDeleteAction of extRefDeleteActions) {
    const extRef = extRefDeleteAction.old.element;
    const inputsElement = extRefDeleteAction.old.parent;
    const id = identity(inputsElement);
    if (!inputsMap[id])
      inputsMap[id] = inputsElement.cloneNode(true);
    const linkedExtRef = inputsMap[id].querySelector(`ExtRef${extRef.getAttribute("iedName") ? `[iedName="${extRef.getAttribute("iedName")}"]` : ""}${getFcdaReferences(extRef)}${extRef.getAttribute("serviceType") ? `[serviceType="${extRef.getAttribute("serviceType")}"]` : ""}${getControlReferences(extRef)}`);
    if (linkedExtRef)
      inputsMap[id].removeChild(linkedExtRef);
  }
  Object.entries(inputsMap).forEach(([key, value]) => {
    if (value.children.length == 0) {
      const doc = extRefDeleteActions[0].old.parent.ownerDocument;
      const inputs = find(doc, "Inputs", key);
      if (inputs && inputs.parentElement) {
        inputDeleteActions.push({
          old: {parent: inputs.parentElement, element: inputs}
        });
      }
    }
  });
  return inputDeleteActions;
}
