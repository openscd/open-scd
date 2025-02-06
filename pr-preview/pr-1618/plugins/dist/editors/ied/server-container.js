import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { customElement, html, property, state, } from '../../../../_snowpack/pkg/lit-element.js';
import { nothing } from '../../../../_snowpack/pkg/lit-html.js';
import '../../../../openscd/src/action-pane.js';
import './ldevice-container.js';
import { serverIcon } from '../../../../openscd/src/icons/ied-icons.js';
import { getDescriptionAttribute } from '../../../../openscd/src/foundation.js';
import { Container } from './foundation.js';
/** [[`IED`]] plugin subeditor for editing `Server` element. */
let ServerContainer = class ServerContainer extends Container {
    constructor() {
        super(...arguments);
        this.selectedLNClasses = [];
    }
    header() {
        const desc = getDescriptionAttribute(this.element);
        return html `Server${desc ? html ` &mdash; ${desc}` : nothing}`;
    }
    updated(_changedProperties) {
        super.updated(_changedProperties);
        // When the LN Classes filter is updated, we also want to trigger rendering for the LN Elements.
        if (_changedProperties.has('selectedLNClasses')) {
            this.requestUpdate('lDeviceElements');
        }
    }
    get lDeviceElements() {
        return Array.from(this.element.querySelectorAll(':scope > LDevice')).filter(element => {
            return (Array.from(element.querySelectorAll(':scope > LN,LN0')).filter(element => {
                const lnClass = element.getAttribute('lnClass') ?? '';
                return this.selectedLNClasses.includes(lnClass);
            }).length > 0);
        });
    }
    render() {
        return html `<action-pane .label="${this.header()}">
      <mwc-icon slot="icon">${serverIcon}</mwc-icon>
      ${this.lDeviceElements.map(server => html `<ldevice-container
            .editCount=${this.editCount}
            .doc=${this.doc}
            .element=${server}
            .nsdoc=${this.nsdoc}
            .selectedLNClasses=${this.selectedLNClasses}
            .ancestors=${[...this.ancestors, this.element]}
          ></ldevice-container>`)}
    </action-pane>`;
    }
};
__decorate([
    property()
], ServerContainer.prototype, "selectedLNClasses", void 0);
__decorate([
    state()
], ServerContainer.prototype, "lDeviceElements", null);
ServerContainer = __decorate([
    customElement('server-container')
], ServerContainer);
export { ServerContainer };
//# sourceMappingURL=server-container.js.map