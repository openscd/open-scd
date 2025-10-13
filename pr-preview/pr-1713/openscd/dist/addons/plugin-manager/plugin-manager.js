import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { customElement, html, LitElement, property, query, css } from '../../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../../_snowpack/pkg/lit-translate.js';
import '../../../../_snowpack/pkg/@material/mwc-dialog.js';
import '../../../../_snowpack/pkg/@material/mwc-list.js';
import { newResetPluginsEvent, newSetPluginsEvent, pluginIcons } from '../../open-scd.js';
let OscdPluginManager = class OscdPluginManager extends LitElement {
    constructor() {
        super(...arguments);
        /** The plugins to render the layout. */
        this.plugins = [];
    }
    render() {
        return html `
        <mwc-dialog
          stacked
          id="plugin-manager-root"
          heading="${get('plugins.heading')}"
        >
          <mwc-list
            id="pluginList"
            multi
            @selected=${(e) => {
            const selectedPlugins = this.pluginList.items
                .filter((item, index) => e.detail.index.has(index))
                // @ts-expect-error: we add plugin to the list item
                .map(item => item.plugin);
            this.dispatchEvent(newSetPluginsEvent(selectedPlugins));
        }}
          >
            <mwc-list-item graphic="avatar" noninteractive>
              <strong>${get(`plugins.editor`)}</strong>
              <mwc-icon slot="graphic" class="inverted">
                ${pluginIcons['editor']}
              </mwc-icon>
            </mwc-list-item>

            <li divider role="separator"></li>

            ${this.generateEditorListItems()}

            <mwc-list-item graphic="avatar" noninteractive>
              <strong>${get(`plugins.menu`)}</strong>
              <mwc-icon slot="graphic" class="inverted">
                <strong>${pluginIcons['menu']}</strong></mwc-icon>
              </mwc-list-item>
            <li divider role="separator"></li>

            ${this.generateMenuListItems('top')}

            <li divider role="separator" inset></li>

            ${this.generateValidatorListItems()}

            <li divider role="separator" inset></li>

            ${this.generateMenuListItems('middle')}

            <li divider role="separator" inset></li>

            ${this.generateMenuListItems('bottom')}

          </mwc-list>
          <mwc-button
            slot="secondaryAction"
            icon="refresh"
            label="${get('reset')}"
            @click=${async () => {
            this.dispatchEvent(newResetPluginsEvent());
            this.requestUpdate();
        }}
            style="--mdc-theme-primary: var(--mdc-theme-error)"
          >
          </mwc-button>
          <mwc-button
            slot="secondaryAction"
            icon=""
            label="${get('close')}"
            dialogAction="close">
          </mwc-button>
          <mwc-button
            outlined
            trailingIcon
            slot="primaryAction"
            icon="library_add"
            label="${get('plugins.add.heading')}&hellip;"
            @click=${() => this.dispatchOpenCustomPluginDialogEvent()}>
          </mwc-button>
        </mwc-dialog>
      `;
    }
    show() {
        this.root.show();
    }
    generateEditorListItems() {
        return this.plugins
            .filter(p => p.kind === 'editor')
            .map(this.renderPluginListItem);
    }
    generateMenuListItems(position) {
        return this.plugins
            .filter(p => p.kind === 'menu' && p.position === position)
            .map(this.renderPluginListItem);
    }
    generateValidatorListItems() {
        return this.plugins
            .filter(p => p.kind === 'validator')
            .map(this.renderPluginListItem);
    }
    dispatchOpenCustomPluginDialogEvent() {
        const event = new CustomEvent('open-plugin-download', {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }
    renderPluginListItem(plugin) {
        if (!plugin) {
            return html ``;
        }
        return html `
      <mwc-check-list-item
          class="${plugin.official ? 'official' : 'external'}"
          value="${plugin.src}"
          .plugin=${plugin}
          ?selected=${plugin.active}
          @request-selected=${(e) => {
            if (e.detail.source !== 'interaction') {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
                return false;
            }
        }}
          hasMeta
          left
        >
          <mwc-icon slot="meta">
            ${plugin.icon || pluginIcons[plugin.kind]}
          </mwc-icon>
          ${plugin.name}
        </mwc-check-list-item>

    `;
    }
};
OscdPluginManager.styles = css `
    mwc-dialog {
      --mdc-dialog-max-width: 98vw;
    }
  `;
__decorate([
    property({ type: Array })
], OscdPluginManager.prototype, "plugins", void 0);
__decorate([
    query('#plugin-manager-root')
], OscdPluginManager.prototype, "root", void 0);
__decorate([
    query('#pluginList')
], OscdPluginManager.prototype, "pluginList", void 0);
OscdPluginManager = __decorate([
    customElement('oscd-plugin-manager')
], OscdPluginManager);
export { OscdPluginManager };
//# sourceMappingURL=plugin-manager.js.map