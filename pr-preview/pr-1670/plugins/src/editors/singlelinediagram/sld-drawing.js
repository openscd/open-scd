import {
  getDescriptionAttribute,
  getNameAttribute,
  identity
} from "../../../../openscd/src/foundation.js";
import {getIcon} from "../substation/foundation.js";
import {
  connectivityNodeIcon,
  editIcon,
  powerTransformerTwoWindingIcon
} from "../../../../openscd/src/icons/icons.js";
import {
  getRelativeCoordinates,
  getAbsoluteCoordinates,
  calculateConnectivityNodeCoordinates
} from "./foundation.js";
import {getOrthogonalPath} from "./ortho-connector.js";
export const SVG_GRID_SIZE = 64;
export const EQUIPMENT_SIZE = 50;
export const CNODE_SIZE = 25;
const TERMINAL_OFFSET = 6;
export function getAbsolutePosition(element) {
  const absoluteCoordinates = getAbsoluteCoordinates(element);
  return {
    x: absoluteCoordinates.x * SVG_GRID_SIZE + (SVG_GRID_SIZE - EQUIPMENT_SIZE) / 2,
    y: absoluteCoordinates.y * SVG_GRID_SIZE + (SVG_GRID_SIZE - EQUIPMENT_SIZE) / 2
  };
}
export function getAbsolutePositionBusBar(busbar) {
  const absoluteCoordinates = getAbsoluteCoordinates(busbar);
  return {
    x: absoluteCoordinates.x * SVG_GRID_SIZE,
    y: absoluteCoordinates.y * SVG_GRID_SIZE
  };
}
export function getAbsolutePositionConnectivityNode(connectivityNode) {
  const absoluteCoordinates = calculateConnectivityNodeCoordinates(connectivityNode);
  return {
    x: absoluteCoordinates.x * SVG_GRID_SIZE + (SVG_GRID_SIZE - CNODE_SIZE) / 2,
    y: absoluteCoordinates.y * SVG_GRID_SIZE + (SVG_GRID_SIZE - CNODE_SIZE) / 2
  };
}
function absoluteOffsetTerminal(parentElementPosition, elementOffset, terminalSide, customTerminalOffset) {
  const terminalOffset = customTerminalOffset ?? TERMINAL_OFFSET;
  switch (terminalSide) {
    case "top": {
      const x = parentElementPosition.x;
      const y = parentElementPosition.y;
      return {
        x: x + elementOffset / 2,
        y: y - terminalOffset
      };
    }
    case "bottom": {
      const x = parentElementPosition.x;
      const y = parentElementPosition.y;
      return {
        x: x + elementOffset / 2,
        y: y + (elementOffset + terminalOffset)
      };
    }
    case "left": {
      const x = parentElementPosition.x;
      const y = parentElementPosition.y;
      return {
        x: x - terminalOffset,
        y: y + elementOffset / 2
      };
    }
    case "right": {
      const x = parentElementPosition.x;
      const y = parentElementPosition.y;
      return {
        x: x + (elementOffset + terminalOffset),
        y: y + elementOffset / 2
      };
    }
    default: {
      return parentElementPosition;
    }
  }
}
export function getAbsolutePositionTerminal(equipment, direction) {
  const parentElementPosition = getAbsolutePosition(equipment);
  return absoluteOffsetTerminal(parentElementPosition, EQUIPMENT_SIZE, direction);
}
export function getConnectivityNodesDrawingPosition(cNode, direction) {
  const parentElementPosition = getAbsolutePositionConnectivityNode(cNode);
  const customTerminalOffset = -(CNODE_SIZE / 3);
  return absoluteOffsetTerminal(parentElementPosition, CNODE_SIZE, direction, customTerminalOffset);
}
function createGroupElement(element) {
  const finalElement = document.createElementNS("http://www.w3.org/2000/svg", "g");
  finalElement.setAttribute("id", typeof identity(element) === "string" ? identity(element) : "unidentifiable");
  finalElement.setAttribute("type", element.tagName);
  const description = getDescriptionAttribute(element);
  if (description)
    finalElement.setAttribute("desc", description);
  const coordinates = getRelativeCoordinates(element);
  finalElement.setAttribute("sxy:x", `${coordinates.x}`);
  finalElement.setAttribute("sxy:y", `${coordinates.y}`);
  return finalElement;
}
export function createSubstationElement(substation) {
  return createGroupElement(substation);
}
export function createVoltageLevelElement(voltageLevel) {
  return createGroupElement(voltageLevel);
}
export function createBayElement(bayElement) {
  return createGroupElement(bayElement);
}
export function addLabelToBay(rootGroup, bayElement, clickAction) {
  rootGroup.querySelectorAll(`g[id="${identity(bayElement)}"]`).forEach((bayGroup) => {
    const labelGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    labelGroup.setAttribute("type", "BayLabel");
    if (clickAction)
      labelGroup.addEventListener("click", clickAction);
    bayGroup.prepend(labelGroup);
    const bayBox = bayGroup.getBBox();
    const text = createTextElement(bayElement.getAttribute("name") || "", {x: bayBox.x, y: bayBox.y - 20}, "medium");
    labelGroup.append(text);
    const textBox = text.getBBox();
    const parsedIcon = new DOMParser().parseFromString(editIcon.strings[0], "application/xml");
    parsedIcon.querySelectorAll("circle,path,line").forEach((icon) => {
      icon.setAttribute("transform", `translate(${textBox.x + textBox.width + 5},${textBox.y}) scale(0.75)`);
      labelGroup.append(icon);
    });
  });
}
export function createTextElement(textContent, coordinates, textSize) {
  const finalElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
  finalElement.textContent = textContent;
  finalElement.setAttribute("style", `font-family: Roboto, sans-serif; font-weight: 300; font-size: ${textSize}`);
  finalElement.setAttribute("x", `${coordinates.x}`);
  finalElement.setAttribute("y", `${coordinates.y}`);
  return finalElement;
}
export function createTerminalElement(terminal, sideToDraw, clickAction) {
  const groupElement = createGroupElement(terminal);
  const terminalIdentity = typeof identity(terminal) === "string" ? identity(terminal) : "unidentifiable";
  const parentEquipment = terminal.closest("ConductingEquipment, PowerTransformer");
  const terminalPosition = getAbsolutePositionTerminal(parentEquipment, sideToDraw);
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  icon.setAttribute("id", `${terminalIdentity}`);
  icon.setAttribute("cx", `${terminalPosition.x}`);
  icon.setAttribute("cy", `${terminalPosition.y}`);
  icon.setAttribute("r", "2");
  groupElement.appendChild(icon);
  if (clickAction)
    groupElement.addEventListener("click", clickAction);
  return groupElement;
}
export function createBusBarElement(busbarElement, busbarLength) {
  const groupElement = createGroupElement(busbarElement);
  groupElement.setAttribute("type", "Busbar");
  const absolutePosition = getAbsolutePositionBusBar(busbarElement);
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "line");
  icon.setAttribute("name", getNameAttribute(busbarElement));
  icon.setAttribute("stroke-width", "4");
  icon.setAttribute("stroke", "currentColor");
  icon.setAttribute("x1", `${absolutePosition.x}`);
  icon.setAttribute("y1", `${absolutePosition.y}`);
  icon.setAttribute("x2", `${busbarLength}`);
  icon.setAttribute("y2", `${absolutePosition.y}`);
  groupElement.appendChild(icon);
  return groupElement;
}
export function addLabelToBusBar(rootGroup, busbarElement, clickAction) {
  rootGroup.querySelectorAll(`g[id="${identity(busbarElement)}"]`).forEach((busbarGroup) => {
    const labelGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    labelGroup.setAttribute("type", "BusbarLabel");
    if (clickAction)
      labelGroup.addEventListener("click", clickAction);
    busbarGroup.prepend(labelGroup);
    const busbarBox = busbarGroup.getBBox();
    const text = createTextElement(busbarElement.getAttribute("name") || "", {x: busbarBox.x, y: busbarBox.y - 20}, "medium");
    labelGroup.append(text);
    const textBox = text.getBBox();
    const parsedIcon = new DOMParser().parseFromString(editIcon.strings[0], "application/xml");
    parsedIcon.querySelectorAll("circle,path,line").forEach((icon) => {
      icon.setAttribute("transform", `translate(${textBox.x + textBox.width + 5},${textBox.y}) scale(0.75)`);
      labelGroup.append(icon);
    });
  });
}
export function createConductingEquipmentElement(equipmentElement, clickAction) {
  const groupElement = createGroupElement(equipmentElement);
  const absolutePosition = getAbsolutePosition(equipmentElement);
  const parsedIcon = new DOMParser().parseFromString(getIcon(equipmentElement).strings[0], "application/xml");
  parsedIcon.querySelectorAll("circle,path,line").forEach((icon) => {
    icon.setAttribute("transform", `translate(${absolutePosition.x},${absolutePosition.y}) scale(${EQUIPMENT_SIZE / 25})`);
    groupElement.appendChild(icon);
  });
  const text = createTextElement(getNameAttribute(equipmentElement), {x: absolutePosition.x - 15, y: absolutePosition.y + 30}, "x-small");
  groupElement.appendChild(text);
  if (clickAction)
    groupElement.addEventListener("click", clickAction);
  return groupElement;
}
export function createPowerTransformerElement(powerTransformerElement, clickAction) {
  const groupElement = createGroupElement(powerTransformerElement);
  const absolutePosition = getAbsolutePosition(powerTransformerElement);
  const parsedIcon = new DOMParser().parseFromString(powerTransformerTwoWindingIcon.strings[0], "application/xml");
  parsedIcon.querySelectorAll("circle,path,line").forEach((icon) => {
    icon.setAttribute("transform", `translate(${absolutePosition.x},${absolutePosition.y}) scale(${EQUIPMENT_SIZE / 25})`);
    groupElement.appendChild(icon);
  });
  const text = createTextElement(getNameAttribute(powerTransformerElement), {x: absolutePosition.x - 15, y: absolutePosition.y + 30}, "x-small");
  groupElement.appendChild(text);
  if (clickAction)
    groupElement.addEventListener("click", clickAction);
  return groupElement;
}
export function createConnectivityNodeElement(cNodeElement, clickAction) {
  const groupElement = createGroupElement(cNodeElement);
  const parsedIcon = new DOMParser().parseFromString(connectivityNodeIcon.strings[0], "application/xml");
  const absolutePosition = getAbsolutePositionConnectivityNode(cNodeElement);
  parsedIcon.querySelectorAll("circle").forEach((icon) => {
    icon.setAttribute("transform", `translate(${absolutePosition.x},${absolutePosition.y})`);
    groupElement.appendChild(icon);
  });
  if (clickAction)
    groupElement.addEventListener("click", clickAction);
  return groupElement;
}
export function drawCNodeConnections(cNodesTerminalPosition, equipmentsTerminalPosition, svgElementToDrawOn) {
  const path = getOrthogonalPath(equipmentsTerminalPosition, cNodesTerminalPosition, SVG_GRID_SIZE);
  const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
  let d = "";
  path.forEach(({x, y}, index) => {
    if (index === 0) {
      d = d + ` M ${x} ${y}`;
    } else {
      d = d + ` L ${x} ${y}`;
    }
  });
  line.setAttribute("d", d);
  line.setAttribute("fill", "transparent");
  line.setAttribute("stroke", "currentColor");
  line.setAttribute("stroke-width", "1");
  svgElementToDrawOn.insertAdjacentElement("afterbegin", line);
}
export function drawBusBarRoute(busbarsTerminalPosition, equipmentsTerminalPosition, svgElementToDrawOn) {
  const path = [busbarsTerminalPosition].concat([equipmentsTerminalPosition]);
  const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
  let d = "";
  path.forEach(({x, y}, index) => {
    if (index === 0) {
      d = d + ` M ${x} ${y}`;
    } else {
      d = d + ` L ${x} ${y}`;
    }
  });
  line.setAttribute("d", d);
  line.setAttribute("fill", "transparent");
  line.setAttribute("stroke", "currentColor");
  line.setAttribute("stroke-width", "1.5");
  svgElementToDrawOn.appendChild(line);
}
export function getDirections(equipment, cNode) {
  const pointA = getAbsoluteCoordinates(equipment);
  const pointB = calculateConnectivityNodeCoordinates(cNode);
  if (pointA.y < pointB.y && pointA.x < pointB.x)
    return {startDirection: "bottom", endDirection: "left"};
  if (pointA.y < pointB.y && pointA.x > pointB.x)
    return {startDirection: "bottom", endDirection: "right"};
  if (pointA.y < pointB.y && pointA.x === pointB.x)
    return {startDirection: "bottom", endDirection: "top"};
  if (pointA.y > pointB.y && pointA.x < pointB.x)
    return {startDirection: "top", endDirection: "left"};
  if (pointA.y > pointB.y && pointA.x > pointB.x)
    return {startDirection: "top", endDirection: "right"};
  if (pointA.y > pointB.y && pointA.x === pointB.x)
    return {startDirection: "top", endDirection: "bottom"};
  if (pointA.y === pointB.y && pointA.x > pointB.x)
    return {startDirection: "left", endDirection: "right"};
  if (pointA.y === pointB.y && pointA.x < pointB.x)
    return {startDirection: "right", endDirection: "left"};
  return {startDirection: "bottom", endDirection: "top"};
}
export function getParentElementName(childElement) {
  const parentElement = childElement.parentElement;
  return getNameAttribute(parentElement);
}
export function getBusBarLength(root) {
  return Math.max(...Array.from(root.querySelectorAll("ConductingEquipment, PowerTransformer")).map((equipment) => getAbsolutePosition(equipment).x)) + SVG_GRID_SIZE;
}
