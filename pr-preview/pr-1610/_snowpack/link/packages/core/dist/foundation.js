export { newOpenEvent } from './foundation/open-event.js';
export { newEditEvent, isComplex, isInsert, isNamespaced, isUpdate, isRemove, } from './foundation/edit-event.js';
export { cyrb64 } from './foundation/cyrb64.js';
export { newEditCompletedEvent } from './foundation/edit-completed-event.js';
/** @returns the cartesian product of `arrays` */
export function crossProduct(...arrays) {
    return arrays.reduce((a, b) => a.flatMap(d => b.map(e => [d, e].flat())), [[]]);
}
//# sourceMappingURL=foundation.js.map