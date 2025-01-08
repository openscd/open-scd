export function newEditEventV2(edit, options) {
    return new CustomEvent('oscd-edit-v2', {
        composed: true,
        bubbles: true,
        detail: { ...options, edit },
    });
}
//# sourceMappingURL=edit-event.js.map