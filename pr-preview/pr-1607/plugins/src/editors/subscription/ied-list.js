var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {
  css,
  customElement,
  html,
  LitElement,
  property
} from "../../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../../_snowpack/pkg/lit-translate.js";
import "../../../../_snowpack/pkg/@material/mwc-icon.js";
import "../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../../../../openscd/src/filtered-list.js";
import {getNameAttribute} from "../../../../openscd/src/foundation.js";
import {getOrderedIeds, newIEDSelectEvent, styles} from "./foundation.js";
let selectedIed;
function onOpenDocResetSelectedGooseMsg() {
  selectedIed = void 0;
}
addEventListener("open-doc", onOpenDocResetSelectedGooseMsg);
export let IedList = class extends LitElement {
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
    selectedIed = void 0;
  }
  render() {
    return html` <section tabindex="0">
      <h1>
        ${get(`subscription.${this.serviceType}.subscriber.iedListTitle`)}
      </h1>
      <filtered-list activatable>
        ${getOrderedIeds(this.doc).map((ied) => html`
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
IedList.styles = css`
    ${styles}
  `;
__decorate([
  property()
], IedList.prototype, "doc", 2);
__decorate([
  property({type: Number})
], IedList.prototype, "editCount", 2);
__decorate([
  property({type: String})
], IedList.prototype, "serviceType", 2);
IedList = __decorate([
  customElement("ied-list")
], IedList);
