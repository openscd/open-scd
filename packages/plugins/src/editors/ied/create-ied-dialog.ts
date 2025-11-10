import {
  css,
  html,
  LitElement,
  property,
  state,
  TemplateResult,
  query,
  customElement,
} from 'lit-element';
import { get, translate } from 'lit-translate';

import { Dialog } from '@material/mwc-dialog';
import '@material/mwc-button';
import '@material/mwc-textfield';

/** A dialog component for creating virtual IEDs */
@customElement('create-ied-dialog')
export class CreateIedDialog extends LitElement {
  @property()
  doc!: XMLDocument;

  @property({ type: Function })
  onConfirm!: (iedName: string) => void;

  @query('#createIedDialog') dialog!: Dialog;

  @state()
  private newIedName = '';

  get open() {
    return this.dialog?.open ?? false;
  }

  private isIedNameValid(name: string): boolean {
    const trimmedName = name.trim();
    return (
      trimmedName.length > 0 &&
      !trimmedName.includes(' ') &&
      this.isIedNameUnique(trimmedName)
    );
  }

  private getIedNameError(name: string): string {
    const trimmedName = name.trim();
    if (trimmedName.length === 0) return '';
    if (trimmedName.includes(' '))
      return get('iededitor.createDialog.nameFormatError');
    if (!this.isIedNameUnique(trimmedName))
      return get('iededitor.createDialog.nameUniqueError');
    return '';
  }

  private isIedNameUnique(name: string): boolean {
    const existingNames = Array.from(this.doc.querySelectorAll('IED'))
      .map(ied => ied.getAttribute('name'))
      .filter(n => n !== null) as string[];

    return !existingNames.includes(name);
  }

  public show(): void {
    this.newIedName = '';
    this.dialog.show();
  }

  private close(): void {
    this.dialog.close();
    this.newIedName = '';
  }

  private handleCreate(): void {
    if (this.isIedNameValid(this.newIedName)) {
      this.onConfirm(this.newIedName);
      this.close();
    }
  }

  render(): TemplateResult {
    const isNameValid = this.isIedNameValid(this.newIedName);
    const errorMessage = this.getIedNameError(this.newIedName);

    return html`
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
            .validityTransform=${(value: string) => {
              const error = this.getIedNameError(value);
              return {
                valid: error === '',
                customError: error !== '',
              };
            }}
            required
            autoValidate
            helper=${translate('iededitor.createDialog.iedName')}
            dialogInitialFocus
            style="width: 100%; margin-bottom: 16px;"
            @input=${(e: Event) => {
              this.newIedName = (e.target as HTMLInputElement).value;
            }}
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
          @click=${this.handleCreate}
          ?disabled=${!isNameValid}
        >
          ${translate('create')}
        </mwc-button>
      </mwc-dialog>
    `;
  }

  static styles = css`
    .dialog-content {
      margin-top: 16px;
    }
  `;
}
