import { getDescriptionAttribute, getNameAttribute, identity } from '../../foundation.js';
import { getIcon } from '../../zeroline/foundation.js';
import {
  connectivityNodeIcon,
  editIcon,
  powerTransformerTwoWindingIcon,
} from '../../icons.js';

import {
  getRelativeCoordinates,
  Point,
  getAbsoluteCoordinates,
  calculateConnectivityNodeCoordinates,
} from './foundation.js';
import { getOrthogonalPath } from './ortho-connector.js';

/** Default 'grid size' of our SVG */
export const SVG_GRID_SIZE = 64;

/** Size of SLC element ConductingEquipment or PowerTransformer */
export const EQUIPMENT_SIZE = 50;

/** The size of SLC element ConnectivityNode */
export const CNODE_SIZE = 25;

/** Offset of a terminal next to its parent element */
const TERMINAL_OFFSET = 6;

type Direction = 'top' | 'right' | 'bottom' | 'left';
/** Start and end direction of the route */

export interface PointDirections {
  startDirection: Direction;
  endDirection: Direction;
}

/**
 * Get the full position of an element (multiplied with an offset for the SVG).
 * It's just a matter of adding all the position up of the element including it's parent(s).
 * @param element - The SCL element to get the position for.
 * @returns A point containing the full x/y position.
 */
export function getAbsolutePosition(element: Element): Point {
  const absoluteCoordinates = getAbsoluteCoordinates(element);
  return {
    x:
      absoluteCoordinates.x! * SVG_GRID_SIZE +
      (SVG_GRID_SIZE - EQUIPMENT_SIZE) / 2,
    y:
      absoluteCoordinates.y! * SVG_GRID_SIZE +
      (SVG_GRID_SIZE - EQUIPMENT_SIZE) / 2,
  };
}

/**
 * Get the full position of an bus bar (multiplied with an offset for the SVG).
 * @param busbar - The SCL element Bay to get the position for.
 * @returns A point containing the full x/y position in px.
 */
export function getAbsolutePositionBusBar(busbar: Element): Point {
  const absoluteCoordinates = getAbsoluteCoordinates(busbar);
  return {
    x: absoluteCoordinates.x! * SVG_GRID_SIZE,
    y: absoluteCoordinates.y! * SVG_GRID_SIZE,
  };
}

/**
 * Get the full position of an ConnectivityNode SCL element (multiplied with an offset for the SVG).
 * @param connectivityNode - The SCL element ConnectivityNode to get the position for.
 * @returns A point containing the full x/y position in px.
 */
export function getAbsolutePositionConnectivityNode(connectivityNode: Element): Point {
  const absoluteCoordinates = calculateConnectivityNodeCoordinates(connectivityNode);
  return {
    x:
      absoluteCoordinates.x! * SVG_GRID_SIZE + (SVG_GRID_SIZE - CNODE_SIZE) / 2,
    y:
      absoluteCoordinates.y! * SVG_GRID_SIZE + (SVG_GRID_SIZE - CNODE_SIZE) / 2,
  };
}

/**
 * Calculate the absolute offset of a terminal next to an element.
 * @param parentElementPosition - The position of the parent element of the terminal.
 * @param elementOffset - The offset of the parent element.
 * @param terminalSide - The side of the parent element where the terminal should be placed.
 * @param customTerminalOffset - An optional parameter containing the offset of the terminal next to the parent element.
 * This may vary, for example for Connectivity Nodes.
 *
 * @returns The absolute position of the terminal.
 */
function absoluteOffsetTerminal(
  parentElementPosition: Point,
  elementOffset: number,
  terminalSide: Direction,
  customTerminalOffset?: number
): Point {

  const terminalOffset = customTerminalOffset ?? TERMINAL_OFFSET;

  switch (terminalSide) {
    case 'top': {
      const x = parentElementPosition.x;
      const y = parentElementPosition.y;
      return {
        x: x! + elementOffset / 2,
        y: y! - terminalOffset,
      };
    }
    case 'bottom': {
      const x = parentElementPosition.x;
      const y = parentElementPosition.y;
      return {
        x: x! + elementOffset / 2,
        y: y! + (elementOffset + terminalOffset),
      };
    }
    case 'left': {
      const x = parentElementPosition.x;
      const y = parentElementPosition.y;
      return {
        x: x! - terminalOffset,
        y: y! + elementOffset / 2,
      };
    }
    case 'right': {
      const x = parentElementPosition.x;
      const y = parentElementPosition.y;
      return {
        x: x! + (elementOffset + terminalOffset),
        y: y! + elementOffset / 2,
      };
    }
    default: {
      return parentElementPosition;
    }
  }
}

/**
 * Get the absolute position in py for a equipments Terminal (based on the TERMINAL_OFFSET).
 * @param equipment - The SCL elements ConductingEquipment or PowerTransformer.
 * @param direction - On which side does the terminal needs to be placed relative to the given point.
 */
export function getAbsolutePositionTerminal(
  equipment: Element,
  direction: Direction
): Point {
  const parentElementPosition = getAbsolutePosition(equipment);

  return absoluteOffsetTerminal(parentElementPosition, EQUIPMENT_SIZE, direction);
}

/**
 * Get the absolute position in px for a SLC element ConnectivityNode drawing start/end (based on the TERMINAL_OFFSET).
 * @param cNode - The SCL element ConnectivityNode
 * @param direction - The direction of the connector from/to the ConnectivityNode
 */
export function getConnectivityNodesDrawingPosition(
  cNode: Element,
  direction: Direction
): Point {
  const parentElementPosition = getAbsolutePositionConnectivityNode(cNode);

  // Using a custom terminal offset for Connectivity Nodes, so the routes are nicely connected to the Connectivity Nodes.
  const customTerminalOffset = -(CNODE_SIZE/3)
  return absoluteOffsetTerminal(parentElementPosition, CNODE_SIZE, direction, customTerminalOffset);
}

/**
 * Create a <g> element based on a single XML element.
 * @param element - The element.
 * @returns The <g> element.
 */
function createGroupElement(element: Element): SVGGraphicsElement {
  const finalElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'g'
  );
  finalElement.setAttribute(
    'id',
    typeof identity(element) === 'string'
      ? <string>identity(element)
      : 'unidentifiable'
  );
  finalElement.setAttribute('type', element.tagName);

  const description = getDescriptionAttribute(element);
  if (description) finalElement.setAttribute('desc', description);

  // Setting the X and Y coordinates of this <g> element.
  // It's not actually used, it's more informative.
  const coordinates = getRelativeCoordinates(element);
  finalElement.setAttribute('sxy:x', `${coordinates.x}`);
  finalElement.setAttribute('sxy:y', `${coordinates.y}`);

  return finalElement;
}

/**
 * Create a Substation <g> element.
 * @param substation - The Substation from the SCL document to use.
 * @returns A Substation <g> element.
 */
export function createSubstationElement(substation: Element): SVGElement {
  return createGroupElement(substation);
}

/**
 * Create a Voltage Level <g> element.
 * @param voltageLevel - The Voltage Level from the SCL document to use.
 * @returns A Voltage Level <g> element.
 */
export function createVoltageLevelElement(voltageLevel: Element): SVGElement {
  return createGroupElement(voltageLevel);
}

/**
 * Create a Bay <g> element.
 * @param bayElement - The Bay from the SCL document to use.
 * @returns A Bay <g> element.
 */
export function createBayElement(bayElement: Element): SVGGraphicsElement {
  return createGroupElement(bayElement);
}

/**
 * Add a Text Element to the top of the Bay
 *
 * @param rootGroup - The Root group containing all groups.
 * @param bayElement - The Bay from the SCL document to use.
 * @param clickAction - The action to execute when the Name of the Bay is being clicked.
 */
export function addLabelToBay(rootGroup: SVGElement,
                              bayElement: Element,
                              clickAction?: (event: Event) => void
): void {
  rootGroup
    .querySelectorAll(`g[id="${identity(bayElement)}"]`)
    .forEach(bayGroup => {
      const labelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      labelGroup.setAttribute('type', 'BayLabel');
      if (clickAction) labelGroup.addEventListener('click', clickAction);
      bayGroup.prepend(labelGroup);

      const bayBox = (<SVGGraphicsElement>bayGroup).getBBox();
      const text = createTextElement(
        bayElement.getAttribute('name') || '',
        {x: bayBox.x, y: bayBox.y - 20},
        'medium'
      );
      labelGroup.append(text);

      const textBox = text.getBBox();
      const parsedIcon = new DOMParser().parseFromString(
        editIcon.strings[0],
        'application/xml'
      );
      parsedIcon.querySelectorAll('circle,path,line').forEach(icon => {
        icon.setAttribute(
          'transform',
          `translate(${textBox.x + textBox.width + 5},${textBox.y}) scale(0.75)`
        );
        labelGroup.append(icon);
      });
    });
}

/**
 * Create a basic caption.
 * @param textContent - The content of the caption.
 * @param coordinates - The x and y position in px to locate in drawing pane.
 * @param textSize - The size of the caption
 * @returns The text SVG element.
 */
export function createTextElement(
  textContent: string,
  coordinates: Point,
  textSize: string
): SVGGraphicsElement {
  const finalElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'text'
  );

  finalElement.textContent = textContent;
  finalElement.setAttribute(
    'style',
    `font-family: Roboto, sans-serif; font-weight: 300; font-size: ${textSize}`
  );

  finalElement.setAttribute('x', `${coordinates.x}`);
  finalElement.setAttribute('y', `${coordinates.y}`);

  return finalElement;
}

/**
 * Create a Terminal element.
 * @param terminal - The SCL element Terminal to draw
 * @param sideToDraw - The side of the element the terminal must be drawn on.
 * @param clickAction - The action to execute when the terminal is being clicked.
 * @returns The terminal SVG element.
 */
export function createTerminalElement(
  terminal: Element,
  sideToDraw: Direction,
  clickAction?: (event: Event) => void
): SVGElement {
  const groupElement = createGroupElement(terminal);

  const terminalIdentity =
    typeof identity(terminal) === 'string'
      ? <string>identity(terminal)
      : 'unidentifiable';

  const parentEquipment = terminal.closest(
    'ConductingEquipment, PowerTransformer'
  );
  const terminalPosition = getAbsolutePositionTerminal(
    parentEquipment!,
    sideToDraw
  );

  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  icon.setAttribute('id', `${terminalIdentity}`);
  icon.setAttribute('cx', `${terminalPosition.x}`);
  icon.setAttribute('cy', `${terminalPosition.y}`);
  icon.setAttribute('r', '2');
  groupElement.appendChild(icon);

  if (clickAction) groupElement.addEventListener('click', clickAction);

  return groupElement;
}

/**
 * Create a bus bar element.
 * @param busbarElement - The Bus Bar SCL Element.
 * @param busbarLength - The length of the bus bar depending on the x coordinate of the most far out right equipment ()
 * @returns The Bus Bar SVG element.
 */
export function createBusBarElement(
  busbarElement: Element,
  busbarLength: number
): SVGGraphicsElement {
  const groupElement = createGroupElement(busbarElement);
  // Overwrite the type to make a distinction between Bays and Busbars.
  groupElement.setAttribute('type', 'Busbar');

  const absolutePosition = getAbsolutePositionBusBar(busbarElement);

  // TODO: Add this to the icons.ts file.
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  icon.setAttribute('name', getNameAttribute(busbarElement)!);
  icon.setAttribute('stroke-width', '4');
  icon.setAttribute('stroke', 'currentColor');

  icon.setAttribute('x1', `${absolutePosition.x}`);
  icon.setAttribute('y1', `${absolutePosition.y}`);
  icon.setAttribute('x2', `${busbarLength}`);
  icon.setAttribute('y2', `${absolutePosition.y}`);

  groupElement.appendChild(icon);

  return groupElement;
}

/**
 * Add a Text Element to the top of the Bay
 *
 * @param rootGroup - The Root group containing all groups.
 * @param busbarElement - The BusBar from the SCL document to use.
 * @param clickAction - The action to execute when the Name of the BusBar is being clicked.
 */
export function addLabelToBusBar(rootGroup: SVGElement,
                                 busbarElement: Element,
                                 clickAction?: (event: Event) => void
): void {
  rootGroup
    .querySelectorAll(`g[id="${identity(busbarElement)}"]`)
    .forEach(busbarGroup => {
      const labelGroup = document.createElementNS('http://www.w3.org/2000/svg','g');
      labelGroup.setAttribute('type', 'BusbarLabel');
      if (clickAction) labelGroup.addEventListener('click', clickAction);
      busbarGroup.prepend(labelGroup);

      const busbarBox = (<SVGGraphicsElement>busbarGroup).getBBox();
      const text = createTextElement(
        busbarElement.getAttribute('name') || '',
        { x: busbarBox.x, y: busbarBox.y - 20 },
        'medium'
      );
      labelGroup.append(text);

      const textBox = text.getBBox();
      const parsedIcon = new DOMParser().parseFromString(
        editIcon.strings[0],
        'application/xml'
      );
      parsedIcon.querySelectorAll('circle,path,line').forEach(icon => {
        icon.setAttribute(
          'transform',
          `translate(${textBox.x + textBox.width + 5},${textBox.y}) scale(0.75)`
        );
        labelGroup.append(icon);
      });
    });
}

/**
 * Create a Conducting Equipment element.
 * @param equipmentElement - The SCL element ConductingEquipment
 * @param clickAction - The action to execute when the Conducting Equipment is being clicked.
 * @returns The Conducting Equipment SVG element.
 */
export function createConductingEquipmentElement(
  equipmentElement: Element,
  clickAction?: (event: Event) => void
): SVGElement {
  const groupElement = createGroupElement(equipmentElement);

  const absolutePosition = getAbsolutePosition(equipmentElement);
  const parsedIcon = new DOMParser().parseFromString(
    getIcon(equipmentElement).strings[0],
    'application/xml'
  );
  parsedIcon.querySelectorAll('circle,path,line').forEach(icon => {
    icon.setAttribute(
      'transform',
      `translate(${absolutePosition.x},${absolutePosition.y}) scale(${
        EQUIPMENT_SIZE / 25
      })`
    );
    groupElement.appendChild(icon);
  });

  const text = createTextElement(
    getNameAttribute(equipmentElement)!,
    { x: absolutePosition.x! - 15, y: absolutePosition.y! + 30 },
    'x-small'
  );
  groupElement.appendChild(text);

  if (clickAction) groupElement.addEventListener('click', clickAction);

  return groupElement;
}

/**
 * Create a PowerTransformer element.
 * @param powerTransformerElement - The SCL element PowerTransformer
 * @param clickAction - The action to execute when the Power Transformer is being clicked.
 * @returns The Power Transformer SVG element.
 */
export function createPowerTransformerElement(
  powerTransformerElement: Element,
  clickAction?: (event: Event) => void
): SVGElement {
  const groupElement = createGroupElement(powerTransformerElement);

  const absolutePosition = getAbsolutePosition(powerTransformerElement);
  const parsedIcon = new DOMParser().parseFromString(
    powerTransformerTwoWindingIcon.strings[0],
    'application/xml'
  );
  parsedIcon.querySelectorAll('circle,path,line').forEach(icon => {
    icon.setAttribute(
      'transform',
      `translate(${absolutePosition.x},${absolutePosition.y}) scale(${
        EQUIPMENT_SIZE / 25
      })`
    );
    groupElement.appendChild(icon);
  });

  const text = createTextElement(
    getNameAttribute(powerTransformerElement)!,
    { x: absolutePosition.x! - 15, y: absolutePosition.y! + 30 },
    'x-small'
  );
  groupElement.appendChild(text);

  if (clickAction) groupElement.addEventListener('click', clickAction);

  return groupElement;
}

/**
 * Create a Connectivity Node element.
 * @param cNodeElement - The SCL element ConnectivityNode
 * @param clickAction - The action to execute when the Terminal is being clicked.
 * @returns The Connectivity Node SVG element.
 */
export function createConnectivityNodeElement(
  cNodeElement: Element,
  clickAction?: (event: Event) => void
): SVGElement {
  const groupElement = createGroupElement(cNodeElement);

  const parsedIcon = new DOMParser().parseFromString(
    connectivityNodeIcon.strings[0],
    'application/xml'
  );

  const absolutePosition = getAbsolutePositionConnectivityNode(cNodeElement);
  parsedIcon.querySelectorAll('circle').forEach(icon => {
    icon.setAttribute(
      'transform',
      `translate(${absolutePosition.x},${absolutePosition.y})`
    );
    groupElement.appendChild(icon);
  });

  if (clickAction) groupElement.addEventListener('click', clickAction);

  return groupElement;
}

/**
 * Draw a route from ConnectivityNode to equipments Terminal (ConductingEquipment or PowerTransformer)
 * @param cNodesTerminalPosition - The start position in px of the SCL element ConnectivityNode.
 * @param equipmentsTerminalPosition - The end position in px of the SCL element ConductingEquipment or PowerTransformer.
 * @param svgElementToDrawOn - The SVG Element to draw the route on.
 */
export function drawCNodeConnections(
  cNodesTerminalPosition: Point,
  equipmentsTerminalPosition: Point,
  svgElementToDrawOn: SVGElement
): void {
  const path = getOrthogonalPath(
    equipmentsTerminalPosition,
    cNodesTerminalPosition,
    SVG_GRID_SIZE
  );

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  let d = '';
  path.forEach(({ x, y }, index) => {
    if (index === 0) {
      d = d + ` M ${x} ${y}`;
    } else {
      d = d + ` L ${x} ${y}`;
    }
  });

  line.setAttribute('d', d);
  line.setAttribute('fill', 'transparent');
  line.setAttribute('stroke', 'currentColor');
  line.setAttribute('stroke-width', '1');

  // Inserting elements like this works kind of like z-index (not supported in SVG yet),
  // these elements are placed behind all other elements.
  // By doing it like this, all other elements are hoverable for example.
  svgElementToDrawOn.insertAdjacentElement('afterbegin', line);
}

/**
 * Draw a route from the bus bar to elements terminal position.
 * @param busbarsTerminalPosition - The start position in px the bus bar.
 * @param equipmentsTerminalPosition - The end position in px of the SCL element ConductingEquipment or PowerTransformer.
 * @param svgElementToDrawOn - The SVG Element to draw the route on.
 */
export function drawBusBarRoute(
  busbarsTerminalPosition: Point,
  equipmentsTerminalPosition: Point,
  svgElementToDrawOn: SVGElement
): void {
  const path = [busbarsTerminalPosition].concat([equipmentsTerminalPosition]);

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  let d = '';
  path.forEach(({ x, y }, index) => {
    if (index === 0) {
      d = d + ` M ${x} ${y}`;
    } else {
      d = d + ` L ${x} ${y}`;
    }
  });

  line.setAttribute('d', d);
  line.setAttribute('fill', 'transparent');
  line.setAttribute('stroke', 'currentColor');
  line.setAttribute('stroke-width', '1.5');

  svgElementToDrawOn.appendChild(line);
}

/**
 * Small simple algorithm deciding on which direction the route should be drawn
 * for a connection between elements Terminal and ConnectivityNode
 * @param equipment - The SCL element ConductingEquipment or PowerTransformer the route starts from.
 * @param cNode -  The SLC element ConnectivityNode the route ends with.
 * @returns The sides of both points .
 */
export function getDirections(
  equipment: Element,
  cNode: Element
): PointDirections {
  const pointA = getAbsoluteCoordinates(equipment);
  const pointB = calculateConnectivityNodeCoordinates(cNode);

  if (pointA.y < pointB.y && pointA.x < pointB.x)
    return { startDirection: 'bottom', endDirection: 'left' };

  if (pointA.y < pointB.y && pointA.x > pointB.x)
    return { startDirection: 'bottom', endDirection: 'right' };

  if (pointA.y < pointB.y && pointA.x === pointB.x)
    return { startDirection: 'bottom', endDirection: 'top' };

  if (pointA.y > pointB.y && pointA.x < pointB.x)
    return { startDirection: 'top', endDirection: 'left' };

  if (pointA.y > pointB.y && pointA.x > pointB.x)
    return { startDirection: 'top', endDirection: 'right' };

  if (pointA.y > pointB.y && pointA.x === pointB.x)
    return { startDirection: 'top', endDirection: 'bottom' };

  if (pointA.y === pointB.y && pointA.x > pointB.x)
    return { startDirection: 'left', endDirection: 'right' };

  if (pointA.y === pointB.y && pointA.x < pointB.x)
    return { startDirection: 'right', endDirection: 'left' };

  return { startDirection: 'bottom', endDirection: 'top' };
}

/**
 * Get the name of the parent of given child element.
 * @param childElement - The child element.
 * @returns The name.
 */
export function getParentElementName(
  childElement: Element
): string | undefined {
  const parentElement = <Element>childElement.parentElement;
  return getNameAttribute(parentElement);
}

/* Calculate length of the busbar that is depending on the most far right equipment
 * @param root - Either the whole SCL file or the voltage level where the bus bar resides
 * @returns - the length of the bus bar
 */
export function getBusBarLength(root: Element): number {
  return (
    Math.max(
      ...Array.from(
        root.querySelectorAll('ConductingEquipment, PowerTransformer')
      ).map(equipment => getAbsolutePosition(equipment).x!)
    ) + SVG_GRID_SIZE
  );
}
