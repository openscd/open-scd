import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import '../../action-pane.js';

/** [[`DO Container`]] plugin subeditor for editing `DO`, `SD0`, `DOI` and `SDI` sections. */
@customElement('do-container')
export class DOContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

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
