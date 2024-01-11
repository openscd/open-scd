"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.editDAIWizard = exports.createDAIWizard = exports.renderDAIWizard = exports.createValue = exports.updateValue = void 0;
var lit_element_1 = require("lit-element");
var lit_html_1 = require("lit-html");
var lit_translate_1 = require("lit-translate");
var dai_field_type_js_1 = require("./foundation/dai-field-type.js");
require("../../src/wizard-textfield.js");
var schemas_js_1 = require("../schemas.js");
function updateValue(element, val) {
    return function (inputs) {
        var _a, _b;
        var bType = element.getAttribute('bType');
        var newValue = dai_field_type_js_1.getCustomField()[bType].value(inputs);
        var daiName = (_b = (_a = val.parentElement) === null || _a === void 0 ? void 0 : _a.getAttribute('name')) !== null && _b !== void 0 ? _b : '';
        var complexAction = {
            actions: [],
            title: lit_translate_1.get('dai.action.updatedai', { daiName: daiName })
        };
        var newVal = val.cloneNode(false);
        newVal.textContent = newValue;
        complexAction.actions.push({
            old: { element: val },
            "new": { element: newVal }
        });
        return [complexAction];
    };
}
exports.updateValue = updateValue;
function createValue(parent, element, newElement, instanceElement, numberOfmultipleSettings) {
    return function (inputs) {
        var bType = element.getAttribute('bType');
        if (numberOfmultipleSettings) {
            //Should we remove all Val elements before adding new ones?
            Array.from(instanceElement.querySelectorAll('Val')).forEach(function (item) {
                return item.remove();
            });
            // Adds a new Val element for each sGroup value from the wizard
            __spreadArrays(Array(numberOfmultipleSettings)).forEach(function (item, i) {
                var newValue = dai_field_type_js_1.getCustomField()[bType].value(inputs, i + 1);
                var valElement = parent.ownerDocument.createElementNS(schemas_js_1.SCL_NAMESPACE, 'Val');
                valElement.textContent = newValue;
                valElement.setAttribute('sGroup', "" + (i + 1));
                instanceElement.append(valElement);
            });
        }
        else {
            var newValue = dai_field_type_js_1.getCustomField()[bType].value(inputs);
            var valElement = instanceElement.querySelector('Val');
            if (!valElement) {
                valElement = parent.ownerDocument.createElementNS(schemas_js_1.SCL_NAMESPACE, 'Val');
                instanceElement.append(valElement);
            }
            valElement.textContent = newValue;
        }
        var name = instanceElement.getAttribute('name');
        var complexAction = {
            actions: [{ "new": { parent: parent, element: newElement } }],
            title: lit_translate_1.get('dai.action.createdai', { daiName: name })
        };
        return [complexAction];
    };
}
exports.createValue = createValue;
function renderDAIWizard(element, instanceElement, numberOfmultipleSettings) {
    var _a, _b, _c;
    if (numberOfmultipleSettings === void 0) { numberOfmultipleSettings = null; }
    var bType = element.getAttribute('bType');
    var daValue = (_c = (_b = (_a = element.querySelector('Val')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) !== null && _c !== void 0 ? _c : '';
    return [
        lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject([" ", "\n    ", ""], [" ",
            "\n    ",
            ""])), dai_field_type_js_1.getCustomField()[bType].render(element, instanceElement, numberOfmultipleSettings), daValue
            ? lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<wizard-textfield\n          id=\"daVal\"\n          label=\"DA Template Value\"\n          .maybeValue=", "\n          readonly\n          disabled\n        >\n        </wizard-textfield>"], ["<wizard-textfield\n          id=\"daVal\"\n          label=\"DA Template Value\"\n          .maybeValue=", "\n          readonly\n          disabled\n        >\n        </wizard-textfield>"])), daValue) : lit_html_1.nothing),
    ];
}
exports.renderDAIWizard = renderDAIWizard;
/**
 * Checks if the DAI corresponds to a multiple setting group
 *
 * @param parent - The parent element of the DAI
 * @param element - The BDA/DA element
 * @returns The number of setting groups if the DAI is a multiple setting group, null otherwise
 */
function checkForMultipleSettings(parent, element) {
    var _a, _b;
    // Look for the DA element to validate that the DAI has the functional constraint SG or SE
    var da = element;
    if (element.tagName === 'BDA')
        da = element.getRootNode().querySelector("DOType>DA[type=\"" + element.parentElement.id + "\"]");
    var fc = (_a = da.getAttribute('fc')) !== null && _a !== void 0 ? _a : '';
    // Check if the closest IED to the parent element has a SettingControl element with a numOfSGs attribute
    var ied = parent.closest('IED');
    var settingControl = ied === null || ied === void 0 ? void 0 : ied.querySelector('SettingControl');
    var numOfSGsAttribute = (_b = settingControl === null || settingControl === void 0 ? void 0 : settingControl.getAttribute('numOfSGs')) !== null && _b !== void 0 ? _b : '';
    var numberOfmultipleSettings = parseInt(numOfSGsAttribute);
    // If the DA has the functional constraint SG or SE and the IED has a SettingControl element with a numOfSGs attribute, then the DAI is a multiple setting group
    return (fc === 'SG' || fc === 'SE') &&
        numOfSGsAttribute !== '' &&
        !isNaN(numberOfmultipleSettings)
        ? numberOfmultipleSettings
        : undefined;
}
function createDAIWizard(parent, newElement, element) {
    var _a;
    // Retrieve the created DAI, can be the new element or one of the child elements below.
    var numberOfmultipleSettings = checkForMultipleSettings(parent, element);
    var instanceElement = newElement.tagName === 'DAI'
        ? newElement
        : newElement.querySelector('DAI');
    return [
        {
            title: lit_translate_1.get('dai.wizard.title.create', {
                daiName: (_a = instanceElement === null || instanceElement === void 0 ? void 0 : instanceElement.getAttribute('name')) !== null && _a !== void 0 ? _a : ''
            }),
            element: instanceElement,
            primary: {
                icon: 'edit',
                label: lit_translate_1.get('save'),
                action: createValue(parent, element, newElement, instanceElement, numberOfmultipleSettings)
            },
            content: renderDAIWizard(element, instanceElement, numberOfmultipleSettings)
        },
    ];
}
exports.createDAIWizard = createDAIWizard;
function editDAIWizard(element, instanceElement) {
    var _a, _b, _c;
    var daiName = (instanceElement === null || instanceElement === void 0 ? void 0 : instanceElement.tagName) === 'DAI'
        ? (_a = instanceElement === null || instanceElement === void 0 ? void 0 : instanceElement.getAttribute('name')) !== null && _a !== void 0 ? _a : '' : (_c = (_b = instanceElement === null || instanceElement === void 0 ? void 0 : instanceElement.parentElement) === null || _b === void 0 ? void 0 : _b.getAttribute('name')) !== null && _c !== void 0 ? _c : '';
    return [
        {
            title: lit_translate_1.get('dai.wizard.title.edit', {
                daiName: daiName
            }),
            element: instanceElement,
            primary: {
                icon: 'edit',
                label: lit_translate_1.get('save'),
                action: updateValue(element, instanceElement)
            },
            content: renderDAIWizard(element, instanceElement)
        },
    ];
}
exports.editDAIWizard = editDAIWizard;
var templateObject_1, templateObject_2;
