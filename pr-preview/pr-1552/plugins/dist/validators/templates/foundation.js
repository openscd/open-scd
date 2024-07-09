import { dAValidator } from './dabda.js';
import { dATypeValidator } from './datype.js';
import { dOValidator } from './dosdo.js';
import { dOTypeValidator } from './dotype.js';
import { lNodeTypeValidator } from './lnodetype.js';
export const iec6185074 = fetch('public/xml/IEC_61850-7-4_2007B3.nsd')
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'application/xml'));
export const iec6185073 = fetch('public/xml/IEC_61850-7-3_2007B3.nsd')
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'application/xml'));
export const iec6185072 = fetch('public/xml/IEC_61850-7-2_2007B3.nsd')
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'application/xml'));
export const iec6185081 = fetch('public/xml/IEC_61850-8-1_2003A2.nsd')
    .then(response => response.text())
    .then(str => new DOMParser().parseFromString(str, 'application/xml'));
export const serviceCDCs = [
    'SPC',
    'DPC',
    'INC',
    'ENC',
    'BSC',
    'ISC',
    'APC',
    'BAC',
];
export function isTypeMissing(element) {
    const tagName = element.tagName;
    const isTypeMandatory = tagName === 'DO' ||
        tagName === 'SDO' ||
        ((tagName === 'DA' || tagName === 'BDA') &&
            (element.getAttribute('bType') === 'Enum' ||
                element.getAttribute('bType') === 'Struct'));
    const isTypeMissing = !element.getAttribute('type');
    return isTypeMandatory && isTypeMissing;
}
export function getTypeChild(element) {
    const isStruct = element.getAttribute('bType') === 'Struct';
    const isEnum = element.getAttribute('bType') === 'Enum';
    const isDo = element.tagName === 'DO' || element.tagName === 'SDO';
    const referenceTag = isDo
        ? 'DOType'
        : isStruct || isEnum
            ? isStruct
                ? 'DAType'
                : 'EnumType'
            : null;
    if (!referenceTag)
        return undefined;
    return (element
        .closest('DataTypeTemplates')
        ?.querySelector(`${referenceTag}[id="${element.getAttribute('type')}"]`) ?? null);
}
export function getAdjacentClass(nsd, base) {
    if (base === '')
        return [];
    const adjacents = getAdjacentClass(nsd, nsd
        .querySelector(`LNClass[name="${base}"], AbstractLNClass[name="${base}"]`)
        ?.getAttribute('base') ?? '');
    return Array.from(nsd.querySelectorAll(`LNClass[name="${base}"], AbstractLNClass[name="${base}"]`)).concat(adjacents);
}
export async function validateChildren(element) {
    const issues = [];
    const children = Array.from(element.children);
    for (const child of children) {
        const validator = tagValidator[child.tagName];
        if (!validator)
            continue;
        const childIssues = await validator(child);
        if (childIssues.length)
            for (const childIssue of childIssues)
                issues.push(childIssue);
    }
    return issues;
}
export const tagValidator = {
    LNodeType: lNodeTypeValidator,
    DOType: dOTypeValidator,
    DAType: dATypeValidator,
    DO: dOValidator,
    SDO: dOValidator,
    DA: dAValidator,
    BDA: dAValidator,
};
//# sourceMappingURL=foundation.js.map