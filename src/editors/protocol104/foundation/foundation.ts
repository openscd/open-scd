import {
  getInstanceAttribute,
  getNameAttribute
} from "../../../foundation.js";

export const PRIVATE_TYPE_104 = "IEC_60870_5_104";

/**
 * Retrieve the full path as wanted for the IED Container in the 104 Plugin, meaning we go higher in the
 * hierarchy until the parent found is the IED, this element is excluded, because the containers are group per
 * IED.
 * From all parent between the DAI and IED the name or likely attributes are used to define a unique name.
 *
 * @param daiElement - The DAI Element for which the full path needs to be defined.
 * @returns The full path shown to the user for a DAI Element.
 */
export function getFullPath(daiElement: Element): string {
  let path = daiElement.getAttribute('name') ?? '';
  let parent = daiElement.parentElement;

  while (parent && parent.tagName != 'IED') {
    let value: string | undefined;
    switch (parent.tagName) {
      case 'LN':
      case 'LN0': {
        const prefix = parent.getAttribute('prefix');
        const inst = getInstanceAttribute(parent);
        value = `${prefix ? prefix + '-' : ''}${parent.getAttribute('lnClass')}${inst ? '-' + inst : ''}`;
        break;
      }
      case 'LDevice': {
        value = getNameAttribute(parent) ?? getInstanceAttribute(parent);
        break;
      }
      default: {
        // Just add the name to the list
        value = getNameAttribute(parent);
      }
    }
    path = (value ? value + ' / ' : '') + path;
    parent = parent.parentElement;
  }
  return path;
}

/**
 * Retrieve the CDC Value that belongs to a DAI Element, meaning, using the DOI/LN Elements to
 * search for a DO Element, which is again used to find the DO/DOType Element. The DOType Element
 * finally holds the attribute 'cdc'.
 *
 * @param daiElement - The DAI Element to start the search for the CDC Value.
 * @returns The CDC Value from the DOType Element.
 */
export function getCdcValue(daiElement: Element): string | null {
  const lnElement = daiElement.closest('LN0, LN');
  const doiElement = daiElement.closest('DOI');
  if (lnElement && doiElement) {
    const lnType = lnElement.getAttribute('lnType');
    const doName = doiElement.getAttribute('name');

    const doElement = daiElement.ownerDocument.querySelector(`LNodeType[id="${lnType}"] > DO[name="${doName}"]`)
    if (doElement) {
      const doType = doElement.getAttribute('type');
      const doTypeElement = daiElement.ownerDocument.querySelector(`DOType[id="${doType}"]`)
      return (doTypeElement ? doTypeElement.getAttribute('cdc') : null);
    }
  }
  return null;
}

/**
 * Enumeration stating the active view of the 104 plugin.
 */
export enum View {
  VALUES,
  NETWORK
}

export const VIEW_EVENT_NAME = 'view-change-104-plugin';

// Objects needed to register and fire the change of a view within the Communication 104 Plugin
export interface ViewDetail {
  view: View;
}
export type ViewEvent = CustomEvent<ViewDetail>;
export function newViewEvent(
  view: View,
): ViewEvent {
  return new CustomEvent<ViewDetail>(VIEW_EVENT_NAME, {
    bubbles: true,
    composed: true,
    detail: { view },
  });
}

declare global {
  interface ElementEventMap {
    [VIEW_EVENT_NAME]: ViewEvent;
  }
}
