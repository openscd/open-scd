import { __decorate } from "tslib";
import { customElement, html, query } from 'lit-element';
import { nothing } from 'lit-html';
import { until } from 'lit-html/directives/until';
import { translate } from 'lit-translate';
import { getInstanceAttribute, getNameAttribute } from '../../foundation.js';
import '../../action-pane.js';
import './do-container.js';
import { Container } from './foundation.js';
/** [[`IED`]] plugin subeditor for editing `LN` and `LN0` element. */
let LNContainer = class LNContainer extends Container {
    header() {
        const prefix = this.element.getAttribute('prefix');
        const inst = getInstanceAttribute(this.element);
        const data = this.nsdoc.getDataDescription(this.element);
        return html `${prefix != null ? html `${prefix} &mdash; ` : nothing}
    ${data.label} ${inst ? html ` &mdash; ${inst}` : nothing}`;
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
    render() {
        const doElements = this.getDOElements();
        return html `<action-pane .label="${until(this.header())}">
      ${doElements.length > 0
            ? html `<abbr
            slot="action"
            title="${translate('iededitor.toggleChildElements')}"
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