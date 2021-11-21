import {
  customElement,
  css,
  queryAll,
  LitElement,
  property,
  internalProperty,
  TemplateResult,
} from 'lit-element';
import { get, translate } from 'lit-translate';


import 'ace-custom-element';
import './wizard-textfield.js';
import {
  newActionEvent,
  Wizard,
  WizardInput,
  WizardPage,
  newWizardEvent,
  WizardActor,
  wizardInputSelector,
  isWizard,
  checkValidity,
  reportValidity,
  Delete,
  Create,
  identity,
  html,
  Dialog,
  Button,
  IconButtonToggle,
  List,
} from './foundation.js';

function dialogInputs(dialog?: Dialog): WizardInput[] {
  return Array.from(dialog?.querySelectorAll(wizardInputSelector) ?? []);
}

function dialogValid(dialog?: Dialog): boolean {
  return dialogInputs(dialog).every(checkValidity);
}

function codeAction(element: Element): WizardActor {
  return inputs => {
    const text = inputs[0].value!;
    if (!text || !element.parentElement) return [];
    const desc = {
      parent: element.parentElement!,
      reference: element.nextSibling,
      element,
    };
    const del: Delete = {
      old: desc,
      checkValidity: () => true,
    };
    const cre: Create = {
      new: {
        ...desc,
        element: new DOMParser().parseFromString(text, 'application/xml')
          .documentElement,
      },
      checkValidity: () => true,
    };
    return [
      {
        actions: [del, cre],
        title: get('code.log', {
          id: identity(element),
        }),
      },
    ];
  };
}

/** A wizard style dialog consisting of several pages commiting some
 * [[`EditorAction`]] on completion and aborting on dismissal. */
export class WizardDialog extends LitElement {
  /** The [[`Wizard`]] implemented by this dialog. */
  @property({ type: Array })
  wizard: Wizard = [];
  /** Index of the currently active [[`WizardPage`]] */
  @internalProperty()
  pageIndex = 0;

  @queryAll('c-dialog')
  dialogs!: NodeListOf<Dialog>;
  @queryAll(wizardInputSelector)
  inputs!: NodeListOf<WizardInput>;

  /** The `Dialog` showing the active [[`WizardPage`]]. */
  get dialog(): Dialog | undefined {
    return this.dialogs[this.pageIndex];
  }

  get code(): boolean {
    return (
      (<IconButtonToggle>this.dialog?.querySelector('icon-button-toggle'))
        ?.on ??
      (false && localStorage.getItem('mode') === 'pro')
    );
  }

  /** Checks the inputs of all [[`WizardPage`]]s for validity. */
  checkValidity(): boolean {
    return Array.from(this.inputs).every(checkValidity);
  }

  private get firstInvalidPage(): number {
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
      dialogInputs(this.dialog).map(reportValidity);
    }
  }

  /** Commits `action` if all inputs are valid, reports validity otherwise. */
  async act(action?: WizardActor, primary = true): Promise<boolean> {
    if (action === undefined) return false;
    const wizardInputs = Array.from(this.inputs);
    const wizardList = <List | null>(
      this.dialog?.querySelector('filtered-list,c-list')
    );
    if (!this.checkValidity()) {
      this.pageIndex = this.firstInvalidPage;
      wizardInputs.map(reportValidity);
      return false;
    }

    const wizardActions = action(wizardInputs, this, wizardList);
    if (wizardActions.length > 0) {
      if (primary) this.wizard[this.pageIndex].primary = undefined;
      else this.wizard[this.pageIndex].secondary = undefined;
      this.dispatchEvent(newWizardEvent());
    }
    wizardActions.forEach(wa =>
      isWizard(wa)
        ? this.dispatchEvent(newWizardEvent(wa()))
        : this.dispatchEvent(newActionEvent(wa))
    );
    return true;
  }

  private onClosed(ae: CustomEvent<{ action: string } | null>): void {
    if (!(ae.target instanceof Dialog && ae.detail?.action)) return;
    if (ae.detail.action === 'close') this.dispatchEvent(newWizardEvent());
    else if (ae.detail.action === 'prev') this.prev();
    else if (ae.detail.action === 'next') this.next();
  }

  constructor() {
    super();

    this.act = this.act.bind(this);
    this.renderPage = this.renderPage.bind(this);
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    if (changedProperties.has('wizard')) {
      this.pageIndex = 0;
      while (
        this.wizard.findIndex(page => page.initial) > this.pageIndex &&
        dialogValid(this.dialog)
      ) {
        this.dialog?.close();
        this.next();
      }
      this.dialog?.show();
    }
    if (this.wizard[this.pageIndex]?.primary?.auto) {
      this.updateComplete.then(() =>
        this.act(this.wizard[this.pageIndex].primary!.action)
      );
    }
  }

  renderPage(page: WizardPage, index: number): TemplateResult {
    return html`<${Dialog}
      defaultAction="close"
      ?open=${index === this.pageIndex}
      heading=${page.title}
      @closed=${this.onClosed}
    >
      ${
        page.element && localStorage.getItem('mode') === 'pro'
          ? html`<${IconButtonToggle}
              onicon="code"
              officon="code_off"
              @click=${() => this.requestUpdate()}
            ></${IconButtonToggle}>`
          : ''
      }
      <div id="wizard-content">
        ${
          this.code && page.element
            ? html`<ace-editor
                base-path="/public/ace"
                wrap
                soft-tabs
                style="width: 80vw; height: calc(100vh - 240px);"
                theme="ace/theme/solarized_${localStorage.getItem('theme')}"
                mode="ace/mode/xml"
                value="${new XMLSerializer().serializeToString(page.element)}"
              ></ace-editor>`
            : page.content
        }
      </div>
      ${
        index > 0
          ? html`<${Button}
            slot="secondaryAction"
            dialogAction="prev"
            icon="navigate_before"
            label=${this.wizard?.[index - 1].title}
          ></${Button}>`
          : html``
      }
      ${
        page.secondary
          ? html`<${Button}
            slot="secondaryAction"
            @click=${() => this.act(page.secondary?.action, false)}
            icon="${page.secondary.icon}"
            label="${page.secondary.label}"
          ></${Button}>`
          : html`<${Button}
            slot="secondaryAction"
            dialogAction="close"
            label="${translate('cancel')}"
            style="--mdc-theme-primary: var(--mdc-theme-error)"
          ></${Button}>`
      }
      ${
        this.code && page.element
          ? html`<${Button}
            slot="primaryAction"
            @click=${() => this.act(codeAction(page.element!))}
            icon="code"
            label="${translate('save')}"
            trailingIcon
            dialogInitialFocus
          ></${Button}>`
          : page.primary
          ? html`<${Button}
            slot="primaryAction"
            @click=${() => this.act(page.primary?.action)}
            icon="${page.primary.icon}"
            label="${page.primary.label}"
            trailingIcon
            dialogInitialFocus
          ></${Button}>`
          : index + 1 < (this.wizard?.length ?? 0)
          ? html`<${Button}
            slot="primaryAction"
            dialogAction="next"
            icon="navigate_next"
            label=${this.wizard?.[index + 1].title}
            trailingicon
          ></${Button}>`
          : html``
      }
    </${Dialog}>`;
  }

  render(): TemplateResult {
    return html`${this.wizard.map(this.renderPage)}`;
  }

  static styles = css`
    c-dialog {
      --mdc-dialog-max-width: 92vw;
    }

    c-dialog > icon-button-toggle {
      position: absolute;
      top: 8px;
      right: 14px;
      color: var(--base00);
    }

    c-dialog > icon-button-toggle[on] {
      color: var(--mdc-theme-primary);
    }

    #wizard-content {
      display: flex;
      flex-direction: column;
    }

    #wizard-content > * {
      display: block;
      margin-top: 16px;
    }

    *[iconTrailing='search'] {
      --mdc-shape-small: 28px;
    }
  `;
}
