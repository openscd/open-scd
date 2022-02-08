import {
  customElement,
  html,
  LitElement,
  property,
  query,
  state,
  TemplateResult,
} from 'lit-element';

import '@material/mwc-formfield';
import '@material/mwc-switch';
import '@material/mwc-checkbox';
import { Checkbox } from '@material/mwc-checkbox';
import { Switch } from '@material/mwc-switch';

/** A potentially `nullable` `Checkbox`. */
@customElement('wizard-checkbox')
export class WizardCheckbox extends LitElement {
  @property({ type: String })
  label = '';
  /** Additional information rendered to the formfield: `label (helper)`*/
  @property({ type: String })
  helper = '';
  /** Whether [[`maybeValue`]] may be `null` */
  @property({ type: Boolean })
  nullable = false;
  /** The default `checked` displayed if [[`maybeValue`]] is `null`. */
  @property({ type: Boolean })
  defaultChecked = false;
  /** Reflects `checked` attribute of `mwc-checkbox`. Can be `null` if [[`nullable`]]. */
  @property({ type: String })
  get maybeValue(): string | null {
    return this.null ? null : this.checked ? 'true' : 'false';
  }
  set maybeValue(check: string | null) {
    if (check === null) this.null = true;
    else {
      this.null = false;
      this.checked = check === 'true' ? true : false;
    }
  }

  private isNull = false;

  @state()
  private get null(): boolean {
    return this.nullable && this.isNull;
  }
  private set null(value: boolean) {
    if (!this.nullable || value === this.isNull) return;
    this.isNull = value;
    if (this.null) this.disable();
    else this.enable();
  }

  private initChecked = false;

  @state()
  get checked(): boolean {
    return this.checkbox?.checked ?? this.initChecked;
  }
  set checked(value: boolean) {
    if (this.checkbox) this.checkbox.checked = value;
    else this.initChecked = value;
  }

  @state()
  disabled = false;
  @state()
  get formfieldLabel(): string {
    return this.helper ? `${this.label} (${this.helper})` : this.label;
  }

  @query('mwc-switch') nullSwitch?: Switch;
  @query('mwc-checkbox') checkbox?: Checkbox;

  private nulled: boolean | null = null;

  private enable(): void {
    if (this.nulled === null) return;
    this.checked = this.nulled;
    this.nulled = null;
    this.disabled = false;
  }

  private disable(): void {
    if (this.nulled !== null) return;
    this.nulled = this.checked;
    this.checked = this.defaultChecked;
    this.disabled = true;
  }

  firstUpdated(): void {
    this.requestUpdate();
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
        <div style="flex: auto;">
          <mwc-formfield label="${this.formfieldLabel}"
            ><mwc-checkbox
              ?checked=${this.initChecked}
              ?disabled=${this.disabled}
            ></mwc-checkbox
          ></mwc-formfield>
        </div>
        <div style="display: flex; align-items: center;">
          ${this.renderSwitch()}
        </div>
      </div>
    `;
  }
}
