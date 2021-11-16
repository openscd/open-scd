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
 * Extract the 'pathName' attribute from the given XML element.
 * @param element The element to extract path name from.
 * @returns the name, or a '-' if there is no path name.
 */
export function getPathNameAttribute(element: Element): string | undefined {
    const name = element.getAttribute('pathName');
    return name ? name : undefined;
}

/**
 * Get the coordaintes of a XML element (x and y coordinates).
 * @param element The element to extract coordinates from.
 * @returns A point containing the coordinares.
 */
export function getSCLCoordinates(element: Element): Point {
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
 * Get all the connected terminals to a given element.
 * @param element The element to check.
 * @returns All connected terminals.
 */
export function getConnectedTerminals(element: Element): Element[] {
    const substationElement = element?.closest('Substation');
    if (!substationElement) return [];
  
    const path = getPathNameAttribute(element) ?? '';
    const [substationName, voltageLevelName, bayName, _] = path.split('/');
  
    return Array.from(substationElement.getElementsByTagName('Terminal')).filter(
      terminal =>
        terminal.getAttribute('connectivityNode') === path &&
        terminal.getAttribute('substationName') === substationName &&
        terminal.getAttribute('voltageLevelName') === voltageLevelName &&
        terminal.getAttribute('bayName') === bayName &&
        terminal.getAttribute('cNodeName') === getNameAttribute(element)
    );
}

/**
 * Calculate the SCL x and y coordinate of a Connectivity Node.
 * The algorithm is as follow:
 * - Get all elements that are connected to this Connectivity Node.
 * - Extract the SCL x and y coordinates of these Connectivity Nodes and add them up.
 * - Divide the final x and y numbers by the number of connected elements. This way, you get an so-called average.
 * @param doc The full SCL document to scan for connected elements.
 * @param cNodePathName The pathName of the Connectivity Node to calculate the SCL x and y coordinates.
 * @returns The calculated SCL x and y coordinates for this Connectivty Node.
 */
export function calculateConnectivityNodeSclCoordinates(cNodeElement: Element): Point {
    const substationElement = cNodeElement.closest('Substation');
    const pathName = getPathNameAttribute(cNodeElement);

    let nrOfConnections = 0;
    let totalX = 0;
    let totalY = 0;

    Array.from(substationElement!.querySelectorAll('ConductingEquipment'))
        .filter(equipment => equipment.querySelector(`Terminal[connectivityNode="${pathName}"]`) != null)
        .forEach(equipment => {
            nrOfConnections++;

            const {x, y} = getSCLCoordinates(equipment)

            totalX += x!;
            totalY += y!;
        })

    return {x: Math.round(totalX / nrOfConnections), y: Math.round(totalY / nrOfConnections)};
}