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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var lit_element_1 = require("lit-element");
var lit_translate_1 = require("lit-translate");
require("@material/mwc-list/mwc-check-list-item");
require("@material/dialog");
require("@material/mwc-button");
require("../filtered-list.js");
var foundation_js_1 = require("../foundation.js");
function uniqueTemplateIedName(doc, ied) {
    var _a = ['manufacturer', 'type'].map(function (attr) { var _a; return (_a = ied.getAttribute(attr)) === null || _a === void 0 ? void 0 : _a.replace(/[^A-Za-z0-9_]/g, ''); }), manufacturer = _a[0], type = _a[1];
    var nameCore = manufacturer || type
        ? "" + (manufacturer !== null && manufacturer !== void 0 ? manufacturer : '') + (type ? '_' + type : '')
        : 'TEMPLATE_IED';
    var siblingNames = Array.from(doc.querySelectorAll('IED'))
        .filter(foundation_js_1.isPublic)
        .map(function (child) { var _a; return (_a = child.getAttribute('name')) !== null && _a !== void 0 ? _a : child.tagName; });
    if (!siblingNames.length)
        return nameCore + '_001';
    var newName = '';
    for (var i = 0; i < siblingNames.length + 1; i++) {
        var newDigit = (i + 1).toString().padStart(3, '0');
        newName = nameCore + '_' + newDigit;
        if (!siblingNames.includes(newName))
            return newName;
    }
    return newName;
}
/**
 * Transfer namespaces from one element to another
 * @param destElement - Element to transfer namespaces to
 * @param sourceElement  - Element to transfer namespaces from
 */
function updateNamespaces(destElement, sourceElement) {
    Array.prototype.slice
        .call(sourceElement.attributes)
        .filter(function (attr) { return attr.name.startsWith('xmlns:'); })
        .filter(function (attr) { return !destElement.hasAttribute(attr.name); })
        .forEach(function (attr) {
        destElement.setAttributeNS('http://www.w3.org/2000/xmlns/', attr.name, attr.value);
    });
}
function getSubNetwork(elements, element) {
    var existElement = elements.find(function (item) { return item.getAttribute('name') === element.getAttribute('name'); });
    return existElement ? existElement : element.cloneNode(false);
}
function addCommunicationElements(ied, doc) {
    var actions = [];
    var oldCommunicationElement = doc.querySelector(':root > Communication');
    var communication = oldCommunicationElement
        ? oldCommunicationElement
        : foundation_js_1.createElement(doc, 'Communication', {});
    if (!oldCommunicationElement)
        actions.push({
            "new": {
                parent: doc.querySelector(':root'),
                element: communication
            }
        });
    var connectedAPs = Array.from(ied.ownerDocument.querySelectorAll(":root > Communication > SubNetwork > ConnectedAP[iedName=\"" + ied.getAttribute('name') + "\"]"));
    var createdSubNetworks = [];
    connectedAPs.forEach(function (connectedAP) {
        var newSubNetwork = connectedAP.parentElement;
        var oldSubNetworkMatch = communication.querySelector(":root > Communication > SubNetwork[name=\"" + newSubNetwork.getAttribute('name') + "\"]");
        var subNetwork = oldSubNetworkMatch
            ? oldSubNetworkMatch
            : getSubNetwork(createdSubNetworks, newSubNetwork);
        var element = connectedAP.cloneNode(true);
        if (!oldSubNetworkMatch && !createdSubNetworks.includes(subNetwork)) {
            actions.push({
                "new": {
                    parent: communication,
                    element: subNetwork
                }
            });
            createdSubNetworks.push(subNetwork);
        }
        actions.push({
            "new": {
                parent: subNetwork,
                element: element
            }
        });
    });
    return actions;
}
function hasConnectionToIed(type, ied) {
    var data = type.parentElement;
    var id = type.getAttribute('id');
    if (!data || !id)
        return false;
    if (type.tagName === 'EnumType')
        return Array.from(data.querySelectorAll("DOType > DA[type=\"" + id + "\"],DAType > BDA[type=\"" + id + "\"]")).some(function (typeChild) { return hasConnectionToIed(typeChild.parentElement, ied); });
    if (type.tagName === 'DAType')
        return Array.from(data.querySelectorAll("DOType > DA[type=\"" + id + "\"],DAType > BDA[type=\"" + id + "\"]")).some(function (typeChild) { return hasConnectionToIed(typeChild.parentElement, ied); });
    if (type.tagName === 'DOType')
        return Array.from(data.querySelectorAll("LNodeType > DO[type=\"" + id + "\"], DOType > SDO[type=\"" + id + "\"]")).some(function (typeChild) { return hasConnectionToIed(typeChild.parentElement, ied); });
    return Array.from(ied.getElementsByTagName('LN0'))
        .concat(Array.from(ied.getElementsByTagName('LN')))
        .some(function (anyln) { return anyln.getAttribute('lnType') === id; });
}
function addEnumType(ied, enumType, parent) {
    if (!hasConnectionToIed(enumType, ied))
        return;
    var existEnumType = parent.querySelector("EnumType[id=\"" + enumType.getAttribute('id') + "\"]");
    if (existEnumType && enumType.isEqualNode(existEnumType))
        return;
    if (existEnumType) {
        // There is an `id` conflict in the project that must be resolved by
        // concatenating the IED name with the id
        var data = enumType.parentElement;
        var idOld = enumType.getAttribute('id');
        var idNew_1 = ied.getAttribute('name') + idOld;
        enumType.setAttribute('id', idNew_1);
        data
            .querySelectorAll("DOType > DA[type=\"" + idOld + "\"],DAType > BDA[type=\"" + idOld + "\"]")
            .forEach(function (type) { return type.setAttribute('type', idNew_1); });
    }
    return {
        "new": {
            parent: parent,
            element: enumType
        }
    };
}
function addDAType(ied, daType, parent) {
    if (!hasConnectionToIed(daType, ied))
        return;
    var existDAType = parent.querySelector("DAType[id=\"" + daType.getAttribute('id') + "\"]");
    if (existDAType && daType.isEqualNode(existDAType))
        return;
    if (existDAType) {
        // There is an `id` conflict in the project that must be resolved by
        // concatenating the IED name with the id
        var data = daType.parentElement;
        var idOld = daType.getAttribute('id');
        var idNew_2 = ied.getAttribute('name') + idOld;
        daType.setAttribute('id', idNew_2);
        data
            .querySelectorAll("DOType > DA[type=\"" + idOld + "\"],DAType > BDA[type=\"" + idOld + "\"]")
            .forEach(function (type) { return type.setAttribute('type', idNew_2); });
    }
    return {
        "new": {
            parent: parent,
            element: daType
        }
    };
}
function addDOType(ied, doType, parent) {
    if (!hasConnectionToIed(doType, ied))
        return;
    var existDOType = parent.querySelector("DOType[id=\"" + doType.getAttribute('id') + "\"]");
    if (existDOType && doType.isEqualNode(existDOType))
        return;
    if (existDOType) {
        // There is an `id` conflict in the project that must be resolved by
        // concatenating the IED name with the id
        var data = doType.parentElement;
        var idOld = doType.getAttribute('id');
        var idNew_3 = ied.getAttribute('name') + idOld;
        doType.setAttribute('id', idNew_3);
        data
            .querySelectorAll("LNodeType > DO[type=\"" + idOld + "\"], DOType > SDO[type=\"" + idOld + "\"]")
            .forEach(function (type) { return type.setAttribute('type', idNew_3); });
    }
    return {
        "new": {
            parent: parent,
            element: doType
        }
    };
}
function addLNodeType(ied, lNodeType, parent) {
    if (!hasConnectionToIed(lNodeType, ied))
        return;
    var existLNodeType = parent.querySelector("LNodeType[id=\"" + lNodeType.getAttribute('id') + "\"]");
    if (existLNodeType && lNodeType.isEqualNode(existLNodeType))
        return;
    if (existLNodeType) {
        // There is an `id` conflict in the project that must be resolved by
        // concatenating the IED name with the id
        var idOld = lNodeType.getAttribute('id');
        var idNew_4 = ied.getAttribute('name').concat(idOld);
        lNodeType.setAttribute('id', idNew_4);
        Array.from(ied.querySelectorAll("LN0[lnType=\"" + idOld + "\"],LN[lnType=\"" + idOld + "\"]"))
            .filter(foundation_js_1.isPublic)
            .forEach(function (ln) { return ln.setAttribute('lnType', idNew_4); });
    }
    return {
        "new": {
            parent: parent,
            element: lNodeType
        }
    };
}
function addDataTypeTemplates(ied, doc) {
    var actions = [];
    var dataTypeTemplates = doc.querySelector(':root > DataTypeTemplates')
        ? doc.querySelector(':root > DataTypeTemplates')
        : foundation_js_1.createElement(doc, 'DataTypeTemplates', {});
    if (!dataTypeTemplates.parentElement) {
        actions.push({
            "new": {
                parent: doc.querySelector('SCL'),
                element: dataTypeTemplates
            }
        });
    }
    ied.ownerDocument
        .querySelectorAll(':root > DataTypeTemplates > LNodeType')
        .forEach(function (lNodeType) {
        return actions.push(addLNodeType(ied, lNodeType, dataTypeTemplates));
    });
    ied.ownerDocument
        .querySelectorAll(':root > DataTypeTemplates > DOType')
        .forEach(function (doType) {
        return actions.push(addDOType(ied, doType, dataTypeTemplates));
    });
    ied.ownerDocument
        .querySelectorAll(':root > DataTypeTemplates > DAType')
        .forEach(function (daType) {
        return actions.push(addDAType(ied, daType, dataTypeTemplates));
    });
    ied.ownerDocument
        .querySelectorAll(':root > DataTypeTemplates > EnumType')
        .forEach(function (enumType) {
        return actions.push(addEnumType(ied, enumType, dataTypeTemplates));
    });
    return actions.filter(function (item) { return item !== undefined; });
}
function isIedNameUnique(ied, doc) {
    var existingIedNames = Array.from(doc.querySelectorAll(':root > IED')).map(function (ied) { return ied.getAttribute('name'); });
    var importedIedName = ied.getAttribute('name');
    if (existingIedNames.includes(importedIedName))
        return false;
    return true;
}
var ImportingIedPlugin = /** @class */ (function (_super) {
    __extends(ImportingIedPlugin, _super);
    function ImportingIedPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.editCount = -1;
        _this.iedSelection = [];
        return _this;
    }
    ImportingIedPlugin.prototype.run = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                this.iedSelection = [];
                this.pluginFileUI.click();
                return [2 /*return*/];
            });
        });
    };
    ImportingIedPlugin.prototype.docUpdate = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.updateComplete];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ImportingIedPlugin.prototype.importIED = function (ied) {
        if (ied.getAttribute('name') === 'TEMPLATE') {
            var newIedName_1 = uniqueTemplateIedName(this.doc, ied);
            ied.setAttribute('name', newIedName_1);
            Array.from(ied.ownerDocument.querySelectorAll(':root > Communication > SubNetwork > ConnectedAP[iedName="TEMPLATE"]')).forEach(function (connectedAp) { return connectedAp.setAttribute('iedName', newIedName_1); });
        }
        if (!isIedNameUnique(ied, this.doc)) {
            this.dispatchEvent(foundation_js_1.newLogEvent({
                kind: 'error',
                title: lit_translate_1.get('import.log.nouniqueied', {
                    name: ied.getAttribute('name')
                })
            }));
            return;
        }
        // This doesn't provide redo/undo capability as it is not using the Editing
        // action API. To use it would require us to cache the full SCL file in
        // OpenSCD as it is now which could use significant memory.
        // TODO: In open-scd core update this to allow including in undo/redo.
        updateNamespaces(this.doc.documentElement, ied.ownerDocument.documentElement);
        var dataTypeTemplateActions = addDataTypeTemplates(ied, this.doc);
        var communicationActions = addCommunicationElements(ied, this.doc);
        var actions = communicationActions.concat(dataTypeTemplateActions);
        actions.push({
            "new": {
                parent: this.doc.querySelector(':root'),
                element: ied
            }
        });
        this.dispatchEvent(foundation_js_1.newActionEvent({
            title: lit_translate_1.get('editing.import', { name: ied.getAttribute('name') }),
            actions: actions
        }));
    };
    ImportingIedPlugin.prototype.importIEDs = function (importDoc, fileName) {
        return __awaiter(this, void 0, Promise, function () {
            var documentDialog, selectedItems, ieds, _i, ieds_1, ied;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        documentDialog = this.shadowRoot.querySelector("mwc-dialog[data-file=\"" + fileName + "\"]");
                        selectedItems = (documentDialog.querySelector('filtered-list').selected);
                        ieds = selectedItems
                            .map(function (item) {
                            return foundation_js_1.find(importDoc, 'IED', item.value);
                        })
                            .filter(function (ied) { return ied; });
                        documentDialog.close();
                        _i = 0, ieds_1 = ieds;
                        _a.label = 1;
                    case 1:
                        if (!(_i < ieds_1.length)) return [3 /*break*/, 4];
                        ied = ieds_1[_i];
                        this.importIED(ied);
                        return [4 /*yield*/, this.docUpdate()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ImportingIedPlugin.prototype.prepareImport = function (importDoc, fileName) {
        return __awaiter(this, void 0, Promise, function () {
            var ieds, dialog;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!importDoc) {
                            this.dispatchEvent(foundation_js_1.newLogEvent({
                                kind: 'error',
                                title: lit_translate_1.get('import.log.loaderror')
                            }));
                            return [2 /*return*/];
                        }
                        if (importDoc.querySelector('parsererror')) {
                            this.dispatchEvent(foundation_js_1.newLogEvent({
                                kind: 'error',
                                title: lit_translate_1.get('import.log.parsererror')
                            }));
                            return [2 /*return*/];
                        }
                        ieds = Array.from(importDoc.querySelectorAll(':root > IED'));
                        if (ieds.length === 0) {
                            this.dispatchEvent(foundation_js_1.newLogEvent({
                                kind: 'error',
                                title: lit_translate_1.get('import.log.missingied')
                            }));
                            return [2 /*return*/];
                        }
                        if (!(ieds.length === 1)) return [3 /*break*/, 2];
                        this.importIED(ieds[0]);
                        return [4 /*yield*/, this.docUpdate()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        this.buildIedSelection(importDoc, fileName);
                        return [4 /*yield*/, this.requestUpdate()];
                    case 3:
                        _a.sent();
                        dialog = (this.shadowRoot.querySelector("mwc-dialog[data-file=\"" + fileName + "\"]"));
                        dialog.show();
                        // await closing of dialog
                        return [4 /*yield*/, new Promise(function (resolve) {
                                dialog.addEventListener('closed', function onClosed(evt) {
                                    var _a;
                                    (_a = evt.target) === null || _a === void 0 ? void 0 : _a.removeEventListener('closed', onClosed);
                                    resolve();
                                });
                            })];
                    case 4:
                        // await closing of dialog
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /** Loads the file `event.target.files[0]` into [[`src`]] as a `blob:...`. */
    ImportingIedPlugin.prototype.onLoadFiles = function (event) {
        var e_1, _a;
        var _b, _c;
        return __awaiter(this, void 0, Promise, function () {
            var files, promises, promises_1, promises_1_1, file, _d, e_1_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        files = Array.from((_c = (_b = event.target) === null || _b === void 0 ? void 0 : _b.files) !== null && _c !== void 0 ? _c : []);
                        promises = files.map(function (file) {
                            return {
                                text: file
                                    .text()
                                    .then(function (text) {
                                    return new DOMParser().parseFromString(text, 'application/xml');
                                }),
                                name: file.name
                            };
                        });
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 8, 9, 14]);
                        promises_1 = __asyncValues(promises);
                        _e.label = 2;
                    case 2: return [4 /*yield*/, promises_1.next()];
                    case 3:
                        if (!(promises_1_1 = _e.sent(), !promises_1_1.done)) return [3 /*break*/, 7];
                        file = promises_1_1.value;
                        _d = this.prepareImport;
                        return [4 /*yield*/, file.text];
                    case 4: return [4 /*yield*/, _d.apply(this, [_e.sent(), file.name])];
                    case 5:
                        _e.sent();
                        _e.label = 6;
                    case 6: return [3 /*break*/, 2];
                    case 7: return [3 /*break*/, 14];
                    case 8:
                        e_1_1 = _e.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 14];
                    case 9:
                        _e.trys.push([9, , 12, 13]);
                        if (!(promises_1_1 && !promises_1_1.done && (_a = promises_1["return"]))) return [3 /*break*/, 11];
                        return [4 /*yield*/, _a.call(promises_1)];
                    case 10:
                        _e.sent();
                        _e.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 13: return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    ImportingIedPlugin.prototype.renderInput = function () {
        var _this = this;
        return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<input multiple @change=", " id=\"importied-plugin-input\" accept=\".sed,.scd,.ssd,.isd,.iid,.cid,.icd\" type=\"file\"></input>"], ["<input multiple @change=",
            " id=\"importied-plugin-input\" accept=\".sed,.scd,.ssd,.isd,.iid,.cid,.icd\" type=\"file\"></input>"])), function (event) {
            _this.onLoadFiles(event);
            event.target.value = '';
        });
    };
    ImportingIedPlugin.prototype.buildIedSelection = function (importDoc, fileName) {
        var _this = this;
        var _a;
        this.iedSelection.push(lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<mwc-dialog data-file=\"", "\">\n      <filtered-list hasSlot multi>\n        ", "\n        <mwc-icon-button slot=\"meta\" icon=\"edit\"></mwc-icon-button>\n      </filtered-list>\n      <mwc-button\n        dialogAction=\"close\"\n        label=\"", "\"\n        slot=\"secondaryAction\"\n        style=\"--mdc-theme-primary: var(--mdc-theme-error)\"\n      ></mwc-button>\n      <mwc-button\n        label=\"IEDs\"\n        slot=\"primaryAction\"\n        icon=\"add\"\n        @click=", "\n      ></mwc-button>\n    </mwc-dialog>"], ["<mwc-dialog data-file=\"", "\">\n      <filtered-list hasSlot multi>\n        ",
            "\n        <mwc-icon-button slot=\"meta\" icon=\"edit\"></mwc-icon-button>\n      </filtered-list>\n      <mwc-button\n        dialogAction=\"close\"\n        label=\"", "\"\n        slot=\"secondaryAction\"\n        style=\"--mdc-theme-primary: var(--mdc-theme-error)\"\n      ></mwc-button>\n      <mwc-button\n        label=\"IEDs\"\n        slot=\"primaryAction\"\n        icon=\"add\"\n        @click=", "\n      ></mwc-button>\n    </mwc-dialog>"])), fileName, Array.from((_a = importDoc === null || importDoc === void 0 ? void 0 : importDoc.querySelectorAll(':root > IED')) !== null && _a !== void 0 ? _a : []).map(function (ied) {
            return lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<mwc-check-list-item value=\"", "\"\n              >", "</mwc-check-list-item\n            >"], ["<mwc-check-list-item value=\"", "\"\n              >", "</mwc-check-list-item\n            >"])), foundation_js_1.identity(ied), ied.getAttribute('name'));
        }), lit_translate_1.translate('close'), function () { return _this.importIEDs(importDoc, fileName); }));
    };
    ImportingIedPlugin.prototype.render = function () {
        return lit_element_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["", "", ""], ["", "", ""])), this.iedSelection, this.renderInput());
    };
    ImportingIedPlugin.styles = lit_element_1.css(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    input {\n      width: 0;\n      height: 0;\n      opacity: 0;\n    }\n  "], ["\n    input {\n      width: 0;\n      height: 0;\n      opacity: 0;\n    }\n  "])));
    __decorate([
        lit_element_1.property({ attribute: false })
    ], ImportingIedPlugin.prototype, "doc");
    __decorate([
        lit_element_1.property({ type: Number })
    ], ImportingIedPlugin.prototype, "editCount");
    __decorate([
        lit_element_1.state()
    ], ImportingIedPlugin.prototype, "iedSelection");
    __decorate([
        lit_element_1.query('#importied-plugin-input')
    ], ImportingIedPlugin.prototype, "pluginFileUI");
    __decorate([
        lit_element_1.query('mwc-dialog')
    ], ImportingIedPlugin.prototype, "dialog");
    return ImportingIedPlugin;
}(lit_element_1.LitElement));
exports["default"] = ImportingIedPlugin;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
