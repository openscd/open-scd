import {
  css,
  customElement,
  html,
  property,
  TemplateResult,
} from 'lit-element';

import '../../action-pane.js';
import './server-container.js'
import { nothing } from 'lit-html';
import { getDescriptionAttribute, getNameAttribute } from '../../foundation.js';
import { Nsdoc } from '../../foundation/nsdoc.js';
import { accessPointIcon } from '../../icons/ied-icons.js';
import { Container } from './foundation.js';

/** [[`IED`]] plugin subeditor for editing `AccessPoint` element. */
@customElement('access-point-container')
export class AccessPointContainer extends Container {
  @property()
  nsdoc!: Nsdoc;

  private header(): TemplateResult {
    const name = getNameAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);

    return html`${name}${desc ? html` &mdash; ${desc}` : nothing}`;
  }

  render(): TemplateResult {
    return html`<action-pane .label="${this.header()}">
      <mwc-icon slot="icon">${accessPointIcon}</mwc-icon>
      ${Array.from(this.element.querySelectorAll(':scope > Server')).map(server =>
        html`<server-container
          .element=${server}
          .nsdoc=${this.nsdoc}
          .ancestors=${[...this.ancestors, this.element]}
        ></server-container>`)}
    </action-pane>`;
  }

  static styles = css``;
}
