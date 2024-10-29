export function newGOOSESelectEvent(gseControl, dataset, eventInitDict) {
    return new CustomEvent('goose-select', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: { gseControl, dataset, ...eventInitDict?.detail },
    });
}
export function newGooseSubscriptionEvent(element, subscribeStatus) {
    return new CustomEvent('goose-subscription', {
        bubbles: true,
        composed: true,
        detail: { element, subscribeStatus },
    });
}
//# sourceMappingURL=foundation.js.map