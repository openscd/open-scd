import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { translate } from 'lit-translate';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-menu';
import '../../action-pane.js';
import './eq-function-editor.js';
import './l-node-editor.js';
import './sub-equipment-editor.js';
import { styles } from './foundation.js';
import { getChildElementsByTagName, newActionEvent, newWizardEvent, tags, } from '../../foundation.js';
import { emptyWizard, wizards } from '../../wizards/wizard-library.js';
function childTags(element) {
    if (!element)
        return [];
    return tags[element.tagName].children.filter(child => wizards[child].create !== emptyWizard);
}
let TapChangerEditor = class TapChangerEditor extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
        /** Whether `EqFunction` and `SubEquipment` are rendered */
        this.showfunctions = false;
    }
    get header() {
        const name = this.element.getAttribute('name') ?? '';
        const desc = this.element.getAttribute('desc');
        return `${name} ${desc ? `—${desc}` : ''}`;
    }
    openEditWizard() {
        const wizard = wizards['TapChanger'].edit(this.element);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    openCreateWizard(tagName) {
        const wizard = wizards[tagName].create(this.element);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
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
      ${this.renderLNodes()} ${this.renderEqFunctions()}
      ${this.renderSubEquipments()}
    </action-pane>`;
    }
};
TapChangerEditor.styles = css `
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
], TapChangerEditor.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], TapChangerEditor.prototype, "editCount", void 0);
__decorate([
    property({ attribute: false })
], TapChangerEditor.prototype, "element", void 0);
__decorate([
    property({ type: Boolean })
], TapChangerEditor.prototype, "showfunctions", void 0);
__decorate([
    state()
], TapChangerEditor.prototype, "header", null);
__decorate([
    query('mwc-menu')
], TapChangerEditor.prototype, "addMenu", void 0);
__decorate([
    query('mwc-icon-button[icon="playlist_add"]')
], TapChangerEditor.prototype, "addButton", void 0);
TapChangerEditor = __decorate([
    customElement('tapchanger-editor')
], TapChangerEditor);
export { TapChangerEditor };
//# sourceMappingURL=tapchanger-editor.js.map