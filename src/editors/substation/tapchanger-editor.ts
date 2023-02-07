import {
  customElement,
  html,
  LitElement,
  TemplateResult,
  property,
  state,
} from 'lit-element';

import '../../action-pane.js';
import './eq-function-editor.js';
import './l-node-editor.js';
import './sub-equipment-editor.js';
import { getChildElementsByTagName } from '../../foundation.js';

@customElement('tapchanger-editor')
export class TapChangerEditor extends LitElement {
  /** The document being edited as provided to editor by [[`Zeroline`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  /** SCL element TransformerWinding */
  @property({ attribute: false })
  element!: Element;
  /** Whether `EqFunction` and `SubEquipment` are rendered */
  @property({ type: Boolean })
  showfunctions = false;

  @state()
  get header(): string {
    const name = this.element.getAttribute('name') ?? '';
    const desc = this.element.getAttribute('desc');

    return `${name} ${desc ? `—  ${desc}` : ''}`;
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

  renderEqFunctions(): TemplateResult {
    if (!this.showfunctions) return html``;

    const eqFunctions = getChildElementsByTagName(this.element, 'EqFunction');
    return html` ${eqFunctions.map(
      eqFunction =>
        html`<eq-function-editor
          .doc=${this.doc}
          .element=${eqFunction}
          ?showfunctions=${this.showfunctions}
        ></eq-function-editor>`
    )}`;
  }

  private renderSubEquipments(): TemplateResult {
    if (!this.showfunctions) return html``;
    const subEquipments = getChildElementsByTagName(
      this.element,
      'SubEquipment'
    );

    return html` ${subEquipments.map(
      subEquipment =>
        html`<sub-equipment-editor
          .doc=${this.doc}
          .element=${subEquipment}
        ></sub-equipment-editor>`
    )}`;
  }

  render(): TemplateResult {
    return html`<action-pane label=${this.header}> ${this.renderLNodes()}
    ${this.renderEqFunctions()} ${this.renderSubEquipments()}</action-icon>`;
  }
}
