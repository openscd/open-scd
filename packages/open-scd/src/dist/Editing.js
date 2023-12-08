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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.Editing = void 0;
var lit_element_1 = require("lit-element");
var lit_translate_1 = require("lit-translate");
var foundation_js_1 = require("./foundation.js");
var core_1 = require("@openscd/core");
function localAttributeName(attribute) {
    return attribute.includes(':') ? attribute.split(':', 2)[1] : attribute;
}
function handleInsert(_a) {
    var parent = _a.parent, node = _a.node, reference = _a.reference;
    try {
        var parentNode = node.parentNode, nextSibling = node.nextSibling;
        parent.insertBefore(node, reference);
        if (parentNode)
            return {
                node: node,
                parent: parentNode,
                reference: nextSibling
            };
        return { node: node };
    }
    catch (e) {
        // do nothing if insert doesn't work on these nodes
        return [];
    }
}
function handleUpdate(_a) {
    var element = _a.element, attributes = _a.attributes;
    var oldAttributes = __assign({}, attributes);
    Object.entries(attributes)
        .reverse()
        .forEach(function (_a) {
        var _b;
        var name = _a[0], value = _a[1];
        var oldAttribute;
        if (core_1.isNamespaced(value))
            oldAttribute = {
                value: element.getAttributeNS(value.namespaceURI, localAttributeName(name)),
                namespaceURI: value.namespaceURI
            };
        else
            oldAttribute = ((_b = element.getAttributeNode(name)) === null || _b === void 0 ? void 0 : _b.namespaceURI) ? {
                value: element.getAttribute(name),
                namespaceURI: element.getAttributeNode(name).namespaceURI
            }
                : element.getAttribute(name);
        oldAttributes[name] = oldAttribute;
    });
    for (var _i = 0, _b = Object.entries(attributes); _i < _b.length; _i++) {
        var entry = _b[_i];
        try {
            var _c = entry, attribute = _c[0], value = _c[1];
            if (core_1.isNamespaced(value)) {
                if (value.value === null)
                    element.removeAttributeNS(value.namespaceURI, localAttributeName(attribute));
                else
                    element.setAttributeNS(value.namespaceURI, attribute, value.value);
            }
            else if (value === null)
                element.removeAttribute(attribute);
            else
                element.setAttribute(attribute, value);
        }
        catch (e) {
            // do nothing if update doesn't work on this attribute
            delete oldAttributes[entry[0]];
        }
    }
    return {
        element: element,
        attributes: oldAttributes
    };
}
function handleRemove(_a) {
    var _b;
    var node = _a.node;
    var parent = node.parentNode, reference = node.nextSibling;
    (_b = node.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(node);
    if (parent)
        return {
            node: node,
            parent: parent,
            reference: reference
        };
    return [];
}
function handleEdit(edit) {
    if (core_1.isInsert(edit))
        return handleInsert(edit);
    if (core_1.isUpdate(edit))
        return handleUpdate(edit);
    if (core_1.isRemove(edit))
        return handleRemove(edit);
    if (core_1.isComplex(edit))
        return edit.map(handleEdit).reverse();
    return [];
}
/** @typeParam TBase - a type extending `LitElement`
 * @returns `Base` with an `XMLDocument` property "`doc`" and an event listener
 * applying [[`EditorActionEvent`]]s and dispatching [[`LogEvent`]]s. */
function Editing(Base) {
    var EditingElement = /** @class */ (function (_super) {
        __extends(EditingElement, _super);
        function EditingElement() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            /** The name of the current [[`doc`]] */
            _this.docName = '';
            /** The UUID of the current [[`doc`]] */
            _this.docId = '';
            _this.history = [];
            _this.editCount = 0;
            /**
             * The set of `XMLDocument`s currently loaded
             *
             * @prop {Record} docs - Record of loaded XML documents
             */
            _this.docs = {};
            _this.addEventListener('editor-action', _this.onAction);
            _this.addEventListener('open-doc', _this.onOpenDoc);
            _this.addEventListener('oscd-open', _this.handleOpenDoc);
            _this.addEventListener('oscd-edit', function (event) { return _this.handleEditEvent(event); });
            return _this;
        }
        Object.defineProperty(EditingElement.prototype, "doc", {
            /** The `XMLDocument` to be edited */
            get: function () {
                return this.docs[this.docName];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EditingElement.prototype, "last", {
            get: function () {
                return this.editCount - 1;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EditingElement.prototype, "canUndo", {
            get: function () {
                return this.last >= 0;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(EditingElement.prototype, "canRedo", {
            get: function () {
                return this.editCount < this.history.length;
            },
            enumerable: false,
            configurable: true
        });
        EditingElement.prototype.handleOpenDoc = function (_a) {
            var _b = _a.detail, docName = _b.docName, doc = _b.doc;
            this.docName = docName;
            this.docs[this.docName] = doc;
            this.dispatchEvent(foundation_js_1.newValidateEvent());
            this.dispatchEvent(foundation_js_1.newLogEvent({
                kind: 'info',
                title: lit_translate_1.get('openSCD.loaded', { name: this.docName })
            }));
        };
        EditingElement.prototype.handleEditEvent = function (event) {
            var edit = event.detail;
            this.history.splice(this.editCount);
            this.history.push({ undo: handleEdit(edit), redo: edit });
            this.editCount += 1;
        };
        /** Undo the last `n` [[Edit]]s committed */
        EditingElement.prototype.undo = function (n) {
            if (n === void 0) { n = 1; }
            if (!this.canUndo || n < 1)
                return;
            handleEdit(this.history[this.last].undo);
            this.editCount -= 1;
            if (n > 1)
                this.undo(n - 1);
        };
        /** Redo the last `n` [[Edit]]s that have been undone */
        EditingElement.prototype.redo = function (n) {
            if (n === void 0) { n = 1; }
            if (!this.canRedo || n < 1)
                return;
            handleEdit(this.history[this.editCount].redo);
            this.editCount += 1;
            if (n > 1)
                this.redo(n - 1);
        };
        EditingElement.prototype.checkCreateValidity = function (create) {
            if (create.checkValidity !== undefined)
                return create.checkValidity();
            if (!(create["new"].element instanceof Element) ||
                !(create["new"].parent instanceof Element))
                return true;
            var invalidNaming = create["new"].element.hasAttribute('name') &&
                Array.from(create["new"].parent.children).some(function (elm) {
                    return elm.tagName === create["new"].element.tagName &&
                        elm.getAttribute('name') ===
                            create["new"].element.getAttribute('name');
                });
            if (invalidNaming) {
                this.dispatchEvent(foundation_js_1.newLogEvent({
                    kind: 'error',
                    title: lit_translate_1.get('editing.error.create', {
                        name: create["new"].element.tagName
                    }),
                    message: lit_translate_1.get('editing.error.nameClash', {
                        parent: create["new"].parent instanceof HTMLElement
                            ? create["new"].parent.tagName
                            : 'Document',
                        child: create["new"].element.tagName,
                        name: create["new"].element.getAttribute('name')
                    })
                }));
                return false;
            }
            var invalidId = create["new"].element.hasAttribute('id') &&
                Array.from(create["new"].parent.ownerDocument.querySelectorAll('LNodeType, DOType, DAType, EnumType')).some(function (elm) {
                    return elm.getAttribute('id') ===
                        create["new"].element.getAttribute('id');
                });
            if (invalidId) {
                this.dispatchEvent(foundation_js_1.newLogEvent({
                    kind: 'error',
                    title: lit_translate_1.get('editing.error.create', {
                        name: create["new"].element.tagName
                    }),
                    message: lit_translate_1.get('editing.error.idClash', {
                        id: create["new"].element.getAttribute('id')
                    })
                }));
                return false;
            }
            return true;
        };
        EditingElement.prototype.onCreate = function (action) {
            var _a;
            if (!this.checkCreateValidity(action))
                return false;
            if (action["new"].reference === undefined &&
                action["new"].element instanceof Element &&
                action["new"].parent instanceof Element)
                action["new"].reference = foundation_js_1.getReference(action["new"].parent, action["new"].element.tagName);
            else
                action["new"].reference = (_a = action["new"].reference) !== null && _a !== void 0 ? _a : null;
            action["new"].parent.insertBefore(action["new"].element, action["new"].reference);
            return true;
        };
        EditingElement.prototype.logCreate = function (action) {
            var name = action["new"].element instanceof Element
                ? action["new"].element.tagName
                : lit_translate_1.get('editing.node');
            this.dispatchEvent(foundation_js_1.newLogEvent({
                kind: 'action',
                title: lit_translate_1.get('editing.created', { name: name }),
                action: action
            }));
        };
        EditingElement.prototype.onDelete = function (action) {
            if (!action.old.reference)
                action.old.reference = action.old.element.nextSibling;
            if (action.old.element.parentNode !== action.old.parent)
                return false;
            action.old.parent.removeChild(action.old.element);
            return true;
        };
        EditingElement.prototype.logDelete = function (action) {
            var name = action.old.element instanceof Element
                ? action.old.element.tagName
                : lit_translate_1.get('editing.node');
            this.dispatchEvent(foundation_js_1.newLogEvent({
                kind: 'action',
                title: lit_translate_1.get('editing.deleted', { name: name }),
                action: action
            }));
        };
        EditingElement.prototype.checkMoveValidity = function (move) {
            if (move.checkValidity !== undefined)
                return move.checkValidity();
            var invalid = move.old.element.hasAttribute('name') &&
                move["new"].parent !== move.old.parent &&
                Array.from(move["new"].parent.children).some(function (elm) {
                    return elm.tagName === move.old.element.tagName &&
                        elm.getAttribute('name') === move.old.element.getAttribute('name');
                });
            if (invalid)
                this.dispatchEvent(foundation_js_1.newLogEvent({
                    kind: 'error',
                    title: lit_translate_1.get('editing.error.move', {
                        name: move.old.element.tagName
                    }),
                    message: lit_translate_1.get('editing.error.nameClash', {
                        parent: move["new"].parent.tagName,
                        child: move.old.element.tagName,
                        name: move.old.element.getAttribute('name')
                    })
                }));
            return !invalid;
        };
        EditingElement.prototype.onMove = function (action) {
            if (!this.checkMoveValidity(action))
                return false;
            if (!action.old.reference)
                action.old.reference = action.old.element.nextSibling;
            if (action["new"].reference === undefined)
                action["new"].reference = foundation_js_1.getReference(action["new"].parent, action.old.element.tagName);
            action["new"].parent.insertBefore(action.old.element, action["new"].reference);
            return true;
        };
        EditingElement.prototype.logMove = function (action) {
            this.dispatchEvent(foundation_js_1.newLogEvent({
                kind: 'action',
                title: lit_translate_1.get('editing.moved', {
                    name: action.old.element.tagName
                }),
                action: action
            }));
        };
        EditingElement.prototype.checkReplaceValidity = function (replace) {
            var _a, _b;
            if (replace.checkValidity !== undefined)
                return replace.checkValidity();
            var invalidNaming = replace["new"].element.hasAttribute('name') &&
                replace["new"].element.getAttribute('name') !==
                    replace.old.element.getAttribute('name') &&
                Array.from((_b = (_a = replace.old.element.parentElement) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : []).some(function (elm) {
                    return elm.tagName === replace["new"].element.tagName &&
                        elm.getAttribute('name') ===
                            replace["new"].element.getAttribute('name');
                });
            if (invalidNaming) {
                this.dispatchEvent(foundation_js_1.newLogEvent({
                    kind: 'error',
                    title: lit_translate_1.get('editing.error.update', {
                        name: replace["new"].element.tagName
                    }),
                    message: lit_translate_1.get('editing.error.nameClash', {
                        parent: replace.old.element.parentElement.tagName,
                        child: replace["new"].element.tagName,
                        name: replace["new"].element.getAttribute('name')
                    })
                }));
                return false;
            }
            var invalidId = replace["new"].element.hasAttribute('id') &&
                replace["new"].element.getAttribute('id') !==
                    replace.old.element.getAttribute('id') &&
                Array.from(replace["new"].element.ownerDocument.querySelectorAll('LNodeType, DOType, DAType, EnumType')).some(function (elm) {
                    return elm.getAttribute('id') ===
                        replace["new"].element.getAttribute('id');
                });
            if (invalidId) {
                this.dispatchEvent(foundation_js_1.newLogEvent({
                    kind: 'error',
                    title: lit_translate_1.get('editing.error.update', {
                        name: replace["new"].element.tagName
                    }),
                    message: lit_translate_1.get('editing.error.idClash', {
                        id: replace["new"].element.getAttribute('id')
                    })
                }));
                return false;
            }
            return true;
        };
        EditingElement.prototype.onReplace = function (action) {
            var _a;
            if (!this.checkReplaceValidity(action))
                return false;
            (_a = action["new"].element).append.apply(_a, Array.from(action.old.element.children));
            action.old.element.replaceWith(action["new"].element);
            return true;
        };
        EditingElement.prototype.logUpdate = function (action) {
            var name = foundation_js_1.isReplace(action)
                ? action["new"].element.tagName
                : action.element.tagName;
            this.dispatchEvent(foundation_js_1.newLogEvent({
                kind: 'action',
                title: lit_translate_1.get('editing.updated', {
                    name: name
                }),
                action: action
            }));
        };
        EditingElement.prototype.checkUpdateValidity = function (update) {
            var _a, _b;
            if (update.checkValidity !== undefined)
                return update.checkValidity();
            if (update.oldAttributes['name'] !== update.newAttributes['name']) {
                var invalidNaming = Array.from((_b = (_a = update.element.parentElement) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : []).some(function (elm) {
                    return elm.tagName === update.element.tagName &&
                        elm.getAttribute('name') === update.newAttributes['name'];
                });
                if (invalidNaming) {
                    this.dispatchEvent(foundation_js_1.newLogEvent({
                        kind: 'error',
                        title: lit_translate_1.get('editing.error.update', {
                            name: update.element.tagName
                        }),
                        message: lit_translate_1.get('editing.error.nameClash', {
                            parent: update.element.parentElement.tagName,
                            child: update.element.tagName,
                            name: update.newAttributes['name']
                        })
                    }));
                    return false;
                }
            }
            var invalidId = update.newAttributes['id'] &&
                Array.from(update.element.ownerDocument.querySelectorAll('LNodeType, DOType, DAType, EnumType')).some(function (elm) { return elm.getAttribute('id') === update.newAttributes['id']; });
            if (invalidId) {
                this.dispatchEvent(foundation_js_1.newLogEvent({
                    kind: 'error',
                    title: lit_translate_1.get('editing.error.update', {
                        name: update.element.tagName
                    }),
                    message: lit_translate_1.get('editing.error.idClash', {
                        id: update.newAttributes['id']
                    })
                }));
                return false;
            }
            return true;
        };
        EditingElement.prototype.onUpdate = function (action) {
            if (!this.checkUpdateValidity(action))
                return false;
            Array.from(action.element.attributes).forEach(function (attr) {
                return action.element.removeAttributeNode(attr);
            });
            Object.entries(action.newAttributes).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (value !== null && value !== undefined)
                    action.element.setAttribute(key, value);
            });
            return true;
        };
        EditingElement.prototype.onSimpleAction = function (action) {
            if (foundation_js_1.isMove(action))
                return this.onMove(action);
            else if (foundation_js_1.isCreate(action))
                return this.onCreate(action);
            else if (foundation_js_1.isDelete(action))
                return this.onDelete(action);
            else if (foundation_js_1.isReplace(action))
                return this.onReplace(action);
            else if (foundation_js_1.isUpdate(action))
                return this.onUpdate(action);
        };
        EditingElement.prototype.logSimpleAction = function (action) {
            if (foundation_js_1.isMove(action))
                this.logMove(action);
            else if (foundation_js_1.isCreate(action))
                this.logCreate(action);
            else if (foundation_js_1.isDelete(action))
                this.logDelete(action);
            else if (foundation_js_1.isReplace(action))
                this.logUpdate(action);
            else if (foundation_js_1.isUpdate(action))
                this.logUpdate(action);
        };
        EditingElement.prototype.onAction = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (foundation_js_1.isSimple(event.detail.action)) {
                                if (this.onSimpleAction(event.detail.action))
                                    this.logSimpleAction(event.detail.action);
                            }
                            else if (event.detail.action.actions.length > 0) {
                                event.detail.action.actions.forEach(function (element) {
                                    return _this.onSimpleAction(element);
                                });
                                this.dispatchEvent(foundation_js_1.newLogEvent({
                                    kind: 'action',
                                    title: event.detail.action.title,
                                    action: event.detail.action
                                }));
                            }
                            else
                                return [2 /*return*/];
                            if (!this.doc)
                                return [2 /*return*/];
                            return [4 /*yield*/, this.updateComplete];
                        case 1:
                            _a.sent();
                            this.dispatchEvent(foundation_js_1.newValidateEvent());
                            return [2 /*return*/];
                    }
                });
            });
        };
        EditingElement.prototype.onOpenDoc = function (event) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.docName = event.detail.docName;
                            this.docs[this.docName] = event.detail.doc;
                            this.docId = (_a = event.detail.docId) !== null && _a !== void 0 ? _a : '';
                            return [4 /*yield*/, this.updateComplete];
                        case 1:
                            _b.sent();
                            this.dispatchEvent(foundation_js_1.newValidateEvent());
                            this.dispatchEvent(foundation_js_1.newLogEvent({
                                kind: 'info',
                                title: lit_translate_1.get('openSCD.loaded', { name: this.docName })
                            }));
                            return [2 /*return*/];
                    }
                });
            });
        };
        __decorate([
            lit_element_1.state()
        ], EditingElement.prototype, "doc");
        __decorate([
            lit_element_1.property({ type: String })
        ], EditingElement.prototype, "docName");
        __decorate([
            lit_element_1.property({ type: String })
        ], EditingElement.prototype, "docId");
        __decorate([
            lit_element_1.state()
        ], EditingElement.prototype, "history");
        __decorate([
            lit_element_1.state()
        ], EditingElement.prototype, "editCount");
        __decorate([
            lit_element_1.state()
        ], EditingElement.prototype, "last");
        __decorate([
            lit_element_1.state()
        ], EditingElement.prototype, "canUndo");
        __decorate([
            lit_element_1.state()
        ], EditingElement.prototype, "canRedo");
        __decorate([
            lit_element_1.state()
        ], EditingElement.prototype, "docs");
        return EditingElement;
    }(Base));
    return EditingElement;
}
exports.Editing = Editing;
