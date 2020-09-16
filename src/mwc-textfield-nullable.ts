import {
  customElement,
  html,
  TemplateResult,
  query,
  property,
} from 'lit-element';

import '@material/mwc-switch';
import { Switch } from '@material/mwc-switch';
import { TextField } from '@material/mwc-textfield';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-textfield-nullable': TextFieldNullable;
  }
}

@customElement('mwc-textfield-nullable')
export class TextFieldNullable extends TextField {
  @property({ type: String })
  defaultValue = '';
  private isNull = false;
  @property({ type: Boolean })
  get null(): boolean {
    return this.isNull;
  }
  set null(value: boolean) {
    if (value != this.isNull) {
      this.toggleValue();
    }
  }

  @query('mwc-switch') switch?: Switch;

  nulled = {
    value: this.value || this.defaultValue,
    helper: this.helper,
    helperPersistent: this.helperPersistent,
    disabled: this.disabled,
  };

  toggleValue(): void {
    this.isNull = !this.isNull;

    if (this.isNull) {
      this.nulled.value = this.value;
      this.value = '';

      this.nulled.helper = this.helper;
      this.helper = this.defaultValue
        ? 'Default: ' + this.defaultValue
        : 'No default value';
      this.nulled.helperPersistent = this.helperPersistent;
      this.helperPersistent = true;

      this.nulled.disabled = this.disabled;
      this.disabled = true;
    } else {
      this.value = this.nulled.value;
      this.helper = this.nulled.helper;
      this.helperPersistent = this.nulled.helperPersistent;
      this.disabled = this.nulled.disabled;
    }
    this.requestUpdate();
  }

  render(): TemplateResult {
    return html`
      <div style="display: flex; flex-direction: row;align-items: center;">
        <div>${super.render()}</div>
        <mwc-switch
          style="margin-left: 24px;"
          .checked=${!null}
          @change=${() => {
            this.toggleValue();
          }}
        ></mwc-switch>
      </div>
    `;
  }
}
