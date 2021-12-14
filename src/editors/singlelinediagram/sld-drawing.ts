import {
  OrthogonalConnector,
  Side,
} from '../../../public/js/ortho-connector.js';
import { getDescriptionAttribute, getNameAttribute, identity } from '../../foundation.js';
import { getIcon } from '../../zeroline/foundation.js';
import {
  connectivityNodeIcon,
  powerTransformerTwoWindingIcon,
} from '../../icons.js';

import {
  getRelativeCoordinates,
  Point,
  getAbsoluteCoordinates,
  calculateConnectivityNodeCoordinates,
} from './foundation.js';

/**
 * Default 'grid size' of our SVG.
 */
export const SVG_GRID_SIZE = 64;

/**
 * The default element size of an SCL element.
 */
export const DEFAULT_ELEMENT_SIZE = 25;

/**
 * Offset of a terminal next to an element.
 */
const TERMINAL_OFFSET = 6;

/**
 * Defining the sides of route drawing of the two points
 * at the end of a route.
 */
interface PointSides {
  pointASide: Side;
  pointBSide: Side;
}

/**
 * Interface defining height and width for a shape drawing routes.
 */
interface Shape {
  height: number;
  width: number;
}

/**
 * Get the full position of an element (multiplied with an offset for the SVG).
 * It's just a matter of adding all the position up of the element including it's parent(s).
 * @param element - The element to get the position for.
 * @returns A point containing the full x/y position.
 */
export function getAbsolutePosition(element: Element): Point {
  const absoluteCoordinates = getAbsoluteCoordinates(element);
  return {
    x: absoluteCoordinates.x! * SVG_GRID_SIZE,
    y: absoluteCoordinates.y! * SVG_GRID_SIZE,
  };
}

/**
 * Get the full position of an ConnecitvityNode SCL element (multiplied with an offset for the SVG).
 * @param connectivityNode - The SCL element ConnectivityNode to get the position for.
 * @returns A point containing the full x/y position in px.
 */
export function getAbsolutePositionConnectivityNode(
  connectivityNode: Element
): Point {
  const absoluteCoordinates =
    calculateConnectivityNodeCoordinates(connectivityNode);
  return {
    x: absoluteCoordinates.x! * SVG_GRID_SIZE,
    y: absoluteCoordinates.y! * SVG_GRID_SIZE,
  };
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

/**
 * Create a <g> element based on a single XML element.
 * @param element - The element.
 * @returns The <g> element.
 */
function createGroupElement(element: Element): SVGElement {
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
 * Create a Voltage Level <g> element.
 * @param voltageLevel - The Voltage Level from the SCL document to use.
 * @returns A Voltage Level <g> element.
 */
export function createVoltageLevelElement(voltageLevel: Element): SVGElement {
  return createGroupElement(voltageLevel);
}

/**
 * Create a Bay <g> element.
 * @param voltageLevel - The Bay from the SCL document to use.
 * @returns A Bay <g> element.
 */
export function createBayElement(bay: Element): SVGElement {
  return createGroupElement(bay);
}

/**
 * Create a basic text element.
 * @param element - The text which is needing this text element.
 * @param coordinates - The x and y coordinates of this text elements.
 * @returns The text SVG element.
 */
export function createTextElement(
  textContent: string,
  coordinates: Point,
  textSize: string
): SVGElement {
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
 * @param elementPosition - The position of the element belonging to the terminal/
 * @param sideToDraw - The side of the element the terminal must be drawn on.
 * @param terminalElement - The terminal element to extract information from.
 * @param clickAction - The action to execute when the terminal is being clicked.
 * @returns The terminal SVG element.
 */
export function createTerminalElement(
  elementPosition: Point,
  sideToDraw: Side,
  terminalElement: Element,
  clickAction: () => void
): SVGElement {
  const groupElement = createGroupElement(terminalElement);

  const terminalIdentity =
    typeof identity(terminalElement) === 'string'
      ? <string>identity(terminalElement)
      : 'unidentifiable';

  const pointToDrawTerminalOn = getAbsolutePositionTerminal(
    elementPosition,
    sideToDraw
  );

  // TODO: Add this to the icons.ts file.
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  icon.setAttribute('id', `${terminalIdentity}`);
  icon.setAttribute('cx', `${pointToDrawTerminalOn.x}`);
  icon.setAttribute('cy', `${pointToDrawTerminalOn.y}`);
  icon.setAttribute('r', '2');

  groupElement.appendChild(icon);

  groupElement.addEventListener('click', clickAction);

  return groupElement;
}

/**
 * Create a Bus Bar element.
 * @param busBarElement - The Bus Bar SCL Element.
 * @param biggestVoltageLevelXCoordinate - The biggest of the VoltageLevel the bus bar is in,
 *      so the method can decide how long the bus bar should be.
 * @returns The Bus Bar SVG element.
 */
export function createBusBarElement(
  busBarElement: Element,
  biggestVoltageLevelXCoordinate: number
): SVGElement {
  const groupElement = createGroupElement(busBarElement);

  const busBarName = getNameAttribute(busBarElement)!;
  const absolutePosition = getAbsolutePosition(busBarElement);

  // TODO: Add this to the icons.ts file.
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  icon.setAttribute('name', getNameAttribute(busBarElement)!);
  icon.setAttribute('stroke-width', '4');
  icon.setAttribute('stroke', 'currentColor');

  icon.setAttribute('x1', `${absolutePosition.x}`);
  icon.setAttribute('y1', `${absolutePosition.y}`);
  icon.setAttribute('x2', `${biggestVoltageLevelXCoordinate}`);
  icon.setAttribute('y2', `${absolutePosition.y}`);

  groupElement.appendChild(icon);

  const text = createTextElement(
    busBarName,
    { x: absolutePosition.x, y: absolutePosition.y! - 10 },
    'small'
  );
  groupElement.appendChild(text);

  return groupElement;
}

/**
 * Create a Conducting Equipment element.
 * @param equipmentElement - The name of the busbar
 * @returns The Conducting Equipment SVG element.
 */
export function createConductingEquipmentElement(
  equipmentElement: Element
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
      `translate(${absolutePosition.x},${absolutePosition.y})`
    );
    groupElement.appendChild(icon);
  });

  const text = createTextElement(
    getNameAttribute(equipmentElement)!,
    { x: absolutePosition.x! - 15, y: absolutePosition.y! + 30 },
    'x-small'
  );
  groupElement.appendChild(text);

  return groupElement;
}

/**
 * Create a PowerTransformer element.
 * @param powerTransformerElement - The SCL PowerTransformer element
 * @returns The Power Transformer SVG element.
 */
export function createPowerTransformerElement(
  powerTransformerElement: Element
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
      `translate(${absolutePosition.x},${absolutePosition.y}) scale(1.5)`
    );
    groupElement.appendChild(icon);
  });

  const text = createTextElement(
    getNameAttribute(powerTransformerElement)!,
    { x: absolutePosition.x! - 15, y: absolutePosition.y! + 30 },
    'x-small'
  );
  groupElement.appendChild(text);

  return groupElement;
}

/**
 * Create a Connectivity Node element.
 * @param cNodeElement - The name of the busbar
 * @param position - The SCL position of the Connectivity Node.
 * @param clickAction - The action to execute when the terminal is being clicked.
 * @returns The Connectivity Node SVG element.
 */
export function createConnectivityNodeElement(
  cNodeElement: Element,
  position: Point,
  clickAction: () => void
): SVGElement {
  const groupElement = createGroupElement(cNodeElement);

  const parsedIcon = new DOMParser().parseFromString(
    connectivityNodeIcon.strings[0],
    'application/xml'
  );
  parsedIcon.querySelectorAll('circle').forEach(icon => {
    icon.setAttribute('transform', `translate(${position.x},${position.y})`);
    groupElement.appendChild(icon);
  });

  groupElement.addEventListener('click', clickAction);

  return groupElement;
}

/**
 * Draw a route from the first point to the second point.
 * @param pointA - The first point of this connection.
 * @param pointB - The second point of this connection.
 * @param svgToDrawOn - The SVG to draw the route on.
 * @param shape - A custom shape defining custom height and width of the shapes.
 * @returns The sides where the routes are being drawn next to both points.
 */
export function drawRouteBetweenElements(
  pointA: Point,
  pointB: Point,
  pointAShape: Shape,
  pointBShape: Shape,
  svgToDrawOn: HTMLElement,
): PointSides {
  /**
   * The point on each side of the route should be in the middle of the element,
   * so we have to do a little conversion of the 'left' and 'top' coordinate.
   */
  const positionMiddleOfA = convertRoutePointToMiddleOfElement(pointA, pointAShape);
  const positionMiddleOfB = convertRoutePointToMiddleOfElement(pointB, pointBShape);

  const shapeA = {
    left: positionMiddleOfA.x!,
    top: positionMiddleOfA.y!,
    width: pointAShape?.width,
    height: pointAShape?.height,
  };

  const shapeB = {
    left: positionMiddleOfB.x!,
    top: positionMiddleOfB.y!,
    width: pointBShape?.width,
    height: pointBShape?.height,
  };

  // Get the preferred sides.
  const sides = getDirections(pointA, pointB);

  const path = OrthogonalConnector.route({
    pointA: { shape: shapeA, side: sides.pointASide, distance: 0.5 },
    pointB: { shape: shapeB, side: sides.pointBSide, distance: 0.5 },
    shapeMargin: 0,
    globalBoundsMargin: 0,
    globalBounds: {
      left: 0,
      top: 0,
      width: 10000,
      height: 10000,
    },
  });

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

  // Inserting elements like this works kind of like z-index (not supported in SVG yet),
  // these elements are placed behind all other elements.
  // By doing it like this, all other elements are hoverable for example.
  svgToDrawOn.insertAdjacentElement('afterbegin', line);

  return sides;
}

/**
 * Get the dimensions of a specific element within a specific bay.
 * @param bayName - The name of the bay.
 * @param elementName - The name of the element.
 * @param svg - The SVG to search on.
 * @returns The shape (width and height) of the specific element.
 */
 export function getElementDimensions(bayName: string, elementName: string, svg: HTMLElement): Shape {
  let {height, width} = {height: 0, width: 0};

  svg.querySelectorAll(
    `g[id="${bayName}"] > g[id="${elementName}"]`
  ).forEach(b => {
    height = b.getBoundingClientRect().height;
    width = b.getBoundingClientRect().width;
  });

  return {height, width};
}

/**
 * Small simple algorithm deciding on which side the route should be drawn
 * of two ends of a route.
 * @param pointA - The first point (end) of a route.
 * @param pointB -  The second point (end) of a route.
 * @returns The of both points .
 */
function getDirections(pointA: Point, pointB: Point): PointSides {
  if (pointA.x! == pointB.x!) {
    if (pointA.y! < pointB.y!) {
      return { pointASide: 'bottom', pointBSide: 'top' };
    } else {
      return { pointASide: 'top', pointBSide: 'bottom' };
    }
  } else {
    if (pointA.y! <= pointB.y!) {
      if (pointA.x! < pointB.x!) {
        return { pointASide: 'right', pointBSide: 'left' };
      } else {
        return { pointASide: 'left', pointBSide: 'right' };
      }
    } else {
      if (pointA.x! < pointB.x!) {
        return { pointASide: 'left', pointBSide: 'right' };
      } else {
        return { pointASide: 'right', pointBSide: 'left' };
      }
    }
  }
}

/**
 * Get the absolute position for a Terminal, next to another point (based on the TERMINAL_OFFSET).
 * @param terminalParentPosition - The absolute position of the element which is the parent of the terminal.
 * @param side - On which side does the terminal needs to be placed relative to the given point.
 */
function getAbsolutePositionTerminal(
  terminalParentPosition: Point,
  side: Side
): Point {
  switch (side) {
    case 'top': {
      const x = terminalParentPosition.x;
      const y = terminalParentPosition.y;
      return {
        x: x! + DEFAULT_ELEMENT_SIZE / 2,
        y: y! - TERMINAL_OFFSET,
      };
    }
    case 'bottom': {
      const x = terminalParentPosition.x;
      const y = terminalParentPosition.y;
      return {
        x: x! + DEFAULT_ELEMENT_SIZE / 2,
        y: y! + (DEFAULT_ELEMENT_SIZE + TERMINAL_OFFSET),
      };
    }
    case 'left': {
      const x = terminalParentPosition.x;
      const y = terminalParentPosition.y;
      return {
        x: x! - TERMINAL_OFFSET,
        y: y! + DEFAULT_ELEMENT_SIZE / 2,
      };
    }
    case 'right': {
      const x = terminalParentPosition.x;
      const y = terminalParentPosition.y;
      return {
        x: x! + (DEFAULT_ELEMENT_SIZE + TERMINAL_OFFSET),
        y: y! + DEFAULT_ELEMENT_SIZE / 2,
      };
    }
    default: {
      return terminalParentPosition;
    }
  }
}

/**
 * Convert a top left coordinate to the middle of an element.
 * @param point - The top left point of the element.
 * @param shape - The shape of the element.
 * @returns The point of the element in the middle.
 */
function convertRoutePointToMiddleOfElement(point: Point, shape: Shape): Point {
  return {
    x: point.x! + ((DEFAULT_ELEMENT_SIZE - shape.width) / 2),
    y: point.y! + ((DEFAULT_ELEMENT_SIZE - shape.height) / 2)
  }
}

/* Calculate length of the busbar that is depending on the most far right equipment
 * @param root - Either the whole SCL file or the voltage level where the bus bar resides
 * @returns - the length of the bus bar
 */
export function getBusBarLength(root: Element | XMLDocument): number {
  return (
    Math.max(
      ...Array.from(
        root.querySelectorAll('ConductingEquipment, PowerTransformer')
      ).map(equipment => getAbsolutePosition(equipment).x!)
    ) + SVG_GRID_SIZE
  );
}
