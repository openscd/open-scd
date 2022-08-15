export function getFcdaTitleValue(fcdaElement: Element): string {
  return `${fcdaElement.getAttribute('doName')}${
    fcdaElement.hasAttribute('doName') && fcdaElement.hasAttribute('daName')
      ? `.`
      : ``
  }${fcdaElement.getAttribute('daName')}`;
}

export interface FcdaSelectDetail {
  svc: Element | undefined;
  fcda: Element | undefined;
}
export type FcdaSelectEvent = CustomEvent<FcdaSelectDetail>;
export function newFcdaSelectEvent(
  svc: Element | undefined,
  fcda: Element | undefined,
  eventInitDict?: CustomEventInit<FcdaSelectDetail>
): FcdaSelectEvent {
  return new CustomEvent<FcdaSelectDetail>('fcda-select', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { svc, fcda, ...eventInitDict?.detail },
  });
}

declare global {
  interface ElementEventMap {
    ['fcda-select']: FcdaSelectEvent;
  }
}
