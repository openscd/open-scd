import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { css, html, LitElement, property, state, query, customElement, } from '../../../../_snowpack/pkg/lit-element.js';
import { get, translate } from '../../../../_snowpack/pkg/lit-translate.js';
import '../../../../_snowpack/pkg/@material/mwc-dialog.js';
import '../../../../_snowpack/pkg/@material/mwc-button.js';
import '../../../../_snowpack/pkg/@material/mwc-textfield.js';
import '../../../../_snowpack/pkg/@material/mwc-switch.js';
import '../../../../_snowpack/pkg/@material/mwc-formfield.js';
import '../../../../_snowpack/pkg/@material/mwc-select.js';
import '../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js';
import { getExistingAccessPointNames, getAccessPointsWithServer, } from './foundation.js';
/** A dialog component for adding new AccessPoints */
let AddAccessPointDialog = class AddAccessPointDialog extends LitElement {
    constructor() {
        super(...arguments);
        this.apName = '';
        this.createServerAt = false;
        this.serverAtApName = '';
        this.serverAtDesc = '';
    }
    get open() {
        return this.dialog?.open ?? false;
    }
    isApNameUnique(name) {
        const existingNames = getExistingAccessPointNames(this.ied);
        return !existingNames.includes(name);
    }
    get accessPointsWithServer() {
        return getAccessPointsWithServer(this.ied);
    }
    show() {
        this.reset();
        this.dialog.show();
    }
    reset() {
        this.apName = '';
        this.createServerAt = false;
        this.serverAtApName = '';
        this.serverAtDesc = '';
    }
    close() {
        this.dialog.close();
        this.reset();
    }
    handleCreate() {
        if (this.apNameField.checkValidity()) {
            const data = {
                name: this.apName,
                createServerAt: this.createServerAt,
                serverAtApName: this.createServerAt ? this.serverAtApName : undefined,
                serverAtDesc: this.createServerAt && this.serverAtDesc
                    ? this.serverAtDesc
                    : undefined,
            };
            this.onConfirm(data);
            this.close();
        }
    }
    getApNameError(value) {
        const trimmed = value.trim();
        if (!trimmed)
            return '';
        if (!/^[A-Za-z0-9][0-9A-Za-z_]*$/.test(trimmed))
            return get('iededitor.addAccessPointDialog.nameFormatError');
        if (trimmed.length > 32)
            return get('iededitor.addAccessPointDialog.nameTooLongError');
        if (!this.isApNameUnique(trimmed))
            return get('iededitor.addAccessPointDialog.nameUniqueError');
        return '';
    }
    renderServerAtSection() {
        return html `
      <mwc-formfield
        label=${translate('iededitor.addAccessPointDialog.createServerAt')}
      >
        <mwc-switch
          ?selected=${this.createServerAt}
          ?checked=${this.createServerAt}
          @change=${(e) => {
            this.createServerAt = e.target.checked;
            this.serverAtApName = this.createServerAt
                ? this.accessPointsWithServer[0]
                : '';
        }}
        ></mwc-switch>
      </mwc-formfield>
      ${this.createServerAt
            ? html `
            <mwc-select
              label=${translate('iededitor.addAccessPointDialog.selectAccessPoint')}
              .value=${this.serverAtApName}
              @change=${(e) => {
                e.stopPropagation();
                this.serverAtApName = e.target.value;
            }}
              @click=${(e) => e.stopPropagation()}
              @closed=${(e) => e.stopPropagation()}
              style="width: 100%; margin-bottom: 16px;"
            >
              ${this.accessPointsWithServer.map((ap) => html `<mwc-list-item value=${ap}>${ap}</mwc-list-item>`)}
            </mwc-select>
            <mwc-textfield
              label=${translate('iededitor.addAccessPointDialog.serverAtDesc')}
              .value=${this.serverAtDesc}
              @input=${(e) => {
                this.serverAtDesc = e.target.value;
            }}
              style="width: 100%; margin-bottom: 16px;"
            ></mwc-textfield>
          `
            : ''}
    `;
    }
    render() {
        return html `
      <mwc-dialog
        id="createAccessPointDialog"
        heading=${translate('iededitor.addAccessPointDialog.title')}
        @closed=${this.close}
      >
        <div class="dialog-content">
          <mwc-textfield
            id="apName"
            label=${translate('iededitor.addAccessPointDialog.apName')}
            .value=${this.apName}
            .validationMessage=${this.getApNameError(this.apName)}
            .validityTransform=${(value) => {
            const error = this.getApNameError(value);
            return {
                valid: error === '',
                customError: error !== '',
            };
        }}
            pattern="[A-Za-z0-9][0-9A-Za-z_]*"
            maxLength="32"
            required
            autoValidate
            helper=${translate('iededitor.addAccessPointDialog.apName')}
            dialogInitialFocus
            style="width: 100%; margin-bottom: 16px;"
            @input=${(e) => {
            this.apName = e.target.value;
        }}
          ></mwc-textfield>
          ${this.renderServerAtSection()}
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
          @click=${this.handleCreate}
          data-testid="add-access-point-button"
          ?disabled=${!this.apName ||
            !this.apNameField.validity.valid ||
            (this.createServerAt && !this.serverAtApName)}
        >
          ${translate('add')}
        </mwc-button>
      </mwc-dialog>
    `;
    }
};
AddAccessPointDialog.styles = css `
    .dialog-content {
      margin-top: 16px;
      width: 320px;
      max-width: 100vw;
      box-sizing: border-box;
    }

    mwc-formfield {
      display: block;
    }

    mwc-select,
    mwc-textfield {
      width: 100%;
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
    }

    mwc-formfield {
      margin-bottom: 12px;
    }
  `;
__decorate([
    property()
], AddAccessPointDialog.prototype, "doc", void 0);
__decorate([
    property()
], AddAccessPointDialog.prototype, "ied", void 0);
__decorate([
    property({ type: Function })
], AddAccessPointDialog.prototype, "onConfirm", void 0);
__decorate([
    query('#createAccessPointDialog')
], AddAccessPointDialog.prototype, "dialog", void 0);
__decorate([
    query('#apName')
], AddAccessPointDialog.prototype, "apNameField", void 0);
__decorate([
    state()
], AddAccessPointDialog.prototype, "apName", void 0);
__decorate([
    state()
], AddAccessPointDialog.prototype, "createServerAt", void 0);
__decorate([
    state()
], AddAccessPointDialog.prototype, "serverAtApName", void 0);
__decorate([
    state()
], AddAccessPointDialog.prototype, "serverAtDesc", void 0);
AddAccessPointDialog = __decorate([
    customElement('add-access-point-dialog')
], AddAccessPointDialog);
export { AddAccessPointDialog };
//# sourceMappingURL=add-access-point-dialog.js.map