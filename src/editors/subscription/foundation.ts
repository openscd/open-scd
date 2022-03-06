
/**
 * Enumeration stating the Subscribe status of a IED to a GOOSE.
 */
export enum SubscribeStatus {
  Full,
  Partial,
  None,
}

export interface GOOSESelectDetail {
  gseControl: Element;
  dataset: Element;
}
export type GOOSESelectEvent = CustomEvent<GOOSESelectDetail>;
export function newGOOSESelectEvent(
  gseControl: Element,
  dataset: Element,
  eventInitDict?: CustomEventInit<GOOSESelectDetail>
): GOOSESelectEvent {
  return new CustomEvent<GOOSESelectDetail>('goose-dataset', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { gseControl, dataset, ...eventInitDict?.detail },
  });
}

export interface IEDSubscriptionDetail {
  element: Element;
  subscribeStatus: SubscribeStatus;
}
export type IEDSubscriptionEvent = CustomEvent<IEDSubscriptionDetail>;
export function newIEDSubscriptionEvent(
  element: Element,
  subscribeStatus: SubscribeStatus
): IEDSubscriptionEvent {
  return new CustomEvent<IEDSubscriptionDetail>('ied-subscription', {
    bubbles: true,
    composed: true,
    detail: { element, subscribeStatus },
  });
}

declare global {
  interface ElementEventMap {
    ['goose-dataset']: GOOSESelectEvent;
    ['ied-subscription']: IEDSubscriptionEvent;
  }
}
