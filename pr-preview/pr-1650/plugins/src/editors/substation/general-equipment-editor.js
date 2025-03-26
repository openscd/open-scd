var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {
  customElement,
  html,
  LitElement,
  property,
  state,
  css,
  query
} from "../../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../../_snowpack/pkg/lit-translate.js";
import "../../../../_snowpack/pkg/@material/mwc-icon-button.js";
import "../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../../../../_snowpack/pkg/@material/mwc-menu.js";
import "../../../../_snowpack/pkg/@material/mwc-fab.js";
import "../../../../openscd/src/action-pane.js";
import "./eq-function-editor.js";
import "./l-node-editor.js";
import {generalConductingEquipmentIcon} from "../../../../openscd/src/icons/icons.js";
import {
  newWizardEvent,
  tags
} from "../../../../openscd/src/foundation.js";
import {
  getChildElementsByTagName
} from "../../../../_snowpack/link/packages/xml/dist/index.js";
import {newActionEvent} from "../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js";
import {emptyWizard, wizards} from "../../wizards/wizard-library.js";
function childTags(element) {
  if (!element)
    return [];
  return tags[element.tagName].children.filter((child) => wizards[child].create !== emptyWizard);
}
export let GeneralEquipmentEditor = class extends LitElement {
  constructor() {
    super(...arguments);
    this.editCount = -1;
    this.showfunctions = false;
  }
  get header() {
    const name = this.element.getAttribute("name") ?? "";
    const desc = this.element.getAttribute("desc");
    if (!this.showfunctions)
      return `${name}`;
    return `${name} ${desc ? `—  ${desc}` : ""}`;
  }
  openEditWizard() {
    const wizard = wizards["GeneralEquipment"].edit(this.element);
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
          element: this.element
        }
      }));
  }
  renderLNodes() {
    const lNodes = getChildElementsByTagName(this.element, "LNode");
    return lNodes.length ? html`<div class="container lnode">
          ${lNodes.map((lNode) => html`<l-node-editor
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${lNode}
              ></l-node-editor>`)}
        </div>` : html``;
  }
  renderEqFunctions() {
    const eFunctions = getChildElementsByTagName(this.element, "EqFunction");
    return eFunctions.length ? html`${eFunctions.map((eFunction) => html` <eq-function-editor
              .editCount=${this.editCount}
              .doc=${this.doc}
              .element=${eFunction}
            ></eq-function-editor>`)}` : html``;
  }
  renderAddButtons() {
    return childTags(this.element).map((child) => html`<mwc-list-item value="${child}"
          ><span>${child}</span></mwc-list-item
        >`);
  }
  render() {
    if (this.showfunctions)
      return html`<action-pane label=${this.header}>
        <abbr slot="action" title="${get("edit")}">
          <mwc-icon-button
            icon="edit"
            @click=${() => this.openEditWizard()}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${get("remove")}">
          <mwc-icon-button
            icon="delete"
            @click=${() => this.remove()}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" style="position:relative;" title="${get("add")}">
          <mwc-icon-button
            icon="playlist_add"
            @click=${() => this.addMenu.open = true}
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
      </action-pane>`;
    return html`<action-icon label=${this.header}>
      <mwc-icon slot="icon">${generalConductingEquipmentIcon}</mwc-icon>
      <mwc-fab
        slot="action"
        mini
        icon="edit"
        @click="${() => this.openEditWizard()}}"
      ></mwc-fab>
      <mwc-fab
        slot="action"
        mini
        icon="delete"
        @click="${() => this.remove()}}"
      ></mwc-fab>
    </action-icon>`;
  }
};
GeneralEquipmentEditor.styles = css`
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
  property({attribute: false})
], GeneralEquipmentEditor.prototype, "doc", 2);
__decorate([
  property({type: Number})
], GeneralEquipmentEditor.prototype, "editCount", 2);
__decorate([
  property({attribute: false})
], GeneralEquipmentEditor.prototype, "element", 2);
__decorate([
  property({type: Boolean})
], GeneralEquipmentEditor.prototype, "showfunctions", 2);
__decorate([
  state()
], GeneralEquipmentEditor.prototype, "header", 1);
__decorate([
  query("mwc-menu")
], GeneralEquipmentEditor.prototype, "addMenu", 2);
__decorate([
  query('mwc-icon-button[icon="playlist_add"]')
], GeneralEquipmentEditor.prototype, "addButton", 2);
GeneralEquipmentEditor = __decorate([
  customElement("general-equipment-editor")
], GeneralEquipmentEditor);
