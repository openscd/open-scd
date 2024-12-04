import { SCL_NAMESPACE } from '../schemas.js';
/**
 * Determine which part of the Template Structure still needs to be initialized.
 * With the first call the parent will normally be the LN(0) Element to start from.
 * It will use the list to pop the first element and look if there is a DOI/SDI/DAI
 * Element available with the same name.
 *
 * @param parentElement     - The element to search from for a DOI/SDI/DAI
 * @param templateStructure - The templates structure with DO/DA/BDA Elements.
 * @returns The last element initialized element or LN(0) if nothing is initialized. This Element can be used to
 *          add the new element to. And the list of Template Elements that still need to be initialized.
 */
export function determineUninitializedStructure(parentElement, templateStructure) {
    const templateElement = templateStructure.shift();
    if (templateStructure.length > 0) {
        // If there are still Template Elements we didn't reach the DAI Element, so continue checking if any DOI/SDI
        // Element is found with the same name.
        let instanceElement;
        // DO Elements are initialized as DOI, others as SDI.
        if (templateElement.tagName === 'DO') {
            instanceElement = parentElement.querySelector(`DOI[name="${templateElement.getAttribute('name')}"]`);
        }
        else {
            instanceElement = parentElement.querySelector(`SDI[name="${templateElement.getAttribute('name')}"]`);
        }
        if (instanceElement) {
            // If instance element found we will search one level lower again.
            // So the parent will become the instance element and the list is 1 smaller.
            return determineUninitializedStructure(instanceElement, templateStructure);
        }
        else {
            // No instance element found, so the element and all other elements still need to be
            // initialized and returned.
            templateStructure.unshift(templateElement);
            return [parentElement, templateStructure];
        }
    }
    else {
        // The last template element in the list, so this should be the DA Element that only needs
        // to be initialized.
        return [parentElement, [templateElement]];
    }
}
/**
 * Create a new instance structure defined by the array of template elements passed.
 *
 * @param uninitializedTemplateStructure - The Array of Template Elements for which new instance elements need to be
 * created.
 * @returns The Element created from the last Template Element in the Array.
 */
export function initializeElements(uninitializedTemplateStructure) {
    const element = uninitializedTemplateStructure.shift();
    if (uninitializedTemplateStructure.length > 0) {
        // If there are more template elements left this will become a DOI or SDI Element.
        let newElement;
        // Depending on the level create a DOI or SDI Element.
        if (element.tagName === 'DO') {
            newElement = element.ownerDocument.createElementNS(SCL_NAMESPACE, 'DOI');
        }
        else {
            newElement = element.ownerDocument.createElementNS(SCL_NAMESPACE, 'SDI');
        }
        newElement.setAttribute('name', element?.getAttribute('name') ?? '');
        // Create an element from the next one (last) from the shortened array.
        const childElement = initializeElements(uninitializedTemplateStructure);
        newElement.append(childElement);
        return newElement;
    }
    else {
        // Create Val Element
        const newValElement = element.ownerDocument.createElementNS(SCL_NAMESPACE, 'Val');
        const valElement = element.querySelector('Val');
        if (valElement) {
            newValElement.textContent = valElement.textContent;
        }
        // Create DAI Element
        const daiElement = element.ownerDocument.createElementNS(SCL_NAMESPACE, 'DAI');
        daiElement.setAttribute('name', element?.getAttribute('name') ?? '');
        daiElement.append(newValElement);
        return daiElement;
    }
}
/**
 * Use the path configuration of a Common Data Class to search for all DO/SDO/DA/BDA Elements to create
 * a structure for which DOI/SDI/DAI Elements should be created later. Null will be returned when an invalid
 * Template Structure is described by the path.
 *
 * @param lnElement - The LN Element to use for searching the starting DO Element.
 * @param path    - The (S)DO/(B)DA Elements to find in the template structure.
 * @returns List of Elements starting with the DO Element followed by one or more SDO or (B)DA Elements describing the structure.
 */
export function createTemplateStructure(lnElement, path) {
    let templateStructure = [];
    const doc = lnElement.ownerDocument;
    const lnType = lnElement.getAttribute('lnType') ?? '';
    let typeElement = doc.querySelector(`LNodeType[id="${lnType}"]`);
    path.forEach(name => {
        // There should be a DOType or DAType set for the current element in the list.
        if (!typeElement) {
            templateStructure = null;
            return;
        }
        const dataElement = typeElement.querySelector(`:scope > DO[name="${name}"], :scope > SDO[name="${name}"], :scope > DA[name="${name}"], :scope > BDA[name="${name}"]`);
        // If there is no (S)DO/(B)DA Element found the structure is incorrect, so just stop.
        if (dataElement === null) {
            templateStructure = null;
            return;
        }
        templateStructure.push(dataElement);
        if (dataElement.tagName === 'DO' || dataElement.tagName === 'SDO') {
            const type = dataElement.getAttribute('type') ?? '';
            typeElement = doc.querySelector(`DataTypeTemplates > DOType[id="${type}"]`);
        }
        else {
            const bType = dataElement.getAttribute('bType') ?? '';
            if (bType === 'Struct') {
                const type = dataElement.getAttribute('type') ?? '';
                typeElement = doc.querySelector(`DataTypeTemplates > DAType[id="${type}"]`);
            }
            else {
                typeElement = null;
            }
        }
    });
    return templateStructure;
}
//# sourceMappingURL=dai.js.map