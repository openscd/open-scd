import { customElement, html, property, TemplateResult } from 'lit-element';
import { nothing } from 'lit-html';

import '../../action-pane.js';
import './ldevice-container.js';
import { serverIcon } from '../../icons/ied-icons.js';
import { getDescriptionAttribute } from '../../foundation.js';
import { Container } from './foundation.js';

/** [[`IED`]] plugin subeditor for editing `Server` element. */
@customElement('server-container')
export class ServerContainer extends Container {
  @property()
  selectedLNClasses: string[] = [];

  private header(): TemplateResult {
    const desc = getDescriptionAttribute(this.element);

    return html`Server${desc ? html` &mdash; ${desc}` : nothing}`;
  }

  render(): TemplateResult {
    return html`<action-pane .label="${this.header()}">
      <mwc-icon slot="icon">${serverIcon}</mwc-icon>
      ${Array.from(this.element.querySelectorAll(':scope > LDevice')).map(
        server =>
          html`<ldevice-container
            .doc=${this.doc}
            .element=${server}
            .nsdoc=${this.nsdoc}
            .selectedLNClasses=${this.selectedLNClasses}
            .ancestors=${[...this.ancestors, this.element]}
          ></ldevice-container>`
      )}
    </action-pane>`;
  }
}
