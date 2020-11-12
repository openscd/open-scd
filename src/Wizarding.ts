import {
  html,
  internalProperty,
  property,
  TemplateResult,
  query,
} from 'lit-element';
import {
  ifImplemented,
  LitElementConstructor,
  Mixin,
  Wizard,
  WizardEvent,
} from './foundation.js';

import './wizard-dialog.js';
import { WizardDialog } from './wizard-dialog.js';

/** `LitElement` mixin that adds a `workflow` property which [[`Wizard`]]s are
 * queued onto on incoming [[`WizardEvent`]]s, first come first displayed. */
export type WizardingElement = Mixin<typeof Wizarding>;

export function Wizarding<TBase extends LitElementConstructor>(Base: TBase) {
  class WizardingElement extends Base {
    /** FIFO queue of [[`Wizard`]]s to display. */
    @internalProperty()
    workflow: Wizard[] = [];

    @query('wizard-dialog') wizardUI!: WizardDialog;

    private onWizard(we: WizardEvent) {
      if (we.detail.wizard === null) this.workflow.shift();
      else this.workflow.push(we.detail.wizard);
      this.requestUpdate('workflow');
    }

    constructor(...args: any[]) {
      super(...args);

      this.addEventListener('wizard', this.onWizard);
    }

    render(): TemplateResult {
      return html`${ifImplemented(super.render())}
      ${this.workflow.length
        ? html`<wizard-dialog .wizard=${this.workflow[0]}></wizard-dialog>`
        : ''}`;
    }
  }

  return WizardingElement;
}
