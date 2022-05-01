import { css } from 'lit-element';

/**
 * Enumeration stating the Subscribe status of a IED to a GOOSE.
 */
export enum SubscribeStatus {
  Full,
  Partial,
  None,
}

/**
 * Enumeration stating the current view of the Subscription plugin.
 */
export enum View {
  GOOSE_PUBLISHER,
  GOOSE_SUBSCRIBER
}

export interface GOOSESelectDetail {
  gseControl: Element | undefined;
  dataset: Element | undefined;
}
export type GOOSESelectEvent = CustomEvent<GOOSESelectDetail>;
export function newGOOSESelectEvent(
  gseControl: Element | undefined,
  dataset: Element | undefined,
  eventInitDict?: CustomEventInit<GOOSESelectDetail>
): GOOSESelectEvent {
  return new CustomEvent<GOOSESelectDetail>('goose-dataset', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { gseControl, dataset, ...eventInitDict?.detail },
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

export interface SubscriptionDetail {
  element: Element;
  subscribeStatus: SubscribeStatus;
}
export type SubscriptionEvent = CustomEvent<SubscriptionDetail>;
export function newSubscriptionEvent(
  element: Element,
  subscribeStatus: SubscribeStatus
): SubscriptionEvent {
  return new CustomEvent<SubscriptionDetail>('subscription', {
    bubbles: true,
    composed: true,
    detail: { element, subscribeStatus },
  });
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
    ['goose-dataset']: GOOSESelectEvent;
    ['subscription']: SubscriptionEvent;
    ['ied-select']: IEDSelectEvent;
    ['view']: ViewEvent;
  }
}
