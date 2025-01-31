import { B as BaseElement } from './base-element-338757e6.js';

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
/** @soyCompatible */
class FormElement extends BaseElement {
    click() {
        if (this.formElement) {
            this.formElement.focus();
            this.formElement.click();
        }
    }
    setAriaLabel(label) {
        if (this.formElement) {
            this.formElement.setAttribute('aria-label', label);
        }
    }
    firstUpdated() {
        super.firstUpdated();
        if (this.shadowRoot) {
            this.mdcRoot.addEventListener('change', (e) => {
                this.dispatchEvent(new Event('change', e));
            });
        }
    }
}
FormElement.shadowRootOptions = { mode: 'open', delegatesFocus: true };

export { FormElement as F };
