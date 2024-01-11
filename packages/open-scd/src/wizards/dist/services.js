"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.editServicesWizard = exports.createFormDivider = exports.createFormElementsFromInputs = exports.createFormElementFromInput = exports.isEmptyObject = void 0;
var lit_html_1 = require("lit-html");
require("../wizard-textfield.js");
require("../wizard-select.js");
var service_log_settingsgroup_js_1 = require("./service-log-settingsgroup.js");
var service_report_configurations_js_1 = require("./service-report-configurations.js");
var service_GSEControl_js_1 = require("./service-GSEControl.js");
var service_networking_js_1 = require("./service-networking.js");
var service_sampled_values_js_1 = require("./service-sampled-values.js");
var service_clientServer_configurations_js_1 = require("./service-clientServer-configurations.js");
function isEmptyObject(target, dealedAsEmpty) {
    if (dealedAsEmpty === void 0) { dealedAsEmpty = [null, undefined, '']; }
    return (target === null
        ? [false]
        : Object.keys(target).flatMap(function (key) {
            var value = target[key];
            if (typeof value === 'object') {
                return isEmptyObject(value);
            }
            else {
                return [dealedAsEmpty.includes(value)];
            }
        })).includes(true);
}
exports.isEmptyObject = isEmptyObject;
function createFormElementFromInput(input) {
    var templateResult = lit_html_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
    switch (input.kind) {
        case 'TextField':
        default:
            templateResult = lit_html_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<wizard-textfield\n        label=", "\n        .maybeValue=", "\n        .helper=", "\n        ?required=", "\n        .validationMessage=", "\n        .pattern=", "\n        .defaultValue=", "\n        ?dialogInitialFocus=", "\n        ?nullable=", "\n        disabled\n      ></wizard-textfield>"], ["<wizard-textfield\n        label=", "\n        .maybeValue=", "\n        .helper=", "\n        ?required=", "\n        .validationMessage=", "\n        .pattern=", "\n        .defaultValue=", "\n        ?dialogInitialFocus=", "\n        ?nullable=", "\n        disabled\n      ></wizard-textfield>"])), input.label, input.maybeValue, input.helper || '', input.required, input.validationMessage || '', input.pattern || '', input["default"] || '', input.dialogInitialFocus, input.nullable);
            break;
        case 'Checkbox':
            templateResult = lit_html_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<wizard-checkbox\n        label=", "\n        .maybeValue=", "\n        .helper=", "\n        ?defaultValue=", "\n        ?dialogInitialFocus=", "\n        ?nullable=", "\n        disabled\n      ></wizard-checkbox>"], ["<wizard-checkbox\n        label=", "\n        .maybeValue=", "\n        .helper=", "\n        ?defaultValue=", "\n        ?dialogInitialFocus=", "\n        ?nullable=", "\n        disabled\n      ></wizard-checkbox>"])), input.label, input.maybeValue, input.helper || '', input["default"], input.dialogInitialFocus, input.nullable);
            break;
        case 'Select':
            templateResult = lit_html_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<wizard-select\n        label=", "\n        .maybeValue=", "\n        .validationMessage=", "\n        .defaultValue=", "\n        ?dialogInitialFocus=", "\n        ?nullable=", "\n        disabled\n      >\n        ", "\n      </wizard-select>"], ["<wizard-select\n        label=", "\n        .maybeValue=", "\n        .validationMessage=", "\n        .defaultValue=", "\n        ?dialogInitialFocus=", "\n        ?nullable=", "\n        disabled\n      >\n        ",
                "\n      </wizard-select>"])), input.label, input.maybeValue, input.valadationMessage || '', input["default"] || '', input.dialogInitialFocus, input.nullable, input.values.map(function (value) {
                return lit_html_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<mwc-list-item .value=", ">\n            ", "\n          </mwc-list-item>"], ["<mwc-list-item .value=", ">\n            ", "\n          </mwc-list-item>"])), value, value);
            }));
            break;
    }
    return templateResult;
}
exports.createFormElementFromInput = createFormElementFromInput;
function createFormElementsFromInputs(inputs) {
    return inputs.map(function (input) { return createFormElementFromInput(input); });
}
exports.createFormElementsFromInputs = createFormElementsFromInputs;
function createFormDivider(header) {
    return lit_html_1.html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["<wizard-divider .header=", "></wizard-divider>"], ["<wizard-divider .header=", "></wizard-divider>"])), header);
}
exports.createFormDivider = createFormDivider;
function editServicesWizard(services) {
    return [
        service_log_settingsgroup_js_1.createLogSettingsGroupServicesWizardPage(services),
        service_report_configurations_js_1.createReportConfigurationsWizardPage(services),
        service_GSEControl_js_1.createGSEControlWizardPage(services),
        service_networking_js_1.createNetworkingWizardPage(services),
        service_sampled_values_js_1.createSampledValuesWizardPage(services),
        service_clientServer_configurations_js_1.createClientServerConfigurationsWizardPage(services),
    ]
        .filter(function (page) { return page !== null; })
        .map(function (page) { return page; });
}
exports.editServicesWizard = editServicesWizard;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6;
