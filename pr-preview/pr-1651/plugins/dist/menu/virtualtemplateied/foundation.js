import { identity, } from '../../../../openscd/src/foundation.js';
import { createElement, getChildElementsByTagName, } from '../../../../_snowpack/link/packages/xml/dist/index.js';
const functionTypeElementTags = [
    'Function',
    'SubFunction',
    'EqFunction',
    'EqSubFunction',
];
const functionTypeSelector = functionTypeElementTags.join(',');
/**
 * @param element - Some element Function, SubFunction, EqFunction or EqSubFunction
 * @returns Whether the element is a leaf function acc. to IEC 61850-6-100
 * */
export function isLeafFunction(element) {
    if (!element)
        return false;
    if (element.tagName !== 'SubFunction' && element.tagName !== 'EqSubFunction')
        return false;
    return (element.children.length === 1 && element.children[0].tagName === 'LNode');
}
/** @returns closest non-leaf function type parent element */
export function getNonLeafParent(element) {
    if (!element)
        return null;
    const directParent = element.parentElement;
    if (!directParent || !functionTypeElementTags.includes(directParent.tagName))
        return null;
    if (isLeafFunction(directParent))
        return getNonLeafParent(directParent);
    return directParent;
}
/** @returns prefix of LNode element acc. to IEC 61850-6-100 */
export function getFunctionNamingPrefix(lNode) {
    const lNodesPrefix = lNode.getAttribute('prefix');
    if (lNodesPrefix)
        return lNodesPrefix;
    return isLeafFunction(lNode.parentElement)
        ? lNode.parentElement?.getAttribute('name') ?? ''
        : '';
}
function canFunctionBeConvertedToLDevice(element) {
    if (!functionTypeElementTags.includes(element.tagName))
        return true;
    return (!isLeafFunction(element) &&
        getChildElementsByTagName(element, 'LNode').length > 1);
}
function shortestIdentities(identities) {
    const lengths = identities.map(identity => identity.split('>').length);
    const maxLength = Math.max(...lengths);
    let i = 1;
    while (i <= maxLength) {
        const next = identities.map(identity => identity.split('>').slice(-i).join('_'));
        if (new Set(next).size === next.length)
            return next;
        i++;
    }
    return identities.map(identity => identity.split('>').join('_'));
}
export function getUniqueFunctionName(element) {
    if (!functionTypeElementTags.includes(element.tagName)) {
        const id = identity(element);
        return typeof id === 'string' ? id : '';
    }
    const name = element.getAttribute('name');
    if (!name)
        return identity(element);
    const sameNamed = Array.from(element.ownerDocument.querySelectorAll(functionTypeSelector))
        .filter(functionElement => canFunctionBeConvertedToLDevice(functionElement))
        .filter(functionElement => functionElement !== element &&
        functionElement.getAttribute('name') === name)
        .map(functionElement => identity(functionElement));
    return shortestIdentities([identity(element), ...sameNamed])[0];
}
/** @returns schema valid SPECIFICATION type IED based on virtualIED object  */
export function getSpecificationIED(ownerDocument, virtualIED) {
    const ied = createElement(ownerDocument, 'IED', {
        name: 'SPECIFICATION',
        desc: virtualIED.desc,
        manufacturer: virtualIED.manufacturer,
    });
    const accessPoint = createElement(ownerDocument, 'AccessPoint', {
        name: virtualIED.apName,
    });
    const server = createElement(ownerDocument, 'Server', {});
    // next two line required for schema validity
    const authentication = createElement(ownerDocument, 'Authentication', {});
    server.appendChild(authentication);
    Object.values(virtualIED.lDevices).forEach(lDeviceDesc => {
        const lDevice = createElement(ownerDocument, 'LDevice', {
            inst: lDeviceDesc.validLdInst,
        });
        lDeviceDesc.anyLNs.forEach(anyLNDesc => {
            const anyLN = createElement(ownerDocument, anyLNDesc.lnClass === 'LLN0' ? 'LN0' : 'LN', {
                prefix: anyLNDesc.prefix,
                lnClass: anyLNDesc.lnClass,
                inst: anyLNDesc.inst,
                lnType: anyLNDesc.lnType,
            });
            lDevice.appendChild(anyLN);
        });
        server.appendChild(lDevice);
    });
    ied.appendChild(accessPoint);
    accessPoint.appendChild(server);
    return ied;
}
//# sourceMappingURL=foundation.js.map