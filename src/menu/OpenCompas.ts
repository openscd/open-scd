import {html, LitElement} from 'lit-element';
import {newLogEvent, newPendingStateEvent, newWizardEvent, Wizard, WizardInput} from '../foundation.js';
import {get} from "lit-translate";

import CompasOpenElement, {DocRetrievedEvent} from "../compas/CompasOpen.js";
import {getOpenScdElement, updateDocumentInOpenSCD} from "../compas/foundation.js";

import "../compas/CompasOpen.js";

export default class OpenCompasPlugin extends LitElement {
  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(openCompasWizard()));
  }
}

function openCompasWizard(): Wizard {
  async function openDoc(element: Element, sclDocument: Document): Promise<void> {
    const openScd = getOpenScdElement();
    openScd.dispatchEvent(
      newLogEvent({
        kind: 'reset'
      }));

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
        html`<open-compas @docRetrieved=${(evt: DocRetrievedEvent) => {
                                          const element = evt.detail.element;
                                          const doc = evt.detail.doc;
                                          element.dispatchEvent(newPendingStateEvent(openDoc(element, doc)));
                                        }}/>`,
      ],
    },
  ];
}
