import {html, LitElement} from 'lit-element';
import {get} from "lit-translate";

import {newPendingStateEvent, newWizardEvent, Wizard, WizardInput} from '../foundation.js';

import {CompasSaveTo} from "../compas/CompasSaveTo.js";
import {getOpenScdElement} from "../compas/foundation.js";

import "../compas/CompasSaveTo.js";

export default class CompasSaveToMenuPlugin extends LitElement {
  doc!: XMLDocument;
  docId!: string;
  docName!: string;

  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(saveToCompasWizard(this.doc, {docId: this.docId, docName: this.docName})));
  }
}

interface SaveToCompasWizardOptions {
  docId: string,
  docName: string
}
function saveToCompasWizard(doc: XMLDocument, saveToOptions: SaveToCompasWizardOptions): Wizard {
  function saveToCompas(docId: string, docName: string, doc: XMLDocument) {
    return function (inputs: WizardInput[], wizard: Element) {
      const compasSaveTo = <CompasSaveTo>wizard.shadowRoot!.querySelector('compas-save-to')
      if (!doc || !compasSaveTo.valid()) {
        return [];
      }

      getOpenScdElement().dispatchEvent(newPendingStateEvent(compasSaveTo.saveToCompas(docId, docName, doc)));
      return [];
    };
  }

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

