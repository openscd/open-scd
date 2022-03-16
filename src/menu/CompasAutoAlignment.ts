import {html, LitElement} from 'lit-element';
import {get} from "lit-translate";

import {newPendingStateEvent, newWizardEvent, Wizard, WizardInput} from '../foundation.js';

import CompasAutoAlignmentElement from "../compas/CompasAutoAlignment.js";
import {dispatchEventOnOpenScd} from "../compas/foundation.js";

import "../compas/CompasAutoAlignment.js";

export default class CompasAutoAlignmentMenuPlugin extends LitElement {
  doc!: XMLDocument;
  docName!: string;
  docId?: string;

  private autoAlignmentCompasWizard(): Wizard {
    function execute() {
      return function (inputs: WizardInput[], wizard: Element) {
        const compasAutoAlignmentElement = <CompasAutoAlignmentElement>wizard.shadowRoot!.querySelector('compas-auto-alignment')
        if (!compasAutoAlignmentElement.valid()) {
          return [];
        }

        dispatchEventOnOpenScd(newPendingStateEvent(compasAutoAlignmentElement.execute()));
        return [];
      };
    }

    return [
      {
        title: get('compas.autoAlignment.title'),
        primary: {
          icon: 'dashboard',
          label: get('compas.autoAlignment.button'),
          action: execute(),
        },
        content: [
          html `
            <compas-auto-alignment .doc="${this.doc}" .docName="${this.docName}" .docId="${this.docId}">
            </compas-auto-alignment>
          `,
        ],
      },
    ];
  }

  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(this.autoAlignmentCompasWizard()));
  }
}
