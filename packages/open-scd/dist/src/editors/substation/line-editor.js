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
import { styles } from './foundation.js';
import { getChildElementsByTagName, newWizardEvent, newActionEvent, tags, } from '../../foundation.js';
import { emptyWizard, wizards } from '../../wizards/wizard-library.js';
function childTags(element) {
    if (!element)
        return [];
    return tags[element.tagName].children.filter(child => wizards[child].create !== emptyWizard);
}
let LineEditor = class LineEditor extends LitElement {
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
        const wizard = wizards['Line'].edit(this.element);
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
      >${this.renderConductingEquipments()}${this.renderGeneralEquipments()}${this.renderFunctions()}${this.renderLNodes()}
    </action-pane>`;
    }
};
LineEditor.styles = css `
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
], LineEditor.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], LineEditor.prototype, "editCount", void 0);
__decorate([
    property({ attribute: false })
], LineEditor.prototype, "element", void 0);
__decorate([
    property({ type: Boolean })
], LineEditor.prototype, "showfunctions", void 0);
__decorate([
    state()
], LineEditor.prototype, "header", null);
__decorate([
    query('mwc-menu')
], LineEditor.prototype, "addMenu", void 0);
__decorate([
    query('mwc-icon-button[icon="playlist_add"]')
], LineEditor.prototype, "addButton", void 0);
LineEditor = __decorate([
    customElement('line-editor')
], LineEditor);
export { LineEditor };
//# sourceMappingURL=line-editor.js.map