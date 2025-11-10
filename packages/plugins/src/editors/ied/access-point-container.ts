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
import { get, translate } from 'lit-translate';

import {
  getDescriptionAttribute,
  getNameAttribute,
  newWizardEvent,
} from '@openscd/open-scd/src/foundation.js';
import { accessPointIcon } from '@openscd/open-scd/src/icons/ied-icons.js';
import { newActionEvent } from '@openscd/core/foundation/deprecated/editor.js';
import { wizards } from '../../wizards/wizard-library.js';
import { editServicesWizard } from '../../wizards/services.js';
import { removeAccessPointWizard } from '../../wizards/accesspoint.js';

import '@openscd/open-scd/src/action-pane.js';
import './server-container.js';

import { Container } from './foundation.js';

/** [[`IED`]] plugin subeditor for editing `AccessPoint` element. */
@customElement('access-point-container')
export class AccessPointContainer extends Container {
  @property()
  selectedLNClasses: string[] = [];

  @state()
  private get lnElements(): Element[] {
    return Array.from(this.element.querySelectorAll(':scope > LN')).filter(
      element => {
        const lnClass = element.getAttribute('lnClass') ?? '';
        return this.selectedLNClasses.includes(lnClass);
      }
    );
  }

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

    return html` <mwc-icon-button
      slot="action"
      icon="settings"
      title="${get('iededitor.settings')}"
      @click=${() => this.openSettingsWizard(services)}
    ></mwc-icon-button>`;
  }

  private openEditWizard(): void {
    const wizard = wizards['AccessPoint'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private openSettingsWizard(services: Element): void {
    const wizard = editServicesWizard(services);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private header(): TemplateResult {
    const name = getNameAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);

    return html`${name}${desc ? html` &mdash; ${desc}` : nothing}`;
  }

  private removeAccessPoint(): void {
    const wizard = removeAccessPointWizard(this.element);
    if (wizard) {
      this.dispatchEvent(newWizardEvent(() => wizard));
    } else {
      // If no Wizard is needed, just remove the element.
      this.dispatchEvent(
        newActionEvent({
          old: { parent: this.element.parentElement!, element: this.element },
        })
      );
    }
  }

  render(): TemplateResult {
    const lnElements = this.lnElements;

    return html`<action-pane .label="${this.header()}">
      <mwc-icon slot="icon">${accessPointIcon}</mwc-icon>
      <mwc-icon-button
        slot="action"
        icon="delete"
        title="${translate('remove')}"
        @click=${() => this.removeAccessPoint()}
      ></mwc-icon-button>
      <mwc-icon-button
        slot="action"
        icon="edit"
        title="${translate('edit')}"
        @click=${() => this.openEditWizard()}
      ></mwc-icon-button>
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
