export function newValidateEvent(eventInitDict) {
    return new CustomEvent('validate', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
    });
}
//# sourceMappingURL=validation.js.map