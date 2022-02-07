import {html, LitElement} from 'lit-element';
import {get} from "lit-translate";

import {newPendingStateEvent, newWizardEvent, Wizard, WizardInput} from '../foundation.js';

import CompasSaveElement from "../compas/CompasSave.js";
import {getOpenScdElement} from "../compas/foundation.js";

import "../compas/CompasSave.js";

export default class CompasSaveMenuPlugin extends LitElement {
  doc!: XMLDocument;
  docName!: string;
  docId?: string;

  private saveToCompasWizard(): Wizard {
    function saveToCompas() {
      return function (inputs: WizardInput[], wizard: Element) {
        const compasSave = <CompasSaveElement>wizard.shadowRoot!.querySelector('compas-save')
        if (!compasSave.valid()) {
          return [];
        }

        getOpenScdElement().dispatchEvent(newPendingStateEvent(compasSave.saveToCompas()));
        return [];
      };
    }

    return [
      {
        title: get('compas.save.title'),
        primary: {
          icon: 'save',
          label: get('save'),
          action: saveToCompas(),
        },
        content: [
          html `<compas-save .doc="${this.doc}" .docName="${this.docName}" .docId="${this.docId}">
                </compas-save>`
        ],
      },
    ];
  }

  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(this.saveToCompasWizard()));
  }
}


