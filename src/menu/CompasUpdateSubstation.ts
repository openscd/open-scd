import {html, LitElement} from 'lit-element';
import {get} from "lit-translate";

import {newWizardEvent, Wizard} from '../foundation.js';

import {DocRetrievedEvent} from "../compas/CompasOpen.js";
import {mergeSubstation} from "./UpdateSubstation.js";

import "../compas/CompasOpen.js";

export default class CompasUpdateSubstationMenuPlugin extends LitElement {
  doc!: XMLDocument;
  parent!: HTMLElement;

  private substationCompasWizard(parent: HTMLElement, doc: Document): Wizard {
    return [
      {
        title: get('compas.updateSubstation.title'),
        content: [
          html`<compas-open @docRetrieved=${(evt: DocRetrievedEvent) => {
                                             mergeSubstation(this, doc, evt.detail.doc);
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
    this.dispatchEvent(newWizardEvent(this.substationCompasWizard(this.parent, this.doc)));
  }
}
