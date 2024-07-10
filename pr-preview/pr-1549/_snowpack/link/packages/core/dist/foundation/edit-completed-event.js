export function newEditCompletedEvent(edit, initiator = 'user') {
    return new CustomEvent('oscd-edit-completed', {
        bubbles: true,
        composed: true,
        detail: {
            edit: edit,
            initiator: initiator,
        },
    });
}
//# sourceMappingURL=edit-completed-event.js.map