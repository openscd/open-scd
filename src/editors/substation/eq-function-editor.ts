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
import './eq-sub-function-editor.js';
import { getChildElementsByTagName } from '../../foundation.js';

/** Pane rendering `EqFunction` element with its children */
@customElement('eq-function-editor')
export class EqFunctionEditor extends LitElement {
  /** The edited `EqFunction` element */
  @property({ attribute: false })
  element!: Element;
  @state()
  private get header(): string {
    const name = this.element.getAttribute('name');
    const desc = this.element.getAttribute('desc');
    const type = this.element.getAttribute('type');

    return `${name}${desc ? ` - ${desc}` : ''}${type ? ` (${type})` : ''}`;
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

  render(): TemplateResult {
    return html`<action-pane
      label="${this.header}"
      icon="functions"
      secondary
      highlighted
      >${this.renderLNodes()}${this.renderEqSubFunctions()}</action-pane
    >`;
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
