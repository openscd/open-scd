import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import '../../action-pane.js';

/** [[`Server Container`]] plugin subeditor for editing `Server` sections. */
@customElement('server-container')
export class ServerContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

  get header(): string {
    return 'Server';
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header}"></action-pane>`;
  }

  static styles = css``;
}
