import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { newEditCompletedEvent, newEditEvent } from '../../../_snowpack/link/packages/core/dist/foundation.js';
import { property, LitElement, customElement, html, } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import { newLogEvent } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/history.js';
import { newValidateEvent } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/validation.js';
import { isComplex, isInsert, isNamespaced, isRemove, isUpdate, } from '../../../_snowpack/link/packages/core/dist/foundation.js';
import { convertEditV1toV2 } from './editor/edit-v1-to-v2-converter.js';
let OscdEditor = class OscdEditor extends LitElement {
    constructor() {
        super(...arguments);
        /** The `XMLDocument` to be edited */
        this.doc = null;
        /** The name of the current [[`doc`]] */
        this.docName = '';
        /** The UUID of the current [[`doc`]] */
        this.docId = '';
    }
    getLogText(edit) {
        if (isInsert(edit)) {
            const name = edit.node instanceof Element ?
                edit.node.tagName :
                get('editing.node');
            return { title: get('editing.created', { name }) };
        }
        else if (isUpdate(edit)) {
            const name = edit.element.tagName;
            return { title: get('editing.updated', { name }) };
        }
        else if (isRemove(edit)) {
            const name = edit.node instanceof Element ?
                edit.node.tagName :
                get('editing.node');
            return { title: get('editing.deleted', { name }) };
        }
        else if (isComplex(edit)) {
            const message = edit.map(e => this.getLogText(e)).map(({ title }) => title).join(', ');
            return { title: get('editing.complex'), message };
        }
        return { title: '' };
    }
    onAction(event) {
        const edit = convertEditV1toV2(event.detail.action);
        const initiator = event.detail.initiator;
        this.host.dispatchEvent(newEditEvent(edit, initiator));
    }
    /**
     *
     * @deprecated [Move to handleOpenDoc instead]
     */
    async onOpenDoc(event) {
        this.doc = event.detail.doc;
        this.docName = event.detail.docName;
        this.docId = event.detail.docId ?? '';
        await this.updateComplete;
        this.dispatchEvent(newValidateEvent());
        this.dispatchEvent(newLogEvent({
            kind: 'info',
            title: get('openSCD.loaded', { name: this.docName }),
        }));
    }
    handleOpenDoc({ detail: { docName, doc } }) {
        this.doc = doc;
        this.docName = docName;
    }
    connectedCallback() {
        super.connectedCallback();
        // Deprecated editor action API, use 'oscd-edit' instead.
        this.host.addEventListener('editor-action', this.onAction.bind(this));
        this.host.addEventListener('oscd-edit', event => this.handleEditEvent(event));
        this.host.addEventListener('open-doc', this.onOpenDoc);
        this.host.addEventListener('oscd-open', this.handleOpenDoc);
    }
    render() {
        return html `<slot></slot>`;
    }
    async handleEditEvent(event) {
        /**
         * This is a compatibility fix for plugins based on open energy tools edit events
         * because their edit event look slightly different
         * see https://github.com/OpenEnergyTools/open-scd-core/blob/main/foundation/edit-event-v1.ts for details
         */
        if (isOpenEnergyEditEvent(event)) {
            event = convertOpenEnergyEditEventToEditEvent(event);
        }
        const edit = event.detail.edit;
        const undoEdit = handleEdit(edit);
        this.dispatchEvent(newEditCompletedEvent(event.detail.edit, event.detail.initiator));
        const shouldCreateHistoryEntry = event.detail.initiator !== 'redo' && event.detail.initiator !== 'undo';
        if (shouldCreateHistoryEntry) {
            const { title, message } = this.getLogText(edit);
            this.dispatchEvent(newLogEvent({
                kind: 'action',
                title,
                message,
                redo: edit,
                undo: undoEdit,
            }));
        }
        await this.updateComplete;
        this.dispatchEvent(newValidateEvent());
    }
};
__decorate([
    property({ attribute: false })
], OscdEditor.prototype, "doc", void 0);
__decorate([
    property({ type: String })
], OscdEditor.prototype, "docName", void 0);
__decorate([
    property({ type: String })
], OscdEditor.prototype, "docId", void 0);
__decorate([
    property({
        type: Object,
    })
], OscdEditor.prototype, "host", void 0);
OscdEditor = __decorate([
    customElement('oscd-editor')
], OscdEditor);
export { OscdEditor };
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
function localAttributeName(attribute) {
    return attribute.includes(':') ? attribute.split(':', 2)[1] : attribute;
}
function handleInsert({ parent, node, reference, }) {
    try {
        const { parentNode, nextSibling } = node;
        /**
         * This is a workaround for converted edit api v1 events,
         * because if multiple edits are converted, they are converted before the changes from the previous edits are applied to the document
         * so if you first remove an element and then add a clone with changed attributes, the reference will be the element to remove since it hasnt been removed yet
         */
        if (!parent.contains(reference)) {
            reference = null;
        }
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
        let oldAttribute;
        if (isNamespaced(value))
            oldAttribute = {
                value: element.getAttributeNS(value.namespaceURI, localAttributeName(name)),
                namespaceURI: value.namespaceURI,
            };
        else
            oldAttribute = element.getAttributeNode(name)?.namespaceURI
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
    const { parentNode: parent, nextSibling: reference } = node;
    node.parentNode?.removeChild(node);
    if (parent)
        return {
            node,
            parent,
            reference,
        };
    return [];
}
function isOpenEnergyEditEvent(event) {
    const eventDetail = event.detail;
    return isComplex(eventDetail) || isInsert(eventDetail) || isUpdate(eventDetail) || isRemove(eventDetail);
}
function convertOpenEnergyEditEventToEditEvent(event) {
    const eventDetail = event.detail;
    return newEditEvent(eventDetail);
}
//# sourceMappingURL=Editor.js.map