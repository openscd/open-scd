import { e as __decorate } from '../common/tslib.es6-9ee6b4ed.js';
import { s as styles } from '../common/mwc-top-app-bar.css-30accffe.js';
import { customElement } from '../lit-element.js';
import { T as TopAppBarBase } from '../common/mwc-top-app-bar-base-01985ee5.js';
import { p as passiveEventOptionsIfSupported } from '../common/mwc-top-app-bar-base-base-07cc0d9a.js';
import { M as MDCFixedTopAppBarFoundation } from '../common/foundation-d333f30d.js';
import '../common/shady-render-0818322f.js';
import '../common/lit-html-1055e278.js';
import '../common/foundation-1dbaa5e4.js';
import './top-app-bar/constants.js';
import './top-app-bar/foundation.js';
import './base/foundation.js';
import './mwc-base/base-element.js';
import './mwc-base/utils.js';
import '../lit-html/directives/class-map.js';

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class TopAppBarFixedBase extends TopAppBarBase {
    constructor() {
        super(...arguments);
        this.mdcFoundationClass = MDCFixedTopAppBarFoundation;
    }
    barClasses() {
        return Object.assign(Object.assign({}, super.barClasses()), { 'mdc-top-app-bar--fixed': true });
    }
    registerListeners() {
        this.scrollTarget.addEventListener('scroll', this.handleTargetScroll, passiveEventOptionsIfSupported);
    }
    unregisterListeners() {
        this.scrollTarget.removeEventListener('scroll', this.handleTargetScroll);
    }
}

let TopAppBarFixed = class TopAppBarFixed extends TopAppBarFixedBase {
};
TopAppBarFixed.styles = [styles];
TopAppBarFixed = __decorate([
    customElement('mwc-top-app-bar-fixed')
], TopAppBarFixed);

export { TopAppBarFixed };
