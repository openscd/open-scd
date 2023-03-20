import {
  css,
  customElement,
  html,
  LitElement,
  TemplateResult,
  property,
  state,
} from 'lit-element';

import { translate } from 'lit-translate';

import '@material/mwc-icon';
import '@material/mwc-icon-button';

import './conducting-equipment-editor.js';
import './function-editor.js';
import './general-equipment-editor.js';
import './l-node-editor.js';

import { styles } from './foundation.js';
import {
  getChildElementsByTagName,
  newWizardEvent,
  newActionEvent,
} from '../../foundation.js';
import { wizards } from '../../wizards/wizard-library.js';

@customElement('line-editor')
export class LineEditor extends LitElement {
  /** The document being edited as provided to editor by [[`Zeroline`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  /** SCL element Line */
  @property({ attribute: false })
  element!: Element;
  /** Whether `Function` and `LNode` are rendered */
  @property({ type: Boolean })
  showfunctions = false;

  @state()
  get header(): string {
    const name = this.element.getAttribute('name') ?? '';
    const desc = this.element.getAttribute('desc');

    return `${name} ${desc ? `—${desc}` : ''}`;
  }

  private openEditWizard(): void {
    const wizard = wizards['Line'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private renderConductingEquipments(): TemplateResult {
    const ConductingEquipments = getChildElementsByTagName(
      this.element,
      'ConductingEquipment'
    );
    return html` ${ConductingEquipments.map(
      ConductingEquipment =>
        html`<conducting-equipment-editor
          .doc=${this.doc}
          .element=${ConductingEquipment}
          ?showfunctions=${this.showfunctions}
        ></conducting-equipment-editor>`
    )}`;
  }

  private renderGeneralEquipments(): TemplateResult {
    const GeneralEquipments = getChildElementsByTagName(
      this.element,
      'GeneralEquipment'
    );
    return html` ${GeneralEquipments.map(
      GeneralEquipment =>
        html`<general-equipment-editor
          .doc=${this.doc}
          .element=${GeneralEquipment}
          ?showfunctions=${this.showfunctions}
        ></general-equipment-editor>`
    )}`;
  }

  private renderFunctions(): TemplateResult {
    if (!this.showfunctions) return html``;

    const Functions = getChildElementsByTagName(this.element, 'Function');
    return html` ${Functions.map(
      Function =>
        html`<function-editor
          .doc=${this.doc}
          .element=${Function}
          ?showfunctions=${this.showfunctions}
        ></function-editor>`
    )}`;
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

  render(): TemplateResult {
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
        ></mwc-icon-button> </abbr
      >${this.renderConductingEquipments()}${this.renderGeneralEquipments()}${this.renderFunctions()}${this.renderLNodes()}
    </action-pane>`;
  }
  static styles = css`
    ${styles}

    :host(.moving) {
      opacity: 0.3;
    }

    abbr {
      text-decoration: none;
      border-bottom: none;
    }
  `;
}
