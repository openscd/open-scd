export function newSmvSelectEvent(smvControl, dataset, eventInitDict) {
    return new CustomEvent('smv-select', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: { smvControl: smvControl, dataset, ...eventInitDict?.detail },
    });
}
export function newSmvSubscriptionEvent(element, subscribeStatus) {
    return new CustomEvent('smv-subscription', {
        bubbles: true,
        composed: true,
        detail: { element, subscribeStatus },
    });
}
//# sourceMappingURL=foundation.js.map