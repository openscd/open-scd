import {
  css,
  customElement,
  html,
  property,
  PropertyValues,
  state,
  TemplateResult,
} from 'lit-element';
import { nothing } from 'lit-html';
import { translate } from 'lit-translate';

import {
  getDescriptionAttribute,
  getNameAttribute,
  newWizardEvent,
} from '../../foundation.js';
import { accessPointIcon } from '../../icons/ied-icons.js';
import { editServicesWizard } from '../../wizards/services.js';

import '../../action-pane.js';
import './server-container.js';

import { Container } from './foundation.js';

/** [[`IED`]] plugin subeditor for editing `AccessPoint` element. */
@customElement('access-point-container')
export class AccessPointContainer extends Container {
  @property()
  selectedLNClasses: string[] = [];

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);

    // When the LN Classes filter is updated, we also want to trigger rendering for the LN Elements.
    if (_changedProperties.has('selectedLNClasses')) {
      this.requestUpdate('lnElements');
    }
  }

  private renderServicesIcon(): TemplateResult {
    const services: Element | null = this.element.querySelector('Services');

    if (!services) {
      return html``;
    }

    return html` <abbr slot="action" title="${translate('iededitor.settings')}">
      <mwc-icon-button
        icon="settings"
        @click=${() => this.openSettingsWizard(services)}
      ></mwc-icon-button>
    </abbr>`;
  }

  private openSettingsWizard(services: Element): void {
    const wizard = editServicesWizard(services);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  @state()
  private get lnElements(): Element[] {
    return Array.from(this.element.querySelectorAll(':scope > LN')).filter(
      element => {
        const lnClass = element.getAttribute('lnClass') ?? '';
        return this.selectedLNClasses.includes(lnClass);
      }
    );
  }

  private header(): TemplateResult {
    const name = getNameAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);

    return html`${name}${desc ? html` &mdash; ${desc}` : nothing}`;
  }

  render(): TemplateResult {
    const lnElements = this.lnElements;

    return html`<action-pane .label="${this.header()}">
      <mwc-icon slot="icon">${accessPointIcon}</mwc-icon>
      ${this.renderServicesIcon()}
      ${Array.from(this.element.querySelectorAll(':scope > Server')).map(
        server =>
          html`<server-container
            .editCount=${this.editCount}
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
            .editCount=${this.editCount}
            .doc=${this.doc}
            .element=${ln}
            .nsdoc=${this.nsdoc}
            .ancestors=${[...this.ancestors, this.element]}
          ></ln-container>`
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
