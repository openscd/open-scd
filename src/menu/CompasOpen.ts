import {html, LitElement} from 'lit-element';
import {get} from "lit-translate";

import {newPendingStateEvent, newWizardEvent, Wizard} from '../foundation.js';

import {DocRetrievedEvent} from "../compas/CompasOpen.js";
import {updateDocumentInOpenSCD} from "../compas/foundation.js";

import "../compas/CompasOpen.js";

export default class CompasOpenMenuPlugin extends LitElement {
  parent!: HTMLElement;

  private openCompasWizard(parent: HTMLElement): Wizard {
    async function openDoc(parent: Element, event: DocRetrievedEvent): Promise<void> {
      updateDocumentInOpenSCD(event.detail.doc, event.detail.docName);
      parent.dispatchEvent(newWizardEvent());
    }

    return [
      {
        title: get('compas.open.title'),
        content: [
          html`<compas-open @docRetrieved=${(event: DocRetrievedEvent) => {
                                             parent.dispatchEvent(newPendingStateEvent(openDoc(parent, event)));
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
    this.dispatchEvent(newWizardEvent(this.openCompasWizard(this.parent)));
  }
}
