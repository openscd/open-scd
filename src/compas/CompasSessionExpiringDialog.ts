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

@customElement('compas-session-expiring-dialog')
export class CompasSessionExpiringDialogElement extends LitElement {
  @property({ type: Number })
  public expiringSessionWarning: number = 10 * 60 * 1000;
  @property({ type: Number })
  public expiredSessionMessage: number = 15 * 60 * 1000;

  @query('mwc-dialog[id="compasSessionExpiringDialog"]')
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

  render(): TemplateResult {
    return html`
      <mwc-dialog
        id="compasSessionExpiringDialog"
        heading="${translate('compas.session.headingExpiring')}"
        scrimClickAction=""
      >
        <div>
          ${translateUnsafeHTML('compas.session.explainExpiring', {
            timeTillExpire:
              (this.expiredSessionMessage - this.expiringSessionWarning) /
              60 /
              1000,
            expiringSessionWarning: this.expiringSessionWarning / 60 / 1000,
          })}
        </div>
        <mwc-button slot="primaryAction" dialogAction="close">
          ${translate('compas.session.continue')}
        </mwc-button>
      </mwc-dialog>
    `;
  }

  static styles = css`
    #compasSessionExpiringDialog {
      --mdc-dialog-min-width: 23vw;
      --mdc-dialog-max-width: 92vw;
    }
  `;
}
