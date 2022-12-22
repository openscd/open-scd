import {
  customElement,
  html,
  LitElement,
  TemplateResult,
  property,
  state,
  css,
} from 'lit-element';

import '@material/mwc-icon-button';
import '@material/mwc-fab';

import '../../action-pane.js';
import '../../editors/substation/eq-function-editor.js';
import '../../editors/substation/l-node-editor.js';
import { generalConductingEquipmentIcon } from '../../icons/icons.js';
import {
  getChildElementsByTagName,
  newActionEvent,
  newWizardEvent,
} from '../../foundation.js';
import { translate } from 'lit-translate';
import { wizards } from '../../wizards/wizard-library.js';

@customElement('general-equipment-editor')
export class GeneralEquipmentEditor extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ attribute: false })
  element!: Element;

  /** Whether `Function` and `SubFunction` are rendered */
  @property({ type: Boolean })
  showfunctions = false;

  @state()
  get header(): string {
    const name = this.element.getAttribute('name') ?? '';
    const desc = this.element.getAttribute('desc');

    if (!this.showfunctions) return `${name}`;

    return `${name} ${desc ? `—  ${desc}` : ''}`;
  }

  openEditWizard(): void {
    const wizard = wizards['GeneralEquipment'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  remove(): void {
    if (this.element.parentElement)
      this.dispatchEvent(
        newActionEvent({
          old: {
            parent: this.element.parentElement,
            element: this.element,
          },
        })
      );
  }

  private renderLNodes(): TemplateResult {
    const lNodes = getChildElementsByTagName(this.element, 'LNode');

    return lNodes.length
      ? html`<div class="container lnode">
          ${lNodes.map(
            lNode =>
              html`<l-node-editor
                .doc=${this.doc}
                .element=${lNode}
              ></l-node-editor>`
          )}
        </div>`
      : html``;
  }

  private renderEqFunctions(): TemplateResult {
    const eFunctions = getChildElementsByTagName(this.element, 'EqFunction');

    return eFunctions.length
      ? html`${eFunctions.map(
          eFunction =>
            html` <eq-function-editor
              .doc=${this.doc}
              .element=${eFunction}
            ></eq-function-editor>`
        )}`
      : html``;
  }

  render(): TemplateResult {
    if (this.showfunctions)
      return html`<action-pane label=${this.header}>
        <abbr slot="action" title="${translate('edit')}">
          <mwc-icon-button
            icon="edit"
            @click=${() => this.openEditWizard()}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${translate('remove')}">
          <mwc-icon-button
            icon="delete"
            @click=${() => this.remove()}
          ></mwc-icon-button>
        </abbr>
        ${this.renderLNodes()} ${this.renderEqFunctions()}
      </action-pane>`;

    return html`<action-icon label=${this.header}>
      <abbr slot="action" title="${translate('edit')}">
        <mwc-fab
        mini
          icon="edit"
          @click=${() => this.openEditWizard()}
        ></mwc-fab
      </abbr>
      <abbr slot="action" title="${translate('remove')}">
        <mwc-fab
        mini
          icon="delete"
          @click=${() => this.remove()}
        ></mwc-fab>
      </abbr>
      <mwc-icon slot="icon">${generalConductingEquipmentIcon}</mwc-icon>
    </action-icon>`;
  }

  static styles = css`
    abbr {
      text-decoration: none;
      border-bottom: none;
    }
    .container.lnode {
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(64px, auto));
    }
  `;
}
