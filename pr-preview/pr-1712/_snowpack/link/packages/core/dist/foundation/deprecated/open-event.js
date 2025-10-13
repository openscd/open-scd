export function newOpenDocEvent(doc, docName, eventInitDict) {
    return new CustomEvent('open-doc', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: { doc, docName, ...eventInitDict === null || eventInitDict === void 0 ? void 0 : eventInitDict.detail },
    });
}
//# sourceMappingURL=open-event.js.map