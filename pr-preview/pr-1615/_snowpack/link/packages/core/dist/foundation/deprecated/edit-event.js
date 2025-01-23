/**
 * @deprecated Use the new edit event V2 API instead.
 */
export function isComplex(edit) {
    return edit instanceof Array;
}
/**
 * @deprecated Use the new edit event V2 API instead.
 */
export function isInsert(edit) {
    return edit.parent !== undefined;
}
/**
 * @deprecated Use the new edit event V2 API instead.
 */
export function isNamespaced(value) {
    return value !== null && typeof value !== 'string';
}
/**
 * @deprecated Use the new edit event V2 API instead.
 */
export function isUpdate(edit) {
    return edit.element !== undefined;
}
/**
 * @deprecated Use the new edit event V2 API instead.
 */
export function isRemove(edit) {
    return (edit.parent === undefined && edit.node !== undefined);
}
/**
 * @deprecated Use the new edit event V2 API instead.
 */
export function newEditEvent(edit, initiator = 'user') {
    return new CustomEvent('oscd-edit', {
        composed: true,
        bubbles: true,
        detail: {
            edit: edit,
            initiator: initiator,
        },
    });
}
//# sourceMappingURL=edit-event.js.map