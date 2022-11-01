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
var lit_element_1 = require("lit-element");
var lit_translate_1 = require("lit-translate");
require("@material/mwc-dialog");
require("@material/mwc-list");
require("@material/mwc-list/mwc-list-item");
require("@material/mwc-formfield");
require("@material/mwc-checkbox");
require("../plain-compare-list.js");
var foundation_js_1 = require("../foundation.js");
var tctrClass = "LN[lnClass='TCTR']";
var tvtrClass = "LN[lnClass='TVTR']";
var setMag = "SDI[name='setMag'] Val";
var setVal = "DAI[name='setVal'] Val";
var filterToIgnore = {
    ':scope': {
        attributes: {
            name: true
        }
    },
    P: {
        full: true
    }
};
filterToIgnore[tctrClass + " DOI[name='Rat'] " + setMag] = {
    full: true
};
filterToIgnore[tctrClass + " DOI[name='ARtg'] " + setMag] = {
    full: true
};
filterToIgnore[tctrClass + " DOI[name='ARtgNom'] " + setMag] = {
    full: true
};
filterToIgnore[tctrClass + " DOI[name='ARtgSec'] " + setVal] = {
    full: true
};
filterToIgnore[tvtrClass + " DOI[name='VRtg'] " + setMag] = {
    full: true
};
filterToIgnore[tvtrClass + " DOI[name='Rat'] " + setMag] = {
    full: true
};
filterToIgnore[tvtrClass + " DOI[name='VRtgSec'] " + setVal] = {
    full: true
};
var CompareIEDPlugin = /** @class */ (function (_super) {
    __extends(CompareIEDPlugin, _super);
    function CompareIEDPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.templateDocName = '';
        return _this;
    }
    Object.defineProperty(CompareIEDPlugin.prototype, "ieds", {
        get: function () {
            if (this.doc) {
                return Array.from(this.doc.querySelectorAll("IED"))
                    .filter(foundation_js_1.isPublic)
                    .sort(foundation_js_1.compareNames);
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CompareIEDPlugin.prototype, "templateIeds", {
        get: function () {
            if (this.templateDoc) {
                return Array.from(this.templateDoc.querySelectorAll("IED"))
                    .filter(foundation_js_1.isPublic)
                    .sort(foundation_js_1.compareNames);
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    CompareIEDPlugin.prototype.run = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                this.dialog.open = true;
                return [2 /*return*/];
            });
        });
    };
    CompareIEDPlugin.prototype.onClosed = function () {
        this.templateDoc = undefined;
        this.selectedProjectIed = undefined;
        this.selectedTemplateIed = undefined;
    };
    CompareIEDPlugin.prototype.getSelectedListItem = function (doc, listId) {
        var _a;
        var selectListItem = (this.shadowRoot.querySelector("mwc-list[id='" + listId + "']")
            .selected);
        var identity = selectListItem === null || selectListItem === void 0 ? void 0 : selectListItem.value;
        if (identity) {
            return (_a = doc.querySelector(foundation_js_1.selector('IED', identity))) !== null && _a !== void 0 ? _a : undefined;
        }
        return undefined;
    };
    CompareIEDPlugin.prototype.getTemplateFile = function (evt) {
        var _a, _b, _c;
        return __awaiter(this, void 0, Promise, function () {
            var file, templateText;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        file = (_c = (_b = (_a = evt.target) === null || _a === void 0 ? void 0 : _a.files) === null || _b === void 0 ? void 0 : _b.item(0)) !== null && _c !== void 0 ? _c : false;
                        if (!file)
                            return [2 /*return*/];
                        this.templateDocName = file.name;
                        return [4 /*yield*/, file.text()];
                    case 1:
                        templateText = _d.sent();
                        this.templateDoc = new DOMParser().parseFromString(templateText, 'application/xml');
                        this.templateFileUI.onchange = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    CompareIEDPlugin.prototype.renderSelectIedButton = function () {
        var _this = this;
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mwc-button\n      slot=\"primaryAction\"\n      icon=\"arrow_back\"\n      trailingIcon\n      label=\"", "\"\n      @click=", "\n    ></mwc-button>"], ["<mwc-button\n      slot=\"primaryAction\"\n      icon=\"arrow_back\"\n      trailingIcon\n      label=\"", "\"\n      @click=",
            "\n    ></mwc-button>"])), lit_translate_1.translate('compare-ied.selectIedButton'), function () {
            _this.selectedProjectIed = undefined;
            _this.selectedTemplateIed = undefined;
        });
    };
    CompareIEDPlugin.prototype.renderCompareButton = function () {
        var _this = this;
        return lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<mwc-button\n      slot=\"primaryAction\"\n      icon=\"compare_arrows\"\n      trailingIcon\n      label=\"", "\"\n      @click=", "\n    ></mwc-button>"], ["<mwc-button\n      slot=\"primaryAction\"\n      icon=\"compare_arrows\"\n      trailingIcon\n      label=\"", "\"\n      @click=",
            "\n    ></mwc-button>"])), lit_translate_1.translate('compare.compareButton'), function () {
            _this.selectedProjectIed = _this.getSelectedListItem(_this.doc, 'currentDocument');
            _this.selectedTemplateIed = _this.getSelectedListItem(_this.templateDoc, 'currentTemplate');
        });
    };
    CompareIEDPlugin.prototype.renderCloseButton = function () {
        return lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<mwc-button\n      slot=\"secondaryAction\"\n      dialogAction=\"close\"\n      label=\"", "\"\n      style=\"--mdc-theme-primary: var(--mdc-theme-error)\"\n    ></mwc-button>"], ["<mwc-button\n      slot=\"secondaryAction\"\n      dialogAction=\"close\"\n      label=\"", "\"\n      style=\"--mdc-theme-primary: var(--mdc-theme-error)\"\n    ></mwc-button>"])), lit_translate_1.translate('close'));
    };
    CompareIEDPlugin.prototype.renderCompare = function () {
        var leftHandTitle = foundation_js_1.identity(this.selectedProjectIed);
        var rightHandTitle = foundation_js_1.identity(this.selectedTemplateIed);
        return lit_element_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<plain-compare-list\n        .leftHandObject=", "\n        .rightHandObject=", "\n        .leftHandTitle=", "\n        .rightHandTitle=", "\n        .leftHandSubtitle=", "\n        .rightHandSubtitle=", "\n        .filterToIgnore=", "\n      ></plain-compare-list>\n      ", " ", ""], ["<plain-compare-list\n        .leftHandObject=", "\n        .rightHandObject=", "\n        .leftHandTitle=", "\n        .rightHandTitle=",
            "\n        .leftHandSubtitle=", "\n        .rightHandSubtitle=", "\n        .filterToIgnore=", "\n      ></plain-compare-list>\n      ", " ", ""])), this.selectedProjectIed, this.selectedTemplateIed, typeof leftHandTitle === 'number' ? '' : leftHandTitle, typeof rightHandTitle === 'number'
            ? ''
            : rightHandTitle, this.docName, this.templateDocName, filterToIgnore, this.renderSelectIedButton(), this.renderCloseButton());
    };
    CompareIEDPlugin.prototype.renderIEDList = function (ieds, id) {
        return lit_element_1.html(templateObject_6 || (templateObject_6 = __makeTemplateObject(["<mwc-list id=\"", "\" activatable>\n      ", "\n    </mwc-list>"], ["<mwc-list id=\"", "\" activatable>\n      ",
            "\n    </mwc-list>"])), id, ieds.map(function (ied) {
            var name = foundation_js_1.getNameAttribute(ied);
            return lit_element_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<mwc-list-item value=\"", "\" left>\n          <span>", "</span>\n        </mwc-list-item>"], ["<mwc-list-item value=\"", "\" left>\n          <span>", "</span>\n        </mwc-list-item>"])), foundation_js_1.identity(ied), name);
        }));
    };
    CompareIEDPlugin.prototype.renderIEDLists = function () {
        return lit_element_1.html(templateObject_7 || (templateObject_7 = __makeTemplateObject(["<div class=\"splitContainer\">\n        <div>\n          <div>", "</div>\n          <div class=\"iedList\">\n            ", "\n          </div>\n        </div>\n        <div>\n          <div>", "</div>\n          <div class=\"iedList\">\n            ", "\n          </div>\n        </div>\n      </div>\n      ", " ", ""], ["<div class=\"splitContainer\">\n        <div>\n          <div>", "</div>\n          <div class=\"iedList\">\n            ", "\n          </div>\n        </div>\n        <div>\n          <div>", "</div>\n          <div class=\"iedList\">\n            ", "\n          </div>\n        </div>\n      </div>\n      ", " ", ""])), lit_translate_1.translate('compare-ied.projectIedTitle'), this.renderIEDList(this.ieds, 'currentDocument'), lit_translate_1.translate('compare-ied.templateIedTitle'), this.renderIEDList(this.templateIeds, 'currentTemplate'), this.renderCompareButton(), this.renderCloseButton());
    };
    CompareIEDPlugin.prototype.renderSelectTemplateFile = function () {
        var _this = this;
        return lit_element_1.html(templateObject_8 || (templateObject_8 = __makeTemplateObject(["<div>\n        <input\n          id=\"template-file\"\n          accept=\".sed,.scd,.ssd,.isd,.iid,.cid,.icd\"\n          type=\"file\"\n          hidden\n          required\n          @change=", "\n        />\n\n        <mwc-button\n          label=\"", "\"\n          @click=", "\n        ></mwc-button>\n      </div>\n      ", ""], ["<div>\n        <input\n          id=\"template-file\"\n          accept=\".sed,.scd,.ssd,.isd,.iid,.cid,.icd\"\n          type=\"file\"\n          hidden\n          required\n          @change=",
            "\n        />\n\n        <mwc-button\n          label=\"", "\"\n          @click=",
            "\n        ></mwc-button>\n      </div>\n      ", ""])), function (evt) {
            return _this.dispatchEvent(foundation_js_1.newPendingStateEvent(_this.getTemplateFile(evt)));
        }, lit_translate_1.translate('compare-ied.selectTemplateButton'), function () {
            var input = (_this.shadowRoot.querySelector('#template-file'));
            input === null || input === void 0 ? void 0 : input.click();
        }, this.renderCloseButton());
    };
    CompareIEDPlugin.prototype.renderDialog = function (content, heading) {
        return lit_element_1.html(templateObject_9 || (templateObject_9 = __makeTemplateObject(["<mwc-dialog heading=\"", "\" @closed=", ">\n      ", "\n    </mwc-dialog>"], ["<mwc-dialog heading=\"", "\" @closed=", ">\n      ", "\n    </mwc-dialog>"])), heading, this.onClosed, content);
    };
    CompareIEDPlugin.prototype.render = function () {
        if (!this.doc)
            return lit_element_1.html(templateObject_10 || (templateObject_10 = __makeTemplateObject([""], [""])));
        if (this.selectedProjectIed && this.selectedTemplateIed) {
            return this.renderDialog(this.renderCompare(), lit_translate_1.get('compare-ied.resultTitle'));
        }
        else if (this.templateDoc) {
            return this.renderDialog(this.renderIEDLists(), lit_translate_1.get('compare-ied.selectIedTitle'));
        }
        else {
            return this.renderDialog(this.renderSelectTemplateFile(), lit_translate_1.get('compare-ied.selectProjectTitle'));
        }
    };
    CompareIEDPlugin.styles = lit_element_1.css(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    mwc-dialog {\n      --mdc-dialog-min-width: 64vw;\n    }\n\n    .splitContainer {\n      display: flex;\n      padding: 8px 6px 16px;\n      height: 64vh;\n    }\n\n    .iedList {\n      flex: 50%;\n      margin: 0px 6px 0px;\n      min-width: 300px;\n      height: 100%;\n      overflow-y: auto;\n    }\n\n    .resultTitle {\n      font-weight: bold;\n    }\n  "], ["\n    mwc-dialog {\n      --mdc-dialog-min-width: 64vw;\n    }\n\n    .splitContainer {\n      display: flex;\n      padding: 8px 6px 16px;\n      height: 64vh;\n    }\n\n    .iedList {\n      flex: 50%;\n      margin: 0px 6px 0px;\n      min-width: 300px;\n      height: 100%;\n      overflow-y: auto;\n    }\n\n    .resultTitle {\n      font-weight: bold;\n    }\n  "])));
    __decorate([
        lit_element_1.property({ attribute: false })
    ], CompareIEDPlugin.prototype, "doc");
    __decorate([
        lit_element_1.property({ attribute: false })
    ], CompareIEDPlugin.prototype, "templateDoc");
    __decorate([
        lit_element_1.property({ attribute: false })
    ], CompareIEDPlugin.prototype, "selectedProjectIed");
    __decorate([
        lit_element_1.property({ attribute: false })
    ], CompareIEDPlugin.prototype, "selectedTemplateIed");
    __decorate([
        lit_element_1.query('mwc-dialog')
    ], CompareIEDPlugin.prototype, "dialog");
    __decorate([
        lit_element_1.query('#template-file')
    ], CompareIEDPlugin.prototype, "templateFileUI");
    __decorate([
        lit_element_1.property({ attribute: false })
    ], CompareIEDPlugin.prototype, "docName");
    return CompareIEDPlugin;
}(lit_element_1.LitElement));
exports["default"] = CompareIEDPlugin;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11;
