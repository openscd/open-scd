import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { css, customElement, html, property, state, } from '../../../../_snowpack/pkg/lit-element.js';
import { nothing } from '../../../../_snowpack/pkg/lit-html.js';
import { get } from '../../../../_snowpack/pkg/lit-translate.js';
import { getDescriptionAttribute, getNameAttribute, newWizardEvent, } from '../../../../openscd/src/foundation.js';
import { accessPointIcon } from '../../../../openscd/src/icons/ied-icons.js';
import { editServicesWizard } from '../../wizards/services.js';
import '../../../../openscd/src/action-pane.js';
import './server-container.js';
import { Container } from './foundation.js';
/** [[`IED`]] plugin subeditor for editing `AccessPoint` element. */
let AccessPointContainer = class AccessPointContainer extends Container {
    constructor() {
        super(...arguments);
        this.selectedLNClasses = [];
    }
    updated(_changedProperties) {
        super.updated(_changedProperties);
        // When the LN Classes filter is updated, we also want to trigger rendering for the LN Elements.
        if (_changedProperties.has('selectedLNClasses')) {
            this.requestUpdate('lnElements');
        }
    }
    renderServicesIcon() {
        const services = this.element.querySelector('Services');
        if (!services) {
            return html ``;
        }
        return html ` <abbr slot="action" title="${get('iededitor.settings')}">
      <mwc-icon-button
        icon="settings"
        @click=${() => this.openSettingsWizard(services)}
      ></mwc-icon-button>
    </abbr>`;
    }
    openSettingsWizard(services) {
        const wizard = editServicesWizard(services);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    get lnElements() {
        return Array.from(this.element.querySelectorAll(':scope > LN')).filter(element => {
            const lnClass = element.getAttribute('lnClass') ?? '';
            return this.selectedLNClasses.includes(lnClass);
        });
    }
    header() {
        const name = getNameAttribute(this.element);
        const desc = getDescriptionAttribute(this.element);
        return html `${name}${desc ? html ` &mdash; ${desc}` : nothing}`;
    }
    render() {
        const lnElements = this.lnElements;
        return html `<action-pane .label="${this.header()}">
      <mwc-icon slot="icon">${accessPointIcon}</mwc-icon>
      ${this.renderServicesIcon()}
      ${Array.from(this.element.querySelectorAll(':scope > Server')).map(server => html `<server-container
            .editCount=${this.editCount}
            .doc=${this.doc}
            .element=${server}
            .nsdoc=${this.nsdoc}
            .selectedLNClasses=${this.selectedLNClasses}
            .ancestors=${[...this.ancestors, this.element]}
          ></server-container>`)}
      <div id="lnContainer">
        ${lnElements.map(ln => html `<ln-container
            .editCount=${this.editCount}
            .doc=${this.doc}
            .element=${ln}
            .nsdoc=${this.nsdoc}
            .ancestors=${[...this.ancestors, this.element]}
          ></ln-container>`)}
      </div>
    </action-pane>`;
    }
};
AccessPointContainer.styles = css `
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
__decorate([
    property()
], AccessPointContainer.prototype, "selectedLNClasses", void 0);
__decorate([
    state()
], AccessPointContainer.prototype, "lnElements", null);
AccessPointContainer = __decorate([
    customElement('access-point-container')
], AccessPointContainer);
export { AccessPointContainer };
//# sourceMappingURL=access-point-container.js.map