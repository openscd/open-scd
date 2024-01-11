"use strict";
exports.__esModule = true;
exports.deleteReferences = exports.updateReferences = void 0;
var foundation_js_1 = require("../../foundation.js");
var referenceInfoTags = ['IED', 'Substation', 'VoltageLevel', 'Bay'];
/*
 * For every supported tag a list of information about which elements to search for and which attribute value
 * to replace with the new value typed in the screen by the user. This is used to update references to a name
 * of an element by other elements.
 * If the attributeName is null the text content of the found element will be replaced.
 */
var referenceInfos = {
    IED: [
        {
            attributeName: 'iedName',
            filter: simpleAttributeFilter("Association")
        },
        {
            attributeName: 'iedName',
            filter: simpleAttributeFilter("ClientLN")
        },
        {
            attributeName: 'iedName',
            filter: simpleAttributeFilter("ConnectedAP")
        },
        {
            attributeName: 'iedName',
            filter: simpleAttributeFilter("ExtRef")
        },
        {
            attributeName: 'iedName',
            filter: simpleAttributeFilter("KDC")
        },
        {
            attributeName: 'iedName',
            filter: simpleAttributeFilter("LNode")
        },
        {
            attributeName: null,
            filter: simpleTextContentFilter("GSEControl > IEDName")
        },
        {
            attributeName: null,
            filter: simpleTextContentFilter("SampledValueControl > IEDName")
        },
        {
            attributeName: null,
            filter: simpleTextContentFilter("LN > DOI > DAI > Val")
        },
    ],
    Substation: [
        {
            attributeName: 'substationName',
            filter: simpleAttributeFilter("Terminal")
        },
    ],
    VoltageLevel: [
        {
            attributeName: 'voltageLevelName',
            filter: attributeFilterWithParentNameAttribute("Terminal", {
                Substation: 'substationName'
            })
        },
    ],
    Bay: [
        {
            attributeName: 'bayName',
            filter: attributeFilterWithParentNameAttribute("Terminal", {
                Substation: 'substationName',
                VoltageLevel: 'voltageLevelName'
            })
        },
    ]
};
/**
 * Simple function to create a filter to find Elements where the value of an attribute equals the old name.
 *
 * @param tagName - The tagName of the elements to search for.
 */
function simpleAttributeFilter(tagName) {
    return function filter(element, attributeName, oldName) {
        return tagName + "[" + attributeName + "=\"" + oldName + "\"]";
    };
}
/**
 * Simple function to search for Elements for which the text content may contain the old name.
 * Because the text content of an element can't be search for in a CSS Selector this is done afterwards.
 *
 * @param elementQuery - The CSS Query to search for the Elements.
 */
function simpleTextContentFilter(elementQuery) {
    return function filter() {
        return "" + elementQuery;
    };
}
/**
 * More complex function to search for elements for which the value of an attribute needs to be updated.
 * To find the correct element the name of a parent element also needs to be included in the search.
 *
 * For instance when the name of a Bay is updated only the terminals need to be updated where of course
 * the old name of the bay is the value of the attribute 'bayName', but also the voltage level and substation
 * name need to be included, because the name of the bay is only unique within the voltage level.
 * The query will then become
 * `Terminal[substationName="<substationName>"][voltageLevelName="<voltageLevelName>"][bayName="<oldName>"]`
 *
 * @param tagName    - The tagName of the elements to search for.
 * @param parentInfo - The records of parent to search for, the key is the tagName of the parent, the value
 *                     is the name of the attribuet to use in the query.
 */
function attributeFilterWithParentNameAttribute(tagName, parentInfo) {
    return function filter(element, attributeName, oldName) {
        return "" + tagName + Object.entries(parentInfo)
            .map(function (_a) {
            var parentTag = _a[0], parentAttribute = _a[1];
            var parentElement = element.closest(parentTag);
            if (parentElement && parentElement.hasAttribute('name')) {
                var name = parentElement.getAttribute('name');
                return "[" + parentAttribute + "=\"" + name + "\"]";
            }
            return null;
        })
            .join('') // Join the strings to 1 string without a separator.
         + "[" + attributeName + "=\"" + oldName + "\"]";
    };
}
/**
 * Clone an element with the attribute name passed and process the new value. If the new value
 * is null the attribute will be removed otherwise the value of the attribute is updated.
 *
 * @param element       - The element to clone.
 * @param attributeName - The name of the attribute to copy.
 * @param value         - The value to set on the cloned element or if null remove the attribute.
 * @returns Returns the cloned element.
 */
function cloneElement(element, attributeName, value) {
    var newElement = element.cloneNode(false);
    newElement.setAttribute(attributeName, value);
    return newElement;
}
/**
 * Clone an element and set the value as text content on the cloned element.
 *
 * @param element - The element to clone.
 * @param value   - The value to set.
 * @returns Returns the cloned element.
 */
function cloneElementAndTextContent(element, value) {
    var newElement = element.cloneNode(false);
    newElement.textContent = value;
    return newElement;
}
/**
 * Function to create Replace actions to update reference which point to the name of the element being updated.
 * For instance the IED Name is used in other SCL Elements as attribute 'iedName' to reference the IED.
 * These attribute values need to be updated if the name of the IED changes.
 *
 * An empty array will be returned if the old and new value are the same or no references need to be updated.
 *
 * @param element - The element for which the name is updated.
 * @param oldName - The old name of the element.
 * @param newName - The new name of the element.
 * @returns Returns a list of Replace Actions that can be added to a Complex Action or returned directly for execution.
 */
function updateReferences(element, oldName, newName) {
    if (oldName === null || oldName === newName) {
        return [];
    }
    var referenceInfo = referenceInfos[element.tagName];
    if (referenceInfo === undefined) {
        return [];
    }
    var actions = [];
    referenceInfo.forEach(function (info) {
        // Depending on if an attribute value needs to be updated or the text content of an element
        // different scenarios need to be executed.
        var filter = info.filter(element, info.attributeName, oldName);
        if (info.attributeName) {
            Array.from(element.ownerDocument.querySelectorAll("" + filter))
                .filter(foundation_js_1.isPublic)
                .forEach(function (element) {
                var newElement = cloneElement(element, info.attributeName, newName);
                actions.push({ old: { element: element }, "new": { element: newElement } });
            });
        }
        else {
            // If the text content needs to be updated, filter on the text content can't be done in a CSS Selector.
            // So we query all elements the may need to be updated and filter them afterwards.
            Array.from(element.ownerDocument.querySelectorAll("" + filter))
                .filter(function (element) { return element.textContent === oldName; })
                .filter(foundation_js_1.isPublic)
                .forEach(function (element) {
                var newElement = cloneElementAndTextContent(element, newName);
                actions.push({ old: { element: element }, "new": { element: newElement } });
            });
        }
    });
    if (element.tagName === 'IED')
        actions.push.apply(actions, updateVals(element, oldName, newName));
    return actions;
}
exports.updateReferences = updateReferences;
/**
 * Adds Replace actions to update supervision references.
 * Only a maximum of one Val element per IED with ExtRef elements that contain src attributes will be altered.
 * The Val element that needs to be altered will be found by checking if the controlBlockReference complies with this element.
 * The controlBlockReference needs to contain the IED that gets renamed.
 *
 * @param element - The element for which the name is updated.
 * @param oldName - The old name of the element.
 * @param newName - The new name of the element.
 */
function updateVals(element, oldName, newName) {
    var actions = [];
    var ieds = element.ownerDocument.querySelectorAll('IED');
    ieds.forEach(function (ied) {
        // All Val elements inside LGOS and LSVS lnClasses that starts with the IED name that needs to be changed will be gathered.
        // Because of a very rare case where multiple IED start with the same name, all will be gathered.
        // If none are found continue to the next IED.
        var valValues = Array.from(ied.querySelectorAll(":scope > AccessPoint > Server > LDevice > LN[lnClass=\"LGOS\"] > DOI > DAI > Val, :scope > AccessPoint > Server > LDevice > LN[lnClass=\"LSVS\"] > DOI > DAI > Val"));
        if (valValues.length === 0)
            return;
        // If atleast one extRef element contains the to-be-changed IED name and has a srcCBName, one will be gathered.
        // From that extRef element a controlblockreferences will be created and compared to the Val elements.
        // If a match is found, the name of that Val element will be changed accordingly and the loop will be broken, as only 1 Val element need to be changed.
        var ref = ied.querySelector(":scope > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName=\"" + oldName + "\"][srcCBName]");
        var suffixCBReference = (ref === null || ref === void 0 ? void 0 : ref.getAttribute('srcLDInst')) +
            '/' + (ref === null || ref === void 0 ? void 0 : ref.getAttribute('srcLNClass')) +
            '.' + (ref === null || ref === void 0 ? void 0 : ref.getAttribute('srcCBName'));
        for (var _i = 0, valValues_1 = valValues; _i < valValues_1.length; _i++) {
            var value = valValues_1[_i];
            if (oldName + suffixCBReference === value.textContent.trim()) {
                var newElement = cloneElementAndTextContent(value, newName + suffixCBReference);
                actions.push({
                    old: { element: value },
                    "new": { element: newElement }
                });
                break;
            }
        }
    });
    return actions;
}
/**
 * Function to create Delete actions to remove reference which point to the name of the element being removed.
 * For instance the IED Name is used in other SCL Elements as attribute 'iedName' to reference the IED.
 * These elements need to be removed if the IED is removed.
 *
 * @param element - The element that will be removed and it's name is used to search for references.
 * @returns Returns a list of Delete Actions that can be added to a Complex Action or returned directly for execution.
 */
function deleteReferences(element) {
    var _a;
    var name = (_a = foundation_js_1.getNameAttribute(element)) !== null && _a !== void 0 ? _a : null;
    if (name === null) {
        return [];
    }
    var referenceInfo = referenceInfos[element.tagName];
    if (referenceInfo === undefined) {
        return [];
    }
    var actions = [];
    referenceInfo.forEach(function (info) {
        // Depending on if an attribute value is used for filtering or the text content of an element
        // different scenarios need to be executed.
        var filter = info.filter(element, info.attributeName, name);
        if (info.attributeName) {
            Array.from(element.ownerDocument.querySelectorAll("" + filter))
                .filter(foundation_js_1.isPublic)
                .forEach(function (element) {
                actions.push({ old: { parent: element.parentElement, element: element } });
            });
        }
        else {
            // If the text content needs to be used for filtering, filter on the text content can't be done in a CSS Selector.
            // So we query all elements the may need to be deleted and filter them afterwards.
            Array.from(element.ownerDocument.querySelectorAll("" + filter))
                .filter(function (element) { return element.textContent === name; })
                .filter(foundation_js_1.isPublic)
                .forEach(function (element) {
                // We not only need to remove the element containing the text content, but the parent of this element.
                if (element.parentElement) {
                    actions.push({
                        old: {
                            parent: element.parentElement.parentElement,
                            element: element.parentElement
                        }
                    });
                }
            });
        }
    });
    return actions;
}
exports.deleteReferences = deleteReferences;
