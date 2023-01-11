import {
  customElement,
  html,
  internalProperty,
  property,
  PropertyValues,
  query,
  TemplateResult,
} from 'lit-element';

import '@material/mwc-switch';
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
    if (value === null) {
      this.nullable = true;
      this.null = true;
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
    if (this.nullable && !this.nullSwitch?.checked) return true;
    return super.checkValidity();
  }

  constructor() {
    super();

    this.disabledSwitch = this.hasAttribute('disabled');
  }

  // TODO
  // FIXME: Refactor nullable/isNull/null/nulled properties to make this work better (check lit lifecycle)
  /*
   *  Workaround Since the nullable can be changed dynamically, we cannot be sure that nullable is set before the `null` setter. Therefore we need to re-set the isNull value when nullable has been changed.
   * Workaround Since the default value can be changed dynamically, we cannot be sure that the default value is set before the disable function is being called. Therefore we need to re-set the value if the disabled function has been called before the defaultValue has been set.
   *
   */
  protected updated(changedProperties: PropertyValues<WizardSelect>): void {
    const nullableHasChanged = changedProperties.has('nullable');
    const defaultValueChanged = changedProperties.has('defaultValue');

    if (nullableHasChanged && this.nullable) {
      this.isNull = this.maybeValue === null;
    }

    if (defaultValueChanged && this.disabled && this.isNull) {
      this.value = this.defaultValue;
    }
    super.updated(changedProperties);
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
        <div style="display: flex; align-items: center; height: 56px;">
          ${this.renderSwitch()}
        </div>
      </div>
    `;
  }
}
