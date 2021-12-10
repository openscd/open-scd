import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import '../../action-pane.js';

/** [[`AccessPoint Container`]] plugin subeditor for editing `AccessPoint` sections. */
@customElement('access-point-container')
export class AccessPointContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

  @property({ type: String })
  get header(): string {
    const name = this.element.getAttribute('name') ?? '';
    const desc = this.element.getAttribute('desc') ?? '';

    return `${name} ${desc ? `- ${desc}` : ''}`;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header}"></action-pane>`;
  }

  static styles = css``;
}
