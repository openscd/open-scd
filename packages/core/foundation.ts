import { LitElement } from 'lit';

/** Constructor type for defining `LitElement` mixins. */
export type LitElementConstructor = new (...args: any[]) => LitElement;

export { newOpenEvent } from './foundation/open-event.js';
export type { OpenEvent, OpenDetail } from './foundation/open-event.js';

export {
  newEditEvent,
  isComplex,
  isInsert,
  isNamespaced,
  isUpdate,
  isRemove,
} from './foundation/edit-event.js';
export type {
  EditEvent,
  Edit,
  Insert,
  AttributeValue,
  NamespacedAttributeValue,
  Update,
  Remove,
} from './foundation/edit-event.js';

export { cyrb64 } from './foundation/cyrb64.js';

export { Editing } from './mixins/Editing.js';
export type { Plugin, PluginSet } from './foundation/plugin.js';

export { newEditCompletedEvent } from './foundation/edit-completed-event.js';

export type {
  EditCompletedEvent,
  EditCompletedDetail,
} from './foundation/edit-completed-event.js';
