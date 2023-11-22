import { BaseElement } from './base-element.js';
export { BaseElement } from './base-element.js';
export { addHasRemoveClass } from './utils.js';
import '../../lit-element.js';
import '../../common/shady-render-0818322f.js';
import '../../common/lit-html-1055e278.js';

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

export { FormElement };
