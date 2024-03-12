export function getAncestorsFromDO(doElement) {
    const lNodeTypeElement = doElement.closest('LNodeType');
    const lnElement = doElement
        .closest('SCL')
        .querySelector(`LN0[lnType="${lNodeTypeElement.getAttribute('id')}"], ` +
        `LN[lnType="${lNodeTypeElement.getAttribute('id')}"]`);
    const ancestors = [];
    ancestors.push(lnElement);
    ancestors.push(lnElement.closest('LDevice'));
    ancestors.push(lnElement.closest('Server'));
    ancestors.push(lnElement.closest('AccessPoint'));
    ancestors.push(lnElement.closest('IED'));
    return ancestors;
}
export function getAncestorsFromDA(daElement, type) {
    const doElement = daElement
        .closest('SCL')
        .querySelector(`DO[type="${type}"]`);
    const ancestors = getAncestorsFromDO(doElement);
    ancestors.push(doElement);
    return ancestors;
}
export function getLNClasses(element) {
    return Array.from(element.querySelectorAll('LN0, LN'))
        .map(element => element.getAttribute('lnClass'))
        .filter(value => value);
}
//# sourceMappingURL=test-support.js.map