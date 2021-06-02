import {html, LitElement} from 'lit-element';
import {get} from "lit-translate";
import {newWizardEvent, Wizard, WizardActor} from '../foundation.js';
import '../editors/compas/compas-scltype-list.ts';

export default class OpenCompasPlugin extends LitElement {
  async trigger(): Promise<void> {
    this.dispatchEvent(newWizardEvent(listCompasWizard()));
  }
}

export function openlListCompasWizard(): WizardActor {
  return () => [() => listCompasWizard()];
}

function listCompasWizard(): Wizard {
  return [
    {
      title: get('compas.open.listSclTypes'),
      content: [
        html`<compas-scltype-list/>`,
      ],
    },
  ];
}

