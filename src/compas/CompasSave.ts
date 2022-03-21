import {customElement, html, LitElement, property, TemplateResult} from "lit-element";
import {get, translate} from "lit-translate";
import {TextFieldBase} from "@material/mwc-textfield/mwc-textfield-base";

import '@material/mwc-textfield';
import '@material/mwc-button';

import {newLogEvent, newWizardEvent} from "../foundation.js";
import {saveDocumentToFile} from "../file.js";

import {CompasExistsIn} from "./CompasExistsIn.js";
import {CompasChangeSetRadiogroup} from "./CompasChangeSetRadiogroup.js";
import {CompasSclTypeRadiogroup} from "./CompasSclTypeRadiogroup.js";
import {CompasCommentElement} from "./CompasComment.js";
import {CompasSclDataService} from "../compas-services/CompasSclDataService.js";
import {createLogEvent} from "../compas-services/foundation.js";
import {
  dispatchEventOnOpenScd,
  getTypeFromDocName,
  stripExtensionFromName,
  updateDocumentInOpenSCD
} from "./foundation.js";

import './CompasChangeSetRadiogroup.js';
import './CompasComment.js';
import './CompasDivider.js';
import './CompasLoading.js';
import './CompasSclTypeRadiogroup.js';

@customElement('compas-save')
export default class CompasSaveElement extends CompasExistsIn(LitElement) {
  @property({type: Document})
  doc!: XMLDocument;

  getNameField() : TextFieldBase {
    return <TextFieldBase>this.shadowRoot!.querySelector('mwc-textfield[id="name"]');
  }

  getSclTypeRadioGroup() : CompasSclTypeRadiogroup {
    return (<CompasSclTypeRadiogroup>this.shadowRoot!
      .querySelector('compas-scltype-radiogroup'))
  }

  getChangeSetRadiogroup(): CompasChangeSetRadiogroup {
    return (<CompasChangeSetRadiogroup>this.shadowRoot!
      .querySelector('compas-changeset-radiogroup'))
  }

  getCommentField() : CompasCommentElement {
    return (<CompasCommentElement>this.shadowRoot!.querySelector('compas-comment'))
  }

  valid(): boolean {
    if (!this.existInCompas) {
      return this.getNameField().checkValidity()
        && this.getSclTypeRadioGroup().valid();
    }
    return this.getChangeSetRadiogroup().valid();
  }

  private async addSclToCompas(doc: XMLDocument): Promise<void> {
    const name = stripExtensionFromName(this.getNameField().value);
    const comment = this.getCommentField().getValue();
    const docType = this.getSclTypeRadioGroup().getSelectedValue() ?? '';

    await CompasSclDataService().addSclDocument(docType, {sclName: name, comment: comment, doc: doc})
      .then(sclDocument => {
        updateDocumentInOpenSCD(sclDocument);

        dispatchEventOnOpenScd(
          newLogEvent({
            kind: 'info',
            title: get('compas.save.addSuccess')
          }));

        // Close the Save Dialog.
        this.dispatchEvent(newWizardEvent());
      })
      .catch(createLogEvent);
  }

  private async updateSclInCompas(docId: string, docName: string, doc: XMLDocument): Promise<void> {
    const changeSet = this.getChangeSetRadiogroup().getSelectedValue();
    const comment = this.getCommentField().getValue();
    const docType = getTypeFromDocName(docName);

    await CompasSclDataService().updateSclDocument(docType, docId, {changeSet: changeSet!, comment: comment, doc: doc})
      .then(sclDocument => {
        updateDocumentInOpenSCD(sclDocument);

        dispatchEventOnOpenScd(
          newLogEvent({
            kind: 'info',
            title: get('compas.save.updateSuccess')
          }));

        // Close the Save Dialog.
        this.dispatchEvent(newWizardEvent());
      })
      .catch(createLogEvent);
  }

  async saveToCompas(): Promise<void> {
    if (!this.docId || !this.existInCompas) {
      await this.addSclToCompas(this.doc);
    } else {
      await this.updateSclInCompas(this.docId, this.docName, this.doc);
    }
  }

  private renderSaveFilePart(): TemplateResult {
    return html `
      <mwc-button label="${translate('compas.save.saveFileButton')}"
                  @click=${() => {
                    saveDocumentToFile(this.doc, this.docName);

                    // Close the Save Dialog.
                    this.dispatchEvent(newWizardEvent());
                  }}>
      </mwc-button>
    `;
  }

  private renderSaveCompasPart(): TemplateResult {
    if (this.existInCompas === undefined) {
      return html `
        <compas-loading></compas-loading>
      `
    }

    if (!this.existInCompas) {
      return html`
        <mwc-textfield dialogInitialFocus id="name" label="${translate('scl.name')}"
                       value="${this.docName}" required>
        </mwc-textfield>

        <compas-scltype-radiogroup .value="${getTypeFromDocName(this.docName)}"></compas-scltype-radiogroup>
        <compas-comment></compas-comment>
      `;
    }
    return html`
      <compas-changeset-radiogroup></compas-changeset-radiogroup>
      <compas-comment></compas-comment>
    `;
  }

  render(): TemplateResult {
    return html `
      <compas-divider></compas-divider>
      <section>
        <h3>${translate('compas.save.localTitle')}</h3>
        ${this.renderSaveFilePart()}
      </section>
      <compas-divider></compas-divider>
      <section>
        <h3>${translate('compas.save.compasTitle')}</h3>
        ${this.renderSaveCompasPart()}
      </section>
    `;
  }
}
