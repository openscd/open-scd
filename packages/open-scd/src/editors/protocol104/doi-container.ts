import {
  css,
  customElement,
  html,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';
import { nothing } from 'lit-html';

import { IconButtonToggle } from '@material/mwc-icon-button-toggle';

import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-icon-button-toggle';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';

import { newWizardEvent } from '../../foundation.js';

import '../../action-pane.js';

import {
  get104DetailsLine,
  getCdcValueFromDOIElement,
  getFullPath,
} from './foundation/foundation.js';
import { editAddressWizard } from './wizards/address.js';
import { showDOIInfoWizard } from './wizards/doi.js';
import { PROTOCOL_104_PRIVATE } from './foundation/private.js';
import { Base104Container } from './base-container.js';

/**
 * Container showing all the DAI Elements, related to the 104 Protocol, of the passed DOI Element in a list.
 * The DAI Element can be edited by pressing the Edit button at the end of the line.
 */
@customElement('doi-104-container')
export class Doi104Container extends Base104Container {
  @property()
  element!: Element;

  @query('#toggleButton')
  toggleButton!: IconButtonToggle | undefined;

  @property()
  get daiElements(): Element[] {
    return Array.from(this.element.querySelectorAll(`DAI`))
      .filter(
        daiElement =>
          daiElement.querySelector(
            `Private[type="${PROTOCOL_104_PRIVATE}"] > Address`
          ) !== null
      )
      .sort((dai1, dai2) =>
        getFullPath(dai1, 'DOI').localeCompare(getFullPath(dai2, 'DOI'))
      );
  }

  private getAddressElements(daiElement: Element): Element[] {
    return Array.from(
      daiElement.querySelectorAll(
        `Private[type="${PROTOCOL_104_PRIVATE}"] > Address`
      )
    ).sort(
      (addr1, addr2) =>
        (addr1.getAttribute('casdu') ?? '').localeCompare(
          addr2.getAttribute('casdu') ?? ''
        ) &&
        (addr1.getAttribute('ioa') ?? '').localeCompare(
          addr2.getAttribute('ioa') ?? ''
        )
    );
  }

  protected firstUpdated(): void {
    this.requestUpdate();
  }

  private openEditAddressWizard(
    daiElement: Element,
    addressElement: Element
  ): void {
    const doiElement = daiElement.closest('DOI')!;
    const iedElement = doiElement.closest('IED')!;
    this.dispatchEvent(
      newWizardEvent(
        editAddressWizard(iedElement, doiElement, daiElement, addressElement)
      )
    );
  }

  private openEditTiWizard(): void {
    this.dispatchEvent(newWizardEvent(showDOIInfoWizard(this.element)));
  }

  @property()
  get header(): TemplateResult {
    const fullPath = getFullPath(this.element, 'IED');
    const cdc = getCdcValueFromDOIElement(this.element);

    return html`${fullPath}${cdc ? html` (${cdc})` : nothing}`;
  }

  private renderAddressList(daiElement: Element): TemplateResult {
    const addresses = this.getAddressElements(daiElement);
    return html`${addresses.map(addressElement => {
      return html`
        <mwc-list-item graphic="icon" hasMeta>
          <span slot="graphic">&nbsp;</span>
          <span>${get104DetailsLine(daiElement, addressElement)}</span>
          <span slot="meta">
            <mwc-icon-button
              icon="edit"
              @click=${() =>
                this.openEditAddressWizard(daiElement, addressElement)}
            >
            </mwc-icon-button>
          </span>
        </mwc-list-item>
      `;
    })}`;
  }

  private renderDaiList(): TemplateResult {
    const daiElements = this.daiElements;
    return html`${daiElements.map(daiElement => {
      return html`
        <mwc-list-item noninteractive>
          <span>${getFullPath(daiElement, 'DOI')}</span>
        </mwc-list-item>
        ${this.renderAddressList(daiElement)}
      `;
    })}`;
  }

  render(): TemplateResult {
    return html`
      <action-pane .label="${this.header}">
        <abbr slot="action" title="${translate('edit')}">
          <mwc-icon-button
            icon="info"
            @click=${() => this.openEditTiWizard()}
          ></mwc-icon-button>
        </abbr>
        <abbr
          slot="action"
          title="${translate('protocol104.toggleChildElements')}"
        >
          <mwc-icon-button-toggle
            id="toggleButton"
            on
            onIcon="keyboard_arrow_up"
            offIcon="keyboard_arrow_down"
            @click=${() => this.requestUpdate()}
          >
          </mwc-icon-button-toggle>
        </abbr>
        ${this.toggleButton?.on
          ? html` <mwc-list id="dailist"> ${this.renderDaiList()} </mwc-list>`
          : nothing}
      </action-pane>
    `;
  }

  static styles = css`
    abbr {
      text-decoration: none;
      border-bottom: none;
    }

    mwc-list-item {
      --mdc-list-item-meta-size: 48px;
    }
  `;
}
