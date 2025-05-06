import { __decorate } from "../../_snowpack/pkg/tslib.js";
import { customElement, html, state, property, query, } from '../../_snowpack/pkg/lit-element.js';
import '../../_snowpack/pkg/@material/mwc-switch.js';
import { Select } from '../../_snowpack/pkg/@material/mwc-select.js';
/** A potentially `nullable` `Select`.
 *
 * NB: Use `maybeValue: string | null` instead of `value` if `nullable`!*/
let WizardSelect = class WizardSelect extends Select {
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
    /** Replacement for `value`, can only be `null` if [[`nullable`]]. */
    get maybeValue() {
        return this.null ? null : this.value;
    }
    set maybeValue(value) {
        if (value === null)
            this.null = true;
        else {
            this.null = false;
            this.value = value;
        }
    }
    enable() {
        if (this.nulled === null)
            return;
        this.value = this.nulled;
        this.nulled = null;
        this.disabled = false;
    }
    disable() {
        if (this.nulled !== null)
            return;
        this.nulled = this.value;
        this.value = this.defaultValue;
        this.disabled = true;
    }
    async firstUpdated() {
        await super.firstUpdated();
    }
    checkValidity() {
        if (this.nullable && !this.nullSwitch?.checked)
            return true;
        return super.checkValidity();
    }
    constructor() {
        super();
        /** Whether [[`maybeValue`]] may be `null` */
        this.nullable = false;
        this.isNull = false;
        /** The default `value` displayed if [[`maybeValue`]] is `null`. */
        this.defaultValue = '';
        /** Additional values that cause validation to fail. */
        this.reservedValues = [];
        // FIXME: workaround to allow disable of the whole component - need basic refactor
        this.disabledSwitch = false;
        this.nulled = null;
        this.disabledSwitch = this.hasAttribute('disabled');
    }
    renderSwitch() {
        if (this.nullable) {
            return html `<mwc-switch
        style="margin-left: 12px;"
        ?checked=${!this.null}
        ?disabled=${this.disabledSwitch}
        @change=${() => {
                this.null = !this.nullSwitch.checked;
            }}
      ></mwc-switch>`;
        }
        return html ``;
    }
    render() {
        return html `
      <div style="display: flex; flex-direction: row;">
        <div style="flex: auto;">${super.render()}</div>
        <div style="display: flex; align-items: center; height: 56px;">
          ${this.renderSwitch()}
        </div>
      </div>
    `;
    }
};
__decorate([
    property({ type: Boolean })
], WizardSelect.prototype, "nullable", void 0);
__decorate([
    state()
], WizardSelect.prototype, "null", null);
__decorate([
    property({ type: String })
], WizardSelect.prototype, "maybeValue", null);
__decorate([
    property({ type: String })
], WizardSelect.prototype, "defaultValue", void 0);
__decorate([
    property({ type: Array })
], WizardSelect.prototype, "reservedValues", void 0);
__decorate([
    query('mwc-switch')
], WizardSelect.prototype, "nullSwitch", void 0);
WizardSelect = __decorate([
    customElement('wizard-select')
], WizardSelect);
export { WizardSelect };
//# sourceMappingURL=wizard-select.js.map