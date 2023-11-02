import {Nsdoc} from "../foundation/nsdoc.js";

import {
  cloneElement,
  getDescriptionAttribute,
  getInstanceAttribute,
  getNameAttribute,
  getValue,
  SimpleAction,
  WizardInputElement
} from "../foundation.js";

export const LOCAMATION_MANUFACTURER = "Locamation B.V.";
export const LOCAMATION_PRIVATE = "LCMTN_VMU_SENSOR";
export const LOCAMATION_NS = "https://www.locamation.com/61850/VMU/SCL";
export const LOCAMATION_PREFIX = "lcmtn_ext";

export function lnHeader(ln: Element, nsDoc: Nsdoc): string {
  const prefix = ln.getAttribute('prefix');
  const inst = getInstanceAttribute(ln);

  const data = nsDoc.getDataDescription(ln);

  return `${prefix != null ? `${prefix} - ` : ``}${data.label}${inst ? ` - ${inst}` : ``}`;
}

export function lDeviceHeader(lDevice: Element): string {
  const nameOrInst = getNameAttribute(lDevice) ?? getInstanceAttribute(lDevice);
  const desc = getDescriptionAttribute(lDevice);

  return `${nameOrInst}${desc ? ` - ${desc}` : ``}`;
}

export function iedHeader(ied: Element): string {
  const name = getNameAttribute(ied);
  const desc = getDescriptionAttribute(ied);

  return `${name}${desc ? ' (' + desc + ')' : ''}`;
}


export function getInputFieldValue(inputs: WizardInputElement[], id: string): string | null {
  return getValue(inputs.find(i => i.id === id)!);
}

export function inputFieldChanged(inputs: WizardInputElement[], id: string, oldValue: string | null): boolean {
  const value = getInputFieldValue(inputs, id);
  if (oldValue) {
    return value !== oldValue;
  }
  return value !== null;
}


export function addPrefixAndNamespaceToDocument(element: Element): void {
  const rootElement = element.ownerDocument.firstElementChild!;
  if (!rootElement.hasAttribute('xmlns:' + LOCAMATION_PREFIX)) {
    rootElement.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:' + LOCAMATION_PREFIX, LOCAMATION_NS);
  }
}

export function getPrivate(element: Element): Element | null {
  return element.querySelector(`Private[type="${LOCAMATION_PRIVATE}"]`)!;
}

export function createEditorAction(locamationPrivate: Element | null, fieldType: string, value: string | null): SimpleAction[] {
  if (locamationPrivate) {
    let privateField = Array.from(locamationPrivate.querySelectorAll(`P[type="${fieldType}"]`))
      .filter(element => element.namespaceURI === LOCAMATION_NS)
      .pop();
    if (!privateField) {
      // Make sure the namespace is configured on the root element with the known prefix.
      addPrefixAndNamespaceToDocument(locamationPrivate);

      privateField = locamationPrivate.ownerDocument.createElementNS(LOCAMATION_NS, "P");
      privateField.setAttribute("type", fieldType);
      privateField.textContent = value;
      return [{new: {parent: locamationPrivate, element: privateField}}];
    }

    if (privateField.textContent !== value) {
      const newPrivateField = cloneElement(privateField, {});
      newPrivateField.textContent = value;
      return [{old: {element: privateField}, new: {element: newPrivateField}}];
    }
  }
  return [];
}

export function hasPrivateElement(locamationPrivate: Element | null, type: string): boolean {
  if (locamationPrivate) {
    return Array.from(locamationPrivate.querySelectorAll(`P[type="${type}"]`))
      .filter(element => element.namespaceURI === LOCAMATION_NS)
      .pop() !== undefined;
  }
  return false;
}

export function getPrivateTextValue(locamationPrivate: Element | null, type: string): string | null {
  if (locamationPrivate) {
    const privateElement =
      Array.from(locamationPrivate.querySelectorAll(`P[type="${type}"]`))
        .filter(element => element.namespaceURI === LOCAMATION_NS)
        .pop();
    if (privateElement) {
      return privateElement.textContent;
    }
  }
  return null;
}
