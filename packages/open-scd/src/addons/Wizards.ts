import {
  html,
  state,
  TemplateResult,
  query,
  LitElement,
  customElement,
} from 'lit-element';
import { WizardEvent, WizardFactory } from '../foundation.js';

import '../wizard-dialog.js';
import { WizardDialog } from '../wizard-dialog.js';

/** `LitElement` that adds a `workflow` property which [[`Wizard`]]s are
 * queued onto on incoming [[`WizardEvent`]]s, first come first displayed. */
@customElement('oscd-wizard')
export class OscdWizard extends LitElement {
  /** FIFO queue of [[`Wizard`]]s to display. */
  @state()
  workflow: WizardFactory[] = [];

  @query('wizard-dialog')
  wizardUI!: WizardDialog;

  private onWizard(we: WizardEvent) {
    const wizard = we.detail.wizard;
    if (wizard === null) this.workflow.shift();
    else if (we.detail.subwizard) this.workflow.unshift(wizard);
    else this.workflow.push(wizard);
    this.requestUpdate('workflow');
    this.updateComplete.then(() =>
      this.wizardUI.updateComplete.then(() =>
        this.wizardUI.dialog?.updateComplete.then(() =>
          this.wizardUI.dialog?.focus()
        )
      )
    );
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('wizard', this.onWizard);
    this.addEventListener('editor-action', () => this.wizardUI.requestUpdate());
  }

  render(): TemplateResult {
    return html`<slot></slot>
      <wizard-dialog .wizard=${this.workflow[0]?.() ?? []}></wizard-dialog>`;
  }
}
