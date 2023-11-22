import { e as __decorate } from '../../common/tslib.es6-9ee6b4ed.js';
import { query, property, customElement } from '../../lit-element.js';
import { s as styles$1 } from '../../common/mwc-control-list-item.css-73d5f51a.js';
import { L as ListItemBase, s as styles } from '../../common/mwc-list-item.css-37f3f912.js';
import '../mwc-radio.js';
import { classMap } from '../../lit-html/directives/class-map.js';
import { ifDefined } from '../../lit-html/directives/if-defined.js';
import { h as html } from '../../common/lit-html-1055e278.js';
import '../../common/shady-render-0818322f.js';
import '../mwc-ripple/mwc-ripple.js';
import '../../common/ponyfill-4ccc5f83.js';
import '../mwc-base/base-element.js';
import '../mwc-base/utils.js';
import '../../common/foundation-e5232dca.js';
import '../base/foundation.js';
import '../../common/style-map-b4ce5013.js';
import '../mwc-base/observer.js';
import '../mwc-ripple/ripple-handlers.js';
import '../../common/aria-property-c2d6d3d3.js';
import '../mwc-base/form-element.js';
import '../../common/foundation-9f5bcf84.js';

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class RadioListItemBase extends ListItemBase {
    constructor() {
        super(...arguments);
        this.left = false;
        this.graphic = 'control';
        this._changeFromClick = false;
    }
    render() {
        const radioClasses = {
            'mdc-deprecated-list-item__graphic': this.left,
            'mdc-deprecated-list-item__meta': !this.left,
        };
        const text = this.renderText();
        const graphic = this.graphic && this.graphic !== 'control' && !this.left ?
            this.renderGraphic() :
            html ``;
        const meta = this.hasMeta && this.left ? this.renderMeta() : html ``;
        const ripple = this.renderRipple();
        return html `
      ${ripple}
      ${graphic}
      ${this.left ? '' : text}
      <mwc-radio
          global
          class=${classMap(radioClasses)}
          tabindex=${this.tabindex}
          name=${ifDefined(this.group === null ? undefined : this.group)}
          .checked=${this.selected}
          ?disabled=${this.disabled}
          @checked=${this.onChange}>
      </mwc-radio>
      ${this.left ? text : ''}
      ${meta}`;
    }
    onClick() {
        this._changeFromClick = true;
        super.onClick();
    }
    async onChange(evt) {
        const checkbox = evt.target;
        const changeFromProp = this.selected === checkbox.checked;
        if (!changeFromProp) {
            this._skipPropRequest = true;
            this.selected = checkbox.checked;
            await this.updateComplete;
            this._skipPropRequest = false;
            if (!this._changeFromClick) {
                this.fireRequestSelected(this.selected, 'interaction');
            }
        }
        this._changeFromClick = false;
    }
}
__decorate([
    query('slot')
], RadioListItemBase.prototype, "slotElement", void 0);
__decorate([
    query('mwc-radio')
], RadioListItemBase.prototype, "radioElement", void 0);
__decorate([
    property({ type: Boolean })
], RadioListItemBase.prototype, "left", void 0);
__decorate([
    property({ type: String, reflect: true })
], RadioListItemBase.prototype, "graphic", void 0);

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let RadioListItem = class RadioListItem extends RadioListItemBase {
};
RadioListItem.styles = [styles, styles$1];
RadioListItem = __decorate([
    customElement('mwc-radio-list-item')
], RadioListItem);

export { RadioListItem };
