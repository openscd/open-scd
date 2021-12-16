import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import '../../action-pane.js';

/** [[`IED`]] plugin subeditor for editing `LN` and `LN0` element. */
@customElement('ln-container')
export class LNContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

  get header(): string {
    const prefix = this.element.getAttribute('prefix');
    const lnClass = this.element.getAttribute('lnClass');
    const inst = this.element.getAttribute('inst');

    return `${prefix != null ? `${prefix} \u2014 ` : ''}
            ${lnClass}
            ${inst ? ` \u2014 ${inst}` : ''}`;
  }

  render(): TemplateResult {
    return html`<action-pane label="${this.header}">
    </action-pane>`;
  }

  static styles = css``;
}