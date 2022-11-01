"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.renderDiff = exports.diffSclChilds = exports.isSame = exports.identityForCompare = exports.diffSclAttributes = void 0;
var lit_element_1 = require("lit-element");
var repeat_1 = require("lit-html/directives/repeat");
var lit_translate_1 = require("lit-translate");
require("@material/mwc-list");
require("@material/mwc-list/mwc-list-item");
require("@material/mwc-icon");
var foundation_js_1 = require("../foundation.js");
var compare_js_1 = require("../icons/compare.js");
var diffTypeToIcon = new Map();
diffTypeToIcon.set('Attribute', compare_js_1.attributeIcon);
diffTypeToIcon.set('Content', compare_js_1.contentIcon);
diffTypeToIcon.set('Element', compare_js_1.elementIcon);
function getDiffFilterSelector(elementToBeCompared, rootElementToBeCompared, filters) {
    var querySelector = rootElementToBeCompared === elementToBeCompared
        ? ':scope'
        : Object.keys(filters).find(function (selector) {
            return Array.from(rootElementToBeCompared.querySelectorAll(selector)).includes(elementToBeCompared);
        });
    return querySelector ? filters[querySelector] : undefined;
}
function shouldFilterElement(element, filter) {
    if (!filter || !filter.full) {
        return false;
    }
    var consumer = filter.full;
    return typeof consumer === 'boolean' ? consumer : consumer(element);
}
function shouldFilterAttribute(element, attribute, filter) {
    if (!filter || !filter.attributes || !filter.attributes[attribute]) {
        return false;
    }
    var consumer = filter.attributes[attribute];
    return typeof consumer === 'boolean' ? consumer : consumer(element);
}
/**
 * Returns the description of the Element that differs.
 *
 * @param element - The Element to retrieve the identifier from.
 */
function describe(element) {
    var id = foundation_js_1.identity(element);
    return typeof id === 'string' ? id : lit_translate_1.get('unidentifiable');
}
/**
 * Check if there are any attribute values changed between the two elements.
 *
 * @param elementToBeCompared     - The element to check for differences.
 * @param elementToCompareAgainst - The element used to check against.
 */
function diffSclAttributes(elementToBeCompared, elementToCompareAgainst, filterToIgnore, searchElementToBeCompared) {
    var _a, _b, _c, _d;
    var attrDiffs = [];
    // First check if there is any text inside the element and there should be no child elements.
    var newText = (_b = (_a = elementToBeCompared.textContent) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : '';
    var oldText = (_d = (_c = elementToCompareAgainst.textContent) === null || _c === void 0 ? void 0 : _c.trim()) !== null && _d !== void 0 ? _d : '';
    if (elementToBeCompared.childElementCount === 0 &&
        elementToCompareAgainst.childElementCount === 0 &&
        newText !== oldText) {
        var shouldFilter = shouldFilterElement(elementToBeCompared, getDiffFilterSelector(elementToBeCompared, searchElementToBeCompared, filterToIgnore));
        if (!shouldFilter) {
            attrDiffs.push([
                'value',
                { type: 'Content', newValue: newText, oldValue: oldText },
            ]);
        }
    }
    // Next check if there are any difference between attributes.
    var attributeNames = new Set(elementToCompareAgainst
        .getAttributeNames()
        .concat(elementToBeCompared.getAttributeNames()));
    for (var _i = 0, attributeNames_1 = attributeNames; _i < attributeNames_1.length; _i++) {
        var name = attributeNames_1[_i];
        var shouldFilter = shouldFilterAttribute(elementToBeCompared, name, getDiffFilterSelector(elementToBeCompared, searchElementToBeCompared, filterToIgnore));
        if (!shouldFilter &&
            elementToCompareAgainst.getAttribute(name) !==
                elementToBeCompared.getAttribute(name)) {
            attrDiffs.push([
                name,
                {
                    type: 'Attribute',
                    newValue: elementToBeCompared.getAttribute(name),
                    oldValue: elementToCompareAgainst.getAttribute(name)
                },
            ]);
        }
    }
    return attrDiffs;
}
exports.diffSclAttributes = diffSclAttributes;
/**
 * Function to retrieve the identity to compare 2 children on the same level.
 * This means we only need to last part of the Identity string to compare the children.
 *
 * @param element - The element to retrieve the identity from.
 */
function identityForCompare(element) {
    var _a;
    var identityOfElement = foundation_js_1.identity(element);
    if (typeof identityOfElement === 'string') {
        identityOfElement = (_a = identityOfElement.split('>').pop()) !== null && _a !== void 0 ? _a : '';
    }
    return identityOfElement;
}
exports.identityForCompare = identityForCompare;
/**
 * Custom method for comparing to check if 2 elements are the same. Because they are on the same level
 * we don't need to compare the full identity, we just compare the part of the Element itself.
 *
 * <b>Remark</b>Private elements are already filtered out, so we don't need to bother them.
 *
 * @param newValue - The new element to compare with the old element.
 * @param oldValue - The old element to which the new element is compared.
 */
function isSame(newValue, oldValue) {
    return (newValue.tagName === oldValue.tagName &&
        identityForCompare(newValue) === identityForCompare(oldValue));
}
exports.isSame = isSame;
/**
 * List of all differences between children elements that both old and new element have.
 * The list contains children both elements have and children that were added or removed
 * from the new element.
 * <b>Remark</b>: Private elements are ignored.
 *
 * @param elementToBeCompared     - The element to check for differences.
 * @param elementToCompareAgainst - The element used to check against.
 */
function diffSclChilds(elementToBeCompared, elementToCompareAgainst, filterToIgnore, searchElementToBeCompared, searchElementToCompareAgainst) {
    var childDiffs = [];
    var childrenToBeCompared = Array.from(elementToBeCompared.children);
    var childrenToCompareTo = Array.from(elementToCompareAgainst.children);
    childrenToBeCompared.forEach(function (newElement) {
        if (!newElement.closest('Private')) {
            var shouldFilter = shouldFilterElement(newElement, getDiffFilterSelector(newElement, searchElementToBeCompared, filterToIgnore));
            if (!shouldFilter) {
                var twinIndex = childrenToCompareTo.findIndex(function (ourChild) {
                    return isSame(newElement, ourChild);
                });
                var oldElement = twinIndex > -1 ? childrenToCompareTo[twinIndex] : null;
                if (oldElement) {
                    childrenToCompareTo.splice(twinIndex, 1);
                    childDiffs.push({
                        type: 'Element',
                        newValue: newElement,
                        oldValue: oldElement
                    });
                }
                else {
                    childDiffs.push({
                        type: 'Element',
                        newValue: newElement,
                        oldValue: null
                    });
                }
            }
        }
    });
    childrenToCompareTo.forEach(function (oldElement) {
        if (!oldElement.closest('Private')) {
            var shouldFilter = shouldFilterElement(oldElement, getDiffFilterSelector(oldElement, searchElementToCompareAgainst, filterToIgnore));
            if (!shouldFilter) {
                childDiffs.push({
                    type: 'Element',
                    newValue: null,
                    oldValue: oldElement
                });
            }
        }
    });
    return childDiffs;
}
exports.diffSclChilds = diffSclChilds;
/**
 * Generate HTML (TemplateResult) containing all the differences between the two elements passed.
 * If null is returned there are no differences between the two elements.
 *
 * @param elementToBeCompared     - The element to check for differences.
 * @param elementToCompareAgainst - The element used to check against.
 */
function renderDiff(elementToBeCompared, elementToCompareAgainst, filterToIgnore) {
    if (filterToIgnore === void 0) { filterToIgnore = {}; }
    return renderDiffInternal(elementToBeCompared, elementToCompareAgainst, filterToIgnore, elementToBeCompared, elementToCompareAgainst);
}
exports.renderDiff = renderDiff;
function renderDiffInternal(elementToBeCompared, elementToCompareAgainst, filterToIgnore, searchElementToBeCompared, searchElementToCompareAgainst) {
    if (filterToIgnore === void 0) { filterToIgnore = {}; }
    // Determine the ID from the current tag. These can be numbers or strings.
    var idTitle = foundation_js_1.identity(elementToBeCompared).toString();
    if (idTitle === 'NaN') {
        idTitle = undefined;
    }
    // Set the root elements if they are not defined yet
    searchElementToBeCompared = searchElementToBeCompared || elementToBeCompared;
    searchElementToCompareAgainst =
        searchElementToCompareAgainst || elementToCompareAgainst;
    var attrDiffs = diffSclAttributes(elementToBeCompared, elementToCompareAgainst, filterToIgnore, searchElementToBeCompared);
    // Next check which elements are added, deleted or in both elements.
    var childDiffs = diffSclChilds(elementToBeCompared, elementToCompareAgainst, filterToIgnore, searchElementToBeCompared, searchElementToCompareAgainst);
    var childAddedOrDeleted = [];
    var childToCompare = [];
    childDiffs.forEach(function (diff) {
        if (!diff.oldValue || !diff.newValue) {
            childAddedOrDeleted.push(diff);
        }
        else {
            childToCompare.push(diff);
        }
    });
    // These children exist in both old and new element, let's check if there are any difference in the children.
    var childToCompareTemplates = childToCompare
        .map(function (diff) { return renderDiff(diff.newValue, diff.oldValue, filterToIgnore); })
        .filter(function (result) { return result !== null; });
    // If there are difference generate the HTML otherwise just return null.
    if (childToCompareTemplates.length > 0 ||
        attrDiffs.length > 0 ||
        childAddedOrDeleted.length > 0) {
        return lit_element_1.html(templateObject_10 || (templateObject_10 = __makeTemplateObject([" ", "\n    ", ""], [" ",
            "\n    ", ""])), attrDiffs.length > 0 || childAddedOrDeleted.length > 0
            ? lit_element_1.html(templateObject_9 || (templateObject_9 = __makeTemplateObject(["<div class=\"container container--alt\">\n          <div class=\"list__container list__container--left\">\n            <mwc-list multi right nonInteractive>\n              ", "\n              ", "\n            </mwc-list>\n          </div>\n          <div class=\"list__container\">\n            <mwc-list multi left nonInteractive>\n              ", "\n              ", "\n            </mwc-list>\n          </div>\n        </div>"], ["<div class=\"container container--alt\">\n          <div class=\"list__container list__container--left\">\n            <mwc-list multi right nonInteractive>\n              ",
                "\n              ",
                "\n            </mwc-list>\n          </div>\n          <div class=\"list__container\">\n            <mwc-list multi left nonInteractive>\n              ",
                "\n              ",
                "\n            </mwc-list>\n          </div>\n        </div>"])), repeat_1.repeat(attrDiffs, function (e) { return e; }, function (_a) {
                var name = _a[0], diff = _a[1];
                return lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<mwc-list-item right twoLine graphic=\"icon\">\n                    ", "\n                  </mwc-list-item>"], ["<mwc-list-item right twoLine graphic=\"icon\">\n                    ",
                    "\n                  </mwc-list-item>"])), diff.oldValue !== null
                    ? lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n                          <span>\n                            ", ":\n                            ", "\n                          </span>\n                          <span slot=\"secondary\">", "</span>\n                          <mwc-icon slot=\"graphic\">\n                            ", "\n                          </mwc-icon>\n                        "], ["\n                          <span>\n                            ", ":\n                            ", "\n                          </span>\n                          <span slot=\"secondary\">", "</span>\n                          <mwc-icon slot=\"graphic\">\n                            ", "\n                          </mwc-icon>\n                        "])), name, diff.oldValue === '' ? '""' : diff.oldValue, idTitle, diffTypeToIcon.get(diff.type)) : '');
            }), repeat_1.repeat(childAddedOrDeleted, function (e) { return e; }, function (diff) {
                return lit_element_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject([" <mwc-list-item right twoLine graphic=\"icon\">\n                    ", "\n                  </mwc-list-item>"], [" <mwc-list-item right twoLine graphic=\"icon\">\n                    ",
                    "\n                  </mwc-list-item>"])), diff.oldValue
                    ? lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n                          <span>", "</span>\n                          <span slot=\"secondary\">\n                            ", "\n                          </span>\n                          <mwc-icon slot=\"graphic\">\n                            ", "\n                          </mwc-icon>\n                        "], ["\n                          <span>", "</span>\n                          <span slot=\"secondary\">\n                            ", "\n                          </span>\n                          <mwc-icon slot=\"graphic\">\n                            ", "\n                          </mwc-icon>\n                        "])), diff.oldValue.tagName, describe(diff.oldValue), diffTypeToIcon.get(diff.type)) : '');
            }), repeat_1.repeat(attrDiffs, function (e) { return e; }, function (_a) {
                var name = _a[0], diff = _a[1];
                return lit_element_1.html(templateObject_6 || (templateObject_6 = __makeTemplateObject([" <mwc-list-item left twoLine graphic=\"icon\">\n                    ", "\n                  </mwc-list-item>"], [" <mwc-list-item left twoLine graphic=\"icon\">\n                    ",
                    "\n                  </mwc-list-item>"])), diff.newValue !== null
                    ? lit_element_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n                          <span>\n                            ", ":\n                            ", "\n                          </span>\n                          <span slot=\"secondary\">", "</span>\n                          <mwc-icon slot=\"graphic\">\n                            ", "\n                          </mwc-icon>\n                        "], ["\n                          <span>\n                            ", ":\n                            ", "\n                          </span>\n                          <span slot=\"secondary\">", "</span>\n                          <mwc-icon slot=\"graphic\">\n                            ", "\n                          </mwc-icon>\n                        "])), name, diff.newValue === '' ? '""' : diff.newValue, idTitle, diffTypeToIcon.get(diff.type)) : '');
            }), repeat_1.repeat(childAddedOrDeleted, function (e) { return e; }, function (diff) {
                return lit_element_1.html(templateObject_8 || (templateObject_8 = __makeTemplateObject([" <mwc-list-item left twoLine graphic=\"icon\">\n                    ", "\n                  </mwc-list-item>"], [" <mwc-list-item left twoLine graphic=\"icon\">\n                    ",
                    "\n                  </mwc-list-item>"])), diff.newValue
                    ? lit_element_1.html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n                          <span>", "</span>\n                          <span slot=\"secondary\">\n                            ", "\n                          </span>\n                          <mwc-icon slot=\"graphic\">\n                            ", "\n                          </mwc-icon>\n                        "], ["\n                          <span>", "</span>\n                          <span slot=\"secondary\">\n                            ", "\n                          </span>\n                          <mwc-icon slot=\"graphic\">\n                            ", "\n                          </mwc-icon>\n                        "])), diff.newValue.tagName, describe(diff.newValue), diffTypeToIcon.get(diff.type)) : '');
            })) : '', childToCompareTemplates);
    }
    return null;
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
