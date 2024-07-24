import {
  getNameAttribute,
  getPathNameAttribute
} from "../../../../openscd/src/foundation.js";
export const SCL_COORDINATES_NAMESPACE = "http://www.iec.ch/61850/2003/SCLcoordinates";
const COORDINATES_SCALE_FACTOR = 2;
export function getRelativeCoordinates(element) {
  const x = element.getAttributeNS(SCL_COORDINATES_NAMESPACE, "x");
  const y = element.getAttributeNS(SCL_COORDINATES_NAMESPACE, "y");
  return {
    x: x ? parseInt(x) * COORDINATES_SCALE_FACTOR : 0,
    y: y ? parseInt(y) * COORDINATES_SCALE_FACTOR : 0
  };
}
export function getAbsoluteCoordinates(element) {
  if (!element.parentElement || element.parentElement?.tagName === "SCL")
    return getRelativeCoordinates(element);
  const absParent = getAbsoluteCoordinates(element.parentElement);
  const relElement = getRelativeCoordinates(element);
  return {
    x: absParent.x + relElement.x,
    y: absParent.y + relElement.y
  };
}
export function isBusBar(element) {
  return element.children.length === 1 && element.children[0].tagName === "ConnectivityNode";
}
export function getConnectedTerminals(element) {
  const substationElement = element?.closest("Substation");
  if (!substationElement)
    return [];
  const path = getPathNameAttribute(element) ?? "";
  const [substationName, voltageLevelName, bayName] = path.split("/");
  return Array.from(substationElement.getElementsByTagName("Terminal")).filter((terminal) => terminal.getAttribute("connectivityNode") === path && terminal.getAttribute("cNodeName") === getNameAttribute(element) && (!terminal.hasAttribute("substationName") || terminal.getAttribute("substationName") === substationName) && (!terminal.hasAttribute("voltageLevelName") || terminal.getAttribute("voltageLevelName") === voltageLevelName) && (!terminal.hasAttribute("bayName") || terminal.getAttribute("bayName") === bayName));
}
export function calculateConnectivityNodeCoordinates(cNodeElement) {
  if (cNodeElement.tagName != "ConnectivityNode")
    return {x: 0, y: 0};
  const substationElement = cNodeElement.closest("Substation");
  const pathName = getPathNameAttribute(cNodeElement);
  let nrOfConnections = 0;
  let nrOfXConnections = 0;
  let totalX = 0;
  let totalY = 0;
  Array.from(substationElement.querySelectorAll("ConductingEquipment, PowerTransformer")).filter((equipment) => equipment.querySelector(`Terminal[connectivityNode="${pathName}"]`) != null).forEach((equipment) => {
    nrOfConnections++;
    const {x, y} = getAbsoluteCoordinates(equipment);
    if (equipment.parentElement === cNodeElement.parentElement) {
      nrOfXConnections++;
      totalX += x;
    }
    totalY += y;
  });
  if (nrOfConnections === 0)
    return {x: 0, y: 0};
  if (nrOfConnections === 1)
    return {x: totalX + 1, y: totalY + 1};
  return {
    x: Math.round(totalX / nrOfXConnections),
    y: Math.round(totalY / nrOfConnections)
  };
}
export function getCommonParentElement(leftElement, rightElement, defaultParent) {
  let leftParentElement = leftElement.parentElement;
  while (leftParentElement) {
    if (leftParentElement.contains(rightElement)) {
      return leftParentElement;
    }
    leftParentElement = leftParentElement.parentElement;
  }
  return defaultParent;
}
