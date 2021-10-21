import {html, LitElement} from 'lit-element';
import {get} from "lit-translate";

import {newWizardEvent, Wizard} from '../foundation.js';

import {DocRetrievedEvent} from "../compas/CompasOpen.js";
import {mergeSubstation} from "./UpdateSubstation.js";

import "../compas/CompasOpen.js";

export default class CompasOpenMenuPlugin extends LitElement {
  doc!: XMLDocument;

  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(substationCompasWizard(this.doc)));
  }
}

function substationCompasWizard(doc: Document): Wizard {
  return [
    {
      title: get('compas.updateSubstation.title'),
      content: [
        html`<compas-open @docRetrieved=${(evt: DocRetrievedEvent) => {
                                            mergeSubstation(doc, evt.detail.doc);
                                            const element = evt.detail.element;
                                            element.dispatchEvent(newWizardEvent());
                                          }}>
             </compas-open>
        `,
      ],
    },
  ];
}
