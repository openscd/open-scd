import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { html, property, query, customElement, LitElement, css, } from '../../../_snowpack/pkg/lit-element.js';
import { get, registerTranslateConfig, use } from '../../../_snowpack/pkg/lit-translate.js';
import '../../../_snowpack/pkg/@material/mwc-button.js';
import '../../../_snowpack/pkg/@material/mwc-dialog.js';
import '../../../_snowpack/pkg/@material/mwc-formfield.js';
import '../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js';
import '../../../_snowpack/pkg/@material/mwc-select.js';
import '../../../_snowpack/pkg/@material/mwc-switch.js';
import { getTheme } from '../themes.js';
import { newLogEvent } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/history.js';
import { newLoadNsdocEvent } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/settings.js';
import { languages, loader } from '../translations/loader.js';
import '../WizardDivider.js';
import { iec6185072, iec6185073, iec6185074, iec6185081, } from '../foundation/nsd.js';
import { initializeNsdoc } from '../foundation/nsdoc.js';
export const defaults = {
    language: 'en',
    theme: 'light',
    mode: 'safe',
    showieds: 'off',
    'IEC 61850-7-2': undefined,
    'IEC 61850-7-3': undefined,
    'IEC 61850-7-4': undefined,
    'IEC 61850-8-1': undefined,
};
let OscdSettings = class OscdSettings extends LitElement {
    /** Current [[`Settings`]] in `localStorage`, default to [[`defaults`]]. */
    get settings() {
        return {
            language: this.getSetting('language'),
            theme: this.getSetting('theme'),
            mode: this.getSetting('mode'),
            showieds: this.getSetting('showieds'),
            'IEC 61850-7-2': this.getSetting('IEC 61850-7-2'),
            'IEC 61850-7-3': this.getSetting('IEC 61850-7-3'),
            'IEC 61850-7-4': this.getSetting('IEC 61850-7-4'),
            'IEC 61850-8-1': this.getSetting('IEC 61850-8-1'),
        };
    }
    /**
     * Get the versions of the current OpenSCD NSD files.
     * @returns Current version, revision and release for all current OpenSCD NSD files.
     */
    async nsdVersions() {
        const [nsd72, nsd73, nsd74, nsd81] = await Promise.all([
            iec6185072,
            iec6185073,
            iec6185074,
            iec6185081,
        ]);
        const [nsd72Ns, nsd73Ns, nsd74Ns, nsd81Ns] = [
            nsd72.querySelector('NS'),
            nsd73.querySelector('NS'),
            nsd74.querySelector('NS'),
            nsd81.querySelector('ServiceNS'),
        ];
        return {
            'IEC 61850-7-2': {
                version: nsd72Ns?.getAttribute('version') ?? undefined,
                revision: nsd72Ns?.getAttribute('revision') ?? undefined,
                release: nsd72Ns?.getAttribute('release') ?? undefined,
            },
            'IEC 61850-7-3': {
                version: nsd73Ns?.getAttribute('version') ?? undefined,
                revision: nsd73Ns?.getAttribute('revision') ?? undefined,
                release: nsd73Ns?.getAttribute('release') ?? undefined,
            },
            'IEC 61850-7-4': {
                version: nsd74Ns?.getAttribute('version') ?? undefined,
                revision: nsd74Ns?.getAttribute('revision') ?? undefined,
                release: nsd74Ns?.getAttribute('release') ?? undefined,
            },
            'IEC 61850-8-1': {
                version: nsd81Ns?.getAttribute('version') ?? undefined,
                revision: nsd81Ns?.getAttribute('revision') ?? undefined,
                release: nsd81Ns?.getAttribute('release') ?? undefined,
            },
        };
    }
    getSetting(setting) {
        return (localStorage.getItem(setting) ?? defaults[setting]);
    }
    /** Update the `value` of `setting`, storing to `localStorage`. */
    setSetting(setting, value) {
        localStorage.setItem(setting, value);
        this.shadowRoot
            ?.querySelector('wizard-dialog')
            ?.requestUpdate();
        this.requestUpdate();
    }
    /** Remove the `setting` in `localStorage`. */
    removeSetting(setting) {
        localStorage.removeItem(setting);
        this.shadowRoot
            ?.querySelector('wizard-dialog')
            ?.requestUpdate();
        this.requestUpdate();
        this.nsdoc = initializeNsdoc(); // update nsdoc
    }
    onClosing(ae) {
        if (ae.detail?.action === 'reset') {
            Object.keys(this.settings).forEach(item => localStorage.removeItem(item));
            this.requestUpdate('settings');
        }
        else if (ae.detail?.action === 'save') {
            this.setSetting('language', this.languageUI.value);
            this.setSetting('theme', this.darkThemeUI.checked ? 'dark' : 'light');
            this.setSetting('mode', this.modeUI.checked ? 'pro' : 'safe');
            this.setSetting('showieds', this.showiedsUI.checked ? 'on' : 'off');
            this.requestUpdate('settings');
        }
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('settings'))
            use(this.settings.language);
    }
    renderFileSelect() {
        return html `
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
        label="${get('settings.selectFileButton')}"
        id="selectFileButton"
        @click=${() => {
            const input = (this.shadowRoot.querySelector('#nsdoc-file'));
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
        this.nsdocFileUI.value = '';
        this.requestUpdate();
    }
    async onLoadNsdoc(event) {
        const nsdocElement = this.parseToXmlObject(event.detail.nsdoc).querySelector('NSDoc');
        const id = nsdocElement?.getAttribute('id');
        if (!id) {
            this.dispatchEvent(newLogEvent({
                kind: 'error',
                title: get('settings.invalidFileNoIdFound', {
                    filename: event.detail.filename,
                }),
            }));
            return;
        }
        const nsdVersions = await this.nsdVersions();
        const nsdVersion = nsdVersions[id];
        const nsdocVersion = {
            version: nsdocElement.getAttribute('version') ?? '',
            revision: nsdocElement.getAttribute('revision') ?? '',
            release: nsdocElement.getAttribute('release') ?? '',
        };
        if (!this.isEqual(nsdVersion, nsdocVersion)) {
            this.dispatchEvent(newLogEvent({
                kind: 'error',
                title: get('settings.invalidNsdocVersion', {
                    id: id,
                    filename: event.detail.filename,
                    nsdVersion: `${nsdVersion.version}${nsdVersion.revision}${nsdVersion.release}`,
                    nsdocVersion: `${nsdocVersion.version}${nsdocVersion.revision}${nsdocVersion.release}`,
                }),
            }));
            return;
        }
        this.setSetting(id, event.detail.nsdoc);
        this.nsdoc = initializeNsdoc(); // update nsdoc
    }
    /**
     * Check the equality of two NsdVersions.
     * @param versionA - First version to compare.
     * @param versionB - Second version to compare.
     * @returns Are they equal or not.
     */
    isEqual(versionA, versionB) {
        return (versionA.version == versionB.version &&
            versionA.revision == versionB.revision &&
            versionA.release == versionB.release);
    }
    /**
     * Render one .nsdoc item in the Settings wizard
     * @param key - The key of the nsdoc file in the settings.
     * @returns a .nsdoc item for the Settings wizard
     */
    renderNsdocItem(key) {
        const nsdSetting = this.settings[key];
        let nsdVersion;
        let nsdRevision;
        let nsdRelease;
        if (nsdSetting) {
            const nsdoc = this.parseToXmlObject(nsdSetting).querySelector('NSDoc');
            nsdVersion = nsdoc?.getAttribute('version');
            nsdRevision = nsdoc?.getAttribute('revision');
            nsdRelease = nsdoc?.getAttribute('release');
        }
        return html `<mwc-list-item
      id=${key}
      graphic="avatar"
      hasMeta
      twoline
      .disabled=${!nsdSetting}
    >
      <span>${key}</span>
      ${nsdSetting
            ? html `<span slot="secondary"
            >${nsdVersion}${nsdRevision}${nsdRelease}</span
          >`
            : html ``}
      ${nsdSetting
            ? html `<mwc-icon slot="graphic" style="color:green;">done</mwc-icon>`
            : html `<mwc-icon slot="graphic" style="color:red;">close</mwc-icon>`}
      ${nsdSetting
            ? html `<mwc-icon
            id="deleteNsdocItem"
            slot="meta"
            @click=${() => {
                this.removeSetting(key);
            }}
            >delete</mwc-icon
          >`
            : html ``}
    </mwc-list-item>`;
    }
    parseToXmlObject(text) {
        return new DOMParser().parseFromString(text, 'application/xml');
    }
    constructor() {
        super();
        /** Object containing all *.nsdoc files and a function extracting element's label form them*/
        this.nsdoc = initializeNsdoc();
        this.nsdUploadButton = true;
        registerTranslateConfig({ loader, empty: key => key });
        use(this.settings.language);
    }
    connectedCallback() {
        super.connectedCallback();
        if (this.host) {
            this.host.addEventListener('oscd-settings', (evt) => {
                evt.detail.show ? this.settingsUI.show() : this.settingsUI.close();
            });
            this.host.addEventListener('load-nsdoc', (evt) => this.onLoadNsdoc(evt));
        }
    }
    render() {
        return html `<mwc-dialog
        id="settings"
        heading="${get('settings.title')}"
        @closing=${this.onClosing}
      >
        <form>
          <mwc-select
            fixedMenuPosition
            id="language"
            icon="language"
            label="${get('settings.language')}"
          >
            ${Object.keys(languages).map(lang => html `<mwc-list-item
                  graphic="icon"
                  value="${lang}"
                  ?selected=${lang === this.settings.language}
                  >${get(`settings.languages.${lang}`)}</mwc-list-item
                >`)}
          </mwc-select>
          <mwc-formfield label="${get('settings.dark')}">
            <mwc-switch
              id="dark"
              ?checked=${this.settings.theme === 'dark'}
            ></mwc-switch>
          </mwc-formfield>
          <mwc-formfield label="${get('settings.mode')}">
            <mwc-switch
              id="mode"
              ?checked=${this.settings.mode === 'pro'}
            ></mwc-switch>
          </mwc-formfield>
          <mwc-formfield label="${get('settings.showieds')}">
            <mwc-switch
              id="showieds"
              ?checked=${this.settings.showieds === 'on'}
            ></mwc-switch>
          </mwc-formfield>
        </form>
        <wizard-divider></wizard-divider>
        ${this.nsdUploadButton
            ? html `<section id="shownsdbutton">
              <h3>${get('settings.loadNsdTranslations')}</h3>
              ${this.renderFileSelect()}
            </section>`
            : html ``}
        <mwc-list id="nsdocList">
          ${this.renderNsdocItem('IEC 61850-7-2')}
          ${this.renderNsdocItem('IEC 61850-7-3')}
          ${this.renderNsdocItem('IEC 61850-7-4')}
          ${this.renderNsdocItem('IEC 61850-8-1')}
        </mwc-list>
        <mwc-button slot="secondaryAction" dialogAction="close">
          ${get('cancel')}
        </mwc-button>
        <mwc-button
          style="--mdc-theme-primary: var(--mdc-theme-error)"
          slot="secondaryAction"
          dialogAction="reset"
        >
          ${get('reset')}
        </mwc-button>
        <mwc-button
          icon="save"
          trailingIcon
          slot="primaryAction"
          dialogAction="save"
        >
          ${get('save')}
        </mwc-button>
      </mwc-dialog>
      <slot></slot>
      ${getTheme(this.settings.theme)}`;
    }
};
OscdSettings.styles = css `
    mwc-top-app-bar-fixed {
      --mdc-theme-text-disabled-on-light: rgba(255, 255, 255, 0.38);
    } /* hack to fix disabled icon buttons rendering black */

    mwc-tab {
      background-color: var(--primary);
      --mdc-theme-primary: var(--mdc-theme-on-primary);
    }

    input[type='file'] {
      display: none;
    }

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

    mwc-linear-progress {
      position: fixed;
      --mdc-linear-progress-buffer-color: var(--primary);
      --mdc-theme-primary: var(--secondary);
      left: 0px;
      top: 0px;
      width: 100%;
      pointer-events: none;
      z-index: 1000;
    }

    tt {
      font-family: 'Roboto Mono', monospace;
      font-weight: 300;
    }

    .landing {
      position: absolute;
      text-align: center;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }

    .landing_icon:hover {
      box-shadow: 0 12px 17px 2px rgba(0, 0, 0, 0.14),
        0 5px 22px 4px rgba(0, 0, 0, 0.12), 0 7px 8px -4px rgba(0, 0, 0, 0.2);
    }

    .landing_icon {
      margin: 12px;
      border-radius: 16px;
      width: 160px;
      height: 140px;
      text-align: center;
      color: var(--mdc-theme-on-secondary);
      background: var(--secondary);
      --mdc-icon-button-size: 100px;
      --mdc-icon-size: 100px;
      --mdc-ripple-color: rgba(0, 0, 0, 0);
      box-shadow: rgb(0 0 0 / 14%) 0px 6px 10px 0px,
        rgb(0 0 0 / 12%) 0px 1px 18px 0px, rgb(0 0 0 / 20%) 0px 3px 5px -1px;
      transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    .landing_label {
      width: 160px;
      height: 50px;
      margin-top: 100px;
      margin-left: -30px;
      font-family: 'Roboto', sans-serif;
    }

    .plugin.menu {
      display: flex;
    }

    .plugin.validator {
      display: flex;
    }
  `;
__decorate([
    property()
], OscdSettings.prototype, "settings", null);
__decorate([
    property({ attribute: false })
], OscdSettings.prototype, "nsdoc", void 0);
__decorate([
    property({
        type: Object,
    })
], OscdSettings.prototype, "host", void 0);
__decorate([
    property({ type: Boolean })
], OscdSettings.prototype, "nsdUploadButton", void 0);
__decorate([
    query('#settings')
], OscdSettings.prototype, "settingsUI", void 0);
__decorate([
    query('#language')
], OscdSettings.prototype, "languageUI", void 0);
__decorate([
    query('#dark')
], OscdSettings.prototype, "darkThemeUI", void 0);
__decorate([
    query('#mode')
], OscdSettings.prototype, "modeUI", void 0);
__decorate([
    query('#showieds')
], OscdSettings.prototype, "showiedsUI", void 0);
__decorate([
    query('#nsdoc-file')
], OscdSettings.prototype, "nsdocFileUI", void 0);
OscdSettings = __decorate([
    customElement('oscd-settings')
], OscdSettings);
export { OscdSettings };
//# sourceMappingURL=Settings.js.map