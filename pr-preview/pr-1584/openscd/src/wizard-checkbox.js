var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {
  customElement,
  html,
  LitElement,
  property,
  query,
  state
} from "../../_snowpack/pkg/lit-element.js";
import "../../_snowpack/pkg/@material/mwc-formfield.js";
import "../../_snowpack/pkg/@material/mwc-switch.js";
import "../../_snowpack/pkg/@material/mwc-checkbox.js";
export let WizardCheckbox = class extends LitElement {
  constructor() {
    super(...arguments);
    this.label = "";
    this.helper = "";
    this.nullable = false;
    this.defaultChecked = false;
    this.disabled = false;
    this.isNull = false;
    this.initChecked = false;
    this.deactivateCheckbox = false;
    this.nulled = null;
  }
  get maybeValue() {
    return this.null ? null : this.checked ? "true" : "false";
  }
  set maybeValue(check) {
    if (check === null)
      this.null = true;
    else {
      this.null = false;
      this.checked = check === "true" ? true : false;
    }
  }
  get null() {
    return this.nullable && this.isNull;
  }
  set null(value) {
    if (!this.nullable || value === this.isNull)
      return;
    this.isNull = value;
    if (this.null)
      this.disable();
    else
      this.enable();
  }
  get checked() {
    return this.checkbox?.checked ?? this.initChecked;
  }
  set checked(value) {
    if (this.checkbox)
      this.checkbox.checked = value;
    else
      this.initChecked = value;
  }
  get formfieldLabel() {
    return this.helper ? `${this.helper} (${this.label})` : this.label;
  }
  enable() {
    if (this.nulled === null)
      return;
    this.checked = this.nulled;
    this.nulled = null;
    this.deactivateCheckbox = false;
  }
  disable() {
    if (this.nulled !== null)
      return;
    this.nulled = this.checked;
    this.checked = this.defaultChecked;
    this.deactivateCheckbox = true;
  }
  firstUpdated() {
    this.requestUpdate();
  }
  renderSwitch() {
    if (this.nullable) {
      return html`<mwc-switch
        style="margin-left: 12px;"
        ?checked=${!this.null}
        ?disabled=${this.disabled}
        @change=${() => {
        this.null = !this.nullSwitch.checked;
      }}
      ></mwc-switch>`;
    }
    return html``;
  }
  render() {
    return html`
      <div style="display: flex; flex-direction: row;">
        <div style="flex: auto;">
          <mwc-formfield
            label="${this.formfieldLabel}"
            style="${this.deactivateCheckbox || this.disabled ? `--mdc-theme-text-primary-on-background:rgba(0, 0, 0, 0.38)` : ``}"
            ><mwc-checkbox
              ?checked=${this.initChecked}
              ?disabled=${this.deactivateCheckbox || this.disabled}
            ></mwc-checkbox
          ></mwc-formfield>
        </div>
        <div style="display: flex; align-items: center;">
          ${this.renderSwitch()}
        </div>
      </div>
    `;
  }
};
__decorate([
  property({type: String})
], WizardCheckbox.prototype, "label", 2);
__decorate([
  property({type: String})
], WizardCheckbox.prototype, "helper", 2);
__decorate([
  property({type: Boolean})
], WizardCheckbox.prototype, "nullable", 2);
__decorate([
  property({type: Boolean})
], WizardCheckbox.prototype, "defaultChecked", 2);
__decorate([
  property({type: String})
], WizardCheckbox.prototype, "maybeValue", 1);
__decorate([
  property({type: Boolean})
], WizardCheckbox.prototype, "disabled", 2);
__decorate([
  state()
], WizardCheckbox.prototype, "null", 1);
__decorate([
  state()
], WizardCheckbox.prototype, "checked", 1);
__decorate([
  state()
], WizardCheckbox.prototype, "deactivateCheckbox", 2);
__decorate([
  state()
], WizardCheckbox.prototype, "formfieldLabel", 1);
__decorate([
  query("mwc-switch")
], WizardCheckbox.prototype, "nullSwitch", 2);
__decorate([
  query("mwc-checkbox")
], WizardCheckbox.prototype, "checkbox", 2);
WizardCheckbox = __decorate([
  customElement("wizard-checkbox")
], WizardCheckbox);
