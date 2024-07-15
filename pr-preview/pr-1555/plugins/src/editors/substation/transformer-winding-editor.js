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
  css,
  customElement,
  html,
  LitElement,
  property,
  query
} from "../../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../../_snowpack/pkg/lit-translate.js";
import "../../../../_snowpack/pkg/@material/mwc-fab.js";
import "../../../../_snowpack/pkg/@material/mwc-icon.js";
import "../../../../_snowpack/pkg/@material/mwc-icon-button.js";
import "../../../../_snowpack/pkg/@material/mwc-menu.js";
import "../../../../openscd/src/action-icon.js";
import "../../../../openscd/src/action-pane.js";
import "./eq-function-editor.js";
import "./l-node-editor.js";
import "./tapchanger-editor.js";
import {transformerWindingIcon} from "../../../../openscd/src/icons/icons.js";
import {styles} from "./foundation.js";
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
export let TransformerWindingEditor = class extends LitElement {
  constructor() {
    super(...arguments);
    this.editCount = -1;
    this.showfunctions = false;
  }
  get label() {
    const name = `${this.element.hasAttribute("name") ? `${this.element.getAttribute("name")}` : ""}`;
    const description = `${this.element.hasAttribute("desc") ? ` - ${this.element.getAttribute("desc")}` : ""}`;
    return `${name}${description}`;
  }
  openEditWizard() {
    const wizard = wizards["TransformerWinding"].edit(this.element);
    if (wizard)
      this.dispatchEvent(newWizardEvent(wizard));
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
    if (!this.showfunctions)
      return html``;
    const eqFunctions = getChildElementsByTagName(this.element, "EqFunction");
    return eqFunctions.length ? html` ${eqFunctions.map((eqFunction) => html`<eq-function-editor
              .editCount=${this.editCount}
              .doc=${this.doc}
              .element=${eqFunction}
              ?showfunctions=${this.showfunctions}
            ></eq-function-editor>`)}` : html``;
  }
  renderTapChanger() {
    if (!this.showfunctions)
      return html``;
    const tapChangers = getChildElementsByTagName(this.element, "TapChanger");
    return tapChangers.length ? html` ${tapChangers.map((tapChanger) => html`<tapchanger-editor
              .editCount=${this.editCount}
              .doc=${this.doc}
              .element=${tapChanger}
              ?showfunctions=${this.showfunctions}
            ></tapchanger-editor>`)}` : html``;
  }
  renderAddButtons() {
    return childTags(this.element).map((child) => html`<mwc-list-item value="${child}"
          ><span>${child}</span></mwc-list-item
        >`);
  }
  render() {
    return html`<action-pane label="${this.label}">
      <mwc-icon class="substation-editor-icon" slot="icon"
        >${transformerWindingIcon}</mwc-icon
      >
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
      ${this.renderTapChanger()}
    </action-pane> `;
  }
};
TransformerWindingEditor.styles = css`
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
  property({attribute: false})
], TransformerWindingEditor.prototype, "doc", 2);
__decorate([
  property({type: Number})
], TransformerWindingEditor.prototype, "editCount", 2);
__decorate([
  property({attribute: false})
], TransformerWindingEditor.prototype, "element", 2);
__decorate([
  property({type: Boolean})
], TransformerWindingEditor.prototype, "showfunctions", 2);
__decorate([
  property({type: String})
], TransformerWindingEditor.prototype, "label", 1);
__decorate([
  query("mwc-menu")
], TransformerWindingEditor.prototype, "addMenu", 2);
__decorate([
  query('mwc-icon-button[icon="playlist_add"]')
], TransformerWindingEditor.prototype, "addButton", 2);
TransformerWindingEditor = __decorate([
  customElement("transformer-winding-editor")
], TransformerWindingEditor);
