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
var Editing_js_1 = require("../../../src/Editing.js");
var Wizarding_js_1 = require("../../../src/Wizarding.js");
var Historing_js_1 = require("../../../src/Historing.js");
var GooseSubscriberMessageBinding_js_1 = require("../../../src/editors/GooseSubscriberMessageBinding.js");
describe('GOOSE subscriber plugin', function () {
    customElements.define('subscription-plugin', Wizarding_js_1.Wizarding(Editing_js_1.Editing(Historing_js_1.Historing(GooseSubscriberMessageBinding_js_1["default"]))));
    var element;
    var doc;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/editors/MessageBindingGOOSE2007B4.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    doc = _a.sent();
                    return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<subscription-plugin .doc=", "></subscription-plugin>"], ["<subscription-plugin .doc=", "></subscription-plugin>"])), doc))];
                case 2:
                    element = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('in Publisher view', function () {
        describe('per default', function () {
            describe('the plugin itself', function () {
                it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, testing_1.expect(element).shadowDom.to.equalSnapshot()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('the right hand side GSEControl list', function () {
                it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, testing_1.expect((_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('goose-list')).shadowDom.to.equalSnapshot()];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('the left hand side subscriber IED list', function () {
                it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, testing_1.expect(getSubscriberList()).shadowDom.to.equalSnapshot()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('with a selected GOOSE message', function () {
            var nthGSEControl = 1;
            var fCDAs;
            var gseControlBlock;
            var goose;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c, _d, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            gseControlBlock =
                                doc.querySelectorAll('GSEControl[datSet]')[nthGSEControl];
                            fCDAs = Array.from((_b = (_a = gseControlBlock.parentElement) === null || _a === void 0 ? void 0 : _a.querySelectorAll("DataSet[name=\"" + gseControlBlock.getAttribute('datSet') + "\"] > FCDA")) !== null && _b !== void 0 ? _b : []);
                            goose = Array.from((_f = (_e = (_d = (_c = element.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('goose-list')) === null || _d === void 0 ? void 0 : _d.shadowRoot) === null || _e === void 0 ? void 0 : _e.querySelectorAll('mwc-list-item')) !== null && _f !== void 0 ? _f : []).filter(function (item) { return !item.noninteractive; })[nthGSEControl];
                            goose.click();
                            return [4 /*yield*/, element.updateComplete];
                        case 1:
                            _g.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            describe('the left hand side subscriber IED list', function () {
                it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, testing_1.expect(getSubscriberList()).shadowDom.to.equalSnapshot()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('for unsubscribed IEDs', function () {
                it('ExtRefs are not present in the IED', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        testing_1.expect(element.doc.querySelectorAll('IED[name="IED3"] ExtRef[iedName="IED2"]').length).to.eql(0);
                        return [2 /*return*/];
                    });
                }); });
                describe('after clicking on the IEDs list element', function () {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    getItemFromSubscriberList('IED3').click();
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    describe('the left hand side subscriber IED list', function () {
                        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(getSubscriberList()).shadowDom.to.equalSnapshot()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                    });
                    it('as many ExtRefs are added to the IED as there are FCDAs', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            testing_1.expect(element.doc.querySelectorAll('IED[name="IED3"] ExtRef[iedName="IED2"]').length).to.eql(fCDAs.length);
                            return [2 /*return*/];
                        });
                    }); });
                    it('all Ed1 attributes are added', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            fCDAs.forEach(function (fcda) {
                                return testing_1.expect(element.doc.querySelector("IED[name=\"IED3\"] ExtRef[iedName=\"IED2\"][ldInst=\"" + fcda.getAttribute('ldInst') + "\"][prefix=\"" + fcda.getAttribute('prefix') + "\"][lnClass=\"" + fcda.getAttribute('lnClass') + "\"][lnInst=\"" + fcda.getAttribute('lnInst') + "\"][doName=\"" + fcda.getAttribute('doName') + "\"][daName=\"" + fcda.getAttribute('daName') + "\"]")).to.exist;
                            });
                            return [2 /*return*/];
                        });
                    }); });
                    it('all Ed2 attributes are added properly', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            fCDAs.forEach(function (fcda) {
                                var _a, _b, _c, _d;
                                return testing_1.expect(element.doc.querySelector("IED[name=\"IED3\"] ExtRef[iedName=\"IED2\"][srcLDInst=\"" + ((_a = fcda
                                    .closest('LDevice')) === null || _a === void 0 ? void 0 : _a.getAttribute('inst')) + "\"][srcPrefix=\"" + ((_c = (_b = fcda.closest('LN0')) === null || _b === void 0 ? void 0 : _b.getAttribute('prefix')) !== null && _c !== void 0 ? _c : '' //prefix is mendatory in ExtRef!!
                                ) + "\"][srcLNClass=\"" + ((_d = fcda
                                    .closest('LN0')) === null || _d === void 0 ? void 0 : _d.getAttribute('lnClass')) + "\"][srcCBName=\"" + gseControlBlock.getAttribute('name') + "\"][serviceType=\"GOOSE\"]")).to.exist;
                            });
                            return [2 /*return*/];
                        });
                    }); });
                });
            });
            describe('for subscribed IEDs', function () {
                it('all ExtRefs are available', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        testing_1.expect(element.doc.querySelectorAll('IED[name="IED1"] ExtRef[iedName="IED2"]').length).to.eql(3);
                        return [2 /*return*/];
                    });
                }); });
                describe('after clicking on the IEDs list element', function () {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    getItemFromSubscriberList('IED1').click();
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(getSubscriberList()).shadowDom.to.equalSnapshot()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('all ExtRefs are removed from the subscriber IED', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            testing_1.expect(element.doc.querySelectorAll('IED[name="IED1"] ExtRef[iedName="IED2"]').length).to.eql(0);
                            return [2 /*return*/];
                        });
                    }); });
                });
            });
            describe('for partially subscribed IEDs', function () {
                it('some ExtRefs are available in the subscriber IED', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var extRefs;
                    return __generator(this, function (_a) {
                        extRefs = element.doc.querySelectorAll('IED[name="IED4"] > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef[iedName="IED2"],' +
                            'IED[name="IED4"] > AccessPoint > Server > LDevice > LN > Inputs > ExtRef[iedName="IED2"]');
                        testing_1.expect(extRefs.length).to.eql(2);
                        return [2 /*return*/];
                    });
                }); });
                describe('after clicking on the IEDs list element', function () {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    getItemFromSubscriberList('IED4').click();
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    it('it looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, testing_1.expect(getSubscriberList()).shadowDom.to.equalSnapshot()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    it('adds the required ExtRefs to the subscriber IED', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, testing_1.expect(element.doc.querySelectorAll('IED[name="IED4"] ExtRef[iedName="IED2"]').length).to.eql(5)];
                        });
                    }); });
                });
            });
        });
    });
    describe('in Subscriber view', function () {
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        ((_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('#gooseSubscriberView')).click();
                        return [4 /*yield*/, element.updateComplete];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        describe('per default', function () {
            describe('the plugin itsself', function () {
                it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, testing_1.expect(element).shadowDom.to.equalSnapshot()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('the right hand side IEDs list', function () {
                it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, testing_1.expect((_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('ied-list')).shadowDom.to.equalSnapshot()];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('the left hand side subscriber IED list', function () {
                it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, testing_1.expect(getSubscriberList()).shadowDom.to.equalSnapshot()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
        });
        describe('with a selected IED', function () {
            var ied;
            beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            ied = Array.from((_d = (_c = (_b = (_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('ied-list')) === null || _b === void 0 ? void 0 : _b.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelectorAll('mwc-list-item')) !== null && _d !== void 0 ? _d : []).filter(function (item) { return !item.noninteractive; })[1];
                            ied.click();
                            return [4 /*yield*/, element.updateComplete];
                        case 1:
                            _e.sent();
                            return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                        case 2:
                            _e.sent(); // await animation
                            return [2 /*return*/];
                    }
                });
            }); });
            describe('the left hand side subscriber IED list', function () {
                it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, testing_1.expect(getSubscriberList()).shadowDom.to.equalSnapshot()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
            });
            describe('for unsubscribed GSEControl s', function () {
                it('ExtRefs are not present in the subscriber IED', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        testing_1.expect(element.doc.querySelectorAll('IED[name="IED2"] ExtRef[iedName="IED4"]').length).to.eql(0);
                        return [2 /*return*/];
                    });
                }); });
                describe('clicking on a GSEControl list item', function () {
                    var fCDAs;
                    var gseControlBlock;
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var _a, _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    gseControlBlock = doc.querySelector('IED[name="IED4"] GSEControl');
                                    fCDAs = Array.from((_b = (_a = gseControlBlock.parentElement) === null || _a === void 0 ? void 0 : _a.querySelectorAll("DataSet[name=\"" + gseControlBlock.getAttribute('datSet') + "\"] > FCDA")) !== null && _b !== void 0 ? _b : []);
                                    getItemFromSubscriberList('IED4').click();
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 1:
                                    _c.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    describe('the left hand side subscriber IED list', function () {
                        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(getSubscriberList()).shadowDom.to.equalSnapshot()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                    });
                    it('all ExtRefs are present in the subscriber IED', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            testing_1.expect(element.doc.querySelectorAll('IED[name="IED2"]  ExtRef[iedName="IED4"]').length).to.eql(fCDAs.length);
                            return [2 /*return*/];
                        });
                    }); });
                    it('all Ed1 attributes are added', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            fCDAs.forEach(function (fcda) {
                                return testing_1.expect(element.doc.querySelector("IED[name=\"IED2\"] ExtRef[iedName=\"IED4\"][ldInst=\"" + fcda.getAttribute('ldInst') + "\"][prefix=\"" + fcda.getAttribute('prefix') + "\"][lnClass=\"" + fcda.getAttribute('lnClass') + "\"][lnInst=\"" + fcda.getAttribute('lnInst') + "\"][doName=\"" + fcda.getAttribute('doName') + "\"][daName=\"" + fcda.getAttribute('daName') + "\"]")).to.exist;
                            });
                            return [2 /*return*/];
                        });
                    }); });
                    it('all Ed2 attributes are added properly', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            fCDAs.forEach(function (fcda) {
                                var _a, _b, _c, _d;
                                return testing_1.expect(element.doc.querySelector("IED[name=\"IED2\"] ExtRef[iedName=\"IED4\"][srcLDInst=\"" + ((_a = fcda
                                    .closest('LDevice')) === null || _a === void 0 ? void 0 : _a.getAttribute('inst')) + "\"][srcPrefix=\"" + ((_c = (_b = fcda.closest('LN0')) === null || _b === void 0 ? void 0 : _b.getAttribute('prefix')) !== null && _c !== void 0 ? _c : '' //prefix is mendatory in ExtRef!!
                                ) + "\"][srcLNClass=\"" + ((_d = fcda
                                    .closest('LN0')) === null || _d === void 0 ? void 0 : _d.getAttribute('lnClass')) + "\"][srcCBName=\"" + gseControlBlock.getAttribute('name') + "\"][serviceType=\"GOOSE\"]")).to.exist;
                            });
                            return [2 /*return*/];
                        });
                    }); });
                });
            });
            describe('for subscribed GSEControl s', function () {
                beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                getItemFromSubscriberList('IED4').click();
                                return [4 /*yield*/, element.requestUpdate()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                it('all ExtRefs are available in the subscriber IED', function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        testing_1.expect(element.doc.querySelectorAll('IED[name="IED2"] ExtRef[iedName="IED4"]').length).to.eql(5);
                        return [2 /*return*/];
                    });
                }); });
                describe('clicking on the GSEControl list item', function () {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    getItemFromSubscriberList('IED4').click();
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    describe('the left hand side subscriber IED list', function () {
                        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(getSubscriberList()).shadowDom.to.equalSnapshot()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                    });
                    it('ExtRefs to the subscriber IED are removed', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, testing_1.expect(element.doc.querySelectorAll('IED[name="IED2"] ExtRef[iedName="IED4"]').length).to.eql(0)];
                        });
                    }); });
                });
            });
            describe('for partially subscribed GSEControl s', function () {
                it('some ExtRefs are available in the subscriber IED', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var extRefs;
                    return __generator(this, function (_a) {
                        extRefs = doc.querySelectorAll('IED[name="IED2"] ExtRef[iedName="IED1"]');
                        testing_1.expect(extRefs.length).to.eql(4);
                        return [2 /*return*/];
                    });
                }); });
                describe('clicking on the GSEControl list item', function () {
                    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    getItemFromSubscriberList('IED1').click();
                                    return [4 /*yield*/, element.requestUpdate()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    describe('the left hand side subscriber IED list', function () {
                        it('looks like the latest snapshot', function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, testing_1.expect(getSubscriberList()).shadowDom.to.equalSnapshot()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); });
                    });
                    it('the missing ExtRefs are added to the subscriber IED', function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            testing_1.expect(element.doc.querySelectorAll('IED[name="IED2"] ExtRef[iedName="IED1"]').length).to.eql(9);
                            return [2 /*return*/];
                        });
                    }); });
                });
            });
        });
    });
    function getSubscriberList() {
        var _a;
        return (_a = element.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('subscriber-list-goose');
    }
    function getItemFromSubscriberList(textInListItem) {
        var _a, _b, _c;
        return ((_c = Array.from((_b = (_a = getSubscriberList().shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('mwc-list-item')) !== null && _b !== void 0 ? _b : []).filter(function (listItem) { return listItem.innerHTML.includes(textInListItem); })[0]) !== null && _c !== void 0 ? _c : undefined);
    }
});
var templateObject_1;
