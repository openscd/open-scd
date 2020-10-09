import { html, property, query, TemplateResult } from 'lit-element';
import { translate, use } from 'lit-translate';

import '@material/mwc-dialog';
import '@material/mwc-formfield';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-switch';
import { Dialog } from '@material/mwc-dialog';
import { Select } from '@material/mwc-select';
import { Switch } from '@material/mwc-switch';

import { ifImplemented, LitElementConstructor, Mixin } from './foundation.js';
import { Language, languages } from './translations/loader.js';

type Settings = {
  language: Language;
  theme: 'light' | 'dark';
};
const defaults: Settings = { language: 'en', theme: 'light' };

export type SettingElement = Mixin<typeof Setting>;

export function Setting<TBase extends LitElementConstructor>(Base: TBase) {
  class SettingElement extends Base {
    @property()
    get settings(): Settings {
      return {
        language: this.getSetting('language'),
        theme: this.getSetting('theme'),
      };
    }
    @query('#settings')
    settingsUI!: Dialog;
    @query('#language')
    languageUI!: Select;
    @query('#dark')
    darkThemeUI!: Switch;

    private getSetting<T extends keyof Settings>(setting: T): Settings[T] {
      return (
        <Settings[T] | null>localStorage.getItem(setting) ?? defaults[setting]
      );
    }
    setSetting<T extends keyof Settings>(setting: T, value: Settings[T]): void {
      localStorage.setItem(setting, <string>(<unknown>value));
      this.requestUpdate();
    }

    onClosed(ae: CustomEvent<{ action: string } | null>): void {
      if (ae.detail?.action === 'reset') {
        localStorage.clear();
        this.requestUpdate('settings');
      }
      if (ae.detail?.action !== 'save') return;
      this.setSetting('language', <Language>this.languageUI.value);
      this.setSetting('theme', this.darkThemeUI.checked ? 'dark' : 'light');
    }

    updated(changedProperties: Map<string | number | symbol, unknown>): void {
      super.updated(changedProperties);
      if (changedProperties.get('settings') === this.settings) return;
      use(this.settings.language);
      this.languageUI.requestUpdate();
    }

    render(): TemplateResult {
      return html`${ifImplemented(super.render())}
        <mwc-dialog
          id="settings"
          heading="${translate('settings.name')}"
          @closed=${this.onClosed}
        >
          <form>
            <mwc-select
              naturalMenuWidth
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
          </form>
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
          <mwc-button unelevated slot="primaryAction" dialogAction="save">
            ${translate('save')}
          </mwc-button>
        </mwc-dialog>`;
    }
  }

  return SettingElement;
}
