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
import { nothing } from 'lit-html';

/** [[`IED`]] plugin subeditor for editing `LDevice` element. */
@customElement('ldevice-container')
export class LDeviceContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

  private header(): TemplateResult {
    const nameOrInst = this.element.getAttribute('name') ?? this.element.getAttribute('inst');
    const desc = this.element.getAttribute('desc');

    return html`${nameOrInst}${desc ? html` &mdash; ${desc}` : nothing}`;
  }

  render(): TemplateResult {
    return html`<action-pane .label="${this.header()}">
    ${Array.from(this.element.querySelectorAll(IEDSelector.AnyLN)).map(
      server => html`<ln-container
        .element=${server}
      ></ln-container>`)}
    </action-pane>`;
  }

  static styles = css``;
}
