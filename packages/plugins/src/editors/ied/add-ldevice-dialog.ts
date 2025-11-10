import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  state,
  TemplateResult,
} from 'lit-element';
import { translate, get } from 'lit-translate';

import { Dialog } from '@material/mwc-dialog';
import '@material/mwc-dialog';
import '@material/mwc-textfield';
import '@material/mwc-button';

import { getLDeviceInsts } from './foundation';

export interface LDeviceData {
  inst: string;
}

/** Dialog for adding a new LDevice to a Server. */
@customElement('add-ldevice-dialog')
export class AddLDeviceDialog extends LitElement {
  @property()
  server!: Element;

  @property({ type: Function })
  onConfirm!: (data: LDeviceData) => void;

  @query('#addLDeviceDialog') dialog!: Dialog;

  @state()
  private inst: string = '';

  connectedCallback(): void {
    super.connectedCallback();
  }

  public show(): void {
    this.inst = '';
    this.dialog.show();
  }

  private close(): void {
    this.dialog.close();
  }

  private handleCreate(): void {
    const data: LDeviceData = {
      inst: this.inst,
    };
    this.onConfirm(data);
    this.close();
  }

  private get lDeviceInst(): string[] {
    return getLDeviceInsts(this.server);
  }

  private getInstError(value: string): string {
    const trimmed = value.trim();
    if (!trimmed) return get('iededitor.addLDeviceDialog.instRequiredError');
    if (!/^[A-Za-z0-9][0-9A-Za-z_]*$/.test(trimmed))
      return get('iededitor.addLDeviceDialog.instFormatError');
    if (trimmed.length > 64)
      return get('iededitor.addLDeviceDialog.instTooLongError');
    if (this.lDeviceInst.includes(trimmed))
      return get('iededitor.addLDeviceDialog.instUniqueError');
    return '';
  }

  render(): TemplateResult {
    const error = this.getInstError(this.inst);
    return html`
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
            .validityTransform=${(value: string) => {
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
            @input=${(e: Event) => {
              this.inst = (e.target as HTMLInputElement).value;
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
  static styles = css`
    .dialog-content {
      margin-top: 16px;
      width: 320px;
      max-width: 100vw;
      box-sizing: border-box;
    }
  `;
}
