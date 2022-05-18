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
  getInstanceAttribute,
  getNameAttribute,
} from "../../foundation.js";

import '../../action-pane.js';

import { getCdcValue } from "./foundation/foundation.js";

@customElement('ied-104-container')
export class Ied104Container extends LitElement {
  @property()
  element!: Element;

  @query('#toggleButton')
  toggleButton!: IconButtonToggle | undefined;

  private get daiElements(): Element[] {
    return Array.from(this.element.querySelectorAll('DAI > Private[type="IEC_60870_5_104"]'))
      .map(daiPrivateElement => daiPrivateElement.parentElement!)
      .sort((dai1, dai2) => this.getFullPath(dai1).localeCompare(this.getFullPath(dai2)) );
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

  private getFullPath(daiElement: Element): string {
    let path = daiElement.getAttribute('name') ?? '';
    let parent = daiElement.parentElement;

    while (parent && parent.tagName != 'IED') {
      let value: string | undefined;
      switch (parent.tagName) {
        case 'LN':
        case 'LN0': {
          const prefix = parent.getAttribute('prefix');
          const inst = getInstanceAttribute(parent);
          value = `${prefix ? prefix + '-' : ''}${parent.getAttribute('lnClass')}${inst ? '-' + inst : ''}`;
          break;
        }
        case 'LDevice': {
          value = getNameAttribute(parent) ?? getInstanceAttribute(parent);
          break;
        }
        default: {
          // Just add the name to the list
          value = getNameAttribute(parent);
        }
      }

      path = (value ? value + ' / ' : '') + path;
      parent = parent.parentElement;
    }

    return path;
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
    const dais = this.daiElements;
    if (dais.length > 0) {
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
                        <span>${this.getFullPath(daiElement)}</span>
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
    return html ``;
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
