import { e as __decorate } from '../common/tslib.es6-52cb4f42.js';
import { c as css, L as LitElement, b as customElement } from '../common/lit-element-05157a0d.js';
import { h as html } from '../common/lit-html-e07bf80b.js';
import '../common/render-ab1aa234.js';

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-LIcense-Identifier: Apache-2.0
 */
const styles = css `:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-moz-osx-font-smoothing:grayscale;font-feature-settings:"liga"}`;

/** @soyCompatible */
let Icon = class Icon extends LitElement {
    /** @soyTemplate */
    render() {
        return html `<slot></slot>`;
    }
};
Icon.styles = [styles];
Icon = __decorate([
    customElement('mwc-icon')
], Icon);

export { Icon };
