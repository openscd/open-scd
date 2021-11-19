import { property, query, TemplateResult } from 'lit-element';
import { registerTranslateConfig, translate, use } from 'lit-translate';

import { Switch } from '@material/mwc-switch';

import {
  Button,
  Dialog,
  html,
  ifImplemented,
  LitElementConstructor,
  Mixin,
  Select,
} from './foundation.js';
import { Language, languages, loader } from './translations/loader.js';
import { WizardDialog } from './wizard-dialog.js';

export type Settings = {
  language: Language;
  theme: 'light' | 'dark';
  mode: 'safe' | 'pro';
  showieds: 'on' | 'off';
};
export const defaults: Settings = {
  language: 'en',
  theme: 'light',
  mode: 'safe',
  showieds: 'off',
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

    constructor(...params: any[]) {
      super(...params);

      registerTranslateConfig({ loader, empty: key => key });
      use(this.settings.language);
    }

    render(): TemplateResult {
      return html`${ifImplemented(super.render())}
        <${Dialog}
          id="settings"
          heading="${translate('settings.title')}"
          @closing=${this.onClosing}
        >
          <form>
            <${Select}
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
            </${Select}>
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
          <${Button} slot="secondaryAction" dialogAction="close">
            ${translate('cancel')}
          </${Button}>
          <${Button}
            style="--mdc-theme-primary: var(--mdc-theme-error)"
            slot="secondaryAction"
            dialogAction="reset"
          >
            ${translate('reset')}
          </${Button}>
          <${Button}
            icon="save"
            trailingIcon
            slot="primaryAction"
            dialogAction="save"
          >
            ${translate('save')}
          </${Button}>
        </${Dialog}>`;
    }
  }

  return SettingElement;
}
