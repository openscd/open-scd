export function newLogEvent(detail, eventInitDict) {
    return new CustomEvent('log', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: { ...detail, ...eventInitDict === null || eventInitDict === void 0 ? void 0 : eventInitDict.detail },
    });
}
export function newIssueEvent(detail, eventInitDict) {
    return new CustomEvent('issue', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: { ...detail, ...eventInitDict === null || eventInitDict === void 0 ? void 0 : eventInitDict.detail },
    });
}
//# sourceMappingURL=history.js.map