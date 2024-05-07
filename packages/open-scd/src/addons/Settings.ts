import {
  html,
  property,
  query,
  TemplateResult,
  customElement,
  LitElement,
  css,
} from 'lit-element';
import { get, registerTranslateConfig, use } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-formfield';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-switch';

import { Dialog } from '@material/mwc-dialog';
import { Select } from '@material/mwc-select';
import { Switch } from '@material/mwc-switch';

import { getTheme } from '../themes.js';

import { newLogEvent } from '@openscd/core/foundation/deprecated/history.js';
import { 
  Settings, 
  SettingsUIEvent, 
  Language,
  NsdVersions,
  NsdVersion,
  LoadNsdocEvent,
  newLoadNsdocEvent
} from '@openscd/core/foundation/deprecated/settings.js';
import { languages, loader } from '../translations/loader.js';

import '../WizardDivider.js';
import { WizardDialog } from '../wizard-dialog.js';

import {
  iec6185072,
  iec6185073,
  iec6185074,
  iec6185081,
} from '../foundation/nsd.js';
import { initializeNsdoc, Nsdoc } from '../foundation/nsdoc.js';

export const defaults: Settings = {
  language: 'en',
  theme: 'light',
  mode: 'safe',
  showieds: 'off',
  'IEC 61850-7-2': undefined,
  'IEC 61850-7-3': undefined,
  'IEC 61850-7-4': undefined,
  'IEC 61850-8-1': undefined,
};

@customElement('oscd-settings')
export class OscdSettings extends LitElement {
  /** Current [[`Settings`]] in `localStorage`, default to [[`defaults`]]. */
  @property()
  get settings(): Settings {
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
  /** Object containing all *.nsdoc files and a function extracting element's label form them*/
  @property({ attribute: false })
  nsdoc: Nsdoc = initializeNsdoc();

  @property({
    type: Object,
  })
  host!: HTMLElement;

  @property({ type: Boolean })
  nsdUploadButton = true;

  /**
   * Get the versions of the current OpenSCD NSD files.
   * @returns Current version, revision and release for all current OpenSCD NSD files.
   */
  private async nsdVersions(): Promise<NsdVersions> {
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

  @query('#settings')
  settingsUI!: Dialog;
  @query('#language')
  languageUI!: Select;
  @query('#dark')
  darkThemeUI!: Switch;
  @query('#mode')
  modeUI!: Switch;
  @query('#showieds')
  showiedsUI!: Switch;

  @query('#nsdoc-file')
  private nsdocFileUI!: HTMLInputElement;

  private getSetting<T extends keyof Settings>(setting: T): Settings[T] {
    return (
      <Settings[T] | null>localStorage.getItem(setting) ?? defaults[setting]
    );
  }

  /** Update the `value` of `setting`, storing to `localStorage`. */
  setSetting<T extends keyof Settings>(setting: T, value: Settings[T]): void {
    localStorage.setItem(setting, <string>(<unknown>value));
    this.shadowRoot
      ?.querySelector<WizardDialog>('wizard-dialog')
      ?.requestUpdate();
    this.requestUpdate();
  }

  /** Remove the `setting` in `localStorage`. */
  removeSetting<T extends keyof Settings>(setting: T): void {
    localStorage.removeItem(setting);
    this.shadowRoot
      ?.querySelector<WizardDialog>('wizard-dialog')
      ?.requestUpdate();
    this.requestUpdate();

    this.nsdoc = initializeNsdoc(); // update nsdoc
  }

  private onClosing(ae: CustomEvent<{ action: string } | null>): void {
    if (ae.detail?.action === 'reset') {
      Object.keys(this.settings).forEach(item => localStorage.removeItem(item));
      this.requestUpdate('settings');
    } else if (ae.detail?.action === 'save') {
      this.setSetting('language', <Language>this.languageUI.value);
      this.setSetting('theme', this.darkThemeUI.checked ? 'dark' : 'light');
      this.setSetting('mode', this.modeUI.checked ? 'pro' : 'safe');
      this.setSetting('showieds', this.showiedsUI.checked ? 'on' : 'off');
      this.requestUpdate('settings');
    }
  }

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('settings')) use(this.settings.language);
  }

  private renderFileSelect(): TemplateResult {
    return html`
      <input
        id="nsdoc-file"
        accept=".nsdoc"
        type="file"
        hidden
        required
        multiple
        @change="${(evt: Event) => this.uploadNsdocFile(evt)}}"
      />
      <mwc-button
        label="${get('settings.selectFileButton')}"
        id="selectFileButton"
        @click=${() => {
          const input = <HTMLInputElement | null>(
            this.shadowRoot!.querySelector('#nsdoc-file')
          );
          input?.click();
        }}
      >
      </mwc-button>
    `;
  }

  private async uploadNsdocFile(evt: Event): Promise<void> {
    const files = Array.from(
      (<HTMLInputElement | null>evt.target)?.files ?? []
    );

    if (files.length == 0) return;
    for (const file of files) {
      const text = await file.text();
      this.dispatchEvent(newLoadNsdocEvent(text, file.name));
    }

    this.nsdocFileUI.value = '';
    this.requestUpdate();
  }

  private async onLoadNsdoc(event: LoadNsdocEvent) {
    const nsdocElement = this.parseToXmlObject(
      event.detail.nsdoc
    ).querySelector('NSDoc');

    const id = nsdocElement?.getAttribute('id');
    if (!id) {
      this.dispatchEvent(
        newLogEvent({
          kind: 'error',
          title: get('settings.invalidFileNoIdFound', {
            filename: event.detail.filename,
          }),
        })
      );
      return;
    }

    const nsdVersions = await this.nsdVersions();
    const nsdVersion = nsdVersions[id as keyof NsdVersions];
    const nsdocVersion = {
      version: nsdocElement!.getAttribute('version') ?? '',
      revision: nsdocElement!.getAttribute('revision') ?? '',
      release: nsdocElement!.getAttribute('release') ?? '',
    };

    if (!this.isEqual(nsdVersion, nsdocVersion)) {
      this.dispatchEvent(
        newLogEvent({
          kind: 'error',
          title: get('settings.invalidNsdocVersion', {
            id: id,
            filename: event.detail.filename,
            nsdVersion: `${nsdVersion.version}${nsdVersion.revision}${nsdVersion.release}`,
            nsdocVersion: `${nsdocVersion.version}${nsdocVersion.revision}${nsdocVersion.release}`,
          }),
        })
      );
      return;
    }

    this.setSetting(id as keyof Settings, event.detail.nsdoc);
    this.nsdoc = initializeNsdoc(); // update nsdoc
  }

  /**
   * Check the equality of two NsdVersions.
   * @param versionA - First version to compare.
   * @param versionB - Second version to compare.
   * @returns Are they equal or not.
   */
  private isEqual(versionA: NsdVersion, versionB: NsdVersion): boolean {
    return (
      versionA.version == versionB.version &&
      versionA.revision == versionB.revision &&
      versionA.release == versionB.release
    );
  }

  /**
   * Render one .nsdoc item in the Settings wizard
   * @param key - The key of the nsdoc file in the settings.
   * @returns a .nsdoc item for the Settings wizard
   */
  private renderNsdocItem<T extends keyof Settings>(key: T): TemplateResult {
    const nsdSetting = this.settings[key];
    let nsdVersion: string | undefined | null;
    let nsdRevision: string | undefined | null;
    let nsdRelease: string | undefined | null;

    if (nsdSetting) {
      const nsdoc = this.parseToXmlObject(nsdSetting)!.querySelector('NSDoc');
      nsdVersion = nsdoc?.getAttribute('version');
      nsdRevision = nsdoc?.getAttribute('revision');
      nsdRelease = nsdoc?.getAttribute('release');
    }

    return html`<mwc-list-item
      id=${key}
      graphic="avatar"
      hasMeta
      twoline
      .disabled=${!nsdSetting}
    >
      <span>${key}</span>
      ${nsdSetting
        ? html`<span slot="secondary"
            >${nsdVersion}${nsdRevision}${nsdRelease}</span
          >`
        : html``}
      ${nsdSetting
        ? html`<mwc-icon slot="graphic" style="color:green;">done</mwc-icon>`
        : html`<mwc-icon slot="graphic" style="color:red;">close</mwc-icon>`}
      ${nsdSetting
        ? html`<mwc-icon
            id="deleteNsdocItem"
            slot="meta"
            @click=${() => {
              this.removeSetting(key);
            }}
            >delete</mwc-icon
          >`
        : html``}
    </mwc-list-item>`;
  }

  private parseToXmlObject(text: string): XMLDocument {
    return new DOMParser().parseFromString(text, 'application/xml');
  }

  constructor() {
    super();

    registerTranslateConfig({ loader, empty: key => key });
    use(this.settings.language);
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.host) {
      this.host!.addEventListener('oscd-settings', (evt: SettingsUIEvent) => {
        evt.detail.show ? this.settingsUI.show() : this.settingsUI.close();
      });
      (<any>this.host).addEventListener('load-nsdoc', (evt: LoadNsdocEvent) =>
        this.onLoadNsdoc(evt)
      );
    }
  }

  render(): TemplateResult {
    return html`<mwc-dialog
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
            ${Object.keys(languages).map(
              lang =>
                html`<mwc-list-item
                  graphic="icon"
                  value="${lang}"
                  ?selected=${lang === this.settings.language}
                  >${get(`settings.languages.${lang}`)}</mwc-list-item
                >`
            )}
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
          ? html`<section id="shownsdbutton">
              <h3>${get('settings.loadNsdTranslations')}</h3>
              ${this.renderFileSelect()}
            </section>`
          : html``}
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

  static styles = css`
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
}
