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
  customElement,
  LitElement,
  property,
  html,
  css,
  state
} from "../../_snowpack/pkg/lit-element.js";
import {get} from "../../_snowpack/pkg/lit-translate.js";
import {renderDiff} from "./foundation/compare.js";
export let PlainCompareList = class extends LitElement {
  constructor() {
    super(...arguments);
    this.leftHandTitle = "";
    this.rightHandTitle = "";
    this.leftHandSubtitle = "";
    this.rightHandSubtitle = "";
    this.filterMutables = true;
  }
  render() {
    return html`
      ${this.renderFilterCheckbox()}
      <div class="container container--alt">
        <div class="list__container list__container--left">
          <h3 class="mdc-dialog__title">${this.leftHandTitle}</h3>
          ${this.leftHandSubtitle && this.leftHandSubtitle.length > 0 ? html`<h5 class="mdc-dialog__title">${this.leftHandSubtitle}</h5> ` : ""}
        </div>
        <div class="list__container">
          <h3 class="mdc-dialog__title">${this.rightHandTitle}</h3>
          ${this.rightHandSubtitle && this.rightHandSubtitle.length > 0 ? html`<h5 class="mdc-dialog__title">
                ${this.rightHandSubtitle}
              </h5> ` : ""}
        </div>
      </div>
      ${this.leftHandObject && this.rightHandObject ? html`
            ${renderDiff(this.rightHandObject, this.leftHandObject, this.filterMutables ? this.filterToIgnore : {})}
          ` : ""}
    `;
  }
  renderFilterCheckbox() {
    if (this.filterToIgnore) {
      return html`
        <div class="container">
          <div class="flex"></div>
          <mwc-formfield label="${get("compare.filterMutables")}">
            <mwc-checkbox
              ?checked=${this.filterMutables}
              @change=${() => this.filterMutables = !this.filterMutables}
            >
            </mwc-checkbox>
          </mwc-formfield>
        </div>
      `;
    }
    return html``;
  }
};
PlainCompareList.styles = css`
    mwc-list-item {
      --mdc-list-item-graphic-margin: 0;
    }

    .mdc-dialog__title {
      padding: 0 16px;
    }

    .container {
      display: flex;
      gap: 4px;
    }

    .container--alt {
      background: var(--base2);
    }

    .list__container {
      width: 50%;
      background: var(--base3);
    }
    .list__container--left {
      text-align: right;
    }
    .flex {
      flex: 1;
    }

    mwc-list-item[right] {
      text-align: right;
      direction: rtl;
    }
  `;
__decorate([
  property({type: String})
], PlainCompareList.prototype, "leftHandTitle", 2);
__decorate([
  property({type: String})
], PlainCompareList.prototype, "rightHandTitle", 2);
__decorate([
  property({type: Object})
], PlainCompareList.prototype, "leftHandObject", 2);
__decorate([
  property({type: Object})
], PlainCompareList.prototype, "rightHandObject", 2);
__decorate([
  property({type: Object})
], PlainCompareList.prototype, "filterToIgnore", 2);
__decorate([
  property({type: String})
], PlainCompareList.prototype, "leftHandSubtitle", 2);
__decorate([
  property({type: String})
], PlainCompareList.prototype, "rightHandSubtitle", 2);
__decorate([
  state()
], PlainCompareList.prototype, "filterMutables", 2);
PlainCompareList = __decorate([
  customElement("plain-compare-list")
], PlainCompareList);
