import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { newEditEvent, handleEditV2, isInsertV2, isRemoveV2, isSetAttributesV2, isSetTextContentV2, isComplexV2, newEditEventV2 } from '../../../_snowpack/link/packages/core/dist/foundation.js';
import { property, LitElement, customElement, html, } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import { newLogEvent } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/history.js';
import { newValidateEvent } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/validation.js';
import { isComplex, isInsert, isRemove, isUpdate, } from '../../../_snowpack/link/packages/core/dist/foundation.js';
import { convertEditActiontoV1 } from './editor/edit-action-to-v1-converter.js';
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
        if (isInsertV2(edit)) {
            const name = edit.node instanceof Element ?
                edit.node.tagName :
                get('editing.node');
            return { title: get('editing.created', { name }) };
        }
        else if (isSetAttributesV2(edit) || isSetTextContentV2(edit)) {
            const name = edit.element.tagName;
            return { title: get('editing.updated', { name }) };
        }
        else if (isRemoveV2(edit)) {
            const name = edit.node instanceof Element ?
                edit.node.tagName :
                get('editing.node');
            return { title: get('editing.deleted', { name }) };
        }
        else if (isComplexV2(edit)) {
            const message = edit.map(e => this.getLogText(e)).map(({ title }) => title).join(', ');
            return { title: get('editing.complex'), message };
        }
        return { title: '' };
    }
    onAction(event) {
        const edit = convertEditActiontoV1(event.detail.action);
        const editV2 = convertEditV1toV2(edit);
        this.host.dispatchEvent(newEditEventV2(editV2));
    }
    handleEditEvent(event) {
        /**
         * This is a compatibility fix for plugins based on open energy tools edit events
         * because their edit event look slightly different
         * see https://github.com/OpenEnergyTools/open-scd-core/blob/main/foundation/edit-event-v1.ts for details
         */
        if (isOpenEnergyEditEvent(event)) {
            event = convertOpenEnergyEditEventToEditEvent(event);
        }
        const edit = event.detail.edit;
        const editV2 = convertEditV1toV2(edit);
        this.host.dispatchEvent(newEditEventV2(editV2));
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
        // Deprecated edit event API, use 'oscd-edit-v2' instead.
        this.host.addEventListener('oscd-edit', event => this.handleEditEvent(event));
        this.host.addEventListener('oscd-edit-v2', event => this.handleEditEventV2(event));
        this.host.addEventListener('open-doc', this.onOpenDoc);
        this.host.addEventListener('oscd-open', this.handleOpenDoc);
    }
    render() {
        return html `<slot></slot>`;
    }
    async handleEditEventV2(event) {
        const edit = event.detail.edit;
        const undoEdit = handleEditV2(edit);
        const shouldCreateHistoryEntry = event.detail.createHistoryEntry !== false;
        if (shouldCreateHistoryEntry) {
            const { title, message } = this.getLogText(edit);
            this.dispatchEvent(newLogEvent({
                kind: 'action',
                title: event.detail.title ?? title,
                message,
                redo: edit,
                undo: undoEdit,
                squash: event.detail.squash
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
function isOpenEnergyEditEvent(event) {
    const eventDetail = event.detail;
    return isComplex(eventDetail) || isInsert(eventDetail) || isUpdate(eventDetail) || isRemove(eventDetail);
}
function convertOpenEnergyEditEventToEditEvent(event) {
    const eventDetail = event.detail;
    return newEditEvent(eventDetail);
}
//# sourceMappingURL=Editor.js.map