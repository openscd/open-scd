import {
  css,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import { newPendingStateEvent } from '../foundation.js';

import CompasSaveElement from '../compas/CompasSave.js';

import '../compas/CompasSave.js';
import { Dialog } from '@material/mwc-dialog';

export default class CompasSaveAsMenuPlugin extends LitElement {
  @property()
  doc!: XMLDocument;
  @property()
  docName!: string;

  @query('mwc-dialog')
  dialog!: Dialog;

  @query('compas-save')
  compasSaveElement!: CompasSaveElement;

  async run(): Promise<void> {
    this.dialog.open = true;
  }

  render(): TemplateResult {
    return html`<mwc-dialog
      id="compas-save-as-dlg"
      heading="${translate('compas.save.title')}"
    >
      ${!this.doc || !this.docName
        ? html`<compas-loading></compas-loading>`
        : html`
            <compas-save .doc="${this.doc}" .docName="${this.docName}">
            </compas-save>
            <mwc-button
              slot="primaryAction"
              icon="save"
              trailingIcon
              label="${translate('save')}"
              @click=${() => {
                if (this.compasSaveElement.valid()) {
                  this.dispatchEvent(
                    newPendingStateEvent(this.compasSaveElement.saveToCompas())
                  );
                  this.dialog.close();
                }
              }}
            ></mwc-button>
            <mwc-button
              slot="secondaryAction"
              icon=""
              label="${translate('close')}"
              dialogAction="close"
              style="--mdc-theme-primary: var(--mdc-theme-error)"
            >
            </mwc-button>
          `}
    </mwc-dialog>`;
  }

  static styles = css`
    mwc-dialog {
      --mdc-dialog-min-width: 23vw;
      --mdc-dialog-max-width: 92vw;
    }
  `;
}
