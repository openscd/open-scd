import {
  css,
  customElement,
  html,
  LitElement,
  property,
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

  private getDialog(): Dialog {
    return <Dialog>(
      this.shadowRoot!.querySelector(
        'mwc-dialog[id="compasSessionExpiredDialog"]'
      )
    );
  }

  show(): void {
    const expiringDialog = this.getDialog();
    if (expiringDialog && !expiringDialog.open) {
      expiringDialog.show();
    }
  }

  close(): void {
    const expiringDialog = this.getDialog();
    if (expiringDialog && expiringDialog.open) {
      expiringDialog.close();
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
      --mdc-dialog-max-width: 1024px;
    }
  `;
}
