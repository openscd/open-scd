import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { css, customElement, html, property, query, } from '../../../../_snowpack/pkg/lit-element.js';
import { nothing } from '../../../../_snowpack/pkg/lit-html.js';
import { get } from '../../../../_snowpack/pkg/lit-translate.js';
import '../../../../_snowpack/pkg/@material/mwc-icon-button-toggle.js';
import '../../../../openscd/src/action-pane.js';
import { getNameAttribute, newWizardEvent, } from '../../../../openscd/src/foundation.js';
import { wizards } from '../../wizards/wizard-library.js';
import { getCustomField, } from '../../wizards/foundation/dai-field-type.js';
import { createDaInfoWizard } from './da-wizard.js';
import { Container, getInstanceDAElement, getValueElements, } from './foundation.js';
import { createDAIWizard } from '../../wizards/dai.js';
import { determineUninitializedStructure, initializeElements, } from '../../../../openscd/src/foundation/dai.js';
/** [[`IED`]] plugin subeditor for editing `(B)DA` element. */
let DAContainer = class DAContainer extends Container {
    header() {
        const name = getNameAttribute(this.element);
        const bType = this.element.getAttribute('bType') ?? nothing;
        const fc = this.element.getAttribute('fc');
        if (this.instanceElement) {
            return html `<b>${name}</b> &mdash; ${bType}${fc ? html ` [${fc}]` : ``}`;
        }
        else {
            return html `${name} &mdash; ${bType}${fc ? html ` [${fc}]` : ``}`;
        }
    }
    /**
     * Get the nested (B)DA element(s) if available.
     * @returns The nested (B)DA element(s) of this (B)DA container.
     */
    getBDAElements() {
        const type = this.element.getAttribute('type') ?? undefined;
        const doType = this.element.closest('SCL').querySelector(`:root > DataTypeTemplates > DAType[id="${type}"]`);
        if (doType != null) {
            return Array.from(doType.querySelectorAll(':scope > BDA'));
        }
        return [];
    }
    /**
     * Use the list of ancestor to retrieve the list from DO to the current (B)DA Element.
     * This structure is used to create the initialized structure from (DOI/SDI/DAI).
     *
     * @returns The list from the DO Element to the current (B)DA Element.
     */
    getTemplateStructure() {
        // Search for the DO Element, this will be the starting point.
        const doElement = this.ancestors.filter(element => element.tagName == 'DO')[0];
        // From the DO Element and below we need all the elements (BDA, SDO, DA)
        const dataStructure = this.ancestors.slice(this.ancestors.indexOf(doElement));
        // Add the current DA Element also to the list.
        dataStructure.push(this.element);
        return dataStructure;
    }
    openCreateWizard() {
        // Search the LN(0) Element to start creating the initialized structure.
        const lnElement = this.ancestors.filter(element => ['LN0', 'LN'].includes(element.tagName))[0];
        const templateStructure = this.getTemplateStructure();
        // First determine where to start creating new elements (DOI/SDI/DAI)
        const [parentElement, uninitializedTemplateStructure] = determineUninitializedStructure(lnElement, templateStructure);
        // Next create all missing elements (DOI/SDI/DAI)
        const newElement = initializeElements(uninitializedTemplateStructure);
        if (newElement) {
            const wizard = createDAIWizard(parentElement, newElement, this.element);
            if (wizard)
                this.dispatchEvent(newWizardEvent(wizard));
        }
    }
    openEditWizard(val) {
        const wizard = wizards['DAI'].edit(this.element, val);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    getValueDisplayString(val) {
        const sGroup = val.getAttribute('sGroup');
        const prefix = sGroup ? `SG${sGroup}: ` : '';
        const value = val.textContent?.trim();
        return `${prefix}${value}`;
    }
    renderVal() {
        const bType = this.element.getAttribute('bType');
        const element = this.instanceElement ?? this.element;
        const hasInstantiatedVal = !!this.instanceElement?.querySelector('Val');
        return hasInstantiatedVal
            ? getValueElements(element).map(val => html `<div style="display: flex; flex-direction: row;">
            <div style="display: flex; align-items: center; flex: auto;">
              <h4>${this.getValueDisplayString(val)}</h4>
            </div>
            <div style="display: flex; align-items: center;">
              <mwc-icon-button
                icon="edit"
                .disabled="${!getCustomField()[bType]}"
                @click=${() => this.openEditWizard(val)}
              >
              </mwc-icon-button>
            </div>
          </div>`)
            : [
                html `<div style="display: flex; flex-direction: row;">
            <div style="display: flex; align-items: center; flex: auto;">
              <h4></h4>
            </div>
            <div style="display: flex; align-items: center;">
              <mwc-icon-button
                icon="add"
                .disabled="${!getCustomField()[bType]}"
                @click=${() => this.openCreateWizard()}
              >
              </mwc-icon-button>
            </div>
          </div>`,
            ];
    }
    render() {
        const bType = this.element.getAttribute('bType');
        return html `
      <action-pane
        .label="${this.header()}"
        icon="${this.instanceElement != null ? 'done' : ''}"
      >
        <abbr slot="action">
          <mwc-icon-button
            title=${this.nsdoc.getDataDescription(this.element, this.ancestors)
            .label}
            icon="info"
            @click=${() => this.dispatchEvent(newWizardEvent(createDaInfoWizard(this.element, this.instanceElement, this.ancestors, this.nsdoc)))}
          ></mwc-icon-button>
        </abbr>
        ${bType === 'Struct'
            ? html ` <abbr
              slot="action"
              title="${get('iededitor.toggleChildElements')}"
            >
              <mwc-icon-button-toggle
                id="toggleButton"
                onIcon="keyboard_arrow_up"
                offIcon="keyboard_arrow_down"
                @click=${() => this.requestUpdate()}
              >
              </mwc-icon-button-toggle>
            </abbr>`
            : html `${this.renderVal()}`}
        ${this.toggleButton?.on && bType === 'Struct'
            ? this.getBDAElements().map(bdaElement => html `<da-container
                  .editCount=${this.editCount}
                  .doc=${this.doc}
                  .element=${bdaElement}
                  .instanceElement=${getInstanceDAElement(this.instanceElement, bdaElement)}
                  .nsdoc=${this.nsdoc}
                  .ancestors=${[...this.ancestors, this.element]}
                >
                </da-container>`)
            : nothing}
      </action-pane>
    `;
    }
};
DAContainer.styles = css `
    h4 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      margin: 0px;
      padding-left: 0.3em;
      word-break: break-word;
      white-space: pre-wrap;
    }

    mwc-icon-button {
      color: var(--mdc-theme-on-surface);
    }
  `;
__decorate([
    property({ attribute: false })
], DAContainer.prototype, "instanceElement", void 0);
__decorate([
    query('#toggleButton')
], DAContainer.prototype, "toggleButton", void 0);
DAContainer = __decorate([
    customElement('da-container')
], DAContainer);
export { DAContainer };
//# sourceMappingURL=da-container.js.map