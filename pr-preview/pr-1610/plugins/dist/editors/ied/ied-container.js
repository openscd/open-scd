import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { css, customElement, html, property, } from '../../../../_snowpack/pkg/lit-element.js';
import { nothing } from '../../../../_snowpack/pkg/lit-html.js';
import { get } from '../../../../_snowpack/pkg/lit-translate.js';
import '../../../../openscd/src/action-pane.js';
import './access-point-container.js';
import { wizards } from '../../wizards/wizard-library.js';
import { Container } from './foundation.js';
import { getDescriptionAttribute, getNameAttribute, newWizardEvent, } from '../../../../openscd/src/foundation.js';
import { newActionEvent } from '../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js';
import { removeIEDWizard } from '../../wizards/ied.js';
import { editServicesWizard } from '../../wizards/services.js';
/** [[`IED`]] plugin subeditor for editing `IED` element. */
let IedContainer = class IedContainer extends Container {
    constructor() {
        super(...arguments);
        this.selectedLNClasses = [];
    }
    openEditWizard() {
        const wizard = wizards['IED'].edit(this.element);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
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
    removeIED() {
        const wizard = removeIEDWizard(this.element);
        if (wizard) {
            this.dispatchEvent(newWizardEvent(() => wizard));
        }
        else {
            // If no Wizard is needed, just remove the element.
            this.dispatchEvent(newActionEvent({
                old: { parent: this.element.parentElement, element: this.element },
            }));
        }
    }
    header() {
        const name = getNameAttribute(this.element);
        const desc = getDescriptionAttribute(this.element);
        return html `${name}${desc ? html ` &mdash; ${desc}` : nothing}`;
    }
    render() {
        return html ` <action-pane .label="${this.header()}">
      <mwc-icon slot="icon">developer_board</mwc-icon>
      <abbr slot="action" title="${get('remove')}">
        <mwc-icon-button
          icon="delete"
          @click=${() => this.removeIED()}
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${get('edit')}">
        <mwc-icon-button
          icon="edit"
          @click=${() => this.openEditWizard()}
        ></mwc-icon-button>
      </abbr>
      ${this.renderServicesIcon()}
      ${Array.from(this.element.querySelectorAll(':scope > AccessPoint')).map(ap => html `<access-point-container
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${ap}
          .nsdoc=${this.nsdoc}
          .selectedLNClasses=${this.selectedLNClasses}
          .ancestors=${[this.element]}
        ></access-point-container>`)}
    </action-pane>`;
    }
};
IedContainer.styles = css `
    abbr {
      text-decoration: none;
      border-bottom: none;
    }
  `;
__decorate([
    property()
], IedContainer.prototype, "selectedLNClasses", void 0);
IedContainer = __decorate([
    customElement('ied-container')
], IedContainer);
export { IedContainer };
//# sourceMappingURL=ied-container.js.map