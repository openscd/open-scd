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
import './tapchanger-editor.js';
import { styles } from './foundation.js';
import { getChildElementsByTagName, newActionEvent, newWizardEvent, tags, } from '../../foundation.js';
import { emptyWizard, wizards } from '../../wizards/wizard-library.js';
function childTags(element) {
    if (!element)
        return [];
    return tags[element.tagName].children.filter(child => wizards[child].create !== emptyWizard);
}
let TransformerWindingEditor = class TransformerWindingEditor extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
        /** Whether `EqFunction` elements are rendered */
        this.showfunctions = false;
    }
    /** TransformerWinding name attribute */
    get label() {
        const name = `${this.element.hasAttribute('name')
            ? `${this.element.getAttribute('name')}`
            : ''}`;
        const description = `${this.element.hasAttribute('desc')
            ? ` - ${this.element.getAttribute('desc')}`
            : ''}`;
        return `${name}${description}`;
    }
    openEditWizard() {
        const wizard = wizards['TransformerWinding'].edit(this.element);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
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
        return eqFunctions.length
            ? html ` ${eqFunctions.map(eqFunction => html `<eq-function-editor
              .editCount=${this.editCount}
              .doc=${this.doc}
              .element=${eqFunction}
              ?showfunctions=${this.showfunctions}
            ></eq-function-editor>`)}`
            : html ``;
    }
    renderTapChanger() {
        if (!this.showfunctions)
            return html ``;
        const tapChangers = getChildElementsByTagName(this.element, 'TapChanger');
        return tapChangers.length
            ? html ` ${tapChangers.map(tapChanger => html `<tapchanger-editor
              .editCount=${this.editCount}
              .doc=${this.doc}
              .element=${tapChanger}
              ?showfunctions=${this.showfunctions}
            ></tapchanger-editor>`)}`
            : html ``;
    }
    renderAddButtons() {
        return childTags(this.element).map(child => html `<mwc-list-item value="${child}"
          ><span>${child}</span></mwc-list-item
        >`);
    }
    render() {
        return html `<action-pane label="${this.label}">
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
      ${this.renderTapChanger()}
    </action-pane> `;
    }
};
TransformerWindingEditor.styles = css `
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
], TransformerWindingEditor.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], TransformerWindingEditor.prototype, "editCount", void 0);
__decorate([
    property({ attribute: false })
], TransformerWindingEditor.prototype, "element", void 0);
__decorate([
    property({ type: Boolean })
], TransformerWindingEditor.prototype, "showfunctions", void 0);
__decorate([
    property({ type: String })
], TransformerWindingEditor.prototype, "label", null);
__decorate([
    query('mwc-menu')
], TransformerWindingEditor.prototype, "addMenu", void 0);
__decorate([
    query('mwc-icon-button[icon="playlist_add"]')
], TransformerWindingEditor.prototype, "addButton", void 0);
TransformerWindingEditor = __decorate([
    customElement('transformer-winding-editor')
], TransformerWindingEditor);
export { TransformerWindingEditor };
//# sourceMappingURL=transformer-winding-editor.js.map