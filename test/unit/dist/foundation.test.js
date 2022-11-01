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
var foundation_js_1 = require("../../src/foundation.js");
var mock_actions_js_1 = require("./mock-actions.js");
describe('foundation', function () {
    var scl1;
    var scl2;
    var substation;
    var ied;
    var communication;
    var bay;
    var privateSection;
    var privateElement;
    var publicElement;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                        .then(function (response) { return response.text(); })
                        .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 1:
                    scl1 = (_a.sent()).documentElement;
                    return [4 /*yield*/, fetch('/test/testfiles/valid2003.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                case 2:
                    scl2 = (_a.sent()).documentElement;
                    substation = scl1.querySelector('Substation');
                    ied = scl1.querySelector('IED');
                    communication = scl1.querySelector('Communication');
                    bay = scl1.querySelector('Bay');
                    privateSection = bay.querySelector('Private');
                    privateElement = privateSection.firstElementChild;
                    publicElement = bay.children.item(1);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('EditorAction', function () {
        it('consists of four disjunct simple types', function () {
            testing_1.expect(mock_actions_js_1.MockAction.cre).to.satisfy(foundation_js_1.isCreate);
            testing_1.expect(mock_actions_js_1.MockAction.del).to.satisfy(foundation_js_1.isDelete);
            testing_1.expect(mock_actions_js_1.MockAction.mov).to.satisfy(foundation_js_1.isMove);
            testing_1.expect(mock_actions_js_1.MockAction.upd).to.satisfy(foundation_js_1.isReplace);
            foundation_js_1.isReplace;
            testing_1.expect(mock_actions_js_1.MockAction.cre).to.satisfy(foundation_js_1.isSimple);
            testing_1.expect(mock_actions_js_1.MockAction.del).to.satisfy(foundation_js_1.isSimple);
            testing_1.expect(mock_actions_js_1.MockAction.mov).to.satisfy(foundation_js_1.isSimple);
            testing_1.expect(mock_actions_js_1.MockAction.upd).to.satisfy(foundation_js_1.isSimple);
            testing_1.expect(mock_actions_js_1.MockAction.cre).to.not.satisfy(foundation_js_1.isDelete);
            testing_1.expect(mock_actions_js_1.MockAction.cre).to.not.satisfy(foundation_js_1.isMove);
            testing_1.expect(mock_actions_js_1.MockAction.cre).to.not.satisfy(foundation_js_1.isReplace);
            foundation_js_1.isReplace;
            testing_1.expect(mock_actions_js_1.MockAction.del).to.not.satisfy(foundation_js_1.isCreate);
            testing_1.expect(mock_actions_js_1.MockAction.del).to.not.satisfy(foundation_js_1.isMove);
            testing_1.expect(mock_actions_js_1.MockAction.del).to.not.satisfy(foundation_js_1.isReplace);
            foundation_js_1.isReplace;
            testing_1.expect(mock_actions_js_1.MockAction.mov).to.not.satisfy(foundation_js_1.isCreate);
            testing_1.expect(mock_actions_js_1.MockAction.mov).to.not.satisfy(foundation_js_1.isDelete);
            testing_1.expect(mock_actions_js_1.MockAction.mov).to.not.satisfy(foundation_js_1.isReplace);
            foundation_js_1.isReplace;
            testing_1.expect(mock_actions_js_1.MockAction.upd).to.not.satisfy(foundation_js_1.isCreate);
            testing_1.expect(mock_actions_js_1.MockAction.upd).to.not.satisfy(foundation_js_1.isDelete);
            testing_1.expect(mock_actions_js_1.MockAction.upd).to.not.satisfy(foundation_js_1.isMove);
        });
        it('consists of one complex type', function () {
            testing_1.expect(mock_actions_js_1.MockAction.complex).to.not.satisfy(foundation_js_1.isSimple);
            testing_1.expect(mock_actions_js_1.MockAction.complex).to.not.satisfy(foundation_js_1.isCreate);
            testing_1.expect(mock_actions_js_1.MockAction.complex).to.not.satisfy(foundation_js_1.isDelete);
            testing_1.expect(mock_actions_js_1.MockAction.complex).to.not.satisfy(foundation_js_1.isMove);
            testing_1.expect(mock_actions_js_1.MockAction.complex).to.not.satisfy(foundation_js_1.isReplace);
        });
        foundation_js_1.isReplace;
        describe('invert', function () {
            it('turns Create into Delete and vice versa', function () {
                testing_1.expect(foundation_js_1.invert(mock_actions_js_1.MockAction.cre)).to.satisfy(foundation_js_1.isDelete);
                testing_1.expect(foundation_js_1.invert(mock_actions_js_1.MockAction.del)).to.satisfy(foundation_js_1.isCreate);
            });
            it('turns Move into Move', function () {
                testing_1.expect(foundation_js_1.invert(mock_actions_js_1.MockAction.mov)).to.satisfy(foundation_js_1.isMove);
            });
            it('turns Update into Update', function () {
                testing_1.expect(foundation_js_1.invert(mock_actions_js_1.MockAction.upd)).to.satisfy(foundation_js_1.isReplace);
            });
            foundation_js_1.isReplace;
            it('inverts components of complex actions in reverse order', function () {
                var action = mock_actions_js_1.MockAction.complex;
                var inverse = foundation_js_1.invert(action);
                action.actions.forEach(function (element, index) {
                    return testing_1.expect(inverse.actions[inverse.actions.length - index - 1]).to.deep.equal(foundation_js_1.invert(action.actions[index]));
                });
            });
            it('throws on unknown Action type', function () {
                var invalid = 'Not an action!';
                testing_1.expect(function () { return foundation_js_1.invert(invalid); }).to["throw"]();
            });
        });
        describe('ActionEvent', function () {
            it('bears an EditorAction in its detail', function () {
                testing_1.expect(foundation_js_1.newActionEvent(mock_actions_js_1.MockAction.mov))
                    .property('detail')
                    .property('action')
                    .to.satisfy(foundation_js_1.isMove);
            });
        });
    });
    describe('PendingStateEvent', function () {
        it('bears a void Promise in its detail', function () {
            testing_1.expect(foundation_js_1.newPendingStateEvent(Promise.resolve()))
                .property('detail')
                .property('promise')
                .to.be.a('promise');
        });
    });
    describe('WizardEvent', function () {
        it('optionally bears a wizard factory in its detail', function () {
            testing_1.expect(foundation_js_1.newWizardEvent()).property('detail').property('wizard').to.be["null"];
            testing_1.expect(foundation_js_1.newWizardEvent([]))
                .property('detail')
                .property('wizard')
                .to.be.a('function');
        });
        it('allows to dispatch dynamic wizards', function () {
            testing_1.expect(foundation_js_1.newWizardEvent(function () { return []; }))
                .property('detail')
                .property('wizard')
                .to.be.a('function');
        });
    });
    describe('ifImplemented', function () {
        var nonEmpty;
        var empty;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["<p>", "</p>"], ["<p>", "</p>"])), foundation_js_1.ifImplemented('test')))];
                    case 1:
                        nonEmpty = _a.sent();
                        return [4 /*yield*/, testing_1.fixture(testing_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<p>", "</p>"], ["<p>", "</p>"])), foundation_js_1.ifImplemented({})))];
                    case 2:
                        empty = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('renders non-empty objects into its template', function () {
            return testing_1.expect(nonEmpty).dom.to.have.text('test');
        });
        it('does not render empty objects into its template', function () {
            return testing_1.expect(empty).dom.to.be.empty;
        });
    });
    describe('isSame', function () {
        it('is true of any two SCL Elements', function () {
            testing_1.expect(foundation_js_1.isSame(scl1, scl2)).to.be["true"];
        });
        it('is true of any two Header Elements', function () {
            testing_1.expect(foundation_js_1.isSame(scl1.querySelector('Header'), scl2.querySelector('Header'))).to.be["true"];
        });
        it('is true of any two Communication Elements', function () {
            testing_1.expect(foundation_js_1.isSame(scl1.querySelector('Communication'), scl2.querySelector('Communication'))).to.be["true"];
        });
        it('is true of any two DataTypeTemplates Elements', function () {
            testing_1.expect(foundation_js_1.isSame(scl1.querySelector('DataTypeTemplates'), scl2.querySelector('DataTypeTemplates'))).to.be["true"];
        });
        it('is true of identical private sections', function () {
            testing_1.expect(foundation_js_1.isSame(privateSection, privateSection)).to.be["true"];
        });
        it('is false of any private elements', function () {
            testing_1.expect(foundation_js_1.isSame(privateElement, privateElement)).to.be["false"];
            testing_1.expect(foundation_js_1.isSame(privateElement, publicElement)).to.be["false"];
        });
        it('is true of any one Element and itself', function () {
            testing_1.expect(foundation_js_1.isSame(substation, substation)).to.be["true"];
            testing_1.expect(foundation_js_1.isSame(ied, ied)).to.be["true"];
            testing_1.expect(foundation_js_1.isSame(bay, bay)).to.be["true"];
            testing_1.expect(foundation_js_1.isSame(communication, communication)).to.be["true"];
        });
        it('is false of elements with different tagNames', function () {
            testing_1.expect(foundation_js_1.isSame(substation, ied)).to.be["false"];
            testing_1.expect(foundation_js_1.isSame(substation, bay)).to.be["false"];
            testing_1.expect(foundation_js_1.isSame(bay, communication)).to.be["false"];
            testing_1.expect(foundation_js_1.isSame(communication, ied)).to.be["false"];
        });
        it('is true of elements with equal nonempty id attributes', function () {
            testing_1.expect(foundation_js_1.isSame(scl1.querySelector('LNodeType[id="Dummy.LLN0"]'), scl2.querySelector('LNodeType[id="Dummy.LLN0"]'))).to.be["true"];
        });
        it('is false of elements with unequal id attributes', function () {
            testing_1.expect(foundation_js_1.isSame(scl1.querySelector('LNodeType[id="Dummy.LLN0"]'), scl1.querySelector('LNodeType[id="Dummy.LLN0.two"]'))).to.be["false"];
        });
    });
    describe('identity', function () {
        it('returns NaN for any private element', function () {
            testing_1.expect(foundation_js_1.identity(privateElement)).to.be.NaN;
        });
        it('returns parent identity for singleton identities', function () {
            Object.entries(foundation_js_1.tags).forEach(function (_a) {
                var tag = _a[0], data = _a[1];
                if (data.identity !== foundation_js_1.tags['Server'].identity)
                    return;
                var element = scl1.querySelector(tag);
                if (element) {
                    testing_1.expect(foundation_js_1.identity(element)).to.equal(foundation_js_1.identity(element.parentElement));
                }
            });
        });
        it('returns valid identity for special identities', function () {
            var expectations = {
                Hitem: '1\t143',
                Terminal: 'AA1>E1>COUPLING_BAY>QC11>AA1/E1/COUPLING_BAY/L2',
                'Bay>LNode': 'IED2 CBSW/ LPHD 1',
                KDC: 'IED1>IED1 P1',
                LDevice: 'IED1>>CircuitBreaker_CB1',
                IEDName: 'IED1>>CircuitBreaker_CB1>GCB>IED2 P1 CircuitBreaker_CB1/ CSWI 1',
                FCDA: 'IED1>>CircuitBreaker_CB1>GooseDataSet1>CircuitBreaker_CB1/ XCBR 1.Pos stVal (ST)',
                ExtRef: 'IED1>>Disconnectors>DC CSWI 1>GOOSE:GCB CBSW/ LLN0  IED2 CBSW/ XSWI 2 Pos stVal@intAddr',
                'ExtRef:not([iedName])': 'IED1>>Disconnectors>DC CSWI 1>stVal-t[0]',
                LN: 'IED1>>CircuitBreaker_CB1> XCBR 1',
                ClientLN: 'IED2>>CBSW> XSWI 1>ReportCb>IED1 P1 CircuitBreaker_CB1/ XCBR 1',
                DAI: 'IED1>>CircuitBreaker_CB1> XCBR 1>Pos>ctlModel',
                SDI: 'IED1>>CircuitBreaker_CB1>CB CSWI 2>Pos>pulseConfig',
                Val: 'IED1>>CircuitBreaker_CB1> XCBR 1>Pos>ctlModel> 0',
                ConnectedAP: 'IED1 P1',
                GSE: 'CircuitBreaker_CB1 GCB',
                SMV: 'MU01 MSVCB01',
                PhysConn: 'IED1 P1>RedConn',
                P: 'IED1 P1>IP [0]',
                EnumVal: '#Dummy_ctlModel>0',
                ProtNs: '#Dummy.LLN0.Mod.SBOw>8-MMS\tIEC 61850-8-1:2003'
            };
            Object.keys(expectations).forEach(function (key) {
                var element = scl1.querySelector(key);
                testing_1.expect(foundation_js_1.identity(element)).to.equal(expectations[key]);
            });
        });
        it('returns valid identity for naming identities', function () {
            Object.entries(foundation_js_1.tags).forEach(function (_a) {
                var _b;
                var tag = _a[0], data = _a[1];
                if (data.identity !== foundation_js_1.tags['Substation'].identity)
                    return;
                var element = scl1.querySelector(tag);
                if (element) {
                    testing_1.expect(foundation_js_1.identity(element)).to.equal(foundation_js_1.identity(element.parentElement) +
                        (((_b = element.parentElement) === null || _b === void 0 ? void 0 : _b.tagName) === 'SCL' ? '' : '>') +
                        element.getAttribute('name'));
                }
            });
        });
    });
    describe('selector', function () {
        it('returns negation pseudo-class for identity of type NaN', function () {
            var element = scl1.querySelector('Assotiation');
            var ident = foundation_js_1.identity(element);
            testing_1.expect(foundation_js_1.selector('Assotiation', ident)).to.equal(':not(*)');
        });
        it('returns correct selector for all tags except IEDName and ProtNs', function () {
            Object.keys(foundation_js_1.tags).forEach(function (tag) {
                var element = Array.from(scl1.querySelectorAll(tag)).filter(function (item) { return !item.closest('Private'); })[0];
                if (element && tag !== 'IEDName' && tag !== 'ProtNs')
                    testing_1.expect(element).to.satisfy(function (element) {
                        return element.isEqualNode(scl1.querySelector(foundation_js_1.selector(tag, foundation_js_1.identity(element))));
                    });
            });
        });
    });
    describe('getReference', function () {
        it('returns correct reference for already existing elements', function () {
            Object.keys(foundation_js_1.tags)
                .filter(function (tag) { return foundation_js_1.tags[tag].children.length > 0; })
                .forEach(function (tag) {
                var element = Array.from(scl1.querySelectorAll(tag)).filter(function (item) { return !item.closest('Private'); })[0];
                if (!element ||
                    element.tagName === 'Services' ||
                    element.tagName === 'SettingGroups')
                    return;
                var children = Array.from(element.children);
                var childTags = new Set(children.map(function (child) { return child.tagName; }));
                var _loop_1 = function (childTag) {
                    testing_1.expect(foundation_js_1.getReference(element, childTag)).to.equal(children.find(function (child) { return child.tagName === childTag; }));
                };
                for (var _i = 0, childTags_1 = childTags; _i < childTags_1.length; _i++) {
                    var childTag = childTags_1[_i];
                    _loop_1(childTag);
                }
            });
        });
        it('returns correct reference for LNode element', function () {
            var scl = new DOMParser().parseFromString("<Bay>\n          <Private>testprivate</Private>\n          <ConductingEquipment name=\"QA1\"></ConductingEquipment>\n        </Bay>", 'application/xml').documentElement;
            testing_1.expect(foundation_js_1.getReference(scl, 'LNode')).to.equal(scl.querySelector('ConductingEquipment'));
            var scl2 = new DOMParser().parseFromString("<Bay>\n          <Private>testprivate</Private>\n          <PowerTransformer name=\"pTrans\"></PowerTransformer>\n          <ConductingEquipment name=\"QA1\"></ConductingEquipment>\n        </Bay>", 'application/xml').documentElement;
            testing_1.expect(foundation_js_1.getReference(scl2, 'LNode')).to.equal(scl2.querySelector('PowerTransformer'));
        });
        it('returns correct reference for Substation element', function () {
            var scl = new DOMParser().parseFromString("<SCL>\n          <Header></Header>\n          <IED name=\"IED\"></IED>\n          <DataTypeTemplates></DataTypeTemplates>\n        </SCL>", 'application/xml').documentElement;
            testing_1.expect(foundation_js_1.getReference(scl, 'Substation')).to.equal(scl.querySelector('IED'));
        });
        it('returns correct reference for VoltageLevel element', function () {
            var scl = new DOMParser().parseFromString("<Substation>\n          <Private></Private>\n          <LNode></LNode>\n        </Substation>", 'application/xml').documentElement;
            testing_1.expect(foundation_js_1.getReference(scl, 'VoltageLevel')).to.be["null"];
        });
        it('returns correct reference for Bay element', function () {
            var scl = new DOMParser().parseFromString("<VoltageLevel>\n          <Private></Private>\n          <Function></Function>\n        </VoltageLevel>", 'application/xml').documentElement;
            testing_1.expect(foundation_js_1.getReference(scl, 'Bay')).to.equal(scl.querySelector('Function'));
        });
        it('returns correct reference for ConductingEquipment element', function () {
            var scl = new DOMParser().parseFromString("<Bay>\n          <Private></Private>\n          <ConnectivityNode></ConnectivityNode>\n        </Bay>", 'application/xml').documentElement;
            testing_1.expect(foundation_js_1.getReference(scl, 'ConductingEquipment')).to.equal(scl.querySelector('ConnectivityNode'));
        });
    });
    describe('findControlBlocks', function () {
        var doc;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/comm-map.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns an Set of controlBlocks connected to the ExtRef', function () {
            var extRef = doc.querySelector(':root > IED[name="IED2"] > AccessPoint > Server > LDevice[inst="CircuitBreaker_CB1"] ExtRef');
            testing_1.expect(foundation_js_1.findControlBlocks(extRef).size).to.have.equal(1);
            testing_1.expect(Array.from(foundation_js_1.findControlBlocks(extRef))[0].isEqualNode(doc.querySelector('IED[name="IED1"] LDevice[inst="CircuitBreaker_CB1"] GSEControl[name="GCB"]'))).to.be["true"];
        });
        it('returns empty Set if input not ExtRef', function () {
            testing_1.expect(foundation_js_1.findControlBlocks(doc.querySelector('LN')).size).to.equal(0);
        });
        it('returns empty array if input is not public', function () {
            testing_1.expect(foundation_js_1.findControlBlocks(doc.querySelector('Private > ExtRef')).size).to.equal(0);
        });
    });
    describe('getUniqueElementName', function () {
        var parent;
        beforeEach(function () {
            var testDoc = new DOMParser().parseFromString('<Parent>' +
                '<Child name="newChild1"/><Child name="newChild2"/>' +
                '<Child2 name="newChild3"/><Child2 name="newChild21"/>' +
                '</Parent>', 'application/xml');
            parent = testDoc.querySelector('Parent');
        });
        it('returns unique name for Child', function () {
            return testing_1.expect(foundation_js_1.getUniqueElementName(parent, 'Child')).to.equal('newChild3');
        });
        it('returns unique name for Child2', function () {
            return testing_1.expect(foundation_js_1.getUniqueElementName(parent, 'Child2')).to.equal('newChild22');
        });
    });
    describe('getNameAttribute', function () {
        it('expect the correct value of the name attribute', function () {
            var doElement = scl1.querySelector('LNodeType[id="Dummy.LLN0"] > DO[type="Dummy.LLN0.Mod"]');
            testing_1.expect(foundation_js_1.getNameAttribute(doElement)).to.be.equal('Mod');
        });
    });
    describe('findFCDAs', function () {
        var doc;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/comm-map.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns an array of FCDAs connected to the ExtRef', function () {
            var extRef = doc.querySelector(':root > IED[name="IED2"] > AccessPoint > Server > LDevice[inst="CircuitBreaker_CB1"] ExtRef');
            testing_1.expect(foundation_js_1.findFCDAs(extRef).length).to.have.equal(1);
            testing_1.expect(foundation_js_1.findFCDAs(extRef)[0].isEqualNode(doc.querySelector('IED[name="IED1"] LDevice[inst="CircuitBreaker_CB1"] ' +
                'FCDA[ldInst="CircuitBreaker_CB1"][lnClass="XCBR"][doName="Pos"][daName="stVal"]'))).to.be["true"];
        });
        it('returns empty array if input not ExtRef', function () {
            testing_1.expect(foundation_js_1.findFCDAs(doc.querySelector('LN')).length).to.equal(0);
        });
        it('returns empty array if input is not public', function () {
            testing_1.expect(foundation_js_1.findFCDAs(doc.querySelector('Private > ExtRef')).length).to.equal(0);
        });
    });
    describe('getChildElementsByTagName', function () {
        var doc;
        beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/lnodewizard.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('returns a child Element array with a specific tag', function () {
            var parent = doc.querySelector('Bay[name="COUPLING_BAY"]');
            testing_1.expect(foundation_js_1.getChildElementsByTagName(parent, 'LNode').length).to.have.equal(parent === null || parent === void 0 ? void 0 : parent.querySelectorAll(':root > Substation > VoltageLevel > Bay[name="COUPLING_BAY"] > LNode').length);
        });
    });
    describe('cloneElement', function () {
        var element;
        beforeEach(function () {
            element = new DOMParser().parseFromString("<Element attr1=\"attrValue\" ></Element>", 'application/xml').documentElement;
        });
        it('does not copy child nodes', function () {
            var newElement = foundation_js_1.cloneElement(element, {});
            testing_1.expect(newElement.childNodes.length).to.equal(0);
        });
        it('creates a newElement with specified attrs', function () {
            var attr1 = 'newAttr1';
            var attr2 = 'newAttr2';
            var newElement = foundation_js_1.cloneElement(element, { attr1: attr1, attr2: attr2 });
            testing_1.expect(newElement.attributes.length).to.equal(2);
            testing_1.expect(newElement).to.have.attribute('attr2', 'newAttr2');
        });
        it('leaves attr untouched if not part of attrs', function () {
            var attr2 = 'newAttr2';
            var newElement = foundation_js_1.cloneElement(element, { attr2: attr2 });
            testing_1.expect(newElement.attributes.length).to.equal(2);
            testing_1.expect(newElement).to.have.attribute('attr1', 'attrValue');
        });
        it('updates existing attr if part of attrs', function () {
            var attr1 = 'newAttr1';
            var newElement = foundation_js_1.cloneElement(element, { attr1: attr1 });
            testing_1.expect(newElement.attributes.length).to.equal(1);
            testing_1.expect(newElement).to.have.attribute('attr1', 'newAttr1');
        });
        it('removes existing attr if set to null', function () {
            var attr1 = null;
            var attr2 = 'newAttr2';
            var newElement = foundation_js_1.cloneElement(element, { attr1: attr1, attr2: attr2 });
            testing_1.expect(newElement.attributes.length).to.equal(1);
            testing_1.expect(newElement).to.not.have.attribute('attr1');
        });
    });
    describe('depth', function () {
        var circular = { a: { b: {} }, c: {} };
        circular.a.b = circular;
        var fiveDeep = [
            'first level',
            2,
            {
                a: 'second level',
                b: 2,
                c: [
                    'third level',
                    { a: 'fourth level', b: 2, c: { a: 'fifth level!' } },
                ]
            },
            'test',
        ];
        it("returns the given object's or array's depth", function () {
            return testing_1.expect(foundation_js_1.depth(fiveDeep)).to.equal(5);
        });
        it('returns zero if given something other than an object or array', function () {
            return testing_1.expect(foundation_js_1.depth('test')).to.equal(0);
        });
        it('returns Infinity if given a circularly defined object or array', function () {
            return testing_1.expect(foundation_js_1.depth(circular)).to.not.be.finite;
        });
    });
    describe('getSclSchemaVersion', function () {
        var doc;
        it('when passing a SCL 2003 Document then correct edition is returned', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2003.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        testing_1.expect(foundation_js_1.getSclSchemaVersion(doc)).to.be.equal('2003');
                        return [2 /*return*/];
                }
            });
        }); });
        it('when passing a SCL 2007B Document then correct edition is returned', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        testing_1.expect(foundation_js_1.getSclSchemaVersion(doc)).to.be.equal('2007B');
                        return [2 /*return*/];
                }
            });
        }); });
        it('when passing a SCL 2007B4 Document then correct edition is returned', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('/test/testfiles/valid2007B4.scd')
                            .then(function (response) { return response.text(); })
                            .then(function (str) { return new DOMParser().parseFromString(str, 'application/xml'); })];
                    case 1:
                        doc = _a.sent();
                        testing_1.expect(foundation_js_1.getSclSchemaVersion(doc)).to.be.equal('2007B4');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('generator function for new `lnInst` attribute', function () {
        var lnInstGenerator;
        var parent;
        describe('with existing unique lnInst', function () {
            beforeEach(function () {
                parent = new DOMParser().parseFromString("<Function name=\"someName\">\n            <LNode name=\"None\" lnClass=\"CSWI\" lnInst=\"1\"/>\n            <LNode name=\"None\" lnClass=\"XCBR\" lnInst=\"1\"/>\n            <LNode name=\"None\" lnClass=\"CILO\" lnInst=\"1\"/>\n            <LNode name=\"None\" lnClass=\"CSWI\" lnInst=\"2\"/>\n            <LNode name=\"None\" lnClass=\"PDIS\" lnInst=\"1\"/>\n            <LNode name=\"None\" lnClass=\"CSWI\" lnInst=\"5\"/>\n            <LNode name=\"None\" lnClass=\"CSWI\" lnInst=\"6\"/>\n            <LNode name=\"None\" lnClass=\"CSWI\" lnInst=\"8\"/>\n          </Function>", 'application/xml').documentElement;
                lnInstGenerator = foundation_js_1.newLnInstGenerator(parent);
            });
            it('returns unique lnInst called once', function () {
                return testing_1.expect(lnInstGenerator('CSWI')).to.equal('3');
            });
            it('returns unique lnInst called several times', function () {
                testing_1.expect(lnInstGenerator('CSWI')).to.equal('3');
                testing_1.expect(lnInstGenerator('CSWI')).to.equal('4');
                testing_1.expect(lnInstGenerator('CSWI')).to.equal('7');
                testing_1.expect(lnInstGenerator('CSWI')).to.equal('9');
            });
            it('returns unique lnInst called several times', function () {
                testing_1.expect(lnInstGenerator('CSWI')).to.equal('3');
                testing_1.expect(lnInstGenerator('CSWI')).to.equal('4');
                testing_1.expect(lnInstGenerator('CSWI')).to.equal('7');
                testing_1.expect(lnInstGenerator('CSWI')).to.equal('9');
            });
        });
        describe('with missing unique lnInst for lnClass PDIS', function () {
            beforeEach(function () {
                parent = new DOMParser().parseFromString("<Function name=\"someName\">\n          </Function>", 'application/xml').documentElement;
                for (var i = 1; i <= 99; i++) {
                    var lNode = new DOMParser().parseFromString("<LNode iedName=\"None\" lnClass=\"PDIS\" lnInst=\"" + i + "\" />", 'application/xml').documentElement;
                    parent.appendChild(lNode);
                }
                lnInstGenerator = foundation_js_1.newLnInstGenerator(parent);
            });
            it('return undefined for the lnClass PDIS', function () {
                return testing_1.expect(lnInstGenerator('PDIS')).to.be.undefined;
            });
            it('return unique lnInst for another lnClass', function () {
                return testing_1.expect(lnInstGenerator('CSWI')).to.equal('1');
            });
        });
    });
});
var templateObject_1, templateObject_2;
