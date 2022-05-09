import {
  html,
  LitElement,
  TemplateResult,
  property,
  customElement,
  state,
  css,
} from 'lit-element';

import '../../action-pane.js';
import { getChildElementsByTagName } from '../../foundation.js';
import { styles } from './foundation.js';

/** Pane rendering `EqSubFunction` element with its children */
@customElement('eq-sub-function-editor')
export class EqSubFunctionEditor extends LitElement {
  /** The edited `EqSubFunction` element */
  @property({ attribute: false })
  element!: Element;
  @state()
  private get header(): string {
    const name = this.element.getAttribute('name');
    const desc = this.element.getAttribute('desc');
    const type = this.element.getAttribute('type');

    return `${name}${desc ? ` - ${desc}` : ''}${type ? ` (${type})` : ''}`;
  }

  private renderEqSubFunctions(): TemplateResult {
    const eqSubFunctions = getChildElementsByTagName(
      this.element,
      'EqSubFunction'
    );
    return html` ${eqSubFunctions.map(
      eqSubFunction =>
        html`<eq-sub-function-editor
          .element=${eqSubFunction}
        ></eq-sub-function-editor>`
    )}`;
  }

  private renderLNodes(): TemplateResult {
    const lNodes = getChildElementsByTagName(this.element, 'LNode');

    return lNodes.length
      ? html`<div class="container lnode">
          ${lNodes.map(
            lNode => html`<l-node-editor .element=${lNode}></l-node-editor>`
          )}
        </div>`
      : html``;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header}" icon="functions" secondary
      >${this.renderLNodes()}${this.renderEqSubFunctions()}</action-pane
    >`;
  }

  static styles = css`
    ${styles}
  `;
}
