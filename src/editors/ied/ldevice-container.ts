import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import '../../action-pane.js';
import { IEDSelector } from './foundation.js';
import './ln-container.js'

/** [[`LDevice Container`]] plugin subcontainer for editing `LDevice` sections. */
@customElement('ldevice-container')
export class LDeviceContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;
  @property({ type: Boolean })
  readonly = false;

  get header(): string {
    const nameOrInst = this.element.getAttribute('name') ?? this.element.getAttribute('inst');
    const desc = this.element.getAttribute('desc') ?? '';

    return `${nameOrInst} ${desc ? `\u2014 ${desc}` : ''}`;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header}">
    ${Array.from(this.element.querySelectorAll(IEDSelector.AnyLN)).map(
      server => html`<ln-container
        .element=${server}
        ?readonly=${this.readonly}
      ></ln-container>`)}
    </action-pane>`;
  }

  static styles = css``;
}
