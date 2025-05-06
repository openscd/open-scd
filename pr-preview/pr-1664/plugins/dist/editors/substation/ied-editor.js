import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { customElement, html, LitElement, property, query, } from '../../../../_snowpack/pkg/lit-element.js';
import '../../../../_snowpack/pkg/@material/mwc-fab.js';
import '../../../../_snowpack/pkg/@material/mwc-icon.js';
import '../../../../openscd/src/action-icon.js';
import { createClientLnWizard } from '../../wizards/clientln.js';
import { gooseIcon, smvIcon, reportIcon, } from '../../../../openscd/src/icons/icons.js';
import { wizards } from '../../wizards/wizard-library.js';
import { newWizardEvent } from '../../../../openscd/src/foundation.js';
import { newActionEvent } from '../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js';
import { selectGseControlWizard } from '../../wizards/gsecontrol.js';
import { selectSampledValueControlWizard } from '../../wizards/sampledvaluecontrol.js';
import { selectReportControlWizard } from '../../wizards/reportcontrol.js';
import { removeIEDWizard } from '../../wizards/ied.js';
/** [[`SubstationEditor`]] subeditor for a child-less `IED` element. */
let IedEditor = class IedEditor extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
    }
    /** IED name attribute */
    get name() {
        return this.element.getAttribute('name') ?? 'UNDEFINED';
    }
    openEditWizard() {
        const wizard = wizards['IED'].edit(this.element);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    openReportControlSelection() {
        this.dispatchEvent(newWizardEvent(() => selectReportControlWizard(this.element)));
    }
    openGseControlSelection() {
        this.dispatchEvent(newWizardEvent(() => selectGseControlWizard(this.element)));
    }
    openSmvControlSelection() {
        this.dispatchEvent(newWizardEvent(() => selectSampledValueControlWizard(this.element)));
    }
    openCommunicationMapping() {
        const sendingIeds = Array.from(this.element.closest('SCL')?.querySelectorAll('IED') ?? []);
        const wizard = createClientLnWizard(sendingIeds, this.element);
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
    render() {
        return html `<action-icon label="${this.name}" icon="developer_board">
      <mwc-fab
        slot="action"
        class="edit"
        mini
        @click="${() => this.openEditWizard()}"
        icon="edit"
      ></mwc-fab
      ><mwc-fab
        slot="action"
        class="delete"
        mini
        @click="${() => this.removeIED()}"
        icon="delete"
      ></mwc-fab
      ><mwc-fab
        slot="action"
        class="selectreport"
        mini
        @click="${() => this.openReportControlSelection()}"
        ><mwc-icon slot="icon">${reportIcon}</mwc-icon></mwc-fab
      ><mwc-fab
        slot="action"
        class="selectsmv"
        mini
        @click="${() => this.openSmvControlSelection()}"
        ><mwc-icon slot="icon">${smvIcon}</mwc-icon></mwc-fab
      ><mwc-fab
        slot="action"
        class="connectreport"
        mini
        @click="${() => this.openCommunicationMapping()}"
        icon="add_link"
      ></mwc-fab
      ><mwc-fab
        slot="action"
        class="selectgse"
        mini
        @click="${() => this.openGseControlSelection()}"
        ><mwc-icon slot="icon">${gooseIcon}</mwc-icon></mwc-fab
      ></action-icon
    > `;
    }
};
__decorate([
    property({ attribute: false })
], IedEditor.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], IedEditor.prototype, "editCount", void 0);
__decorate([
    property({ attribute: false })
], IedEditor.prototype, "element", void 0);
__decorate([
    property({ type: String })
], IedEditor.prototype, "name", null);
__decorate([
    query('.connectreport')
], IedEditor.prototype, "connectReport", void 0);
IedEditor = __decorate([
    customElement('ied-editor')
], IedEditor);
export { IedEditor };
//# sourceMappingURL=ied-editor.js.map