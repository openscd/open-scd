import {
  html,
  LitElement,
  TemplateResult,
  property,
  customElement,
  state,
} from 'lit-element';

import '../../action-pane.js';
import { getChildElementsByTagName } from '../../foundation.js';

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

  render(): TemplateResult {
    return html`<action-pane label="${this.header}" icon="functions" secondary
      >${this.renderEqSubFunctions()}</action-pane
    >`;
  }
}
