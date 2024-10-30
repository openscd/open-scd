import {
  LitElement,
  customElement,
  TemplateResult,
  html,
  query,
  property
} from 'lit-element';

import '../src/addons/Wizards.js';

import '../src/addons/Editor.js';

import { OscdWizards } from '../src/addons/Wizards.js';

@customElement('mock-wizard-editor')
export class MockWizardEditor extends LitElement {
  @property({ type: Object }) doc!: XMLDocument;

  @query('oscd-wizards')
  wizards!: OscdWizards;

  render(): TemplateResult {
    return html`
      <oscd-editor
        .doc=${this.doc}
        .docName=${'test'}
        .docId=${'test'}
        .host=${this}
        .editCount=${-1}
      >
        <oscd-wizards .host=${this}>
          <slot></slot>
        </oscd-wizards>
      </oscd-editor>
    `;
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
