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
import './server-container.js'

/** [[`AccessPoint Container`]] plugin subcontainer for editing `AccessPoint` sections. */
@customElement('access-point-container')
export class AccessPointContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;
  @property({ type: Boolean })
  readonly = false;

  get header(): string {
    const name = this.element.getAttribute('name') ?? '';
    const desc = this.element.getAttribute('desc') ?? '';

    return `${name} ${desc ? `- ${desc}` : ''}`;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header}">
    ${Array.from(this.element.querySelectorAll(IEDSelector.Server)).map(
      server => html`<server-container
        .element=${server}
        ?readonly=${this.readonly}
      ></server-container>`)}
    </action-pane>`;
  }

  static styles = css``;
}
