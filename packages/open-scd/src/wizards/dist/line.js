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
exports.editLineWizard = exports.createLineWizard = void 0;
var lit_html_1 = require("lit-html");
var lit_translate_1 = require("lit-translate");
require("../wizard-textfield.js");
var foundation_js_1 = require("../foundation.js");
function render(name, desc, type, nomFreq, numPhases) {
    return [
        lit_html_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<wizard-textfield\n      label=\"name\"\n      .maybeValue=", "\n      helper=\"", "\"\n      required\n      validationMessage=\"", "\"\n      dialogInitialFocus\n    ></wizard-textfield>"], ["<wizard-textfield\n      label=\"name\"\n      .maybeValue=", "\n      helper=\"", "\"\n      required\n      validationMessage=\"", "\"\n      dialogInitialFocus\n    ></wizard-textfield>"])), name, lit_translate_1.translate('line.wizard.nameHelper'), lit_translate_1.translate('textfield.required')),
        lit_html_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<wizard-textfield\n      label=\"desc\"\n      .maybeValue=", "\n      nullable\n      helper=\"", "\"\n    ></wizard-textfield>"], ["<wizard-textfield\n      label=\"desc\"\n      .maybeValue=", "\n      nullable\n      helper=\"", "\"\n    ></wizard-textfield>"])), desc, lit_translate_1.translate('line.wizard.descHelper')),
        lit_html_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<wizard-textfield\n      label=\"type\"\n      .maybeValue=", "\n      nullable\n      helper=\"", "\"\n    ></wizard-textfield>"], ["<wizard-textfield\n      label=\"type\"\n      .maybeValue=", "\n      nullable\n      helper=\"", "\"\n    ></wizard-textfield>"])), type, lit_translate_1.translate('line.wizard.typeHelper')),
        lit_html_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<wizard-textfield\n      label=\"nomFreq\"\n      .maybeValue=", "\n      nullable\n      helper=\"", "\"\n      suffix=\"Hz\"\n      validationMessage=\"", "\"\n      pattern=\"", "\"\n    ></wizard-textfield>"], ["<wizard-textfield\n      label=\"nomFreq\"\n      .maybeValue=", "\n      nullable\n      helper=\"", "\"\n      suffix=\"Hz\"\n      validationMessage=\"", "\"\n      pattern=\"", "\"\n    ></wizard-textfield>"])), nomFreq, lit_translate_1.translate('voltagelevel.wizard.nomFreqHelper'), lit_translate_1.translate('textfield.nonempty'), foundation_js_1.patterns.unsigned),
        lit_html_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<wizard-textfield\n      label=\"numPhases\"\n      .maybeValue=", "\n      nullable\n      helper=\"", "\"\n      suffix=\"#\"\n      validationMessage=\"", "\"\n      type=\"number\"\n      min=\"1\"\n      max=\"255\"\n    ></wizard-textfield>"], ["<wizard-textfield\n      label=\"numPhases\"\n      .maybeValue=", "\n      nullable\n      helper=\"", "\"\n      suffix=\"#\"\n      validationMessage=\"", "\"\n      type=\"number\"\n      min=\"1\"\n      max=\"255\"\n    ></wizard-textfield>"])), numPhases, lit_translate_1.translate('voltagelevel.wizard.numPhaseHelper'), lit_translate_1.translate('textfield.nonempty')),
    ];
}
function createLineAction(parent) {
    return function (inputs) {
        var lineAttrs = {};
        var lineKeys = ['name', 'desc', 'type', 'nomFreq', 'numPhases'];
        lineKeys.forEach(function (key) {
            lineAttrs[key] = foundation_js_1.getValue(inputs.find(function (i) { return i.label === key; }));
        });
        var line = foundation_js_1.createElement(parent.ownerDocument, 'Line', lineAttrs);
        return [{ "new": { parent: parent, element: line } }];
    };
}
function updateAction(element) {
    return function (inputs) {
        var lineAttrs = {};
        var lineKeys = ['name', 'desc', 'type', 'nomFreq', 'numPhases'];
        lineKeys.forEach(function (key) {
            lineAttrs[key] = foundation_js_1.getValue(inputs.find(function (i) { return i.label === key; }));
        });
        if (lineKeys.some(function (key) { return lineAttrs[key] !== element.getAttribute(key); })) {
            var newElement = foundation_js_1.cloneElement(element, lineAttrs);
            return [
                {
                    old: { element: element },
                    "new": { element: newElement }
                },
            ];
        }
        return [];
    };
}
function createLineWizard(parent) {
    var name = '';
    var desc = '';
    var type = '';
    var nomFreq = '';
    var numPhases = '';
    return [
        {
            title: lit_translate_1.get('wizard.title.add', { tagName: 'Line' }),
            primary: {
                icon: 'save',
                label: lit_translate_1.get('save'),
                action: createLineAction(parent)
            },
            content: __spreadArrays(render(name, desc, type, nomFreq, numPhases))
        },
    ];
}
exports.createLineWizard = createLineWizard;
function editLineWizard(element) {
    var _a;
    return [
        {
            title: lit_translate_1.get('line.wizard.title.edit'),
            element: element,
            primary: {
                icon: 'edit',
                label: lit_translate_1.get('save'),
                action: updateAction(element)
            },
            content: render((_a = element.getAttribute('name')) !== null && _a !== void 0 ? _a : '', element.getAttribute('desc'), element.getAttribute('type'), element.getAttribute('nomFreq'), element.getAttribute('numPhases'))
        },
    ];
}
exports.editLineWizard = editLineWizard;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
