import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { customElement, html, property, query, state, } from '../../../../_snowpack/pkg/lit-element.js';
import { nothing } from '../../../../_snowpack/pkg/lit-html.js';
import { translate } from '../../../../_snowpack/pkg/lit-translate.js';
import { serverIcon } from '../../../../openscd/src/icons/ied-icons.js';
import { getDescriptionAttribute } from '../../../../openscd/src/foundation.js';
import { createElement } from '../../../../_snowpack/link/packages/xml/dist/index.js';
import { newEditEventV2 } from '../../../../_snowpack/link/packages/core/dist/foundation.js';
import { Container, findLLN0LNodeType, createLLN0LNodeType, } from './foundation.js';
import '../../../../openscd/src/action-pane.js';
import './ldevice-container.js';
import './add-ldevice-dialog.js';
/** [[`IED`]] plugin subeditor for editing `Server` element. */
let ServerContainer = class ServerContainer extends Container {
    constructor() {
        super(...arguments);
        this.selectedLNClasses = [];
    }
    header() {
        const desc = getDescriptionAttribute(this.element);
        return html `Server${desc ? html ` &mdash; ${desc}` : nothing}`;
    }
    updated(_changedProperties) {
        super.updated(_changedProperties);
        // When the LN Classes filter is updated, we also want to trigger rendering for the LN Elements.
        if (_changedProperties.has('selectedLNClasses')) {
            this.requestUpdate('lDeviceElements');
        }
    }
    get lDeviceElements() {
        return Array.from(this.element.querySelectorAll(':scope > LDevice')).filter(element => {
            return (Array.from(element.querySelectorAll(':scope > LN,LN0')).filter(element => {
                const lnClass = element.getAttribute('lnClass') ?? '';
                return this.selectedLNClasses.includes(lnClass);
            }).length > 0);
        });
    }
    handleAddLDevice(data) {
        const inserts = [];
        const lln0Type = findLLN0LNodeType(this.doc);
        const lnTypeId = lln0Type?.getAttribute('id') || 'PlaceholderLLN0';
        if (!lln0Type) {
            const lnodeTypeInserts = createLLN0LNodeType(this.doc, lnTypeId);
            inserts.push(...lnodeTypeInserts);
        }
        const lDevice = createElement(this.doc, 'LDevice', {
            inst: data.inst,
        });
        const ln0 = createElement(this.doc, 'LN0', {
            lnClass: 'LLN0',
            lnType: lnTypeId,
        });
        lDevice.appendChild(ln0);
        inserts.push({ parent: this.element, node: lDevice, reference: null });
        this.dispatchEvent(newEditEventV2(inserts));
    }
    render() {
        return html `<action-pane .label="${this.header()}">
      <mwc-icon slot="icon">${serverIcon}</mwc-icon>
      <abbr
        slot="action"
        title=${translate('iededitor.addLDeviceDialog.title')}
      >
        <mwc-icon-button
          icon="playlist_add"
          @click=${() => this.addAccessPointDialog.show()}
        ></mwc-icon-button>
      </abbr>
      ${this.lDeviceElements.map(server => html `<ldevice-container
            .editCount=${this.editCount}
            .doc=${this.doc}
            .element=${server}
            .nsdoc=${this.nsdoc}
            .selectedLNClasses=${this.selectedLNClasses}
            .ancestors=${[...this.ancestors, this.element]}
          ></ldevice-container>`)}
      <add-ldevice-dialog
        .server=${this.element}
        .onConfirm=${(data) => this.handleAddLDevice(data)}
      ></add-ldevice-dialog>
    </action-pane>`;
    }
};
__decorate([
    property()
], ServerContainer.prototype, "selectedLNClasses", void 0);
__decorate([
    query('add-ldevice-dialog')
], ServerContainer.prototype, "addAccessPointDialog", void 0);
__decorate([
    state()
], ServerContainer.prototype, "lDeviceElements", null);
ServerContainer = __decorate([
    customElement('server-container')
], ServerContainer);
export { ServerContainer };
//# sourceMappingURL=server-container.js.map