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
require("../../../mock-open-scd.js");
var ImportIEDs_js_1 = require("../../../../src/menu/ImportIEDs.js");
describe('ImportIedsPlugin', function () {
    customElements.define('import-ied-plugin', ImportIEDs_js_1["default"]);
    describe('imports valid ied elements to empty projects', function () {
        var doc;
        var importDoc;
        var parent;
        var element;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/importieds/emptyproject.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [4 /*yield*/, fetch('/test/testfiles/importieds/valid.iid')
                                .then(function (response) { return response.text(); })
                                .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 2:
                        importDoc = _a.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<mock-open-scd\n          ><import-ied-plugin .doc=", "></import-ied-plugin\n        ></mock-open-scd>"], ["<mock-open-scd\n          ><import-ied-plugin .doc=", "></import-ied-plugin\n        ></mock-open-scd>"])), doc))];
                    case 3:
                        parent = _a.sent();
                        element = parent.getActivePlugin();
                        return [4 /*yield*/, parent.updateComplete];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('loads ied element to the project', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        testing_1.expect((_a = element.doc) === null || _a === void 0 ? void 0 : _a.querySelector(':root > IED[name="TestImportIED"]')).to
                            .not.exist;
                        element.prepareImport(importDoc, 'valid.iid');
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _c.sent();
                        testing_1.expect((_b = element.doc) === null || _b === void 0 ? void 0 : _b.querySelector(':root > IED[name="TestImportIED"]')).to
                            .exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('adds the connectedap of the imported ied', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element.prepareImport(importDoc, 'valid.iid');
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _a.sent();
                        testing_1.expect(element.doc.querySelector('SubNetwork[name="NewSubNetwork"] > ConnectedAP[iedName="TestImportIED"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('creates new subnetwork if not present in the doc', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(element.doc.querySelector('SubNetwork[name="NewSubNetwork"]')).to
                            .not.exist;
                        element.prepareImport(importDoc, 'valid.iid');
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _a.sent();
                        testing_1.expect(element.doc.querySelector('SubNetwork[name="NewSubNetwork"]')).to
                            .exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('renames TEMPLATE IED element if manufacturer/type has illegal characters', function () { return __awaiter(void 0, void 0, void 0, function () {
            var ied;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/importieds/template.icd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        importDoc = _d.sent();
                        ied = importDoc.querySelector('IED');
                        ied.setAttribute('manufacturer', 'Fancy-Vendy');
                        ied.setAttribute('type', 'Z#Mega$Y');
                        return [4 /*yield*/, element.updateComplete];
                    case 2:
                        _d.sent();
                        element.prepareImport(importDoc, 'template.icd');
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _d.sent();
                        console.log((_b = (_a = element.doc) === null || _a === void 0 ? void 0 : _a.querySelector(':root > IED')) === null || _b === void 0 ? void 0 : _b.getAttribute('name'));
                        testing_1.expect((_c = element.doc) === null || _c === void 0 ? void 0 : _c.querySelector(':root > IED[name="FancyVendy_ZMegaY_001"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('allows multiple import of TEMPLATE IEDs', function () { return __awaiter(void 0, void 0, void 0, function () {
            var templateIED1, templateIED2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/importieds/template.icd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        templateIED1 = _a.sent();
                        element.prepareImport(templateIED1, 'template.icd');
                        return [4 /*yield*/, fetch('/test/testfiles/importieds/template.icd')
                                .then(function (response) { return response.text(); })
                                .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 2:
                        templateIED2 = _a.sent();
                        return [4 /*yield*/, element.updateComplete];
                    case 3:
                        _a.sent();
                        element.prepareImport(templateIED2, 'template.icd');
                        return [4 /*yield*/, parent.updateComplete];
                    case 4:
                        _a.sent();
                        testing_1.expect(element.doc.querySelector('IED[name="FancyVendy_ZMegaY_001"]')).to
                            .exist;
                        testing_1.expect(element.doc.querySelector('IED[name="FancyVendy_ZMegaY_002"]')).to
                            .exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('imports the ConnectedAPs for a TEMPLATE IED', function () { return __awaiter(void 0, void 0, void 0, function () {
            var templateIED1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/importieds/template.icd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        templateIED1 = _b.sent();
                        element.prepareImport(templateIED1, 'template.icd');
                        return [4 /*yield*/, parent.updateComplete];
                    case 2:
                        _b.sent();
                        testing_1.expect((_a = element.doc) === null || _a === void 0 ? void 0 : _a.querySelectorAll(':root > Communication >  SubNetwork > ConnectedAP[iedName="FancyVendy_ZMegaY_001"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('loads unique lnodetypes to the project', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        testing_1.expect((_a = element.doc) === null || _a === void 0 ? void 0 : _a.querySelectorAll(':root > DataTypeTemplates >  LNodeType').length).to.equal(0);
                        element.prepareImport(importDoc, 'template.icd');
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _c.sent();
                        testing_1.expect((_b = element.doc) === null || _b === void 0 ? void 0 : _b.querySelectorAll(':root > DataTypeTemplates >  LNodeType').length).to.equal(5);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('imports valid ied elements', function () {
        var doc;
        var importDoc;
        var parent;
        var element;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<mock-open-scd\n          ><import-ied-plugin .doc=", "></import-ied-plugin\n        ></mock-open-scd>"], ["<mock-open-scd\n          ><import-ied-plugin .doc=", "></import-ied-plugin\n        ></mock-open-scd>"])), doc))];
                    case 2:
                        parent = _a.sent();
                        element = parent.getActivePlugin();
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, fetch('/test/testfiles/importieds/valid.iid')
                                .then(function (response) { return response.text(); })
                                .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 4:
                        importDoc = _a.sent();
                        return [4 /*yield*/, element.updateComplete];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('loads ied element to the project', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        testing_1.expect((_a = element.doc) === null || _a === void 0 ? void 0 : _a.querySelector(':root > IED[name="TestImportIED"]')).to
                            .not.exist;
                        element.prepareImport(importDoc, 'valid.iid');
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _c.sent();
                        testing_1.expect((_b = element.doc) === null || _b === void 0 ? void 0 : _b.querySelector(':root > IED[name="TestImportIED"]')).to
                            .exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('loads unique lnodetypes to the project', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        testing_1.expect((_a = element.doc) === null || _a === void 0 ? void 0 : _a.querySelectorAll(':root > DataTypeTemplates >  LNodeType').length).to.equal(11);
                        element.prepareImport(importDoc, 'valid.iid');
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _c.sent();
                        testing_1.expect((_b = element.doc) === null || _b === void 0 ? void 0 : _b.querySelectorAll(':root > DataTypeTemplates >  LNodeType').length).to.equal(16);
                        return [2 /*return*/];
                }
            });
        }); });
        it('loads unique dotypes to the project', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        testing_1.expect((_a = element.doc) === null || _a === void 0 ? void 0 : _a.querySelectorAll(':root > DataTypeTemplates >  DOType').length).to.equal(16);
                        element.prepareImport(importDoc, 'valid.iid');
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _c.sent();
                        testing_1.expect((_b = element.doc) === null || _b === void 0 ? void 0 : _b.querySelectorAll(':root > DataTypeTemplates >  DOType').length).to.equal(26);
                        return [2 /*return*/];
                }
            });
        }); });
        it('loads unique datypes to the project', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        testing_1.expect((_a = element.doc) === null || _a === void 0 ? void 0 : _a.querySelectorAll(':root > DataTypeTemplates >  DAType').length).to.equal(7);
                        element.prepareImport(importDoc, 'valid.iid');
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _c.sent();
                        testing_1.expect((_b = element.doc) === null || _b === void 0 ? void 0 : _b.querySelectorAll(':root > DataTypeTemplates >  DAType').length).to.equal(11);
                        return [2 /*return*/];
                }
            });
        }); });
        it('loads unique enumtypes to the project', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        testing_1.expect((_a = element.doc) === null || _a === void 0 ? void 0 : _a.querySelectorAll(':root > DataTypeTemplates >  EnumType').length).to.equal(4);
                        element.prepareImport(importDoc, 'valid.iid');
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _c.sent();
                        testing_1.expect((_b = element.doc) === null || _b === void 0 ? void 0 : _b.querySelectorAll(':root > DataTypeTemplates >  EnumType').length).to.equal(10);
                        return [2 /*return*/];
                }
            });
        }); });
        it('adds the connectedap of the imported ied', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        testing_1.expect(element.doc.querySelector('ConnectedAP[iedName="TestImportIED"]'))
                            .to.not.exist;
                        element.prepareImport(importDoc, 'valid.iid');
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _b.sent();
                        testing_1.expect(element.doc.querySelector('ConnectedAP[iedName="TestImportIED"]'))
                            .to.exist;
                        testing_1.expect((_a = element.doc.querySelector('ConnectedAP[iedName="TestImportIED"]')) === null || _a === void 0 ? void 0 : _a.parentElement).to.equal(element.doc.querySelector('SubNetwork[name="NewSubNetwork"]'));
                        return [2 /*return*/];
                }
            });
        }); });
        it('creates new subnetwork if not present in the doc', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(element.doc.querySelector('SubNetwork[name="NewSubNetwork"]')).to
                            .not.exist;
                        element.prepareImport(importDoc, 'valid.iid');
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _a.sent();
                        testing_1.expect(element.doc.querySelector('SubNetwork[name="NewSubNetwork"]')).to
                            .exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('correctly transfers document element namespaces', function () { return __awaiter(void 0, void 0, void 0, function () {
            var output, lineFeedAndSpacesReplace;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        element.prepareImport(importDoc, 'valid.iid');
                        return [4 /*yield*/, parent.updateComplete];
                    case 1:
                        _a.sent();
                        testing_1.expect(element.doc.querySelector('SCL').getAttribute('xmlns:eTest1')).to.equal('http://www.eTest1.com/2022/Better61850');
                        testing_1.expect(element.doc.querySelector('SCL').getAttribute('xmlns:eTest2')).to.equal('http://www.eTest2.com/2032/Better61850ForReal');
                        output = new XMLSerializer().serializeToString(element.doc);
                        testing_1.expect(output).to.contain('xmlns:eTest1="http://www.eTest1.com/2022/Better61850"');
                        testing_1.expect(output).to.contain('xmlns:eTest2="http://www.eTest2.com/2032/Better61850ForReal"');
                        lineFeedAndSpacesReplace = /[\s\n\r]+/g;
                        testing_1.expect(output.replace(lineFeedAndSpacesReplace, '')).to.include("<IED name=\"TestImportIED\" type=\"TestType\" manufacturer=\"TestMan\" originalSclVersion=\"2007\" originalSclRevision=\"B\" originalRelease=\"4\" eTest2:New=\"fancy new attribute\">\n<eTest1:NewThing>\n    <P type=\"solution\"/>\n</eTest1:NewThing>".replace(lineFeedAndSpacesReplace, ''));
                        return [2 /*return*/];
                }
            });
        }); });
        it('allows multiple import of TEMPLATE IEDs', function () { return __awaiter(void 0, void 0, void 0, function () {
            var templateIED1, templateIED2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        testing_1.expect(element.doc.querySelectorAll('IED').length).to.equal(3);
                        return [4 /*yield*/, fetch('/test/testfiles/importieds/template.icd')
                                .then(function (response) { return response.text(); })
                                .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        templateIED1 = _a.sent();
                        element.prepareImport(templateIED1, 'template.icd');
                        return [4 /*yield*/, fetch('/test/testfiles/importieds/template.icd')
                                .then(function (response) { return response.text(); })
                                .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 2:
                        templateIED2 = _a.sent();
                        element.prepareImport(templateIED2, 'template.icd');
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _a.sent();
                        testing_1.expect(element.doc.querySelector('IED[name="FancyVendy_ZMegaY_001"]')).to
                            .exist;
                        testing_1.expect(element.doc.querySelector('IED[name="FancyVendy_ZMegaY_002"]')).to
                            .exist;
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders wizard for files containing more than one IED', function () { return __awaiter(void 0, void 0, void 0, function () {
            var multipleIedDoc;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/importieds/multipleied.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        multipleIedDoc = _b.sent();
                        element.prepareImport(multipleIedDoc, 'multipleied.scd');
                        return [4 /*yield*/, element.updateComplete];
                    case 2:
                        _b.sent();
                        testing_1.expect(element.dialog).to.exist;
                        testing_1.expect(element.dialog.open).to.be["true"];
                        testing_1.expect((_a = element.dialog) === null || _a === void 0 ? void 0 : _a.querySelectorAll('mwc-check-list-item').length).to.equal(3);
                        return [2 /*return*/];
                }
            });
        }); });
        it('imports selected IEDs from Import IED wizard', function () { return __awaiter(void 0, void 0, void 0, function () {
            var multipleIedDoc;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/importieds/multipleied.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        multipleIedDoc = _b.sent();
                        element.prepareImport(multipleIedDoc, 'multipleied.scd');
                        return [4 /*yield*/, element.updateComplete];
                    case 2:
                        _b.sent();
                        (element.dialog.querySelectorAll('mwc-check-list-item')[1]).setAttribute('selected', 'true');
                        (element.dialog.querySelectorAll('mwc-check-list-item')[2]).setAttribute('selected', 'true');
                        return [4 /*yield*/, element.dialog.updateComplete];
                    case 3:
                        _b.sent();
                        ((_a = element.dialog) === null || _a === void 0 ? void 0 : _a.querySelector('mwc-button[slot="primaryAction"]')).click();
                        return [4 /*yield*/, parent.updateComplete];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, element.requestUpdate()];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 6:
                        _b.sent(); // await complex action
                        testing_1.expect(element.doc.querySelectorAll('IED[name="IED3"]').length).to.equal(1);
                        testing_1.expect(element.doc.querySelector('IED[name="IED4"]')).to.exist;
                        testing_1.expect(element.doc.querySelector('IED[name="IED5"]')).to.exist;
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('importing invalid ieds', function () {
        var doc;
        var importDoc;
        var parent;
        var element;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<mock-open-scd\n        ><import-ied-plugin .doc=", "></import-ied-plugin\n      ></mock-open-scd>"], ["<mock-open-scd\n        ><import-ied-plugin .doc=", "></import-ied-plugin\n      ></mock-open-scd>"])), doc))];
                    case 2:
                        parent = _a.sent();
                        element = parent.getActivePlugin();
                        return [4 /*yield*/, parent.updateComplete];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('throws missing ied elements error', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/importieds/invalid.iid')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        importDoc = _a.sent();
                        element.prepareImport(importDoc, 'invalid.iid');
                        testing_1.expect(parent.log[0].kind).to.equal('error');
                        testing_1.expect(parent.log[0].title).to.equal('[import.log.missingied]');
                        return [2 /*return*/];
                }
            });
        }); });
        it('throws duplicate ied name error', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/importieds/duplicate.iid')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        importDoc = _a.sent();
                        element.prepareImport(importDoc, 'duplicate.iid');
                        testing_1.expect(parent.log[0].kind).to.equal('error');
                        testing_1.expect(parent.log[0].title).to.equal('[import.log.nouniqueied]');
                        return [2 /*return*/];
                }
            });
        }); });
        it('throws parser error', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/importieds/parsererror.iid')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        importDoc = _a.sent();
                        return [4 /*yield*/, element.updateComplete];
                    case 2:
                        _a.sent();
                        element.prepareImport(importDoc, 'parsererror.iid');
                        testing_1.expect(parent.log[0].kind).to.equal('error');
                        testing_1.expect(parent.log[0].title).to.equal('[import.log.parsererror]');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
var templateObject_1, templateObject_2, templateObject_3;
