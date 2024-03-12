import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { translate } from 'lit-translate';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-menu';
import './conducting-equipment-editor.js';
import './function-editor.js';
import './general-equipment-editor.js';
import './l-node-editor.js';
import './line-editor.js';
import './process-editor.js';
import './substation-editor.js';
import './process-editor.js';
import { styles } from './foundation.js';
import { getChildElementsByTagName, newActionEvent, newWizardEvent, tags, } from '../../foundation.js';
import { emptyWizard, wizards } from '../../wizards/wizard-library.js';
function childTags(element) {
    if (!element)
        return [];
    return tags[element.tagName].children.filter(child => wizards[child].create !== emptyWizard);
}
let ProcessEditor = class ProcessEditor extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
        /** Whether `Function` and `LNode` are rendered */
        this.showfunctions = false;
    }
    get header() {
        const name = this.element.getAttribute('name') ?? '';
        const desc = this.element.getAttribute('desc');
        return `${name} ${desc ? `—${desc}` : ''}`;
    }
    openEditWizard() {
        const wizard = wizards['Process'].edit(this.element);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    openCreateWizard(tagName) {
        const wizard = wizards[tagName].create(this.element);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    renderConductingEquipments() {
        const ConductingEquipments = getChildElementsByTagName(this.element, 'ConductingEquipment');
        return html ` ${ConductingEquipments.map(ConductingEquipment => html `<conducting-equipment-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${ConductingEquipment}
          ?showfunctions=${this.showfunctions}
        ></conducting-equipment-editor>`)}`;
    }
    renderGeneralEquipments() {
        const GeneralEquipments = getChildElementsByTagName(this.element, 'GeneralEquipment');
        return html ` ${GeneralEquipments.map(GeneralEquipment => html `<general-equipment-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${GeneralEquipment}
          ?showfunctions=${this.showfunctions}
        ></general-equipment-editor>`)}`;
    }
    renderLines() {
        const Lines = getChildElementsByTagName(this.element, 'Line');
        return html ` ${Lines.map(Line => html `<line-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${Line}
          ?showfunctions=${this.showfunctions}
        ></line-editor>`)}`;
    }
    renderSubstations() {
        const Substations = getChildElementsByTagName(this.element, 'Substation');
        return html ` ${Substations.map(Substation => html `<substation-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${Substation}
          ?showfunctions=${this.showfunctions}
        ></substation-editor>`)}`;
    }
    renderProcesses() {
        const Processes = getChildElementsByTagName(this.element, 'Process');
        return html ` ${Processes.map(Process => html `<process-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${Process}
          ?showfunctions=${this.showfunctions}
        ></process-editor>`)}`;
    }
    renderFunctions() {
        if (!this.showfunctions)
            return html ``;
        const Functions = getChildElementsByTagName(this.element, 'Function');
        return html ` ${Functions.map(Function => html `<function-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${Function}
          ?showfunctions=${this.showfunctions}
        ></function-editor>`)}`;
    }
    renderLNodes() {
        if (!this.showfunctions)
            return html ``;
        const lNodes = getChildElementsByTagName(this.element, 'LNode');
        return lNodes.length
            ? html `<div class="container lnode">
          ${lNodes.map(lNode => html `<l-node-editor
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${lNode}
              ></l-node-editor>`)}
        </div>`
            : html ``;
    }
    renderAddButtons() {
        return childTags(this.element).map(child => html `<mwc-list-item value="${child}"
          ><span>${child}</span></mwc-list-item
        >`);
    }
    updated() {
        if (this.addMenu && this.addButton)
            this.addMenu.anchor = this.addButton;
    }
    remove() {
        if (this.element.parentElement)
            this.dispatchEvent(newActionEvent({
                old: {
                    parent: this.element.parentElement,
                    element: this.element,
                },
            }));
    }
    render() {
        return html `<action-pane label=${this.header}>
      <abbr slot="action" title="${translate('edit')}">
        <mwc-icon-button
          icon="edit"
          @click=${() => this.openEditWizard()}
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${translate('remove')}">
        <mwc-icon-button
          icon="delete"
          @click=${() => this.remove()}
        ></mwc-icon-button>
      </abbr>
      <abbr
        slot="action"
        style="position:relative;"
        title="${translate('add')}"
      >
        <mwc-icon-button
          icon="playlist_add"
          @click=${() => (this.addMenu.open = true)}
        ></mwc-icon-button
        ><mwc-menu
          corner="BOTTOM_RIGHT"
          menuCorner="END"
          @action=${(e) => {
            const tagName = e.target.selected.value;
            this.openCreateWizard(tagName);
        }}
          >${this.renderAddButtons()}</mwc-menu
        ></abbr
      >
      ${this.renderConductingEquipments()}${this.renderGeneralEquipments()}${this.renderFunctions()}${this.renderLNodes()}
      ${this.renderLines()} ${this.renderSubstations()}${this.renderProcesses()}
    </action-pane>`;
    }
};
ProcessEditor.styles = css `
    ${styles}

    :host(.moving) {
      opacity: 0.3;
    }

    abbr {
      text-decoration: none;
      border-bottom: none;
    }
  `;
__decorate([
    property({ attribute: false })
], ProcessEditor.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], ProcessEditor.prototype, "editCount", void 0);
__decorate([
    property({ attribute: false })
], ProcessEditor.prototype, "element", void 0);
__decorate([
    property({ type: Boolean })
], ProcessEditor.prototype, "showfunctions", void 0);
__decorate([
    state()
], ProcessEditor.prototype, "header", null);
__decorate([
    query('mwc-menu')
], ProcessEditor.prototype, "addMenu", void 0);
__decorate([
    query('mwc-icon-button[icon="playlist_add"]')
], ProcessEditor.prototype, "addButton", void 0);
ProcessEditor = __decorate([
    customElement('process-editor')
], ProcessEditor);
export { ProcessEditor };
//# sourceMappingURL=process-editor.js.map