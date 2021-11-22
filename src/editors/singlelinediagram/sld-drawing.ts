import {
  OrthogonalConnector,
  Side,
} from '../../../public/js/ortho-connector.js';

import { getIcon } from '../../zeroline/foundation.js';

import {
  getSCLCoordinates,
  getDescriptionAttribute,
  getNameAttribute,
  Point,
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
const TERMINAL_OFFSET = 15;

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
  switch (element.parentElement!.tagName) {
    case 'Bay': {
      const bayPosition = getSCLCoordinates(element.parentElement!);
      const voltageLevelPosition = getSCLCoordinates(
        element.parentElement!.parentElement!
      );
      const elementPosition = getSCLCoordinates(element);
      return {
        x:
          (bayPosition.x! + voltageLevelPosition.x! + elementPosition.x!) *
          SVG_GRID_SIZE,
        y:
          (bayPosition.y! + voltageLevelPosition.y! + elementPosition.y!) *
          SVG_GRID_SIZE,
      };
    }
    case 'VoltageLevel': {
      const voltageLevelPosition = getSCLCoordinates(element.parentElement!);
      const elementPosition = getSCLCoordinates(element);
      return {
        x: (voltageLevelPosition.x! + elementPosition.x!) * SVG_GRID_SIZE,
        y: (voltageLevelPosition.y! + elementPosition.y!) * SVG_GRID_SIZE,
      };
    }
    default: {
      return { x: 0, y: 0 };
    }
  }
}

/**
 * Get the absolute position for an element, given with custom coordinates.
 * @param element - The element to calculate the position for.
 * @param point - The custom coordinates.
 * @returns The absolute position.
 */
export function getAbsolutePositionWithCustomCoordinates(
  element: Element,
  point: Point
): Point {
  switch (element.parentElement!.tagName) {
    case 'Bay': {
      const bayPosition = getSCLCoordinates(element.parentElement!);
      const voltageLevelPosition = getSCLCoordinates(
        element.parentElement!.parentElement!
      );
      return {
        x:
          (bayPosition.x! + voltageLevelPosition.x! + point.x!) * SVG_GRID_SIZE,
        y:
          (bayPosition.y! + voltageLevelPosition.y! + point.y!) * SVG_GRID_SIZE,
      };
    }
    default: {
      return { x: 0, y: 0 };
    }
  }
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
export function createGroupElement(element: Element): SVGElement {
  const finalElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'g'
  );
  finalElement.tabIndex = 0;
  finalElement.setAttribute('id', getNameAttribute(element)!);
  finalElement.setAttribute('type', element.tagName);

  const description = getDescriptionAttribute(element);
  if (description) finalElement.setAttribute('desc', description);

  // Setting the X and Y coordinates of this <g> element.
  // It's not actually used, it's more informative.
  const coordinates = getSCLCoordinates(element);
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
 * @returns The terminal SVG element.
 */
export function createTerminalElement(
  elementPosition: Point,
  sideToDraw: Side,
  terminalElement: Element
): SVGElement {
  const groupElement = createGroupElement(terminalElement);

  const terminalName = getNameAttribute(terminalElement)!;
  const pointToDrawTerminalOn = getAbsolutePositionTerminal(
    elementPosition,
    sideToDraw
  );

  // TODO: Add this to the icons.ts file.
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  icon.setAttribute('id', `${terminalName}`);
  icon.setAttribute('cx', `${pointToDrawTerminalOn.x}`);
  icon.setAttribute('cy', `${pointToDrawTerminalOn.y}`);
  icon.setAttribute('r', '2');

  // Also add a text element.
  const textElementPosition =
    sideToDraw == 'bottom' || sideToDraw == 'top'
      ? { x: pointToDrawTerminalOn.x! + 5, y: pointToDrawTerminalOn.y! + 10 }
      : { x: pointToDrawTerminalOn.x! - 5, y: pointToDrawTerminalOn.y! - 10 };
  const text = createTextElement(terminalName, textElementPosition, 'xx-small');

  groupElement.appendChild(icon);
  groupElement.appendChild(text);

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
 * Create a Connectivity Node element.
 * @param cNodeElement - The name of the busbar
 * @param cNodeSclPosition - The SCL position of the Connectivity Node.
 * @returns The Connectivity Node SVG element.
 */
export function createConnectivityNodeElement(
  cNodeElement: Element,
  cNodeSclPosition: Point
): SVGElement {
  const groupElement = createGroupElement(cNodeElement);
  const absolutePosition = getAbsolutePositionWithCustomCoordinates(
    cNodeElement,
    cNodeSclPosition
  );

  const parsedIcon = new DOMParser().parseFromString(
    getIcon(cNodeElement).strings[0],
    'application/xml'
  );
  parsedIcon.querySelectorAll('circle').forEach(icon => {
    icon.setAttribute(
      'transform',
      `translate(${absolutePosition.x},${absolutePosition.y})`
    );
    groupElement.appendChild(icon);
  });

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
  const shapeA = {
    left: pointA.x! + ((DEFAULT_ELEMENT_SIZE - pointAShape.width) / 2),
    top: pointA.y! + ((DEFAULT_ELEMENT_SIZE - pointAShape.height) / 2),
    width: pointAShape?.width,
    height: pointAShape?.height,
  };

  const shapeB = {
    left: pointB.x! + ((DEFAULT_ELEMENT_SIZE - pointBShape.width) / 2),
    top: pointB.y! + ((DEFAULT_ELEMENT_SIZE - pointBShape.height) / 2),
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

  svgToDrawOn.appendChild(line);

  return sides;
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
 * Get the dimensions of a specific element within a specific bay.
 * @param bayName The name of the bay.
 * @param elementName The name of the element.
 * @param svg The SVG to search on.
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
