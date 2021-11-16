import { OrthogonalConnector, Side } from "../../../public/js/ortho-connector";
import { getSCLCoordinates, getDescriptionAttribute, getNameAttribute, Point } from "./foundation";

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
    firstPointSide: Side;
    secondPointSide: Side;
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
 * @param element The element to get the position for.
 * @returns A point containing the full x/y position.
 */
 export function getAbsolutePosition(element: Element): Point {
    switch (element.parentElement!.tagName) {
        case 'Bay': {
            const bayPosition = getSCLCoordinates(element.parentElement!);
            const voltageLevelPosition = getSCLCoordinates(element.parentElement!.parentElement!);
            const elementPosition = getSCLCoordinates(element);
            return {
                x: (bayPosition.x! + voltageLevelPosition.x! + elementPosition.x!) * SVG_GRID_SIZE,
                y: (bayPosition.y! + voltageLevelPosition.y! + elementPosition.y!) * SVG_GRID_SIZE
            }
        }
        case 'VoltageLevel': {
            const voltageLevelPosition = getSCLCoordinates(element.parentElement!);
            const elementPosition = getSCLCoordinates(element);
            return {
                x: (voltageLevelPosition.x! + elementPosition.x!) * SVG_GRID_SIZE,
                y: (voltageLevelPosition.y! + elementPosition.y!) * SVG_GRID_SIZE
            }
        }
        default: {
            return {x: 0, y: 0}
        }
    }
}

/**
 * Get the absolute position for an element, given with custom coordinates.
 * @param element The element to calculate the position for.
 * @param point The custom coordinates.
 * @returns The absolute position.
 */
export function getAbsolutePositionWithCustomCoordinates(element: Element, point: Point): Point {
    switch (element.parentElement!.tagName) {
        case 'Bay': {
            const bayPosition = getSCLCoordinates(element.parentElement!);
            const voltageLevelPosition = getSCLCoordinates(element.parentElement!.parentElement!);
            return {
                x: (bayPosition.x! + voltageLevelPosition.x! + point.x!) * SVG_GRID_SIZE,
                y: (bayPosition.y! + voltageLevelPosition.y! + point.y!) * SVG_GRID_SIZE
            }
        }
        default: {
            return {x: 0, y: 0}
        }
    }
}

/**
 * Get the name of the parent of given child element.
 * @param childElement The child element.
 * @returns The name.
 */
export function getParentElementName(childElement: Element) {
    const parentElement = <Element>(childElement.parentElement);
    return getNameAttribute(parentElement);
}

/**
 * Create a <g> element based on a single XML element.
 * @param element The element.
 * @returns The <g> element.
 */
export function createGElement(element: Element): SVGElement {
    const finalElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    finalElement.setAttribute('id', getNameAttribute(element)!);
    finalElement.setAttribute('type', element.tagName);

    const description = getDescriptionAttribute(element);
    if (description) finalElement.setAttribute('desc', description);

    return finalElement;
}

/**
 * Create a Voltage Level <g> element.
 * @param voltageLevel The Voltage Level from the SCL document to use.
 * @returns A Voltage Level <g> element.
 */
export function createVoltageLevelElement(voltageLevel: Element) {
    return createGElement(voltageLevel);
}

/**
 * Create a Bay <g> element.
 * @param voltageLevel The Bay from the SCL document to use.
 * @returns A Bay <g> element.
 */
export function createBayElement(bay: Element) {
    return createGElement(bay);
}

/**
 * Create a basic text element.
 * @param element The text which is needing this text element.
 * @param coordinates The x and y coordinates of this text elements.
 * @returns The text element.
 */
export function createTextElement(textContent: string, coordinates: Point, textSize: string) {
    const finalElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    finalElement.textContent = textContent;
    finalElement.setAttribute('style', `font-family: Roboto, sans-serif; font-weight: 300; font-size: ${textSize}`);

    finalElement.setAttribute('x', `${coordinates.x}`);
    finalElement.setAttribute('y', `${coordinates.y}`);

    return finalElement;
}

/**
 * Create a Terminal element.
 * @param elementPosition The position of the element belonging to the terminal/
 * @param sideToDraw The side of the element the terminal must be drawn on.
 * @param terminalElement The terminal element to extract information from.
 * @returns A group element containing terminal elements.
 */
export function createTerminalElement(elementPosition: Point, sideToDraw: Side, terminalElement: Element) {
    const groupElement = createGElement(terminalElement);

    const terminalName = getNameAttribute(terminalElement)!;
    const pointToDrawTerminalOn = getCorrectSideCoordinatesForTerminal(elementPosition, sideToDraw);

    // TODO: Add this to the icons.ts file.
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    icon.setAttribute('id', `${terminalName}`);
    icon.setAttribute('cx', `${pointToDrawTerminalOn.x}`);
    icon.setAttribute('cy', `${pointToDrawTerminalOn.y}`);
    icon.setAttribute('r', '2');

    // Also add a text element.
    const textElementPosition = (sideToDraw == 'bottom' || sideToDraw == 'top') ?
        {x: pointToDrawTerminalOn.x! + 5, y: pointToDrawTerminalOn.y! + 5} :
        {x: pointToDrawTerminalOn.x! - 5, y: pointToDrawTerminalOn.y! - 5};
    const text = createTextElement(terminalName, textElementPosition, 'xx-small');

    groupElement.appendChild(icon);
    groupElement.appendChild(text);

    return groupElement;
}

/**
 * Create a Bus Bar element.
 * @param busBarName The name of the busbar
 * @param elementPosition The absolute position of the bus bar to place.
 * @param biggestVoltageLevelXCoordinate The biggest of the VoltageLevel the bus bar is in,
 *      so the method can decide how long the bus bar should be.
 * @returns The Bus Bar element.
 */
export function createBusBarElement(busBarElement: Element, biggestVoltageLevelXCoordinate: number) {
    const groupElement = createGElement(busBarElement);

    const busBarName = getNameAttribute(busBarElement)!
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

    const text = createTextElement(busBarName, {x: absolutePosition.x, y: absolutePosition.y! - 10}, 'small');
    groupElement.appendChild(text);

    return groupElement;
}

/**
 * Draw a route from the first point to the second point.
 * @param firstPoint The first point of this connection.
 * @param secondPoint The second point of this connection.
 * @param svgToDrawOn The SVG to draw the route on.
 * @param shape A custom shape defining custom height and width of the shapes.
 * @returns The sides where the routes are being drawn next to both points.
 */
 export function drawRoute(firstPoint: Point, secondPoint: Point, svgToDrawOn: HTMLElement, shape?: Shape): PointSides {
    const shapeA = {
      left: firstPoint.x!,
      top: firstPoint.y!,
      width: shape?.width ?? DEFAULT_ELEMENT_SIZE,
      height: shape?.height ?? DEFAULT_ELEMENT_SIZE,
    };
  
    const shapeB = {
      left: secondPoint.x!,
      top: secondPoint.y!,
      width: shape?.width ?? DEFAULT_ELEMENT_SIZE,
      height: shape?.height ?? DEFAULT_ELEMENT_SIZE,
    };
  
    // Get the preferred sides.
    const sides = getDirections(firstPoint, secondPoint);
  
    const path = OrthogonalConnector.route({
      pointA: { shape: shapeA, side: sides.firstPointSide, distance: 0.5 },
      pointB: { shape: shapeB, side: sides.secondPointSide, distance: 0.5 },
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
    line.setAttribute('stroke-width', '1');
  
    svgToDrawOn.appendChild(line);

    return sides;
}

/**
 * Small simple algorithm deciding on which side the route should be drawn
 * of two ends of a route.
 * @param firstPoint The first point (end) of a route.
 * @param secondPoint The second point (end) of a route.
 * @returns The sides.
 */
function getDirections(firstPoint: Point, secondPoint: Point): PointSides {
    // If points are underneath each other..
    if (firstPoint.x! == secondPoint.x!) {
        // Determine which one stands on top.
        if (firstPoint.y! < secondPoint.y!) {
            return {firstPointSide: 'bottom', secondPointSide: 'top'};
        } else {
            return {firstPointSide: 'top', secondPointSide: 'bottom'};
        }
    } else {
        if (firstPoint.y! <= secondPoint.y!) {
            if (firstPoint.x! < secondPoint.x!) {
                return {firstPointSide: 'right', secondPointSide: 'left'};
            } else {
                return {firstPointSide: 'left', secondPointSide: 'right'};
            }
        } else {
            if (firstPoint.x! < secondPoint.x!) {
                return {firstPointSide: 'left', secondPointSide: 'right'};
            } else {
                return {firstPointSide: 'right', secondPointSide: 'left'};
            }
        }
    }
}

/**
 * Get correct coordinates for placing a Terminal next to an element.
 * @param Point The absolute position of the element to have terminals next to it.
 * @param side On which side does the terminal needs to be placed.
 */
function getCorrectSideCoordinatesForTerminal(absolutePosition: Point, side: Side): Point {
    switch (side) {
        case "top": {
            const x = absolutePosition.x;
            const y = absolutePosition.y;
            return {
                x: x! + (DEFAULT_ELEMENT_SIZE / 2),
                y: y! - TERMINAL_OFFSET
            };
        }
        case "bottom": {
            const x = absolutePosition.x;
            const y = absolutePosition.y;
            return {
                x: x! + (DEFAULT_ELEMENT_SIZE / 2),
                y: y! + (DEFAULT_ELEMENT_SIZE + TERMINAL_OFFSET)
            };
        }
        case "left": {
            const x = absolutePosition.x;
            const y = absolutePosition.y;
            return {
                x: x! - TERMINAL_OFFSET,
                y: y! + (DEFAULT_ELEMENT_SIZE / 2)
            };
        }
        case "right": {
            const x = absolutePosition.x;
            const y = absolutePosition.y;
            return {
                x: x! + (DEFAULT_ELEMENT_SIZE + TERMINAL_OFFSET),
                y: y! + (DEFAULT_ELEMENT_SIZE / 2)
            };
        }
        default: {
            return absolutePosition;
        }
    }
}