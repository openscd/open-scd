import {LitElement} from 'lit-element';
import {newWizardEvent} from '../foundation.js';
import {loginWizard} from "../login/LoginElement.js";

export default class LoginPlugin extends LitElement {
  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(loginWizard()));
  }
}
