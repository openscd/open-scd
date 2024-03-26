import { Editing } from '../src/Editing.js';
import {
  LitElement,
  customElement,
  TemplateResult,
  html,
  query,
} from 'lit-element';

import '../src/addons/Wizards.js';
import { OscdWizards } from '../src/addons/Wizards.js';

@customElement('mock-wizard-editor')
export class MockWizardEditor extends Editing(LitElement) {
  @query('oscd-wizards')
  wizards!: OscdWizards;

  render(): TemplateResult {
    return html`<oscd-wizards .host=${this}><slot></slot></oscd-wizards>`;
  }

  get wizardUI() {
    return this.wizards.wizardUI;
  }

  get dialog() {
    return this.wizardUI.dialog;
  }

  get dialogs() {
    return this.wizardUI.dialogs;
  }

  get workflow() {
    return this.wizards.workflow;
  }
}
