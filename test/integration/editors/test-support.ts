import GooseSubscribeLaterBindingPlugin from '../../../src/editors/GooseSubscriberLaterBinding.js';
import SMVSubscriberLaterBindingPlugin from '../../../src/editors/SMVSubscriberLaterBinding.js';

import { ExtRefLaterBindingList } from '../../../src/editors/subscription/later-binding/ext-ref-later-binding-list.js';
import { FcdaBindingList } from '../../../src/editors/subscription/fcda-binding-list.js';

export function getFCDALaterBindingList(
  element: SMVSubscriberLaterBindingPlugin | GooseSubscribeLaterBindingPlugin
): FcdaBindingList {
  return <FcdaBindingList>(
    element.shadowRoot?.querySelector('fcda-binding-list')
  );
}

export function getExtrefLaterBindingList(
  element: SMVSubscriberLaterBindingPlugin | GooseSubscribeLaterBindingPlugin
): ExtRefLaterBindingList {
  return <ExtRefLaterBindingList>(
    element.shadowRoot?.querySelector('extref-later-binding-list')
  );
}
