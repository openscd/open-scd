import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { translate, translateUnsafeHTML } from 'lit-translate';

import '@material/mwc-dialog';
import { Dialog } from '@material/mwc-dialog';

import { saveDocumentToFile } from '../file.js';

@customElement('compas-session-expired-dialog')
export class CompasSessionExpiredDialogElement extends LitElement {
  @property({ type: Number })
  public expiredSessionMessage: number = 15 * 60 * 1000;
  @property({ type: Document })
  public doc: XMLDocument | null = null;
  @property({ type: String })
  public docName = '';

  @query('mwc-dialog[id="compasSessionExpiredDialog"]')
  private dialog!: Dialog;

  show(): void {
    if (!this.dialog.open) {
      this.dialog.show();
    }
  }

  close(): void {
    if (this.dialog.open) {
      this.dialog.close();
    }
  }

  save(): void {
    saveDocumentToFile(this.doc, this.docName);
  }

  render(): TemplateResult {
    const expiredSessionMessage = this.expiredSessionMessage / 60 / 1000;
    return html`
      <mwc-dialog id="compasSessionExpiredDialog"
                  heading="${translate('compas.session.headingExpired')}"
                  scrimClickAction=""
                  escapeKeyAction=""">
        <div>${
          this.doc == null
            ? translateUnsafeHTML(
                'compas.session.explainExpiredWithoutProject',
                { expiredSessionMessage: expiredSessionMessage }
              )
            : translateUnsafeHTML('compas.session.explainExpiredWithProject', {
                expiredSessionMessage: expiredSessionMessage,
              })
        }
        </div>
        ${
          this.doc !== null
            ? html`<mwc-button
                slot="primaryAction"
                @click=${() => this.save()}
                ?disabled=${this.doc == null}
              >
                ${translate('compas.session.saveProject')}
              </mwc-button>`
            : html``
        }
      </mwc-dialog>
    `;
  }

  static styles = css`
    #compasSessionExpiredDialog {
      --mdc-dialog-min-width: 23vw;
      --mdc-dialog-max-width: 92vw;
    }
  `;
}
