import { TemplateResult, html } from 'lit';
import { query } from 'lit/decorators.js';

import { Wizards } from '../src/addons/Wizards.js';
import { WizardFactory } from '../src/foundation.js';
import { OpenSCD } from '../src/open-scd.js';
import { WizardDialog } from '../src/wizard-dialog.js';

export interface Type<T> {
  new (...params: any[]): T;
}

export abstract class MockOpenSCD<T extends HTMLElement> extends OpenSCD {
  @query('oscd-plugin')
  plugin!: T;

  @query('oscd-wizards')
  wizards!: Wizards;

  renderHosting(): TemplateResult {
    return html`<oscd-plugin></oscd-plugin>`;
  }

  get wizardUI(): WizardDialog {
    return this.wizards.wizardUI;
  }

  get workflow(): WizardFactory[] {
    return this.wizards.workflow;
  }
}
