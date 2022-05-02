import {
  html,
  LitElement,
  TemplateResult,
  property,
  customElement,
  state,
} from 'lit-element';

import '../../action-pane.js';
import './subfunction-editor.js';
import { getChildElementsByTagName } from '../../foundation.js';

/** Pane rendering `SubFunction` element with its children */
@customElement('subfunction-editor')
export class SubFunctionEditor extends LitElement {
  /** The edited `SubFunction` element */
  @property({ attribute: false })
  element!: Element;
  @state()
  get header(): string {
    const name = this.element.getAttribute('name');
    const desc = this.element.getAttribute('desc');
    const type = this.element.getAttribute('type');

    return `${name}${desc ? ` - ${desc}` : ''}${type ? ` (${type})` : ''}`;
  }

  renderSubFunctions(): TemplateResult {
    const subfunctions = getChildElementsByTagName(this.element, 'SubFunction');
    return html` ${subfunctions.map(
      subFunction =>
        html`<subfunction-editor .element=${subFunction}></subfunction-editor>`
    )}`;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header}" icon="functions" secondary
      >${this.renderSubFunctions()}</action-pane
    >`;
  }
}
