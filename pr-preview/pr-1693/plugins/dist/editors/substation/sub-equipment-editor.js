import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { css, customElement, html, LitElement, property, query, } from '../../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../../_snowpack/pkg/lit-translate.js';
import '../../../../_snowpack/pkg/@material/mwc-fab.js';
import '../../../../_snowpack/pkg/@material/mwc-icon.js';
import '../../../../_snowpack/pkg/@material/mwc-icon-button.js';
import '../../../../_snowpack/pkg/@material/mwc-menu.js';
import '../../../../openscd/src/action-icon.js';
import '../../../../openscd/src/action-pane.js';
import './l-node-editor.js';
import './eq-function-editor.js';
import { newWizardEvent, tags, } from '../../../../openscd/src/foundation.js';
import { getChildElementsByTagName } from '../../../../_snowpack/link/packages/xml/dist/index.js';
import { newActionEvent } from '../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js';
import { emptyWizard, wizards } from '../../wizards/wizard-library.js';
function childTags(element) {
    if (!element)
        return [];
    return tags[element.tagName].children.filter(child => wizards[child].create !== emptyWizard);
}
/** [[`SubstationEditor`]] subeditor for a child-less `SubEquipment` element. */
let SubEquipmentEditor = class SubEquipmentEditor extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
    }
    /** SubEquipment name attribute */
    get label() {
        const name = `${this.element.hasAttribute('name')
            ? `${this.element.getAttribute('name')}`
            : ''}`;
        const description = `${this.element.hasAttribute('desc')
            ? ` - ${this.element.getAttribute('desc')}`
            : ''}`;
        const phase = `${this.element.hasAttribute('phase')
            ? ` (${this.element.getAttribute('phase')})`
            : ''}`;
        return `${name}${description}${phase}`;
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
    openCreateWizard(tagName) {
        const wizard = wizards[tagName].create(this.element);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    updated() {
        if (this.addMenu && this.addButton)
            this.addMenu.anchor = this.addButton;
    }
    renderAddButtons() {
        return childTags(this.element).map(child => html `<mwc-list-item value="${child}"
          ><span>${child}</span></mwc-list-item
        >`);
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
        const eqFunctions = getChildElementsByTagName(this.element, 'EqFunction');
        return eqFunctions.length
            ? html ` ${eqFunctions.map(eqFunction => html `<eq-function-editor
              .editCount=${this.editCount}
              .doc=${this.doc}
              .element=${eqFunction}
            ></eq-function-editor>`)}`
            : html ``;
    }
    openEditWizard() {
        const wizard = wizards['SubEquipment'].edit(this.element);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    render() {
        return html `<action-pane label="${this.label}">
      <abbr slot="action" title="${get('edit')}">
        <mwc-icon-button icon="edit" @click=${() => this.openEditWizard()}>
        </mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${get('remove')}">
        <mwc-icon-button
          icon="delete"
          @click=${() => this.remove()}
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" style="position:relative;" title="${get('add')}">
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
      </abbr>

      ${this.renderLNodes()} ${this.renderEqFunctions()}
    </action-pane> `;
    }
};
SubEquipmentEditor.styles = css `
    abbr {
      text-decoration: none;
      border-bottom: none;
    }

    .container.lnode {
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(64px, auto));
    }
  `;
__decorate([
    property({ attribute: false })
], SubEquipmentEditor.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], SubEquipmentEditor.prototype, "editCount", void 0);
__decorate([
    property({ attribute: false })
], SubEquipmentEditor.prototype, "element", void 0);
__decorate([
    property({ type: String })
], SubEquipmentEditor.prototype, "label", null);
__decorate([
    query('mwc-menu')
], SubEquipmentEditor.prototype, "addMenu", void 0);
__decorate([
    query('mwc-icon-button[icon="playlist_add"]')
], SubEquipmentEditor.prototype, "addButton", void 0);
SubEquipmentEditor = __decorate([
    customElement('sub-equipment-editor')
], SubEquipmentEditor);
export { SubEquipmentEditor };
//# sourceMappingURL=sub-equipment-editor.js.map