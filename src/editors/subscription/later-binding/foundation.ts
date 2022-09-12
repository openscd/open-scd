import { ExtRefLaterBindingList } from './ext-ref-laterbinding-list.js';
import { FCDALaterBindingList } from './fcda-later-binding-list.js';
import SMVSubscribeLaterBindingPlugin from '../../SMVSubscriberLaterBinding.js';
import GooseSubscribeLaterBindingPlugin from '../../GooseSubscriberLaterBinding.js';

export function getFcdaTitleValue(fcdaElement: Element): string {
  return `${fcdaElement.getAttribute('doName')}${
    fcdaElement.hasAttribute('doName') && fcdaElement.hasAttribute('daName')
      ? `.`
      : ``
  }${fcdaElement.getAttribute('daName')}`;
}

export interface FcdaSelectDetail {
  controlElement: Element | undefined;
  fcda: Element | undefined;
}
export type FcdaSelectEvent = CustomEvent<FcdaSelectDetail>;
export function newFcdaSelectEvent(
  controlElement: Element | undefined,
  fcda: Element | undefined,
  eventInitDict?: CustomEventInit<FcdaSelectDetail>
): FcdaSelectEvent {
  return new CustomEvent<FcdaSelectDetail>('fcda-select', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { controlElement, fcda, ...eventInitDict?.detail },
  });
}

export function getFCDALaterBindingList(
  element: SMVSubscribeLaterBindingPlugin | GooseSubscribeLaterBindingPlugin
): FCDALaterBindingList {
  return <FCDALaterBindingList>(
    element.shadowRoot?.querySelector('fcda-later-binding-list')
  );
}

export function getExtrefLaterBindingList(
  element: SMVSubscribeLaterBindingPlugin | GooseSubscribeLaterBindingPlugin
): ExtRefLaterBindingList {
  return <ExtRefLaterBindingList>(
    element.shadowRoot?.querySelector('extref-later-binding-list')
  );
}

declare global {
  interface ElementEventMap {
    ['fcda-select']: FcdaSelectEvent;
  }
}
