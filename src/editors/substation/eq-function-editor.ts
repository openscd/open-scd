import {
  html,
  LitElement,
  TemplateResult,
  property,
  customElement,
  state,
} from 'lit-element';

import '../../action-pane.js';

/** Pane rendering `Function` element with its children */
@customElement('eq-function-editor')
export class EqFunctionEditor extends LitElement {
  /** The edited `EqFunction` element */
  @property({ attribute: false })
  element!: Element;
  @state()
  get header(): string {
    const name = this.element.getAttribute('name');
    const desc = this.element.getAttribute('desc');
    const type = this.element.getAttribute('type');

    return `${name}${desc ? ` - ${desc}` : ''}${type ? ` (${type})` : ''}`;
  }

  render(): TemplateResult {
    return html`<action-pane
      label="${this.header}"
      icon="functions"
      secondary
      highlighted
    ></action-pane>`;
  }
}
