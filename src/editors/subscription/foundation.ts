export interface GOOSESelectDetail {
  iedName: string;
  gseControl: Element;
  dataset: Element;
}
export type GOOSESelectEvent = CustomEvent<GOOSESelectDetail>;
export function newGOOSESelectEvent(
  iedName: string,
  gseControl: Element,
  dataset: Element,
  eventInitDict?: CustomEventInit<GOOSESelectDetail>
): GOOSESelectEvent {
  return new CustomEvent<GOOSESelectDetail>('goose-dataset', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { iedName, gseControl, dataset, ...eventInitDict?.detail },
  });
}

declare global {
  interface ElementEventMap {
    ['goose-dataset']: GOOSESelectEvent;
  }
}
