import { serviceTypes } from '../foundation.js';

import { compareNames, getSclSchemaVersion } from '../../../foundation.js';

export function getFcdaTitleValue(fcdaElement: Element): string {
  return `${fcdaElement.getAttribute('doName')}${
    fcdaElement.hasAttribute('doName') && fcdaElement.hasAttribute('daName')
      ? `.`
      : ``
  }${fcdaElement.getAttribute('daName')}`;
}

/**
 * Check if specific attributes from the ExtRef Element are the same as the ones from the FCDA Element
 * and also if the IED Name is the same. If that is the case this ExtRef subscribes to the selected FCDA
 * Element.
 *
 * @param extRefElement - The Ext Ref Element to check.
 */
export function isSubscribedTo(
  fcdaElement: Element,
  extRefElement: Element,
  currentIedElement: Element,
  controlElement: Element,
  controlTag: 'SampledValueControl' | 'GSEControl'
): boolean {
  return (
    extRefElement.getAttribute('iedName') ===
      currentIedElement?.getAttribute('name') &&
    sameAttributeValue(fcdaElement, extRefElement, 'ldInst') &&
    sameAttributeValue(fcdaElement, extRefElement, 'prefix') &&
    sameAttributeValue(fcdaElement, extRefElement, 'lnClass') &&
    sameAttributeValue(fcdaElement, extRefElement, 'lnInst') &&
    sameAttributeValue(fcdaElement, extRefElement, 'doName') &&
    sameAttributeValue(fcdaElement, extRefElement, 'daName') &&
    checkEditionSpecificRequirements(controlElement, extRefElement, controlTag)
  );
}

export function sameAttributeValue(
  fcdaElement: Element,
  extRefElement: Element,
  attributeName: string
): boolean {
  return (
    (extRefElement.getAttribute(attributeName) ?? '') ===
    (fcdaElement.getAttribute(attributeName) ?? '')
  );
}

export function checkEditionSpecificRequirements(
  controlElement: Element,
  extRefElement: Element,
  controlTag: 'SampledValueControl' | 'GSEControl'
): boolean {
  if (getSclSchemaVersion(extRefElement.ownerDocument) === '2003') return true;
  return (
    extRefElement.getAttribute('serviceType') === serviceTypes[controlTag] &&
    extRefElement.getAttribute('srcLDInst') ===
      controlElement?.closest('LDevice')?.getAttribute('inst') &&
    (extRefElement.getAttribute('srcPrefix') || '') ===
      (controlElement?.closest('LN0')?.getAttribute('prefix') || '') &&
    extRefElement.getAttribute('srcLNClass') ===
      controlElement?.closest('LN0')?.getAttribute('lnClass') &&
    (extRefElement.getAttribute('srcLNInst') || '') ===
      controlElement?.closest('LN0')?.getAttribute('inst') &&
    extRefElement.getAttribute('srcCBName') ===
      controlElement?.getAttribute('name')
  );
}

export function getSubscribedExtRefElements(
  doc: XMLDocument,
  iedElement: Element,
  fcdaElement: Element,
  controlElement: Element,
  controlTag: 'SampledValueControl' | 'GSEControl'
): Element[] {
  return getExtRefElements(doc, iedElement).filter(extRefElement =>
    isSubscribedTo(fcdaElement, extRefElement, iedElement, controlElement, controlTag)
  );
}

export function getExtRefElements(
  doc: XMLDocument,
  iedElement: Element
): Element[] {
  if (doc) {
    return Array.from(doc.querySelectorAll('ExtRef'))
      .filter(element => element.hasAttribute('intAddr'))
      .filter(element => element.closest('IED') !== iedElement)
      .sort((a, b) =>
        compareNames(
          `${a.getAttribute('intAddr')}`,
          `${b.getAttribute('intAddr')}`
        )
      );
  }
  return [];
}

export interface FcdaSelectDetail {
  controlElement: Element | undefined;
  fcda: Element | undefined;
}
export type FcdaSelectEvent = CustomEvent<FcdaSelectDetail>;
export function newFcdaSelectEvent(
  controlElement: Element | undefined,
  fcda: Element | undefined,
  eventInitDict?: CustomEventInit<FcdaSelectDetail>
): FcdaSelectEvent {
  return new CustomEvent<FcdaSelectDetail>('fcda-select', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { controlElement, fcda, ...eventInitDict?.detail },
  });
}

declare global {
  interface ElementEventMap {
    ['fcda-select']: FcdaSelectEvent;
  }
}
