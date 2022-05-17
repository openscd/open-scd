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

/** Pane rendering `SubFunction` element with its children */
@customElement('sub-function-editor')
export class SubFunctionEditor extends LitElement {
  /** The edited `SubFunction` element */
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

  private renderSubFunctions(): TemplateResult {
    const subfunctions = getChildElementsByTagName(this.element, 'SubFunction');
    return html` ${subfunctions.map(
      subFunction =>
        html`<sub-function-editor
          .element=${subFunction}
        ></sub-function-editor>`
    )}`;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header}" icon="functions" secondary
      >${this.renderLNodes()}${this.renderSubFunctions()}</action-pane
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
