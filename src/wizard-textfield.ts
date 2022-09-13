import {
  customElement,
  html,
  internalProperty,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { get, translate } from 'lit-translate';

import '@material/mwc-icon-button';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-menu';
import '@material/mwc-switch';
import { IconButton } from '@material/mwc-icon-button';
import { Menu } from '@material/mwc-menu';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { Switch } from '@material/mwc-switch';
import { TextField } from '@material/mwc-textfield';

/** A potentially `nullable` `TextField` that allows for selection of an SI
 * `multiplier` if an SI `unit` is given.
 *
 * NB: Use `maybeValue: string | null` instead of `value` if `nullable`!*/
@customElement('wizard-textfield')
export class WizardTextField extends TextField {
  /** Whether [[`maybeValue`]] may be `null` */
  @property({ type: Boolean })
  nullable = false;
  /** Selectable SI multipliers for a non-empty [[`unit`]]. */
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
  /** SI Unit, must be non-empty to allow for selecting a [[`multiplier`]].
   * Overrides `suffix`. */
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
  /** Replacement for `value`, can only be `null` if [[`nullable`]]. */
  @property({ type: String })
  get maybeValue(): string | null {
    return this.null ? null : this.value;
  }
  set maybeValue(value: string | null) {
    if (value === null) {
      this.null = true;
      this.value = '';
    } else {
      this.null = false;
      this.value = value;
    }
  }
  /** The default `value` displayed if [[`maybeValue`]] is `null`. */
  @property({ type: String })
  defaultValue = '';
  /** Additional values that cause validation to fail. */
  @property({ type: Array })
  reservedValues: string[] = [];

  // FIXME: workaround to allow disable of the whole component - need basic refactor
  private disabledSwitch = false;

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
    // Reset to prevent super.checkValidity to always return false
    this.setCustomValidity('');
    return super.checkValidity();
  }

  constructor() {
    super();

    this.disabledSwitch = this.hasAttribute('disabled');
  }

  renderUnitSelector(): TemplateResult {
    if (this.multipliers.length && this.unit)
      return html`<div style="position:relative;">
        <mwc-icon-button
          style="margin:5px;"
          icon="more"
          ?disabled=${this.null || this.disabledSwitch}
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
        ?disabled=${this.disabledSwitch}
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
