import {
  html,
  LitElement,
  TemplateResult,
  property,
  customElement,
  state,
} from 'lit-element';

import '../../action-pane.js';
import './sub-function-editor.js';
import { getChildElementsByTagName } from '../../foundation.js';

/** Pane rendering `Function` element with its children */
@customElement('function-editor')
export class FunctionEditor extends LitElement {
  /** The edited `Function` element */
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
    return html`<action-pane
      label="${this.header}"
      icon="functions"
      secondary
      highlighted
      >${this.renderLNodes()}${this.renderSubFunctions()}</action-pane
    >`;
  }
}
