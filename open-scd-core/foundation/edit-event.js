function isComplex(edit) {
    return edit instanceof Array;
}
function isInsert(edit) {
    return edit.parent !== undefined;
}
function isNamespaced(value) {
    return value !== null && typeof value !== 'string';
}
function isUpdate(edit) {
    return edit.element !== undefined;
}
function isRemove(edit) {
    return (edit.parent === undefined && edit.node !== undefined);
}
function newEditEvent(edit) {
    return new CustomEvent('oscd-edit', {
        composed: true,
        bubbles: true,
        detail: edit,
    });
}

export { isComplex, isInsert, isNamespaced, isRemove, isUpdate, newEditEvent };
//# sourceMappingURL=edit-event.js.map
