import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { css, LitElement, query } from '../../../../_snowpack/pkg/lit-element.js';
import { compareNames, getSclSchemaVersion, isPublic, minAvailableLogicalNodeInstance, } from '../../../../openscd/src/foundation.js';
import { cloneElement, createElement, } from '../../../../_snowpack/link/packages/xml/dist/index.js';
import { getFcdaReferences } from '../../../../openscd/src/foundation/ied.js';
import { SCL_NAMESPACE } from '../../../../openscd/src/schemas.js';
export var View;
(function (View) {
    View[View["PUBLISHER"] = 0] = "PUBLISHER";
    View[View["SUBSCRIBER"] = 1] = "SUBSCRIBER";
})(View || (View = {}));
/**
 * Enumeration stating the Subscribe status of a IED to a GOOSE or Sampled Value.
 */
export var SubscribeStatus;
(function (SubscribeStatus) {
    SubscribeStatus[SubscribeStatus["Full"] = 0] = "Full";
    SubscribeStatus[SubscribeStatus["Partial"] = 1] = "Partial";
    SubscribeStatus[SubscribeStatus["None"] = 2] = "None";
})(SubscribeStatus || (SubscribeStatus = {}));
export function newViewEvent(view, eventInitDict) {
    return new CustomEvent('view', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: { view, ...eventInitDict?.detail },
    });
}
export function newIEDSelectEvent(ied, eventInitDict) {
    return new CustomEvent('ied-select', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: { ied, ...eventInitDict?.detail },
    });
}
export function newFcdaSelectEvent(control, fcda, eventInitDict) {
    return new CustomEvent('fcda-select', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: { control, fcda, ...eventInitDict?.detail },
    });
}
export function newSubscriptionChangedEvent(control, fcda, eventInitDict) {
    return new CustomEvent('subscription-changed', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: { control, fcda, ...eventInitDict?.detail },
    });
}
export function getFcdaTitleValue(fcdaElement) {
    return `${fcdaElement.getAttribute('doName')}${fcdaElement.hasAttribute('doName') && fcdaElement.hasAttribute('daName')
        ? `.`
        : ``}${fcdaElement.getAttribute('daName')}`;
}
export function getFcdaSubtitleValue(fcdaElement) {
    return `${fcdaElement.getAttribute('ldInst')} ${fcdaElement.hasAttribute('ldInst') ? `/` : ''}${fcdaElement.getAttribute('prefix')
        ? ` ${fcdaElement.getAttribute('prefix')}`
        : ''} ${fcdaElement.getAttribute('lnClass')} ${fcdaElement.getAttribute('lnInst')}`;
}
export function existExtRef(parentInputs, fcda, control) {
    return !!getExtRef(parentInputs, fcda, control);
}
export function getExtRef(parentInputs, fcda, control) {
    function createCriteria(attributeName, value) {
        // For ExtRef the attribute 'srcLNClass' is optional and defaults to 'LLN0', here we ignore 'srcLNClass' completely for 'LLN0'
        // because otherwise we would have to extend the querySelector to multiple selector groups checking for 'LLN0' or missing 'srcLNClass'
        const shouldIgnoreCriteria = attributeName === 'srcLNClass' && value === 'LLN0';
        if (shouldIgnoreCriteria) {
            return '';
        }
        if (value) {
            return `[${attributeName}="${value}"]`;
        }
        return '';
    }
    const iedName = fcda.closest('IED')?.getAttribute('name');
    if (!iedName) {
        return undefined;
    }
    let controlCriteria = '';
    if (control && getSclSchemaVersion(fcda.ownerDocument) !== '2003') {
        controlCriteria = `[serviceType="${serviceTypes[control.tagName]}"]`;
        controlCriteria += createCriteria('srcLDInst', control.closest('LDevice')?.getAttribute('inst') ?? null);
        controlCriteria += createCriteria('srcLNClass', control.closest('LN0,LN')?.getAttribute('lnClass') ?? null);
        controlCriteria += createCriteria('srcLNInst', control.closest('LN0,LN')?.getAttribute('inst') ?? null);
        controlCriteria += createCriteria('srcCBName', control.getAttribute('name') ?? null);
    }
    return Array.from(parentInputs.querySelectorAll(`ExtRef[iedName="${iedName}"]${getFcdaReferences(fcda)}${controlCriteria}`)).find(extRefElement => !extRefElement.hasAttribute('intAddr'));
}
export function canRemoveSubscriptionSupervision(subscribedExtRef) {
    const [srcCBName, srcLDInst, srcLNClass, iedName, srcPrefix, srcLNInst] = [
        'srcCBName',
        'srcLDInst',
        'srcLNClass',
        'iedName',
        'srcPrefix',
        'srcLNInst',
    ].map(attr => subscribedExtRef.getAttribute(attr));
    return !Array.from(subscribedExtRef.closest('IED')?.getElementsByTagName('ExtRef') ?? [])
        .filter(isPublic)
        .some(extRef => (extRef.getAttribute('srcCBName') ?? '') === (srcCBName ?? '') &&
        (extRef.getAttribute('srcLDInst') ?? '') === (srcLDInst ?? '') &&
        (extRef.getAttribute('srcLNClass') ?? '') === (srcLNClass ?? '') &&
        (extRef.getAttribute('iedName') ?? '') === (iedName ?? '') &&
        (extRef.getAttribute('srcPrefix') ?? '') === (srcPrefix ?? '') &&
        (extRef.getAttribute('srcLNInst') ?? '') === (srcLNInst ?? '') &&
        extRef !== subscribedExtRef);
}
/**
 * Searches for first instantiated LGOS/LSVS LN for presence of DOI>DAI[valKind=Conf/RO][valImport=true]
 * given a supervision type and if necessary then searches DataTypeTemplates for
 * DOType>DA[valKind=Conf/RO][valImport=true] to determine if modifications to supervision are allowed.
 * @param ied - SCL IED element.
 * @param supervisionType - either 'LGOS' or 'LSVS' supervision LN classes.
 * @returns boolean indicating if subscriptions are allowed.
 */
function isSupervisionModificationAllowed(ied, supervisionType) {
    const firstSupervisionLN = ied.querySelector(`LN[lnClass="${supervisionType}"]`);
    // no supervision logical nodes => no new supervision possible
    if (firstSupervisionLN === null)
        return false;
    // check if allowed to modify based on first instance properties
    const supervisionName = supervisionType === 'LGOS' ? 'GoCBRef' : 'SvCBRef';
    const instValKind = firstSupervisionLN
        .querySelector(`DOI[name="${supervisionName}"]>DAI[name="setSrcRef"]`)
        ?.getAttribute('valKind');
    const instValImport = firstSupervisionLN
        .querySelector(`DOI[name="${supervisionName}"]>DAI[name="setSrcRef"]`)
        ?.getAttribute('valImport');
    if ((instValKind === 'RO' || instValKind === 'Conf') &&
        instValImport === 'true')
        return true;
    // check if allowed to modify based on DataTypeTemplates for first instance
    const rootNode = firstSupervisionLN?.ownerDocument;
    const lNodeType = firstSupervisionLN.getAttribute('lnType');
    const lnClass = firstSupervisionLN.getAttribute('lnClass');
    const dObj = rootNode.querySelector(`DataTypeTemplates > LNodeType[id="${lNodeType}"][lnClass="${lnClass}"] > DO[name="${lnClass === 'LGOS' ? 'GoCBRef' : 'SvCBRef'}"]`);
    if (dObj) {
        const dORef = dObj.getAttribute('type');
        const daObj = rootNode.querySelector(`DataTypeTemplates > DOType[id="${dORef}"] > DA[name="setSrcRef"]`);
        if (daObj) {
            return ((daObj.getAttribute('valKind') === 'Conf' ||
                daObj.getAttribute('valKind') === 'RO') &&
                daObj.getAttribute('valImport') === 'true');
        }
    }
    // definition missing
    return false;
}
/**
 * Returns an array with a single Create action to create a new
 * supervision element for the given GOOSE/SMV message and subscriber IED.
 *
 * @param controlBlock The GOOSE or SMV message element
 * @param subscriberIED The subscriber IED
 * @returns an empty array if instantiation is not possible or an array with a single Create action
 */
export function instantiateSubscriptionSupervision(controlBlock, subscriberIED) {
    const supervisionType = controlBlock?.tagName === 'GSEControl' ? 'LGOS' : 'LSVS';
    if (!controlBlock ||
        !subscriberIED ||
        !isSupervisionAllowed(controlBlock, subscriberIED, supervisionType))
        return [];
    const availableLN = findOrCreateAvailableLNInst(controlBlock, subscriberIED, supervisionType);
    if (!availableLN ||
        !isSupervisionModificationAllowed(subscriberIED, supervisionType))
        return [];
    const actions = [];
    // If creating new LN element
    if (!availableLN.parentElement) {
        const parent = subscriberIED.querySelector(`LN[lnClass="${supervisionType}"]`)?.parentElement;
        if (parent) {
            // use Create Action for supervision LN
            actions.push({
                new: {
                    parent: parent,
                    element: availableLN,
                    reference: parent.querySelector(`LN[lnClass="${supervisionType}"]:last-child`)?.nextElementSibling,
                },
            });
        }
    }
    // Create child elements
    const supervisionName = supervisionType === 'LGOS' ? 'GoCBRef' : 'SvCBRef';
    let doiElement = availableLN.querySelector(`DOI[name="${supervisionName}"]`);
    if (!doiElement) {
        doiElement = subscriberIED.ownerDocument.createElementNS(SCL_NAMESPACE, 'DOI');
        doiElement.setAttribute('name', supervisionName);
        actions.push({
            new: {
                parent: availableLN,
                element: doiElement,
            },
        });
    }
    let daiElement = availableLN.querySelector(`DOI[name="${supervisionName}"]>DAI[name="setSrcRef"]`);
    if (!daiElement) {
        daiElement = subscriberIED.ownerDocument.createElementNS(SCL_NAMESPACE, 'DAI');
        const srcValRef = subscriberIED.querySelector(`LN[lnClass="${supervisionType}"]>DOI[name="${supervisionName}"]>DAI[name="setSrcRef"]`);
        daiElement.setAttribute('name', 'setSrcRef');
        // transfer valKind and valImport from first supervision instance if present
        if (srcValRef?.hasAttribute('valKind'))
            daiElement.setAttribute('valKind', srcValRef.getAttribute('valKind'));
        if (srcValRef?.hasAttribute('valImport'))
            daiElement.setAttribute('valImport', srcValRef.getAttribute('valImport'));
        actions.push({
            new: {
                parent: doiElement,
                element: daiElement,
            },
        });
    }
    let valElement = availableLN.querySelector(`Val`);
    if (!valElement) {
        valElement = subscriberIED.ownerDocument.createElementNS(SCL_NAMESPACE, 'Val');
    }
    valElement.textContent = controlBlockReference(controlBlock);
    actions.push({
        new: {
            parent: daiElement,
            element: valElement,
        },
    });
    return actions;
}
export function getSupervisionCbRefs(ied, cbTagName, firstOnly) {
    const supervisionType = cbTagName === 'GSEControl' ? 'LGOS' : 'LSVS';
    const supervisionName = supervisionType === 'LGOS' ? 'GoCBRef' : 'SvCBRef';
    const selectorString = `LN[lnClass="${supervisionType}"]>DOI[name="${supervisionName}"]>DAI[name="setSrcRef"]>Val,LN0[lnClass="${supervisionType}"]>DOI[name="${supervisionName}"]>DAI[name="setSrcRef"]>Val`;
    return firstOnly
        ? ied.querySelector(selectorString)
        : Array.from(ied.querySelectorAll(selectorString));
}
/**
 * Return an array with a single Delete action to delete the supervision element
 * for the given GOOSE/SMV message and subscriber IED.
 *
 * @param controlBlock The GOOSE or SMV message element
 * @param subscriberIED The subscriber IED
 * @returns an empty array if removing the supervision is not possible or an array
 * with a single Delete action that removes the LN if it was created in OpenSCD
 * or only the supervision structure DOI/DAI/Val if it was created by the user.
 */
export function removeSubscriptionSupervision(controlBlock, subscriberIED) {
    if (!controlBlock || !subscriberIED)
        return [];
    const valElement = getSupervisionCbRefs(subscriberIED, controlBlock.tagName).find(val => val.textContent == controlBlockReference(controlBlock));
    if (!valElement)
        return [];
    const lnElement = valElement.closest('LN0, LN');
    if (!lnElement || !lnElement.parentElement)
        return [];
    // Check if that one has been created by OpenSCD (private section exists)
    const isOpenScdCreated = lnElement.querySelector('Private[type="OpenSCD.create"]');
    return isOpenScdCreated
        ? [
            {
                old: {
                    parent: lnElement.parentElement,
                    element: lnElement,
                },
            },
        ]
        : [
            {
                old: {
                    parent: lnElement,
                    element: valElement.closest('DOI'),
                },
            },
        ];
}
/**
 * Checks if the given combination of GOOSE/SMV message and subscriber IED
 * allows for subscription supervision.
 * @param controlBlock The GOOSE or SMV message element
 * @param subscriberIED The subscriber IED
 * @param supervisionType LSVS or LGOS
 * @returns true if both controlBlock and subscriberIED meet the requirements for
 * setting up a supervision for the specified supervision type or false if they don't
 */
function isSupervisionAllowed(controlBlock, subscriberIED, supervisionType) {
    if (getSclSchemaVersion(subscriberIED.ownerDocument) === '2003')
        return false;
    if (subscriberIED.querySelector(`LN[lnClass="${supervisionType}"]`) === null)
        return false;
    if (getSupervisionCbRefs(subscriberIED, controlBlock.tagName).find(val => val.textContent == controlBlockReference(controlBlock)))
        return false;
    if (maxSupervisions(subscriberIED, controlBlock) <=
        instantiatedSupervisionsCount(subscriberIED, controlBlock))
        return false;
    return true;
}
/** Returns an new or existing LN instance available for supervision instantiation
 *
 * @param controlBlock The GOOSE or SMV message element
 * @param subscriberIED The subscriber IED
 * @returns The LN instance or null if no LN instance could be found or created
 */
export function findOrCreateAvailableLNInst(controlBlock, subscriberIED, supervisionType) {
    let availableLN = Array.from(subscriberIED.querySelectorAll(`LN[lnClass="${supervisionType}"]`)).find(ln => {
        const supervisionName = supervisionType === 'LGOS' ? 'GoCBRef' : 'SvCBRef';
        return (ln.querySelector(`DOI[name="${supervisionName}"]>DAI[name="setSrcRef"]>Val`) === null ||
            ln.querySelector(`DOI[name="${supervisionName}"]>DAI[name="setSrcRef"]>Val`)?.textContent === '');
    });
    if (!availableLN) {
        availableLN = subscriberIED.ownerDocument.createElementNS(SCL_NAMESPACE, 'LN');
        const openScdTag = subscriberIED.ownerDocument.createElementNS(SCL_NAMESPACE, 'Private');
        openScdTag.setAttribute('type', 'OpenSCD.create');
        availableLN.appendChild(openScdTag);
        availableLN.setAttribute('lnClass', supervisionType);
        const instantiatedSiblings = getSupervisionCbRefs(subscriberIED, controlBlock.tagName, true)?.closest('LN');
        if (!instantiatedSiblings)
            return null;
        availableLN.setAttribute('lnType', instantiatedSiblings?.getAttribute('lnType') ?? '');
    }
    /* Before we return, we make sure that LN's inst is unique, non-empty
    and also the minimum inst as the minimum of all available in the IED */
    const inst = availableLN.getAttribute('inst') ?? '';
    if (inst === '') {
        const instNumber = minAvailableLogicalNodeInstance(Array.from(subscriberIED.querySelectorAll(`LN[lnClass="${supervisionType}"]`)));
        if (!instNumber)
            return null;
        availableLN.setAttribute('inst', instNumber);
    }
    return availableLN;
}
/**
 * Find the first ExtRef SCL element given a control and a subscribing IED
 *
 * @param publishedControlBlock - the control block SCL element in the publishing IED.
 * @param subscribingIed - the subscribing IED SCL element.
 * @returns The first ExtRef element associated with the subscribing IED and published control block.
 */
export function getFirstSubscribedExtRef(publishedControlBlock, subscribingIed) {
    const publishingIed = publishedControlBlock.closest('LN,LN0');
    const dataSet = publishingIed.querySelector(`DataSet[name="${publishedControlBlock.getAttribute('datSet')}"]`);
    let extRef = undefined;
    Array.from(subscribingIed?.querySelectorAll('LN0 > Inputs, LN > Inputs')).some(inputs => {
        Array.from(dataSet.querySelectorAll('FCDA')).some(fcda => {
            const anExtRef = getExtRef(inputs, fcda, publishedControlBlock);
            if (anExtRef) {
                extRef = anExtRef;
                return true;
            }
            return false;
        });
        return extRef !== undefined;
    });
    return extRef !== undefined ? extRef : null;
}
/** Returns the subscriber's supervision LN for a given control block and extRef element
 *
 * @param extRef - The extRef SCL element in the subscribing IED.
 * @returns The supervision LN instance or null if not found
 */
export function getExistingSupervision(extRef) {
    if (extRef === null)
        return null;
    const extRefValues = ['iedName', 'serviceType', 'srcPrefix', 'srcCBName'];
    const [srcIedName, serviceType, srcPrefix, srcCBName] = extRefValues.map(attr => extRef.getAttribute(attr) ?? '');
    const supervisionType = serviceType === 'GOOSE' ? 'LGOS' : 'LSVS';
    const refSelector = supervisionType === 'LGOS' ? 'DOI[name="GoCBRef"]' : 'DOI[name="SvCBRef"]';
    const srcLDInst = extRef.getAttribute('srcLDInst') ?? extRef.getAttribute('ldInst');
    const srcLNClass = extRef.getAttribute('srcLNClass') ?? 'LLN0';
    const cbReference = `${srcIedName}${srcPrefix}${srcLDInst}/${srcLNClass}.${srcCBName}`;
    const iedName = extRef.closest('IED')?.getAttribute('name');
    const candidates = Array.from(extRef.ownerDocument
        .querySelector(`IED[name="${iedName}"]`)
        .querySelectorAll(`LN[lnClass="${supervisionType}"]>${refSelector}>DAI[name="setSrcRef"]>Val`)).find(val => val.textContent === cbReference);
    return candidates !== undefined ? candidates.closest('LN') : null;
}
/**
 * Counts the number of LN instances with proper supervision for the given control block set up.
 *
 * @param subscriberIED The subscriber IED
 * @param controlBlock The GOOSE or SMV message element
 * @returns The number of LN instances with a supervision set up
 */
export function instantiatedSupervisionsCount(subscriberIED, controlBlock) {
    const instantiatedValues = getSupervisionCbRefs(subscriberIED, controlBlock.tagName).filter(val => val.textContent !== '');
    return instantiatedValues.length;
}
/**
 * Counts the max number of LN instances with supervision allowed for
 * the given control block's type of message.
 *
 * @param subscriberIED The subscriber IED
 * @param controlBlock The GOOSE or SMV message element
 * @returns The max number of LN instances with supervision allowed
 */
export function maxSupervisions(subscriberIED, controlBlock) {
    const maxAttr = controlBlock.tagName === 'GSEControl' ? 'maxGo' : 'maxSv';
    const maxValues = parseInt(subscriberIED
        .querySelector('Services>SupSubscription')
        ?.getAttribute(maxAttr) ?? '0', 10);
    return isNaN(maxValues) ? 0 : maxValues;
}
/**
 * Creates a string pointer to the control block element.
 *
 * @param controlBlock The GOOSE or SMV message element
 * @returns null if the control block is undefined or a string pointer to the control block element
 */
export function controlBlockReference(controlBlock) {
    if (!controlBlock)
        return null;
    const anyLn = controlBlock.closest('LN,LN0');
    const prefix = anyLn?.getAttribute('prefix') ?? '';
    const lnClass = anyLn?.getAttribute('lnClass');
    const lnInst = anyLn?.getAttribute('inst') ?? '';
    const ldInst = controlBlock.closest('LDevice')?.getAttribute('inst');
    const iedName = controlBlock.closest('IED')?.getAttribute('name');
    const cbName = controlBlock.getAttribute('name');
    if (!cbName && !iedName && !ldInst && !lnClass)
        return null;
    return `${iedName}${ldInst}/${prefix}${lnClass}${lnInst}.${cbName}`;
}
export function canCreateValidExtRef(fcda, controlBlock) {
    const iedName = fcda.closest('IED')?.getAttribute('name');
    const [ldInst, lnClass, lnInst, doName] = [
        'ldInst',
        'lnClass',
        'lnInst',
        'doName',
    ].map(attr => fcda.getAttribute(attr));
    if (!iedName || !ldInst || !lnClass || !lnInst || !doName) {
        return false;
    }
    // For 2003 schema or serviceType `Poll`, the extra fields aren't needed.
    if (getSclSchemaVersion(fcda.ownerDocument) === '2003' ||
        controlBlock === undefined) {
        return true;
    }
    const srcLDInst = controlBlock.closest('LDevice')?.getAttribute('inst');
    const srcLNClass = controlBlock.closest('LN0,LN')?.getAttribute('lnClass');
    const srcLNInst = controlBlock.closest('LN0,LN')?.getAttribute('inst');
    const srcCBName = controlBlock.getAttribute('name');
    // For srcLNInst an empty string is allowed in `LN0`
    return !(!srcLDInst ||
        !srcLNClass ||
        !srcCBName ||
        typeof srcLNInst !== 'string');
}
export const serviceTypes = {
    ReportControl: 'Report',
    GSEControl: 'GOOSE',
    SampledValueControl: 'SMV',
};
/**
 * Create a new ExtRef Element depending on the SCL Edition copy attributes from the Control Element,
 * FCDA Element and related Elements.
 *
 * @param controlElement - `ReportControl`, `GSEControl` or `SampledValueControl` source element
 * @param fcdaElement    - The source data attribute element.
 * @returns The new created ExtRef element, which can be added to the document.
 */
export function createExtRefElement(controlElement, fcdaElement) {
    const iedName = fcdaElement.closest('IED')?.getAttribute('name') ?? null;
    const [ldInst, prefix, lnClass, lnInst, doName, daName] = [
        'ldInst',
        'prefix',
        'lnClass',
        'lnInst',
        'doName',
        'daName',
    ].map(attr => fcdaElement.getAttribute(attr));
    if (getSclSchemaVersion(fcdaElement.ownerDocument) === '2003') {
        // Edition 2003(1) does not define serviceType and its MCD attribute starting with src...
        return createElement(fcdaElement.ownerDocument, 'ExtRef', {
            iedName,
            ldInst,
            lnClass,
            lnInst,
            prefix,
            doName,
            daName,
        });
    }
    if (!controlElement || !serviceTypes[controlElement.tagName]) {
        //for invalid control block tag name assume polling
        return createElement(fcdaElement.ownerDocument, 'ExtRef', {
            iedName,
            serviceType: 'Poll',
            ldInst,
            lnClass,
            lnInst,
            prefix,
            doName,
            daName,
        });
    }
    // default is empty string as attributes are mandatory acc to IEC 61850-6 >Ed2
    const srcLDInst = controlElement.closest('LDevice')?.getAttribute('inst') ?? '';
    const srcPrefix = controlElement.closest('LN0,LN')?.getAttribute('prefix') ?? '';
    const srcLNClass = controlElement.closest('LN0,LN')?.getAttribute('lnClass') ?? '';
    const srcLNInst = controlElement.closest('LN0,LN')?.getAttribute('inst');
    const srcCBName = controlElement.getAttribute('name') ?? '';
    return createElement(fcdaElement.ownerDocument, 'ExtRef', {
        iedName,
        serviceType: serviceTypes[controlElement.tagName],
        ldInst,
        lnClass,
        lnInst,
        prefix,
        doName,
        daName,
        srcLDInst,
        srcPrefix,
        srcLNClass,
        srcLNInst: srcLNInst ? srcLNInst : null,
        srcCBName,
    });
}
/**
 * Create a clone of the passed ExtRefElement and updated or set the required attributes on the cloned element
 * depending on the Edition and type of Control Element.
 *
 * @param extRefElement  - The ExtRef Element to clone and update.
 * @param controlElement - `ReportControl`, `GSEControl` or `SampledValueControl` source element
 * @param fcdaElement    - The source data attribute element.
 * @returns A cloned ExtRef Element with updated information to be used for example in a Replace Action.
 */
export function updateExtRefElement(extRefElement, controlElement, fcdaElement) {
    const iedName = fcdaElement.closest('IED')?.getAttribute('name') ?? null;
    const [ldInst, prefix, lnClass, lnInst, doName, daName] = [
        'ldInst',
        'prefix',
        'lnClass',
        'lnInst',
        'doName',
        'daName',
    ].map(attr => fcdaElement.getAttribute(attr));
    if (getSclSchemaVersion(fcdaElement.ownerDocument) === '2003') {
        // Edition 2003(1) does not define serviceType and its MCD attribute starting with src...
        return cloneElement(extRefElement, {
            iedName,
            serviceType: null,
            ldInst,
            lnClass,
            lnInst,
            prefix,
            doName,
            daName,
            srcLDInst: null,
            srcPrefix: null,
            srcLNClass: null,
            srcLNInst: null,
            srcCBName: null,
        });
    }
    if (!controlElement || !serviceTypes[controlElement.tagName]) {
        //for invalid control block tag name assume polling
        return cloneElement(extRefElement, {
            iedName,
            serviceType: 'Poll',
            ldInst,
            lnClass,
            lnInst,
            prefix,
            doName,
            daName,
            srcLDInst: null,
            srcPrefix: null,
            srcLNClass: null,
            srcLNInst: null,
            srcCBName: null,
        });
    }
    const srcLDInst = controlElement.closest('LDevice')?.getAttribute('inst') ?? '';
    const srcPrefix = controlElement.closest('LN0,LN')?.getAttribute('prefix') ?? '';
    const srcLNClass = controlElement.closest('LN0,LN')?.getAttribute('lnClass') ?? '';
    const srcLNInst = controlElement.closest('LN0,LN')?.getAttribute('inst');
    const srcCBName = controlElement.getAttribute('name') ?? '';
    return cloneElement(extRefElement, {
        iedName,
        serviceType: serviceTypes[controlElement.tagName],
        ldInst,
        lnClass,
        lnInst,
        prefix,
        doName,
        daName,
        srcLDInst,
        srcPrefix,
        srcLNClass,
        srcLNInst: srcLNInst ? srcLNInst : null,
        srcCBName,
    });
}
export function getOrderedIeds(doc) {
    return doc
        ? Array.from(doc.querySelectorAll(':root > IED')).sort((a, b) => compareNames(a, b))
        : [];
}
export class SubscriberListContainer extends LitElement {
    constructor() {
        super(...arguments);
        /** List holding all current subscribed Elements. */
        this.subscribedElements = [];
        /** List holding all current available Elements which are not subscribed. */
        this.availableElements = [];
    }
    updated() {
        if (this.subscriberWrapper) {
            this.subscriberWrapper.scrollTo(0, 0);
        }
    }
    resetElements() {
        this.subscribedElements = [];
        this.availableElements = [];
    }
}
__decorate([
    query('div')
], SubscriberListContainer.prototype, "subscriberWrapper", void 0);
/** Common `CSS` styles used by DataTypeTemplate subeditors */
export const styles = css `
  :host(.moving) section {
    opacity: 0.3;
  }

  section {
    background-color: var(--mdc-theme-surface);
    transition: all 200ms linear;
    outline-color: var(--mdc-theme-primary);
    outline-style: solid;
    outline-width: 0px;
    opacity: 1;
  }

  section:focus {
    box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  }

  section:focus-within {
    outline-width: 2px;
    transition: all 250ms linear;
  }

  h1,
  h2,
  h3 {
    color: var(--mdc-theme-on-surface);
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0px;
    line-height: 48px;
    padding-left: 0.3em;
    transition: background-color 150ms linear;
  }

  section:focus-within > h1,
  section:focus-within > h2,
  section:focus-within > h3 {
    color: var(--mdc-theme-surface);
    background-color: var(--mdc-theme-primary);
    transition: background-color 200ms linear;
  }

  h1 > nav,
  h2 > nav,
  h3 > nav,
  h1 > abbr > mwc-icon-button,
  h2 > abbr > mwc-icon-button,
  h3 > abbr > mwc-icon-button {
    float: right;
  }

  abbr[title] {
    border-bottom: none !important;
    cursor: inherit !important;
    text-decoration: none !important;
  }

  mwc-list-item[noninteractive] {
    font-weight: 500;
  }
`;
//# sourceMappingURL=foundation.js.map