import {
  customElement,
  TemplateResult,
  html,
  queryAssignedNodes,
  query,
} from 'lit-element';
import { OscdWizards } from '@openscd/open-scd/src/addons/Wizards.js';
import { WizardFactory } from '@openscd/open-scd/src/foundation.js';
import { OpenSCD } from '../src/open-scd.js';
import { WizardDialog } from '@openscd/open-scd/src/wizard-dialog.js';

import { CompasHistory } from '../src/addons/CompasHistory.js';
import { CompasLayout } from '../src/addons/CompasLayout.js';

@customElement('mock-compas-open-scd')
export class MockCompasOpenSCD extends OpenSCD {
  @queryAssignedNodes()
  _plugins!: Array<HTMLElement>;

  @query('oscd-wizards')
  wizards!: OscdWizards;

  @query('compas-history')
  historyAddon!: CompasHistory;

  @query('compas-layout')
  layout!: CompasLayout;

  renderHosting(): TemplateResult {
    return html`<slot></slot>`;
  }

  render(): TemplateResult {
    return html`
    ${this.renderHosting()}
    ${super.render()}`;
  }

  getPlugin<T extends HTMLElement>(name: string): T | undefined {
    return this._plugins.find(
      p => p.tagName.toLowerCase() === name.toLowerCase()
    ) as T | undefined;
  }

  getActivePlugin<T extends HTMLElement>(): T {
    return this._plugins[0]! as T;
  }

  get wizardUI(): WizardDialog {
    return this.wizards.wizardUI;
  }

  get workflow(): WizardFactory[] {
    return this.wizards.workflow;
  }
}
