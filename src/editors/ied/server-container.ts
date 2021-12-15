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
import './ldevice-container.js';

/** [[`Server Container`]] plugin subcontainer for editing `Server` sections. */
@customElement('server-container')
export class ServerContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;
  @property({ type: Boolean })
  readonly = false;

  get header(): string {
    return 'Server';
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header}">
    ${Array.from(this.element.querySelectorAll(IEDSelector.LDevice)).map(
      server => html`<ldevice-container
        .element=${server}
        ?readonly=${this.readonly}
      ></ldevice-container>`)}
    </action-pane>`;
  }

  static styles = css``;
}
