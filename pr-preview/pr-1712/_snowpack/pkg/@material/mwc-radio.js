import { b as __extends, d as __assign, e as __decorate } from '../common/tslib.es6-52cb4f42.js';
import { q as query, s as state, p as property, a as queryAsync, e as eventOptions, c as css, b as customElement } from '../common/lit-element-05157a0d.js';
import { R as RippleHandlers } from '../common/ripple-handlers-614b9d4e.js';
import { a as ariaProperty } from '../common/aria-property-2938771c.js';
import { F as FormElement } from '../common/form-element-fe36b5ac.js';
import { o as observer } from '../common/observer-6d1a3681.js';
import { M as MDCFoundation } from '../common/foundation-7cea7f4a.js';
import { c as classMap } from '../common/class-map-aad33d7c.js';
import { i as ifDefined } from '../common/if-defined-0f9d5429.js';
import { h as html } from '../common/lit-html-e07bf80b.js';
import { a as addHasRemoveClass } from '../common/base-element-338757e6.js';
import '../common/render-ab1aa234.js';
import '../common/ponyfill-44e20603.js';
import '../common/foundation-20340859.js';
import '../common/style-map-3468e116.js';

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Unique symbol for marking roots
 */
const selectionController = Symbol('selection controller');
/**
 * Set of checkable elements with added metadata
 */
class SingleSelectionSet {
    constructor() {
        this.selected = null;
        this.ordered = null;
        this.set = new Set();
    }
}
/**
 * Controller that provides behavior similar to a native `<input type="radio">`
 * group.
 *
 * Behaviors:
 *
 * - Selection via key navigation (currently LTR is supported)
 * - Deselection of other grouped, checkable controls upon selection
 * - Grouping of checkable elements by name
 *   - Defaults grouping scope to host shadow root
 *   - Document-wide scoping enabled
 * - Land focus only on checked element. Focuses leading element when none
 *   checked.
 *
 * Intended Usage:
 *
 * ```ts
 * class MyElement extends HTMLElement {
 *   private selectionController: SingleSelectionController | null = null;
 *   name = "";
 *   global = false;
 *
 *   private _checked = false;
 *   set checked(checked: boolean) {
 *     const oldVal = this._checked;
 *     if (checked === oldVal) return;
 *
 *     this._checked = checked;
 *
 *     if (this.selectionController) {
 *       this.selectionController.update(this)
 *     }
 *   }
 *
 *   get checked() {
 *     return this._checked;
 *   }
 *
 *   connectedCallback() {
 *     this.selectionController = SelectionController.getController(this);
 *     this.selectionController.register(this);
 *     this.selectionController.update(this);
 *   }
 *
 *   disconnectedCallback() {
 *     this.selectionController!.unregister(this);
 *     this.selectionController = null;
 *   }
 * }
 * ```
 */
class SingleSelectionController {
    constructor(element) {
        this.sets = {};
        this.focusedSet = null;
        this.mouseIsDown = false;
        this.updating = false;
        element.addEventListener('keydown', (e) => {
            this.keyDownHandler(e);
        });
        element.addEventListener('mousedown', () => {
            this.mousedownHandler();
        });
        element.addEventListener('mouseup', () => {
            this.mouseupHandler();
        });
    }
    /**
     * Get a controller for the given element. If no controller exists, one will
     * be created. Defaults to getting the controller scoped to the element's root
     * node shadow root unless `element.global` is true. Then, it will get a
     * `window.document`-scoped controller.
     *
     * @param element Element from which to get / create a SelectionController. If
     *     `element.global` is true, it gets a selection controller scoped to
     *     `window.document`.
     */
    static getController(element) {
        const useGlobal = !('global' in element) || ('global' in element && element.global);
        const root = useGlobal ? document :
            element.getRootNode();
        let controller = root[selectionController];
        if (controller === undefined) {
            controller = new SingleSelectionController(root);
            root[selectionController] = controller;
        }
        return controller;
    }
    keyDownHandler(e) {
        const element = e.target;
        if (!('checked' in element)) {
            return;
        }
        if (!this.has(element)) {
            return;
        }
        if (e.key == 'ArrowRight' || e.key == 'ArrowDown') {
            this.selectNext(element);
        }
        else if (e.key == 'ArrowLeft' || e.key == 'ArrowUp') {
            this.selectPrevious(element);
        }
    }
    mousedownHandler() {
        this.mouseIsDown = true;
    }
    mouseupHandler() {
        this.mouseIsDown = false;
    }
    /**
     * Whether or not the controller controls  the given element.
     *
     * @param element element to check
     */
    has(element) {
        const set = this.getSet(element.name);
        return set.set.has(element);
    }
    /**
     * Selects and returns the controlled element previous to the given element in
     * document position order. See
     * [Node.compareDocumentPosition](https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition).
     *
     * @param element element relative from which preceding element is fetched
     */
    selectPrevious(element) {
        const order = this.getOrdered(element);
        const i = order.indexOf(element);
        const previous = order[i - 1] || order[order.length - 1];
        this.select(previous);
        return previous;
    }
    /**
     * Selects and returns the controlled element next to the given element in
     * document position order. See
     * [Node.compareDocumentPosition](https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition).
     *
     * @param element element relative from which following element is fetched
     */
    selectNext(element) {
        const order = this.getOrdered(element);
        const i = order.indexOf(element);
        const next = order[i + 1] || order[0];
        this.select(next);
        return next;
    }
    select(element) {
        element.click();
    }
    /**
     * Focuses the selected element in the given element's selection set. User's
     * mouse selection will override this focus.
     *
     * @param element Element from which selection set is derived and subsequently
     *     focused.
     * @deprecated update() method now handles focus management by setting
     *     appropriate tabindex to form element.
     */
    focus(element) {
        // Only manage focus state when using keyboard
        if (this.mouseIsDown) {
            return;
        }
        const set = this.getSet(element.name);
        const currentFocusedSet = this.focusedSet;
        this.focusedSet = set;
        if (currentFocusedSet != set && set.selected && set.selected != element) {
            set.selected.focus();
        }
    }
    /**
     * @return Returns true if atleast one radio is selected in the radio group.
     */
    isAnySelected(element) {
        const set = this.getSet(element.name);
        for (const e of set.set) {
            if (e.checked) {
                return true;
            }
        }
        return false;
    }
    /**
     * Returns the elements in the given element's selection set in document
     * position order.
     * [Node.compareDocumentPosition](https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition).
     *
     * @param element Element from which selection set is derived and subsequently
     *     ordered.
     */
    getOrdered(element) {
        const set = this.getSet(element.name);
        if (!set.ordered) {
            set.ordered = Array.from(set.set);
            set.ordered.sort((a, b) => a.compareDocumentPosition(b) == Node.DOCUMENT_POSITION_PRECEDING ?
                1 :
                0);
        }
        return set.ordered;
    }
    /**
     * Gets the selection set of the given name and creates one if it does not yet
     * exist.
     *
     * @param name Name of set
     */
    getSet(name) {
        if (!this.sets[name]) {
            this.sets[name] = new SingleSelectionSet();
        }
        return this.sets[name];
    }
    /**
     * Register the element in the selection controller.
     *
     * @param element Element to register. Registers in set of `element.name`.
     */
    register(element) {
        // TODO(b/168546148): Remove accessing 'name' via getAttribute() when new
        // base class is created without single selection controller. Component
        // maybe booted up after it is connected to DOM in which case properties
        // (including `name`) are not updated yet.
        const name = element.name || element.getAttribute('name') || '';
        const set = this.getSet(name);
        set.set.add(element);
        set.ordered = null;
    }
    /**
     * Unregister the element from selection controller.
     *
     * @param element Element to register. Registers in set of `element.name`.
     */
    unregister(element) {
        const set = this.getSet(element.name);
        set.set.delete(element);
        set.ordered = null;
        if (set.selected == element) {
            set.selected = null;
        }
    }
    /**
     * Unselects other elements in element's set if element is checked. Noop
     * otherwise.
     *
     * @param element Element from which to calculate selection controller update.
     */
    update(element) {
        if (this.updating) {
            return;
        }
        this.updating = true;
        const set = this.getSet(element.name);
        if (element.checked) {
            for (const e of set.set) {
                if (e == element) {
                    continue;
                }
                e.checked = false;
            }
            set.selected = element;
        }
        // When tabbing through land focus on the checked radio in the group.
        if (this.isAnySelected(element)) {
            for (const e of set.set) {
                if (e.formElementTabIndex === undefined) {
                    break;
                }
                e.formElementTabIndex = e.checked ? 0 : -1;
            }
        }
        this.updating = false;
    }
}

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var strings = {
    NATIVE_CONTROL_SELECTOR: '.mdc-radio__native-control',
};
var cssClasses = {
    DISABLED: 'mdc-radio--disabled',
    ROOT: 'mdc-radio',
};

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
var MDCRadioFoundation = /** @class */ (function (_super) {
    __extends(MDCRadioFoundation, _super);
    function MDCRadioFoundation(adapter) {
        return _super.call(this, __assign(__assign({}, MDCRadioFoundation.defaultAdapter), adapter)) || this;
    }
    Object.defineProperty(MDCRadioFoundation, "cssClasses", {
        get: function () {
            return cssClasses;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCRadioFoundation, "strings", {
        get: function () {
            return strings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MDCRadioFoundation, "defaultAdapter", {
        get: function () {
            return {
                addClass: function () { return undefined; },
                removeClass: function () { return undefined; },
                setNativeControlDisabled: function () { return undefined; },
            };
        },
        enumerable: false,
        configurable: true
    });
    MDCRadioFoundation.prototype.setDisabled = function (disabled) {
        var DISABLED = MDCRadioFoundation.cssClasses.DISABLED;
        this.adapter.setNativeControlDisabled(disabled);
        if (disabled) {
            this.adapter.addClass(DISABLED);
        }
        else {
            this.adapter.removeClass(DISABLED);
        }
    };
    return MDCRadioFoundation;
}(MDCFoundation));

/**
 * @fires checked
 * @soyCompatible
 */
class RadioBase extends FormElement {
    constructor() {
        super(...arguments);
        this._checked = false;
        this.useStateLayerCustomProperties = false;
        this.global = false;
        this.disabled = false;
        this.value = '';
        this.name = '';
        /**
         * Touch target extends beyond visual boundary of a component by default.
         * Set to `true` to remove touch target added to the component.
         * @see https://material.io/design/usability/accessibility.html
         */
        this.reducedTouchTarget = false;
        this.mdcFoundationClass = MDCRadioFoundation;
        /**
         * input's tabindex is updated based on checked status.
         * Tab navigation will be removed from unchecked radios.
         */
        this.formElementTabIndex = 0;
        this.focused = false;
        this.shouldRenderRipple = false;
        this.rippleElement = null;
        this.rippleHandlers = new RippleHandlers(() => {
            this.shouldRenderRipple = true;
            this.ripple.then((v) => {
                this.rippleElement = v;
            });
            return this.ripple;
        });
    }
    get checked() {
        return this._checked;
    }
    /**
     * We define our own getter/setter for `checked` because we need to track
     * changes to it synchronously.
     *
     * The order in which the `checked` property is set across radio buttons
     * within the same group is very important. However, we can't rely on
     * UpdatingElement's `updated` callback to observe these changes (which is
     * also what the `@observer` decorator uses), because it batches changes to
     * all properties.
     *
     * Consider:
     *
     *   radio1.disabled = true;
     *   radio2.checked = true;
     *   radio1.checked = true;
     *
     * In this case we'd first see all changes for radio1, and then for radio2,
     * and we couldn't tell that radio1 was the most recently checked.
     */
    set checked(isChecked) {
        var _a, _b;
        const oldValue = this._checked;
        if (isChecked === oldValue) {
            return;
        }
        this._checked = isChecked;
        if (this.formElement) {
            this.formElement.checked = isChecked;
        }
        (_a = this._selectionController) === null || _a === void 0 ? void 0 : _a.update(this);
        if (isChecked === false) {
            // Remove focus ring when unchecked on other radio programmatically.
            // Blur on input since this determines the focus style.
            (_b = this.formElement) === null || _b === void 0 ? void 0 : _b.blur();
        }
        this.requestUpdate('checked', oldValue);
        // useful when unchecks self and wrapping element needs to synchronize
        // TODO(b/168543810): Remove triggering event on programmatic API call.
        this.dispatchEvent(new Event('checked', { bubbles: true, composed: true }));
    }
    _handleUpdatedValue(newValue) {
        // the observer function can't access protected fields (according to
        // closure compiler) because it's not a method on the class, so we need this
        // wrapper.
        this.formElement.value = newValue;
    }
    /** @soyTemplate */
    renderRipple() {
        return this.shouldRenderRipple ? html `<mwc-ripple unbounded accent
        .internalUseStateLayerCustomProperties="${this.useStateLayerCustomProperties}"
        .disabled="${this.disabled}"></mwc-ripple>` :
            '';
    }
    get isRippleActive() {
        var _a;
        return ((_a = this.rippleElement) === null || _a === void 0 ? void 0 : _a.isActive) || false;
    }
    connectedCallback() {
        super.connectedCallback();
        // Note that we must defer creating the selection controller until the
        // element has connected, because selection controllers are keyed by the
        // radio's shadow root. For example, if we're stamping in a lit-html map
        // or repeat, then we'll be constructed before we're added to a root node.
        //
        // Also note if we aren't using native shadow DOM, we still need a
        // SelectionController, because we should update checked status of other
        // radios in the group when selection changes. It also simplifies
        // implementation and testing to use one in all cases.
        //
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        this._selectionController = SingleSelectionController.getController(this);
        this._selectionController.register(this);
        // Radios maybe checked before connected, update selection as soon it is
        // connected to DOM. Last checked radio button in the DOM will be selected.
        //
        // NOTE: If we update selection only after firstUpdate() we might mistakenly
        // update checked status before other radios are rendered.
        this._selectionController.update(this);
    }
    disconnectedCallback() {
        // The controller is initialized in connectedCallback, so if we are in
        // disconnectedCallback then it must be initialized.
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this._selectionController.unregister(this);
        this._selectionController = undefined;
    }
    focus() {
        this.formElement.focus();
    }
    createAdapter() {
        return Object.assign(Object.assign({}, addHasRemoveClass(this.mdcRoot)), { setNativeControlDisabled: (disabled) => {
                this.formElement.disabled = disabled;
            } });
    }
    handleFocus() {
        this.focused = true;
        this.handleRippleFocus();
    }
    handleClick() {
        // Firefox has weird behavior with radios if they are not focused
        this.formElement.focus();
    }
    handleBlur() {
        this.focused = false;
        this.formElement.blur();
        this.rippleHandlers.endFocus();
    }
    /**
     * @soyTemplate
     * @soyAttributes radioAttributes: input
     * @soyClasses radioClasses: .mdc-radio
     */
    render() {
        /** @classMap */
        const classes = {
            'mdc-radio--touch': !this.reducedTouchTarget,
            'mdc-ripple-upgraded--background-focused': this.focused,
            'mdc-radio--disabled': this.disabled,
        };
        return html `
      <div class="mdc-radio ${classMap(classes)}">
        <input
          tabindex="${this.formElementTabIndex}"
          class="mdc-radio__native-control"
          type="radio"
          name="${this.name}"
          aria-label="${ifDefined(this.ariaLabel)}"
          aria-labelledby="${ifDefined(this.ariaLabelledBy)}"
          .checked="${this.checked}"
          .value="${this.value}"
          ?disabled="${this.disabled}"
          @change="${this.changeHandler}"
          @focus="${this.handleFocus}"
          @click="${this.handleClick}"
          @blur="${this.handleBlur}"
          @mousedown="${this.handleRippleMouseDown}"
          @mouseenter="${this.handleRippleMouseEnter}"
          @mouseleave="${this.handleRippleMouseLeave}"
          @touchstart="${this.handleRippleTouchStart}"
          @touchend="${this.handleRippleDeactivate}"
          @touchcancel="${this.handleRippleDeactivate}">
        <div class="mdc-radio__background">
          <div class="mdc-radio__outer-circle"></div>
          <div class="mdc-radio__inner-circle"></div>
        </div>
        ${this.renderRipple()}
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
    changeHandler() {
        this.checked = this.formElement.checked;
    }
}
__decorate([
    query('.mdc-radio')
], RadioBase.prototype, "mdcRoot", void 0);
__decorate([
    query('input')
], RadioBase.prototype, "formElement", void 0);
__decorate([
    state()
], RadioBase.prototype, "useStateLayerCustomProperties", void 0);
__decorate([
    property({ type: Boolean })
], RadioBase.prototype, "global", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], RadioBase.prototype, "checked", null);
__decorate([
    property({ type: Boolean }),
    observer(function (disabled) {
        this.mdcFoundation.setDisabled(disabled);
    })
], RadioBase.prototype, "disabled", void 0);
__decorate([
    property({ type: String }),
    observer(function (value) {
        this._handleUpdatedValue(value);
    })
], RadioBase.prototype, "value", void 0);
__decorate([
    property({ type: String })
], RadioBase.prototype, "name", void 0);
__decorate([
    property({ type: Boolean })
], RadioBase.prototype, "reducedTouchTarget", void 0);
__decorate([
    property({ type: Number })
], RadioBase.prototype, "formElementTabIndex", void 0);
__decorate([
    state()
], RadioBase.prototype, "focused", void 0);
__decorate([
    state()
], RadioBase.prototype, "shouldRenderRipple", void 0);
__decorate([
    queryAsync('mwc-ripple')
], RadioBase.prototype, "ripple", void 0);
__decorate([
    ariaProperty,
    property({ attribute: 'aria-label' })
], RadioBase.prototype, "ariaLabel", void 0);
__decorate([
    ariaProperty,
    property({ attribute: 'aria-labelledby' })
], RadioBase.prototype, "ariaLabelledBy", void 0);
__decorate([
    eventOptions({ passive: true })
], RadioBase.prototype, "handleRippleTouchStart", null);

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const styles = css `.mdc-touch-target-wrapper{display:inline}.mdc-radio{padding:calc((40px - 20px) / 2)}.mdc-radio .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:rgba(0, 0, 0, 0.54)}.mdc-radio .mdc-radio__native-control:enabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:#018786;border-color:var(--mdc-theme-secondary, #018786)}.mdc-radio .mdc-radio__native-control:enabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:#018786;border-color:var(--mdc-theme-secondary, #018786)}.mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:rgba(0, 0, 0, 0.38)}.mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:rgba(0, 0, 0, 0.38)}.mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:rgba(0, 0, 0, 0.38)}.mdc-radio .mdc-radio__background::before{background-color:#018786;background-color:var(--mdc-theme-secondary, #018786)}.mdc-radio .mdc-radio__background::before{top:calc(-1 * (40px - 20px) / 2);left:calc(-1 * (40px - 20px) / 2);width:40px;height:40px}.mdc-radio .mdc-radio__native-control{top:calc((40px - 40px) / 2);right:calc((40px - 40px) / 2);left:calc((40px - 40px) / 2);width:40px;height:40px}@media screen and (forced-colors: active),(-ms-high-contrast: active){.mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:GrayText}.mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:GrayText}.mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:GrayText}}.mdc-radio{display:inline-block;position:relative;flex:0 0 auto;box-sizing:content-box;width:20px;height:20px;cursor:pointer;will-change:opacity,transform,border-color,color}.mdc-radio__background{display:inline-block;position:relative;box-sizing:border-box;width:20px;height:20px}.mdc-radio__background::before{position:absolute;transform:scale(0, 0);border-radius:50%;opacity:0;pointer-events:none;content:"";transition:opacity 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__outer-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;border-width:2px;border-style:solid;border-radius:50%;transition:border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__inner-circle{position:absolute;top:0;left:0;box-sizing:border-box;width:100%;height:100%;transform:scale(0, 0);border-width:10px;border-style:solid;border-radius:50%;transition:transform 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1),border-color 120ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-radio__native-control{position:absolute;margin:0;padding:0;opacity:0;cursor:inherit;z-index:1}.mdc-radio--touch{margin-top:4px;margin-bottom:4px;margin-right:4px;margin-left:4px}.mdc-radio--touch .mdc-radio__native-control{top:calc((40px - 48px) / 2);right:calc((40px - 48px) / 2);left:calc((40px - 48px) / 2);width:48px;height:48px}.mdc-radio__native-control:checked+.mdc-radio__background,.mdc-radio__native-control:disabled+.mdc-radio__background{transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__outer-circle{transition:border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio--disabled{cursor:default;pointer-events:none}.mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__inner-circle{transform:scale(0.5);transition:transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1),border-color 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}.mdc-radio__native-control:disabled+.mdc-radio__background,[aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background{cursor:default}.mdc-radio__native-control:focus+.mdc-radio__background::before{transform:scale(1);opacity:.12;transition:opacity 120ms 0ms cubic-bezier(0, 0, 0.2, 1),transform 120ms 0ms cubic-bezier(0, 0, 0.2, 1)}:host{display:inline-block;outline:none}.mdc-radio{vertical-align:bottom}.mdc-radio .mdc-radio__native-control:enabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-unchecked-color, rgba(0, 0, 0, 0.54))}.mdc-radio [aria-disabled=true] .mdc-radio__native-control:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio .mdc-radio__native-control:disabled:not(:checked)+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-color, rgba(0, 0, 0, 0.38))}.mdc-radio [aria-disabled=true] .mdc-radio__native-control:checked+.mdc-radio__background .mdc-radio__outer-circle,.mdc-radio .mdc-radio__native-control:disabled:checked+.mdc-radio__background .mdc-radio__outer-circle{border-color:var(--mdc-radio-disabled-color, rgba(0, 0, 0, 0.38))}.mdc-radio [aria-disabled=true] .mdc-radio__native-control+.mdc-radio__background .mdc-radio__inner-circle,.mdc-radio .mdc-radio__native-control:disabled+.mdc-radio__background .mdc-radio__inner-circle{border-color:var(--mdc-radio-disabled-color, rgba(0, 0, 0, 0.38))}`;

let Radio = class Radio extends RadioBase {
};
Radio.styles = [styles];
Radio = __decorate([
    customElement('mwc-radio')
], Radio);

export { Radio, SingleSelectionController };
