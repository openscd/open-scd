import {
  getNameAttribute,
  getPathNameAttribute,
} from '@openscd/open-scd/src/foundation.js';

/**
 * A point is a position containing a x and a y within a SCL file.
 */
export interface Point {
  x: number;
  y: number;
}

export const SCL_COORDINATES_NAMESPACE =
  'http://www.iec.ch/61850/2003/SCLcoordinates';

/** Scope factor: the ConnectivityNode allocation algorithm works better with a scale factor which is bigger than 1. */
const COORDINATES_SCALE_FACTOR = 2;

/**
 * Get the coordinates of a XML element (x and y coordinates).
 * @param element - The element to extract coordinates from.
 * @returns A point containing the coordinates.
 */
export function getRelativeCoordinates(element: Element): Point {
  const x = element.getAttributeNS(SCL_COORDINATES_NAMESPACE, 'x');
  const y = element.getAttributeNS(SCL_COORDINATES_NAMESPACE, 'y');

  return {
    x: x ? parseInt(x) * COORDINATES_SCALE_FACTOR : 0,
    y: y ? parseInt(y) * COORDINATES_SCALE_FACTOR : 0,
  };
}

/**
 * Get the absolute (its own and all parents') coordinates of a SCL element (x and y coordinates)
 * @param element - The element to extract coordinates from.
 * @returns A point containing the coordinates.
 */
export function getAbsoluteCoordinates(element: Element): Point {
  if (!element.parentElement || element.parentElement?.tagName === 'SCL')
    return getRelativeCoordinates(element);

  const absParent = getAbsoluteCoordinates(element.parentElement);
  const relElement = getRelativeCoordinates(element);
  return {
    x: absParent.x! + relElement.x!,
    y: absParent.y! + relElement.y!,
  };
}

/**
 * Checking of an element is a BusBar or not.
 * @param element - The element to check.
 * @returns Is the element a BusBar or not.
 */
export function isBusBar(element: Element): boolean {
  return (
    element.children.length === 1 &&
    element.children[0].tagName === 'ConnectivityNode'
  );
}

/**
 * Get all the connected terminals to a given element.
 * @param element - The element to check.
 * @returns All connected terminals.
 */
export function getConnectedTerminals(element: Element): Element[] {
  const substationElement = element?.closest('Substation');
  if (!substationElement) return [];

  const path = getPathNameAttribute(element) ?? '';
  const [substationName, voltageLevelName, bayName] = path.split('/');

  return Array.from(substationElement.getElementsByTagName('Terminal')).filter(
    terminal =>
      terminal.getAttribute('connectivityNode') === path &&
      terminal.getAttribute('cNodeName') === getNameAttribute(element) &&
      (!terminal.hasAttribute('substationName') ||
        terminal.getAttribute('substationName') === substationName) &&
      (!terminal.hasAttribute('voltageLevelName') ||
        terminal.getAttribute('voltageLevelName') === voltageLevelName) &&
      (!terminal.hasAttribute('bayName') ||
        terminal.getAttribute('bayName') === bayName)
  );
}

/**
 * Calculate the SCL x and y coordinate of a Connectivity Node.
 * The algorithm is as follow:
 * - Get all elements that are connected to this Connectivity Node.
 * - Extract the SCL x and y coordinates of these Connectivity Nodes and add them up.
 * - Divide the final x and y numbers by the number of connected elements. This way, you get an so-called average.
 * @param cNodeElement  - The Connectivity Node to calculate the X and Y Coordinates for.
 * @returns The calculated SCL x and y coordinates for this Connectivity Node.
 */
export function calculateConnectivityNodeCoordinates(
  cNodeElement: Element
): Point {
  // If element is not a Connectivity Node, return default {x: 0, y: 0}
  if (cNodeElement.tagName != 'ConnectivityNode') return { x: 0, y: 0 };

  const substationElement = cNodeElement.closest('Substation');
  const pathName = getPathNameAttribute(cNodeElement);

  let nrOfConnections = 0;
  let nrOfXConnections = 0;
  let totalX = 0;
  let totalY = 0;

  Array.from(
    substationElement!.querySelectorAll('ConductingEquipment, PowerTransformer')
  )
    .filter(
      equipment =>
        equipment.querySelector(`Terminal[connectivityNode="${pathName}"]`) !=
        null
    )
    .forEach(equipment => {
      nrOfConnections++;

      const { x, y } = getAbsoluteCoordinates(equipment);

      // Only if the Element is in the same bay, we will use that X-value to calculate the location
      // of the Connectivity Node. This will cause the Connectivity Node to stay with the boundaries
      // of the Bay and not causing al kind of overlays between bays.
      if (equipment.parentElement === cNodeElement.parentElement) {
        nrOfXConnections++;
        totalX += x!;
      }
      totalY += y!;
    });

  if (nrOfConnections === 0) return { x: 0, y: 0 };
  if (nrOfConnections === 1) return { x: totalX + 1, y: totalY + 1 };

  return {
    x: Math.round(totalX / nrOfXConnections),
    y: Math.round(totalY / nrOfConnections),
  };
}

export function getCommonParentElement(
  leftElement: Element,
  rightElement: Element,
  defaultParent: Element | null
): Element | null {
  let leftParentElement = leftElement.parentElement;
  while (leftParentElement) {
    if (leftParentElement.contains(rightElement)) {
      return leftParentElement;
    }
    leftParentElement = leftParentElement.parentElement;
  }
  return defaultParent;
}
