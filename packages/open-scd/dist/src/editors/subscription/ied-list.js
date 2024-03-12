import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { translate } from 'lit-translate';
import '@material/mwc-icon';
import '@material/mwc-list/mwc-list-item';
import '../../filtered-list.js';
import { getNameAttribute } from '../../foundation.js';
import { getOrderedIeds, newIEDSelectEvent, styles } from './foundation.js';
let selectedIed;
function onOpenDocResetSelectedGooseMsg() {
    selectedIed = undefined;
}
addEventListener('open-doc', onOpenDocResetSelectedGooseMsg);
let IedList = class IedList extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
    }
    onIedSelect(element) {
        selectedIed = element;
        this.dispatchEvent(newIEDSelectEvent(selectedIed));
    }
    updated() {
        this.dispatchEvent(newIEDSelectEvent(selectedIed));
    }
    firstUpdated() {
        selectedIed = undefined;
    }
    render() {
        return html ` <section tabindex="0">
      <h1>
        ${translate(`subscription.${this.serviceType}.subscriber.iedListTitle`)}
      </h1>
      <filtered-list activatable>
        ${getOrderedIeds(this.doc).map(ied => html `
              <mwc-list-item
                @click=${() => this.onIedSelect(ied)}
                graphic="icon"
              >
                <span>${getNameAttribute(ied)}</span>
                <mwc-icon slot="graphic">developer_board</mwc-icon>
              </mwc-list-item>
            `)}
      </filtered-list>
    </section>`;
    }
};
IedList.styles = css `
    ${styles}
  `;
__decorate([
    property()
], IedList.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], IedList.prototype, "editCount", void 0);
__decorate([
    property({ type: String })
], IedList.prototype, "serviceType", void 0);
IedList = __decorate([
    customElement('ied-list')
], IedList);
export { IedList };
//# sourceMappingURL=ied-list.js.map