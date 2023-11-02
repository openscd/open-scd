import {
  css,
  html,
  LitElement,
  property,
  query,
  state,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-dialog';
import { Dialog } from '@material/mwc-dialog';

import { newPendingStateEvent } from '../foundation.js';

import CompasSaveElement from '../compas/CompasSave.js';
import { DocRetrievedEvent } from '../compas/CompasOpen.js';

import '../compas/CompasOpen.js';
import '../compas/CompasSave.js';
import {
  COMPAS_SCL_PRIVATE_TYPE,
  copyCompasLabels,
  copyCompasSclFileType,
  copyCompasSclName,
  getPrivate,
} from '../compas/private.js';

export default class CompasSaveAsVersionMenuPlugin extends LitElement {
  @property()
  doc!: XMLDocument;
  @property()
  docName!: string;
  @property({ type: Number })
  editCount = -1;

  @state()
  private saveToDoc?: XMLDocument;
  @state()
  private saveToDocName?: string;
  @state()
  private saveToDocId?: string;

  @query('mwc-dialog#compas-save-as-version-dlg')
  dialog!: Dialog;

  @query('compas-save')
  compasSaveElement?: CompasSaveElement;

  @query('compas-open')
  compasOpenElement?: CompasSaveElement;

  async run(): Promise<void> {
    this.saveToDoc = undefined;
    this.saveToDocName = undefined;
    this.saveToDocId = undefined;

    if (this.compasSaveElement) {
      await this.compasSaveElement.requestUpdate();
    }
    if (this.compasOpenElement) {
      await this.compasOpenElement.requestUpdate();
    }
    this.dialog.show();
  }

  /**
   * To prevent problem with double SCL Filenames, we will retrieve the CoMPAS Private for SCL Element from the
   * selected document, to which the current document will be added as new version, and copy the CoMPAS SCL Private
   * Elements to the current document.
   */
  private copyCompasPrivates(): void {
    if (this.saveToDoc) {
      const toPrivateElement = getPrivate(
        this.doc.documentElement,
        COMPAS_SCL_PRIVATE_TYPE
      );
      const fromPrivateElement = getPrivate(
        this.saveToDoc.documentElement,
        COMPAS_SCL_PRIVATE_TYPE
      );

      copyCompasSclName(fromPrivateElement, toPrivateElement);
      copyCompasSclFileType(fromPrivateElement, toPrivateElement);
      copyCompasLabels(fromPrivateElement, toPrivateElement);
    }
  }

  render(): TemplateResult {
    return html` <mwc-dialog
      id="compas-save-as-version-dlg"
      heading="${translate('compas.save.saveAsVersionTitle')}"
    >
      ${!this.doc || !this.docName
        ? html` <compas-loading></compas-loading>`
        : !this.saveToDoc || !this.saveToDocId
        ? html`
            <compas-open
              .allowLocalFile="${false}"
              @doc-retrieved=${(event: DocRetrievedEvent) => {
                this.saveToDoc = event.detail.doc;
                this.saveToDocName = event.detail.docName;
                this.saveToDocId = event.detail.docId;
                this.copyCompasPrivates();
              }}
            ></compas-open>
          `
        : html` <compas-save
              .doc="${this.doc}"
              .docName="${this.saveToDocName}"
              .docId="${this.saveToDocId}"
              .allowLocalFile="${false}"
              .editCount=${this.editCount}
              @doc-saved=${() => {
                this.dialog.close();
              }}
            ></compas-save>
            <mwc-button
              slot="primaryAction"
              icon="save"
              trailingIcon
              label="${translate('save')}"
              @click=${() => {
                if (this.compasSaveElement && this.compasSaveElement.valid()) {
                  this.dispatchEvent(
                    newPendingStateEvent(this.compasSaveElement.saveToCompas())
                  );
                }
              }}
            ></mwc-button>`}
      <mwc-button
        slot="secondaryAction"
        icon=""
        label="${translate('close')}"
        dialogAction="close"
        style="--mdc-theme-primary: var(--mdc-theme-error)"
      >
      </mwc-button>
    </mwc-dialog>`;
  }

  static styles = css`
    mwc-dialog {
      --mdc-dialog-min-width: 23vw;
      --mdc-dialog-max-width: 92vw;
    }
  `;
}
