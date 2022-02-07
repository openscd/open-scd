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
import { Nsdoc } from '../../foundation/nsdoc.js';

/** [[`IED`]] plugin subeditor for editing `AccessPoint` element. */
@customElement('access-point-container')
export class AccessPointContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

  @property()
  nsdoc!: Nsdoc;

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
        .nsdoc=${this.nsdoc}
      ></server-container>`)}
    </action-pane>`;
  }

  static styles = css``;
}
