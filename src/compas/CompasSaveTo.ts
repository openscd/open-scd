import {customElement, html, LitElement, property, TemplateResult} from "lit-element";
import {newWizardEvent, Wizard, WizardInput} from "../foundation.js";
import {get, translate} from "lit-translate";

import {TextFieldBase} from "@material/mwc-textfield/mwc-textfield-base";
import {OpenSCD} from "../open-scd.js";
import {CompasChangeSetRadiogroup} from "./CompasChangeSet.js";
import {CompasScltypeRadiogroup} from "./CompasScltype.js";
import {addSclDocument, updateSclDocument} from "./CompasService.js";

import '../compas/CompasChangeSet.js';
import '../compas/CompasScltype.js';

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

  render(): TemplateResult {
    return this.renderWizardPage();
  }

  renderWizardPage(): TemplateResult {
    if (!this.docId || !this.docType) {
      return html`
        <div >${this.errorMessage}</div>
        <mwc-textfield dialogInitialFocus id="name" label="${translate('scl.name')}"
                       value="${this.docName}">
        </mwc-textfield>

        <compas-scltype-radiogroup></compas-scltype-radiogroup>
      `;
    }
    return html `
      <compas-changeset-radiogroup></compas-changeset-radiogroup>
    `;
  }

  getNameValue() : string {
    return (<TextFieldBase>this.shadowRoot!.querySelector('mwc-textfield')).value;
  }

  getSclType() : string {
    return (<CompasScltypeRadiogroup>this.shadowRoot!
      .querySelector("compas-scltype-radiogroup"))
      .getSelectedValue()

  }

  getChangeSetValue(): string {
    return (<CompasChangeSetRadiogroup>this.shadowRoot!
              .querySelector("compas-changeset-radiogroup"))
                  .getSelectedValue()
  }
}

function saveToCompass(doc: XMLDocument, docId: string, docType: string) {
  return function (inputs: WizardInput[], wizard: Element) {
    if (doc) {
      const openScd = <OpenSCD>document.querySelector('open-scd');
      const compasSaveTo = <CompasSaveTo> wizard.shadowRoot!.querySelector('compas-save-to')
      if (!docId || !docType) {
        let name = compasSaveTo.getNameValue();
        if (name!.lastIndexOf(".") == name!.length - 4) {
          name = name.substring(0, name.lastIndexOf("."));
        }
        const newDocType = compasSaveTo.getSclType();

        openScd!.docType = newDocType;
        openScd!.docName = name + "." + newDocType.toLowerCase()

        addSclDocument(newDocType, name, doc)
          .then(document => {
            const id = Array.from(document.querySelectorAll('Id') ?? [])[0];
            openScd!.docId = id.textContent ?? "";
            openScd!.docName = (id.textContent ?? "") + "." + newDocType.toLowerCase()
            compasSaveTo.errorMessage = "";

            // Close the Save Dialog.
            openScd!.dispatchEvent(newWizardEvent());
          })
          .catch(reason => {
            compasSaveTo.errorMessage = "Error adding SCL to CoMPAS!";
          });
      } else {
        const changeSet = compasSaveTo.getChangeSetValue();
        updateSclDocument(docType.toUpperCase(), docId, changeSet, doc)
          .then(() => {
            compasSaveTo.errorMessage = "";

            // Close the Save Dialog.
            openScd!.dispatchEvent(newWizardEvent());
          })
          .catch(reason => {
            compasSaveTo.errorMessage = "Error updating SCL in CoMPAS!";
          });
      }
    }

    return [];
  };
}

export function saveToCompasWizard(doc: XMLDocument, docName: string, docId: string, docType: string): Wizard {
  return [
    {
      title: get('compas.saveTo.title'),
      primary: {
        icon: 'save',
        label: get('save'),
        action: saveToCompass(doc, docId, docType),
      },
      content: [
        html `
          <compas-save-to .docName="${docName}" .docId="${docId}" .docType="${docType}"/>
        ` ],
    },
  ];
}

