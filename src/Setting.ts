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
import { WizardDialog } from './wizard-dialog.js';

import './Divider.js';
import './NsdItem.js';

export type Settings = {
  language: Language;
  theme: 'light' | 'dark';
  mode: 'safe' | 'pro';
  showieds: 'on' | 'off';
  'IEC 61850-7-2': Document | undefined;
  'IEC 61850-7-3': Document | undefined;
  'IEC 61850-7-4': Document | undefined;
  'IEC 61850-8-1': Document | undefined;
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
        'IEC 61850-8-1': this.getSetting('IEC 61850-8-1')
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

    private renderFileSelect(): TemplateResult {
      return html `
        <input id="nsd-file" accept=".nsdoc" type="file" hidden required
          @change=${(evt: Event) => this.updateNsdSettings(evt)}>
        <mwc-button label="${translate('settings.selectFileButton')}"
                    @click=${() => {
                      const input = <HTMLInputElement | null>this.shadowRoot!.querySelector("#nsd-file");
                      console.log(input)
                      input?.click();
                    }}>
        </mwc-button>
      `;
    }

    private async updateNsdSettings(evt: Event): Promise<void> {
      const file = (<HTMLInputElement | null>evt.target)?.files?.item(0) ?? false;
      if (!file) return;
  
      const text = await file.text();
      const doc = new DOMParser().parseFromString(text, 'application/xml');
      const id = doc.querySelector('NSDoc')?.getAttribute('id');
      if (!id) return;

      switch (id) {
        case 'IEC 61850-7-2': {
          this.setSetting('IEC 61850-7-2', doc);
          break;
        }
        case 'IEC 61850-7-3': {
          this.setSetting('IEC 61850-7-3', doc);
          break;
        }
        case 'IEC 61850-7-4': {
          this.setSetting('IEC 61850-7-4', doc);
          break;
        }
        case 'IEC 61850-8-1': {
          this.setSetting('IEC 61850-8-1', doc);
          break;
        }
      }
      this.requestUpdate();
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
          <openscd-divider></openscd-divider>
          <section>
            <h3>${translate('settings.loadNsdTranslations')}</h3>
            ${this.renderFileSelect()}
          </section>
          <mwc-list>
            <nsd-item
              nsdId="61850-7-2"
              .nsdDocument=${this.settings['IEC 61850-7-2']}
            ></nsd-item>
            <nsd-item
              nsdId="61850-7-3"
              .nsdDocument=${this.settings['IEC 61850-7-3']}
            ></nsd-item>
            <nsd-item
              nsdId="61850-7-4"
              .nsdDocument=${this.settings['IEC 61850-7-4']}
            ></nsd-item>
            <nsd-item
              nsdId="61850-8-1"
              .nsdDocument=${this.settings['IEC 61850-8-1']}
            ></nsd-item>
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
