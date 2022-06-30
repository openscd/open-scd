import { html, property, query, TemplateResult } from 'lit-element';
import { get, registerTranslateConfig, translate, use } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-formfield';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-switch';

import { Dialog } from '@material/mwc-dialog';
import { Select } from '@material/mwc-select';
import { Switch } from '@material/mwc-switch';

import {
  ifImplemented,
  LitElementConstructor,
  Mixin,
  newLogEvent,
} from './foundation.js';
import { Language, languages, loader } from './translations/loader.js';

import './WizardDivider.js';
import { WizardDialog } from './wizard-dialog.js';

import {
  iec6185072,
  iec6185073,
  iec6185074,
  iec6185081,
} from './validators/templates/foundation.js';
import { initializeNsdoc, Nsdoc } from './foundation/nsdoc.js';

export type Settings = {
  language: Language;
  theme: 'light' | 'dark';
  mode: 'safe' | 'pro';
  showieds: 'on' | 'off';
  'IEC 61850-7-2': string | undefined;
  'IEC 61850-7-3': string | undefined;
  'IEC 61850-7-4': string | undefined;
  'IEC 61850-8-1': string | undefined;
};
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

type NsdVersion = {
  version: string | undefined;
  revision: string | undefined;
  release: string | undefined;
};

type NsdVersions = {
  'IEC 61850-7-2': NsdVersion;
  'IEC 61850-7-3': NsdVersion;
  'IEC 61850-7-4': NsdVersion;
  'IEC 61850-8-1': NsdVersion;
};

/** Represents a document to be opened. */
export interface LoadNsdocDetail {
  nsdoc: string;
  filename: string;
}
export type LoadNsdocEvent = CustomEvent<LoadNsdocDetail>;
export function newLoadNsdocEvent(
  nsdoc: string,
  filename: string
): LoadNsdocEvent {
  return new CustomEvent<LoadNsdocDetail>('load-nsdoc', {
    bubbles: true,
    composed: true,
    detail: { nsdoc, filename },
  });
}

/** Mixin that saves [[`Settings`]] to `localStorage`, reflecting them in the
 * `settings` property, setting them through `setSetting(setting, value)`. */
export type SettingElement = Mixin<typeof Setting>;

export function Setting<TBase extends LitElementConstructor>(Base: TBase) {
  class SettingElement extends Base {
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
        Object.keys(this.settings).forEach(item =>
          localStorage.removeItem(item)
        );
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

    constructor(...params: any[]) {
      super(...params);

      registerTranslateConfig({ loader, empty: key => key });
      use(this.settings.language);

      (<any>this).addEventListener('load-nsdoc', this.onLoadNsdoc);
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
