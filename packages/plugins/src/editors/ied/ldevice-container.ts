import {
  css,
  customElement,
  html,
  property,
  PropertyValues,
  query,
  state,
  TemplateResult,
} from 'lit-element';
import { nothing } from 'lit-html';
import { get } from 'lit-translate';

import { IconButtonToggle } from '@material/mwc-icon-button-toggle';

import {
  getDescriptionAttribute,
  getInstanceAttribute,
  getNameAttribute,
  getLdNameAttribute,
  newWizardEvent,
} from '@openscd/open-scd/src/foundation.js';
import { logicalDeviceIcon } from '@openscd/open-scd/src/icons/ied-icons.js';

import '@openscd/open-scd/src/action-pane.js';
import './ln-container.js';

import { wizards } from '../../wizards/wizard-library.js';
import { Container } from './foundation.js';

/** [[`IED`]] plugin subeditor for editing `LDevice` element. */
@customElement('ldevice-container')
export class LDeviceContainer extends Container {
  @property()
  selectedLNClasses: string[] = [];

  @query('#toggleButton')
  toggleButton!: IconButtonToggle | undefined;

  private openEditWizard(): void {
    const wizard = wizards['LDevice'].edit(this.element);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private header(): TemplateResult {
    const nameOrInst =
      getNameAttribute(this.element) ?? getInstanceAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);
    const ldName = getLdNameAttribute(this.element);

    return html`${nameOrInst}${desc ? html` &mdash; ${desc}` : nothing}${ldName
      ? html` &mdash; ${ldName}`
      : nothing}`;
  }

  protected firstUpdated(): void {
    this.requestUpdate();
  }

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);

    // When the LN Classes filter is updated, we also want to trigger rendering for the LN Elements.
    if (_changedProperties.has('selectedLNClasses')) {
      this.requestUpdate('lnElements');
    }
  }

  @state()
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
      <mwc-icon slot="icon">${logicalDeviceIcon}</mwc-icon>
      <abbr slot="action" title="${get('edit')}">
        <mwc-icon-button
          icon="edit"
          @click=${() => this.openEditWizard()}
        ></mwc-icon-button>
      </abbr>
      ${lnElements.length > 0
        ? html`<abbr
            slot="action"
            title="${get('iededitor.toggleChildElements')}"
          >
            <mwc-icon-button-toggle
              on
              id="toggleButton"
              onIcon="keyboard_arrow_up"
              offIcon="keyboard_arrow_down"
              @click=${() => this.requestUpdate()}
            ></mwc-icon-button-toggle>
          </abbr>`
        : nothing}
      <div id="lnContainer">
        ${this.toggleButton?.on
          ? lnElements.map(
              ln => html`<ln-container
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${ln}
                .nsdoc=${this.nsdoc}
                .ancestors=${[...this.ancestors, this.element]}
              ></ln-container> `
            )
          : nothing}
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

    abbr {
      text-decoration: none;
    }

    @media (max-width: 387px) {
      #lnContainer {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }
  `;
}
