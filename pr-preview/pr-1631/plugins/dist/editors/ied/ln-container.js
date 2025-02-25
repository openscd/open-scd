import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { customElement, html, query } from '../../../../_snowpack/pkg/lit-element.js';
import { nothing } from '../../../../_snowpack/pkg/lit-html.js';
import { until } from '../../../../_snowpack/pkg/lit-html/directives/until.js';
import { get } from '../../../../_snowpack/pkg/lit-translate.js';
import { getInstanceAttribute, getNameAttribute, newWizardEvent, } from '../../../../openscd/src/foundation.js';
import '../../../../openscd/src/action-pane.js';
import './do-container.js';
import { Container } from './foundation.js';
import { wizards } from '../../wizards/wizard-library.js';
/** [[`IED`]] plugin subeditor for editing `LN` and `LN0` element. */
let LNContainer = class LNContainer extends Container {
    header() {
        const prefix = this.element.getAttribute('prefix');
        const inst = getInstanceAttribute(this.element);
        const desc = this.element.getAttribute('desc');
        const data = this.nsdoc.getDataDescription(this.element);
        return html `${prefix != null ? html `${prefix} &mdash; ` : nothing}
    ${data.label} ${inst ? html ` &mdash; ${inst}` : nothing}
    ${desc ? html ` &mdash; ${desc}` : nothing}`;
    }
    /**
     * Get the DO child elements of this LN(0) section.
     * @returns The DO child elements, or an empty array if none are found.
     */
    getDOElements() {
        const lnType = this.element.getAttribute('lnType') ?? undefined;
        const lNodeType = this.element
            .closest('SCL')
            .querySelector(`:root > DataTypeTemplates > LNodeType[id="${lnType}"]`);
        if (lNodeType != null) {
            return Array.from(lNodeType.querySelectorAll(':scope > DO'));
        }
        return [];
    }
    /**
     * Get the instance element (DOI) of a DO element (if available)
     * @param dO - The DO object to use.
     * @returns The optional DOI object.
     */
    getInstanceElement(dO) {
        const doName = getNameAttribute(dO);
        return this.element.querySelector(`:scope > DOI[name="${doName}"]`);
    }
    openEditWizard() {
        const wizardType = this.element.tagName === 'LN' ? 'LN' : 'LN0';
        const wizard = wizards[wizardType].edit(this.element);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    render() {
        const doElements = this.getDOElements();
        return html `<action-pane .label="${until(this.header())}">
      ${doElements.length > 0
            ? html `<abbr slot="action">
          <mwc-icon-button
            slot="action"
            mini
            icon="edit"
            @click="${() => this.openEditWizard()}}"
          ></mwc-icon-button>
        </abbr>
        <abbr
            slot="action"
            title="${get('iededitor.toggleChildElements')}"
          >
            <mwc-icon-button-toggle
              id="toggleButton"
              onIcon="keyboard_arrow_up"
              offIcon="keyboard_arrow_down"
              @click=${() => this.requestUpdate()}
            ></mwc-icon-button-toggle>
          </abbr>`
            : nothing}
      ${this.toggleButton?.on
            ? doElements.map(dO => html `<do-container
              .editCount=${this.editCount}
              .doc=${this.doc}
              .element=${dO}
              .instanceElement=${this.getInstanceElement(dO)}
              .nsdoc=${this.nsdoc}
              .ancestors=${[...this.ancestors, this.element]}
            ></do-container> `)
            : nothing}
    </action-pane>`;
    }
};
__decorate([
    query('#toggleButton')
], LNContainer.prototype, "toggleButton", void 0);
LNContainer = __decorate([
    customElement('ln-container')
], LNContainer);
export { LNContainer };
//# sourceMappingURL=ln-container.js.map