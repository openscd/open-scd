export function isComplexV2(edit) {
    return edit instanceof Array;
}
export function isSetTextContentV2(edit) {
    return (edit.element !== undefined &&
        edit.textContent !== undefined);
}
export function isRemoveV2(edit) {
    return (edit.parent === undefined && edit.node !== undefined);
}
export function isSetAttributesV2(edit) {
    return (edit.element !== undefined &&
        edit.attributes !== undefined &&
        edit.attributesNS !== undefined);
}
export function isInsertV2(edit) {
    return (edit.parent !== undefined &&
        edit.node !== undefined &&
        edit.reference !== undefined);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isEditV2(edit) {
    if (isComplexV2(edit)) {
        return !edit.some((e) => !isEditV2(e));
    }
    return (isSetAttributesV2(edit) ||
        isSetTextContentV2(edit) ||
        isInsertV2(edit) ||
        isRemoveV2(edit));
}
//# sourceMappingURL=edit.js.map