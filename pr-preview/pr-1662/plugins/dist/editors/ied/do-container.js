import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { customElement, html, property, query, } from '../../../../_snowpack/pkg/lit-element.js';
import { nothing } from '../../../../_snowpack/pkg/lit-html.js';
import { get } from '../../../../_snowpack/pkg/lit-translate.js';
import '../../../../_snowpack/pkg/@material/mwc-icon-button-toggle.js';
import '../../../../openscd/src/action-pane.js';
import './da-container.js';
import { getDescriptionAttribute, getNameAttribute, newWizardEvent, } from '../../../../openscd/src/foundation.js';
import { createDoInfoWizard } from './do-wizard.js';
import { Container, findDOTypeElement, getInstanceDAElement, } from './foundation.js';
/** [[`IED`]] plugin subeditor for editing `DO` element. */
let DOContainer = class DOContainer extends Container {
    header() {
        const name = getNameAttribute(this.element);
        const desc = getDescriptionAttribute(this.element);
        if (this.instanceElement != null) {
            return html `<b>${name}${desc ? html ` &mdash; ${desc}` : nothing}</b>`;
        }
        else {
            return html `${name}${desc ? html ` &mdash; ${desc}` : nothing}`;
        }
    }
    /**
     * Get the nested SDO element(s).
     * @returns The nested SDO element(s) of this DO container.
     */
    getDOElements() {
        const doType = findDOTypeElement(this.element);
        if (doType != null) {
            return Array.from(doType.querySelectorAll(':scope > SDO'));
        }
        return [];
    }
    /**
     * Get the nested (B)DA element(s).
     * @returns The nested (B)DA element(s) of this DO container.
     */
    getDAElements() {
        const type = this.element.getAttribute('type') ?? undefined;
        const doType = this.element
            .closest('SCL')
            .querySelector(`:root > DataTypeTemplates > DOType[id="${type}"]`);
        if (doType != null) {
            return Array.from(doType.querySelectorAll(':scope > DA'));
        }
        return [];
    }
    /**
     * Get the instance element (SDI) of a (S)DO element (if available)
     * @param dO - The (S)DO object to search with.
     * @returns The optional SDI element.
     */
    getInstanceDOElement(dO) {
        const sdoName = getNameAttribute(dO);
        if (this.instanceElement) {
            return this.instanceElement.querySelector(`:scope > SDI[name="${sdoName}"]`);
        }
        return null;
    }
    render() {
        const daElements = this.getDAElements();
        const doElements = this.getDOElements();
        return html `<action-pane
      .label="${this.header()}"
      icon="${this.instanceElement != null ? 'done' : ''}"
    >
      <abbr slot="action">
        <mwc-icon-button
          title=${this.nsdoc.getDataDescription(this.element).label}
          icon="info"
          @click=${() => this.dispatchEvent(newWizardEvent(createDoInfoWizard(this.element, this.instanceElement, this.ancestors, this.nsdoc)))}
        ></mwc-icon-button>
      </abbr>
      ${daElements.length > 0 || doElements.length > 0
            ? html `<abbr
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
            ? daElements.map(daElement => html `<da-container
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${daElement}
                .instanceElement=${getInstanceDAElement(this.instanceElement, daElement)}
                .nsdoc=${this.nsdoc}
                .ancestors=${[...this.ancestors, this.element]}
              ></da-container>`)
            : nothing}
      ${this.toggleButton?.on
            ? doElements.map(doElement => html `<do-container
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${doElement}
                .instanceElement=${this.getInstanceDOElement(doElement)}
                .nsdoc=${this.nsdoc}
                .ancestors=${[...this.ancestors, this.element]}
              ></do-container>`)
            : nothing}
    </action-pane> `;
    }
};
__decorate([
    property({ attribute: false })
], DOContainer.prototype, "instanceElement", void 0);
__decorate([
    query('#toggleButton')
], DOContainer.prototype, "toggleButton", void 0);
DOContainer = __decorate([
    customElement('do-container')
], DOContainer);
export { DOContainer };
//# sourceMappingURL=do-container.js.map