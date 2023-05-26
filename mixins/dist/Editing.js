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
exports.__esModule = true;
exports.Editing = void 0;
var decorators_js_1 = require("lit/decorators.js");
var foundation_js_1 = require("../foundation.js");
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
        if (foundation_js_1.isNamespaced(value))
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
            if (foundation_js_1.isNamespaced(value)) {
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
    if (foundation_js_1.isInsert(edit))
        return handleInsert(edit);
    if (foundation_js_1.isUpdate(edit))
        return handleUpdate(edit);
    if (foundation_js_1.isRemove(edit))
        return handleRemove(edit);
    if (foundation_js_1.isComplex(edit))
        return edit.map(handleEdit).reverse();
    return [];
}
/** A mixin for editing a set of [[docs]] using [[EditEvent]]s */
function Editing(Base) {
    var EditingElement = /** @class */ (function (_super) {
        __extends(EditingElement, _super);
        function EditingElement() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var _this = _super.apply(this, args) || this;
            _this.history = [];
            _this.editCount = 0;
            /**
             * The set of `XMLDocument`s currently loaded
             *
             * @prop {Record} docs - Record of loaded XML documents
             */
            _this.docs = {};
            /**
             * The name of the [[`doc`]] currently being edited
             *
             * @prop {String} docName - name of the document that is currently being edited
             */
            _this.docName = '';
            _this.addEventListener('oscd-open', _this.handleOpenDoc);
            _this.addEventListener('oscd-edit', function (event) { return _this.handleEditEvent(event); });
            return _this;
        }
        Object.defineProperty(EditingElement.prototype, "doc", {
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
        __decorate([
            decorators_js_1.state()
        ], EditingElement.prototype, "doc");
        __decorate([
            decorators_js_1.state()
        ], EditingElement.prototype, "history");
        __decorate([
            decorators_js_1.state()
        ], EditingElement.prototype, "editCount");
        __decorate([
            decorators_js_1.state()
        ], EditingElement.prototype, "last");
        __decorate([
            decorators_js_1.state()
        ], EditingElement.prototype, "canUndo");
        __decorate([
            decorators_js_1.state()
        ], EditingElement.prototype, "canRedo");
        __decorate([
            decorators_js_1.state()
        ], EditingElement.prototype, "docs");
        __decorate([
            decorators_js_1.property({ type: String, reflect: true })
        ], EditingElement.prototype, "docName");
        return EditingElement;
    }(Base));
    return EditingElement;
}
exports.Editing = Editing;
