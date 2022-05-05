import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-fab';
import '@material/mwc-icon';
import '@material/mwc-icon-button';

import '../../action-icon.js';
import '../../action-pane.js';
import { powerTransformerTwoWindingIcon } from '../../icons/icons.js';
import { wizards } from '../../wizards/wizard-library.js';
import {
  getChildElementsByTagName,
  newActionEvent,
  newWizardEvent,
} from '../../foundation.js';
import { startMove } from './foundation.js';
import { SubstationEditor } from './substation-editor.js';
import { BayEditor } from './bay-editor.js';
import { VoltageLevelEditor } from './voltage-level-editor.js';

/** [[`SubstationEditor`]] subeditor for a child-less `PowerTransformer` element. */
@customElement('powertransformer-editor')
export class PowerTransformerEditor extends LitElement {
  /** SCL element PowerTransformer */
  @property({ attribute: false })
  element!: Element;

  /** PowerTransformer name attribute */
  @property({ type: String })
  get name(): string {
    return this.element.getAttribute('name') ?? 'UNDEFINED';
  }
  /** Whether `EqFunction` and `SubEqFunction` are rendered */
  @property({ type: Boolean })
  showfunctions = false;

  private openEditWizard(): void {
    const wizard = wizards['PowerTransformer'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private openLNodeWizard(): void {
    const wizard = wizards['LNode'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private removeElement(): void {
    if (this.element)
      this.dispatchEvent(
        newActionEvent({
          old: {
            parent: this.element.parentElement!,
            element: this.element,
            reference: this.element.nextSibling,
          },
        })
      );
  }

  renderEqFunctions(): TemplateResult {
    if (!this.showfunctions) return html``;

    const eqFunctions = getChildElementsByTagName(this.element, 'EqFunction');
    return html` ${eqFunctions.map(
      eqFunction =>
        html`<eq-function-editor .element=${eqFunction}></eq-function-editor>`
    )}`;
  }

  renderContentPane(): TemplateResult {
    return html`<mwc-icon slot="icon" style="width:24px;height:24px"
        >${powerTransformerTwoWindingIcon}</mwc-icon
      >
      <abbr slot="action" title="${translate('lnode.tooltip')}">
        <mwc-icon-button
          slot="action"
          mini
          @click="${() => this.openLNodeWizard()}"
          icon="account_tree"
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${translate('edit')}">
        <mwc-icon-button
          slot="action"
          mini
          icon="edit"
          @click="${() => this.openEditWizard()}}"
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${translate('move')}">
        <mwc-icon-button
          slot="action"
          mini
          @click="${() => {
            startMove(this, PowerTransformerEditor, [
              SubstationEditor,
              VoltageLevelEditor,
              BayEditor,
            ]);
          }}"
          icon="forward"
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${translate('remove')}">
        <mwc-icon-button
          slot="action"
          mini
          icon="delete"
          @click="${() => this.removeElement()}}"
        ></mwc-icon-button>
      </abbr> `;
  }

  renderContentIcon(): TemplateResult {
    return html`<mwc-icon slot="icon"
        >${powerTransformerTwoWindingIcon}</mwc-icon
      >
      <mwc-fab
        slot="action"
        class="edit"
        mini
        @click="${() => this.openEditWizard()}"
        icon="edit"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        icon="delete"
        @click="${() => this.removeElement()}}"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        @click="${() => {
          startMove(this, PowerTransformerEditor, [
            SubstationEditor,
            VoltageLevelEditor,
            BayEditor,
          ]);
        }}"
        icon="forward"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        @click="${() => this.openLNodeWizard()}"
        icon="account_tree"
      ></mwc-fab>`;
  }

  render(): TemplateResult {
    if (this.showfunctions)
      return html`<action-pane label="${this.name}"
        >${this.renderContentPane()}${this.renderEqFunctions()}</action-pane
      > `;

    return html`<action-icon label="${this.name}"
      >${this.renderContentIcon()}</action-icon
    > `;
  }

  static styles = css`
    :host(.moving) {
      opacity: 0.3;
    }

    abbr {
      text-decoration: none;
      border-bottom: none;
    }
  `;
}
