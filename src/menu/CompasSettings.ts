import {LitElement} from 'lit-element';
import {newWizardEvent} from '../foundation.js';
import {compasSettingWizard} from "../compas/CompasSettingsElement.js";

export default class CompasSettingsPlugin extends LitElement {
  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(compasSettingWizard()));
  }
}

