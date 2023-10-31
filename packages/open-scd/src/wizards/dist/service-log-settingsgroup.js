"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.createLogSettingsGroupServicesWizardPage = void 0;
var lit_translate_1 = require("lit-translate");
var services_js_1 = require("./services.js");
function createLogSettingsGroupServicesWizardPage(services) {
    var content = createLogSettingsGroupServicesWizard(services);
    return content
        ? {
            title: lit_translate_1.get('wizard.title.edit', { tagName: 'Services' }),
            content: __spreadArrays(content)
        }
        : null;
}
exports.createLogSettingsGroupServicesWizardPage = createLogSettingsGroupServicesWizardPage;
function createLogSettingsGroupServicesWizard(parent) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
    var content = {
        logSettings: {
            cbName: (_b = (_a = parent.querySelector('LogSettings')) === null || _a === void 0 ? void 0 : _a.getAttribute('cbName')) !== null && _b !== void 0 ? _b : null,
            datSet: (_d = (_c = parent.querySelector('LogSettings')) === null || _c === void 0 ? void 0 : _c.getAttribute('datSet')) !== null && _d !== void 0 ? _d : null,
            logEna: (_f = (_e = parent.querySelector('LogSettings')) === null || _e === void 0 ? void 0 : _e.getAttribute('logEna')) !== null && _f !== void 0 ? _f : null,
            intgPd: (_h = (_g = parent.querySelector('LogSettings')) === null || _g === void 0 ? void 0 : _g.getAttribute('trgOps')) !== null && _h !== void 0 ? _h : null,
            trgOps: (_k = (_j = parent.querySelector('LogSettings')) === null || _j === void 0 ? void 0 : _j.getAttribute('intgPd')) !== null && _k !== void 0 ? _k : null
        },
        confLogControl: {
            max: (_m = (_l = parent.querySelector('ConfLogControl')) === null || _l === void 0 ? void 0 : _l.getAttribute('max')) !== null && _m !== void 0 ? _m : null
        },
        dataSet: {
            max: (_p = (_o = parent.querySelector('ConfDataSet')) === null || _o === void 0 ? void 0 : _o.getAttribute('max')) !== null && _p !== void 0 ? _p : Array.from(((_q = parent.parentElement) === null || _q === void 0 ? void 0 : _q.querySelectorAll('DataSet')) || []).length.toString(),
            maxAttributes: (_s = (_r = parent.querySelector('ConfDataSet')) === null || _r === void 0 ? void 0 : _r.getAttribute('maxAttributes')) !== null && _s !== void 0 ? _s : null,
            modify: (_u = (_t = parent.querySelector('ConfDataSet')) === null || _t === void 0 ? void 0 : _t.getAttribute('modify')) !== null && _u !== void 0 ? _u : 'true'
        },
        clientServices: {
            readLog: (_w = (_v = parent.querySelector('ClientServices')) === null || _v === void 0 ? void 0 : _v.getAttribute('readLog')) !== null && _w !== void 0 ? _w : null
        },
        sGEdit: {
            resvTms: ((_x = parent
                .querySelector('SettingGroups > SGEdit')) === null || _x === void 0 ? void 0 : _x.getAttribute('resvTms')) || null
        },
        confSG: {
            resvTms: ((_y = parent
                .querySelector('SettingGroups > ConfSG')) === null || _y === void 0 ? void 0 : _y.getAttribute('resvTms')) || null
        }
    };
    return services_js_1.isEmptyObject(content)
        ? null
        : __spreadArrays([
            services_js_1.createFormDivider('Log Control Configuration')
        ], services_js_1.createFormElementsFromInputs([
            {
                kind: 'Select',
                label: 'cbName',
                maybeValue: content.logSettings.cbName,
                helper: 'Whether log control block name is configurable offline (Conf) or fixed (Fix)',
                values: ['Conf', 'Fix'],
                "default": 'Fix',
                nullable: true
            },
            {
                kind: 'Select',
                label: 'datSet',
                maybeValue: content.logSettings.datSet,
                helper: 'Whether log control blocks data set and its structure is configurable offline (Conf), online(Dyn) or is fixed (Fix)',
                values: ['Dyn', 'Conf', 'Fix'],
                "default": 'Fix',
                nullable: true
            },
            {
                kind: 'Select',
                label: 'logEna',
                maybeValue: content.logSettings.logEna,
                helper: 'Whether log control blocks attribute logEna is configurable offline (Conf), online (Dyn) or is fixed (Fix)',
                values: ['Dyn', 'Conf', 'Fix'],
                "default": 'Fix',
                nullable: true
            },
            {
                kind: 'Select',
                label: 'trgOps',
                maybeValue: content.logSettings.trgOps,
                helper: 'Whether log control blocks trigger options are configurable offline (Conf), online(Dyn) or are fixed (Fix)',
                values: ['Dyn', 'Conf', 'Fix'],
                "default": 'Fix',
                nullable: true
            },
            {
                kind: 'Select',
                label: 'intgPd',
                maybeValue: content.logSettings.intgPd,
                helper: 'Whether log control blocks integrity period is configurable offlien (Conf), online (Dyn), or is fixed (Fix)',
                values: ['Dyn', 'Conf', 'Fix'],
                "default": 'Fix',
                nullable: true
            },
        ]), [
            services_js_1.createFormDivider('Log Capabilities')
        ], services_js_1.createFormElementsFromInputs([
            {
                kind: 'TextField',
                label: 'Max',
                required: true,
                helper: 'The maximum number of log control blocks instantiable by system configuration tool',
                maybeValue: content.confLogControl.max
            },
        ]), [
            services_js_1.createFormDivider('Client Capabilities')
        ], services_js_1.createFormElementsFromInputs([
            {
                kind: 'Checkbox',
                label: 'read Log',
                nullable: true,
                helper: 'Whether IED supports services to handle logs as a client (see IEC 61850-7-2 for further information)',
                maybeValue: content.clientServices.readLog
            },
        ]), [
            services_js_1.createFormDivider('DataSet Configuration')
        ], services_js_1.createFormElementsFromInputs([
            {
                kind: 'TextField',
                label: 'Max',
                nullable: false,
                helper: 'The maximum allow data sets in this IED',
                maybeValue: content.dataSet.max
            },
            {
                kind: 'TextField',
                label: 'Max attributes',
                nullable: true,
                helper: 'The maximum number of FCDA elements per DataSet',
                maybeValue: content.dataSet.maxAttributes
            },
            {
                kind: 'Checkbox',
                label: 'Modify',
                helper: 'Whether DataSet can be modified by SCT',
                maybeValue: content.dataSet.modify
            },
        ]), [
            services_js_1.createFormDivider('Setting Group')
        ], services_js_1.createFormElementsFromInputs([
            {
                kind: 'Checkbox',
                label: 'SGEdit',
                nullable: true,
                helper: 'Whether IED allows manipulating editable setting groups online',
                maybeValue: content.sGEdit.resvTms
            },
            {
                kind: 'Checkbox',
                label: 'ConfSG',
                nullable: true,
                helper: 'Whether IED accepts the system configuration tool to configure the number of setting groups',
                maybeValue: content.confSG.resvTms
            },
        ]));
}
