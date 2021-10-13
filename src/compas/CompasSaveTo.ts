import {customElement, html, LitElement, TemplateResult} from "lit-element";
import {get, translate} from "lit-translate";
import {TextFieldBase} from "@material/mwc-textfield/mwc-textfield-base";

import {newLogEvent, newPendingStateEvent, newWizardEvent, Wizard, WizardInput} from "../foundation.js";

import {CompasExistsIn} from "./CompasExistsIn.js";
import {CompasChangeSetRadiogroup} from "./CompasChangeSetRadiogroup.js";
import {CompasSclTypeRadiogroup} from "./CompasSclTypeRadiogroup.js";
import {CompasCommentElement} from "./CompasComment.js";
import {CompasSclDataService} from "../compas-services/CompasSclDataService.js";
import {createLogEvent} from "../compas-services/foundation.js";
import {getOpenScdElement, getTypeFromDocName, stripExtensionFromName, updateDocumentInOpenSCD} from "./foundation.js";
import './CompasSclTypeRadiogroup.js';

@customElement('compas-save-to')
export class CompasSaveTo  extends CompasExistsIn(LitElement) {
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

  private async addSclToCompas(wizard: Element, doc: XMLDocument): Promise<void> {
    const name = stripExtensionFromName(this.getNameField().value);
    const comment = this.getCommentField().getValue();
    const docType = this.getSclTypeRadioGroup().getSelectedValue() ?? '';

    await CompasSclDataService().addSclDocument(docType, {sclName: name, comment: comment, doc: doc})
      .then(response => {
        const sclData = response.querySelectorAll("SclData").item(0).textContent;
        const sclDocument = new DOMParser().parseFromString(sclData??'', 'application/xml');

        updateDocumentInOpenSCD(sclDocument);

        const openScd = getOpenScdElement();
        openScd.dispatchEvent(
          newLogEvent({
            kind: 'info',
            title: get('compas.saveTo.addSuccess')
          }));

        // Close the Save Dialog.
        openScd.dispatchEvent(newWizardEvent());
      })
      .catch(createLogEvent);
  }

  private async updateSclInCompas(wizard: Element, docId: string, docName: string, doc: XMLDocument): Promise<void> {
    const changeSet = this.getChangeSetRadiogroup().getSelectedValue();
    const comment = this.getCommentField().getValue();
    const docType = getTypeFromDocName(docName);

    await CompasSclDataService().updateSclDocument(docType.toUpperCase(), docId, {changeSet: changeSet!, comment: comment, doc: doc})
      .then(response => {
        const sclData = response.querySelectorAll("SclData").item(0).textContent;
        const sclDocument = new DOMParser().parseFromString(sclData??'', 'application/xml');
        updateDocumentInOpenSCD(sclDocument);

        const openScd = getOpenScdElement();
        openScd.dispatchEvent(
          newLogEvent({
            kind: 'info',
            title: get('compas.saveTo.updateSuccess')
          }));

        // Close the Save Dialog.
        openScd.dispatchEvent(newWizardEvent());
      })
      .catch(createLogEvent);
  }

  async saveToCompas(wizard: Element, docId: string, docName: string, doc: XMLDocument): Promise<void> {
    if (!this.existInCompas) {
      await this.addSclToCompas(wizard, doc);
    } else {
      await this.updateSclInCompas(wizard, docId, docName, doc);
    }
  }

  render(): TemplateResult {
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
}

function saveToCompas(docId: string, docName: string, doc: XMLDocument) {
  return function (inputs: WizardInput[], wizard: Element) {
    const compasSaveTo = <CompasSaveTo>wizard.shadowRoot!.querySelector('compas-save-to')
    if (!doc || !compasSaveTo.valid()) {
      return [];
    }

    getOpenScdElement().dispatchEvent(newPendingStateEvent(compasSaveTo.saveToCompas(wizard, docId, docName, doc)));
    return [];
  };
}

export interface SaveToCompasWizardOptions {
  docId: string,
  docName: string
}
export function saveToCompasWizard(doc: XMLDocument, saveToOptions: SaveToCompasWizardOptions): Wizard {
  return [
    {
      title: get('compas.saveTo.title'),
      primary: {
        icon: 'save',
        label: get('save'),
        action: saveToCompas(saveToOptions.docId, saveToOptions.docName, doc),
      },
      content: [
        html `
          <compas-save-to .docName="${saveToOptions.docName}" .docId="${saveToOptions.docId}"/>
        ` ],
    },
  ];
}

