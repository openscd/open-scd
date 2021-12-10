import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import '../../action-pane.js';
import './ldevice-container.js';

/** [[`Server Container`]] plugin subeditor for editing `Server` sections. */
@customElement('server-container')
export class ServerContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

  get header(): string {
    return 'Server';
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header}">
    ${Array.from(this.element.querySelectorAll('LDevice')).map(
      server => html`<ldevice-container
        .element=${server}
      ></ldevice-container>`)}
    </action-pane>`;
  }

  static styles = css``;
}
