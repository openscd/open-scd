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

@customElement('compas-session-expiring-dialog')
export class CompasSessionExpiringDialogElement extends LitElement {
  @property({ type: Number })
  public expiringSessionWarning: number = 10 * 60 * 1000;
  @property({ type: Number })
  public expiredSessionMessage: number = 15 * 60 * 1000;

  private getDialog(): Dialog {
    return <Dialog>(
      this.shadowRoot!.querySelector(
        'mwc-dialog[id="compasSessionExpiringDialog"]'
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
      --mdc-dialog-max-width: 800px;
    }
  `;
}
