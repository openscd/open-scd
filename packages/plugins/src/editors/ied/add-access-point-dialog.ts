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
import '@material/mwc-dialog';
import '@material/mwc-button';
import '@material/mwc-textfield';
import '@material/mwc-switch';
import '@material/mwc-formfield';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';

import {
  getExistingAccessPointNames,
  getAccessPointsWithServer,
} from './foundation.js';
import { TextField } from '@material/mwc-textfield';

export interface AccessPointCreationData {
  name: string;
  createServerAt: boolean;
  serverAtApName?: string;
  serverAtDesc?: string;
}

/** A dialog component for adding new AccessPoints */
@customElement('add-access-point-dialog')
export class AddAccessPointDialog extends LitElement {
  @property()
  doc!: XMLDocument;

  @property()
  ied!: Element;

  @property({ type: Function })
  onConfirm!: (data: AccessPointCreationData) => void;

  @query('#createAccessPointDialog') dialog!: Dialog;

  @query('#apName') apNameField!: TextField;

  @state()
  private apName = '';

  @state()
  private createServerAt = false;

  @state()
  private serverAtApName = '';

  @state()
  private serverAtDesc = '';

  get open() {
    return this.dialog?.open ?? false;
  }

  private isApNameUnique(name: string): boolean {
    const existingNames = getExistingAccessPointNames(this.ied);
    return !existingNames.includes(name);
  }

  private get accessPointsWithServer(): string[] {
    return getAccessPointsWithServer(this.ied);
  }

  public show(): void {
    this.apName = '';
    this.createServerAt = false;
    this.serverAtApName = '';
    this.serverAtDesc = '';
    this.dialog.show();
  }

  private reset(): void {
    this.apName = '';
    this.createServerAt = false;
    this.serverAtApName = '';
    this.serverAtDesc = '';
  }

  private close(): void {
    this.dialog.close();
    this.reset();
  }

  private handleCreate(): void {
    if (this.apNameField.checkValidity()) {
      const data: AccessPointCreationData = {
        name: this.apName,
        createServerAt: this.createServerAt,
        serverAtApName: this.createServerAt ? this.serverAtApName : undefined,
        serverAtDesc:
          this.createServerAt && this.serverAtDesc
            ? this.serverAtDesc
            : undefined,
      };
      this.onConfirm(data);
      this.close();
    }
  }

  private getApNameError(value: string): string {
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (!/^[A-Za-z0-9][0-9A-Za-z_]*$/.test(trimmed))
      return get('iededitor.addAccessPointDialog.nameFormatError');
    if (trimmed.length > 32)
      return get('iededitor.addAccessPointDialog.nameTooLongError');
    if (!this.isApNameUnique(trimmed))
      return get('iededitor.addAccessPointDialog.nameUniqueError');
    return '';
  }

  render(): TemplateResult {
    const accessPointsWithServer = this.accessPointsWithServer;
    let serverAtSection: TemplateResult = html``;
    if (accessPointsWithServer.length > 0) {
      if (
        this.createServerAt &&
        (!this.serverAtApName ||
          !accessPointsWithServer.includes(this.serverAtApName))
      ) {
        this.serverAtApName = accessPointsWithServer[0];
      }
      serverAtSection = html`
        <mwc-formfield
          label=${translate('iededitor.addAccessPointDialog.createServerAt')}
        >
          <mwc-switch
            ?selected=${this.createServerAt}
            ?checked=${this.createServerAt}
            @change=${(e: Event) => {
              this.createServerAt = (e.target as HTMLInputElement).checked;
              if (
                this.createServerAt &&
                (!this.serverAtApName ||
                  !accessPointsWithServer.includes(this.serverAtApName))
              ) {
                this.serverAtApName = accessPointsWithServer[0];
              }
              if (!this.createServerAt) this.serverAtApName = '';
            }}
          ></mwc-switch>
        </mwc-formfield>
        ${this.createServerAt
          ? html`
              <mwc-select
                label=${translate(
                  'iededitor.addAccessPointDialog.selectAccessPoint'
                )}
                .value=${this.serverAtApName}
                @change=${(e: Event) => {
                  e.stopPropagation();
                  this.serverAtApName = (e.target as HTMLSelectElement).value;
                }}
                @click=${(e: Event) => e.stopPropagation()}
                @closed=${(e: Event) => e.stopPropagation()}
                style="width: 100%; margin-bottom: 16px;"
              >
                ${accessPointsWithServer.map(
                  (ap: string) =>
                    html`<mwc-list-item value=${ap}>${ap}</mwc-list-item>`
                )}
              </mwc-select>
              <mwc-textfield
                label=${translate(
                  'iededitor.addAccessPointDialog.serverAtDesc'
                )}
                .value=${this.serverAtDesc}
                @input=${(e: Event) => {
                  this.serverAtDesc = (e.target as HTMLInputElement).value;
                }}
                style="width: 100%; margin-bottom: 16px;"
              ></mwc-textfield>
            `
          : ''}
      `;
    }

    return html`
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
            .validityTransform=${(value: string) => {
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
            @input=${(e: Event) => {
              this.apName = (e.target as HTMLInputElement).value;
            }}
          ></mwc-textfield>
          ${serverAtSection}
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
          ?disabled=${!this.apNameField ||
          !this.apNameField.validity.valid ||
          (this.createServerAt && !this.serverAtApName)}
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
}
