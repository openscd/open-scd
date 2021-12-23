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
  state,
} from 'lit-element';
import { get, translate } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-icon-button-toggle';
import { Dialog } from '@material/mwc-dialog';
import { List } from '@material/mwc-list';

import 'ace-custom-element';
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
  SCLTag,
  selector,
} from './foundation.js';
import { FilteredList } from './filtered-list.js';
import { wizards } from './wizards/wizard-library.js';
import { ListItem } from '@material/mwc-list/mwc-list-item';

/** A wizard style dialog consisting of several pages committing some
 * [[`EditorAction`]] on completion and aborting on dismissal. */
@customElement('wizard-selector')
export class WizardSelector extends LitElement {
  @property({ type: Object })
  scope!: Element | XMLDocument;

  @property({ type: String })
  targetTag!: string;

  @property({ type: Array })
  childTags: string[] = [];

  @state()
  get targets(): Element[] {
    return Array.from(this.scope.querySelectorAll(this.targetTag));
  }

  @state()
  get element(): Element | null {
    if (!this.list) return null;
    const identity = (<ListItem>this?.list?.selected).value ?? '';
    return this.scope.querySelector(selector(<SCLTag>this.targetTag, identity));
  }

  @query('filtered-list') list!: FilteredList;
  /** Commits `action` if all inputs are valid, reports validity otherwise. */
  async act(action?: WizardActor, primary = true): Promise<boolean> {
    /* if (action === undefined) return false;
    const wizardInputs = Array.from(this.inputs);
    const wizardList = <List | null>(
      this.dialog?.querySelector('filtered-list,mwc-list')
    );
    if (!this.checkValidity()) {
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
    ); */
    return true;
  }

  private onClosed(ae: CustomEvent<{ action: string } | null>): void {
    if (!(ae.target instanceof Dialog && ae.detail?.action)) return;
    if (ae.detail.action === 'close') this.dispatchEvent(newWizardEvent());
  }

  constructor() {
    super();

    this.act = this.act.bind(this);
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    /* if (changedProperties.has('wizard')) {
      while (
        this.wizard.findIndex(page => page.initial) > this.pageIndex &&
        dialogValid(this.dialog)
      ) {
        this.dialog?.close();
      }
      this.dialog?.show();
    }
    if (this.wizard[this.pageIndex]?.primary?.auto) {
      this.updateComplete.then(() =>
        this.act(this.wizard[this.pageIndex].primary!.action)
      );
    } */
  }

  renderChildWizards(childTag: string): TemplateResult {
    const child = this?.element?.querySelector(childTag);
    const wizard = child ? wizards[<SCLTag>childTag].edit(child) : undefined;
    return wizard
      ? html`${wizard.map(
          page =>
            html`<div class="column">
              <h4>${page.title}</h4>
              ${wizard[0].content}
            </div>`
        )}</div>`
      : html``;
  }

  renderTargetWizard(): TemplateResult {
    const wizard = this.element
      ? wizards[<SCLTag>this.targetTag].edit(this.element)
      : undefined;
    return wizard
      ? html`${wizard.map(
          page =>
            html`<div class="column">
              <h4>${page.title}</h4>
              ${wizard[0].content}
            </div>`
        )}</div>`
      : html``;
  }

  renderTargetList(): TemplateResult {
    return html`<div class="column">
      <filtered-list activatable @selected=${() => this.requestUpdate()}>
        ${this.targets.map(
          target =>
            html`<mwc-list-item twoline value="${identity(target)}"
              ><span>${target.getAttribute('name')}</span
              ><span slot="secondary">${identity(target)}</span>
            </mwc-list-item>`
        )}</filtered-list
      >
    </div>`;
  }

  render(): TemplateResult {
    return html`<mwc-dialog
      defaultAction="close"
      heading="Manage reports"
      @closed=${this.onClosed}
      ><div id="wizard-content">
        ${this.renderTargetList()}${this.renderTargetWizard()}${this.childTags.map(
          tag => this.renderChildWizards(tag)
        )}
      </div>
    </mwc-dialog> `;
  }

  static styles = css`
    mwc-dialog {
      --mdc-dialog-max-width: 92vw;
    }

    mwc-dialog > mwc-icon-button-toggle {
      position: absolute;
      top: 8px;
      right: 14px;
      color: var(--base00);
    }

    mwc-dialog > mwc-icon-button-toggle[on] {
      color: var(--mdc-theme-primary);
    }

    #wizard-content {
      display: flex;
      flex-direction: row;
      overflow: auto;
    }

    div.column {
      display: flex;
      flex-direction: column;
      padding: 12px;
    }

    *[iconTrailing='search'] {
      --mdc-shape-small: 28px;
    }
  `;
}
