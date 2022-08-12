import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-dialog';
import '@material/mwc-button';
import '@material/mwc-icon-button-toggle';
import { Dialog } from '@material/mwc-dialog';

import 'ace-custom-element';

@customElement('oscd-dialog')
export class OscdDialog extends LitElement {
  /** Whether dialog is open */
  @property({ type: Boolean })
  open = false;

  /** dialogs header content*/
  @property({ type: String })
  heading = '';

  /** callback on primary action button click */
  @property({ attribute: false })
  primaryAction?: () => void;
  /** Label of primary action button */
  @property({ type: String })
  primaryLabel?: string;
  /** Icon of primary action icon */
  @property({ type: String })
  primaryIcon?: string;

  /** SCL element to be edited in the code editor */
  @property({ attribute: false })
  element?: Element;
  @property({ attribute: false })
  codeAction?: () => void;

  @query('mwc-dialog') dialog!: Dialog;

  onClosed(ae: CustomEvent<{ action: string } | null>): void {
    if (!(ae.target instanceof Dialog && ae.detail?.action)) return;
    if (ae.detail.action === 'close') this.open = false;
  }

  render(): TemplateResult {
    return html`<mwc-dialog
      heading=${this.heading}
      ?open=${this.open}
      @closed=${this.onClosed}
    >
      ${this.element
        ? html`<mwc-icon-button-toggle
            class="code"
            onicon="code"
            officon="code_off"
            @click=${() => this.requestUpdate()}
          ></mwc-icon-button-toggle>`
        : html``}
      ${this.element
        ? html`<ace-editor
            class="code"
            base-path="/public/ace"
            wrap
            soft-tabs
            style="width: 80vw; height: calc(100vh - 240px);"
            theme="ace/theme/solarized_${localStorage.getItem('theme')}"
            mode="ace/mode/xml"
            value="${new XMLSerializer().serializeToString(this.element)}"
          ></ace-editor>`
        : html``}
      <slot></slot>
      <mwc-button
        slot="secondaryAction"
        dialogAction="close"
        label="${translate('close')}"
        style="--mdc-theme-primary: var(--mdc-theme-error)"
      ></mwc-button
      >${this.primaryAction && this.primaryLabel
        ? html`<mwc-button
            id="primaryActionButton"
            slot="primaryAction"
            @click=${this.primaryAction}
            icon="${this.primaryIcon ?? ''}"
            label="${this.primaryLabel}"
            trailingIcon
          ></mwc-button>`
        : html``}
      ${this.element && this.codeAction
        ? html`<mwc-button
            id="codeActionButton"
            slot="primaryAction"
            @click=${this.codeAction}
            icon="code"
            label="${translate('save')}"
            trailingIcon
          ></mwc-button>`
        : html``}</mwc-dialog
    >`;
  }

  static styles = css`
    mwc-dialog {
      --mdc-dialog-max-width: 92vw;
    }

    mwc-dialog > mwc-icon-button-toggle.code {
      position: absolute;
      top: 8px;
      right: 14px;
      color: var(--base00);
    }

    mwc-icon-button-toggle.code[on] {
      color: var(--mdc-theme-primary);
    }

    mwc-icon-button-toggle:not([on]) ~ ace-editor {
      display: none;
    }

    mwc-icon-button-toggle:not([on]) ~ #codeActionButton {
      display: none;
    }

    mwc-icon-button-toggle[on] ~ ::slotted(*) {
      display: none;
    }

    mwc-icon-button-toggle[on] ~ #primaryActionButton {
      display: none;
    }
  `;
}
