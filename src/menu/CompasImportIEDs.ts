import {html, LitElement} from 'lit-element';
import {get} from "lit-translate";

import {newWizardEvent, Wizard} from '../foundation.js';

import {DocRetrievedEvent} from "../compas/CompasOpen.js";
import {prepareImportIEDs} from "./ImportIEDs.js";

import "../compas/CompasOpen.js";

export default class CompasImportIEDSMenuPlugin extends LitElement {
  doc!: XMLDocument;
  parent!: HTMLElement;

  private importIEDsCompasWizard(parent: HTMLElement, doc: Document): Wizard {
    return [
      {
        title: get('compas.importIEDS.title'),
        content: [
          html`<compas-open @docRetrieved=${async (event: DocRetrievedEvent) => {
                                             await prepareImportIEDs(parent, doc, event.detail.doc);
                                             parent.dispatchEvent(newWizardEvent());
                                           }}>
               </compas-open>
          `,
        ],
      },
    ];
  }

  firstUpdated(): void {
    this.parent = this.parentElement!;
  }

  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(this.importIEDsCompasWizard(this.parent, this.doc)));
  }
}
