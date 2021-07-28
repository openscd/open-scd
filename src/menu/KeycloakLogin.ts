import {LitElement} from 'lit-element';
import {newWizardEvent} from '../foundation.js';
import {keycloakLoginWizard} from "../compas/KeycloakLoginElement.js";

export default class KeycloakLoginPlugin extends LitElement {
  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(keycloakLoginWizard()));
  }
}
