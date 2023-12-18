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
exports.__esModule = true;
exports.SitipeBay = void 0;
var lit_element_1 = require("lit-element");
require("@material/mwc-menu");
require("@material/mwc-list");
require("@material/mwc-icon");
require("@material/mwc-icon-button");
var foundation_js_1 = require("open-scd/src/foundation.js");
require("open-scd/src/action-pane.js");
require("open-scd/src/action-icon.js");
var foundation_js_2 = require("./foundation.js");
var sitipe_service_js_1 = require("./sitipe-service.js");
var sitipe_substation_js_1 = require("./sitipe-substation.js");
var lit_translate_1 = require("lit-translate");
var references_js_1 = require("open-scd/src/wizards/foundation/references.js");
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
/** [[`Sitipe`]] plugin subeditor for editing `Sitipe` configuration. */
var SitipeBay = /** @class */ (function (_super) {
    __extends(SitipeBay, _super);
    function SitipeBay() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bayTypicals = [];
        _this.editCount = -1;
        _this.namingStrategy = sitipe_substation_js_1.defaultNamingStrategy;
        return _this;
    }
    SitipeBay.prototype.bayHeader = function () {
        var _a;
        var name = (_a = this.bay.getAttribute('name')) !== null && _a !== void 0 ? _a : '';
        var desc = this.bay.getAttribute('desc');
        return name + " " + (desc ? "(" + desc + ")" : '');
    };
    SitipeBay.prototype.updated = function () {
        if (this.menu && this.iconButton) {
            this.menu.anchor = this.iconButton;
        }
    };
    Object.defineProperty(SitipeBay.prototype, "bayTypicalTemplate", {
        get: function () {
            var _a, _b;
            return ((_b = (_a = this.bay.querySelector("Private[type=\"" + foundation_js_2.SIEMENS_SITIPE_BAY_TEMPLATE + "\"]")) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : '');
        },
        enumerable: false,
        configurable: true
    });
    SitipeBay.prototype.renderIEDs = function () {
        var _this = this;
        var _a;
        return lit_element_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n      <div>\n        ", "\n      </div>\n    "], ["\n      <div>\n        ",
            "\n      </div>\n    "])), Array.from(this.bay.querySelectorAll((_a = "Private[type=\"" + foundation_js_2.SIEMENS_SITIPE_IED_REF + "\"]") !== null && _a !== void 0 ? _a : [])).map(function (iedTemplate) {
            return lit_element_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<action-icon\n              .label=", "\n              icon=\"developer_board\"\n            ></action-icon>"], ["<action-icon\n              .label=",
                "\n              icon=\"developer_board\"\n            ></action-icon>"])), iedTemplate.textContent
                ? iedTemplate.textContent + " (" + _this.bayTypicalTemplate + ")"
                : '');
        }));
    };
    SitipeBay.prototype.renderMenu = function () {
        var _this = this;
        return lit_element_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<mwc-menu\n      class=\"actions-menu\"\n      corner=\"BOTTOM_RIGHT\"\n      menuCorner=\"END\"\n    >\n      ", "\n    </mwc-menu>"], ["<mwc-menu\n      class=\"actions-menu\"\n      corner=\"BOTTOM_RIGHT\"\n      menuCorner=\"END\"\n    >\n      ",
            "\n    </mwc-menu>"])), this.bayTypicals.map(function (bayTypical) {
            return lit_element_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<mwc-list-item\n          @click=", "\n          .disabled=", "\n          >", "</mwc-list-item\n        >"], ["<mwc-list-item\n          @click=", "\n          .disabled=", "\n          >", "</mwc-list-item\n        >"])), function () { return _this.handleSelected(bayTypical); }, _this.isDisabled(bayTypical), bayTypical.name);
        }));
    };
    SitipeBay.prototype.render = function () {
        var _this = this;
        return lit_element_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<action-pane label=\"", "\">\n      <abbr slot=\"action\" title=\"Add\" style=\"position:relative;\">\n        <mwc-icon-button\n          icon=\"playlist_add\"\n          @click=\"", "\"\n        ></mwc-icon-button>\n        ", "\n      </abbr>\n      ", "</action-pane\n    >"], ["<action-pane label=\"", "\">\n      <abbr slot=\"action\" title=\"Add\" style=\"position:relative;\">\n        <mwc-icon-button\n          icon=\"playlist_add\"\n          @click=\"",
            "\"\n        ></mwc-icon-button>\n        ", "\n      </abbr>\n      ", "</action-pane\n    >"])), this.bayHeader(), function () {
            _this.menu.open = true;
        }, this.renderMenu(), this.renderIEDs());
    };
    SitipeBay.prototype.isDisabled = function (bayTypical) {
        return bayTypical.name === this.bayTypicalTemplate;
    };
    SitipeBay.prototype.handleSelected = function (bayTypical) {
        var _this = this;
        var complexAction = {
            actions: [],
            title: 'Sitipe'
        };
        var bayTypicalElement = foundation_js_1.createElement(this.doc, 'Private', {
            type: foundation_js_2.SIEMENS_SITIPE_BAY_TEMPLATE
        });
        bayTypicalElement.textContent = bayTypical.name;
        complexAction.actions.push({
            "new": {
                parent: this.bay,
                element: bayTypicalElement
            }
        });
        sitipe_service_js_1.getBayTypicalComponents(bayTypical.accessId).then(function (btComponents) {
            btComponents.forEach(function (btComponent, index) {
                var iedRefElement = foundation_js_1.createElement(_this.doc, 'Private', {
                    type: foundation_js_2.SIEMENS_SITIPE_IED_REF
                });
                var iedName = _this.namingStrategy(_this.bay, index + 1);
                iedRefElement.textContent = iedName;
                complexAction.actions.push({
                    "new": {
                        parent: _this.bay,
                        element: iedRefElement
                    }
                });
                sitipe_service_js_1.getImportedBtComponents(btComponent.accessId).then(function (res) {
                    res.forEach(function (importedBTComponent) {
                        sitipe_service_js_1.getImportedBTComponentData(importedBTComponent.id).then(function (data) {
                            var doc = new DOMParser().parseFromString(data.data, 'application/xml');
                            if (_this.isValidDoc(doc)) {
                                _this.prepareImport(doc, iedName, btComponent);
                            }
                        });
                    });
                });
            });
            _this.dispatchEvent(foundation_js_1.newActionEvent(complexAction));
        });
    };
    SitipeBay.prototype.isValidDoc = function (doc) {
        if (!doc) {
            this.dispatchEvent(foundation_js_1.newLogEvent({
                kind: 'error',
                title: lit_translate_1.get('import.log.loaderror')
            }));
            return false;
        }
        if (doc.querySelector('parsererror')) {
            this.dispatchEvent(foundation_js_1.newLogEvent({
                kind: 'error',
                title: lit_translate_1.get('import.log.parsererror')
            }));
            return false;
        }
        return true;
    };
    SitipeBay.prototype.getIeds = function (doc) {
        return Array.from(doc.querySelectorAll(':root > IED'));
    };
    SitipeBay.prototype.prepareImport = function (doc, iedName, btComponent) {
        var ieds = this.getIeds(doc);
        if (!ieds.length) {
            this.dispatchEvent(foundation_js_1.newLogEvent({
                kind: 'error',
                title: lit_translate_1.get('import.log.missingied')
            }));
            return;
        }
        if (ieds.length > 1) {
            return;
        }
        var ied = ieds[0];
        var oldIEDName = ied.getAttribute('name') || '';
        this.importIED(ied);
        ied.setAttribute('name', iedName);
        if (iedName || oldIEDName) {
            var privateIEDRef = foundation_js_1.createElement(this.doc, 'Private', {
                type: foundation_js_2.SIEMENS_SITIPE_IED_TEMPLATE_REF
            });
            privateIEDRef.textContent = btComponent.name || oldIEDName;
            var actions = [];
            actions.push({
                "new": {
                    parent: ied,
                    element: privateIEDRef
                }
            });
            actions.push.apply(actions, references_js_1.updateReferences(ied, oldIEDName, iedName));
            this.dispatchEvent(foundation_js_1.newActionEvent({
                title: lit_translate_1.get('editing.import', { name: ied.getAttribute('name') }),
                actions: actions
            }));
        }
        return;
    };
    SitipeBay.prototype.importIED = function (ied) {
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
    __decorate([
        lit_element_1.property({ attribute: false })
    ], SitipeBay.prototype, "doc");
    __decorate([
        lit_element_1.property({ attribute: false })
    ], SitipeBay.prototype, "bay");
    __decorate([
        lit_element_1.property()
    ], SitipeBay.prototype, "bayTypicals");
    __decorate([
        lit_element_1.property({
            type: Number
        })
    ], SitipeBay.prototype, "editCount");
    __decorate([
        lit_element_1.property()
    ], SitipeBay.prototype, "namingStrategy");
    __decorate([
        lit_element_1.state()
    ], SitipeBay.prototype, "bayHeader");
    __decorate([
        lit_element_1.query('mwc-menu')
    ], SitipeBay.prototype, "menu");
    __decorate([
        lit_element_1.query('mwc-icon-button[icon="playlist_add"]')
    ], SitipeBay.prototype, "iconButton");
    SitipeBay = __decorate([
        lit_element_1.customElement('sitipe-bay')
    ], SitipeBay);
    return SitipeBay;
}(lit_element_1.LitElement));
exports.SitipeBay = SitipeBay;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
