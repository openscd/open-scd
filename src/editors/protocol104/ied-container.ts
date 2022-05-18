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
import '@material/mwc-list/mwc-list-item';

import {
  getDescriptionAttribute,
  getNameAttribute,
} from "../../foundation.js";

import '../../action-pane.js';

import {
  getCdcValue,
  getFullPath
} from "./foundation/foundation.js";

@customElement('ied-104-container')
export class Ied104Container extends LitElement {
  @property()
  element!: Element;

  @query('#toggleButton')
  toggleButton!: IconButtonToggle | undefined;

  private getDaiElements(): Element[] {
    return Array.from(this.element.querySelectorAll('DAI > Private[type="IEC_60870_5_104"]'))
      .map(daiPrivateElement => daiPrivateElement.parentElement!)
      .sort((dai1, dai2) => getFullPath(dai1).localeCompare(getFullPath(dai2)) );
  }

  protected firstUpdated(): void {
    this.requestUpdate();
  }

  private openEditWizard(): void {
    // TODO: Implemented by next story to start editing the private values of 104.
    this.requestUpdate();
  }

  private header(): TemplateResult {
    const name = getNameAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);

    return html`${name}${desc ? html` &mdash; ${desc}` : nothing}`;
  }

  private get104DetailsLine(daiElement: Element): string {
    const values = [];

    const cdcValue = getCdcValue(daiElement);
    if (cdcValue) values.push(`cdc: ${cdcValue}`);

    const privateElement = daiElement.querySelector('Private[type="IEC_60870_5_104"] > Address');
    if (privateElement) {
      if (privateElement.hasAttribute('casdu')) values.push(`casdu: ${privateElement.getAttribute('casdu')}`);
      if (privateElement.hasAttribute('ioa')) values.push(`ioa: ${privateElement.getAttribute('ioa')}`);
      if (privateElement.hasAttribute('ti')) values.push(`ti: ${privateElement.getAttribute('ti')}`);
    }
    return values.join(', ');
  }

  render(): TemplateResult {
    const dais = this.getDaiElements();
    return html`
      <action-pane .label="${this.header()}">
        <mwc-icon slot="icon">developer_board</mwc-icon>
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
            <filtered-list id="dailist">
              ${dais.map(daiElement => {
                  return html`
                    <mwc-list-item tabindex="0" twoLine hasMeta>
                      <span>${getFullPath(daiElement)}</span>
                      <span slot="secondary">${this.get104DetailsLine(daiElement)}</span>
                      <span slot="meta">
                        <mwc-icon-button
                          icon="edit"
                          @click=${() => this.openEditWizard()}>
                        </mwc-icon-button>
                      </span>
                    </mwc-list-item>
                  `;
                }
              )}
            </filtered-list>`
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
