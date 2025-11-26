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
} from './foundation/deprecated/edit-event.js';
export type {
  EditEvent,
  Edit,
  Insert,
  AttributeValue,
  NamespacedAttributeValue,
  Update,
  Remove,
} from './foundation/deprecated/edit-event.js';

export type {
  EditV2,
  InsertV2,
  RemoveV2,
  SetTextContentV2,
  SetAttributesV2,
} from './foundation/edit.js';
export {
  isEditV2,
  isRemoveV2,
  isInsertV2,
  isComplexV2,
  isSetAttributesV2,
  isSetTextContentV2
} from './foundation/edit.js';
export type {
  EditEventV2,
  EditEventOptionsV2,
  EditDetailV2
} from './foundation/edit-event.js';
export { newEditEventV2 } from './foundation/edit-event.js';

export { handleEditV2 } from './foundation/handle-edit.js';

export { cyrb64 } from './foundation/cyrb64.js';

export type { Plugin, PluginSet } from './foundation/plugin.js';

export { newEditCompletedEvent } from './foundation/edit-completed-event.js';

export type {
  EditCompletedEvent,
  EditCompletedDetail,
} from './foundation/edit-completed-event.js';

/** @returns the cartesian product of `arrays` */
export function crossProduct<T>(...arrays: T[][]): T[][] {
  return arrays.reduce<T[][]>(
    (a, b) => <T[][]>a.flatMap(d => b.map(e => [d, e].flat())),
    [[]]
  );
}

export { OscdApi } from './api/api.js';

export { XMLEditor } from './api/editor/xml-editor.js';
