"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.tagValidator = exports.validateChildren = exports.getAdjacentClass = exports.getTypeChild = exports.isTypeMissing = exports.serviceCDCs = exports.iec6185081 = exports.iec6185072 = exports.iec6185073 = exports.iec6185074 = void 0;
var dabda_js_1 = require("./dabda.js");
var datype_js_1 = require("./datype.js");
var dosdo_js_1 = require("./dosdo.js");
var dotype_js_1 = require("./dotype.js");
var lnodetype_js_1 = require("./lnodetype.js");
exports.iec6185074 = fetch('public/xml/IEC_61850-7-4_2007B3.nsd')
    .then(function (response) { return response.text(); })
    .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); });
exports.iec6185073 = fetch('public/xml/IEC_61850-7-3_2007B3.nsd')
    .then(function (response) { return response.text(); })
    .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); });
exports.iec6185072 = fetch('public/xml/IEC_61850-7-2_2007B3.nsd')
    .then(function (response) { return response.text(); })
    .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); });
exports.iec6185081 = fetch('public/xml/IEC_61850-8-1_2003A2.nsd')
    .then(function (response) { return response.text(); })
    .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); });
exports.serviceCDCs = [
    'SPC',
    'DPC',
    'INC',
    'ENC',
    'BSC',
    'ISC',
    'APC',
    'BAC',
];
function isTypeMissing(element) {
    var tagName = element.tagName;
    var isTypeMandatory = tagName === 'DO' ||
        tagName === 'SDO' ||
        ((tagName === 'DA' || tagName === 'BDA') &&
            (element.getAttribute('bType') === 'Enum' ||
                element.getAttribute('bType') === 'Struct'));
    var isTypeMissing = !element.getAttribute('type');
    return isTypeMandatory && isTypeMissing;
}
exports.isTypeMissing = isTypeMissing;
function getTypeChild(element) {
    var _a, _b;
    var isStruct = element.getAttribute('bType') === 'Struct';
    var isEnum = element.getAttribute('bType') === 'Enum';
    var isDo = element.tagName === 'DO' || element.tagName === 'SDO';
    var referenceTag = isDo
        ? 'DOType'
        : isStruct || isEnum
            ? isStruct
                ? 'DAType'
                : 'EnumType'
            : null;
    if (!referenceTag)
        return undefined;
    return ((_b = (_a = element
        .closest('DataTypeTemplates')) === null || _a === void 0 ? void 0 : _a.querySelector(referenceTag + "[id=\"" + element.getAttribute('type') + "\"]")) !== null && _b !== void 0 ? _b : null);
}
exports.getTypeChild = getTypeChild;
function getAdjacentClass(nsd, base) {
    var _a, _b;
    if (base === '')
        return [];
    var adjacents = getAdjacentClass(nsd, (_b = (_a = nsd
        .querySelector("LNClass[name=\"" + base + "\"], AbstractLNClass[name=\"" + base + "\"]")) === null || _a === void 0 ? void 0 : _a.getAttribute('base')) !== null && _b !== void 0 ? _b : '');
    return Array.from(nsd.querySelectorAll("LNClass[name=\"" + base + "\"], AbstractLNClass[name=\"" + base + "\"]")).concat(adjacents);
}
exports.getAdjacentClass = getAdjacentClass;
function validateChildren(element) {
    return __awaiter(this, void 0, Promise, function () {
        var issues, children, _i, children_1, child, validator, childIssues, _a, childIssues_1, childIssue;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    issues = [];
                    children = Array.from(element.children);
                    _i = 0, children_1 = children;
                    _b.label = 1;
                case 1:
                    if (!(_i < children_1.length)) return [3 /*break*/, 4];
                    child = children_1[_i];
                    validator = exports.tagValidator[child.tagName];
                    if (!validator)
                        return [3 /*break*/, 3];
                    return [4 /*yield*/, validator(child)];
                case 2:
                    childIssues = _b.sent();
                    if (childIssues.length)
                        for (_a = 0, childIssues_1 = childIssues; _a < childIssues_1.length; _a++) {
                            childIssue = childIssues_1[_a];
                            issues.push(childIssue);
                        }
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, issues];
            }
        });
    });
}
exports.validateChildren = validateChildren;
exports.tagValidator = {
    LNodeType: lnodetype_js_1.lNodeTypeValidator,
    DOType: dotype_js_1.dOTypeValidator,
    DAType: datype_js_1.dATypeValidator,
    DO: dosdo_js_1.dOValidator,
    SDO: dosdo_js_1.dOValidator,
    DA: dabda_js_1.dAValidator,
    BDA: dabda_js_1.dAValidator
};
