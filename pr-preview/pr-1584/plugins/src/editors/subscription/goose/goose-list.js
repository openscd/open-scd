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
} from "../../../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../../../_snowpack/pkg/lit-translate.js";
import {classMap} from "../../../../../_snowpack/pkg/lit-html/directives/class-map.js";
import "../../../../../_snowpack/pkg/@material/mwc-icon.js";
import "../../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../../../../../openscd/src/filtered-list.js";
import {
  getNameAttribute,
  identity,
  newWizardEvent
} from "../../../../../openscd/src/foundation.js";
import {newGOOSESelectEvent} from "./foundation.js";
import {gooseIcon} from "../../../../../openscd/src/icons/icons.js";
import {wizards} from "../../../wizards/wizard-library.js";
import {getOrderedIeds, styles} from "../foundation.js";
let selectedGseControl;
let selectedDataSet;
function onOpenDocResetSelectedGooseMsg() {
  selectedGseControl = void 0;
  selectedDataSet = void 0;
}
addEventListener("open-doc", onOpenDocResetSelectedGooseMsg);
export let GooseList = class extends LitElement {
  constructor() {
    super(...arguments);
    this.editCount = -1;
  }
  onSelect(gseControl) {
    if (gseControl == selectedGseControl)
      return;
    const ln = gseControl.parentElement;
    const dataset = ln?.querySelector(`DataSet[name=${gseControl.getAttribute("datSet")}]`);
    selectedGseControl = gseControl;
    selectedDataSet = dataset;
    this.dispatchEvent(newGOOSESelectEvent(selectedGseControl, selectedDataSet));
    this.requestUpdate();
  }
  renderGoose(gseControl) {
    return html`<mwc-list-item
      @click=${() => this.onSelect(gseControl)}
      graphic="large"
      hasMeta
      value="${identity(gseControl)}"
    >
      <mwc-icon slot="graphic">${gooseIcon}</mwc-icon>
      <span>${gseControl.getAttribute("name")}</span>
      <mwc-icon-button
        class="${classMap({
      hidden: gseControl !== selectedGseControl
    })}"
        slot="meta"
        icon="edit"
        @click=${() => this.openEditWizard(gseControl)}
      ></mwc-icon-button>
    </mwc-list-item>`;
  }
  openEditWizard(gseControl) {
    const wizard = wizards["GSEControl"].edit(gseControl);
    if (wizard)
      this.dispatchEvent(newWizardEvent(wizard));
  }
  updated() {
    this.dispatchEvent(newGOOSESelectEvent(selectedGseControl, selectedDataSet ?? void 0));
  }
  firstUpdated() {
    selectedGseControl = void 0;
    selectedDataSet = void 0;
  }
  render() {
    return html` <section tabindex="0">
      <h1>${get("subscription.goose.publisher.title")}</h1>
      <filtered-list activatable>
        ${getOrderedIeds(this.doc).map((ied) => html`
              <mwc-list-item
                noninteractive
                graphic="icon"
                value="${Array.from(ied.querySelectorAll("GSEControl")).filter((cb) => cb.hasAttribute("datSet")).map((element) => {
      const id = identity(element);
      return typeof id === "string" ? id : "";
    }).join(" ")}"
              >
                <span>${getNameAttribute(ied)}</span>
                <mwc-icon slot="graphic">developer_board</mwc-icon>
              </mwc-list-item>
              <li divider role="separator"></li>
              ${Array.from(ied.querySelectorAll(":scope > AccessPoint > Server > LDevice > LN0 > GSEControl")).filter((cb) => cb.hasAttribute("datSet")).map((control) => this.renderGoose(control))}
            `)}
      </filtered-list>
    </section>`;
  }
};
GooseList.styles = css`
    ${styles}

    mwc-list-item {
      --mdc-list-item-meta-size: 48px;
    }

    mwc-icon-button.hidden {
      display: none;
    }

    mwc-list-item.hidden[noninteractive] + li[divider] {
      display: none;
    }
  `;
__decorate([
  property({attribute: false})
], GooseList.prototype, "doc", 2);
__decorate([
  property({type: Number})
], GooseList.prototype, "editCount", 2);
GooseList = __decorate([
  customElement("goose-list")
], GooseList);
