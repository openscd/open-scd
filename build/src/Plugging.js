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
import {html, query} from "../_snowpack/pkg/lit-element.js";
import {classMap} from "../_snowpack/pkg/lit-html/directives/class-map.js";
import {translate} from "../_snowpack/pkg/lit-translate.js";
import "../_snowpack/pkg/@material/mwc-button.js";
import "../_snowpack/pkg/@material/mwc-dialog.js";
import "../_snowpack/pkg/@material/mwc-formfield.js";
import "../_snowpack/pkg/@material/mwc-icon.js";
import "../_snowpack/pkg/@material/mwc-list.js";
import "../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js";
import "../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../_snowpack/pkg/@material/mwc-list/mwc-radio-list-item.js";
import "../_snowpack/pkg/@material/mwc-select.js";
import "../_snowpack/pkg/@material/mwc-switch.js";
import "../_snowpack/pkg/@material/mwc-textfield.js";
import {ifImplemented} from "./foundation.js";
import {officialPlugins} from "../public/js/plugins.js";
const pluginTags = new Map();
function pluginTag(uri) {
  if (!pluginTags.has(uri)) {
    let h1 = 3735928559, h2 = 1103547991;
    for (let i = 0, ch; i < uri.length; i++) {
      ch = uri.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
    h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
    pluginTags.set(uri, "oscd-plugin" + ((h2 >>> 0).toString(16).padStart(8, "0") + (h1 >>> 0).toString(16).padStart(8, "0")));
  }
  return pluginTags.get(uri);
}
function staticTagHtml(oldStrings, ...oldArgs) {
  const args = [...oldArgs];
  const firstArg = args.shift();
  const lastArg = args.pop();
  if (firstArg !== lastArg)
    throw new Error(`Opening tag <${firstArg}> does not match closing tag </${lastArg}>.`);
  const strings = [...oldStrings];
  const firstString = strings.shift();
  const secondString = strings.shift();
  const lastString = strings.pop();
  const penultimateString = strings.pop();
  strings.unshift(`${firstString}${firstArg}${secondString}`);
  strings.push(`${penultimateString}${lastArg}${lastString}`);
  return html(strings, ...args);
}
const menuPosition = ["top", "middle", "bottom"];
function withoutContent(plugin) {
  return {...plugin, content: void 0};
}
function storePlugins(plugins) {
  localStorage.setItem("plugins", JSON.stringify(plugins.map(withoutContent)));
}
export const pluginIcons = {
  editor: "tab",
  menu: "play_circle",
  validator: "rule_folder",
  top: "play_circle",
  middle: "play_circle",
  bottom: "play_circle"
};
function resetPlugins() {
  storePlugins(officialPlugins.map((plugin) => {
    return {
      src: plugin.src,
      installed: plugin.default ?? false,
      official: true
    };
  }));
}
const menuOrder = [
  "editor",
  "top",
  "validator",
  "middle",
  "bottom"
];
function menuCompare(a, b) {
  if (a.kind === b.kind && a.position === b.position)
    return 0;
  const earlier = menuOrder.find((kind) => [a.kind, b.kind, a.position, b.position].includes(kind));
  return [a.kind, a.position].includes(earlier) ? -1 : 1;
}
function compareNeedsDoc(a, b) {
  if (a.requireDoc === b.requireDoc)
    return 0;
  return a.requireDoc ? 1 : -1;
}
const loadedPlugins = new Set();
export function Plugging(Base) {
  class PluggingElement extends Base {
    get editors() {
      return this.plugins.filter((plugin) => plugin.installed && plugin.kind === "editor");
    }
    get validators() {
      return this.plugins.filter((plugin) => plugin.installed && plugin.kind === "validator");
    }
    get menuEntries() {
      return this.plugins.filter((plugin) => plugin.installed && plugin.kind === "menu");
    }
    get topMenu() {
      return this.menuEntries.filter((plugin) => plugin.position === "top");
    }
    get middleMenu() {
      return this.menuEntries.filter((plugin) => plugin.position === "middle");
    }
    get bottomMenu() {
      return this.menuEntries.filter((plugin) => plugin.position === "bottom");
    }
    get plugins() {
      return this.storedPlugins.map((plugin) => {
        if (!plugin.official)
          return plugin;
        const officialPlugin = officialPlugins.find((needle) => needle.src === plugin.src);
        return {
          ...officialPlugin,
          ...plugin
        };
      }).sort(compareNeedsDoc).sort(menuCompare);
    }
    get storedPlugins() {
      return JSON.parse(localStorage.getItem("plugins") ?? "[]", (key, value) => value.src && value.installed ? this.addContent(value) : value);
    }
    setPlugins(indices) {
      const newPlugins = this.plugins.map((plugin, index) => {
        return {...plugin, installed: indices.has(index)};
      });
      storePlugins(newPlugins);
      this.requestUpdate();
    }
    updatePlugins() {
      const stored = this.storedPlugins;
      const officialStored = stored.filter((p) => p.official);
      const newOfficial = officialPlugins.filter((p) => !officialStored.find((o) => o.src === p.src)).map((plugin) => {
        return {
          src: plugin.src,
          installed: plugin.default ?? false,
          official: true
        };
      });
      const oldOfficial = officialStored.filter((p) => !officialPlugins.find((o) => p.src === o.src));
      const newPlugins = stored.filter((p) => !oldOfficial.find((o) => p.src === o.src));
      newOfficial.map((p) => newPlugins.push(p));
      storePlugins(newPlugins);
    }
    addExternalPlugin(plugin) {
      if (this.storedPlugins.some((p) => p.src === plugin.src))
        return;
      const newPlugins = this.storedPlugins;
      newPlugins.push(plugin);
      storePlugins(newPlugins);
    }
    addContent(plugin) {
      const tag = pluginTag(plugin.src);
      if (!loadedPlugins.has(tag)) {
        loadedPlugins.add(tag);
        import(plugin.src).then((mod) => customElements.define(tag, mod.default));
      }
      return {
        ...plugin,
        content: staticTagHtml`<${tag}
            .doc=${this.doc}
            .docName=${this.docName}
            .docId=${this.docId}
            .pluginId=${plugin.src}
            .nsdoc=${this.nsdoc}
            class="${classMap({
          plugin: true,
          menu: plugin.kind === "menu",
          validator: plugin.kind === "validator",
          editor: plugin.kind === "editor"
        })}"
          ></${tag}>`
      };
    }
    handleAddPlugin() {
      const pluginSrcInput = this.pluginDownloadUI.querySelector("#pluginSrcInput");
      const pluginNameInput = this.pluginDownloadUI.querySelector("#pluginNameInput");
      const pluginKindList = this.pluginDownloadUI.querySelector("#pluginKindList");
      const requireDoc = this.pluginDownloadUI.querySelector("#requireDoc");
      const positionList = this.pluginDownloadUI.querySelector("#menuPosition");
      if (!(pluginSrcInput.checkValidity() && pluginNameInput.checkValidity() && pluginKindList.selected && requireDoc && positionList.selected))
        return;
      this.addExternalPlugin({
        src: pluginSrcInput.value,
        name: pluginNameInput.value,
        kind: pluginKindList.selected.value,
        requireDoc: requireDoc.checked,
        position: positionList.value,
        installed: true
      });
      this.requestUpdate();
      this.pluginUI.requestUpdate();
      this.pluginDownloadUI.close();
    }
    constructor(...args) {
      super(...args);
      this.updatePlugins();
      this.requestUpdate();
    }
    renderDownloadUI() {
      return html`
        <mwc-dialog
          id="pluginAdd"
          heading="${translate("plugins.add.heading")}"
        >
          <div style="display: flex; flex-direction: column; row-gap: 8px;">
            <p style="color:var(--mdc-theme-error);">
              ${translate("plugins.add.warning")}
            </p>
            <mwc-textfield
              label="${translate("plugins.add.name")}"
              helper="${translate("plugins.add.nameHelper")}"
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
                >${translate("plugins.editor")}<mwc-icon slot="meta"
                  >${pluginIcons["editor"]}</mwc-icon
                ></mwc-radio-list-item
              >
              <mwc-radio-list-item id="menu" value="menu" hasMeta left
                >${translate("plugins.menu")}<mwc-icon slot="meta"
                  >${pluginIcons["menu"]}</mwc-icon
                ></mwc-radio-list-item
              >
              <div id="menudetails">
                <mwc-formfield
                  id="enabledefault"
                  label="${translate("plugins.requireDoc")}"
                >
                  <mwc-switch id="requireDoc" checked></mwc-switch>
                </mwc-formfield>
                <mwc-select id="menuPosition" value="middle" fixedMenuPosition
                  >${Object.values(menuPosition).map((menutype) => html`<mwc-list-item value="${menutype}"
                        >${translate("plugins." + menutype)}</mwc-list-item
                      >`)}</mwc-select
                >
              </div>
              <style>
                #menudetails {
                  display: none;
                  padding: 20px;
                  padding-left: 50px;
                }
                #menu[selected] ~ #menudetails {
                  display: grid;
                }
                #enabledefault {
                  padding-bottom: 20px;
                }
                #menuPosition {
                  max-width: 250px;
                }
              </style>
              <mwc-radio-list-item id="validator" value="validator" hasMeta left
                >${translate("plugins.validator")}<mwc-icon slot="meta"
                  >${pluginIcons["validator"]}</mwc-icon
                ></mwc-radio-list-item
              >
            </mwc-list>
            <mwc-textfield
              label="${translate("plugins.add.src")}"
              helper="${translate("plugins.add.srcHelper")}"
              placeholder="http://example.com/plugin.js"
              type="url"
              required
              id="pluginSrcInput"
            ></mwc-textfield>
          </div>
          <mwc-button
            slot="secondaryAction"
            dialogAction="close"
            label="${translate("cancel")}"
          ></mwc-button>
          <mwc-button
            slot="primaryAction"
            icon="add"
            label="${translate("add")}"
            trailingIcon
            @click=${() => this.handleAddPlugin()}
          ></mwc-button>
        </mwc-dialog>
      `;
    }
    renderPluginKind(type, plugins) {
      return html`
        ${plugins.map((plugin) => html`<mwc-check-list-item
              class="${plugin.official ? "official" : "external"}"
              value="${plugin.src}"
              ?selected=${plugin.installed}
              hasMeta
              left
            >
              <mwc-icon slot="meta"
                >${plugin.icon || pluginIcons[plugin.kind]}</mwc-icon
              >
              ${plugin.name}
            </mwc-check-list-item>`)}
      `;
    }
    renderPluginUI() {
      return html`
        <mwc-dialog
          stacked
          id="pluginManager"
          heading="${translate("plugins.heading")}"
        >
          <mwc-list
            id="pluginList"
            multi
            @selected=${(e) => this.setPlugins(e.detail.index)}
          >
            <mwc-list-item graphic="avatar" noninteractive
              ><strong>${translate(`plugins.editor`)}</strong
              ><mwc-icon slot="graphic" class="inverted"
                >${pluginIcons["editor"]}</mwc-icon
              ></mwc-list-item
            >
            <li divider role="separator"></li>
            ${this.renderPluginKind("editor", this.plugins.filter((p) => p.kind === "editor"))}
            <mwc-list-item graphic="avatar" noninteractive
              ><strong>${translate(`plugins.menu`)}</strong
              ><mwc-icon slot="graphic" class="inverted"
                ><strong>${pluginIcons["menu"]}</strong></mwc-icon
              ></mwc-list-item
            >
            <li divider role="separator"></li>
            ${this.renderPluginKind("top", this.plugins.filter((p) => p.kind === "menu" && p.position === "top"))}
            <li divider role="separator" inset></li>
            ${this.renderPluginKind("validator", this.plugins.filter((p) => p.kind === "validator"))}
            <li divider role="separator" inset></li>
            ${this.renderPluginKind("middle", this.plugins.filter((p) => p.kind === "menu" && p.position === "middle"))}
            <li divider role="separator" inset></li>
            ${this.renderPluginKind("bottom", this.plugins.filter((p) => p.kind === "menu" && p.position === "bottom"))}
          </mwc-list>
          <mwc-button
            slot="secondaryAction"
            icon="refresh"
            label="${translate("reset")}"
            @click=${async () => {
        resetPlugins();
        this.requestUpdate();
      }}
            style="--mdc-theme-primary: var(--mdc-theme-error)"
          >
          </mwc-button>
          <mwc-button
            slot="secondaryAction"
            icon=""
            label="${translate("close")}"
            dialogAction="close"
          ></mwc-button>
          <mwc-button
            outlined
            trailingIcon
            slot="primaryAction"
            icon="library_add"
            label="${translate("plugins.add.heading")}&hellip;"
            @click=${() => this.pluginDownloadUI.show()}
          >
          </mwc-button>
        </mwc-dialog>
      `;
    }
    render() {
      return html`
        ${ifImplemented(super.render())} ${this.renderPluginUI()}
        ${this.renderDownloadUI()}
      `;
    }
  }
  __decorate([
    query("#pluginManager")
  ], PluggingElement.prototype, "pluginUI", 2);
  __decorate([
    query("#pluginList")
  ], PluggingElement.prototype, "pluginList", 2);
  __decorate([
    query("#pluginAdd")
  ], PluggingElement.prototype, "pluginDownloadUI", 2);
  return PluggingElement;
}
