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
import { IEDSelector } from './foundation.js';

/** [[`IED`]] plugin subeditor for editing `LDevice` element. */
@customElement('ldevice-container')
export class LDeviceContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

  private get header(): string {
    const nameOrInst = this.element.getAttribute('name') ?? this.element.getAttribute('inst');
    const desc = this.element.getAttribute('desc');

    return `${nameOrInst} ${desc ? `\u2014 ${desc}` : ''}`;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header}">
    ${Array.from(this.element.querySelectorAll(IEDSelector.AnyLN)).map(
      server => html`<ln-container
        .element=${server}
      ></ln-container>`)}
    </action-pane>`;
  }

  static styles = css``;
}
