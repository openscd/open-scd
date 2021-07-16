import {
  customElement,
  html,
  internalProperty,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { get } from 'lit-translate';

import { Switch } from '@material/mwc-switch';
import { Select } from '@material/mwc-select';

/** A potentially `nullable` `Select`.
 *
 * NB: Use `maybeValue: string | null` instead of `value` if `nullable`!*/
@customElement('wizard-select')
export class WizardSelect extends Select {
  /** Whether [[`maybeValue`]] may be `null` */
  @property({ type: Boolean })
  nullable = false;
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
    if (value === null) this.null = true;
    else {
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

  @query('mwc-switch') nullSwitch?: Switch;

  private nulled: string | null = null;

  private enable(): void {
    if (this.nulled === null) return;
    this.value = this.nulled;
    this.nulled = null;
    this.disabled = false;
  }

  private disable(): void {
    if (this.nulled !== null) return;
    this.nulled = this.value;
    this.value = this.defaultValue;
    this.disabled = true;
  }

  async firstUpdated(): Promise<void> {
    await super.firstUpdated();
  }

  checkValidity(): boolean {
    if (
      this.reservedValues &&
      this.reservedValues.some(array => array === this.value)
    ) {
      this.setCustomValidity(get('textfield.unique'));
      return false;
    }
    this.setCustomValidity(''); //Reset. Otherwise super.checkValidity always falseM
    return super.checkValidity();
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
        <div style="display: flex; align-items: center; height: 56px;">
          ${this.renderSwitch()}
        </div>
      </div>
    `;
  }
}
