import {
  customElement,
  html,
  TemplateResult,
  query,
  property,
} from 'lit-element';

import '@material/mwc-switch';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import { Switch } from '@material/mwc-switch';
import { TextField } from '@material/mwc-textfield';
import { Select } from '@material/mwc-select';

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
  multiplierArray = [] as string[];
  @property({ type: String })
  preSelectedMultiplier = '';
  @property({ type: String })
  unit = '';
  @property({ type: String })
  defaultValue = '';
  private isNull = false;
  @property()
  get Value(): string | null {
    return this.isNull ? null : super.value;
  }
  set Value(attributeValue: string | null) {
    this.initialSetup(attributeValue);
  }

  @query('mwc-switch') switch?: Switch;
  @query('#voltageUnitMultiplier')
  voltageLevelUnitMultiplier!: Select;

  //JSON Object to save the state before disable
  nulled = {
    value: super.value || this.defaultValue,
    helper: super.helper,
    helperPersistent: super.helperPersistent,
    initialized: false,
  };

  getSelectedMultiplier(): string {
    if (this.voltageLevelUnitMultiplier)
      return this.voltageLevelUnitMultiplier.selected!.innerText.replace(
        this.unit,
        ''
      );
    return '';
  }

  initialSetup(attributeValue: string | null): void {
    this.value = attributeValue == null ? '' : attributeValue;
    this.isNull = attributeValue == null ? true : false;
    this.isNull ? this.disableAttribute() : this.enableAttribute();
  }

  enableAttribute(): void {
    this.restoreNulled();
    super.disabled = false;

    if (this.voltageLevelUnitMultiplier)
      this.voltageLevelUnitMultiplier.disabled = false;
  }

  disableAttribute(): void {
    this.storeNulled();
    super.value = '';
    super.helper = this.defaultValue
      ? 'Default: ' + this.defaultValue
      : 'No default value';
    this.helperPersistent = true;
    this.disabled = true;

    if (this.voltageLevelUnitMultiplier)
      this.voltageLevelUnitMultiplier.disabled = true;
  }

  restoreNulled(): void {
    if (this.nulled.initialized) {
      super.value = this.nulled.value;
      super.helper = this.nulled.helper;
      super.helperPersistent = this.nulled.helperPersistent;
    }
    this.nulled.initialized = true;
  }

  storeNulled(): void {
    this.nulled.value = super.value;
    this.nulled.helper = super.helper;
    this.nulled.helperPersistent = super.helperPersistent;
    this.nulled.initialized = true;
  }

  toggleValue(): void {
    this.isNull = !this.isNull;
    this.isNull ? this.disableAttribute() : this.enableAttribute();
  }

  constructor() {
    super();
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
    if (this.multiplierArray.length && this.unit) {
      return html`<mwc-select id="voltageUnitMultiplier">
        ${this.renderMulplierList()}
      </mwc-select>`;
    }
    return html``;
  }

  renderMulplierList(): TemplateResult {
    return html`${Array.from(this.multiplierArray).map(
      multi =>
        html`<mwc-list-item ?selected=${multi == this.preSelectedMultiplier}
          >${multi}${this.unit}</mwc-list-item
        >`
    )}`;
  }

  renderSwitch(): TemplateResult {
    if (this.nullable) {
      return html`<mwc-switch
        style="margin-left: 24px;"
        ?checked=${!this.isNull}
        @change=${() => {
          this.toggleValue();
        }}
      ></mwc-switch>`;
    }
    return html``;
  }
}
