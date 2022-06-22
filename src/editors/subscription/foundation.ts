import { SubscribeStatus } from '../foundation.js';

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

declare global {
  interface ElementEventMap {
    ['goose-dataset']: GOOSESelectEvent;
    ['subscription']: SubscriptionEvent;
  }
}
