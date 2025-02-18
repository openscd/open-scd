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
  property,
  query,
  state
} from "../../../../_snowpack/pkg/lit-element.js";
import {nothing} from "../../../../_snowpack/pkg/lit-html.js";
import {classMap} from "../../../../_snowpack/pkg/lit-html/directives/class-map.js";
import {get} from "../../../../_snowpack/pkg/lit-translate.js";
import "../../../../_snowpack/pkg/@material/mwc-icon.js";
import "../../../../_snowpack/pkg/@material/mwc-list.js";
import "../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../../../../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js";
import "../../../../_snowpack/pkg/@material/mwc-menu.js";
import "../../../../_snowpack/pkg/@material/mwc-icon-button.js";
import {
  getDescriptionAttribute,
  getNameAttribute,
  identity,
  newWizardEvent
} from "../../../../openscd/src/foundation.js";
import {gooseIcon, smvIcon} from "../../../../openscd/src/icons/icons.js";
import {wizards} from "../../wizards/wizard-library.js";
import {
  getFcdaSubtitleValue,
  getFcdaTitleValue,
  newFcdaSelectEvent,
  styles
} from "./foundation.js";
import {getSubscribedExtRefElements} from "./later-binding/foundation.js";
export let FcdaBindingList = class extends LitElement {
  constructor() {
    super();
    this.editCount = -1;
    this.extRefCounters = new Map();
    this.iconControlLookup = {
      SampledValueControl: smvIcon,
      GSEControl: gooseIcon
    };
    this.resetSelection = this.resetSelection.bind(this);
    parent.addEventListener("open-doc", this.resetSelection);
    const parentDiv = this.closest(".container");
    if (parentDiv) {
      this.resetExtRefCount = this.resetExtRefCount.bind(this);
      parentDiv.addEventListener("subscription-changed", this.resetExtRefCount);
    }
  }
  get hideSubscribed() {
    return localStorage.getItem(`fcda-binding-list-${this.includeLaterBinding ? "later-binding" : "data-binding"}-${this.controlTag}$hideSubscribed`) === "true";
  }
  set hideSubscribed(value) {
    const oldValue = this.hideSubscribed;
    localStorage.setItem(`fcda-binding-list-${this.includeLaterBinding ? "later-binding" : "data-binding"}-${this.controlTag}$hideSubscribed`, `${value}`);
    this.requestUpdate("hideSubscribed", oldValue);
  }
  get hideNotSubscribed() {
    return localStorage.getItem(`fcda-binding-list-${this.includeLaterBinding ? "later-binding" : "data-binding"}-${this.controlTag}$hideNotSubscribed`) === "true";
  }
  set hideNotSubscribed(value) {
    const oldValue = this.hideNotSubscribed;
    localStorage.setItem(`fcda-binding-list-${this.includeLaterBinding ? "later-binding" : "data-binding"}-${this.controlTag}$hideNotSubscribed`, `${value}`);
    this.requestUpdate("hideNotSubscribed", oldValue);
  }
  getControlElements() {
    if (this.doc) {
      return Array.from(this.doc.querySelectorAll(`LN0 > ${this.controlTag}`));
    }
    return [];
  }
  getFcdaElements(controlElement) {
    const lnElement = controlElement.parentElement;
    if (lnElement) {
      return Array.from(lnElement.querySelectorAll(`:scope > DataSet[name=${controlElement.getAttribute("datSet")}] > FCDA`));
    }
    return [];
  }
  resetExtRefCount(event) {
    if (event.detail.control && event.detail.fcda) {
      const controlBlockFcdaId = `${identity(event.detail.control)} ${identity(event.detail.fcda)}`;
      this.extRefCounters.delete(controlBlockFcdaId);
    }
  }
  getExtRefCount(fcdaElement, controlElement) {
    const controlBlockFcdaId = `${identity(controlElement)} ${identity(fcdaElement)}`;
    if (!this.extRefCounters.has(controlBlockFcdaId)) {
      const extRefCount = getSubscribedExtRefElements(this.doc.getRootNode(), this.controlTag, fcdaElement, controlElement, this.includeLaterBinding).length;
      this.extRefCounters.set(controlBlockFcdaId, extRefCount);
    }
    return this.extRefCounters.get(controlBlockFcdaId);
  }
  openEditWizard(controlElement) {
    const wizard = wizards[this.controlTag].edit(controlElement);
    if (wizard)
      this.dispatchEvent(newWizardEvent(wizard));
  }
  resetSelection() {
    this.selectedControlElement = void 0;
    this.selectedFcdaElement = void 0;
  }
  onFcdaSelect(controlElement, fcdaElement) {
    this.resetSelection();
    this.selectedControlElement = controlElement;
    this.selectedFcdaElement = fcdaElement;
  }
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("doc") || _changedProperties.has("selectedControlElement") || _changedProperties.has("selectedFcdaElement")) {
      this.dispatchEvent(newFcdaSelectEvent(this.selectedControlElement, this.selectedFcdaElement));
    }
    if (_changedProperties.has("doc")) {
      this.extRefCounters = new Map();
    }
  }
  renderFCDA(controlElement, fcdaElement) {
    const fcdaCount = this.getExtRefCount(fcdaElement, controlElement);
    const filterClasses = {
      subitem: true,
      "show-subscribed": fcdaCount !== 0,
      "show-not-subscribed": fcdaCount === 0
    };
    return html`<mwc-list-item
      graphic="large"
      ?hasMeta=${fcdaCount !== 0}
      twoline
      class="${classMap(filterClasses)}"
      @click=${() => this.onFcdaSelect(controlElement, fcdaElement)}
      value="${identity(controlElement)}
             ${identity(fcdaElement)}"
    >
      <span>${getFcdaTitleValue(fcdaElement)}</span>
      <span slot="secondary">${getFcdaSubtitleValue(fcdaElement)}</span>
      <mwc-icon slot="graphic">subdirectory_arrow_right</mwc-icon>
      ${fcdaCount !== 0 ? html`<span slot="meta">${fcdaCount}</span>` : nothing}
    </mwc-list-item>`;
  }
  updateBaseFilterState() {
    !this.hideSubscribed ? this.controlBlockList.classList.add("show-subscribed") : this.controlBlockList.classList.remove("show-subscribed");
    !this.hideNotSubscribed ? this.controlBlockList.classList.add("show-not-subscribed") : this.controlBlockList.classList.remove("show-not-subscribed");
  }
  firstUpdated() {
    this.actionsMenu.anchor = this.actionsMenuIcon;
    this.actionsMenu.addEventListener("closed", () => {
      this.hideSubscribed = !this.actionsMenu.index.has(0);
      this.hideNotSubscribed = !this.actionsMenu.index.has(1);
      this.updateBaseFilterState();
    });
    this.updateBaseFilterState();
  }
  renderTitle() {
    const menuClasses = {
      "filter-off": this.hideSubscribed || this.hideNotSubscribed
    };
    return html`<h1>
      ${get(`subscription.${this.controlTag}.controlBlockList.title`)}
      <mwc-icon-button
        class="actions-menu-icon ${classMap(menuClasses)}"
        icon="filter_list"
        @click=${() => {
      if (!this.actionsMenu.open)
        this.actionsMenu.show();
      else
        this.actionsMenu.close();
    }}
      ></mwc-icon-button>
      <mwc-menu
        multi
        class="actions-menu"
        corner="BOTTOM_RIGHT"
        menuCorner="END"
      >
        <mwc-check-list-item
          class="filter-subscribed"
          left
          ?selected=${!this.hideSubscribed}
        >
          <span>${get("subscription.subscriber.subscribed")}</span>
        </mwc-check-list-item>
        <mwc-check-list-item
          class="filter-not-subscribed"
          left
          ?selected=${!this.hideNotSubscribed}
        >
          <span>${get("subscription.subscriber.notSubscribed")}</span>
        </mwc-check-list-item>
      </mwc-menu>
    </h1> `;
  }
  renderControls(controlElements) {
    return html`<filtered-list class="control-block-list" activatable>
      ${controlElements.filter((controlElement) => this.getFcdaElements(controlElement).length).map((controlElement) => {
      const fcdaElements = this.getFcdaElements(controlElement);
      const showSubscribed = fcdaElements.some((fcda) => this.getExtRefCount(fcda, controlElement) !== 0);
      const showNotSubscribed = fcdaElements.some((fcda) => this.getExtRefCount(fcda, controlElement) === 0);
      const filterClasses = {
        control: true,
        "show-subscribed": showSubscribed,
        "show-not-subscribed": showNotSubscribed
      };
      return html`
            <mwc-list-item
              noninteractive
              class="${classMap(filterClasses)}"
              graphic="icon"
              twoline
              hasMeta
              value="${identity(controlElement)}${fcdaElements.map((fcdaElement) => `
                        ${getFcdaTitleValue(fcdaElement)}
                        ${getFcdaSubtitleValue(fcdaElement)}
                        ${identity(fcdaElement)}`).join("")}"
            >
              <mwc-icon-button
                slot="meta"
                icon="edit"
                class="interactive"
                @click=${() => this.openEditWizard(controlElement)}
              ></mwc-icon-button>
              <span
                >${getNameAttribute(controlElement)}
                ${getDescriptionAttribute(controlElement) ? html`${getDescriptionAttribute(controlElement)}` : nothing}</span
              >
              <span slot="secondary">${identity(controlElement)}</span>
              <mwc-icon slot="graphic"
                >${this.iconControlLookup[this.controlTag]}</mwc-icon
              >
            </mwc-list-item>
            <li divider role="separator"></li>
            ${fcdaElements.map((fcdaElement) => this.renderFCDA(controlElement, fcdaElement))}
          `;
    })}
    </filtered-list>`;
  }
  render() {
    const controlElements = this.getControlElements();
    return html`<section tabindex="0">
      ${this.renderTitle()}
      ${controlElements ? this.renderControls(controlElements) : html`<h4>${get("subscription.subscriber.notSubscribed")}</h4> `}
    </section>`;
  }
};
FcdaBindingList.styles = css`
    ${styles}

    mwc-list-item.hidden[noninteractive] + li[divider] {
      display: none;
    }

    mwc-list-item {
      --mdc-list-item-meta-size: 48px;
    }

    section {
      position: relative;
    }

    .actions-menu-icon {
      float: right;
    }

    .actions-menu-icon.filter-off {
      color: var(--secondary);
      background-color: var(--mdc-theme-background);
    }

    /* Filtering rules for control blocks end up implementing logic to allow
    very fast CSS response. The following rules appear to be minimal but can be
    hard to understand intuitively for the multiple conditions. If modifying,
    it is suggested to create a truth-table to check for side-effects */

    /* remove all control blocks if no filters */
    filtered-list.control-block-list:not(.show-subscribed, .show-not-subscribed)
      mwc-list-item {
      display: none;
    }

    /* remove control blocks taking care to respect multiple conditions */
    filtered-list.control-block-list.show-not-subscribed:not(.show-subscribed)
      mwc-list-item.control.show-subscribed:not(.show-not-subscribed) {
      display: none;
    }

    filtered-list.control-block-list.show-subscribed:not(.show-not-subscribed)
      mwc-list-item.control.show-not-subscribed:not(.show-subscribed) {
      display: none;
    }

    /* remove fcdas if not part of filter */
    filtered-list.control-block-list:not(.show-not-subscribed)
      mwc-list-item.subitem.show-not-subscribed {
      display: none;
    }

    filtered-list.control-block-list:not(.show-subscribed)
      mwc-list-item.subitem.show-subscribed {
      display: none;
    }

    .interactive {
      pointer-events: all;
    }

    .subitem {
      padding-left: var(--mdc-list-side-padding, 16px);
    }
  `;
__decorate([
  property({attribute: false})
], FcdaBindingList.prototype, "doc", 2);
__decorate([
  property({type: Number})
], FcdaBindingList.prototype, "editCount", 2);
__decorate([
  property()
], FcdaBindingList.prototype, "controlTag", 2);
__decorate([
  property()
], FcdaBindingList.prototype, "includeLaterBinding", 2);
__decorate([
  state()
], FcdaBindingList.prototype, "selectedControlElement", 2);
__decorate([
  state()
], FcdaBindingList.prototype, "selectedFcdaElement", 2);
__decorate([
  state()
], FcdaBindingList.prototype, "extRefCounters", 2);
__decorate([
  property({
    type: Boolean,
    hasChanged() {
      return false;
    }
  })
], FcdaBindingList.prototype, "hideSubscribed", 1);
__decorate([
  property({
    type: Boolean,
    hasChanged() {
      return false;
    }
  })
], FcdaBindingList.prototype, "hideNotSubscribed", 1);
__decorate([
  query(".actions-menu")
], FcdaBindingList.prototype, "actionsMenu", 2);
__decorate([
  query(".actions-menu-icon")
], FcdaBindingList.prototype, "actionsMenuIcon", 2);
__decorate([
  query(".control-block-list")
], FcdaBindingList.prototype, "controlBlockList", 2);
FcdaBindingList = __decorate([
  customElement("fcda-binding-list")
], FcdaBindingList);
