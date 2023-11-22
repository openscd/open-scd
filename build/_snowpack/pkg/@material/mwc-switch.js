import { e as __decorate } from '../common/tslib.es6-9ee6b4ed.js';
import { property, query, queryAsync, state, eventOptions, css, customElement } from '../lit-element.js';
import './mwc-ripple/mwc-ripple.js';
import { a as ariaProperty } from '../common/aria-property-c2d6d3d3.js';
import { FormElement } from './mwc-base/form-element.js';
import { observer } from './mwc-base/observer.js';
import { RippleHandlers } from './mwc-ripple/ripple-handlers.js';
import { M as MDCSwitchFoundation } from '../common/foundation-791b12b2.js';
import { ifDefined } from '../lit-html/directives/if-defined.js';
import { addHasRemoveClass } from './mwc-base/utils.js';
import { h as html } from '../common/lit-html-1055e278.js';
import '../common/shady-render-0818322f.js';
import '../common/ponyfill-4ccc5f83.js';
import './mwc-base/base-element.js';
import '../common/foundation-e5232dca.js';
import './base/foundation.js';
import '../lit-html/directives/class-map.js';
import '../common/style-map-b4ce5013.js';

class SwitchBase extends FormElement {
    constructor() {
        super(...arguments);
        this.checked = false;
        this.disabled = false;
        this.shouldRenderRipple = false;
        this.mdcFoundationClass = MDCSwitchFoundation;
        this.rippleHandlers = new RippleHandlers(() => {
            this.shouldRenderRipple = true;
            return this.ripple;
        });
    }
    changeHandler(e) {
        this.mdcFoundation.handleChange(e);
        // catch "click" event and sync properties
        this.checked = this.formElement.checked;
    }
    createAdapter() {
        return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), { setNativeControlChecked: (checked) => {
                this.formElement.checked = checked;
            }, setNativeControlDisabled: (disabled) => {
                this.formElement.disabled = disabled;
            }, setNativeControlAttr: (attr, value) => {
                this.formElement.setAttribute(attr, value);
            } });
    }
    renderRipple() {
        return this.shouldRenderRipple ? html `
        <mwc-ripple
          .accent="${this.checked}"
          .disabled="${this.disabled}"
          unbounded>
        </mwc-ripple>` :
            '';
    }
    focus() {
        const formElement = this.formElement;
        if (formElement) {
            this.rippleHandlers.startFocus();
            formElement.focus();
        }
    }
    blur() {
        const formElement = this.formElement;
        if (formElement) {
            this.rippleHandlers.endFocus();
            formElement.blur();
        }
    }
    render() {
        return html `
      <div class="mdc-switch">
        <div class="mdc-switch__track"></div>
        <div class="mdc-switch__thumb-underlay">
          ${this.renderRipple()}
          <div class="mdc-switch__thumb">
            <input
              type="checkbox"
              id="basic-switch"
              class="mdc-switch__native-control"
              role="switch"
              aria-label="${ifDefined(this.ariaLabel)}"
              aria-labelledby="${ifDefined(this.ariaLabelledBy)}"
              @change="${this.changeHandler}"
              @focus="${this.handleRippleFocus}"
              @blur="${this.handleRippleBlur}"
              @mousedown="${this.handleRippleMouseDown}"
              @mouseenter="${this.handleRippleMouseEnter}"
              @mouseleave="${this.handleRippleMouseLeave}"
              @touchstart="${this.handleRippleTouchStart}"
              @touchend="${this.handleRippleDeactivate}"
              @touchcancel="${this.handleRippleDeactivate}">
          </div>
        </div>
      </div>`;
    }
    handleRippleMouseDown(event) {
        const onUp = () => {
            window.removeEventListener('mouseup', onUp);
            this.handleRippleDeactivate();
        };
        window.addEventListener('mouseup', onUp);
        this.rippleHandlers.startPress(event);
    }
    handleRippleTouchStart(event) {
        this.rippleHandlers.startPress(event);
    }
    handleRippleDeactivate() {
        this.rippleHandlers.endPress();
    }
    handleRippleMouseEnter() {
        this.rippleHandlers.startHover();
    }
    handleRippleMouseLeave() {
        this.rippleHandlers.endHover();
    }
    handleRippleFocus() {
        this.rippleHandlers.startFocus();
    }
    handleRippleBlur() {
        this.rippleHandlers.endFocus();
    }
}
__decorate([
    property({ type: Boolean }),
    observer(function (value) {
        this.mdcFoundation.setChecked(value);
    })
], SwitchBase.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean }),
    observer(function (value) {
        this.mdcFoundation.setDisabled(value);
    })
], SwitchBase.prototype, "disabled", void 0);
__decorate([
    ariaProperty,
    property({ attribute: 'aria-label' })
], SwitchBase.prototype, "ariaLabel", void 0);
__decorate([
    ariaProperty,
    property({ attribute: 'aria-labelledby' })
], SwitchBase.prototype, "ariaLabelledBy", void 0);
__decorate([
    query('.mdc-switch')
], SwitchBase.prototype, "mdcRoot", void 0);
__decorate([
    query('input')
], SwitchBase.prototype, "formElement", void 0);
__decorate([
    queryAsync('mwc-ripple')
], SwitchBase.prototype, "ripple", void 0);
__decorate([
    state()
], SwitchBase.prototype, "shouldRenderRipple", void 0);
__decorate([
    eventOptions({ passive: true })
], SwitchBase.prototype, "handleRippleMouseDown", null);
__decorate([
    eventOptions({ passive: true })
], SwitchBase.prototype, "handleRippleTouchStart", null);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const styles = css `.mdc-switch__thumb-underlay{left:-14px;right:initial;top:-17px;width:48px;height:48px}[dir=rtl] .mdc-switch__thumb-underlay,.mdc-switch__thumb-underlay[dir=rtl]{left:initial;right:-14px}.mdc-switch__native-control{width:64px;height:48px}.mdc-switch{display:inline-block;position:relative;outline:none;user-select:none}.mdc-switch.mdc-switch--checked .mdc-switch__track{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-switch.mdc-switch--checked .mdc-switch__thumb{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786);border-color:#018786;border-color:var(--mdc-theme-secondary, #018786)}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__track{background-color:#000;background-color:var(--mdc-theme-on-surface, #000)}.mdc-switch:not(.mdc-switch--checked) .mdc-switch__thumb{background-color:#fff;background-color:var(--mdc-theme-surface, #fff);border-color:#fff;border-color:var(--mdc-theme-surface, #fff)}.mdc-switch__native-control{left:0;right:initial;position:absolute;top:0;margin:0;opacity:0;cursor:pointer;pointer-events:auto;transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1)}[dir=rtl] .mdc-switch__native-control,.mdc-switch__native-control[dir=rtl]{left:initial;right:0}.mdc-switch__track{box-sizing:border-box;width:36px;height:14px;border:1px solid transparent;border-radius:7px;opacity:.38;transition:opacity 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb-underlay{display:flex;position:absolute;align-items:center;justify-content:center;transform:translateX(0);transition:transform 90ms cubic-bezier(0.4, 0, 0.2, 1),background-color 90ms cubic-bezier(0.4, 0, 0.2, 1),border-color 90ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-switch__thumb{box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0,0,0,.12);box-sizing:border-box;width:20px;height:20px;border:10px solid;border-radius:50%;pointer-events:none;z-index:1}.mdc-switch--checked .mdc-switch__track{opacity:.54}.mdc-switch--checked .mdc-switch__thumb-underlay{transform:translateX(16px)}[dir=rtl] .mdc-switch--checked .mdc-switch__thumb-underlay,.mdc-switch--checked .mdc-switch__thumb-underlay[dir=rtl]{transform:translateX(-16px)}.mdc-switch--checked .mdc-switch__native-control{transform:translateX(-16px)}[dir=rtl] .mdc-switch--checked .mdc-switch__native-control,.mdc-switch--checked .mdc-switch__native-control[dir=rtl]{transform:translateX(16px)}.mdc-switch--disabled{opacity:.38;pointer-events:none}.mdc-switch--disabled .mdc-switch__thumb{border-width:1px}.mdc-switch--disabled .mdc-switch__native-control{cursor:default;pointer-events:none}:host{display:inline-flex;outline:none;-webkit-tap-highlight-color:transparent}`;

let Switch = class Switch extends SwitchBase {
};
Switch.styles = [styles];
Switch = __decorate([
    customElement('mwc-switch')
], Switch);

export { Switch };
