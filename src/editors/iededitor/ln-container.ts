import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import '../../action-pane.js';
import './do-container.js';

/** [[`LN Container`]] plugin subeditor for editing `LN` and `LN0` sections. */
@customElement('ln-container')
export class LNContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

  get header(): string {
    const lnClass = this.element.getAttribute('lnClass') ?? '';
    const prefix = this.element.getAttribute('prefix') ?? '';
    const inst = this.element.getAttribute('inst') ?? '';

    return `${lnClass} ${prefix ? `- ${prefix}` : ''} ${inst ? `- ${inst}` : ''}`;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header}">
    ${Array.from(this.element.querySelectorAll('DO,SDO,DOI,SDI')).map(
      server => html`<do-container
        .element=${server}
      ></do-container>`)}
    </action-pane>`;
  }

  static styles = css``;
}
