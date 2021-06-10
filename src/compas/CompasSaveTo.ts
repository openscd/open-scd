import {customElement, html, LitElement, property, TemplateResult} from "lit-element";
import {newWizardEvent, Wizard, WizardInput} from "../foundation.js";
import {get, translate} from "lit-translate";

import {TextFieldBase} from "@material/mwc-textfield/mwc-textfield-base";
import {OpenSCD} from "../open-scd.js";
import {CompasChangeSetRadiogroup} from "./CompasChangeSet.js";
import {CompasScltypeRadiogroup} from "./CompasScltypeRadiogroup.js";
import {addSclDocument, updateSclDocument} from "./CompasService.js";

import '../compas/CompasChangeSet.js';
import './CompasScltypeRadiogroup.js';

@customElement('compas-save-to')
export class CompasSaveTo extends LitElement {
  @property({type: String})
  docName!: string;
  @property({type: String})
  docId!: string;
  @property({type: String})
  docType!: string;

  @property({type: String})
  errorMessage!: string;

  getNameValue() : string {
    return (<TextFieldBase>this.shadowRoot!.querySelector('mwc-textfield[id="name"]')).value;
  }

  getSclTypeRadioGroup() : CompasScltypeRadiogroup {
    return (<CompasScltypeRadiogroup>this.shadowRoot!
      .querySelector("compas-scltype-radiogroup"))
  }

  getChangeSetRadiogroup(): CompasChangeSetRadiogroup {
    return (<CompasChangeSetRadiogroup>this.shadowRoot!
      .querySelector("compas-changeset-radiogroup"))
  }

  render(): TemplateResult {
    return this.renderWizardPage();
  }

  renderWizardPage(): TemplateResult {
    if (!this.docId || !this.docType) {
      return html`
        <div style="error">${this.errorMessage}</div>
        <mwc-textfield dialogInitialFocus id="name" label="${translate('scl.name')}"
                       value="${this.docName}" required>
        </mwc-textfield>

        <compas-scltype-radiogroup></compas-scltype-radiogroup>
      `;
    }
    return html `
      <compas-changeset-radiogroup></compas-changeset-radiogroup>
    `;
  }
}

function addSclToCompass(wizard: Element, doc: XMLDocument) {
  const openScd = <OpenSCD>document.querySelector('open-scd');
  const compasSaveTo = <CompasSaveTo> wizard.shadowRoot!.querySelector('compas-save-to')
  let name = compasSaveTo.getNameValue();
  if (name!.lastIndexOf(".") == name!.length - 4) {
    name = name.substring(0, name.lastIndexOf("."));
  }
  const newDocType = compasSaveTo.getSclTypeRadioGroup().getSelectedValue();

  openScd!.docType = newDocType;
  openScd!.docName = name + "." + newDocType.toLowerCase()

  addSclDocument(newDocType, {sclName: name, doc: doc})
    .then(document => {
      const id = Array.from(document.querySelectorAll('Id') ?? [])[0];
      openScd!.docId = id.textContent ?? "";
      openScd!.docName = (id.textContent ?? "") + "." + newDocType.toLowerCase()
      compasSaveTo.errorMessage = "";

      // Close the Save Dialog.
      openScd!.dispatchEvent(newWizardEvent());
    })
    .catch(() => {
      compasSaveTo.errorMessage = "Error adding SCL to CoMPAS!";
    });
}

function updateSclInCompas(wizard: Element, docType: string, docId: string, doc: XMLDocument) {
  const openScd = <OpenSCD>document.querySelector('open-scd');
  const compasSaveTo = <CompasSaveTo>wizard.shadowRoot!.querySelector('compas-save-to')
  const changeSet = compasSaveTo.getChangeSetRadiogroup().getSelectedValue();
  updateSclDocument(docType.toUpperCase(), docId, {changeSet: changeSet, doc: doc})
    .then(() => {
      compasSaveTo.errorMessage = "";

      // Close the Save Dialog.
      openScd!.dispatchEvent(newWizardEvent());
    })
    .catch(() => {
      compasSaveTo.errorMessage = "Error updating SCL in CoMPAS!";
    });
}

function saveToCompass(doc: XMLDocument, docId: string, docType: string) {
  return function (inputs: WizardInput[], wizard: Element) {
    if (doc) {
      if (!docId || !docType) {
        addSclToCompass(wizard, doc);
      } else {
        updateSclInCompas(wizard, docType, docId, doc);
      }
    }
    return [];
  };
}

export interface SaveToCompasWizardOptions {
  docName: string,
  docId: string,
  docType: string
}
export function saveToCompasWizard(doc: XMLDocument, saveToOptions: SaveToCompasWizardOptions): Wizard {
  return [
    {
      title: get('compas.saveTo.title'),
      primary: {
        icon: 'save',
        label: get('save'),
        action: saveToCompass(doc, saveToOptions.docId, saveToOptions.docType),
      },
      content: [
        html `
          <compas-save-to .docName="${saveToOptions.docName}" .docId="${saveToOptions.docId}" .docType="${saveToOptions.docType}"/>
        ` ],
    },
  ];
}

