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

  private get lnElements(): Element[] {
    return Array.from(this.element.querySelectorAll(':scope > LN,LN0')).filter(
      element => {
        const lnClass = element.getAttribute('lnClass') ?? '';
        return this.selectedLNClasses.includes(lnClass);
      }
    );
  }

  render(): TemplateResult {
    const lnElements = this.lnElements;

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
      <div id="lnContainer">
        ${lnElements.map(
          ln => html`<ln-container
            .doc=${this.doc}
            .element=${ln}
            .nsdoc=${this.nsdoc}
            .ancestors=${[...this.ancestors, this.element]}
          ></ln-container> `
        )}
      </div>
    </action-pane>`;
  }

  static styles = css`
    #lnContainer {
      display: grid;
      grid-gap: 12px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, auto));
    }

    @media (max-width: 387px) {
      #lnContainer {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }
  `;
}
