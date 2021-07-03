import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { translate, get } from 'lit-translate';

import {
  createElement,
  EditorAction,
  getReference,
  getValue,
  newActionEvent,
  newWizardEvent,
  SCLTag,
  Wizard,
  WizardActor,
  WizardInput,
} from '../../foundation.js';

import {
  isCreateOptions,
  selectors,
  styles,
  updateNamingAction,
  WizardOptions,
} from './foundation.js';

import './voltage-level-editor.js';
import { VoltageLevelEditor } from './voltage-level-editor.js';
import { editlNode } from './lnodewizard.js';
import { guessVoltageLevel } from './guess-wizard.js';
import { wizards } from '../../wizards/wizard-library.js';
import { substationEditWizard } from '../../wizards/substation.js';
/** [[`Substation`]] plugin subeditor for editing `Substation` sections. */
@customElement('substation-editor')
export class SubstationEditor extends LitElement {
  /** The edited `Element`, a common property of all Substation subeditors. */
  @property({ attribute: false })
  element!: Element;

  /** [[element | `element.name`]] */
  @property({ type: String })
  get name(): string {
    return this.element.getAttribute('name') ?? '';
  }
  /** [[element | `element.desc`]] */
  @property({ type: String })
  get desc(): string | null {
    return this.element.getAttribute('desc');
  }

  /** Opens a [[`WizardDialog`]] for editing [[`element`]]. */
  openEditWizard(): void {
    const wizard = wizards['Substation'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  /** Opens a [[`WizardDialog`]] for adding a new `VoltageLevel`. */
  openVoltageLevelWizard(): void {
    const wizard = wizards['VoltageLevel'].create(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  /** Opens a [[`WizardDialog`]] for editing `LNode` connections. */
  openLNodeWizard(): void {
    this.dispatchEvent(newWizardEvent(editlNode(this.element)));
  }

  /** Deletes [[`element`]]. */
  remove(): void {
    this.dispatchEvent(
      newActionEvent({
        old: {
          parent: this.element.parentElement!,
          element: this.element,
          reference: this.element.nextElementSibling,
        },
      })
    );
  }

  renderHeader(): TemplateResult {
    return html`
      <h1>
        ${this.name} ${this.desc === null ? '' : html`&mdash;`} ${this.desc}
        <abbr title="${translate('add')}">
          <mwc-icon-button
            icon="playlist_add"
            @click=${() => this.openVoltageLevelWizard()}
          ></mwc-icon-button>
        </abbr>
        <nav>
          <abbr title="${translate('lnode.tooltip')}">
            <mwc-icon-button
              icon="account_tree"
              @click=${() => this.openLNodeWizard()}
            ></mwc-icon-button>
          </abbr>
          <abbr title="${translate('edit')}">
            <mwc-icon-button
              icon="edit"
              @click=${() => this.openEditWizard()}
            ></mwc-icon-button>
          </abbr>
          <abbr title="${translate('remove')}">
            <mwc-icon-button
              icon="delete"
              @click=${() => this.remove()}
            ></mwc-icon-button>
          </abbr>
        </nav>
      </h1>
    `;
  }

  render(): TemplateResult {
    return html`
      <section tabindex="0">
        ${this.renderHeader()}
        ${Array.from(this.element.querySelectorAll(selectors.VoltageLevel)).map(
          voltageLevel =>
            html`<voltage-level-editor
              .element=${voltageLevel}
            ></voltage-level-editor>`
        )}
      </section>
    `;
  }

  static styles = css`
    ${styles}

    section {
      overflow: hidden;
    }

    :host {
      width: 100vw;
    }
  `;
}
