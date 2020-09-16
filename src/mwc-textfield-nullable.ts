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

  getValue(): string | null {
    return this.null ? null : this.value;
  }

  @query('mwc-switch') switch?: Switch;

  nulled = {
    value: this.value || this.defaultValue,
    helper: this.helper,
    helperPersistent: this.helperPersistent,
    disabled: this.disabled,
  };

  restoreNulled(): void {
    this.value = this.nulled.value;
    this.helper = this.nulled.helper;
    this.helperPersistent = this.nulled.helperPersistent;
    this.disabled = this.nulled.disabled;
  }

  storeNulled(): void {
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
  }

  toggleValue(): void {
    this.isNull = !this.isNull;

    if (this.isNull) this.storeNulled();
    else this.restoreNulled();
    this.requestUpdate();
  }

  constructor() {
    super();
    if (this.isNull) this.storeNulled();
    else this.restoreNulled();
  }

  render(): TemplateResult {
    return html`
      <div style="display: flex; flex-direction: row;align-items: center;">
        <div>${super.render()}</div>
        <mwc-switch
          style="margin-left: 24px;"
          .checked=${!this.null}
          @change=${() => {
            this.toggleValue();
          }}
        ></mwc-switch>
      </div>
    `;
  }
}
