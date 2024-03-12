export function getFCDABindingList(element) {
    return (element.shadowRoot?.querySelector('fcda-binding-list'));
}
export function selectFCDAItem(listElement, controlIdentity, fcdaIdentity) {
    Array.from(listElement.shadowRoot.querySelectorAll('mwc-list-item.subitem')).find(listItem => {
        const value = listItem.getAttribute('value') ?? '';
        return value.includes(controlIdentity) && value.includes(fcdaIdentity);
    }).click();
}
export function getExtrefDataBindingList(element) {
    return (element.shadowRoot?.querySelector('extref-ln-binding-list'));
}
export function getExtrefLaterBindingList(element) {
    return (element.shadowRoot?.querySelector('extref-later-binding-list'));
}
export function getSelectedSubItemValue(element) {
    return element.shadowRoot.querySelector('.subitem[selected] span[slot="meta"]');
}
//# sourceMappingURL=test-support.js.map