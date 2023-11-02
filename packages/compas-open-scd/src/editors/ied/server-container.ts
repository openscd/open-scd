import {
  customElement,
  html,
  property,
  PropertyValues,
  state,
  TemplateResult,
} from 'lit-element';
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

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);

    // When the LN Classes filter is updated, we also want to trigger rendering for the LN Elements.
    if (_changedProperties.has('selectedLNClasses')) {
      this.requestUpdate('lDeviceElements');
    }
  }

  @state()
  private get lDeviceElements(): Element[] {
    return Array.from(this.element.querySelectorAll(':scope > LDevice')).filter(
      element => {
        return (
          Array.from(element.querySelectorAll(':scope > LN,LN0')).filter(
            element => {
              const lnClass = element.getAttribute('lnClass') ?? '';
              return this.selectedLNClasses.includes(lnClass);
            }
          ).length > 0
        );
      }
    );
  }

  render(): TemplateResult {
    return html`<action-pane .label="${this.header()}">
      <mwc-icon slot="icon">${serverIcon}</mwc-icon>
      ${this.lDeviceElements.map(
        server =>
          html`<ldevice-container
            .editCount=${this.editCount}
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
