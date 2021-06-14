import {html, property, query, TemplateResult} from 'lit-element';
import {translate} from 'lit-translate';

import {Dialog} from '@material/mwc-dialog';

import {ifImplemented, LitElementConstructor, Mixin} from '../foundation.js';
import {TextField} from "@material/mwc-textfield";

export type CompasSettings = {
  sclDataServiceUrl: string;
};
export const defaults: CompasSettings = { sclDataServiceUrl: 'http://localhost:9090/compas-scl-data-service' };

export function CompasSetting() {
  return {
    /** Current [[`CompasSettings`]] in `localStorage`, default to [[`defaults`]]. */
    get compasSettings(): CompasSettings {
      return {
        sclDataServiceUrl: this.getCompasSetting('sclDataServiceUrl'),
      };
    },

    /** Update the `value` of `setting`, storing to `localStorage`. */
    setCompasSetting<T extends keyof CompasSettings>(setting: T, value: CompasSettings[T]): void {
      localStorage.setItem(setting, <string>(<unknown>value));
    },

    getCompasSetting<T extends keyof CompasSettings>(setting: T): CompasSettings[T] {
      return (
        <CompasSettings[T] | null>localStorage.getItem(setting) ?? defaults[setting]
      );
    }
  }
}

/** Mixin that saves [[`CompasSettings`]] to `localStorage`, reflecting them in the
 * `settings` property, setting them through `setSetting(setting, value)`. */
export type CompasSettingElement = Mixin<typeof CompasSettingUI>;

export function CompasSettingUI<TBase extends LitElementConstructor>(Base: TBase) {
  class CompasSettingElement extends Base {
    @property()
    get compasSettings() {
      return CompasSetting().compasSettings;
    }

    @query('#compasSettings')
    compasSettingsUI!: Dialog;
    @query('#sclDataServiceUrl')
    sclDataServiceUrlUI!: TextField;

    private onCompasClosing(ae: CustomEvent<{ action: string } | null>): void {
      if (ae.detail?.action === 'reset') {
        Object.keys(this.compasSettings).forEach(item =>
          localStorage.removeItem(item)
        );
        this.requestUpdate('compasSettings');
      } else if (ae.detail?.action === 'save') {
        CompasSetting().setCompasSetting('sclDataServiceUrl', this.sclDataServiceUrlUI.value);
        this.requestUpdate('compasSettings');
      }
    }

    render(): TemplateResult {
      return html`${ifImplemented(super.render())}
        <style>
          .styled {
            --mdc-dialog-min-width: 450px;
          }
        </style>

        <mwc-dialog
          id="compasSettings"
          heading="${translate('compas.settings.name')}"
          @closing=${this.onCompasClosing}
          class="styled"
        >
          <form>
            <mwc-textfield dialogInitialFocus id="sclDataServiceUrl"
                           label="${translate('compas.settings.sclDataServiceUrl')}"
                           value="${this.compasSettings.sclDataServiceUrl}" required>
            </mwc-textfield>
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

  return CompasSettingElement;
}
