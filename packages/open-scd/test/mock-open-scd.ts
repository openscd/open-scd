import {
  customElement,
  TemplateResult,
  html,
  queryAssignedNodes,
  query,
} from 'lit-element';
import { Wizards } from '../src/addons/Wizards.js';
import { WizardFactory } from '../src/foundation.js';
import { OpenSCD } from '../src/open-scd.js';
import { WizardDialog } from '../src/wizard-dialog.js';

@customElement('mock-open-scd')
export class MockOpenSCD extends OpenSCD {
  @queryAssignedNodes()
  _slots!: Array<HTMLElement>;

  @query('oscd-wizards')
  wizards!: Wizards;

  renderHosting(): TemplateResult {
    return html`<slot></slot>`;
  }

  getPlugin<T extends HTMLElement>(name: string): T | undefined {
    return this._slots.find(
      s => s.tagName.toLowerCase() === name.toLowerCase()
    ) as T | undefined;
  }

  getActivePlugin<T extends HTMLElement>(): T {
    return this._slots[0]! as T;
  }

  get wizardUI(): WizardDialog {
    return this.wizards.wizardUI;
  }

  get workflow(): WizardFactory[] {
    return this.wizards.workflow;
  }
}
