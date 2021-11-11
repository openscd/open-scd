import { getCoordinates, getDescriptionAttribute, getNameAttribute, Point } from "./foundation";

/**
 * Default 'grid size' of our SVG.
 */
 export const SVG_GRID_SIZE = 64;
 
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

export function getPositionWithoutCoordinatedElement(element: Element, point: Point): Point {
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

    const description = getDescriptionAttribute(element);
    if (description) finalElement.setAttribute('desc', description);

    return finalElement;
}