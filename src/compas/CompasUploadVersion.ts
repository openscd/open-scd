import {customElement, html, LitElement, TemplateResult} from "lit-element";
import {get, translate} from "lit-translate";

import {newLogEvent, newPendingStateEvent, newWizardEvent, Wizard, WizardInput} from "../foundation.js";

import {CompasExistsIn} from "./CompasExistsIn.js";
import {CompasSclDataService} from "../compas-services/CompasSclDataService.js";
import {createLogEvent} from "../compas-services/foundation.js";
import {getOpenScdElement, getTypeFromDocName, updateDocumentInOpenSCD} from "./foundation.js";
import {CompasChangeSetRadiogroup} from "./CompasChangeSetRadiogroup.js";
import {CompasCommentElement} from "./CompasComment.js";

import './CompasChangeSetRadiogroup.js';

@customElement('compas-upload-version')
export class CompasUploadVersionElement extends CompasExistsIn(LitElement) {
  getSclFileField() : HTMLInputElement {
    return <HTMLInputElement>this.shadowRoot!.querySelector('input[id="scl-file"]');
  }

  getSclFilenameField() : HTMLInputElement {
    return <HTMLInputElement>this.shadowRoot!.querySelector('wizard-textfield[id="filename"]');
  }

  getChangeSetRadiogroup(): CompasChangeSetRadiogroup {
    return (<CompasChangeSetRadiogroup>this.shadowRoot!.querySelector('compas-changeset-radiogroup'))
  }

  getCommentField() : CompasCommentElement {
    return (<CompasCommentElement>this.shadowRoot!.querySelector('compas-comment'))
  }

  valid(): boolean {
    return this.getChangeSetRadiogroup().valid()
      && this.getSclFileField().checkValidity()
      && this.getSclFilenameField().checkValidity();
  }

  public async updateDocumentInCompas(): Promise<void> {
    const changeSet = this.getChangeSetRadiogroup().getSelectedValue();
    const comment = this.getCommentField().getValue();
    const docType = getTypeFromDocName(this.docName);

    const file = this.getSclFileField()?.files?.item(0) ?? false;
    if (!file) return;

    const text = await file.text();
    const doc = new DOMParser().parseFromString(text, 'application/xml');

    await CompasSclDataService().updateSclDocument(docType, this.docId!,
      {changeSet: changeSet!, comment: comment, doc: doc})
      .then(sclDocument => {
        updateDocumentInOpenSCD(sclDocument);

        const openScd = getOpenScdElement();
        openScd.dispatchEvent(
          newLogEvent({
            kind: 'info',
            title: get('compas.uploadVersion.updateSuccess')
          }));

        // Close the Save Dialog.
        openScd.dispatchEvent(newWizardEvent());
      })
      .catch(createLogEvent);
  }

  render(): TemplateResult {
    if (this.existInCompas === undefined) {
      return html `
        <compas-loading></compas-loading>
      `
    }

    if (!this.existInCompas) {
      return html `
        <mwc-list>
          <mwc-list-item>${translate("compas.notExists")}</mwc-list-item>
        </mwc-list>
      `
    }

    const docType = getTypeFromDocName(this.docName);
    return html`
      <input id="scl-file" accept=".${docType.toLowerCase()}" type="file" hidden required
             @change=${() => {
               const file = this.getSclFileField()?.files?.item(0);
               const input = this.getSclFilenameField();
               input.value = file?.name??'';
             }}
      >
      <wizard-textfield id="filename" required
                        label="${translate('compas.uploadVersion.filename')}">
      </wizard-textfield>

      <mwc-button label="${translate('compas.uploadVersion.selectButton')}"
                  @click=${() => {
                    const input = <HTMLInputElement | null>this.shadowRoot!.querySelector("#scl-file");
                    input?.click();
                  }}
      >
      </mwc-button>

      <compas-changeset-radiogroup></compas-changeset-radiogroup>
      <compas-comment></compas-comment>
    `;
  }
}

export interface AddToCompasWizardOptions {
  docId: string,
  docName: string
}
export function addVersionToCompasWizard(saveToOptions: AddToCompasWizardOptions): Wizard {
  function uploadToCompas() {
    return function (inputs: WizardInput[], wizard: Element) {
      const compasAddTo = <CompasUploadVersionElement>wizard.shadowRoot!.querySelector('compas-upload-version')
      if (!compasAddTo.valid()) {
        return [];
      }

      getOpenScdElement().dispatchEvent(newPendingStateEvent(compasAddTo.updateDocumentInCompas()));
      return [];
    };
  }

  return [
    {
      title: get('compas.uploadVersion.title'),
      primary: {
        icon: 'save',
        label: get('save'),
        action: uploadToCompas(),
      },
      content: [
        html `
          <compas-upload-version .docName="${saveToOptions.docName}" .docId="${saveToOptions.docId}"/>
        ` ],
    },
  ];
}

