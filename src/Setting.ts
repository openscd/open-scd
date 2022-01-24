import { html, property, query, TemplateResult } from 'lit-element';
import { registerTranslateConfig, translate, use } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-formfield';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-switch';

import { Dialog } from '@material/mwc-dialog';
import { Select } from '@material/mwc-select';
import { Switch } from '@material/mwc-switch';

import { ifImplemented, LitElementConstructor, Mixin } from './foundation.js';
import { Language, languages, loader } from './translations/loader.js';

import './WizardDivider.js';

export type SettingsRecord = {
  language: Language;
  theme: 'light' | 'dark';
  mode: 'safe' | 'pro';
  showieds: 'on' | 'off';
  'IEC 61850-7-2': string | undefined;
  'IEC 61850-7-3': string | undefined;
  'IEC 61850-7-4': string | undefined;
  'IEC 61850-8-1': string | undefined;
};

export function Settings() {
  return {
    /** Current [[`CompasSettings`]] in `localStorage`, default to [[`defaults`]]. */
    get settings(): SettingsRecord {
      return {
        language: this.getSetting('language'),
        theme: this.getSetting('theme'),
        mode: this.getSetting('mode'),
        showieds: this.getSetting('showieds'),
        'IEC 61850-7-2': this.getSetting('IEC 61850-7-2'),
        'IEC 61850-7-3': this.getSetting('IEC 61850-7-3'),
        'IEC 61850-7-4': this.getSetting('IEC 61850-7-4'),
        'IEC 61850-8-1': this.getSetting('IEC 61850-8-1')
      };
    },

    get defaultSettings(): SettingsRecord {
      return {
        language: 'en',
        theme: 'light',
        mode: 'safe',
        showieds: 'off',
        'IEC 61850-7-2': undefined,
        'IEC 61850-7-3': undefined,
        'IEC 61850-7-4': undefined,
        'IEC 61850-8-1': undefined
      }
    },

    /** Update the `value` of `setting`, storing to `localStorage`. */
    setSetting<T extends keyof SettingsRecord>(setting: T, value: SettingsRecord[T]): void {
      localStorage.setItem(setting, <string>(<unknown>value));
    },

    /** Update the `value` of `setting`, storing to `localStorage`. */
    removeSetting<T extends keyof SettingsRecord>(setting: T): void {
      localStorage.removeItem(setting);
    },

    getSetting<T extends keyof SettingsRecord>(setting: T): SettingsRecord[T] {
      return (
        <SettingsRecord[T] | null>localStorage.getItem(setting) ?? this.defaultSettings[setting]
      );
    }
  }
}

/** Mixin that saves [[`Settings`]] to `localStorage`, reflecting them in the
 * `settings` property, setting them through `setSetting(setting, value)`. */
export type SettingElement = Mixin<typeof Setting>;

export function Setting<TBase extends LitElementConstructor>(Base: TBase) {
  class SettingElement extends Base {
    /** Current [[`Settings`]] in `localStorage`, default to [[`defaults`]]. */
    @property()
    get settings(): SettingsRecord {
      return Settings().settings;
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

    private onClosing(ae: CustomEvent<{ action: string } | null>): void {
      if (ae.detail?.action === 'reset') {
        Object.keys(this.settings).forEach(item =>
          localStorage.removeItem(item)
        );
        this.requestUpdate('settings');
      } else if (ae.detail?.action === 'save') {
        Settings().setSetting('language', <Language>this.languageUI.value);
        Settings().setSetting('theme', this.darkThemeUI.checked ? 'dark' : 'light');
        Settings().setSetting('mode', this.modeUI.checked ? 'pro' : 'safe');
        Settings().setSetting('showieds', this.showiedsUI.checked ? 'on' : 'off');
        this.requestUpdate('settings');
      }
    }

    updated(changedProperties: Map<string | number | symbol, unknown>): void {
      super.updated(changedProperties);
      if (changedProperties.has('settings')) use(this.settings.language);
    }

    private renderFileSelect(): TemplateResult {
      return html `
        <input id="nsdoc-file" accept=".nsdoc" type="file" hidden required multiple
          @change=${(evt: Event) => this.loadNsdocFile(evt)}}>
        <mwc-button label="${translate('settings.selectFileButton')}"
                    id="selectFileButton"
                    @click=${() => {
                      const input = <HTMLInputElement | null>this.shadowRoot!.querySelector("#nsdoc-file");
                      input?.click();
                    }}>
        </mwc-button>
      `;
    }

    private async loadNsdocFile(evt: Event): Promise<void> {
      const files = Array.from(
        (<HTMLInputElement | null>evt.target)?.files ?? []
      );
      
      if (files.length == 0) return;
      files.forEach(async file => {
        const text = await file.text();
        const id = this.parseToXmlObject(text).querySelector('NSDoc')?.getAttribute('id');
        if (!id) return;
  
        Settings().setSetting(id as keyof SettingsRecord, text);
      })

      this.nsdocFileUI.value = '';
      this.requestUpdate();
    }

    /**
     * Render one .nsdoc item in the Settings wizard
     * @param key - The key of the nsdoc file in the settings.
     * @returns a .nsdoc item for the Settings wizard
     */
    private renderNsdocItem<T extends keyof SettingsRecord>(key: T): TemplateResult {
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

      return html`<mwc-list-item id=${key} graphic="avatar" hasMeta twoline .disabled=${!nsdSetting}>
        <span>${key}</span>
        ${nsdSetting ? html`<span slot="secondary">${nsdVersion}${nsdRevision}${nsdRelease}</span>` :
          html``}
        ${nsdSetting ? html`<mwc-icon slot="graphic" style="color:green;">done</mwc-icon>` :
          html`<mwc-icon slot="graphic" style="color:red;">close</mwc-icon>`}
        ${nsdSetting ? html`<mwc-icon id="deleteNsdocItem" slot="meta" @click=${() => {
          Settings().removeSetting(key);
          this.requestUpdate();
        }}>delete</mwc-icon>` :
          html``}
      </mwc-list-item>`;
    }

    private parseToXmlObject(text: string): XMLDocument {
      return new DOMParser().parseFromString(text, 'application/xml');
    }

    constructor(...params: any[]) {
      super(...params);

      registerTranslateConfig({ loader, empty: key => key });
      use(this.settings.language);
    }

    render(): TemplateResult {
      return html`${ifImplemented(super.render())}
        <mwc-dialog
          id="settings"
          heading="${translate('settings.title')}"
          @closing=${this.onClosing}
        >
          <form>
            <mwc-select
              fixedMenuPosition
              id="language"
              icon="language"
              label="${translate('settings.language')}"
            >
              ${Object.keys(languages).map(
                lang =>
                  html`<mwc-list-item
                    graphic="icon"
                    value="${lang}"
                    ?selected=${lang === this.settings.language}
                    >${translate(`settings.languages.${lang}`)}</mwc-list-item
                  >`
              )}
            </mwc-select>
            <mwc-formfield label="${translate('settings.dark')}">
              <mwc-switch
                id="dark"
                ?checked=${this.settings.theme === 'dark'}
              ></mwc-switch>
            </mwc-formfield>
            <mwc-formfield label="${translate('settings.mode')}">
              <mwc-switch
                id="mode"
                ?checked=${this.settings.mode === 'pro'}
              ></mwc-switch>
            </mwc-formfield>
            <mwc-formfield label="${translate('settings.showieds')}">
              <mwc-switch
                id="showieds"
                ?checked=${this.settings.showieds === 'on'}
              ></mwc-switch>
            </mwc-formfield>
          </form>
          <wizard-divider></wizard-divider>
          <section>
            <h3>${translate('settings.loadNsdTranslations')}</h3>
            ${this.renderFileSelect()}
          </section>
          <mwc-list id="nsdocList">
            ${this.renderNsdocItem('IEC 61850-7-2')}
            ${this.renderNsdocItem('IEC 61850-7-3')}
            ${this.renderNsdocItem('IEC 61850-7-4')}
            ${this.renderNsdocItem('IEC 61850-8-1')}
          </mwc-list>
          <mwc-button slot="secondaryAction" dialogAction="close">
            ${translate('cancel')}
          </mwc-button>
          <mwc-button
            style="--mdc-theme-primary: var(--mdc-theme-error)"
            slot="secondaryAction"
            dialogAction="reset"
          >
            ${translate('reset')}
          </mwc-button>
          <mwc-button
            icon="save"
            trailingIcon
            slot="primaryAction"
            dialogAction="save"
          >
            ${translate('save')}
          </mwc-button>
        </mwc-dialog>`;
    }
  }

  return SettingElement;
}
