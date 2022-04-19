import { css } from 'lit-element';

/**
 * Enumeration stating the Subscribe status of a IED to a GOOSE.
 */
export enum SubscribeStatus {
  Full,
  Partial,
  None,
}

export interface SampledValuesSelectDetail {
  sampledValuesControl: Element | undefined;
  dataset: Element | undefined;
}
export type SampledValuesSelectEvent = CustomEvent<SampledValuesSelectDetail>;
export function newSampledValuesSelectEvent(
  sampledValuesControl: Element | undefined,
  dataset: Element | undefined,
  eventInitDict?: CustomEventInit<SampledValuesSelectDetail>
): SampledValuesSelectEvent {
  return new CustomEvent<SampledValuesSelectDetail>('sampled-values-select', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { sampledValuesControl, dataset, ...eventInitDict?.detail },
  });
}

export interface IEDSampledValuesSubscriptionDetail {
  ied: Element;
  subscribeStatus: SubscribeStatus;
}
export type IEDSampledValuesSubscriptionEvent = CustomEvent<IEDSampledValuesSubscriptionDetail>;
export function newIEDSampledValuesSubscriptionEvent(
  ied: Element,
  subscribeStatus: SubscribeStatus
): IEDSampledValuesSubscriptionEvent {
  return new CustomEvent<IEDSampledValuesSubscriptionDetail>('ied-smv-subscription', {
    bubbles: true,
    composed: true,
    detail: { ied, subscribeStatus },
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
`;

declare global {
  interface ElementEventMap {
    ['sampled-values-select']: SampledValuesSelectEvent;
    ['ied-smv-subscription']: IEDSampledValuesSubscriptionEvent;
  }
}
