import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import '../../action-pane.js';
import './server-container.js'
import { IEDSelector } from './foundation.js';
import { nothing } from 'lit-html';

/** [[`IED`]] plugin subeditor for editing `AccessPoint` element. */
@customElement('access-point-container')
export class AccessPointContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

  private header(): TemplateResult {
    const name = this.element.getAttribute('name');
    const desc = this.element.getAttribute('desc');

    return html`${name}${desc ? html` &mdash; ${desc}` : nothing}`;
  }

  render(): TemplateResult {
    return html`<action-pane .label="${this.header()}">
    ${Array.from(this.element.querySelectorAll(IEDSelector.Server)).map(
      server => html`<server-container
        .element=${server}
      ></server-container>`)}
    </action-pane>`;
  }

  static styles = css``;
}
