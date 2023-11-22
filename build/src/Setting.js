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
import {html, property, query} from "../_snowpack/pkg/lit-element.js";
import {get, registerTranslateConfig, translate, use} from "../_snowpack/pkg/lit-translate.js";
import "../_snowpack/pkg/@material/mwc-button.js";
import "../_snowpack/pkg/@material/mwc-dialog.js";
import "../_snowpack/pkg/@material/mwc-formfield.js";
import "../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../_snowpack/pkg/@material/mwc-select.js";
import "../_snowpack/pkg/@material/mwc-switch.js";
import {
  ifImplemented,
  newLogEvent
} from "./foundation.js";
import {languages, loader} from "./translations/loader.js";
import "./WizardDivider.js";
import {
  iec6185072,
  iec6185073,
  iec6185074,
  iec6185081
} from "./validators/templates/foundation.js";
import {initializeNsdoc} from "./foundation/nsdoc.js";
export const defaults = {
  language: "en",
  theme: "light",
  mode: "safe",
  showieds: "off",
  "IEC 61850-7-2": void 0,
  "IEC 61850-7-3": void 0,
  "IEC 61850-7-4": void 0,
  "IEC 61850-8-1": void 0
};
export function newLoadNsdocEvent(nsdoc, filename) {
  return new CustomEvent("load-nsdoc", {
    bubbles: true,
    composed: true,
    detail: {nsdoc, filename}
  });
}
export function Setting(Base) {
  class SettingElement extends Base {
    constructor(...params) {
      super(...params);
      this.nsdoc = initializeNsdoc();
      registerTranslateConfig({loader, empty: (key) => key});
      use(this.settings.language);
      this.addEventListener("load-nsdoc", this.onLoadNsdoc);
    }
    get settings() {
      return {
        language: this.getSetting("language"),
        theme: this.getSetting("theme"),
        mode: this.getSetting("mode"),
        showieds: this.getSetting("showieds"),
        "IEC 61850-7-2": this.getSetting("IEC 61850-7-2"),
        "IEC 61850-7-3": this.getSetting("IEC 61850-7-3"),
        "IEC 61850-7-4": this.getSetting("IEC 61850-7-4"),
        "IEC 61850-8-1": this.getSetting("IEC 61850-8-1")
      };
    }
    async nsdVersions() {
      const [nsd72, nsd73, nsd74, nsd81] = await Promise.all([
        iec6185072,
        iec6185073,
        iec6185074,
        iec6185081
      ]);
      const [nsd72Ns, nsd73Ns, nsd74Ns, nsd81Ns] = [
        nsd72.querySelector("NS"),
        nsd73.querySelector("NS"),
        nsd74.querySelector("NS"),
        nsd81.querySelector("ServiceNS")
      ];
      return {
        "IEC 61850-7-2": {
          version: nsd72Ns?.getAttribute("version") ?? void 0,
          revision: nsd72Ns?.getAttribute("revision") ?? void 0,
          release: nsd72Ns?.getAttribute("release") ?? void 0
        },
        "IEC 61850-7-3": {
          version: nsd73Ns?.getAttribute("version") ?? void 0,
          revision: nsd73Ns?.getAttribute("revision") ?? void 0,
          release: nsd73Ns?.getAttribute("release") ?? void 0
        },
        "IEC 61850-7-4": {
          version: nsd74Ns?.getAttribute("version") ?? void 0,
          revision: nsd74Ns?.getAttribute("revision") ?? void 0,
          release: nsd74Ns?.getAttribute("release") ?? void 0
        },
        "IEC 61850-8-1": {
          version: nsd81Ns?.getAttribute("version") ?? void 0,
          revision: nsd81Ns?.getAttribute("revision") ?? void 0,
          release: nsd81Ns?.getAttribute("release") ?? void 0
        }
      };
    }
    getSetting(setting) {
      return localStorage.getItem(setting) ?? defaults[setting];
    }
    setSetting(setting, value) {
      localStorage.setItem(setting, value);
      this.shadowRoot?.querySelector("wizard-dialog")?.requestUpdate();
      this.requestUpdate();
    }
    removeSetting(setting) {
      localStorage.removeItem(setting);
      this.shadowRoot?.querySelector("wizard-dialog")?.requestUpdate();
      this.requestUpdate();
      this.nsdoc = initializeNsdoc();
    }
    onClosing(ae) {
      if (ae.detail?.action === "reset") {
        Object.keys(this.settings).forEach((item) => localStorage.removeItem(item));
        this.requestUpdate("settings");
      } else if (ae.detail?.action === "save") {
        this.setSetting("language", this.languageUI.value);
        this.setSetting("theme", this.darkThemeUI.checked ? "dark" : "light");
        this.setSetting("mode", this.modeUI.checked ? "pro" : "safe");
        this.setSetting("showieds", this.showiedsUI.checked ? "on" : "off");
        this.requestUpdate("settings");
      }
    }
    updated(changedProperties) {
      super.updated(changedProperties);
      if (changedProperties.has("settings"))
        use(this.settings.language);
    }
    renderFileSelect() {
      return html`
        <input
          id="nsdoc-file"
          accept=".nsdoc"
          type="file"
          hidden
          required
          multiple
          @change="${(evt) => this.uploadNsdocFile(evt)}}"
        />
        <mwc-button
          label="${translate("settings.selectFileButton")}"
          id="selectFileButton"
          @click=${() => {
        const input = this.shadowRoot.querySelector("#nsdoc-file");
        input?.click();
      }}
        >
        </mwc-button>
      `;
    }
    async uploadNsdocFile(evt) {
      const files = Array.from(evt.target?.files ?? []);
      if (files.length == 0)
        return;
      for (const file of files) {
        const text = await file.text();
        this.dispatchEvent(newLoadNsdocEvent(text, file.name));
      }
      this.nsdocFileUI.value = "";
      this.requestUpdate();
    }
    async onLoadNsdoc(event) {
      const nsdocElement = this.parseToXmlObject(event.detail.nsdoc).querySelector("NSDoc");
      const id = nsdocElement?.getAttribute("id");
      if (!id) {
        this.dispatchEvent(newLogEvent({
          kind: "error",
          title: get("settings.invalidFileNoIdFound", {
            filename: event.detail.filename
          })
        }));
        return;
      }
      const nsdVersions = await this.nsdVersions();
      const nsdVersion = nsdVersions[id];
      const nsdocVersion = {
        version: nsdocElement.getAttribute("version") ?? "",
        revision: nsdocElement.getAttribute("revision") ?? "",
        release: nsdocElement.getAttribute("release") ?? ""
      };
      if (!this.isEqual(nsdVersion, nsdocVersion)) {
        this.dispatchEvent(newLogEvent({
          kind: "error",
          title: get("settings.invalidNsdocVersion", {
            id,
            filename: event.detail.filename,
            nsdVersion: `${nsdVersion.version}${nsdVersion.revision}${nsdVersion.release}`,
            nsdocVersion: `${nsdocVersion.version}${nsdocVersion.revision}${nsdocVersion.release}`
          })
        }));
        return;
      }
      this.setSetting(id, event.detail.nsdoc);
      this.nsdoc = initializeNsdoc();
    }
    isEqual(versionA, versionB) {
      return versionA.version == versionB.version && versionA.revision == versionB.revision && versionA.release == versionB.release;
    }
    renderNsdocItem(key) {
      const nsdSetting = this.settings[key];
      let nsdVersion;
      let nsdRevision;
      let nsdRelease;
      if (nsdSetting) {
        const nsdoc = this.parseToXmlObject(nsdSetting).querySelector("NSDoc");
        nsdVersion = nsdoc?.getAttribute("version");
        nsdRevision = nsdoc?.getAttribute("revision");
        nsdRelease = nsdoc?.getAttribute("release");
      }
      return html`<mwc-list-item
        id=${key}
        graphic="avatar"
        hasMeta
        twoline
        .disabled=${!nsdSetting}
      >
        <span>${key}</span>
        ${nsdSetting ? html`<span slot="secondary"
              >${nsdVersion}${nsdRevision}${nsdRelease}</span
            >` : html``}
        ${nsdSetting ? html`<mwc-icon slot="graphic" style="color:green;">done</mwc-icon>` : html`<mwc-icon slot="graphic" style="color:red;">close</mwc-icon>`}
        ${nsdSetting ? html`<mwc-icon
              id="deleteNsdocItem"
              slot="meta"
              @click=${() => {
        this.removeSetting(key);
      }}
              >delete</mwc-icon
            >` : html``}
      </mwc-list-item>`;
    }
    parseToXmlObject(text) {
      return new DOMParser().parseFromString(text, "application/xml");
    }
    render() {
      return html`${ifImplemented(super.render())}
        <mwc-dialog
          id="settings"
          heading="${translate("settings.title")}"
          @closing=${this.onClosing}
        >
          <form>
            <mwc-select
              fixedMenuPosition
              id="language"
              icon="language"
              label="${translate("settings.language")}"
            >
              ${Object.keys(languages).map((lang) => html`<mwc-list-item
                    graphic="icon"
                    value="${lang}"
                    ?selected=${lang === this.settings.language}
                    >${translate(`settings.languages.${lang}`)}</mwc-list-item
                  >`)}
            </mwc-select>
            <mwc-formfield label="${translate("settings.dark")}">
              <mwc-switch
                id="dark"
                ?checked=${this.settings.theme === "dark"}
              ></mwc-switch>
            </mwc-formfield>
            <mwc-formfield label="${translate("settings.mode")}">
              <mwc-switch
                id="mode"
                ?checked=${this.settings.mode === "pro"}
              ></mwc-switch>
            </mwc-formfield>
            <mwc-formfield label="${translate("settings.showieds")}">
              <mwc-switch
                id="showieds"
                ?checked=${this.settings.showieds === "on"}
              ></mwc-switch>
            </mwc-formfield>
          </form>
          <wizard-divider></wizard-divider>
          <section>
            <h3>${translate("settings.loadNsdTranslations")}</h3>
            ${this.renderFileSelect()}
          </section>
          <mwc-list id="nsdocList">
            ${this.renderNsdocItem("IEC 61850-7-2")}
            ${this.renderNsdocItem("IEC 61850-7-3")}
            ${this.renderNsdocItem("IEC 61850-7-4")}
            ${this.renderNsdocItem("IEC 61850-8-1")}
          </mwc-list>
          <mwc-button slot="secondaryAction" dialogAction="close">
            ${translate("cancel")}
          </mwc-button>
          <mwc-button
            style="--mdc-theme-primary: var(--mdc-theme-error)"
            slot="secondaryAction"
            dialogAction="reset"
          >
            ${translate("reset")}
          </mwc-button>
          <mwc-button
            icon="save"
            trailingIcon
            slot="primaryAction"
            dialogAction="save"
          >
            ${translate("save")}
          </mwc-button>
        </mwc-dialog>`;
    }
  }
  __decorate([
    property()
  ], SettingElement.prototype, "settings", 1);
  __decorate([
    property({attribute: false})
  ], SettingElement.prototype, "nsdoc", 2);
  __decorate([
    query("#settings")
  ], SettingElement.prototype, "settingsUI", 2);
  __decorate([
    query("#language")
  ], SettingElement.prototype, "languageUI", 2);
  __decorate([
    query("#dark")
  ], SettingElement.prototype, "darkThemeUI", 2);
  __decorate([
    query("#mode")
  ], SettingElement.prototype, "modeUI", 2);
  __decorate([
    query("#showieds")
  ], SettingElement.prototype, "showiedsUI", 2);
  __decorate([
    query("#nsdoc-file")
  ], SettingElement.prototype, "nsdocFileUI", 2);
  return SettingElement;
}
