import {
  customElement,
  css,
  queryAll,
  LitElement,
  property,
  internalProperty,
  TemplateResult,
  html,
  query,
} from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { get, translate } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-icon-button';
import '@material/mwc-icon-button-toggle';
import '@material/mwc-menu';
import { Dialog } from '@material/mwc-dialog';
import { IconButton } from '@material/mwc-icon-button';
import { List } from '@material/mwc-list';
import { Menu } from '@material/mwc-menu';

import 'ace-custom-element';
import './wizard-checkbox.js';
import './wizard-textfield.js';
import './wizard-select.js';
import {
  newActionEvent,
  Wizard,
  WizardInputElement,
  WizardPage,
  newWizardEvent,
  WizardActor,
  wizardInputSelector,
  isWizardFactory,
  checkValidity,
  reportValidity,
  Delete,
  Create,
  identity,
  WizardInput,
  WizardMenuActor,
  formatXml,
} from './foundation.js';

function renderWizardInput(
  input: TemplateResult | WizardInput
): TemplateResult {
  if (input instanceof TemplateResult) return input;

  if (input.kind === 'Checkbox')
    return html`<wizard-checkbox
      ?nullable=${input.nullable}
      ?defaultChecked=${input.default}
      ?dialogInitialFocus=${input.dialogInitialFocus}
      label="${input.label}"
      helper="${ifDefined(input.helper)}"
      .maybeValue=${input.maybeValue}
    ></wizard-checkbox>`;

  if (input.kind === 'Select')
    return html`<wizard-select
      ?nullable=${input.nullable}
      ?dialogInitialFocus=${input.dialogInitialFocus}
      label="${input.label}"
      helper="${ifDefined(input.helper)}"
      defaultValue="${ifDefined(input.default)}"
      validationMessage="${ifDefined(input.valadationMessage)}"
      .maybeValue=${input.maybeValue}
      >${input.values.map(
        value => html`<mwc-list-item value="${value}">${value}</mwc-list-item>`
      )}</wizard-select
    >`;

  return html`<wizard-textfield
    ?nullable=${input.nullable}
    ?required=${input.required}
    ?disabled=${input.disabled}
    ?dialogInitialFocus=${input.dialogInitialFocus}
    label="${input.label}"
    defaultValue="${ifDefined(input.default)}"
    helper="${ifDefined(input.helper)}"
    validationMessage="${ifDefined(input.helper)}"
    unit="${ifDefined(input.unit)}"
    .multipliers=${input.multipliers ?? []}
    .multiplier=${input.multiplier ?? null}
    suffix="${ifDefined(input.suffix)}"
    .maybeValue=${input.maybeValue}
    pattern="${ifDefined(input.pattern)}"
    minLength="${ifDefined(input.minLength)}"
    maxLength="${ifDefined(input.maxLength)}"
    type="${ifDefined(input.type)}"
    min="${ifDefined(input.min)}"
    max="${ifDefined(input.max)}"
  ></wizard-textfield>`;
}

function dialogInputs(dialog?: Dialog): WizardInputElement[] {
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
@customElement('wizard-dialog')
export class WizardDialog extends LitElement {
  /** The [[`Wizard`]] implemented by this dialog. */
  @property({ type: Array })
  wizard: Wizard = [];
  /** Index of the currently active [[`WizardPage`]] */
  @internalProperty()
  pageIndex = 0;

  @queryAll('mwc-dialog') dialogs!: NodeListOf<Dialog>;
  @queryAll(wizardInputSelector) inputs!: NodeListOf<WizardInputElement>;
  @query('.actions-menu') actionsMenu!: Menu;
  @query('mwc-icon-button[icon="more_vert"]') menuButton!: IconButton;

  /** The `Dialog` showing the active [[`WizardPage`]]. */
  get dialog(): Dialog | undefined {
    return this.dialogs[this.pageIndex];
  }

  get code(): boolean {
    return (
      (this.dialog?.querySelector('mwc-icon-button-toggle')?.on ?? false) &&
      localStorage.getItem('mode') === 'pro'
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
    if (this.pageIndex <= 0) return;
    this.pageIndex--;
    this.dialog?.show();
  }

  async next(): Promise<void> {
    if (dialogValid(this.dialog)) {
      if (this.wizard.length > this.pageIndex + 1) this.pageIndex++;
      this.dialog?.show();
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
      this.dialog?.querySelector('filtered-list,mwc-list')
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
      isWizardFactory(wa)
        ? this.dispatchEvent(newWizardEvent(wa))
        : this.dispatchEvent(newActionEvent(wa))
    );
    return true;
  }

  /** Triggers menu action callback */
  async menuAct(action?: WizardMenuActor): Promise<void> {
    if (!action) return;

    action(this);
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

    if (this.actionsMenu)
      this.actionsMenu.anchor = <HTMLElement>this.menuButton;
  }

  renderMenu(page: WizardPage): TemplateResult {
    const someIconsDefined = page.menuActions?.some(
      menuAction => menuAction.icon
    );

    return html` <mwc-icon-button
        icon="more_vert"
        @click=${() => {
          if (!this.actionsMenu.open) this.actionsMenu.show();
          else this.actionsMenu.close();
        }}
      ></mwc-icon-button>
      <mwc-menu class="actions-menu" corner="BOTTOM_RIGHT" menuCorner="END">
        ${page.menuActions!.map(
          menuAction =>
            html`<mwc-list-item
              .graphic=${someIconsDefined ? 'icon' : null}
              @click=${() => this.menuAct(menuAction.action)}
            >
              <span>${menuAction.label}</span>
              ${menuAction.icon
                ? html`<mwc-icon slot="graphic">${menuAction.icon}</mwc-icon>`
                : html``}
            </mwc-list-item>`
        )}
      </mwc-menu>`;
  }

  renderPage(page: WizardPage, index: number): TemplateResult {
    const showCodeToggleButton =
      page.element && localStorage.getItem('mode') === 'pro';
    const extraWidth =
      showCodeToggleButton && page.menuActions
        ? 96
        : showCodeToggleButton || page.menuActions
        ? 48
        : 0;

    return html`<mwc-dialog
      defaultAction="next"
      heading=${page.title}
      @closed=${this.onClosed}
      style="--mdc-dialog-min-width:calc(100% + ${extraWidth}px)"
    >
      ${showCodeToggleButton || page.menuActions
        ? html`<nav>
            ${showCodeToggleButton
              ? html`<mwc-icon-button-toggle
                  onicon="code"
                  officon="code_off"
                  @click=${() => this.requestUpdate()}
                ></mwc-icon-button-toggle>`
              : ''}
            ${page.menuActions ? this.renderMenu(page) : ''}
          </nav>`
        : ''}
      <div id="wizard-content">
        ${this.code && page.element
          ? html`<ace-editor
              base-path="/public/ace"
              wrap
              soft-tabs
              style="width: 80vw; height: calc(100vh - 240px);"
              theme="ace/theme/solarized_${localStorage.getItem('theme')}"
              mode="ace/mode/xml"
              value="${formatXml(
                new XMLSerializer().serializeToString(page.element)
              )}"
            ></ace-editor>`
          : page.content?.map(renderWizardInput)}
      </div>
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
            @click=${() => this.act(page.secondary?.action, false)}
            icon="${page.secondary.icon}"
            label="${page.secondary.label}"
            style="${page.secondary.style ? page.secondary.style :  ''}"
          ></mwc-button>`
        : html`<mwc-button
            slot="secondaryAction"
            dialogAction="close"
            label="${translate('close')}"
            style="--mdc-theme-primary: var(--mdc-theme-error)"
          ></mwc-button>`}
      ${this.code && page.element
        ? (page.element.parentElement)
          ? html`<mwc-button
              slot="primaryAction"
              @click=${() => this.act(codeAction(page.element!))}
              icon="code"
              label="${translate('save')}"
              trailingIcon
            ></mwc-button>`
          : html ``
        : page.primary
        ? html`<mwc-button
            slot="primaryAction"
            @click=${() => this.act(page.primary?.action)}
            icon="${page.primary.icon}"
            label="${page.primary.label}"
            trailingIcon
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

    mwc-dialog > nav {
      position: absolute;
      top: 8px;
      right: 14px;
      color: var(--base00);
    }

    mwc-dialog > nav > mwc-icon-button-toggle[on] {
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
