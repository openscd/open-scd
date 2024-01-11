"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.eNumTypeEditWizard = exports.createEnumTypeWizard = void 0;
var lit_element_1 = require("lit-element");
var lit_translate_1 = require("lit-translate");
require("@material/mwc-button");
require("@material/mwc-list");
require("@material/mwc-list/mwc-list-item");
require("@material/mwc-select");
require("../../wizard-textfield.js");
var foundation_js_1 = require("../../foundation.js");
function remove(element) {
    return function (wizard) {
        wizard.dispatchEvent(foundation_js_1.newActionEvent({ old: { parent: element.parentElement, element: element } }));
        wizard.dispatchEvent(foundation_js_1.newWizardEvent());
    };
}
function nextOrd(parent) {
    var maxOrd = Math.max.apply(Math, Array.from(parent.children).map(function (child) { var _a; return parseInt((_a = child.getAttribute('ord')) !== null && _a !== void 0 ? _a : '-2', 10); }));
    return isFinite(maxOrd) ? (maxOrd + 1).toString(10) : '0';
}
function createEnumValAction(parent) {
    return function (inputs) {
        var value = foundation_js_1.getValue(inputs.find(function (i) { return i.label === 'value'; }));
        var desc = foundation_js_1.getValue(inputs.find(function (i) { return i.label === 'desc'; }));
        var ord = foundation_js_1.getValue(inputs.find(function (i) { return i.label === 'ord'; })) || nextOrd(parent);
        var element = foundation_js_1.createElement(parent.ownerDocument, 'EnumVal', {
            ord: ord,
            desc: desc
        });
        element.textContent = value;
        var action = {
            "new": {
                parent: parent,
                element: element
            }
        };
        return [action];
    };
}
function updateEnumValAction(element) {
    return function (inputs) {
        var _a;
        var value = (_a = foundation_js_1.getValue(inputs.find(function (i) { return i.label === 'value'; }))) !== null && _a !== void 0 ? _a : '';
        var desc = foundation_js_1.getValue(inputs.find(function (i) { return i.label === 'desc'; }));
        var ord = foundation_js_1.getValue(inputs.find(function (i) { return i.label === 'ord'; })) ||
            element.getAttribute('ord') ||
            nextOrd(element.parentElement);
        if (value === element.textContent &&
            desc === element.getAttribute('desc') &&
            ord === element.getAttribute('ord'))
            return [];
        var newElement = foundation_js_1.cloneElement(element, { desc: desc, ord: ord });
        newElement.textContent = value;
        return [{ old: { element: element }, "new": { element: newElement } }];
    };
}
function eNumValWizard(options) {
    var _a;
    var doc = options.doc
        ? options.doc
        : options.parent.ownerDocument;
    var enumval = foundation_js_1.find(doc, 'EnumVal', (_a = options.identity) !== null && _a !== void 0 ? _a : NaN);
    var _b = enumval
        ? [
            lit_translate_1.get('enum-val.wizard.title.edit'),
            updateEnumValAction(enumval),
            enumval.getAttribute('ord'),
            enumval.getAttribute('desc'),
            enumval.textContent,
            [
                {
                    icon: 'delete',
                    label: lit_translate_1.get('remove'),
                    action: remove(enumval)
                },
            ],
        ]
        : [
            lit_translate_1.get('enum-val.wizard.title.add'),
            createEnumValAction(options.parent),
            nextOrd(options.parent),
            null,
            '',
            undefined,
        ], title = _b[0], action = _b[1], ord = _b[2], desc = _b[3], value = _b[4], menuActions = _b[5];
    return [
        {
            title: title,
            element: enumval !== null && enumval !== void 0 ? enumval : undefined,
            primary: {
                icon: '',
                label: 'Save',
                action: action
            },
            menuActions: menuActions,
            content: [
                lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<wizard-textfield\n          label=\"ord\"\n          helper=\"", "\"\n          .maybeValue=", "\n          required\n          type=\"number\"\n        ></wizard-textfield>"], ["<wizard-textfield\n          label=\"ord\"\n          helper=\"", "\"\n          .maybeValue=", "\n          required\n          type=\"number\"\n        ></wizard-textfield>"])), lit_translate_1.translate('scl.ord'), ord),
                lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<wizard-textfield\n          label=\"value\"\n          helper=\"", "\"\n          .maybeValue=", "\n          pattern=\"", "\"\n          dialogInitialFocus\n        ></wizard-textfield>"], ["<wizard-textfield\n          label=\"value\"\n          helper=\"", "\"\n          .maybeValue=", "\n          pattern=\"", "\"\n          dialogInitialFocus\n        ></wizard-textfield>"])), lit_translate_1.translate('scl.value'), value, foundation_js_1.patterns.normalizedString),
                lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<wizard-textfield\n          id=\"evDesc\"\n          label=\"desc\"\n          helper=\"", "\"\n          .maybeValue=", "\n          nullable\n          pattern=\"", "\"\n        ></wizard-textfield>"], ["<wizard-textfield\n          id=\"evDesc\"\n          label=\"desc\"\n          helper=\"", "\"\n          .maybeValue=", "\n          nullable\n          pattern=\"", "\"\n        ></wizard-textfield>"])), lit_translate_1.translate('scl.desc'), desc, foundation_js_1.patterns.normalizedString),
            ]
        },
    ];
}
function createAction(parent, templates) {
    return function (inputs) {
        var id = foundation_js_1.getValue(inputs.find(function (i) { return i.label === 'id'; }));
        if (!id)
            return [];
        var desc = foundation_js_1.getValue(inputs.find(function (i) { return i.label === 'desc'; }));
        var values = inputs.find(function (i) { return i.label === 'values'; });
        var element = values.selected
            ? (templates
                .querySelector("EnumType[id=\"" + values.selected.value + "\"]")
                .cloneNode(true))
            : foundation_js_1.createElement(parent.ownerDocument, 'EnumType', {});
        element.setAttribute('id', id);
        if (desc)
            element.setAttribute('desc', desc);
        var action = {
            "new": {
                parent: parent,
                element: element
            }
        };
        return [action];
    };
}
function createEnumTypeWizard(parent, templates) {
    return [
        {
            title: lit_translate_1.get('enum.wizard.title.add'),
            primary: {
                icon: 'add',
                label: lit_translate_1.get('add'),
                action: createAction(parent, templates)
            },
            content: [
                lit_element_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<mwc-select\n          style=\"--mdc-menu-max-height: 196px;\"\n          outlined\n          icon=\"playlist_add_check\"\n          label=\"values\"\n          helper=\"Default enumerations\"\n        >\n          ", "\n        </mwc-select>"], ["<mwc-select\n          style=\"--mdc-menu-max-height: 196px;\"\n          outlined\n          icon=\"playlist_add_check\"\n          label=\"values\"\n          helper=\"Default enumerations\"\n        >\n          ",
                    "\n        </mwc-select>"])), Array.from(templates.querySelectorAll('EnumType')).map(function (e) {
                    var _a;
                    return lit_element_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<mwc-list-item\n                graphic=\"icon\"\n                hasMeta\n                value=\"", "\"\n                ><span>", "</span>\n                <span slot=\"meta\">", "</span>\n              </mwc-list-item>"], ["<mwc-list-item\n                graphic=\"icon\"\n                hasMeta\n                value=\"", "\"\n                ><span>", "</span>\n                <span slot=\"meta\">", "</span>\n              </mwc-list-item>"])), (_a = e.getAttribute('id')) !== null && _a !== void 0 ? _a : '', e.getAttribute('id'), e.querySelectorAll('EnumVal').length);
                })),
                lit_element_1.html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["<wizard-textfield\n          label=\"id\"\n          helper=\"", "\"\n          .maybeValue=", "\n          required\n          maxlength=\"127\"\n          minlength=\"1\"\n          pattern=\"", "\"\n          dialogInitialFocus\n        ></wizard-textfield>"], ["<wizard-textfield\n          label=\"id\"\n          helper=\"", "\"\n          .maybeValue=", "\n          required\n          maxlength=\"127\"\n          minlength=\"1\"\n          pattern=\"", "\"\n          dialogInitialFocus\n        ></wizard-textfield>"])), lit_translate_1.translate('scl.id'), '', foundation_js_1.patterns.nmToken),
                lit_element_1.html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["<wizard-textfield\n          label=\"desc\"\n          helper=\"", "\"\n          .maybeValue=", "\n          nullable\n          pattern=\"", "\"\n        ></wizard-textfield>"], ["<wizard-textfield\n          label=\"desc\"\n          helper=\"", "\"\n          .maybeValue=", "\n          nullable\n          pattern=\"", "\"\n        ></wizard-textfield>"])), lit_translate_1.translate('scl.desc'), null, foundation_js_1.patterns.normalizedString),
            ]
        },
    ];
}
exports.createEnumTypeWizard = createEnumTypeWizard;
function openAddEnumVal(parent) {
    return function (wizard) {
        wizard.dispatchEvent(foundation_js_1.newSubWizardEvent(function () { return eNumValWizard({ parent: parent }); }));
    };
}
function updateEnumTpyeAction(element) {
    return function (inputs) {
        var id = foundation_js_1.getValue(inputs.find(function (i) { return i.label === 'id'; }));
        var desc = foundation_js_1.getValue(inputs.find(function (i) { return i.label === 'desc'; }));
        if (id === element.getAttribute('id') &&
            desc === element.getAttribute('desc'))
            return [];
        var newElement = foundation_js_1.cloneElement(element, { id: id, desc: desc });
        var actions = [];
        actions.push({ old: { element: element }, "new": { element: newElement } });
        var oldId = element.getAttribute('id');
        Array.from(element.ownerDocument.querySelectorAll("DOType > DA[type=\"" + oldId + "\"], DAType > BDA[type=\"" + oldId + "\"]")).forEach(function (oldDa) {
            var newDa = oldDa.cloneNode(false);
            newDa.setAttribute('type', id);
            actions.push({ old: { element: oldDa }, "new": { element: newDa } });
        });
        return [{ title: lit_translate_1.get('enum.action.edit', { oldId: oldId, newId: id }), actions: actions }];
    };
}
function eNumTypeEditWizard(eNumTypeIdentity, doc) {
    var enumtype = foundation_js_1.find(doc, 'EnumType', eNumTypeIdentity);
    if (!enumtype)
        return undefined;
    return [
        {
            title: lit_translate_1.get('enum.wizard.title.edit'),
            element: enumtype,
            primary: {
                icon: '',
                label: lit_translate_1.get('save'),
                action: updateEnumTpyeAction(enumtype)
            },
            menuActions: [
                {
                    label: lit_translate_1.get('remove'),
                    icon: 'delete',
                    action: remove(enumtype)
                },
                {
                    label: lit_translate_1.get('scl.EnumVal'),
                    icon: 'playlist_add',
                    action: openAddEnumVal(enumtype)
                },
            ],
            content: [
                lit_element_1.html(templateObject_8 || (templateObject_8 = __makeTemplateObject(["<wizard-textfield\n          label=\"id\"\n          helper=\"", "\"\n          .maybeValue=", "\n          required\n          maxlength=\"127\"\n          minlength=\"1\"\n          pattern=\"", "\"\n          dialogInitialFocus\n        ></wizard-textfield>"], ["<wizard-textfield\n          label=\"id\"\n          helper=\"", "\"\n          .maybeValue=", "\n          required\n          maxlength=\"127\"\n          minlength=\"1\"\n          pattern=\"", "\"\n          dialogInitialFocus\n        ></wizard-textfield>"])), lit_translate_1.translate('scl.id'), enumtype.getAttribute('id'), foundation_js_1.patterns.nmToken),
                lit_element_1.html(templateObject_9 || (templateObject_9 = __makeTemplateObject(["<wizard-textfield\n          label=\"desc\"\n          helper=\"", "\"\n          .maybeValue=", "\n          nullable\n          pattern=\"", "\"\n        ></wizard-textfield>"], ["<wizard-textfield\n          label=\"desc\"\n          helper=\"", "\"\n          .maybeValue=", "\n          nullable\n          pattern=\"", "\"\n        ></wizard-textfield>"])), lit_translate_1.translate('scl.desc'), enumtype.getAttribute('desc'), foundation_js_1.patterns.normalizedString),
                lit_element_1.html(templateObject_11 || (templateObject_11 = __makeTemplateObject(["<mwc-list\n          style=\"margin-top: 0px;\"\n          @selected=", "\n          >", "</mwc-list\n        > "], ["<mwc-list\n          style=\"margin-top: 0px;\"\n          @selected=",
                    "\n          >",
                    "</mwc-list\n        > "])), function (e) {
                    var wizard = eNumValWizard({
                        identity: e.target.selected.value,
                        doc: doc
                    });
                    if (wizard)
                        e.target.dispatchEvent(foundation_js_1.newSubWizardEvent(wizard));
                }, Array.from(enumtype.querySelectorAll('EnumVal')).map(function (enumval) {
                    var _a, _b;
                    return lit_element_1.html(templateObject_10 || (templateObject_10 = __makeTemplateObject(["<mwc-list-item\n                graphic=\"icon\"\n                hasMeta\n                tabindex=\"0\"\n                value=\"", "\"\n              >\n                <span>", "</span>\n                <span slot=\"graphic\"\n                  >", "</span\n                >\n              </mwc-list-item>"], ["<mwc-list-item\n                graphic=\"icon\"\n                hasMeta\n                tabindex=\"0\"\n                value=\"", "\"\n              >\n                <span>", "</span>\n                <span slot=\"graphic\"\n                  >", "</span\n                >\n              </mwc-list-item>"])), foundation_js_1.identity(enumval), (_a = enumval.textContent) !== null && _a !== void 0 ? _a : '', (_b = enumval.getAttribute('ord')) !== null && _b !== void 0 ? _b : '-1');
                })),
            ]
        },
    ];
}
exports.eNumTypeEditWizard = eNumTypeEditWizard;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
