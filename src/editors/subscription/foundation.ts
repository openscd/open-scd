import { css, LitElement, query } from 'lit-element';
import { compareNames, createElement } from '../../foundation.js';
import { getFcdaReferences } from '../../foundation/ied.js';

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

export function existExtRef(parentInputs: Element, fcda: Element): boolean {
  const iedName = fcda.closest('IED')?.getAttribute('name');
  if (!iedName) return false;

  return !!parentInputs.querySelector(
    `ExtRef[iedName=${iedName}]` + `${getFcdaReferences(fcda)}`
  );
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

  if (!iedName || !ldInst || !lnClass || !lnInst || !doName) return false;

  if (controlBlock === undefined) return true; //for serviceType `Poll`

  const srcLDInst = controlBlock.closest('LDevice')?.getAttribute('inst');
  const srcLNClass = controlBlock.closest('LN0,LN')?.getAttribute('lnClass');
  const srcLNInst = controlBlock.closest('LN0,LN')?.getAttribute('inst');
  const srcCBName = controlBlock.getAttribute('name');

  if (
    !srcLDInst ||
    !srcLNClass ||
    !srcCBName ||
    typeof srcLNInst !== 'string' //empty string is allowed in `LN0`
  )
    return false;

  return true;
}

const serviceTypes: Partial<Record<string, string>> = {
  ReportControl: 'Report',
  GSEControl: 'GOOSE',
  SampledValueControl: 'SMV',
};

/**
 * @param controlBlock - `ReportControl`, `GSEControl` or `SamepldValueControl` source element
 * @param fCDA - the source data. can be data attribute or data obejct (missing daName)
 * @returns ExtRef element
 */
export function createExtRefElement(
  controlBlock: Element | undefined,
  fCDA: Element
): Element {
  const iedName = fCDA.closest('IED')?.getAttribute('name') ?? null;
  const [ldInst, prefix, lnClass, lnInst, doName, daName] = [
    'ldInst',
    'prefix',
    'lnClass',
    'lnInst',
    'doName',
    'daName',
  ].map(attr => fCDA.getAttribute(attr));
  if (fCDA.ownerDocument.documentElement.getAttribute('version') !== '2007')
    //Ed1 does not define serviceType and its MCD attribute starting with src...
    return createElement(fCDA.ownerDocument, 'ExtRef', {
      iedName,
      ldInst,
      lnClass,
      lnInst,
      prefix,
      doName,
      daName,
    });

  if (!controlBlock || !serviceTypes[controlBlock.tagName])
    //for invalid control block tag name assume polling
    return createElement(fCDA.ownerDocument, 'ExtRef', {
      iedName,
      serviceType: 'Poll',
      ldInst,
      lnClass,
      lnInst,
      prefix,
      doName,
      daName,
    });

  // default is empty string as attributes are mendaroty acc to IEC 61850-6 >Ed2
  const srcLDInst = controlBlock.closest('LDevice')?.getAttribute('inst') ?? '';
  const srcPrefix =
    controlBlock.closest('LN0,LN')?.getAttribute('prefix') ?? '';
  const srcLNClass =
    controlBlock.closest('LN0,LN')?.getAttribute('lnClass') ?? '';
  const srcLNInst = controlBlock.closest('LN0,LN')?.getAttribute('inst') ?? '';
  const srcCBName = controlBlock.getAttribute('name') ?? '';

  return createElement(fCDA.ownerDocument, 'ExtRef', {
    iedName,
    serviceType: serviceTypes[controlBlock.tagName]!,
    ldInst,
    lnClass,
    lnInst,
    prefix,
    doName,
    daName,
    srcLDInst,
    srcPrefix,
    srcLNClass,
    srcLNInst,
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

  /** List holding all current avaialble Elements which are not subscribed. */
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
  }
}
