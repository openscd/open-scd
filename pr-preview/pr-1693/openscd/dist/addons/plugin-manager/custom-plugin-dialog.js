import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { customElement, html, LitElement, query, css, } from '../../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../../_snowpack/pkg/lit-translate.js';
import { newAddExternalPluginEvent, pluginIcons } from '../../open-scd.js';
import { menuPosition } from "../../plugin.js";
import '../../../../_snowpack/pkg/@material/mwc-dialog.js';
import '../../../../_snowpack/pkg/@material/mwc-drawer.js';
import '../../../../_snowpack/pkg/@material/mwc-list.js';
import '../../../../_snowpack/pkg/@material/mwc-select.js';
import '../../../../_snowpack/pkg/@material/mwc-switch.js';
import '../../../../_snowpack/pkg/@material/mwc-textfield.js';
let OscdCustomPluginDialog = class OscdCustomPluginDialog extends LitElement {
    render() {
        return html `
      <mwc-dialog id="dialog" heading="${get('plugins.add.heading')}">
        <div style="display: flex; flex-direction: column; row-gap: 8px;">
          <p style="color:var(--mdc-theme-error);">
            ${get('plugins.add.warning')}
          </p>
          <mwc-textfield
            label="${get('plugins.add.name')}"
            helper="${get('plugins.add.nameHelper')}"
            required
            id="pluginNameInput"
          ></mwc-textfield>
          <mwc-list id="pluginKindList">
            <mwc-radio-list-item
              id="editor"
              value="editor"
              hasMeta
              selected
              left
            >
              ${get('plugins.editor')}
              <mwc-icon slot="meta">
                ${pluginIcons['editor']}
              </mwc-icon>
            </mwc-radio-list-item>
            <mwc-radio-list-item value="menu" hasMeta left>
              ${get('plugins.menu')}
            <mwc-icon slot="meta">
              ${pluginIcons['menu']}
            </mwc-icon>
            </mwc-radio-list-item>
            <div id="menudetails">
              <mwc-formfield
                id="enabledefault"
                label="${get('plugins.requireDoc')}"
              >
                <mwc-switch id="requireDoc" checked></mwc-switch>
              </mwc-formfield>
              <mwc-select id="positionList" value="middle" fixedpositionList>
                ${Object.values(menuPosition).map(menutype => html `<mwc-list-item value="${menutype}"
                      >${get('plugins.' + menutype)}</mwc-list-item
                    >`)}
              </mwc-select>
            </div>
            <style>
              #menudetails {
                display: none;
                padding: 20px;
                padding-left: 50px;
              }
              #pluginKindList [value="menu"][selected] ~ #menudetails {
                display: grid;
              }
              #enabledefault {
                padding-bottom: 20px;
              }
              #positionList {
                max-width: 250px;
              }
            </style>
            <mwc-radio-list-item id="validator" value="validator" hasMeta left>
              ${get('plugins.validator')}
              <mwc-icon slot="meta">
                ${pluginIcons['validator']}
              </mwc-icon>
            </mwc-radio-list-item>
          </mwc-list>
          <mwc-textfield
            label="${get('plugins.add.src')}"
            helper="${get('plugins.add.srcHelper')}"
            placeholder="http://example.com/plugin.js"
            type="url"
            required
            id="pluginSrcInput">
          </mwc-textfield>
        </div>
        <mwc-button
          slot="secondaryAction"
          dialogAction="close"
          label="${get('cancel')}">
        </mwc-button>
        <mwc-button
          id="addButton"
          slot="primaryAction"
          icon="add"
          label="${get('add')}"
          trailingIcon
          @click=${() => this.handleAddPlugin()}>
        </mwc-button>
      </mwc-dialog>
    `;
    }
    close() {
        this.dialog.close();
    }
    show() {
        this.dialog.show();
    }
    get open() {
        return this.dialog.open;
    }
    handleAddPlugin() {
        if (!(this.pluginSrcInput.checkValidity() &&
            this.pluginNameInput.checkValidity() &&
            this.pluginKindList.selected &&
            this.requireDoc &&
            this.positionList.selected))
            return;
        this.dispatchEvent(newAddExternalPluginEvent({
            src: this.pluginSrcInput.value,
            name: this.pluginNameInput.value,
            kind: this.pluginKindList.selected.value,
            requireDoc: this.requireDoc.checked,
            position: this.positionList.value,
            active: true,
            // this is an added plugin and will be remove by reset either way
            activeByDefault: false,
        }));
        this.requestUpdate();
        this.dialog.close();
    }
};
OscdCustomPluginDialog.styles = css `

    mwc-dialog {
      --mdc-dialog-max-width: 98vw;
    }

    mwc-dialog > form {
      display: flex;
      flex-direction: column;
    }

    mwc-dialog > form > * {
      display: block;
      margin-top: 16px;
    }
  `;
__decorate([
    query('#dialog')
], OscdCustomPluginDialog.prototype, "dialog", void 0);
__decorate([
    query('#pluginSrcInput')
], OscdCustomPluginDialog.prototype, "pluginSrcInput", void 0);
__decorate([
    query('#pluginNameInput')
], OscdCustomPluginDialog.prototype, "pluginNameInput", void 0);
__decorate([
    query('#pluginKindList')
], OscdCustomPluginDialog.prototype, "pluginKindList", void 0);
__decorate([
    query('#requireDoc')
], OscdCustomPluginDialog.prototype, "requireDoc", void 0);
__decorate([
    query('#positionList')
], OscdCustomPluginDialog.prototype, "positionList", void 0);
__decorate([
    query('#addButton')
], OscdCustomPluginDialog.prototype, "addButton", void 0);
OscdCustomPluginDialog = __decorate([
    customElement('oscd-custom-plugin-dialog')
], OscdCustomPluginDialog);
export { OscdCustomPluginDialog };
//# sourceMappingURL=custom-plugin-dialog.js.map