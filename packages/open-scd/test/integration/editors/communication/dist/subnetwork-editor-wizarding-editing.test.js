"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
var testing_1 = require("@open-wc/testing");
require("../../../mock-wizard-editor.js");
require("../../../../src/editors/communication/subnetwork-editor.js");
describe('subnetwork-editor wizarding editing integration', function () {
    describe('edit wizard', function () {
        var doc;
        var parent;
        var element;
        var nameField;
        var descField;
        var typeField;
        var bitRateField;
        var primaryAction;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _g.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-wizard-editor\n            ><subnetwork-editor\n              .doc=", "\n              .element=", "\n            ></subnetwork-editor>\n          </mock-wizard-editor>"], ["<mock-wizard-editor\n            ><subnetwork-editor\n              .doc=", "\n              .element=", "\n            ></subnetwork-editor>\n          </mock-wizard-editor>"])), doc, doc.querySelector('SubNetwork')))];
                    case 2:
                        parent = (_g.sent());
                        element = parent.querySelector('subnetwork-editor');
                        return [4 /*yield*/, ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="edit"]')).click()];
                    case 3:
                        _g.sent();
                        return [4 /*yield*/, parent.updateComplete];
                    case 4:
                        _g.sent();
                        nameField = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('wizard-textfield[label="name"]'));
                        descField = ((_c = parent.wizardUI.dialog) === null || _c === void 0 ? void 0 : _c.querySelector('wizard-textfield[label="desc"]'));
                        typeField = ((_d = parent.wizardUI.dialog) === null || _d === void 0 ? void 0 : _d.querySelector('wizard-textfield[label="type"]'));
                        bitRateField = ((_e = parent.wizardUI.dialog) === null || _e === void 0 ? void 0 : _e.querySelector('wizard-textfield[label="BitRate"]'));
                        primaryAction = ((_f = parent.wizardUI.dialog) === null || _f === void 0 ? void 0 : _f.querySelector('mwc-button[slot="primaryAction"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('closes on secondary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = parent.wizardUI.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="secondaryAction"]')).click()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _b.sent(); // await animation
                        testing_1.expect(parent.wizardUI.dialog).to.not.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('does not change name attribute if not unique within parent element', function () { return __awaiter(void 0, void 0, void 0, function () {
            var oldName;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        oldName = nameField.value;
                        nameField.value = 'ProcessBus';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('SubNetwork')) === null || _a === void 0 ? void 0 : _a.getAttribute('name')).to.equal(oldName);
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes name attribute on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        nameField.value = 'newSubNetwork';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('SubNetwork')) === null || _a === void 0 ? void 0 : _a.getAttribute('name')).to.equal('newSubNetwork');
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes desc attribute on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        descField.value = 'newDesc';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('SubNetwork')) === null || _a === void 0 ? void 0 : _a.getAttribute('desc')).to.equal('newDesc');
                        return [2 /*return*/];
                }
            });
        }); });
        it('deletes desc attribute if wizard-textfield is deactivated', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        _b.sent(); // await animation
                        descField.nullSwitch.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _b.sent();
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('SubNetwork')) === null || _a === void 0 ? void 0 : _a.getAttribute('desc')).to.be["null"];
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes type attribute on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        typeField.value = 'newType';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('SubNetwork')) === null || _a === void 0 ? void 0 : _a.getAttribute('type')).to.equal('newType');
                        return [2 /*return*/];
                }
            });
        }); });
        it('deletes type attribute if wizard-textfield is deactivated', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        _b.sent(); // await animation
                        typeField.nullSwitch.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _b.sent();
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('SubNetwork')) === null || _a === void 0 ? void 0 : _a.getAttribute('type')).to.be["null"];
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes BitRate value on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        bitRateField.value = '20.0';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('BitRate')) === null || _a === void 0 ? void 0 : _a.innerHTML).to.equal('20.0');
                        return [2 /*return*/];
                }
            });
        }); });
        it('changes BitRate multiplier on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        bitRateField.multiplier = 'M';
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _c.sent();
                        testing_1.expect((_a = doc.querySelector('BitRate')) === null || _a === void 0 ? void 0 : _a.getAttribute('multiplier')).to.equal('M');
                        testing_1.expect((_b = doc.querySelector('BitRate')) === null || _b === void 0 ? void 0 : _b.getAttribute('unit')).to.equal('b/s');
                        return [2 /*return*/];
                }
            });
        }); });
        it('deletes BitRate element if voltage wizard-textfield is deactivated', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 1:
                        _b.sent(); // await animation
                        bitRateField.nullSwitch.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _b.sent();
                        primaryAction.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _b.sent();
                        testing_1.expect((_a = doc.querySelector('SubNetwork')) === null || _a === void 0 ? void 0 : _a.querySelector('BitRate')).to.be["null"];
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('remove action', function () {
        var doc;
        var parent;
        var element;
        var deleteButton;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _b.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<mock-wizard-editor\n            ><subnetwork-editor\n              .doc=", "\n              .element=", "\n            ></subnetwork-editor\n          ></mock-wizard-editor>"], ["<mock-wizard-editor\n            ><subnetwork-editor\n              .doc=", "\n              .element=", "\n            ></subnetwork-editor\n          ></mock-wizard-editor>"])), doc, doc.querySelector('SubNetwork[name="StationBus"]')))];
                    case 2:
                        parent = (_b.sent());
                        element = parent.querySelector('subnetwork-editor');
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _b.sent();
                        deleteButton = ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="delete"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('removes SubNetwork on clicking delete button', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(doc.querySelector('SubNetwork[name="StationBus"]')).to.exist;
                        deleteButton.click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _a.sent();
                        testing_1.expect(doc.querySelector('SubNetwork[name="StationBus"]')).to.not.exist;
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('add ConnectedAP action', function () {
        var doc;
        var parent;
        var element;
        var newConnectedAPItem;
        var primaryAction;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<mock-wizard-editor\n            ><subnetwork-editor\n              .doc=", "\n              .element=", "\n            ></subnetwork-editor\n          ></mock-wizard-editor>"], ["<mock-wizard-editor\n            ><subnetwork-editor\n              .doc=", "\n              .element=", "\n            ></subnetwork-editor\n          ></mock-wizard-editor>"])), doc, doc.querySelector('SubNetwork[name="StationBus"]')))];
                    case 2:
                        parent = (_a.sent());
                        element = parent.querySelector('subnetwork-editor');
                        return [2 /*return*/];
                }
            });
        }); });
        it('adds ConnectedAP on primary action', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="playlist_add"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 1:
                        _c.sent();
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, (element === null || element === void 0 ? void 0 : element.updateComplete)];
                    case 3:
                        _c.sent();
                        newConnectedAPItem = (parent.wizardUI.dialog.querySelector('mwc-check-list-item:nth-child(1)'));
                        primaryAction = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-button[slot="primaryAction"]'));
                        testing_1.expect(doc.querySelector(':root > Communication > SubNetwork[name="StationBus"] > ConnectedAP[iedName="IED3"][apName="P2"]')).to.not.exist;
                        newConnectedAPItem.click();
                        primaryAction.click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, parent.updateComplete];
                    case 5:
                        _c.sent();
                        testing_1.expect(doc.querySelector(':root > Communication > SubNetwork[name="StationBus"] > ConnectedAP[iedName="IED3"][apName="P2"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('add ConnectedAP with GSE and generates correct addresses', function () { return __awaiter(void 0, void 0, void 0, function () {
            var connectedAp, gse1, gse2, address1, vlanPriority, vlanId, appId, mac, minTime, maxTime;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/editors/MessageBindingGOOSE2007B4.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _c.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<mock-wizard-editor\n            ><subnetwork-editor\n              .doc=", "\n              .element=", "\n            ></subnetwork-editor\n          ></mock-wizard-editor>"], ["<mock-wizard-editor\n            ><subnetwork-editor\n              .doc=", "\n              .element=", "\n            ></subnetwork-editor\n          ></mock-wizard-editor>"])), doc, doc.querySelector('SubNetwork[name="StationBus"]')))];
                    case 2:
                        parent = (_c.sent());
                        element = parent.querySelector('subnetwork-editor');
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, (element === null || element === void 0 ? void 0 : element.updateComplete)];
                    case 4:
                        _c.sent();
                        ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="playlist_add"]')).click();
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 5:
                        _c.sent();
                        return [4 /*yield*/, parent.updateComplete];
                    case 6:
                        _c.sent();
                        return [4 /*yield*/, (element === null || element === void 0 ? void 0 : element.updateComplete)];
                    case 7:
                        _c.sent();
                        testing_1.expect(doc.querySelector(':root > Communication > SubNetwork[name="StationBus"] > ConnectedAP[iedName="IED4"][apName="P1"]')).to.not.exist;
                        newConnectedAPItem = (parent.wizardUI.dialog.querySelector('mwc-check-list-item:nth-child(2)'));
                        primaryAction = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-button[slot="primaryAction"]'));
                        newConnectedAPItem.click();
                        primaryAction.click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                    case 8:
                        _c.sent(); // await animation
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 9:
                        _c.sent();
                        return [4 /*yield*/, parent.updateComplete];
                    case 10:
                        _c.sent();
                        connectedAp = doc.querySelector(':root > Communication > SubNetwork[name="StationBus"] > ConnectedAP[iedName="IED4"][apName="P1"]');
                        testing_1.expect(connectedAp).to.exist;
                        gse1 = connectedAp.querySelector('GSE[cbName="GCB2"]');
                        gse2 = connectedAp.querySelector('GSE[cbName="GCB2"]');
                        testing_1.expect(gse1).to.exist;
                        testing_1.expect(gse2).to.exist;
                        testing_1.expect(gse1 === null || gse1 === void 0 ? void 0 : gse1.getAttribute('ldInst')).to.equal('CircuitBreaker_CB1');
                        address1 = gse1 === null || gse1 === void 0 ? void 0 : gse1.querySelector('Address');
                        testing_1.expect(address1).to.exist;
                        vlanPriority = address1 === null || address1 === void 0 ? void 0 : address1.querySelector('P[type="VLAN-PRIORITY"]');
                        testing_1.expect(vlanPriority).to.exist;
                        testing_1.expect(vlanPriority === null || vlanPriority === void 0 ? void 0 : vlanPriority.textContent).to.equal('4');
                        vlanId = address1 === null || address1 === void 0 ? void 0 : address1.querySelector('P[type="VLAN-ID"]');
                        testing_1.expect(vlanId).to.exist;
                        testing_1.expect(vlanId === null || vlanId === void 0 ? void 0 : vlanId.textContent).to.equal('000');
                        appId = address1 === null || address1 === void 0 ? void 0 : address1.querySelector('P[type="APPID"]');
                        testing_1.expect(appId).to.exist;
                        testing_1.expect(appId === null || appId === void 0 ? void 0 : appId.textContent).to.equal('0001');
                        mac = address1 === null || address1 === void 0 ? void 0 : address1.querySelector('P[type="MAC-Address"]');
                        testing_1.expect(mac).to.exist;
                        testing_1.expect(mac === null || mac === void 0 ? void 0 : mac.textContent).to.equal('01-0C-CD-01-00-01');
                        minTime = gse1 === null || gse1 === void 0 ? void 0 : gse1.querySelector('MinTime');
                        testing_1.expect(minTime).to.exist;
                        testing_1.expect(minTime === null || minTime === void 0 ? void 0 : minTime.getAttribute('unit')).to.equal('s');
                        testing_1.expect(minTime === null || minTime === void 0 ? void 0 : minTime.getAttribute('multiplier')).to.equal('m');
                        testing_1.expect(minTime === null || minTime === void 0 ? void 0 : minTime.textContent).to.equal('10');
                        maxTime = gse1 === null || gse1 === void 0 ? void 0 : gse1.querySelector('MaxTime');
                        testing_1.expect(maxTime).to.exist;
                        testing_1.expect(maxTime === null || maxTime === void 0 ? void 0 : maxTime.getAttribute('unit')).to.equal('s');
                        testing_1.expect(maxTime === null || maxTime === void 0 ? void 0 : maxTime.getAttribute('multiplier')).to.equal('m');
                        testing_1.expect(maxTime === null || maxTime === void 0 ? void 0 : maxTime.textContent).to.equal('10000');
                        return [2 /*return*/];
                }
            });
        }); });
        it('add ConnectedAP with SMV and generates correct addresses', function () { return __awaiter(void 0, void 0, void 0, function () {
            var connectedAp, smv1, address1, vlanPriority, vlanId, appId, mac;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/editors/MessageBindingSMV2007B4.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _c.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<mock-wizard-editor\n            ><subnetwork-editor\n              .doc=", "\n              .element=", "\n            ></subnetwork-editor\n          ></mock-wizard-editor>"], ["<mock-wizard-editor\n            ><subnetwork-editor\n              .doc=", "\n              .element=", "\n            ></subnetwork-editor\n          ></mock-wizard-editor>"])), doc, doc.querySelector('SubNetwork[name="StationBus"]')))];
                    case 2:
                        parent = (_c.sent());
                        element = parent.querySelector('subnetwork-editor');
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, (element === null || element === void 0 ? void 0 : element.updateComplete)];
                    case 4:
                        _c.sent();
                        ((_a = element === null || element === void 0 ? void 0 : element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-icon-button[icon="playlist_add"]')).click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 5:
                        _c.sent(); // await animation
                        return [4 /*yield*/, parent.updateComplete];
                    case 6:
                        _c.sent();
                        return [4 /*yield*/, (element === null || element === void 0 ? void 0 : element.updateComplete)];
                    case 7:
                        _c.sent();
                        testing_1.expect(doc.querySelector(':root > Communication > SubNetwork[name="StationBus"] > ConnectedAP[iedName="IED4"][apName="P1"]')).to.not.exist;
                        newConnectedAPItem = (parent.wizardUI.dialog.querySelector('mwc-check-list-item:nth-child(2)'));
                        primaryAction = ((_b = parent.wizardUI.dialog) === null || _b === void 0 ? void 0 : _b.querySelector('mwc-button[slot="primaryAction"]'));
                        newConnectedAPItem.click();
                        primaryAction.click();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 400); })];
                    case 8:
                        _c.sent(); // await animation
                        return [4 /*yield*/, parent.requestUpdate()];
                    case 9:
                        _c.sent();
                        return [4 /*yield*/, parent.updateComplete];
                    case 10:
                        _c.sent();
                        connectedAp = doc.querySelector(':root > Communication > SubNetwork[name="StationBus"] > ConnectedAP[iedName="IED4"][apName="P1"]');
                        testing_1.expect(connectedAp).to.exist;
                        smv1 = connectedAp.querySelector('SMV[cbName="MSVCB02"]');
                        testing_1.expect(smv1).to.exist;
                        testing_1.expect(smv1 === null || smv1 === void 0 ? void 0 : smv1.getAttribute('ldInst')).to.equal('CircuitBreaker_CB1');
                        address1 = smv1 === null || smv1 === void 0 ? void 0 : smv1.querySelector('Address');
                        testing_1.expect(address1).to.exist;
                        vlanPriority = address1 === null || address1 === void 0 ? void 0 : address1.querySelector('P[type="VLAN-PRIORITY"]');
                        testing_1.expect(vlanPriority).to.exist;
                        testing_1.expect(vlanPriority === null || vlanPriority === void 0 ? void 0 : vlanPriority.textContent).to.equal('4');
                        vlanId = address1 === null || address1 === void 0 ? void 0 : address1.querySelector('P[type="VLAN-ID"]');
                        testing_1.expect(vlanId).to.exist;
                        testing_1.expect(vlanId === null || vlanId === void 0 ? void 0 : vlanId.textContent).to.equal('000');
                        appId = address1 === null || address1 === void 0 ? void 0 : address1.querySelector('P[type="APPID"]');
                        testing_1.expect(appId).to.exist;
                        testing_1.expect(appId === null || appId === void 0 ? void 0 : appId.textContent).to.equal('4000');
                        mac = address1 === null || address1 === void 0 ? void 0 : address1.querySelector('P[type="MAC-Address"]');
                        testing_1.expect(mac).to.exist;
                        testing_1.expect(mac === null || mac === void 0 ? void 0 : mac.textContent).to.equal('01-0C-CD-04-00-00');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
