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

/** [[`IED`]] plugin subeditor for editing `Server` element. */
@customElement('server-container')
export class ServerContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

  private header(): string {
    return 'Server';
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header()}">
    ${Array.from(this.element.querySelectorAll(':scope > LDevice')).map(
      server => html`<ldevice-container
        .element=${server}
      ></ldevice-container>`)}
    </action-pane>`;
  }

  static styles = css``;
}
