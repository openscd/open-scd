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
import { getDescriptionAttribute, getInstanceAttribute, getNameAttribute } from '../../foundation.js';

/** [[`IED`]] plugin subeditor for editing `LDevice` element. */
@customElement('ldevice-container')
export class LDeviceContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

  private header(): TemplateResult {
    const nameOrInst = getNameAttribute(this.element) ?? getInstanceAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);

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
