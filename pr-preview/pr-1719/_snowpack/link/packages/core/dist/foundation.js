export { newOpenEvent } from './foundation/open-event.js';
export { newEditEvent, isComplex, isInsert, isNamespaced, isUpdate, isRemove, } from './foundation/deprecated/edit-event.js';
export { isEditV2, isRemoveV2, isInsertV2, isComplexV2, isSetAttributesV2, isSetTextContentV2 } from './foundation/edit.js';
export { newEditEventV2 } from './foundation/edit-event.js';
export { handleEditV2 } from './foundation/handle-edit.js';
export { cyrb64 } from './foundation/cyrb64.js';
export { newEditCompletedEvent } from './foundation/edit-completed-event.js';
/** @returns the cartesian product of `arrays` */
export function crossProduct(...arrays) {
    return arrays.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())), [[]]);
}
export { OscdApi } from './api/api.js';
export { XMLEditor } from './api/editor/xml-editor.js';
//# sourceMappingURL=foundation.js.map