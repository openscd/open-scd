import {
  css,
  customElement,
  html,
  LitElement,
  property,
  state,
  TemplateResult,
} from 'lit-element';

import '@material/mwc-fab';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-menu';

import '../../action-icon.js';
import '../../action-pane.js';

import { styles } from './foundation.js';
import { getChildElementsByTagName } from '../../foundation.js';
import { nothing } from 'lit-html';

/** [[`SubstationEditor`]] subeditor for a child-less `SubEquipment` element. */
@customElement('sub-equipment-editor')
export class SubEquipmentEditor extends LitElement {
  /** The document being edited as provided to editor by [[`Zeroline`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  /** SCL element SubEquipment */
  @property({ attribute: false })
  element!: Element;

  /** SubEquipment name attribute */
  @property({ type: String })
  get label(): string {
    const name = `${
      this.element.hasAttribute('name')
        ? `${this.element.getAttribute('name')}`
        : ''
    }`;

    const description = `${
      this.element.hasAttribute('desc')
        ? ` - ${this.element.getAttribute('desc')}`
        : ''
    }`;

    const phase = `${
      this.element.hasAttribute('phase')
        ? ` (${this.element.getAttribute('phase')})`
        : ''
    }`;

    return `${name}${description}${phase}`;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.label}">
      ${this.renderLNodes()} ${this.renderEqFunctions()}
    </action-pane> `;
  }

  private renderEqFunctions(): TemplateResult {
    const eqFunctions = getChildElementsByTagName(this.element, 'EqFunction');
    return html` ${eqFunctions.map(
      eqFunction =>
        html`<eq-function-editor
          .doc=${this.doc}
          .element=${eqFunction}
        ></eq-function-editor>`
    )}`;
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
