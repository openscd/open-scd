import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult
} from "lit-element";
import { translate } from "lit-translate";
import { nothing } from "lit-html";

import { IconButtonToggle } from "@material/mwc-icon-button-toggle";

import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-icon-button-toggle';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';

import { newWizardEvent } from "../../foundation.js";

import '../../action-pane.js';

import {
  getCdcValue,
  getFullPath,
  PRIVATE_TYPE_104
} from "./foundation/foundation.js";
import { editAddressWizard } from "./wizards/address.js";
import { showDOIInfoWizard } from "./wizards/doi.js";


/**
 * Container showing all the DAI Elements, related to the 104 Protocol, of the passed DOI Element in a list.
 * The DAI Element can be edited by pressing the Edit button at the end of the line.
 */
@customElement('doi-104-container')
export class Doi104Container extends LitElement {
  @property()
  element!: Element;

  @query('#toggleButton')
  toggleButton!: IconButtonToggle | undefined;

  private getDaiElements(): Element[] {
    return Array.from(this.element.querySelectorAll(`DAI`))
      .filter(daiElement => daiElement.querySelector(`Private[type="${PRIVATE_TYPE_104}"]`) !== null)
      .sort((dai1, dai2) => getFullPath(dai1, 'DOI').localeCompare(getFullPath(dai2, 'DOI')) );
  }

  private getAddressElements(daiElement: Element): Element[] {
    return Array.from(daiElement.querySelectorAll(`Private[type="${PRIVATE_TYPE_104}"] > Address`))
      .sort((addr1, addr2) => (addr1.getAttribute('ioa') ?? '').localeCompare(addr2.getAttribute('ioa') ?? '') );
  }

  protected firstUpdated(): void {
    this.requestUpdate();
  }

  private openEditAddressWizard(addressElement: Element): void {
    this.dispatchEvent(newWizardEvent(editAddressWizard(addressElement)));
  }

  private openEditTiWizard(): void {
    this.dispatchEvent(newWizardEvent(showDOIInfoWizard(this.element)));
  }

  private static get104DetailsLine(address: Element): string {
    const values = [];

    if (address.hasAttribute('casdu')) values.push(`casdu: ${address.getAttribute('casdu')}`);
    if (address.hasAttribute('ioa')) values.push(`ioa: ${address.getAttribute('ioa')}`);
    if (address.hasAttribute('ti')) values.push(`ti: ${address.getAttribute('ti')}`);
    if (address.hasAttribute('expectedValue')) values.push(`expectedValue: ${address.getAttribute('expectedValue')}`);
    if (address.hasAttribute('unitMultiplier')) values.push(`unitMultiplier: ${address.getAttribute('unitMultiplier')}`);
    if (address.hasAttribute('scaleMultiplier')) values.push(`scaleMultiplier: ${address.getAttribute('scaleMultiplier')}`);
    if (address.hasAttribute('scaleOffset')) values.push(`scaleOffset: ${address.getAttribute('scaleOffset')}`);
    if (address.hasAttribute('inverted')) values.push(`inverted: ${address.getAttribute('inverted')}`);
    if (address.hasAttribute('check')) values.push(`check: ${address.getAttribute('check')}`);

    return values.join(", ");
  }

  private header(): TemplateResult {
    const fullPath = getFullPath(this.element, 'IED')
    const cdc = getCdcValue(this.element);

    return html`${fullPath}${cdc ? html` (${cdc})` : nothing}`;
  }

  private renderAddressList(daiElement: Element): TemplateResult {
    const addresses = this.getAddressElements(daiElement);
    return html `${addresses.map(addressElement => {
      return html`
            <mwc-list-item graphic="icon" hasMeta>
              <span slot="graphic">&nbsp;</span>
              <span>${Doi104Container.get104DetailsLine(addressElement)}</span>
              <span slot="meta">
                <mwc-icon-button
                  icon="edit"
                  @click=${() => this.openEditAddressWizard(addressElement)}>
                </mwc-icon-button>
              </span>
            </mwc-list-item>
          `;
    })}`;
  }

  private renderDaiList(): TemplateResult {
    const daiElements = this.getDaiElements();
    return html `${daiElements.map(daiElement => {
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
      <action-pane .label="${this.header()}">
        <abbr slot="action" title="${translate('edit')}">
          <mwc-icon-button
            icon="info"
            @click=${() => this.openEditTiWizard()}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${translate('protocol104.toggleChildElements')}">
          <mwc-icon-button-toggle
            id="toggleButton"
            on
            onIcon="keyboard_arrow_up"
            offIcon="keyboard_arrow_down"
            @click=${() => this.requestUpdate()}>
          </mwc-icon-button-toggle>
        </abbr>
        ${this.toggleButton?.on
          ? html`
            <mwc-list id="dailist">
              ${this.renderDaiList()}
            </mwc-list>`
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
