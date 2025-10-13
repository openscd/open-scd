import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { css, html, LitElement, property, state, query, customElement, } from '../../../../_snowpack/pkg/lit-element.js';
import { get, translate } from '../../../../_snowpack/pkg/lit-translate.js';
import '../../../../_snowpack/pkg/@material/mwc-button.js';
import '../../../../_snowpack/pkg/@material/mwc-textfield.js';
/** A dialog component for creating virtual IEDs */
let CreateIedDialog = class CreateIedDialog extends LitElement {
    constructor() {
        super(...arguments);
        this.newIedName = '';
    }
    get open() {
        return this.dialog?.open ?? false;
    }
    isIedNameValid(name) {
        const trimmedName = name.trim();
        return (trimmedName.length > 0 &&
            !trimmedName.includes(' ') &&
            this.isIedNameUnique(trimmedName));
    }
    getIedNameError(name) {
        const trimmedName = name.trim();
        if (trimmedName.length === 0)
            return '';
        if (trimmedName.includes(' '))
            return get('iededitor.createDialog.nameFormatError');
        if (!this.isIedNameUnique(trimmedName))
            return get('iededitor.createDialog.nameUniqueError');
        return '';
    }
    isIedNameUnique(name) {
        const existingNames = Array.from(this.doc.querySelectorAll('IED'))
            .map(ied => ied.getAttribute('name'))
            .filter(n => n !== null);
        return !existingNames.includes(name);
    }
    show() {
        this.newIedName = '';
        this.dialog.show();
    }
    close() {
        this.dialog.close();
        this.newIedName = '';
    }
    handleCreate() {
        if (this.isIedNameValid(this.newIedName)) {
            this.onConfirm(this.newIedName);
            this.close();
        }
    }
    render() {
        const isNameValid = this.isIedNameValid(this.newIedName);
        const errorMessage = this.getIedNameError(this.newIedName);
        return html `
      <mwc-dialog
        id="createIedDialog"
        heading=${translate('iededitor.createIed')}
        @closed=${this.close}
      >
        <div class="dialog-content">
          <mwc-textfield
            label=${translate('iededitor.createDialog.iedName')}
            .value=${this.newIedName}
            .validationMessage=${errorMessage}
            .validityTransform=${(value) => {
            const error = this.getIedNameError(value);
            return {
                valid: error === '',
                customError: error !== '',
            };
        }}
            autoValidate
            @input=${(e) => {
            this.newIedName = e.target.value;
        }}
            required
            style="width: 100%; margin-bottom: 16px;"
          ></mwc-textfield>
        </div>
        <mwc-button slot="secondaryAction" @click=${this.close}>
          ${translate('cancel')}
        </mwc-button>
        <mwc-button
          slot="primaryAction"
          @click=${this.handleCreate}
          ?disabled=${!isNameValid}
        >
          ${translate('create')}
        </mwc-button>
      </mwc-dialog>
    `;
    }
};
CreateIedDialog.styles = css `
    .dialog-content {
      margin-top: 16px;
    }
  `;
__decorate([
    property()
], CreateIedDialog.prototype, "doc", void 0);
__decorate([
    property({ type: Function })
], CreateIedDialog.prototype, "onConfirm", void 0);
__decorate([
    query('#createIedDialog')
], CreateIedDialog.prototype, "dialog", void 0);
__decorate([
    state()
], CreateIedDialog.prototype, "newIedName", void 0);
CreateIedDialog = __decorate([
    customElement('create-ied-dialog')
], CreateIedDialog);
export { CreateIedDialog };
//# sourceMappingURL=create-ied-dialog.js.map