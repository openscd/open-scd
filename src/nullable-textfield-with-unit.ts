import {
  TemplateResult,
  customElement,
  html,
  property,
  query,
} from 'lit-element';

import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import '@material/mwc-switch';
import { Select } from '@material/mwc-select';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { Switch } from '@material/mwc-switch';
import { TextField } from '@material/mwc-textfield';

declare global {
  interface HTMLElementTagNameMap {
    'nullable-textfield-with-unit': NullableTextFieldWithUnit;
  }
}

@customElement('nullable-textfield-with-unit')
export class NullableTextFieldWithUnit extends TextField {
  @property({ type: Boolean })
  nullable = false;
  @property({ type: Array })
  multipliers = [''];
  private multiplierIndex = 0;
  @property({ type: String })
  get multiplier(): string {
    if (this.unit == '') return '';
    return this.multipliers[this.multiplierIndex] ?? this.multipliers[0] ?? '';
  }
  set multiplier(value: string) {
    const index = this.multipliers.indexOf(value);
    if (index >= 0) this.multiplierIndex = index;
  }
  @property({ type: String })
  unit = '';
  @property({ type: String })
  defaultValue = '';
  private isNull = false;
  @property({ type: Boolean })
  get null(): boolean {
    return this.nullable && this.isNull;
  }
  set null(value: boolean) {
    if (!this.nullable || value == this.isNull) return;
    this.isNull = value;
    if (this.null) this.disable();
    else this.enable();
  }
  @property()
  get maybeValue(): string | null {
    return this.null ? null : this.value;
  }
  set maybeValue(value: string | null) {
    if (value === null) this.null = true;
    else {
      this.null = false;
      this.value = value;
    }
  }

  @query('mwc-switch') nullSwitch?: Switch;
  @query('mwc-select')
  multiplierSelect?: Select;

  // TextField state before disable()
  private nulled = {
    value: this.value || this.defaultValue,
    helper: this.helper,
    helperPersistent: this.helperPersistent,
  };

  private selectMultiplier(se: SingleSelectedEvent): void {
    this.multiplierIndex = se.detail.index;
  }

  private enable(): void {
    this.restoreNulled();
    this.disabled = false;

    if (this.multiplierSelect) this.multiplierSelect.disabled = false;
  }

  private disable(): void {
    this.storeNulled();
    this.value = '';
    this.helper = this.defaultValue
      ? 'Default: ' + this.defaultValue
      : 'No default value';
    this.helperPersistent = true;
    this.disabled = true;

    if (this.multiplierSelect) this.multiplierSelect.disabled = true;
  }

  restoreNulled(): void {
    this.value = this.nulled.value;
    this.helper = this.nulled.helper;
    this.helperPersistent = this.nulled.helperPersistent;
  }

  storeNulled(): void {
    this.nulled.value = this.value;
    this.nulled.helper = this.helper;
    this.nulled.helperPersistent = this.helperPersistent;
  }

  async firstUpdated(): Promise<void> {
    await super.firstUpdated();
    this.storeNulled();
  }

  render(): TemplateResult {
    return html`
      <div style="display: flex; flex-direction: row;">
        <div style="flex:auto;">${super.render()}</div>
        ${this.renderUnitSelector()}
        <div
          style="display:flex;
            align-items:center;
            height:56px;"
        >
          ${this.renderSwitch()}
        </div>
      </div>
    `;
  }

  renderUnitSelector(): TemplateResult {
    if (this.multipliers.length && this.unit)
      return html`<mwc-select @selected=${this.selectMultiplier}>
        ${this.renderMulplierList()}
      </mwc-select>`;
    else return html``;
  }

  renderMulplierList(): TemplateResult {
    return html`${this.multipliers.map(
      multiplier =>
        html`<mwc-list-item ?selected=${multiplier == this.multiplier}
          >${multiplier}${this.unit}</mwc-list-item
        >`
    )}`;
  }

  renderSwitch(): TemplateResult {
    if (this.nullable) {
      return html`<mwc-switch
        style="margin-left: 24px;"
        ?checked=${!this.null}
        @change=${() => {
          this.null = !this.nullSwitch!.checked;
        }}
      ></mwc-switch>`;
    }
    return html``;
  }
}
