import {css, customElement, html, LitElement, property, TemplateResult} from 'lit-element';
import {translate} from 'lit-translate';

import {newWizardEvent} from '../foundation.js';
import {TextFieldBase} from "@material/mwc-textfield/mwc-textfield-base";
import {getOpenScdElement} from "./foundation.js";

export type CompasSettingsRecord = {
  sclDataServiceUrl: string;
  cimMappingServiceUrl: string;
  sclAutoAlignmentServiceUrl: string;
};

export function CompasSettings() {
  return {
    /** Current [[`CompasSettings`]] in `localStorage`, default to [[`defaults`]]. */
    get compasSettings(): CompasSettingsRecord {
      return {
        sclDataServiceUrl: this.getCompasSetting('sclDataServiceUrl'),
        cimMappingServiceUrl: this.getCompasSetting('cimMappingServiceUrl'),
        sclAutoAlignmentServiceUrl: this.getCompasSetting('sclAutoAlignmentServiceUrl'),
      };
    },

    get defaultSettings(): CompasSettingsRecord {
      return {
        sclDataServiceUrl: '/compas-scl-data-service',
        cimMappingServiceUrl: '/compas-cim-mapping',
        sclAutoAlignmentServiceUrl: '/compas-scl-auto-alignment'
      }
    },

    /** Update the `value` of `setting`, storing to `localStorage`. */
    setCompasSetting<T extends keyof CompasSettingsRecord>(setting: T, value: CompasSettingsRecord[T]): void {
      localStorage.setItem(setting, <string>(<unknown>value));
    },

    getCompasSetting<T extends keyof CompasSettingsRecord>(setting: T): CompasSettingsRecord[T] {
      return (
        <CompasSettingsRecord[T] | null>localStorage.getItem(setting) ?? this.defaultSettings[setting]
      );
    }
  }
}

@customElement('compas-settings')
export class CompasSettingsElement extends LitElement {
  @property()
  get compasSettings(): CompasSettingsRecord {
    return CompasSettings().compasSettings;
  }

  getSclDataServiceUrlField(): TextFieldBase {
    return <TextFieldBase>this.shadowRoot!.querySelector('mwc-textfield[id="sclDataServiceUrl"]');
  }

  getCimMappingServiceUrlField(): TextFieldBase {
    return <TextFieldBase>this.shadowRoot!.querySelector('mwc-textfield[id="cimMappingServiceUrl"]');
  }

  getSclAutoAlignmentServiceUrlField(): TextFieldBase {
    return <TextFieldBase>this.shadowRoot!.querySelector('mwc-textfield[id="sclAutoAlignmentServiceUrl"]');
  }

  valid(): boolean {
    return this.getSclDataServiceUrlField().checkValidity()
      && this.getCimMappingServiceUrlField().checkValidity()
      && this.getSclAutoAlignmentServiceUrlField().checkValidity();
  }

  save(): boolean {
    if (!this.valid()) {
      return false;
    }

    // Update settings from TextField.
    CompasSettings().setCompasSetting('sclDataServiceUrl', this.getSclDataServiceUrlField().value);
    CompasSettings().setCompasSetting('cimMappingServiceUrl', this.getCimMappingServiceUrlField().value);
    CompasSettings().setCompasSetting('sclAutoAlignmentServiceUrl', this.getSclAutoAlignmentServiceUrlField().value);
    return true;
  }

  reset(): boolean {
    Object.keys(this.compasSettings).forEach(item =>
      localStorage.removeItem(item)
    );
    return true;
  }

  close(): void {
    // Close the Save Dialog.
    const openScd = getOpenScdElement();
    openScd.dispatchEvent(newWizardEvent());
  }

  render(): TemplateResult {
    return html`
      <mwc-textfield dialogInitialFocus id="sclDataServiceUrl"
                     label="${translate('compas.settings.sclDataServiceUrl')}"
                     value="${this.compasSettings.sclDataServiceUrl}" required>
      </mwc-textfield>
      <mwc-textfield id="cimMappingServiceUrl"
                     label="${translate('compas.settings.cimMappingServiceUrl')}"
                     value="${this.compasSettings.cimMappingServiceUrl}" required>
      </mwc-textfield>
      <mwc-textfield id="sclAutoAlignmentServiceUrl"
                     label="${translate('compas.settings.sclAutoAlignmentServiceUrl')}"
                     value="${this.compasSettings.sclAutoAlignmentServiceUrl}" required>
      </mwc-textfield>

      <mwc-button @click=${() => {
                    if (this.reset()) {
                      this.close();
                    }
                  }}>
          ${translate('reset')}
      </mwc-button>`;
  }

  static styles = css`
    :host {
      width: 20vw;
    }

    mwc-textfield {
      margin: 10px;
      width: 100%;
    }

    mwc-button {
      --mdc-theme-primary: var(--mdc-theme-error)
    }
  `
}

