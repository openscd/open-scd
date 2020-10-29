import {
  customElement,
  html,
  internalProperty,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { translate, get } from 'lit-translate';

import '@material/mwc-list/mwc-list-item';
import '@material/mwc-menu';
import '@material/mwc-switch';
import '@material/mwc-textfield';
import { IconButton } from '@material/mwc-icon-button';
import { Menu } from '@material/mwc-menu';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { Switch } from '@material/mwc-switch';
import { TextField } from '@material/mwc-textfield';

@customElement('wizard-textfield')
export class WizardTextField extends TextField {
  @property({ type: Boolean })
  nullable = false;
  @property({ type: Array })
  multipliers = [null, ''];
  private multiplierIndex = 0;
  @property({ type: String })
  get multiplier(): string | null {
    if (this.unit == '') return null;
    return (
      this.multipliers[this.multiplierIndex] ?? this.multipliers[0] ?? null
    );
  }
  set multiplier(value: string | null) {
    const index = this.multipliers.indexOf(value);
    if (index >= 0) this.multiplierIndex = index;
    this.suffix = (this.multiplier ?? '') + this.unit;
  }
  @property({ type: String })
  unit = '';
  private isNull = false;
  @internalProperty()
  private get null(): boolean {
    return this.nullable && this.isNull;
  }
  private set null(value: boolean) {
    if (!this.nullable || value === this.isNull) return;
    this.isNull = value;
    if (this.null) this.disable();
    else this.enable();
  }
  @property({ type: String })
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
  @property({ type: String })
  defaultValue = '';
  @property({ type: Array })
  reservedValues: string[] = [];

  @query('mwc-switch') nullSwitch?: Switch;
  @query('mwc-menu') multiplierMenu?: Menu;
  @query('mwc-icon-button') multiplierButton?: IconButton;

  private nulled: string | null = null;

  private selectMultiplier(se: SingleSelectedEvent): void {
    this.multiplier = this.multipliers[se.detail.index];
  }

  private enable(): void {
    if (this.nulled === null) return;
    this.value = this.nulled;
    this.nulled = null;
    this.helperPersistent = false;
    this.disabled = false;
  }

  private disable(): void {
    if (this.nulled !== null) return;
    this.nulled = this.value;
    this.value = this.defaultValue;
    this.helperPersistent = true;
    this.disabled = true;
  }

  async firstUpdated(): Promise<void> {
    await super.firstUpdated();
    if (this.multiplierMenu)
      this.multiplierMenu.anchor = this.multiplierButton ?? null;
  }

  checkValidity(): boolean {
    if (
      this.reservedValues &&
      this.reservedValues.some(array => array === this.value)
    ) {
      this.setCustomValidity(get('textfield.unique'));
      return false;
    }
    return super.checkValidity();
  }

  renderUnitSelector(): TemplateResult {
    if (this.multipliers.length && this.unit)
      return html`<div style="position:relative;">
        <mwc-icon-button
          style="margin:5px;"
          icon="more"
          ?disabled=${this.null}
          @click=${() => this.multiplierMenu?.show()}
        ></mwc-icon-button>
        <mwc-menu
          @selected=${this.selectMultiplier}
          fixed
          .anchor=${this.multiplierButton ?? null}
          >${this.renderMulplierList()}</mwc-menu
        >
      </div>`;
    else return html``;
  }

  renderMulplierList(): TemplateResult {
    return html`${this.multipliers.map(
      multiplier =>
        html`<mwc-list-item ?selected=${multiplier === this.multiplier}
          >${multiplier === null
            ? translate('textfield.noMultiplier')
            : multiplier}</mwc-list-item
        >`
    )}`;
  }

  renderSwitch(): TemplateResult {
    if (this.nullable) {
      return html`<mwc-switch
        style="margin-left: 12px;"
        ?checked=${!this.null}
        @change=${() => {
          this.null = !this.nullSwitch!.checked;
        }}
      ></mwc-switch>`;
    }
    return html``;
  }

  render(): TemplateResult {
    return html`
      <div style="display: flex; flex-direction: row;">
        <div style="flex: auto;">${super.render()}</div>
        ${this.renderUnitSelector()}
        <div style="display: flex; align-items: center; height: 56px;">
          ${this.renderSwitch()}
        </div>
      </div>
    `;
  }
}
