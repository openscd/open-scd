import {
  customElement,
  html,
  LitElement,
  property,
  query,
  state,
  TemplateResult,
} from 'lit-element';
import { WizardEvent, WizardFactory } from '../foundation.js';
import '../wizard-dialog.js';
import { WizardDialog } from '../wizard-dialog.js';
import { CreateWizardRequest, EditWizardRequest } from '../scl-wizarding.js';

function adaptV3Wizard(v3Def: unknown): WizardFactory | null {
  const v3 = v3Def as {
    steps: Array<{
      title: string;
      render: () => TemplateResult;
    }>;
  };
  if (!v3?.steps?.length) return null;

  return () =>
    v3.steps.map(step => ({
      title: step.title,
      content: [step.render()],
      actions: [
        {
          label: 'Close',
          icon: 'close',
          action: () => [],
        },
      ],
    }));
}

/** `LitElement` mixin that adds a `workflow` property which [[`Wizard`]]s are
 * queued onto on incoming [[`WizardEvent`]]s, first come first displayed. */
@customElement('oscd-wizards')
export class OscdWizards extends LitElement {
  @property({ type: Object })
  host!: HTMLElement;

  /** FIFO queue of WizardFactories to display */
  @state()
  workflow: WizardFactory[] = [];

  @query('wizard-dialog')
  wizardUI!: WizardDialog;

  private onWizard(event: WizardEvent) {
    const { wizard, subwizard, v3Wizard } = event.detail;
    if (v3Wizard) {
      const adapted = adaptV3Wizard(v3Wizard);
      if (adapted === null) {
        this.workflow.shift();
      } else if (subwizard) {
        this.workflow.unshift(adapted);
      } else {
        this.workflow.push(adapted);
      }
    } else if (wizard === null) {
      this.workflow.shift();
    } else if (wizard) {
      if (subwizard) {
        this.workflow.unshift(wizard);
      } else {
        this.workflow.push(wizard);
      }
    }

    this.updateWizards();
  }

  private onWizardRequest(
    e: CustomEvent<EditWizardRequest | CreateWizardRequest>
  ) {
    const detail = e.detail as (EditWizardRequest | CreateWizardRequest) & {
      wizard?: WizardFactory;
    };
    if ('wizard' in detail && detail.wizard) {
      const wf = detail.wizard as WizardFactory;
      detail.subWizard ? this.workflow.unshift(wf) : this.workflow.push(wf);
    } else {
      console.log('[oscd-wizards] No wizard provided, skipping...');
    }

    this.updateWizards();
  }

  private onCloseWizard() {
    this.workflow.shift();
    this.updateWizards();
  }

  private updateWizards() {
    this.requestUpdate('workflow');
    this.updateComplete
      .then(() => this.wizardUI.updateComplete)
      .then(() => this.wizardUI.dialog?.updateComplete)
      .then(() => this.wizardUI.dialog?.focus());
  }

  connectedCallback() {
    super.connectedCallback();

    this.host.addEventListener('wizard', this.onWizard.bind(this));
    this.host.addEventListener('oscd-edit-wizard-request', (e: Event) =>
      this.onWizardRequest(e as CustomEvent<EditWizardRequest>)
    );
    this.host.addEventListener('oscd-create-wizard-request', (e: Event) =>
      this.onWizardRequest(e as CustomEvent<CreateWizardRequest>)
    );
    this.host.addEventListener('oscd-close-wizard', () => this.onCloseWizard());
    this.host.addEventListener('editor-action', () =>
      this.wizardUI.requestUpdate()
    );
  }

  render(): TemplateResult {
    return html`
      <slot></slot>
      <wizard-dialog .wizard=${this.workflow[0]?.() ?? []}></wizard-dialog>
    `;
  }
}
