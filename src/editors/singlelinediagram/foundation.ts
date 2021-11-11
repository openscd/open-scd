/**
 * A point is a position containing a x and a y within a SCL file.
 */
export interface Point {
    x: number | undefined;
    y: number | undefined;
}

/**
 * Default 'grid size' of our SVG.
 */
export const SVG_GRID_SIZE = 64;

/**
 * Extract the 'name' attribute from the given XML element.
 * @param element The element to extract name from.
 * @returns the name, or a '-' if there is no name.
 */
export function getNameAttribute(element: Element): string | undefined {
    const name = element.getAttribute('name');
    return name ? name : undefined;
}

/**
 * Extract the 'desc' attribute from the given XML element.
 * @param element The element to extract description from.
 * @returns the name, or a '-' if there is no description.
 */
export function getDescriptionAttribute(element: Element): string | undefined {
    const name = element.getAttribute('desc');
    return name ? name : undefined;
}

/**
 * Get the coordaintes of a XML element (x and y coordinates).
 * @param element The element to extract coordinates from.
 * @returns A point containing the coordinares.
 */
export function getCoordinates(element: Element): Point {
    const x = element.getAttributeNS(
      'http://www.iec.ch/61850/2003/SCLcoordinates',
      'x'
    );
    const y = element.getAttributeNS(
      'http://www.iec.ch/61850/2003/SCLcoordinates',
      'y'
    );
  
    return {
      x: x ? parseInt(x) : 0,
      y: y ? parseInt(y) : 0,
    }
}

/**
 * Checking of an element is a BusBar or not.
 * @param element The element to check.
 * @returns Is the element a BusBar or not.
 */
export function isBusBar(element: Element): boolean {
    return (
        element.children.length === 1 && element.children[0].tagName === 'ConnectivityNode'
    );
}

/**
 * Get the full position of an element (multiplied with an offset for the SVG).
 * It's just a matter of adding all the position up of the element including it's parent(s).
 * @param element The element to get the position for.
 * @returns A point containing the full x/y position.
 */
export function getPosition(element: Element): Point {
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