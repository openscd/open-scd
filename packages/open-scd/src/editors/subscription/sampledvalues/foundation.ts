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
  return new CustomEvent<SmvSelectDetail>('smv-select', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { smvControl: smvControl, dataset, ...eventInitDict?.detail },
  });
}

export interface SmvSubscriptionDetail {
  element: Element;
  subscribeStatus: SubscribeStatus;
}
export type SmvSubscriptionEvent = CustomEvent<SmvSubscriptionDetail>;
export function newSmvSubscriptionEvent(
  element: Element,
  subscribeStatus: SubscribeStatus
): SmvSubscriptionEvent {
  return new CustomEvent<SmvSubscriptionDetail>('smv-subscription', {
    bubbles: true,
    composed: true,
    detail: { element, subscribeStatus },
  });
}

declare global {
  interface ElementEventMap {
    ['smv-select']: SmvSelectEvent;
    ['smv-subscription']: SmvSubscriptionEvent;
  }
}
