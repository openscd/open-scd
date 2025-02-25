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
  css
} from "../../../../_snowpack/pkg/lit-element.js";
import "../../../../_snowpack/pkg/@material/mwc-list.js";
import "../../../../_snowpack/pkg/@material/mwc-tab.js";
import "../../../../_snowpack/pkg/@material/mwc-tab-bar.js";
import "../../../../_snowpack/pkg/@material/mwc-button.js";
export let OscdMenuTabs = class extends LitElement {
  constructor() {
    super(...arguments);
    this.editors = [];
    this.activeTabIndex = 0;
  }
  get activeEditor() {
    return this._activeEditor;
  }
  set activeEditor(editor) {
    this._activeEditor = editor;
    this.activeTabIndex = this.editors.indexOf(this.activeEditor || this.editors[0]);
    this.requestUpdate();
  }
  render() {
    if (this.editors.length === 0) {
      return html``;
    }
    return html`
      <mwc-tab-bar
        @MDCTabBar:activated=${this.handleActivatedEditorTab}
        activeIndex=${this.activeTabIndex}
      >
        ${this.editors.map(EditorTab)}
      </mwc-tab-bar>
    `;
  }
  handleActivatedEditorTab(e) {
    const tabIndex = e.detail.index;
    const editor = this.editors[tabIndex];
    this.activeTabIndex = tabIndex;
    this.dispatchActivateEditor(editor);
  }
  dispatchActivateEditor(editor) {
    const newEvent = new CustomEvent(TabActivatedEventKey, {
      detail: {editor},
      composed: true,
      bubbles: true
    });
    this.dispatchEvent(newEvent);
  }
};
OscdMenuTabs.styles = css`
    mwc-tab {
      background-color: var(--primary);
      --mdc-theme-primary: var(--mdc-theme-on-primary);
    }
  `;
__decorate([
  property({type: Array})
], OscdMenuTabs.prototype, "editors", 2);
__decorate([
  property({type: Object})
], OscdMenuTabs.prototype, "activeEditor", 1);
__decorate([
  state()
], OscdMenuTabs.prototype, "activeTabIndex", 2);
OscdMenuTabs = __decorate([
  customElement("oscd-menu-tabs")
], OscdMenuTabs);
function EditorTab({name, icon}) {
  return html`
    <mwc-tab label=${name} icon=${icon || "edit"}> </mwc-tab>
  `;
}
export const TabActivatedEventKey = "oscd-editor-tab-activated";
