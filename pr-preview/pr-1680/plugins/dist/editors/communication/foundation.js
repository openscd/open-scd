/**
 * Returns the first element of type ConnectedAP in the provided element's hierarchy.
 * @param element - The reference element to search from
 * @returns An element of type ConnectedAP or null
 */
export function getCurrentConnectedAP(element) {
    return element.closest('ConnectedAP');
}
/**
 * Retrieves all ConnectedAP elements within the same IED as the provided element.
 *
 * @param element - The reference element to find the current ConnectedAP and its IED.
 * @param doc - The XML document containing the SubNetwork and ConnectedAP elements.
 * @returns An array of ConnectedAP elements belonging to the same IED as the provided element.
 */
export function getAllConnectedAPsOfSameIED(element, doc) {
    if (!element || !doc) {
        return [];
    }
    const currentConnectedAP = getCurrentConnectedAP(element);
    if (!currentConnectedAP) {
        return [];
    }
    const iedName = currentConnectedAP.getAttribute('iedName');
    return Array.from(doc.querySelectorAll(`SubNetwork > ConnectedAP[iedName=${iedName}`));
}
//# sourceMappingURL=foundation.js.map