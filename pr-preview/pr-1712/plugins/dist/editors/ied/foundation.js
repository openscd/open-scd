import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { LitElement, property } from '../../../../_snowpack/pkg/lit-element.js';
import { getInstanceAttribute, getNameAttribute, } from '../../../../openscd/src/foundation.js';
import { createElement } from '../../../../_snowpack/link/packages/xml/dist/index.js';
import { insertSelectedLNodeType } from '../../../../_snowpack/pkg/@openenergytools/scl-lib/dist/tDataTypeTemplates/insertSelectedLNodeType.js';
/** Base class for all containers inside the IED Editor. */
export class Container extends LitElement {
    constructor() {
        super();
        this.editCount = -1;
        this.ancestors = [];
        this.addEventListener('focus', event => {
            event.stopPropagation();
            const pathOfAncestorNames = this.ancestors.map(ancestor => getTitleForElementPath(ancestor));
            pathOfAncestorNames.push(getTitleForElementPath(this.element));
            this.dispatchEvent(newFullElementPathEvent(pathOfAncestorNames));
        });
        this.addEventListener('blur', () => {
            this.dispatchEvent(newFullElementPathEvent(this.ancestors.map(ancestor => getTitleForElementPath(ancestor))));
        });
    }
}
__decorate([
    property()
], Container.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], Container.prototype, "editCount", void 0);
__decorate([
    property({ attribute: false })
], Container.prototype, "element", void 0);
__decorate([
    property()
], Container.prototype, "nsdoc", void 0);
__decorate([
    property()
], Container.prototype, "ancestors", void 0);
/**
 * Search for an element with a passed tag-name in the list of ancestors passed.
 * @param ancestors - The list of elements to search in for an LN or LN0 element.
 * @param tagName - The Tag-name of the element to search for.
 * @returns The found element with the tag-name or null if not found.
 */
export function findElement(ancestors, tagName) {
    return ancestors.find(element => element.tagName === tagName) ?? null;
}
/**
 * Search for the LN0 or LN element in the list of ancestors passed.
 * @param ancestors - The list of elements to search in for an LN or LN0 element.
 * @returns The LN0/LN Element found or null if not found.
 */
export function findLogicalNodeElement(ancestors) {
    let element = findElement(ancestors, 'LN0');
    if (!element) {
        element = findElement(ancestors, 'LN');
    }
    return element;
}
/**
 * Find an existing LLN0 LNodeType in the document.
 * @param doc - The XML document to search in.
 * @returns The LLN0 LNodeType element or null if not found.
 */
export function findLLN0LNodeType(doc) {
    return doc.querySelector('DataTypeTemplates > LNodeType[lnClass="LLN0"]');
}
/**
 * Create a minimal LLN0 LNodeType with essential data objects.
 * @param doc - The XML document to create the LNodeType in.
 * @param id - Optional ID for the LNodeType, defaults to 'LLN0_OpenSCD'.
 * @returns Array of InsertV2 operations to create the LNodeType and dependencies.
 */
export function createLLN0LNodeType(doc, id) {
    const selection = {
        Beh: {
            stVal: {
                on: {},
                blocked: {},
                test: {},
                'test/blocked': {},
                off: {},
            },
            q: {},
            t: {},
        },
    };
    const logicalnode = {
        class: 'LLN0',
        id,
    };
    return insertSelectedLNodeType(doc, selection, logicalnode);
}
/**
 * Create a basic IED structure with the specified name.
 * @param doc - The XML document to create the IED in.
 * @param iedName - The name for the new IED.
 * @param lnTypeId - The LNodeType ID to use for the LN0.
 * @param manufacturer - Optional manufacturer name, defaults to 'OpenSCD'.
 * @returns The created IED element.
 */
export function createIEDStructure(doc, iedName, lnTypeId, manufacturer = 'OpenSCD') {
    const ied = createElement(doc, 'IED', {
        name: iedName,
        manufacturer,
    });
    const accessPoint = createElement(doc, 'AccessPoint', { name: 'AP1' });
    ied.appendChild(accessPoint);
    const server = createElement(doc, 'Server', {});
    accessPoint.appendChild(server);
    const authentication = createElement(doc, 'Authentication', {});
    server.appendChild(authentication);
    const lDevice = createElement(doc, 'LDevice', { inst: 'LD1' });
    server.appendChild(lDevice);
    const ln0 = createElement(doc, 'LN0', {
        lnClass: 'LLN0',
        inst: '',
        lnType: lnTypeId,
    });
    lDevice.appendChild(ln0);
    return ied;
}
/**
 * With the passed DO Element retrieve the type attribute and search for the DOType in the DataType Templates section.
 * @param element - The DO Element.
 * @returns The DOType element found in the DataType Templates section or null if it not exists.
 */
export function findDOTypeElement(element) {
    if (element && element.hasAttribute('type')) {
        const type = element.getAttribute('type');
        return element
            .closest('SCL')
            .querySelector(`:root > DataTypeTemplates > DOType[id="${type}"]`);
    }
    return null;
}
/**
 * Get the instance element (SDI / DAI) of a DA element (if available)
 * @param parentInstance - The parent instance if available to search in for other instance elements.
 * @param da             - The (B)DA object to search with.
 * @returns The optional SDI / DAI element.
 */
export function getInstanceDAElement(parentInstance, da) {
    if (parentInstance) {
        const daName = getNameAttribute(da);
        const bType = da.getAttribute('bType');
        if (bType == 'Struct') {
            return parentInstance.querySelector(`:scope > SDI[name="${daName}"]`);
        }
        return parentInstance.querySelector(`:scope > DAI[name="${daName}"]`);
    }
    return null;
}
export function getTitleForElementPath(element) {
    switch (element.tagName) {
        case 'LN':
        case 'LN0': {
            return element.getAttribute('lnClass');
        }
        case 'LDevice': {
            return (getNameAttribute(element) ?? getInstanceAttribute(element));
        }
        case 'Server': {
            return 'Server';
        }
        default: {
            return element.getAttribute('name');
        }
    }
}
/** @returns  Array of 'Val' elements for a given parent data attribute */
export function getValueElements(parent) {
    return Array.from(parent.querySelectorAll('Val'));
}
export function newFullElementPathEvent(elementNames, eventInitDict) {
    return new CustomEvent('full-element-path', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: { elementNames, ...eventInitDict?.detail },
    });
}
//# sourceMappingURL=foundation.js.map