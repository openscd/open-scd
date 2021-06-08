import {LitElement} from 'lit-element';
import {newWizardEvent} from '../foundation.js';
import {compasSclTypeListWizard} from "../compas/CompasScltype.js";

export default class OpenCompasPlugin extends LitElement {
  async trigger(): Promise<void> {
    this.dispatchEvent(newWizardEvent(compasSclTypeListWizard()));
  }
}

