import { css, LitElement, query } from 'lit-element';
import {
  cloneElement,
  compareNames,
  Create,
  createElement,
  Delete,
  getSclSchemaVersion,
} from '../../foundation.js';
import {
  createTemplateStructure,
  determineUninitializedStructure,
  initializeElements,
} from '../../foundation/dai.js';
import { getFcdaReferences } from '../../foundation/ied.js';
import { SCL_NAMESPACE } from '../../schemas.js';

export enum View {
  PUBLISHER,
  SUBSCRIBER,
}

/**
 * Enumeration stating the Subscribe status of a IED to a GOOSE or Sampled Value.
 */
export enum SubscribeStatus {
  Full,
  Partial,
  None,
}

export interface ViewDetail {
  view: View;
}
export type ViewEvent = CustomEvent<ViewDetail>;
export function newViewEvent(
  view: View,
  eventInitDict?: CustomEventInit<ViewDetail>
): ViewEvent {
  return new CustomEvent<ViewDetail>('view', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { view, ...eventInitDict?.detail },
  });
}

export interface IEDSelectDetail {
  ied: Element | undefined;
}
export type IEDSelectEvent = CustomEvent<IEDSelectDetail>;
export function newIEDSelectEvent(
  ied: Element | undefined,
  eventInitDict?: CustomEventInit<IEDSelectDetail>
): IEDSelectEvent {
  return new CustomEvent<IEDSelectDetail>('ied-select', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { ied, ...eventInitDict?.detail },
  });
}

export interface FcdaSelectDetail {
  control: Element | undefined;
  fcda: Element | undefined;
}
export type FcdaSelectEvent = CustomEvent<FcdaSelectDetail>;
export function newFcdaSelectEvent(
  control: Element | undefined,
  fcda: Element | undefined,
  eventInitDict?: CustomEventInit<FcdaSelectDetail>
): FcdaSelectEvent {
  return new CustomEvent<FcdaSelectDetail>('fcda-select', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { control, fcda, ...eventInitDict?.detail },
  });
}

export interface SubscriptionChangedDetail {
  control: Element | undefined;
  fcda: Element | undefined;
}
export type SubscriptionChangedEvent = CustomEvent<SubscriptionChangedDetail>;
export function newSubscriptionChangedEvent(
  control: Element | undefined,
  fcda: Element | undefined,
  eventInitDict?: CustomEventInit<SubscriptionChangedDetail>
): SubscriptionChangedEvent {
  return new CustomEvent<SubscriptionChangedDetail>('subscription-changed', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { control, fcda, ...eventInitDict?.detail },
  });
}

export function getFcdaTitleValue(fcdaElement: Element): string {
  return `${fcdaElement.getAttribute('doName')}${
    fcdaElement.hasAttribute('doName') && fcdaElement.hasAttribute('daName')
      ? `.`
      : ``
  }${fcdaElement.getAttribute('daName')}`;
}

export function getFcdaSubtitleValue(fcdaElement: Element): string {
  return `${fcdaElement.getAttribute('ldInst')} ${
    fcdaElement.hasAttribute('ldInst') && fcdaElement.hasAttribute('prefix')
      ? `/`
      : ''
  } ${fcdaElement.getAttribute('prefix')} ${fcdaElement.getAttribute(
    'lnClass'
  )} ${fcdaElement.getAttribute('lnInst')}`;
}

export function existExtRef(
  parentInputs: Element,
  fcda: Element,
  control: Element | undefined
): boolean {
  return !!getExtRef(parentInputs, fcda, control);
}

export function getExtRef(
  parentInputs: Element,
  fcda: Element,
  control: Element | undefined
): Element | undefined {
  function createCriteria(attributeName: string, value: string | null): string {
    if (value) {
      return `[${attributeName}="${value}"]`;
    }
    return '';
  }

  const iedName = fcda.closest('IED')?.getAttribute('name');
  if (!iedName) {
    return undefined;
  }

  let controlCriteria = '';
  if (control && getSclSchemaVersion(fcda.ownerDocument) !== '2003') {
    controlCriteria = `[serviceType="${serviceTypes[control.tagName]!}"]`;
    controlCriteria += createCriteria(
      'srcLDInst',
      control.closest('LDevice')?.getAttribute('inst') ?? null
    );
    controlCriteria += createCriteria(
      'srcLNClass',
      control.closest('LN0,LN')?.getAttribute('lnClass') ?? null
    );
    controlCriteria += createCriteria(
      'srcLNInst',
      control.closest('LN0,LN')?.getAttribute('inst') ?? null
    );
    controlCriteria += createCriteria(
      'srcCBName',
      control.getAttribute('name') ?? null
    );
  }

  return Array.from(
    parentInputs.querySelectorAll(
      `ExtRef[iedName="${iedName}"]${getFcdaReferences(fcda)}${controlCriteria}`
    )
  ).find(extRefElement => !extRefElement.hasAttribute('intAddr'));
}

/**
 * Returns an array with a single Create action to create a new
 * supervision element for the given GOOSE/SMV message and subscriber IED.
 *
 * @param controlBlock The GOOSE or SMV message element
 * @param subscriberIED The subscriber IED
 * @returns an empty array if instantiation is not possible or an array with a single Create action
 */
export function instantiateSubscriptionSupervision(
  controlBlock: Element | undefined,
  subscriberIED: Element | undefined
): Create[] {
  const supervisionType =
    controlBlock?.tagName === 'GSEControl' ? 'LGOS' : 'LSVS';
  if (
    !controlBlock ||
    !subscriberIED ||
    !isSupervisionAllowed(controlBlock, subscriberIED, supervisionType)
  )
    return [];
  const availableLN = findOrCreateAvailableLNInst(
    controlBlock,
    subscriberIED,
    supervisionType
  );
  if (!availableLN) return [];
  // First, we make suere that LN's inst is unique and non-empty
  const inst = availableLN.getAttribute('inst') ?? '';
  if (inst === '') {
    const instNumber =
      Array.from(
        subscriberIED.querySelectorAll(`LN[lnClass="${supervisionType}"]`)
      ).reduce((highestVal, ln) => {
        return ln.getAttribute('inst')
          ? Math.max(highestVal, +ln.getAttribute('inst')!)
          : highestVal;
      }, 0) + 1;
    availableLN.setAttribute('inst', '' + instNumber);
  }
  // Then, create the templateStructure array
  const templateStructure = createTemplateStructure(availableLN, [
    controlBlock?.tagName === 'GSEControl' ? 'GoCBRef' : 'SvCBRef',
    'setSrcRef',
  ]);
  if (!templateStructure) return [];
  // Determine where to start creating new elements (DOI/SDI/DAI)
  const [parentElement, uninitializedTemplateStructure] =
    determineUninitializedStructure(availableLN, templateStructure);
  // // Next create all missing elements (DOI/SDI/DAI)
  const newElement = initializeElements(uninitializedTemplateStructure);
  newElement.querySelector('Val')!.textContent =
    controlBlockReference(controlBlock);
  const createActions: Create[] = [];
  if (!availableLN.parentElement) {
    const parent = subscriberIED.querySelector(
      `LN[lnClass="${supervisionType}"]`
    )?.parentElement;
    if (parent)
      createActions.push({
        new: {
          parent,
          element: availableLN,
        },
      });
  }
  return createActions.concat([
    {
      new: {
        parent: parentElement,
        element: newElement,
      },
    },
  ]);
}

/**
 * Return an array with a single Delete action to delete the supervision element
 * for the given GOOSE/SMV message and subscriber IED.
 */
export function removeSubscriptionSupervision(
  controlBlock: Element | undefined,
  subscriberIED: Element | undefined
): Delete[] {
  if (!controlBlock || !subscriberIED) return [];
  const supervisionType =
    controlBlock?.tagName === 'GSEControl' ? 'LGOS' : 'LSVS';
  const valElement = Array.from(
    subscriberIED.querySelectorAll(
      `LN[lnClass="${supervisionType}"]>DOI>DAI>Val,LN0[lnClass="${supervisionType}"]>DOI>DAI>Val`
    )
  ).find(val => val.textContent == controlBlockReference(controlBlock));
  if (!valElement) return [];
  const lnElement = valElement.closest('DOI')?.parentElement;
  if (!lnElement || !lnElement.parentElement) return [];
  // Check if that one has been created by OpenSCD (private section exists)
  const isOpenScdCreated = lnElement.querySelector(
    'Private[type="OpenSCD.create"]'
  );
  return isOpenScdCreated
    ? [
        {
          old: {
            parent: lnElement.parentElement,
            element: lnElement,
          },
        },
      ]
    : [
        {
          old: {
            parent: lnElement,
            element: valElement.closest('DOI')!,
          },
        },
      ];
}

/**
 * Checks if the given combination of GOOSE/SMV message and subscriber IED allows for subscription supervision.
 * @param controlBlock The GOOSE or SMV message element
 * @param subscriberIED The subscriber IED
 */
function isSupervisionAllowed(
  controlBlock: Element,
  subscriberIED: Element,
  supervisionType: string
): boolean {
  if (getSclSchemaVersion(subscriberIED.ownerDocument) === '2003') return false;
  if (subscriberIED.querySelector(`LN[lnClass="${supervisionType}"]`) === null)
    return false;
  if (
    Array.from(
      subscriberIED.querySelectorAll(
        `LN[lnClass="${supervisionType}"]>DOI>DAI>Val`
      )
    ).find(val => val.textContent == controlBlockReference(controlBlock))
  )
    return false;
  if (
    maxSupervisions(subscriberIED, controlBlock) <=
    instantiatedSupervisionsCount(subscriberIED, controlBlock, supervisionType)
  )
    return false;
  return true;
}
/** Returns an new or existing LN instance available for supervision instantiation
 *
 * @param controlBlock The GOOSE or SMV message element
 * @param subscriberIED The subscriber IED
 * @returns The LN instance or null if no LN instance could be found or created
 */
export function findOrCreateAvailableLNInst(
  controlBlock: Element,
  subscriberIED: Element,
  supervisionType: string
): Element | null {
  const firstEmptyLN = Array.from(
    subscriberIED.querySelectorAll(`LN[lnClass="${supervisionType}"]`)
  ).find(
    ln =>
      ln.querySelector('DOI>DAI>Val') === null ||
      ln.querySelector('DOI>DAI>Val')?.textContent === ''
  );
  if (firstEmptyLN) return firstEmptyLN;
  const newElement = subscriberIED.ownerDocument.createElementNS(
    SCL_NAMESPACE,
    'LN'
  );
  const openScdTag = subscriberIED.ownerDocument.createElementNS(
    SCL_NAMESPACE,
    'Private'
  );
  openScdTag.setAttribute('type', 'OpenSCD.create');
  newElement.appendChild(openScdTag);
  newElement.setAttribute('lnClass', supervisionType);
  const instantiatedSibling = subscriberIED
    .querySelector(`LN[lnClass="${supervisionType}"]>DOI>DAI>Val`)
    ?.closest('LN');
  if (!instantiatedSibling) return null;
  newElement.setAttribute(
    'lnType',
    instantiatedSibling.getAttribute('lnType') ?? ''
  );
  return newElement;
}

/**
 * Counts the number of LN instances with proper supervision for the given control block set up.
 *
 * @param subscriberIED The subscriber IED
 * @param controlBlock The GOOSE or SMV message element
 * @returns The number of LN instances with supervision set up
 */
export function instantiatedSupervisionsCount(
  subscriberIED: Element,
  controlBlock: Element,
  supervisionType: string
): number {
  const instantiatedValues = Array.from(
    subscriberIED.querySelectorAll(
      `LN[lnClass="${supervisionType}"]>DOI>DAI>Val`
    )
  ).filter(val => val.textContent !== '');
  return instantiatedValues.length;
}

/**
 * Counts the max number of LN instances with supervision allowed for
 * the given control block's type of message.
 *
 * @param subscriberIED The subscriber IED
 * @param controlBlock The GOOSE or SMV message element
 * @returns The max number of LN instances with supervision allowed
 */
export function maxSupervisions(
  subscriberIED: Element,
  controlBlock: Element
): number {
  const maxAttr = controlBlock.tagName === 'GSEControl' ? 'maxGo' : 'maxSv';
  const maxValues = parseInt(
    subscriberIED
      .querySelector('Services>SupSubscription')
      ?.getAttribute(maxAttr) ?? '0'
  );
  return isNaN(maxValues) ? 0 : maxValues;
}

/**
 * Creates a string pointer to the control block element.
 *
 * @param controlBlock The GOOSE or SMV message element
 * @returns null if the control block is undefined or a string pointer to the control block element
 */
export function controlBlockReference(
  controlBlock: Element | undefined
): string | null {
  if (!controlBlock) return null;
  const eitherLN = controlBlock.closest('LN,LN0');
  const prefix = eitherLN?.getAttribute('prefix') ?? '';
  const lnClass = eitherLN?.getAttribute('lnClass');
  const lnInst = eitherLN?.getAttribute('inst') ?? '';
  const ldInst = controlBlock.closest('LDevice')?.getAttribute('inst');
  const iedName = controlBlock.closest('IED')?.getAttribute('name');
  const cbName = controlBlock.getAttribute('name');
  if (!cbName && !iedName && !ldInst && !lnClass) return null;
  return `${iedName}${ldInst}/${prefix}${lnClass}${lnInst}.${cbName}`;
}

export function canCreateValidExtRef(
  fcda: Element,
  controlBlock: Element | undefined
): boolean {
  const iedName = fcda.closest('IED')?.getAttribute('name');
  const [ldInst, lnClass, lnInst, doName] = [
    'ldInst',
    'lnClass',
    'lnInst',
    'doName',
  ].map(attr => fcda.getAttribute(attr));
  if (!iedName || !ldInst || !lnClass || !lnInst || !doName) {
    return false;
  }

  // For 2003 schema or serviceType `Poll`, the extra fields aren't needed.
  if (
    getSclSchemaVersion(fcda.ownerDocument) === '2003' ||
    controlBlock === undefined
  ) {
    return true;
  }

  const srcLDInst = controlBlock.closest('LDevice')?.getAttribute('inst');
  const srcLNClass = controlBlock.closest('LN0,LN')?.getAttribute('lnClass');
  const srcLNInst = controlBlock.closest('LN0,LN')?.getAttribute('inst');
  const srcCBName = controlBlock.getAttribute('name');

  // For srcLNInst an empty string is allowed in `LN0`
  return !(
    !srcLDInst ||
    !srcLNClass ||
    !srcCBName ||
    typeof srcLNInst !== 'string'
  );
}

export const serviceTypes: Partial<Record<string, string>> = {
  ReportControl: 'Report',
  GSEControl: 'GOOSE',
  SampledValueControl: 'SMV',
};

/**
 * Create a new ExtRef Element depending on the SCL Edition copy attributes from the Control Element,
 * FCDA Element and related Elements.
 *
 * @param controlElement - `ReportControl`, `GSEControl` or `SampledValueControl` source element
 * @param fcdaElement    - The source data attribute element.
 * @returns The new created ExtRef element, which can be added to the document.
 */
export function createExtRefElement(
  controlElement: Element | undefined,
  fcdaElement: Element
): Element {
  const iedName = fcdaElement.closest('IED')?.getAttribute('name') ?? null;
  const [ldInst, prefix, lnClass, lnInst, doName, daName] = [
    'ldInst',
    'prefix',
    'lnClass',
    'lnInst',
    'doName',
    'daName',
  ].map(attr => fcdaElement.getAttribute(attr));

  if (getSclSchemaVersion(fcdaElement.ownerDocument) === '2003') {
    // Edition 2003(1) does not define serviceType and its MCD attribute starting with src...
    return createElement(fcdaElement.ownerDocument, 'ExtRef', {
      iedName,
      ldInst,
      lnClass,
      lnInst,
      prefix,
      doName,
      daName,
    });
  }

  if (!controlElement || !serviceTypes[controlElement.tagName]) {
    //for invalid control block tag name assume polling
    return createElement(fcdaElement.ownerDocument, 'ExtRef', {
      iedName,
      serviceType: 'Poll',
      ldInst,
      lnClass,
      lnInst,
      prefix,
      doName,
      daName,
    });
  }

  // default is empty string as attributes are mandatory acc to IEC 61850-6 >Ed2
  const srcLDInst =
    controlElement.closest('LDevice')?.getAttribute('inst') ?? '';
  const srcPrefix =
    controlElement.closest('LN0,LN')?.getAttribute('prefix') ?? '';
  const srcLNClass =
    controlElement.closest('LN0,LN')?.getAttribute('lnClass') ?? '';
  const srcLNInst = controlElement.closest('LN0,LN')?.getAttribute('inst');
  const srcCBName = controlElement.getAttribute('name') ?? '';

  return createElement(fcdaElement.ownerDocument, 'ExtRef', {
    iedName,
    serviceType: serviceTypes[controlElement.tagName]!,
    ldInst,
    lnClass,
    lnInst,
    prefix,
    doName,
    daName,
    srcLDInst,
    srcPrefix,
    srcLNClass,
    srcLNInst: srcLNInst ? srcLNInst : null,
    srcCBName,
  });
}

/**
 * Create a clone of the passed ExtRefElement and updated or set the required attributes on the cloned element
 * depending on the Edition and type of Control Element.
 *
 * @param extRefElement  - The ExtRef Element to clone and update.
 * @param controlElement - `ReportControl`, `GSEControl` or `SampledValueControl` source element
 * @param fcdaElement    - The source data attribute element.
 * @returns A cloned ExtRef Element with updated information to be used for example in a Replace Action.
 */
export function updateExtRefElement(
  extRefElement: Element,
  controlElement: Element | undefined,
  fcdaElement: Element
): Element {
  const iedName = fcdaElement.closest('IED')?.getAttribute('name') ?? null;
  const [ldInst, prefix, lnClass, lnInst, doName, daName] = [
    'ldInst',
    'prefix',
    'lnClass',
    'lnInst',
    'doName',
    'daName',
  ].map(attr => fcdaElement.getAttribute(attr));

  if (getSclSchemaVersion(fcdaElement.ownerDocument) === '2003') {
    // Edition 2003(1) does not define serviceType and its MCD attribute starting with src...
    return cloneElement(extRefElement, {
      iedName,
      serviceType: null,
      ldInst,
      lnClass,
      lnInst,
      prefix,
      doName,
      daName,
      srcLDInst: null,
      srcPrefix: null,
      srcLNClass: null,
      srcLNInst: null,
      srcCBName: null,
    });
  }

  if (!controlElement || !serviceTypes[controlElement.tagName]) {
    //for invalid control block tag name assume polling
    return cloneElement(extRefElement, {
      iedName,
      serviceType: 'Poll',
      ldInst,
      lnClass,
      lnInst,
      prefix,
      doName,
      daName,
      srcLDInst: null,
      srcPrefix: null,
      srcLNClass: null,
      srcLNInst: null,
      srcCBName: null,
    });
  }

  const srcLDInst =
    controlElement.closest('LDevice')?.getAttribute('inst') ?? '';
  const srcPrefix =
    controlElement.closest('LN0,LN')?.getAttribute('prefix') ?? '';
  const srcLNClass =
    controlElement.closest('LN0,LN')?.getAttribute('lnClass') ?? '';
  const srcLNInst = controlElement.closest('LN0,LN')?.getAttribute('inst');
  const srcCBName = controlElement.getAttribute('name') ?? '';

  return cloneElement(extRefElement, {
    iedName,
    serviceType: serviceTypes[controlElement.tagName]!,
    ldInst,
    lnClass,
    lnInst,
    prefix,
    doName,
    daName,
    srcLDInst,
    srcPrefix,
    srcLNClass,
    srcLNInst: srcLNInst ? srcLNInst : null,
    srcCBName,
  });
}

export function getOrderedIeds(doc: XMLDocument): Element[] {
  return doc
    ? Array.from(doc.querySelectorAll(':root > IED')).sort((a, b) =>
        compareNames(a, b)
      )
    : [];
}

/**
 * An element within this list has 2 properties:
 * - The element itself, either a GSEControl or an IED at this point.
 * - A 'partial' property indicating if the GOOSE is fully initialized or partially.
 */
export interface ListElement {
  element: Element;
  partial?: boolean;
}

export class SubscriberListContainer extends LitElement {
  /** List holding all current subscribed Elements. */
  subscribedElements: ListElement[] = [];

  /** List holding all current available Elements which are not subscribed. */
  availableElements: ListElement[] = [];

  /** Current selected IED (when in Subscriber view) */
  currentSelectedIed: Element | undefined;

  /** The current used dataset for subscribing / unsubscribing */
  currentUsedDataset: Element | undefined | null;

  @query('div') subscriberWrapper!: Element;

  protected updated(): void {
    if (this.subscriberWrapper) {
      this.subscriberWrapper.scrollTo(0, 0);
    }
  }

  protected resetElements(): void {
    this.subscribedElements = [];
    this.availableElements = [];
  }
}

/** Common `CSS` styles used by DataTypeTemplate subeditors */
export const styles = css`
  :host(.moving) section {
    opacity: 0.3;
  }

  section {
    background-color: var(--mdc-theme-surface);
    transition: all 200ms linear;
    outline-color: var(--mdc-theme-primary);
    outline-style: solid;
    outline-width: 0px;
    opacity: 1;
  }

  section:focus {
    box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  }

  section:focus-within {
    outline-width: 2px;
    transition: all 250ms linear;
  }

  h1,
  h2,
  h3 {
    color: var(--mdc-theme-on-surface);
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0px;
    line-height: 48px;
    padding-left: 0.3em;
    transition: background-color 150ms linear;
  }

  section:focus-within > h1,
  section:focus-within > h2,
  section:focus-within > h3 {
    color: var(--mdc-theme-surface);
    background-color: var(--mdc-theme-primary);
    transition: background-color 200ms linear;
  }

  h1 > nav,
  h2 > nav,
  h3 > nav,
  h1 > abbr > mwc-icon-button,
  h2 > abbr > mwc-icon-button,
  h3 > abbr > mwc-icon-button {
    float: right;
  }

  abbr[title] {
    border-bottom: none !important;
    cursor: inherit !important;
    text-decoration: none !important;
  }

  mwc-list-item[noninteractive] {
    font-weight: 500;
  }
`;

declare global {
  interface ElementEventMap {
    ['view']: ViewEvent;
    ['ied-select']: IEDSelectEvent;
    ['fcda-select']: FcdaSelectEvent;
    ['subscription-changed']: SubscriptionChangedEvent;
  }
}
