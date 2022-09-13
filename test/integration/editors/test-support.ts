import { ExtRefLaterBindingList } from '../../../src/editors/subscription/later-binding/ext-ref-later-binding-list.js';
import { FCDALaterBindingList } from '../../../src/editors/subscription/later-binding/fcda-later-binding-list.js';
import GooseSubscribeLaterBindingPlugin from '../../../src/editors/GooseSubscriberLaterBinding.js';
import SMVSubscriberLaterBindingPlugin from '../../../src/editors/SMVSubscriberLaterBinding.js';

export function getFCDALaterBindingList(
  element: SMVSubscriberLaterBindingPlugin | GooseSubscribeLaterBindingPlugin
): FCDALaterBindingList {
  return <FCDALaterBindingList>(
    element.shadowRoot?.querySelector('fcda-later-binding-list')
  );
}

export function getExtrefLaterBindingList(
  element: SMVSubscriberLaterBindingPlugin | GooseSubscribeLaterBindingPlugin
): ExtRefLaterBindingList {
  return <ExtRefLaterBindingList>(
    element.shadowRoot?.querySelector('extref-later-binding-list')
  );
}
