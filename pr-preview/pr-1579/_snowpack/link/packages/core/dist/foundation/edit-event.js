export function isComplex(edit) {
    return edit instanceof Array;
}
export function isInsert(edit) {
    return edit.parent !== undefined;
}
export function isNamespaced(value) {
    return value !== null && typeof value !== 'string';
}
export function isUpdate(edit) {
    return edit.element !== undefined;
}
export function isRemove(edit) {
    return (edit.parent === undefined && edit.node !== undefined);
}
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