import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import '../../action-pane.js';
import './ln-container.js'

/** [[`LDevice Container`]] plugin subeditor for editing `LDevice` sections. */
@customElement('ldevice-container')
export class LDeviceContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

  get header(): string {
    const nameOrInst = this.element.getAttribute('name') ?? this.element.getAttribute('inst');
    const desc = this.element.getAttribute('desc') ?? '';

    return `${nameOrInst} ${desc ? `- ${desc}` : ''}`;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header}">
    ${Array.from(this.element.querySelectorAll('LN,LN0')).map(
      server => html`<ln-container
        .element=${server}
      ></ln-container>`)}
    </action-pane>`;
  }

  static styles = css``;
}
