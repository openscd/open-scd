import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { css, customElement, html, LitElement, property, query, state, } from '../../../../_snowpack/pkg/lit-element.js';
import { translate, get } from '../../../../_snowpack/pkg/lit-translate.js';
import '../../../../_snowpack/pkg/@material/mwc-dialog.js';
import '../../../../_snowpack/pkg/@material/mwc-textfield.js';
import '../../../../_snowpack/pkg/@material/mwc-button.js';
import { getLDeviceInsts } from './foundation.js';
/** Dialog for adding a new LDevice to a Server. */
let AddLDeviceDialog = class AddLDeviceDialog extends LitElement {
    constructor() {
        super(...arguments);
        this.inst = '';
    }
    connectedCallback() {
        super.connectedCallback();
    }
    show() {
        this.inst = '';
        this.dialog.show();
    }
    close() {
        this.dialog.close();
    }
    handleCreate() {
        const data = {
            inst: this.inst,
        };
        this.onConfirm(data);
        this.close();
    }
    get lDeviceInst() {
        return getLDeviceInsts(this.server);
    }
    getInstError(value) {
        const trimmed = value.trim();
        if (!trimmed)
            return get('iededitor.addLDeviceDialog.instRequiredError');
        if (!/^[A-Za-z0-9][0-9A-Za-z_]*$/.test(trimmed))
            return get('iededitor.addLDeviceDialog.instFormatError');
        if (trimmed.length > 64)
            return get('iededitor.addLDeviceDialog.instTooLongError');
        if (this.lDeviceInst.includes(trimmed))
            return get('iededitor.addLDeviceDialog.instUniqueError');
        return '';
    }
    render() {
        const error = this.getInstError(this.inst);
        return html `
      <mwc-dialog
        id="addLDeviceDialog"
        heading=${translate('iededitor.addLDeviceDialog.title')}
        @closed=${this.close}
      >
        <div class="dialog-content">
          <mwc-textfield
            label=${translate('iededitor.addLDeviceDialog.inst')}
            helper=${translate('iededitor.addLDeviceDialog.inst')}
            .value=${this.inst}
            .validationMessage=${error}
            .validityTransform=${(value) => {
            const err = this.getInstError(value);
            return {
                valid: err === '',
                customError: err !== '',
            };
        }}
            pattern="[A-Za-z0-9][0-9A-Za-z_]*"
            maxLength="64"
            required
            autoValidate
            dialogInitialFocus
            @input=${(e) => {
            this.inst = e.target.value;
        }}
            style="width: 100%;"
          ></mwc-textfield>
        </div>
        <mwc-button
          slot="secondaryAction"
          @click=${this.close}
          style="--mdc-theme-primary: var(--mdc-theme-error)"
        >
          ${translate('close')}
        </mwc-button>
        <mwc-button
          slot="primaryAction"
          icon="add"
          trailingIcon
          ?disabled=${!!error}
          @click=${this.handleCreate}
        >
          ${translate('add')}
        </mwc-button>
      </mwc-dialog>
    `;
    }
};
AddLDeviceDialog.styles = css `
    .dialog-content {
      margin-top: 16px;
      width: 320px;
      max-width: 100vw;
      box-sizing: border-box;
    }
  `;
__decorate([
    property()
], AddLDeviceDialog.prototype, "server", void 0);
__decorate([
    property({ type: Function })
], AddLDeviceDialog.prototype, "onConfirm", void 0);
__decorate([
    query('#addLDeviceDialog')
], AddLDeviceDialog.prototype, "dialog", void 0);
__decorate([
    state()
], AddLDeviceDialog.prototype, "inst", void 0);
AddLDeviceDialog = __decorate([
    customElement('add-ldevice-dialog')
], AddLDeviceDialog);
export { AddLDeviceDialog };
//# sourceMappingURL=add-ldevice-dialog.js.map