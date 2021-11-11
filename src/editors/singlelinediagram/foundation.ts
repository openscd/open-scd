/**
 * A point is a position containing a x and a y within a SCL file.
 */
export interface Point {
    x: number | undefined;
    y: number | undefined;
}

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