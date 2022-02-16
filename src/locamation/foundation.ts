import {Nsdoc} from "../foundation/nsdoc.js";

import {getDescriptionAttribute, getInstanceAttribute, getNameAttribute, getValue, WizardInput} from "../foundation.js";

export const LOCAMATION_PRIVATE = "LCMTN_VMU_SENSOR";

export function lnHeader(ln: Element, nsDoc: Nsdoc): string {
  const prefix = ln.getAttribute('prefix');
  const inst = getInstanceAttribute(ln);

  const data = nsDoc.getDataDescription(ln);

  return `${prefix != null ? `${prefix} - ` : ``} ${data.label} ${inst ? ` - ${inst}` : ``}`;
}

export function lDeviceHeader(lDevice: Element): string {
  const nameOrInst = getNameAttribute(lDevice) ?? getInstanceAttribute(lDevice);
  const desc = getDescriptionAttribute(lDevice);

  return `${nameOrInst}${desc ? ` - ${desc}` : ``}`;
}

export function iedHeader(ied: Element): string {
  const name = getNameAttribute(ied);
  const description = getDescriptionAttribute(ied);

  return `${name}${description !== undefined ? ' (' + description + ')' : ''}`;
}

export function getInputFieldValue(inputs: WizardInput[], labelName: string): string | null {
  return getValue(inputs.find(i => i.label === labelName)!);
}

export function inputFieldChanged(inputs: WizardInput[], labelName: string, oldValue: string | null): boolean {
  const value = getInputFieldValue(inputs, labelName);
  if (oldValue) {
    return value !== oldValue;
  }
  return value !== null;
}

export function hasPrivateElement(element: Element | null, privateType: string, type: string): boolean {
  if (element) {
    return element.querySelector(`Private[type="${privateType}"] > P[type="${type}"]`) != null;
  }
  return false;
}

export function getPrivateTextValue(element: Element | null, privateType: string, type: string): string | null {
  if (element) {
    const privateElement = element.querySelector(`Private[type="${privateType}"] > P[type="${type}"]`);
    if (privateElement) {
      return privateElement.textContent;
    }
  }
  return null;
}
