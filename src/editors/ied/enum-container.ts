import {
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import '../../action-pane.js';

/** [[`IED`]] plugin subeditor for editing `EnumVal` element. */
@customElement('enum-container')
export class EnumContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

  private header(): TemplateResult {
    return html`${this.element.getAttribute('ord')} &mdash; ${this.element.textContent}`;
  }

  render(): TemplateResult {
    return html`<action-pane .label="${this.header()}">
    </action-pane>
    `;
  }
}