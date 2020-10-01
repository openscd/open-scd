import {
  customElement,
  css,
  queryAll,
  LitElement,
  property,
  internalProperty,
  TemplateResult,
  query,
  html,
} from 'lit-element';

import '@material/mwc-button';
import '@material/mwc-dialog';
import { Dialog } from '@material/mwc-dialog';

import './wizard-textfield.js';
import {
  newActionEvent,
  Wizard,
  WizardInput,
  WizardPage,
  Action,
  newWizardEvent,
} from './foundation.js';

function dialogInputs(dialog: Dialog): WizardInput[] {
  return Array.from(dialog.querySelectorAll('wizard-textfield'));
}

function dialogValid(dialog: Dialog): boolean {
  return dialogInputs(dialog).every(wi => wi.checkValidity());
}

@customElement('wizard-dialog')
export class WizardDialog extends LitElement {
  @property()
  wizard: Wizard = [];
  @internalProperty()
  pageIndex = 0;
  @queryAll('mwc-dialog')
  dialogs!: NodeListOf<Dialog>;
  @queryAll('wizard-textfield')
  inputs!: NodeListOf<WizardInput>;

  get dialog(): Dialog {
    return this.dialogs[this.pageIndex];
  }

  checkValidity(): boolean {
    return Array.from(this.inputs).every(wi => wi.checkValidity());
  }

  get firstInvalidPage(): number {
    return Array.from(this.dialogs).findIndex(dialog => !dialogValid(dialog));
  }

  async next(): Promise<void> {
    if (dialogValid(this.dialog)) {
      if ((this.wizard.length ?? 0) > this.pageIndex + 1) this.pageIndex++;
    } else {
      this.dialog.show();
      await this.dialog.updateComplete;
      dialogInputs(this.dialog).map(wi => wi.reportValidity());
    }
  }
  prev(): void {
    if (this.pageIndex > 0) this.pageIndex--;
  }

  reset(): void {
    this.dispatchEvent(newWizardEvent());
  }

  async act(action?: (inputs: WizardInput[]) => Action[]): Promise<boolean> {
    if (action === undefined) return false;
    const inputArray = Array.from(this.inputs);
    if (!this.checkValidity()) {
      this.pageIndex = this.firstInvalidPage;
      inputArray.map(wi => wi.reportValidity());
      return false;
    }
    console.warn(action(inputArray));
    action(inputArray).map(ea => this.dispatchEvent(newActionEvent(ea)));
    this.reset();
    return true;
  }

  onClosed(ae: CustomEvent<{ action: string } | null>): void {
    if (!(ae.target instanceof Dialog && ae.detail?.action)) return;
    if (ae.detail.action === 'close') this.reset();
    else if (ae.detail.action === 'prev') this.prev();
    else if (ae.detail.action === 'next') this.next();
  }

  static styles = css`
    mwc-dialog {
      --mdc-dialog-max-width: 92vw;
    }

    #wizard-content {
      display: flex;
      flex-direction: column;
    }

    #wizard-content > * {
      display: block;
      margin-top: 16px;
    }
  `;

  renderPage(wp: WizardPage, i: number): TemplateResult {
    return html`<mwc-dialog
      defaultAction="none"
      ?open=${i === this.pageIndex}
      .heading=${wp.title}
      @closed=${this.onClosed}
    >
      <div id="wizard-content">${wp.content}</div>
      ${i > 0
        ? html`<mwc-button
            slot="secondaryAction"
            dialogAction="prev"
            icon="navigate_before"
            label=${this.wizard?.[i - 1].title}
          ></mwc-button>`
        : html``}
      ${wp.secondary
        ? html`<mwc-button
            slot="secondaryAction"
            @click=${() => this.act(wp.secondary?.action)}
            icon="${wp.secondary.icon}"
            label="${wp.secondary.label}"
            outlined
          ></mwc-button>`
        : html`<mwc-button
            slot="secondaryAction"
            dialogAction="close"
            label="cancel"
            style="--mdc-theme-primary: var(--mdc-theme-secondary)"
          ></mwc-button>`}
      ${wp.primary
        ? html`<mwc-button
            slot="primaryAction"
            @click=${() => this.act(wp.primary?.action)}
            icon="${wp.primary.icon}"
            label="${wp.primary.label}"
            trailingIcon
            unelevated
          ></mwc-button>`
        : i + 1 < (this.wizard?.length ?? 0)
        ? html`<mwc-button
            slot="primaryAction"
            dialogAction="next"
            icon="navigate_next"
            label=${this.wizard?.[i + 1].title}
            trailingicon
          ></mwc-button>`
        : html``}
    </mwc-dialog>`;
  }

  render(): TemplateResult {
    return html`${this.wizard.map(this.renderPage)}`;
  }

  constructor() {
    super();

    this.renderPage = this.renderPage.bind(this);
  }
}
