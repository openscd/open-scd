"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.mergeSubstation = exports.isValidReference = void 0;
var lit_element_1 = require("lit-element");
var lit_translate_1 = require("lit-translate");
var foundation_js_1 = require("../foundation.js");
var wizards_js_1 = require("../wizards.js");
function isValidReference(doc, identity) {
    if (typeof identity !== 'string')
        return false;
    var _a = identity.split(/[ /]/), iedName = _a[0], ldInst = _a[1], prefix = _a[2], lnClass = _a[3], lnInst = _a[4];
    if (!iedName || !lnClass)
        return false;
    if (ldInst === '(Client)') {
        var _b = [
            ["IED[name=\"" + iedName + "\"]"],
            prefix ? ["[prefix=\"" + prefix + "\"]"] : [':not([prefix])', '[prefix=""]'],
            ["LN[lnClass=\"" + lnClass + "\"]"],
            lnInst ? ["[inst=\"" + lnInst + "\"]"] : [':not([inst])', '[inst=""]'],
        ], iedNameSelectors_1 = _b[0], prefixSelectors_1 = _b[1], lnClassSelectors_1 = _b[2], lnInstSelectors_1 = _b[3];
        return (doc.querySelector(foundation_js_1.crossProduct(iedNameSelectors_1, ['>AccessPoint>'], lnClassSelectors_1, prefixSelectors_1, lnInstSelectors_1)
            .map(function (strings) { return strings.join(''); })
            .join(',')) !== null);
    }
    var _c = [
        ["IED[name=\"" + iedName + "\"]"],
        ["LDevice[inst=\"" + ldInst + "\"]"],
        prefix ? ["[prefix=\"" + prefix + "\"]"] : [':not([prefix])', '[prefix=""]'],
        lnClass === 'LLN0' ? ["LN0"] : ["LN[lnClass=\"" + lnClass + "\"]"],
        lnInst ? ["[inst=\"" + lnInst + "\"]"] : [':not([inst])', '[inst=""]'],
    ], iedNameSelectors = _c[0], ldInstSelectors = _c[1], prefixSelectors = _c[2], lnClassSelectors = _c[3], lnInstSelectors = _c[4];
    return (doc.querySelector(foundation_js_1.crossProduct(iedNameSelectors, [' '], ldInstSelectors, ['>'], lnClassSelectors, prefixSelectors, lnInstSelectors)
        .map(function (strings) { return strings.join(''); })
        .join(',')) !== null);
}
exports.isValidReference = isValidReference;
function mergeSubstation(element, currentDoc, docWithSubstation) {
    element.dispatchEvent(foundation_js_1.newWizardEvent(wizards_js_1.mergeWizard(
    // FIXME: doesn't work with multiple Substations!
    currentDoc.documentElement, docWithSubstation.documentElement, {
        title: lit_translate_1.get('updatesubstation.title'),
        selected: function (diff) {
            return diff.theirs instanceof Element
                ? diff.theirs.tagName === 'LNode'
                    ? foundation_js_1.find(currentDoc, 'LNode', foundation_js_1.identity(diff.theirs)) === null &&
                        isValidReference(docWithSubstation, foundation_js_1.identity(diff.theirs))
                    : diff.theirs.tagName === 'Substation' ||
                        !foundation_js_1.tags['SCL'].children.includes(diff.theirs.tagName)
                : diff.theirs !== null;
        },
        disabled: function (diff) {
            return diff.theirs instanceof Element &&
                diff.theirs.tagName === 'LNode' &&
                (foundation_js_1.find(currentDoc, 'LNode', foundation_js_1.identity(diff.theirs)) !== null ||
                    !isValidReference(docWithSubstation, foundation_js_1.identity(diff.theirs)));
        },
        auto: function () { return true; }
    })));
}
exports.mergeSubstation = mergeSubstation;
var UpdateSubstationPlugin = /** @class */ (function (_super) {
    __extends(UpdateSubstationPlugin, _super);
    function UpdateSubstationPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UpdateSubstationPlugin.prototype.updateSubstation = function (event) {
        var _a, _b, _c;
        return __awaiter(this, void 0, Promise, function () {
            var file, text, doc;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        file = (_c = (_b = (_a = event.target) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b.item(0)) !== null && _c !== void 0 ? _c : false;
                        if (!file) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, file.text()];
                    case 1:
                        text = _d.sent();
                        doc = new DOMParser().parseFromString(text, 'application/xml');
                        mergeSubstation(this, this.doc, doc);
                        this.pluginFileUI.onchange = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    UpdateSubstationPlugin.prototype.run = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                this.pluginFileUI.click();
                return [2 /*return*/];
            });
        });
    };
    UpdateSubstationPlugin.prototype.render = function () {
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<input @click=", "\n                       @change=", "\n                       id=\"update-substation-plugin-input\" accept=\".sed,.scd,.ssd,.iid,.cid\" type=\"file\"></input>"], ["<input @click=",
            "\n                       @change=", "\n                       id=\"update-substation-plugin-input\" accept=\".sed,.scd,.ssd,.iid,.cid\" type=\"file\"></input>"])), function (event) {
            return (event.target.value = '');
        }, this.updateSubstation);
    };
    UpdateSubstationPlugin.styles = lit_element_1.css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    input {\n      width: 0;\n      height: 0;\n      opacity: 0;\n    }\n  "], ["\n    input {\n      width: 0;\n      height: 0;\n      opacity: 0;\n    }\n  "])));
    __decorate([
        lit_element_1.query('#update-substation-plugin-input')
    ], UpdateSubstationPlugin.prototype, "pluginFileUI");
    return UpdateSubstationPlugin;
}(lit_element_1.LitElement));
exports["default"] = UpdateSubstationPlugin;
var templateObject_1, templateObject_2;
