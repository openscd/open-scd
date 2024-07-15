import { __decorate } from "../../../../../pkg/tslib.js";
import { property, state } from '../../../../../pkg/lit/decorators.js';
import { isComplex, isInsert, isNamespaced, isRemove, isUpdate, } from '../foundation.js';
function localAttributeName(attribute) {
    return attribute.includes(':') ? attribute.split(':', 2)[1] : attribute;
}
function handleInsert({ parent, node, reference, }) {
    try {
        const { parentNode, nextSibling } = node;
        parent.insertBefore(node, reference);
        if (parentNode)
            return {
                node,
                parent: parentNode,
                reference: nextSibling,
            };
        return { node };
    }
    catch (e) {
        // do nothing if insert doesn't work on these nodes
        return [];
    }
}
function handleUpdate({ element, attributes }) {
    const oldAttributes = { ...attributes };
    Object.entries(attributes)
        .reverse()
        .forEach(([name, value]) => {
        var _a;
        let oldAttribute;
        if (isNamespaced(value))
            oldAttribute = {
                value: element.getAttributeNS(value.namespaceURI, localAttributeName(name)),
                namespaceURI: value.namespaceURI,
            };
        else
            oldAttribute = ((_a = element.getAttributeNode(name)) === null || _a === void 0 ? void 0 : _a.namespaceURI)
                ? {
                    value: element.getAttribute(name),
                    namespaceURI: element.getAttributeNode(name).namespaceURI,
                }
                : element.getAttribute(name);
        oldAttributes[name] = oldAttribute;
    });
    for (const entry of Object.entries(attributes)) {
        try {
            const [attribute, value] = entry;
            if (isNamespaced(value)) {
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
        element,
        attributes: oldAttributes,
    };
}
function handleRemove({ node }) {
    var _a;
    const { parentNode: parent, nextSibling: reference } = node;
    (_a = node.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(node);
    if (parent)
        return {
            node,
            parent,
            reference,
        };
    return [];
}
function handleEdit(edit) {
    if (isInsert(edit))
        return handleInsert(edit);
    if (isUpdate(edit))
        return handleUpdate(edit);
    if (isRemove(edit))
        return handleRemove(edit);
    if (isComplex(edit))
        return edit.map(handleEdit).reverse();
    return [];
}
/** A mixin for editing a set of [[docs]] using [[EditEvent]]s */
export function Editing(Base) {
    class EditingElement extends Base {
        get doc() {
            return this.docs[this.docName];
        }
        get last() {
            return this.editCount - 1;
        }
        get canUndo() {
            return this.last >= 0;
        }
        get canRedo() {
            return this.editCount < this.history.length;
        }
        handleOpenDoc({ detail: { docName, doc } }) {
            this.docName = docName;
            this.docs[this.docName] = doc;
        }
        handleEditEvent(event) {
            const edit = event.detail.edit;
            this.history.splice(this.editCount);
            this.history.push({ undo: handleEdit(edit), redo: edit });
            this.editCount += 1;
        }
        /** Undo the last `n` [[Edit]]s committed */
        undo(n = 1) {
            if (!this.canUndo || n < 1)
                return;
            handleEdit(this.history[this.last].undo);
            this.editCount -= 1;
            if (n > 1)
                this.undo(n - 1);
        }
        /** Redo the last `n` [[Edit]]s that have been undone */
        redo(n = 1) {
            if (!this.canRedo || n < 1)
                return;
            handleEdit(this.history[this.editCount].redo);
            this.editCount += 1;
            if (n > 1)
                this.redo(n - 1);
        }
        constructor(...args) {
            super(...args);
            this.history = [];
            this.editCount = 0;
            /**
             * The set of `XMLDocument`s currently loaded
             *
             * @prop {Record} docs - Record of loaded XML documents
             */
            this.docs = {};
            /**
             * The name of the [[`doc`]] currently being edited
             *
             * @prop {String} docName - name of the document that is currently being edited
             */
            this.docName = '';
            this.addEventListener('oscd-open', this.handleOpenDoc);
            this.addEventListener('oscd-edit', event => this.handleEditEvent(event));
        }
    }
    __decorate([
        state()
        /** The `XMLDocument` currently being edited */
    ], EditingElement.prototype, "doc", null);
    __decorate([
        state()
    ], EditingElement.prototype, "history", void 0);
    __decorate([
        state()
    ], EditingElement.prototype, "editCount", void 0);
    __decorate([
        state()
    ], EditingElement.prototype, "last", null);
    __decorate([
        state()
    ], EditingElement.prototype, "canUndo", null);
    __decorate([
        state()
    ], EditingElement.prototype, "canRedo", null);
    __decorate([
        state()
    ], EditingElement.prototype, "docs", void 0);
    __decorate([
        property({ type: String, reflect: true })
    ], EditingElement.prototype, "docName", void 0);
    return EditingElement;
}
//# sourceMappingURL=Editing.js.map