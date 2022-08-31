import {
  css,
  customElement,
  html,
  property,
  TemplateResult,
} from 'lit-element';
import { nothing } from 'lit-html';

import { getDescriptionAttribute, getNameAttribute } from '../../foundation.js';
import { accessPointIcon } from '../../icons/ied-icons.js';

import '../../action-pane.js';
import './server-container.js';

import { Container } from './foundation.js';

/** [[`IED`]] plugin subeditor for editing `AccessPoint` element. */
@customElement('access-point-container')
export class AccessPointContainer extends Container {
  @property()
  selectedLNClasses: string[] = [];

  private header(): TemplateResult {
    const name = getNameAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);

    return html`${name}${desc ? html` &mdash; ${desc}` : nothing}`;
  }

  render(): TemplateResult {
    return html`<action-pane .label="${this.header()}">
      <mwc-icon slot="icon">${accessPointIcon}</mwc-icon>
      ${Array.from(this.element.querySelectorAll(':scope > Server')).map(
        server =>
          html`<server-container
            .doc=${this.doc}
            .element=${server}
            .nsdoc=${this.nsdoc}
            .selectedLNClasses=${this.selectedLNClasses}
            .ancestors=${[...this.ancestors, this.element]}
          ></server-container>`
      )}
    </action-pane>`;
  }

  static styles = css``;
}
