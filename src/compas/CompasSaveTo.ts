import {customElement, html, LitElement, property, TemplateResult} from "lit-element";
import {get, translate} from "lit-translate";
import {TextFieldBase} from "@material/mwc-textfield/mwc-textfield-base";

import {newLogEvent, newWizardEvent, Wizard, WizardInput} from "../foundation.js";
import {OpenSCD} from "../open-scd.js";

import {CompasChangeSetRadiogroup} from "./CompasChangeSet.js";
import {CompasScltypeRadiogroup} from "./CompasScltypeRadiogroup.js";
import {CompasSclDataService} from "./CompasSclDataService.js";
import {getTypeFromDocName, stripExtensionFromName, updateDocumentInOpenSCD} from "./foundation.js";

import './CompasChangeSet.js';
import './CompasScltypeRadiogroup.js';

@customElement('compas-save-to')
export class CompasSaveTo extends LitElement {
  @property({type: String})
  docName!: string;
  @property({type: String})
  docId!: string;

  getNameField() : TextFieldBase {
    return <TextFieldBase>this.shadowRoot!.querySelector('mwc-textfield[id="name"]');
  }

  getSclTypeRadioGroup() : CompasScltypeRadiogroup {
    return (<CompasScltypeRadiogroup>this.shadowRoot!
      .querySelector('compas-scltype-radiogroup'))
  }

  getChangeSetRadiogroup(): CompasChangeSetRadiogroup {
    return (<CompasChangeSetRadiogroup>this.shadowRoot!
      .querySelector('compas-changeset-radiogroup'))
  }

  valid(): boolean {
    if (!this.docId) {
      return this.getNameField().checkValidity()
        && this.getSclTypeRadioGroup().valid();
    }
    return this.getChangeSetRadiogroup().valid();
  }

  render(): TemplateResult {
    if (!this.docId) {
      return html`
        <mwc-textfield dialogInitialFocus id="name" label="${translate('scl.name')}"
                       value="${this.docName}" required>
        </mwc-textfield>

        <compas-scltype-radiogroup .value="${getTypeFromDocName(this.docName)}"></compas-scltype-radiogroup>
      `;
    }
    return html `
      <compas-changeset-radiogroup></compas-changeset-radiogroup>
    `;
  }
}

function getSclDocument(type: string, id: string): void {
  CompasSclDataService().getSclDocument(type, id)
    .then(doc => {
      updateDocumentInOpenSCD(doc);
    });
}

function addSclToCompas(wizard: Element, compasSaveTo: CompasSaveTo, doc: XMLDocument) {
  const name = stripExtensionFromName(compasSaveTo.getNameField().value);
  const docType = compasSaveTo.getSclTypeRadioGroup().getSelectedValue() ?? '';

  CompasSclDataService().addSclDocument(docType, {sclName: name, doc: doc})
    .then(xmlResponse => {
      const id = Array.from(xmlResponse.querySelectorAll('Id') ?? [])[0];

      // Retrieve the document to fetch server-side updates.
      getSclDocument(docType, id.textContent ?? '');

      const openScd = <OpenSCD>document.querySelector('open-scd');
      openScd.dispatchEvent(
          newLogEvent({
            kind: 'info',
            title: get('compas.saveTo.addSuccess')}));

      // Close the Save Dialog.
      openScd.dispatchEvent(newWizardEvent());
    })
    .catch(() => {
      const openScd = <OpenSCD>document.querySelector('open-scd');
      openScd.dispatchEvent(
          newLogEvent({
            kind: 'error',
            title: get('compas.saveTo.addError')}));
    });
}

function updateSclInCompas(wizard: Element, compasSaveTo: CompasSaveTo, docId: string, docName: string, doc: XMLDocument) {
  const changeSet = compasSaveTo.getChangeSetRadiogroup().getSelectedValue();
  const docType = getTypeFromDocName(docName);

  CompasSclDataService().updateSclDocument(docType.toUpperCase(), docId, {changeSet: changeSet!, doc: doc})
    .then(() => {
      // Retrieve the document to fetch server-side updates.
      getSclDocument(docType, docId);

      const openScd = <OpenSCD>document.querySelector('open-scd');
      openScd.dispatchEvent(
          newLogEvent({
            kind: 'info',
            title: get('compas.saveTo.updateSuccess')}));

      // Close the Save Dialog.
      openScd.dispatchEvent(newWizardEvent());
    })
    .catch(() => {
      const openScd = <OpenSCD>document.querySelector('open-scd');
      openScd.dispatchEvent(
          newLogEvent({
            kind: 'error',
            title: get('compas.saveTo.updateError')}));
    });
}

function saveToCompas(docId: string, docName: string, doc: XMLDocument) {
  return function (inputs: WizardInput[], wizard: Element) {
    const compasSaveTo = <CompasSaveTo>wizard.shadowRoot!.querySelector('compas-save-to')
    if (!doc || !compasSaveTo.valid()) {
      return [];
    }

    if (!docId) {
      addSclToCompas(wizard, compasSaveTo, doc);
    } else {
      updateSclInCompas(wizard, compasSaveTo, docId, docName, doc);
    }
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

