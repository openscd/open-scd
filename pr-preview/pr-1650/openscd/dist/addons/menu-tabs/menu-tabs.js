import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { customElement, html, LitElement, property, state, css } from '../../../../_snowpack/pkg/lit-element.js';
import '../../../../_snowpack/pkg/@material/mwc-list.js';
import '../../../../_snowpack/pkg/@material/mwc-tab.js';
import '../../../../_snowpack/pkg/@material/mwc-tab-bar.js';
import '../../../../_snowpack/pkg/@material/mwc-button.js';
let OscdMenuTabs = class OscdMenuTabs extends LitElement {
    constructor() {
        super(...arguments);
        this.editors = [];
        this.activeTabIndex = 0;
    }
    get activeEditor() { return this._activeEditor; }
    set activeEditor(editor) {
        this._activeEditor = editor;
        this.activeTabIndex = this.editors.indexOf(this.activeEditor || this.editors[0]);
        this.requestUpdate();
    }
    ;
    render() {
        if (this.editors.length === 0) {
            return html ``;
        }
        return html `
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
            detail: { editor },
            composed: true,
            bubbles: true
        });
        this.dispatchEvent(newEvent);
    }
};
OscdMenuTabs.styles = css `
    mwc-tab {
      background-color: var(--primary);
      --mdc-theme-primary: var(--mdc-theme-on-primary);
    }
  `;
__decorate([
    property({ type: Array })
], OscdMenuTabs.prototype, "editors", void 0);
__decorate([
    property({ type: Object })
], OscdMenuTabs.prototype, "activeEditor", null);
__decorate([
    state()
], OscdMenuTabs.prototype, "activeTabIndex", void 0);
OscdMenuTabs = __decorate([
    customElement('oscd-menu-tabs')
], OscdMenuTabs);
export { OscdMenuTabs };
function EditorTab({ name, icon }) {
    return html `
    <mwc-tab label=${name} icon=${icon || 'edit'}> </mwc-tab>
  `;
}
export const TabActivatedEventKey = 'oscd-editor-tab-activated';
//# sourceMappingURL=menu-tabs.js.map