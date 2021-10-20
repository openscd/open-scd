import {LitElement} from 'lit-element';
import {newWizardEvent} from '../foundation.js';
import {compasSclTypeListWizard} from "../compas/CompasSclTypeList.js";

export default class OpenCompasPlugin extends LitElement {
  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(compasSclTypeListWizard()));
  }
}

