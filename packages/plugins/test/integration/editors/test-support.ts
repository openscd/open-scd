import GooseSubscribeDataBindingPlugin from '../../../src/editors/GooseSubscriberDataBinding.js';
import GooseSubscribeLaterBindingPlugin from '../../../src/editors/GooseSubscriberLaterBinding.js';
import SMVSubscribeDataBindingPlugin from '../../../src/editors/SMVSubscriberDataBinding.js';
import SMVSubscriberLaterBindingPlugin from '../../../src/editors/SMVSubscriberLaterBinding.js';

import { FcdaBindingList } from '../../../src/editors/subscription/fcda-binding-list.js';
import { ExtRefLaterBindingList } from '../../../src/editors/subscription/later-binding/ext-ref-later-binding-list.js';
import { ExtRefLnBindingList } from '../../../src/editors/subscription/later-binding/ext-ref-ln-binding-list.js';

export function getFCDABindingList(
  element:
    | SMVSubscriberLaterBindingPlugin
    | GooseSubscribeLaterBindingPlugin
    | SMVSubscribeDataBindingPlugin
    | GooseSubscribeDataBindingPlugin
): FcdaBindingList {
  return <FcdaBindingList>(
    element.shadowRoot?.querySelector('fcda-binding-list')
  );
}

export function selectFCDAItem(
  listElement: FcdaBindingList,
  controlIdentity: string,
  fcdaIdentity: string
): void {
  (<HTMLElement>Array.from(
    listElement.shadowRoot!.querySelectorAll('mwc-list-item.subitem')
  ).find(listItem => {
    const value = listItem.getAttribute('value') ?? '';
    return value.includes(controlIdentity) && value.includes(fcdaIdentity);
  })).click();
}

export function getExtrefDataBindingList(
  element: SMVSubscribeDataBindingPlugin | GooseSubscribeDataBindingPlugin
): ExtRefLnBindingList {
  return <ExtRefLnBindingList>(
    element.shadowRoot?.querySelector('extref-ln-binding-list')
  );
}

export function getExtrefLaterBindingList(
  element: SMVSubscriberLaterBindingPlugin | GooseSubscribeLaterBindingPlugin
): ExtRefLaterBindingList {
  return <ExtRefLaterBindingList>(
    element.shadowRoot?.querySelector('extref-later-binding-list')
  );
}

export function getSelectedSubItemValue(
  element: FcdaBindingList
): Element | null {
  return element.shadowRoot!.querySelector(
    '.subitem[selected] span[slot="meta"]'
  );
}
