/**
 * @deprecated
 */
export function newPendingStateEvent(promise, eventInitDict) {
    return new CustomEvent('pending-state', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: { promise, ...eventInitDict === null || eventInitDict === void 0 ? void 0 : eventInitDict.detail },
    });
}
//# sourceMappingURL=waiter.js.map