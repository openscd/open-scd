var ConductingEquipmentEditor_1;
import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { translate } from 'lit-translate';
import '@material/mwc-fab';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-menu';
import '../../action-icon.js';
import '../../action-pane.js';
import './eq-function-editor.js';
import './l-node-editor.js';
import './sub-equipment-editor.js';
import { startMove, getIcon, styles } from './foundation.js';
import { getChildElementsByTagName, newActionEvent, newWizardEvent, tags, } from '../../foundation.js';
import { BayEditor } from './bay-editor.js';
import { emptyWizard, wizards } from '../../wizards/wizard-library.js';
function childTags(element) {
    if (!element)
        return [];
    return tags[element.tagName].children.filter(child => wizards[child].create !== emptyWizard);
}
/** [[`SubstationEditor`]] subeditor for a `ConductingEquipment` element. */
let ConductingEquipmentEditor = ConductingEquipmentEditor_1 = class ConductingEquipmentEditor extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
        /** Whether `EqFunction`, `SubEqFunction` and `SubEquipment` are rendered */
        this.showfunctions = false;
    }
    /** ConductingEquipment name attribute */
    get name() {
        return this.element.getAttribute('name') ?? '';
    }
    openEditWizard() {
        const wizard = wizards['ConductingEquipment'].edit(this.element);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    openLNodeWizard() {
        const wizard = wizards['LNode'].create(this.element);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    openCreateWizard(tagName) {
        const wizard = wizards[tagName].create(this.element);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    remove() {
        if (this.element)
            this.dispatchEvent(newActionEvent({
                old: {
                    parent: this.element.parentElement,
                    element: this.element,
                    reference: this.element.nextSibling,
                },
            }));
    }
    updated() {
        if (this.addMenu && this.addButton)
            this.addMenu.anchor = this.addButton;
    }
    renderLNodes() {
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
    renderEqFunctions() {
        if (!this.showfunctions)
            return html ``;
        const eqFunctions = getChildElementsByTagName(this.element, 'EqFunction');
        return html ` ${eqFunctions.map(eqFunction => html `<eq-function-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${eqFunction}
          ?showfunctions=${this.showfunctions}
        ></eq-function-editor>`)}`;
    }
    renderSubEquipments() {
        if (!this.showfunctions)
            return html ``;
        const subEquipments = getChildElementsByTagName(this.element, 'SubEquipment');
        return html ` ${subEquipments.map(subEquipment => html `<sub-equipment-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${subEquipment}
        ></sub-equipment-editor>`)}`;
    }
    renderAddButtons() {
        return childTags(this.element).map(child => html `<mwc-list-item value="${child}"
          ><span>${child}</span></mwc-list-item
        >`);
    }
    renderContentPane() {
        return html `<mwc-icon slot="icon" style="width:24px;height:24px"
        >${getIcon(this.element)}</mwc-icon
      >
      <abbr slot="action" title="${translate('lnode.tooltip')}">
        <mwc-icon-button
          slot="action"
          mini
          @click="${() => this.openLNodeWizard()}"
          icon="account_tree"
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${translate('edit')}">
        <mwc-icon-button
          slot="action"
          mini
          icon="edit"
          @click="${() => this.openEditWizard()}}"
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${translate('move')}">
        <mwc-icon-button
          slot="action"
          mini
          @click="${() => startMove(this, ConductingEquipmentEditor_1, [BayEditor])}"
          icon="forward"
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${translate('remove')}">
        <mwc-icon-button
          slot="action"
          mini
          icon="delete"
          @click="${() => this.remove()}}"
        ></mwc-icon-button> </abbr
      ><abbr
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
        >
      </abbr>`;
    }
    renderContentIcon() {
        return html `<mwc-icon slot="icon">${getIcon(this.element)}</mwc-icon>
      <mwc-fab
        slot="action"
        mini
        @click="${() => this.openLNodeWizard()}"
        icon="account_tree"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        icon="edit"
        @click="${() => this.openEditWizard()}}"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        @click="${() => startMove(this, ConductingEquipmentEditor_1, [BayEditor])}"
        icon="forward"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        icon="delete"
        @click="${() => this.remove()}}"
      ></mwc-fab>`;
    }
    render() {
        if (this.showfunctions)
            return html `<action-pane label="${this.name}"
        >${this.renderContentPane()}${this.renderLNodes()}${this.renderEqFunctions()}${this.renderSubEquipments()}</action-pane
        ></action-pane
      >`;
        return html `<action-icon label="${this.name}"
      >${this.renderContentIcon()}</action-icon
    >`;
    }
};
ConductingEquipmentEditor.styles = css `
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
], ConductingEquipmentEditor.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], ConductingEquipmentEditor.prototype, "editCount", void 0);
__decorate([
    property({ attribute: false })
], ConductingEquipmentEditor.prototype, "element", void 0);
__decorate([
    property({ type: String })
], ConductingEquipmentEditor.prototype, "name", null);
__decorate([
    property({ type: Boolean })
], ConductingEquipmentEditor.prototype, "showfunctions", void 0);
__decorate([
    query('mwc-menu')
], ConductingEquipmentEditor.prototype, "addMenu", void 0);
__decorate([
    query('mwc-icon-button[icon="playlist_add"]')
], ConductingEquipmentEditor.prototype, "addButton", void 0);
ConductingEquipmentEditor = ConductingEquipmentEditor_1 = __decorate([
    customElement('conducting-equipment-editor')
], ConductingEquipmentEditor);
export { ConductingEquipmentEditor };
//# sourceMappingURL=conducting-equipment-editor.js.map