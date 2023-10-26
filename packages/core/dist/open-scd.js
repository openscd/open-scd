var _OpenSCD_actions;
import { __classPrivateFieldGet, __decorate } from "tslib";
import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import { configureLocalization, localized, msg, str } from '@lit/localize';
import { spread } from '@open-wc/lit-helpers';
import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-drawer';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-list';
import '@material/mwc-tab-bar';
import '@material/mwc-top-app-bar-fixed';
import { sourceLocale, targetLocales } from './locales.js';
import { isComplex, isInsert, isRemove, isUpdate } from './foundation.js';
import './mixins/Wizarding.js';
import { Editing } from './mixins/EditingV2.js';
import { Plugging, pluginTag } from './mixins/Plugging.js';
export { Plugging } from './mixins/Plugging.js';
export { Editing } from './mixins/EditingV2.js';
const { getLocale, setLocale } = configureLocalization({
    sourceLocale,
    targetLocales,
    loadLocale: locale => import(new URL(`locales/${locale}.js`, import.meta.url).href),
});
function describe({ undo, redo }) {
    let result = msg('Something unexpected happened!');
    if (isComplex(redo))
        result = msg(str `≥ ${redo.length} nodes changed`);
    if (isInsert(redo))
        if (isInsert(undo))
            result = msg(str `${redo.node.nodeName} moved to ${redo.parent.nodeName}`);
        else
            result = msg(str `${redo.node.nodeName} inserted into ${redo.parent.nodeName}`);
    if (isRemove(redo))
        result = msg(str `${redo.node.nodeName} removed`);
    if (isUpdate(redo))
        result = msg(str `${redo.element.tagName} updated`);
    return result;
}
function renderActionItem(control, slot = 'actionItems') {
    return html `<mwc-icon-button
    slot="${slot}"
    icon="${control.icon}"
    label="${control.getName()}"
    ?disabled=${control.isDisabled()}
    @click=${control.action}
  ></mwc-icon-button>`;
}
function renderMenuItem(control) {
    return html `
    <mwc-list-item graphic="icon" .disabled=${control.isDisabled()}
      ><mwc-icon slot="graphic">${control.icon}</mwc-icon>
      <span>${control.getName()}</span>
    </mwc-list-item>
  `;
}
/**
 *
 * @description Outer Shell for OpenSCD.
 *
 * @cssprop --oscd-theme-primary Primary color for OpenSCD
 * @cssprop --oscd-theme-app-bar-primary Primary color for OpenSCD appbar
 *
 * @tag open-scd
 */
let OpenSCD = class OpenSCD extends Plugging(Editing(LitElement)) {
    constructor() {
        super();
        this.editorIndex = 0;
        this.controls = {
            undo: {
                icon: 'undo',
                getName: () => msg('Undo'),
                action: () => this.undo(),
                isDisabled: () => !this.canUndo,
            },
            redo: {
                icon: 'redo',
                getName: () => msg('Redo'),
                action: () => this.redo(),
                isDisabled: () => !this.canRedo,
            },
            log: {
                icon: 'history',
                getName: () => msg('Editing history'),
                action: () => (this.logUI.open ? this.logUI.close() : this.logUI.show()),
                isDisabled: () => false,
            },
            menu: {
                icon: 'menu',
                getName: () => msg('Menu'),
                action: async () => {
                    this.menuUI.open = !this.menuUI.open;
                    await this.menuUI.updateComplete;
                    if (this.menuUI.open)
                        this.menuUI.querySelector('mwc-list').focus();
                },
                isDisabled: () => false,
            },
        };
        _OpenSCD_actions.set(this, [this.controls.undo, this.controls.redo, this.controls.log]);
        this.hotkeys = {
            m: this.controls.menu.action,
            z: this.controls.undo.action,
            y: this.controls.redo.action,
            Z: this.controls.redo.action,
            l: this.controls.log.action,
        };
        this.handleKeyPress = this.handleKeyPress.bind(this);
        document.addEventListener('keydown', this.handleKeyPress);
    }
    get locale() {
        return getLocale();
    }
    set locale(tag) {
        try {
            setLocale(tag);
        }
        catch (_a) {
            // don't change locale if tag is invalid
        }
    }
    get editor() {
        var _a, _b;
        return (_b = (_a = this.editors[this.editorIndex]) === null || _a === void 0 ? void 0 : _a.tagName) !== null && _b !== void 0 ? _b : '';
    }
    get menu() {
        var _a;
        return ((_a = this.plugins.menu) === null || _a === void 0 ? void 0 : _a.map((plugin) => plugin.active
            ? {
                icon: plugin.icon,
                getName: () => {
                    var _a;
                    return ((_a = plugin.translations) === null || _a === void 0 ? void 0 : _a[this.locale]) || plugin.name;
                },
                isDisabled: () => { var _a; return (_a = (plugin.requireDoc && !this.docName)) !== null && _a !== void 0 ? _a : false; },
                tagName: pluginTag(plugin.src),
                action: () => {
                    var _a, _b;
                    return (_b = (_a = this.shadowRoot.querySelector(pluginTag(plugin.src))).run) === null || _b === void 0 ? void 0 : _b.call(_a);
                },
            }
            : undefined).filter(p => p !== undefined)).concat(__classPrivateFieldGet(this, _OpenSCD_actions, "f"));
    }
    get editors() {
        var _a;
        return (_a = this.plugins.editor) === null || _a === void 0 ? void 0 : _a.map((plugin) => plugin.active
            ? {
                icon: plugin.icon,
                getName: () => {
                    var _a;
                    return ((_a = plugin.translations) === null || _a === void 0 ? void 0 : _a[this.locale]) || plugin.name;
                },
                isDisabled: () => { var _a; return (_a = (plugin.requireDoc && !this.docName)) !== null && _a !== void 0 ? _a : false; },
                tagName: pluginTag(plugin.src),
            }
            : undefined).filter(p => p !== undefined);
    }
    handleKeyPress(e) {
        if (!e.ctrlKey)
            return;
        if (!Object.prototype.hasOwnProperty.call(this.hotkeys, e.key))
            return;
        this.hotkeys[e.key]();
        e.preventDefault();
    }
    renderLogEntry(entry) {
        return html ` <abbr title="${describe(entry)}">
      <mwc-list-item
        graphic="icon"
        ?activated=${this.history[this.last] === entry}
      >
        <span>${describe(entry)}</span>
        <mwc-icon slot="graphic">history</mwc-icon>
      </mwc-list-item></abbr
    >`;
    }
    renderHistory() {
        if (this.history.length > 0)
            return this.history.slice().reverse().map(this.renderLogEntry, this);
        return html `<mwc-list-item disabled graphic="icon">
      <span>${msg('Your editing history will be displayed here.')}</span>
      <mwc-icon slot="graphic">info</mwc-icon>
    </mwc-list-item>`;
    }
    pluginProperties(_plugin) {
        return {
            '.editCount': this.editCount,
            '.doc': this.doc,
            '.locale': this.locale,
            '.docName': this.docName,
            '.docs': this.docs,
        };
    }
    render() {
        return html `<mwc-drawer
        class="mdc-theme--surface"
        hasheader
        type="modal"
        id="menu"
      >
        <span slot="title">${msg('Menu')}</span>
        ${this.docName
            ? html `<span slot="subtitle">${this.docName}</span>`
            : ''}
        <mwc-list
          wrapFocus
          @action=${(e) => this.menu[e.detail.index].action()}
        >
          <li divider padded role="separator"></li>
          ${this.menu.map(renderMenuItem)}
        </mwc-list>
        <mwc-top-app-bar-fixed slot="appContent">
          ${renderActionItem(this.controls.menu, 'navigationIcon')}
          <div slot="title" id="title">${this.docName}</div>
          ${__classPrivateFieldGet(this, _OpenSCD_actions, "f").map(op => renderActionItem(op))}
          <mwc-tab-bar
            activeIndex=${this.editors.filter(p => !p.isDisabled()).length
            ? 0
            : -1}
            @MDCTabBar:activated=${({ detail: { index }, }) => {
            this.editorIndex = index;
        }}
          >
            ${this.editors.map(editor => editor.isDisabled()
            ? nothing
            : html `<mwc-tab
                    label="${editor.getName()}"
                    icon="${editor.icon}"
                  ></mwc-tab>`)}
          </mwc-tab-bar>
          <oscd-wizard-host .wizards=${this.plugins.wizard}>
            ${this.editor
            ? staticHtml `<${unsafeStatic(this.editor)} ${spread(this.pluginProperties(this.loadedPlugins.get(this.editor)))}></${unsafeStatic(this.editor)}>`
            : nothing}
          </oscd-wizard-host>
        </mwc-top-app-bar-fixed>
      </mwc-drawer>
      <mwc-dialog id="log" heading="${this.controls.log.getName()}">
        <mwc-list wrapFocus>${this.renderHistory()}</mwc-list>
        <mwc-button
          icon="undo"
          label="${msg('Undo')}"
          ?disabled=${!this.canUndo}
          @click=${this.undo}
          slot="secondaryAction"
        ></mwc-button>
        <mwc-button
          icon="redo"
          label="${msg('Redo')}"
          ?disabled=${!this.canRedo}
          @click=${this.redo}
          slot="secondaryAction"
        ></mwc-button>
        <mwc-button slot="primaryAction" dialogaction="close"
          >${msg('Close')}</mwc-button
        >
      </mwc-dialog>
      <aside>
        ${(this.plugins.menu || []).map(plugin => staticHtml `<${unsafeStatic(pluginTag(plugin.src))} ${spread(this.pluginProperties(plugin))}></${unsafeStatic(pluginTag(plugin.src))}>`)}
      </aside>`;
    }
};
_OpenSCD_actions = new WeakMap();
OpenSCD.styles = css `
    aside {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      overflow: hidden;
      margin: 0;
      padding: 0;
    }

    abbr {
      text-decoration: none;
    }

    mwc-top-app-bar-fixed {
      --mdc-theme-primary: var(
        --oscd-theme-app-bar-primary,
        var(--oscd-theme-primary)
      );

      --mdc-theme-text-disabled-on-light: rgba(255, 255, 255, 0.38);
    } /* hack to fix disabled icon buttons rendering black */
  `;
__decorate([
    query('#log')
], OpenSCD.prototype, "logUI", void 0);
__decorate([
    query('#menu')
], OpenSCD.prototype, "menuUI", void 0);
__decorate([
    property({ type: String, reflect: true })
], OpenSCD.prototype, "locale", null);
__decorate([
    state()
], OpenSCD.prototype, "editorIndex", void 0);
__decorate([
    state()
], OpenSCD.prototype, "editor", null);
__decorate([
    state()
], OpenSCD.prototype, "menu", null);
__decorate([
    state()
], OpenSCD.prototype, "editors", null);
OpenSCD = __decorate([
    customElement('open-scd'),
    localized()
], OpenSCD);
export { OpenSCD };
//# sourceMappingURL=open-scd.js.map