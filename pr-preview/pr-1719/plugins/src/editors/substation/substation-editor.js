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
  query,
  state
} from "../../../../_snowpack/pkg/lit-element.js";
import {classMap} from "../../../../_snowpack/pkg/lit-html/directives/class-map.js";
import {get} from "../../../../_snowpack/pkg/lit-translate.js";
import "../../../../_snowpack/pkg/@material/mwc-icon-button.js";
import "../../../../_snowpack/pkg/@material/mwc-icon.js";
import "../../../../openscd/src/action-pane.js";
import "./ied-editor.js";
import "./powertransformer-editor.js";
import "./voltage-level-editor.js";
import "./general-equipment-editor.js";
import {substationIcon} from "../../../../openscd/src/icons/icons.js";
import {
  newWizardEvent,
  tags
} from "../../../../openscd/src/foundation.js";
import {
  getChildElementsByTagName
} from "../../../../_snowpack/link/packages/xml/dist/index.js";
import {newActionEvent} from "../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js";
import {emptyWizard, wizards} from "../../wizards/wizard-library.js";
import {
  cloneSubstationElement,
  renderGeneralEquipment,
  redirectDialog,
  selectors,
  startMove,
  styles
} from "./foundation.js";
function childTags(element) {
  if (!element)
    return [];
  return tags[element.tagName].children.filter((child) => wizards[child].create !== emptyWizard);
}
export let SubstationEditor = class extends LitElement {
  constructor() {
    super(...arguments);
    this.editCount = -1;
    this.readonly = false;
    this.showfunctions = false;
    this.getAttachedIeds = () => {
      return [];
    };
    this.cloneUI = false;
  }
  get header() {
    const name = this.element.getAttribute("name") ?? "";
    const desc = this.element.getAttribute("desc");
    return `${name} ${desc ? `- ${desc}` : ""}`;
  }
  openEditWizard() {
    const wizard = wizards["Substation"].edit(this.element);
    if (wizard)
      this.dispatchEvent(newWizardEvent(wizard));
  }
  openLNodeWizard() {
    const wizard = wizards["LNode"].create(this.element);
    if (wizard)
      this.dispatchEvent(newWizardEvent(wizard));
  }
  remove() {
    this.dispatchEvent(newActionEvent({
      old: {
        parent: this.element.parentElement,
        element: this.element,
        reference: this.element.nextSibling
      }
    }));
  }
  openCreateWizard(tagName) {
    const wizard = wizards[tagName].create(this.element);
    if (wizard)
      this.dispatchEvent(newWizardEvent(wizard));
  }
  updated() {
    this.addMenu.anchor = this.addButton;
  }
  renderRedirectUI() {
    if (!this.cloneUI)
      return html``;
    return redirectDialog(this.element);
  }
  renderLNodes() {
    if (!this.showfunctions)
      return html``;
    const lNodes = getChildElementsByTagName(this.element, "LNode");
    return lNodes.length ? html`<div class="container lnode">
          ${lNodes.map((lNode) => html`<l-node-editor
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${lNode}
              ></l-node-editor>`)}
        </div>` : html``;
  }
  renderFunctions() {
    if (!this.showfunctions)
      return html``;
    const functions = getChildElementsByTagName(this.element, "Function");
    return html` ${functions.map((fUnction) => html`<function-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${fUnction}
          ?showfunctions=${this.showfunctions}
        ></function-editor>`)}`;
  }
  renderIedContainer() {
    const ieds = this.getAttachedIeds?.(this.element) ?? [];
    return ieds?.length ? html`<div id="iedcontainer">
          ${ieds.map((ied) => html`<ied-editor
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${ied}
              ></ied-editor>`)}
        </div>` : html``;
  }
  renderPowerTransformerContainer() {
    const pwts = Array.from(this.element?.querySelectorAll(selectors.Substation + " > PowerTransformer") ?? []);
    return pwts?.length ? html`<div
          class="${classMap({
      ptrContent: true,
      actionicon: !this.showfunctions
    })}"
        >
          ${pwts.map((pwt) => html`<powertransformer-editor
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${pwt}
                ?showfunctions=${this.showfunctions}
              ></powertransformer-editor>`)}
        </div>` : html``;
  }
  renderAddButtons() {
    return childTags(this.element).map((child) => html`<mwc-list-item value="${child}"
          ><span>${child}</span></mwc-list-item
        >`);
  }
  render() {
    return html`${this.renderRedirectUI()}<action-pane label="${this.header}">
        <mwc-icon class="substation-editor-icon" slot="icon"
          >${substationIcon}</mwc-icon
        >
        <abbr slot="action" title="${get("lnode.tooltip")}">
          <mwc-icon-button
            icon="account_tree"
            @click=${() => this.openLNodeWizard()}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${get("duplicate")}">
          <mwc-icon-button
            icon="content_copy"
            @click=${() => cloneSubstationElement(this)}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${get("edit")}">
          <mwc-icon-button
            icon="edit"
            @click=${() => this.openEditWizard()}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${get("move")}">
          <mwc-icon-button
            icon="forward"
            @click=${() => startMove(this, SubstationEditor, [SubstationEditor])}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${get("remove")}">
          <mwc-icon-button
            icon="delete"
            @click=${() => this.remove()}
          ></mwc-icon-button
        ></abbr>
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
          >
        </abbr>
        ${renderGeneralEquipment(this.doc, this.element, this.showfunctions)}
        ${this.renderIedContainer()}${this.renderLNodes()}${this.renderFunctions()}
        ${this.renderPowerTransformerContainer()}
        ${Array.from(this.element.querySelectorAll(selectors.VoltageLevel)).map((voltageLevel) => html`<voltage-level-editor
              .editCount=${this.editCount}
              .doc=${this.doc}
              .element=${voltageLevel}
              .getAttachedIeds=${this.getAttachedIeds}
              ?readonly=${this.readonly}
              ?showfunctions=${this.showfunctions}
            ></voltage-level-editor>`)}</action-pane
      >`;
  }
};
SubstationEditor.styles = css`
    ${styles}
  `;
__decorate([
  property({attribute: false})
], SubstationEditor.prototype, "doc", 2);
__decorate([
  property({type: Number})
], SubstationEditor.prototype, "editCount", 2);
__decorate([
  property({attribute: false})
], SubstationEditor.prototype, "element", 2);
__decorate([
  property({type: Boolean})
], SubstationEditor.prototype, "readonly", 2);
__decorate([
  property({type: Boolean})
], SubstationEditor.prototype, "showfunctions", 2);
__decorate([
  property({type: String})
], SubstationEditor.prototype, "header", 1);
__decorate([
  property({attribute: false})
], SubstationEditor.prototype, "getAttachedIeds", 2);
__decorate([
  state()
], SubstationEditor.prototype, "cloneUI", 2);
__decorate([
  query("mwc-dialog")
], SubstationEditor.prototype, "dialog", 2);
__decorate([
  query("mwc-menu")
], SubstationEditor.prototype, "addMenu", 2);
__decorate([
  query('mwc-icon-button[icon="playlist_add"]')
], SubstationEditor.prototype, "addButton", 2);
SubstationEditor = __decorate([
  customElement("substation-editor")
], SubstationEditor);
