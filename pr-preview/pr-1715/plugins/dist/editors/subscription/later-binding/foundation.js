import { getSclSchemaVersion } from '../../../../../openscd/src/foundation.js';
import { serviceTypes } from '../foundation.js';
function dataAttributeSpecification(anyLn, doName, daName) {
    const doc = anyLn.ownerDocument;
    const lNodeType = doc.querySelector(`LNodeType[id="${anyLn.getAttribute('lnType')}"]`);
    const doNames = doName.split('.');
    let leaf = lNodeType;
    for (const doName of doNames) {
        const dO = leaf?.querySelector(`DO[name="${doName}"], SDO[name="${doName}"]`);
        leaf = doc.querySelector(`DOType[id="${dO?.getAttribute('type')}"]`);
    }
    if (!leaf || !leaf.getAttribute('cdc'))
        return { cdc: null, bType: null };
    const cdc = leaf.getAttribute('cdc');
    const daNames = daName.split('.');
    for (const daName of daNames) {
        const dA = leaf?.querySelector(`DA[name="${daName}"], BDA[name="${daName}"]`);
        leaf =
            daNames.indexOf(daName) < daNames.length - 1
                ? doc.querySelector(`DAType[id="${dA?.getAttribute('type')}"]`)
                : dA;
    }
    if (!leaf || !leaf.getAttribute('bType'))
        return { cdc, bType: null };
    const bType = leaf.getAttribute('bType');
    return { bType, cdc };
}
/**
 * @param fcda - Data attribute reference in a data set
 * @returns Data objects `CDC` and data attributes `bType`
 */
export function fcdaSpecification(fcda) {
    const [doName, daName] = ['doName', 'daName'].map(attr => fcda.getAttribute(attr));
    if (!doName || !daName)
        return { cdc: null, bType: null };
    const ied = fcda.closest('IED');
    const anyLn = Array.from(ied?.querySelectorAll(`LDevice[inst="${fcda.getAttribute('ldInst')}"] > LN, LDevice[inst="${fcda.getAttribute('inst')}"] LN0`) ?? []).find(anyLn => {
        return ((anyLn.getAttribute('prefix') ?? '') ===
            (fcda.getAttribute('prefix') ?? '') &&
            (anyLn.getAttribute('lnClass') ?? '') ===
                (fcda.getAttribute('lnClass') ?? '') &&
            (anyLn.getAttribute('inst') ?? '') === (fcda.getAttribute('lnInst') ?? ''));
    });
    if (!anyLn)
        return { cdc: null, bType: null };
    return dataAttributeSpecification(anyLn, doName, daName);
}
/**
 * Edition 2 and later SCL files allow to restrict subscription on
 * later binding type inputs (`ExtRef` elements) based on a `CDC` and
 * basic type `bType`.
 * @param extRef - A later binding type input in the sink IED
 * @returns data objects `CDC` and data attribute basic type `bType` or `null`
 */
export function inputRestriction(extRef) {
    const [pLN, pDO, pDA] = ['pLN', 'pDO', 'pDA'].map(attr => extRef.getAttribute(attr));
    if (!pLN || !pDO || !pDA)
        return { cdc: null, bType: null };
    const anyLns = Array.from(extRef
        .closest('IED')
        ?.querySelectorAll(`LN[lnClass="${pLN}"],LN0[lnClass="${pLN}"]`) ?? []);
    for (const anyLn of anyLns) {
        const dataSpec = dataAttributeSpecification(anyLn, pDO, pDA);
        if (dataSpec.cdc !== null && dataSpec.bType !== null)
            return dataSpec;
    }
    return { cdc: null, bType: null };
}
/**
 * Simple function to check if the attribute of the Left Side has the same value as the attribute of the Right Element.
 *
 * @param leftElement   - The Left Element to check against.
 * @param rightElement  - The Right Element to check.
 * @param attributeName - The name of the attribute to check.
 */
export function sameAttributeValue(leftElement, rightElement, attributeName) {
    return ((leftElement?.getAttribute(attributeName) ?? '') ===
        (rightElement?.getAttribute(attributeName) ?? ''));
}
/**
 * Simple function to check if the attribute of the Left Side has the same value as the attribute of the Right Element.
 *
 * @param leftElement        - The Left Element to check against.
 * @param leftAttributeName  - The name of the attribute (left) to check against.
 * @param rightElement       - The Right Element to check.
 * @param rightAttributeName - The name of the attribute (right) to check.
 */
export function sameAttributeValueDiffName(leftElement, leftAttributeName, rightElement, rightAttributeName) {
    return ((leftElement?.getAttribute(leftAttributeName) ?? '') ===
        (rightElement?.getAttribute(rightAttributeName) ?? ''));
}
/**
 * If needed check version specific attributes against FCDA Element.
 *
 * @param controlTag     - Indicates which type of control element.
 * @param controlElement - The Control Element to check against.
 * @param extRefElement  - The Ext Ref Element to check.
 */
function checkEditionSpecificRequirements(controlTag, controlElement, extRefElement) {
    // For 2003 Edition no extra check needed.
    if (getSclSchemaVersion(extRefElement.ownerDocument) === '2003') {
        return true;
    }
    const lDeviceElement = controlElement?.closest('LDevice') ?? undefined;
    const lnElement = controlElement?.closest('LN0') ?? undefined;
    // If ExtRef is missing 'srcLNClass', it defaults to 'LLN0' as specified in the standard
    const extRefIsMissingSrcLNClass = !extRefElement.hasAttribute('srcLNClass');
    const isLnClassLLN0 = lnElement?.getAttribute('lnClass') === 'LLN0';
    const canIgnoreSrcLNClass = isLnClassLLN0 && extRefIsMissingSrcLNClass;
    // For the 2007B and 2007B4 Edition we need to check some extra attributes.
    return ((extRefElement.getAttribute('serviceType') ?? '') ===
        serviceTypes[controlTag] &&
        sameAttributeValueDiffName(extRefElement, 'srcLDInst', lDeviceElement, 'inst') &&
        sameAttributeValueDiffName(extRefElement, 'scrPrefix', lnElement, 'prefix') &&
        (canIgnoreSrcLNClass || sameAttributeValueDiffName(extRefElement, 'srcLNClass', lnElement, 'lnClass')) &&
        sameAttributeValueDiffName(extRefElement, 'srcLNInst', lnElement, 'inst') &&
        sameAttributeValueDiffName(extRefElement, 'srcCBName', controlElement, 'name'));
}
/**
 * Check if specific attributes from the ExtRef Element are the same as the ones from the FCDA Element
 * and also if the IED Name is the same. If that is the case this ExtRef subscribes to the selected FCDA
 * Element.
 *
 * @param controlTag     - Indicates which type of control element.
 * @param controlElement - The Control Element to check against.
 * @param fcdaElement    - The FCDA Element to check against.
 * @param extRefElement  - The Ext Ref Element to check.
 */
export function isSubscribedTo(controlTag, controlElement, fcdaElement, extRefElement) {
    return (extRefElement.getAttribute('iedName') ===
        fcdaElement?.closest('IED')?.getAttribute('name') &&
        sameAttributeValue(fcdaElement, extRefElement, 'ldInst') &&
        sameAttributeValue(fcdaElement, extRefElement, 'prefix') &&
        sameAttributeValue(fcdaElement, extRefElement, 'lnClass') &&
        sameAttributeValue(fcdaElement, extRefElement, 'lnInst') &&
        sameAttributeValue(fcdaElement, extRefElement, 'doName') &&
        sameAttributeValue(fcdaElement, extRefElement, 'daName') &&
        checkEditionSpecificRequirements(controlTag, controlElement, extRefElement));
}
/**
 * Check if the ExtRef is already subscribed to a FCDA Element.
 *
 * @param extRefElement - The Ext Ref Element to check.
 */
export function isSubscribed(extRefElement) {
    return (extRefElement.hasAttribute('iedName') &&
        extRefElement.hasAttribute('ldInst') &&
        extRefElement.hasAttribute('prefix') &&
        extRefElement.hasAttribute('lnClass') &&
        extRefElement.hasAttribute('lnInst') &&
        extRefElement.hasAttribute('doName') &&
        extRefElement.hasAttribute('daName'));
}
export function getExtRefElements(rootElement, fcdaElement, includeLaterBinding) {
    return Array.from(rootElement.querySelectorAll('ExtRef'))
        .filter(element => (includeLaterBinding && element.hasAttribute('intAddr')) ||
        (!includeLaterBinding && !element.hasAttribute('intAddr')))
        .filter(element => element.closest('IED') !== fcdaElement?.closest('IED'));
}
export function getSubscribedExtRefElements(rootElement, controlTag, fcdaElement, controlElement, includeLaterBinding) {
    return getExtRefElements(rootElement, fcdaElement, includeLaterBinding).filter(extRefElement => isSubscribedTo(controlTag, controlElement, fcdaElement, extRefElement));
}
//# sourceMappingURL=foundation.js.map