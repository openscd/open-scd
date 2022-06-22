import { SubscribeStatus } from '../foundation.js';

export interface SmvSelectDetail {
  smvControl: Element | undefined;
  dataset: Element | undefined;
}
export type SmvSelectEvent = CustomEvent<SmvSelectDetail>;
export function newSmvSelectEvent(
  smvControl: Element | undefined,
  dataset: Element | undefined,
  eventInitDict?: CustomEventInit<SmvSelectDetail>
): SmvSelectEvent {
  return new CustomEvent<SmvSelectDetail>('sampled-values-select', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { smvControl: smvControl, dataset, ...eventInitDict?.detail },
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

declare global {
  interface ElementEventMap {
    ['sampled-values-select']: SmvSelectEvent;
    ['ied-smv-subscription']: IEDSampledValuesSubscriptionEvent;
  }
}
