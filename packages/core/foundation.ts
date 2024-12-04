import { LitElement } from 'lit';

/** Constructor type for defining `LitElement` mixins. */
export type LitElementConstructor = new (...args: any[]) => LitElement;

export { newOpenEvent } from './foundation/open-event.js';
export type { OpenEvent, OpenDetail } from './foundation/open-event.js';

export {
  newEditEvent as newEditEventV1,
  isComplex as isComplexV1,
  isInsert as isInsertV1,
  isNamespaced as isNamespacedV1,
  isUpdate as isUpdateV1,
  isRemove as isRemoveV1,
} from './foundation/deprecated/edit-event.js';
export type {
  EditEvent as EditEventV1,
  Edit as EditV1,
  Insert as InsertV1,
  AttributeValue,
  NamespacedAttributeValue,
  Update as UpdateV1,
  Remove as RemoveV1,
} from './foundation/deprecated/edit-event.js';

export type {
  Edit,
  Insert,
  Remove,
  SetTextContent,
  SetAttributes,
  isEdit
} from './foundation/edit.js';
export type {
  EditEvent,
  EditEventOptions,
  EditDetail
} from './foundation/edit-event.js';
export { newEditEvent } from './foundation/edit-event.js';

export { handleEdit } from './foundation/handle-edit.js';

export { cyrb64 } from './foundation/cyrb64.js';

export type { Plugin, PluginSet } from './foundation/plugin.js';

export { newEditCompletedEvent } from './foundation/edit-completed-event.js';

export type {
  EditCompletedEvent,
  EditCompletedDetail,
} from './foundation/edit-completed-event.js';
