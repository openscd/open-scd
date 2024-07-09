import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { css, customElement, html, property, query, } from '../../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../../_snowpack/pkg/lit-translate.js';
import { nothing } from '../../../../_snowpack/pkg/lit-html.js';
import '../../../../_snowpack/pkg/@material/mwc-icon.js';
import '../../../../_snowpack/pkg/@material/mwc-icon-button.js';
import '../../../../_snowpack/pkg/@material/mwc-icon-button-toggle.js';
import '../../../../_snowpack/pkg/@material/mwc-list.js';
import '../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js';
import { newWizardEvent } from '../../../../openscd/src/foundation.js';
import '../../../../openscd/src/action-pane.js';
import { get104DetailsLine, getCdcValueFromDOIElement, getFullPath, } from './foundation/foundation.js';
import { editAddressWizard } from './wizards/address.js';
import { showDOIInfoWizard } from './wizards/doi.js';
import { PROTOCOL_104_PRIVATE } from './foundation/private.js';
import { Base104Container } from './base-container.js';
/**
 * Container showing all the DAI Elements, related to the 104 Protocol, of the passed DOI Element in a list.
 * The DAI Element can be edited by pressing the Edit button at the end of the line.
 */
let Doi104Container = class Doi104Container extends Base104Container {
    get daiElements() {
        return Array.from(this.element.querySelectorAll(`DAI`))
            .filter(daiElement => daiElement.querySelector(`Private[type="${PROTOCOL_104_PRIVATE}"] > Address`) !== null)
            .sort((dai1, dai2) => getFullPath(dai1, 'DOI').localeCompare(getFullPath(dai2, 'DOI')));
    }
    getAddressElements(daiElement) {
        return Array.from(daiElement.querySelectorAll(`Private[type="${PROTOCOL_104_PRIVATE}"] > Address`)).sort((addr1, addr2) => (addr1.getAttribute('casdu') ?? '').localeCompare(addr2.getAttribute('casdu') ?? '') &&
            (addr1.getAttribute('ioa') ?? '').localeCompare(addr2.getAttribute('ioa') ?? ''));
    }
    firstUpdated() {
        this.requestUpdate();
    }
    openEditAddressWizard(daiElement, addressElement) {
        const doiElement = daiElement.closest('DOI');
        const iedElement = doiElement.closest('IED');
        this.dispatchEvent(newWizardEvent(editAddressWizard(iedElement, doiElement, daiElement, addressElement)));
    }
    openEditTiWizard() {
        this.dispatchEvent(newWizardEvent(showDOIInfoWizard(this.element)));
    }
    get header() {
        const fullPath = getFullPath(this.element, 'IED');
        const cdc = getCdcValueFromDOIElement(this.element);
        return html `${fullPath}${cdc ? html ` (${cdc})` : nothing}`;
    }
    renderAddressList(daiElement) {
        const addresses = this.getAddressElements(daiElement);
        return html `${addresses.map(addressElement => {
            return html `
        <mwc-list-item graphic="icon" hasMeta>
          <span slot="graphic">&nbsp;</span>
          <span>${get104DetailsLine(daiElement, addressElement)}</span>
          <span slot="meta">
            <mwc-icon-button
              icon="edit"
              @click=${() => this.openEditAddressWizard(daiElement, addressElement)}
            >
            </mwc-icon-button>
          </span>
        </mwc-list-item>
      `;
        })}`;
    }
    renderDaiList() {
        const daiElements = this.daiElements;
        return html `${daiElements.map(daiElement => {
            return html `
        <mwc-list-item noninteractive>
          <span>${getFullPath(daiElement, 'DOI')}</span>
        </mwc-list-item>
        ${this.renderAddressList(daiElement)}
      `;
        })}`;
    }
    render() {
        return html `
      <action-pane .label="${this.header}">
        <abbr slot="action" title="${get('edit')}">
          <mwc-icon-button
            icon="info"
            @click=${() => this.openEditTiWizard()}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${get('protocol104.toggleChildElements')}">
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
            ? html ` <mwc-list id="dailist"> ${this.renderDaiList()} </mwc-list>`
            : nothing}
      </action-pane>
    `;
    }
};
Doi104Container.styles = css `
    abbr {
      text-decoration: none;
      border-bottom: none;
    }

    mwc-list-item {
      --mdc-list-item-meta-size: 48px;
    }
  `;
__decorate([
    property()
], Doi104Container.prototype, "element", void 0);
__decorate([
    query('#toggleButton')
], Doi104Container.prototype, "toggleButton", void 0);
__decorate([
    property()
], Doi104Container.prototype, "daiElements", null);
__decorate([
    property()
], Doi104Container.prototype, "header", null);
Doi104Container = __decorate([
    customElement('doi-104-container')
], Doi104Container);
export { Doi104Container };
//# sourceMappingURL=doi-container.js.map