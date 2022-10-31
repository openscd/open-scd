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
import { getChildElementsByTagName, newWizardEvent } from '../../foundation.js';
import { translate } from 'lit-translate';
import { wizards } from '../../wizards/wizard-library.js';
//import { styles } from './foundation.js';

@customElement('general-equipment-editor')
export class GeneralEquipmentEditor extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ attribute: false })
  element!: Element;
  @property({ type: Boolean })
  readonly = false;
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

  private renderLNodes(): TemplateResult {
    if (!this.showfunctions) return html``;

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
    if (!this.showfunctions) return html``;

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
        ${this.renderLNodes()} ${this.renderEqFunctions()}
      </action-pane>`;

    return html`<action-icon label=${this.header}>
      <abbr slot="action" title="${translate('edit')}">
        <mwc-icon-button
          icon="edit"
          @click=${() => this.openEditWizard()}
        ></mwc-icon-button>
      </abbr>
      <mwc-icon slot="icon">${generalConductingEquipmentIcon}</mwc-icon>
    </action-icon>`;
  }

  static styles = css`
    .container.lnode {
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(64px, auto));
    }
  `;
}
