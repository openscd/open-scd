export function newLoadNsdocEvent(nsdoc, filename) {
    return new CustomEvent('load-nsdoc', {
        bubbles: true,
        composed: true,
        detail: { nsdoc, filename },
    });
}
export function newSettingsUIEvent(show, eventInitDict) {
    return new CustomEvent('oscd-settings', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: {
            show,
            ...eventInitDict === null || eventInitDict === void 0 ? void 0 : eventInitDict.detail,
        },
    });
}
//# sourceMappingURL=settings.js.map