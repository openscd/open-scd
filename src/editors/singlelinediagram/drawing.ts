import { OrthogonalConnector, Side } from "../../../public/js/ortho-connector";
import { getCoordinates, getDescriptionAttribute, getNameAttribute, Point } from "./foundation";

/**
 * Default 'grid size' of our SVG.
 */
 export const SVG_GRID_SIZE = 64;

/**
 * Defining the sides of route drawing of the two points
 * at the end of a route.
 */
interface PointSides {
    firstPointSide: Side;
    secondPointSide: Side;
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
            const bayPosition = getCoordinates(element.parentElement!);
            const voltageLevelPosition = getCoordinates(element.parentElement!.parentElement!);
            const elementPosition = getCoordinates(element);
            return {
                x: (bayPosition.x! + voltageLevelPosition.x! + elementPosition.x!) * SVG_GRID_SIZE,
                y: (bayPosition.y! + voltageLevelPosition.y! + elementPosition.y!) * SVG_GRID_SIZE
            }
        }
        case 'VoltageLevel': {
            const voltageLevelPosition = getCoordinates(element.parentElement!.parentElement!);
            const elementPosition = getCoordinates(element);
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

export function getAbsolutePositionWithoutCoordinatedElement(element: Element, point: Point): Point {
    switch (element.parentElement!.tagName) {
        case 'Bay': {
            const bayPosition = getCoordinates(element.parentElement!);
            const voltageLevelPosition = getCoordinates(element.parentElement!.parentElement!);
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
 * Draw a route from the first point to the second point.
 * @param firstPoint The first point of this connection.
 * @param secondPoint The second point of this connection.
 * @param downer Is this part drawn up or down?
 * @param svgToDrawOn The SVG to draw the route on.
 */
 export function drawRoute(firstPoint: Point, secondPoint: Point, svgToDrawOn: HTMLElement): void {
    const shapeA = {
      left: firstPoint.x!,
      top: firstPoint.y!,
      width: 1,
      height: 1,
    };
  
    const shapeB = {
      left: secondPoint.x!,
      top: secondPoint.y!,
      width: 1,
      height: 1,
    };
  
    // Get the preferred sides.
    const {firstPointSide, secondPointSide} = getDirections(firstPoint, secondPoint);
  
    const path = OrthogonalConnector.route({
      pointA: { shape: shapeA, side: firstPointSide, distance: 0.5 },
      pointB: { shape: shapeB, side: secondPointSide, distance: 0.5 },
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
        d = d + `M ${x} ${y}`;
      } else {
        d = d + ` L ${x} ${y}`;
      }
    });
  
    line.setAttribute('d', d);
    line.setAttribute('fill', 'transparent');
    line.setAttribute('stroke', 'currentColor');
    line.setAttribute('stroke-width', '1');
  
    svgToDrawOn.appendChild(line);
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