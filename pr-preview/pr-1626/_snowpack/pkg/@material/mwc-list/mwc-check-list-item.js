import { e as __decorate } from '../../common/tslib.es6-52cb4f42.js';
import { q as query, p as property, b as customElement } from '../../common/lit-element-39cf9538.js';
import '../mwc-checkbox.js';
import { c as classMap } from '../../common/class-map-a3c1fa78.js';
import { L as ListItemBase, s as styles } from '../../common/mwc-list-item.css-61a0d314.js';
import { h as html } from '../../common/lit-html-487c1dfc.js';
import { s as styles$1 } from '../../common/mwc-control-list-item.css-07a7085d.js';
import '../../common/render-d4c46927.js';
import '../../common/ripple-handlers-8ff759ce.js';
import '../../common/ponyfill-44e20603.js';
import '../../common/base-element-2666facd.js';
import '../../common/foundation-20340859.js';
import '../../common/foundation-7cea7f4a.js';
import '../../common/style-map-1aebedfa.js';
import '../../common/aria-property-2938771c.js';
import '../../common/form-element-d369d042.js';
import '../../common/if-defined-0ab9be10.js';
import '../../common/observer-6d1a3681.js';

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
class CheckListItemBase extends ListItemBase {
    constructor() {
        super(...arguments);
        this.left = false;
        this.graphic = 'control';
    }
    render() {
        const checkboxClasses = {
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
      <span class=${classMap(checkboxClasses)}>
        <mwc-checkbox
            reducedTouchTarget
            tabindex=${this.tabindex}
            .checked=${this.selected}
            ?disabled=${this.disabled}
            @change=${this.onChange}>
        </mwc-checkbox>
      </span>
      ${this.left ? text : ''}
      ${meta}`;
    }
    async onChange(evt) {
        const checkbox = evt.target;
        const changeFromProp = this.selected === checkbox.checked;
        if (!changeFromProp) {
            this._skipPropRequest = true;
            this.selected = checkbox.checked;
            await this.updateComplete;
            this._skipPropRequest = false;
        }
    }
}
__decorate([
    query('slot')
], CheckListItemBase.prototype, "slotElement", void 0);
__decorate([
    query('mwc-checkbox')
], CheckListItemBase.prototype, "checkboxElement", void 0);
__decorate([
    property({ type: Boolean })
], CheckListItemBase.prototype, "left", void 0);
__decorate([
    property({ type: String, reflect: true })
], CheckListItemBase.prototype, "graphic", void 0);

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let CheckListItem = class CheckListItem extends CheckListItemBase {
};
CheckListItem.styles = [styles, styles$1];
CheckListItem = __decorate([
    customElement('mwc-check-list-item')
], CheckListItem);

export { CheckListItem };
