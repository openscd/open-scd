import {html, LitElement} from 'lit-element';
import {get} from "lit-translate";

import {newPendingStateEvent, newWizardEvent, Wizard} from '../foundation.js';

import {DocRetrievedEvent} from "../compas/CompasOpen.js";
import {updateDocumentInOpenSCD} from "../compas/foundation.js";

import "../compas/CompasOpen.js";

export default class CompasOpenMenuPlugin extends LitElement {
  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(openCompasWizard()));
  }
}

function openCompasWizard(): Wizard {
  async function openDoc(element: Element, sclDocument: Document, docName?: string): Promise<void> {
    updateDocumentInOpenSCD(sclDocument, docName);
    element.dispatchEvent(newWizardEvent());
  }

  return [
    {
      title: get('compas.open.title'),
      content: [
        html`<compas-open @docRetrieved=${(evt: DocRetrievedEvent) => {
                                          const element = evt.detail.element;
                                          const doc = evt.detail.doc;
                                          const docName = evt.detail.docName;
                                          element.dispatchEvent(newPendingStateEvent(openDoc(element, doc, docName)));
                                        }}>
             </compas-open>
        `,
      ],
    },
  ];
}
