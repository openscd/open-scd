import {
  customElement,
  TemplateResult,
  html,
  query,
} from 'lit-element';

import '../src/addons/Wizards.js';
import type { OscdWizards } from '../src/addons/Wizards.js';
import './mock-editor.js';
import { MockEditor } from './mock-editor.js';

@customElement('mock-wizard-editor')
export class MockWizardEditor extends MockEditor {

  @query('oscd-wizards')
  wizards!: OscdWizards;

  render(): TemplateResult {
    return html`
      <oscd-wizards .host=${this}>
      ${super.render()}
      </oscd-wizards>`;
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
