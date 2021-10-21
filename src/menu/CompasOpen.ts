import {html, LitElement} from 'lit-element';
import {get} from "lit-translate";

import {newPendingStateEvent, newWizardEvent, Wizard, WizardInput} from '../foundation.js';

import CompasOpenElement, {DocRetrievedEvent} from "../compas/CompasOpen.js";
import {updateDocumentInOpenSCD} from "../compas/foundation.js";

import "../compas/CompasOpen.js";

export default class CompasOpenMenuPlugin extends LitElement {
  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(openCompasWizard()));
  }
}

function openCompasWizard(): Wizard {
  async function openDoc(element: Element, sclDocument: Document): Promise<void> {
    updateDocumentInOpenSCD(sclDocument);

    element.dispatchEvent(newWizardEvent());
  }

  function cancel() {
    return function (inputs: WizardInput[], wizard: Element) {
      const compasOpen = <CompasOpenElement>wizard.shadowRoot!.querySelector('open-compas')
      compasOpen!.cancel();
      return [];
    };
  }

  return [
    {
      title: get('compas.open.title'),
      secondary: {
        icon: '',
        label: get('cancel'),
        action: cancel(),
        style: '--mdc-theme-primary: var(--mdc-theme-error)'
      },
      content: [
        html`<compas-open @docRetrieved=${(evt: DocRetrievedEvent) => {
                                          const element = evt.detail.element;
                                          const doc = evt.detail.doc;
                                          element.dispatchEvent(newPendingStateEvent(openDoc(element, doc)));
                                        }}>
             </compas-open>
        `,
      ],
    },
  ];
}
