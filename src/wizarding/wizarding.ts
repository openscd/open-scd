import { html, internalProperty, TemplateResult, query } from 'lit-element';
import {
  ifImplemented,
  LitElementConstructor,
  Mixin,
} from '../utils.js';

import './wizard-dialog.js';
import { WizardDialog } from '../wizard-dialog.js';
import { Wizard, WizardFactory } from './wizard.js';
import { WizardEvent } from './event.js';

/** `LitElement` mixin that adds a `workflow` property which [[`Wizard`]]s are
 * queued onto on incoming [[`WizardEvent`]]s, first come first displayed. */
export type WizardingElement = Mixin<typeof Wizarding>;

export function Wizarding<TBase extends LitElementConstructor>(Base: TBase) {
  class WizardingElement extends Base {
    /** FIFO queue of [[`Wizard`]]s to display. */
    @internalProperty()
    workflow: WizardFactory[] = [];

    @query('wizard-dialog') wizardUI!: WizardDialog;

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

    constructor(...args: any[]) {
      super(...args);

      this.addEventListener('wizard', this.onWizard);
      this.addEventListener('editor-action', () =>
        this.wizardUI.requestUpdate()
      );
    }

    render(): TemplateResult {
      const defaultWizard: Wizard = []

      let wizard = defaultWizard

      const nextWizardFactory = this.workflow[0]
      if(nextWizardFactory){
        wizard = nextWizardFactory()
      }

      return html`
        ${ifImplemented(super.render())}
        <wizard-dialog .wizard=${wizard}></wizard-dialog>
      `;
    }
  }

  return WizardingElement;
}
