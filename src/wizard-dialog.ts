import {
  customElement,
  css,
  queryAll,
  LitElement,
  property,
  internalProperty,
  TemplateResult,
  html,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-dialog';
import { Dialog } from '@material/mwc-dialog';

import './wizard-textfield.js';
import {
  newActionEvent,
  Wizard,
  WizardInput,
  WizardPage,
  newWizardEvent,
  WizardAction,
  wizardInputSelector,
} from './foundation.js';

function dialogInputs(dialog?: Dialog): WizardInput[] {
  return Array.from(dialog?.querySelectorAll(wizardInputSelector) ?? []);
}

function dialogValid(dialog?: Dialog): boolean {
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
  @queryAll(wizardInputSelector)
  inputs!: NodeListOf<WizardInput>;

  get dialog(): Dialog | undefined {
    return this.dialogs[this.pageIndex];
  }

  checkValidity(): boolean {
    return Array.from(this.inputs).every(wi => wi.checkValidity());
  }

  get firstInvalidPage(): number {
    return Array.from(this.dialogs).findIndex(dialog => !dialogValid(dialog));
  }

  prev(): void {
    if (this.pageIndex > 0) this.pageIndex--;
  }

  async next(): Promise<void> {
    if (dialogValid(this.dialog)) {
      if (this.wizard.length > this.pageIndex + 1) this.pageIndex++;
    } else {
      this.dialog?.show();
      await this.dialog?.updateComplete;
      dialogInputs(this.dialog).map(wi => wi.reportValidity());
    }
  }

  close(): void {
    this.dispatchEvent(newWizardEvent());
  }

  async act(action?: WizardAction): Promise<boolean> {
    if (action === undefined) return false;
    const inputArray = Array.from(this.inputs);
    if (!this.checkValidity()) {
      this.pageIndex = this.firstInvalidPage;
      inputArray.map(wi => wi.reportValidity());
      return false;
    }
    action(inputArray, this).map(ea => this.dispatchEvent(newActionEvent(ea)));
    return true;
  }

  onClosed(ae: CustomEvent<{ action: string } | null>): void {
    if (!(ae.target instanceof Dialog && ae.detail?.action)) return;
    if (ae.detail.action === 'close') this.close();
    else if (ae.detail.action === 'prev') this.prev();
    else if (ae.detail.action === 'next') this.next();
  }

  constructor() {
    super();

    this.act = this.act.bind(this);
    this.renderPage = this.renderPage.bind(this);
  }

  renderPage(page: WizardPage, index: number): TemplateResult {
    return html`<mwc-dialog
      defaultAction="none"
      ?open=${index === this.pageIndex}
      heading=${page.title}
      @closed=${this.onClosed}
    >
      <div id="wizard-content">${page.content}</div>
      ${index > 0
        ? html`<mwc-button
            slot="secondaryAction"
            dialogAction="prev"
            icon="navigate_before"
            label=${this.wizard?.[index - 1].title}
          ></mwc-button>`
        : html``}
      ${page.secondary
        ? html`<mwc-button
            slot="secondaryAction"
            @click=${() => this.act(page.secondary?.action)}
            icon="${page.secondary.icon}"
            label="${page.secondary.label}"
            outlined
          ></mwc-button>`
        : html`<mwc-button
            slot="secondaryAction"
            dialogAction="close"
            label="${translate('cancel')}"
            style="--mdc-theme-primary: var(--mdc-theme-error)"
          ></mwc-button>`}
      ${page.primary
        ? html`<mwc-button
            slot="primaryAction"
            @click=${() => this.act(page.primary?.action)}
            icon="${page.primary.icon}"
            label="${page.primary.label}"
            trailingIcon
            unelevated
          ></mwc-button>`
        : index + 1 < (this.wizard?.length ?? 0)
        ? html`<mwc-button
            slot="primaryAction"
            dialogAction="next"
            icon="navigate_next"
            label=${this.wizard?.[index + 1].title}
            trailingicon
          ></mwc-button>`
        : html``}
    </mwc-dialog>`;
  }

  render(): TemplateResult {
    return html`${this.wizard.map(this.renderPage)}`;
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
}
