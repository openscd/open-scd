import {LitElement} from 'lit-element';
import {newWizardEvent} from '../foundation.js';
import {compasSclTypeListWizard} from "../compas/CompasScltypeList.js";

export default class OpenCompasPlugin extends LitElement {
  async load(): Promise<void> {
    this.dispatchEvent(newWizardEvent(compasSclTypeListWizard()));
  }
}

