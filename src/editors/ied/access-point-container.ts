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
import { nothing } from 'lit-html';
import { getDescriptionAttribute, getNameAttribute } from '../../foundation.js';

/** [[`IED`]] plugin subeditor for editing `AccessPoint` element. */
@customElement('access-point-container')
export class AccessPointContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

  private header(): TemplateResult {
    const name = getNameAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);

    return html`${name}${desc ? html` &mdash; ${desc}` : nothing}`;
  }

  render(): TemplateResult {
    return html`<action-pane .label="${this.header()}">
    ${Array.from(this.element.querySelectorAll(':scope > Server')).map(
      server => html`<server-container
        .element=${server}
      ></server-container>`)}
    </action-pane>`;
  }

  static styles = css``;
}
