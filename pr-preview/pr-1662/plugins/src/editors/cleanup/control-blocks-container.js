"use strict";
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
  css,
  html,
  LitElement,
  property,
  query,
  queryAll
} from "../../../../_snowpack/pkg/lit-element.js";
import {classMap} from "../../../../_snowpack/pkg/lit-html/directives/class-map.js";
import {get} from "../../../../_snowpack/pkg/lit-translate.js";
import "../../../../_snowpack/pkg/@material/mwc-button.js";
import "../../../../_snowpack/pkg/@material/mwc-icon.js";
import "../../../../_snowpack/pkg/@material/mwc-icon-button-toggle.js";
import "../../../../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js";
import "../../../../_snowpack/pkg/@material/mwc-checkbox.js";
import "../../../../openscd/src/filtered-list.js";
import {
  identity,
  isPublic,
  newSubWizardEvent
} from "../../../../openscd/src/foundation.js";
import {newActionEvent} from "../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js";
import {styles} from "../templates/foundation.js";
import {
  controlBlockIcons,
  getFilterIcon
} from "../../../../openscd/src/icons/icons.js";
import {editGseControlWizard, getGSE} from "../../wizards/gsecontrol.js";
import {editReportControlWizard} from "../../wizards/reportcontrol.js";
import {
  editSampledValueControlWizard,
  getSMV
} from "../../wizards/sampledvaluecontrol.js";
import {cleanSCLItems, identitySort} from "./foundation.js";
const iconMapping = {
  GSEControl: "gooseIcon",
  LogControl: "logIcon",
  SampledValueControl: "smvIcon",
  ReportControl: "reportIcon"
};
function getCommAddress(controlBlock) {
  if (controlBlock.tagName === "GSEControl") {
    return getGSE(controlBlock);
  } else if (controlBlock.tagName === "SampledValueControl") {
    return getSMV(controlBlock);
  }
  return null;
}
export let CleanupControlBlocks = class extends LitElement {
  constructor() {
    super(...arguments);
    this.disableControlClean = false;
    this.unreferencedControls = [];
    this.selectedControlItems = [];
  }
  toggleHiddenClass(selectorType) {
    this.cleanupList.querySelectorAll(`.${selectorType}`).forEach((element) => {
      element.classList.toggle("hiddenontypefilter");
      if (element.hasAttribute("disabled"))
        element.removeAttribute("disabled");
      else
        element.setAttribute("disabled", "true");
    });
  }
  async firstUpdated() {
    this.cleanupList?.addEventListener("selected", () => {
      this.selectedControlItems = this.cleanupList.index;
    });
    this.toggleHiddenClass("tReportControl");
  }
  renderFilterIconButton(controlType, initialState = true) {
    return html`<mwc-icon-button-toggle
      slot="graphic"
      label="filter"
      ?on=${initialState}
      class="t${controlType}Filter"
      @click="${(e) => {
      e.stopPropagation();
      this.toggleHiddenClass(`t${controlType}`);
    }}"
      >${getFilterIcon(iconMapping[controlType], true)}
      ${getFilterIcon(iconMapping[controlType], false)}
    </mwc-icon-button-toggle> `;
  }
  renderListItem(controlBlock) {
    return html`<mwc-check-list-item
      twoline
      class="${classMap({
      cleanupListItem: true,
      tReportControl: controlBlock.tagName === "ReportControl",
      tLogControl: controlBlock.tagName === "LogControl",
      tGSEControl: controlBlock.tagName === "GSEControl",
      tSampledValueControl: controlBlock.tagName === "SampledValueControl"
    })}"
      value="${identity(controlBlock)}"
      graphic="large"
      ><span class="unreferencedControl"
        >${controlBlock.getAttribute("name")}
      </span>
      <span>
        <mwc-icon-button
          label="warning"
          icon="warning_amber"
          class="cautionItem"
          title="${get("cleanup.unreferencedControls.addressDefinitionTooltip")}"
          ?disabled="${!(getCommAddress(controlBlock) !== null)}"
        >
        </mwc-icon-button>
      </span>
      <span>
        <mwc-icon-button
          label="Edit"
          icon="edit"
          class="editItem"
          ?disabled="${controlBlock.tagName === "LogControl"}"
          @click=${(e) => {
      e.stopPropagation();
      if (controlBlock.tagName === "GSEControl") {
        e.target?.dispatchEvent(newSubWizardEvent(editGseControlWizard(controlBlock)));
      } else if (controlBlock.tagName === "ReportControl") {
        e.target?.dispatchEvent(newSubWizardEvent(editReportControlWizard(controlBlock)));
      } else if (controlBlock.tagName === "SampledValueControl") {
        e.target?.dispatchEvent(newSubWizardEvent(editSampledValueControlWizard(controlBlock)));
      } else if (controlBlock.tagName === "LogControl") {
      }
    }}
        ></mwc-icon-button>
      </span>
      <span slot="secondary"
        >${controlBlock.tagName} -
        ${controlBlock.closest("IED")?.getAttribute("name")}
        (${controlBlock.closest("IED")?.getAttribute("manufacturer") ?? "No manufacturer defined"})
        -
        ${controlBlock.closest("IED")?.getAttribute("type") ?? "No Type Defined"}</span
      >
      <mwc-icon slot="graphic"
        >${controlBlockIcons[controlBlock.tagName]}</mwc-icon
      >
    </mwc-check-list-item>`;
  }
  renderDeleteButton() {
    const sizeSelectedItems = this.selectedControlItems.size;
    return html`<mwc-button
      outlined
      icon="delete"
      class="deleteButton"
      label="${get("cleanup.unreferencedControls.deleteButton")} (${sizeSelectedItems || "0"})"
      ?disabled=${this.selectedControlItems.size === 0 || Array.isArray(this.selectedControlItems) && !this.selectedControlItems.length}
      @click=${(e) => {
      const cleanItems = Array.from(this.selectedControlItems.values()).map((index) => this.unreferencedControls[index]);
      let gseSmvAddressItems = [];
      if (this.cleanupAddressCheckbox.checked === true) {
        gseSmvAddressItems = cleanSCLItems(cleanItems.map((cb) => getCommAddress(cb)).filter(Boolean));
      }
      const gseSmvLogReportDeleteActions = cleanSCLItems(cleanItems).concat(gseSmvAddressItems);
      gseSmvLogReportDeleteActions.forEach((deleteAction) => e.target?.dispatchEvent(newActionEvent(deleteAction)));
      this.cleanupListItems.forEach((item) => {
        item.selected = false;
      });
    }}
    ></mwc-button>`;
  }
  renderUnreferencedControls() {
    const unreferencedCBs = [];
    Array.from(this.doc?.querySelectorAll("GSEControl, ReportControl, SampledValueControl, LogControl") ?? []).filter(isPublic).forEach((cb) => {
      const parent = cb.parentElement;
      const name = cb.getAttribute("datSet");
      const isReferenced = parent?.querySelector(`DataSet[name="${name}"]`);
      if (parent && (!name || !isReferenced))
        unreferencedCBs.push(cb);
    });
    this.unreferencedControls = identitySort(unreferencedCBs);
    return html`
      <div>
        <h1>
          ${get("cleanup.unreferencedControls.title")}
          (${unreferencedCBs.length})
          <abbr slot="action">
            <mwc-icon-button
              icon="info"
              title="${get("cleanup.unreferencedControls.tooltip")}"
            >
            </mwc-icon-button>
          </abbr>
        </h1>
        ${this.renderFilterIconButton("LogControl")}
        ${this.renderFilterIconButton("ReportControl", false)}
        ${this.renderFilterIconButton("GSEControl")}
        ${this.renderFilterIconButton("SampledValueControl")}
        <filtered-list multi class="cleanupList"
          >${Array.from(unreferencedCBs.map((cb) => this.renderListItem(cb)))}
        </filtered-list>
      </div>
      <footer>
        ${this.renderDeleteButton()}
        <mwc-formfield
          class="removeFromCommunication"
          label="${get("cleanup.unreferencedControls.alsoRemoveFromCommunication")}"
        >
          <mwc-checkbox
            checked
            class="cleanupAddressCheckbox"
            ?disabled=${this.selectedControlItems.size === 0 || Array.isArray(this.selectedControlItems) && !this.selectedControlItems.length}
          ></mwc-checkbox
        ></mwc-formfield>
      </footer>
    `;
  }
  render() {
    return html`
      <section tabindex="1">${this.renderUnreferencedControls()}</section>
    `;
  }
};
CleanupControlBlocks.styles = css`
    ${styles}

    section {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;
    }

    @media (max-width: 1200px) {
      footer {
        flex-direction: row;
      }

      mwc-check-list-item {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .editItem,
    .cautionItem {
      --mdc-icon-size: 16px;
    }

    .editItem {
      visibility: hidden;
      opacity: 0;
    }

    .cleanupListItem:hover .editItem {
      visibility: visible;
      opacity: 1;
      transition: visibility 0s, opacity 0.5s linear;
    }

    .cautionItem {
      color: var(--yellow);
    }

    .cautionItem[disabled],
    .editItem[disabled] {
      display: none;
    }

    .deleteButton {
      float: right;
    }

    footer {
      align-items: center;
      align-content: center;
      display: flex;
      flex-flow: row wrap;
      flex-direction: row-reverse;
      justify-content: space-between;
      margin: 16px;
    }

    filtered-list {
      min-height: 20vh;
      overflow-y: scroll;
    }

    .tGSEControlFilter[on],
    .tSampledValueControlFilter[on],
    .tLogControlFilter[on],
    .tReportControlFilter[on] {
      color: var(--secondary);
      opacity: 1;
    }

    /* Make sure to type filter here
    .hidden is set on string filter in filtered-list and must always filter*/
    .cleanupListItem.hiddenontypefilter:not(.hidden) {
      display: none;
    }

    /* filter disabled, Material Design guidelines for opacity */
    .tGSEControlFilter,
    .tSampledValueControlFilter,
    .tLogControlFilter,
    .tReportControlFilter {
      opacity: 0.38;
    }
  `;
__decorate([
  property({attribute: false})
], CleanupControlBlocks.prototype, "doc", 2);
__decorate([
  property({type: Boolean})
], CleanupControlBlocks.prototype, "disableControlClean", 2);
__decorate([
  property({type: Array})
], CleanupControlBlocks.prototype, "unreferencedControls", 2);
__decorate([
  property({attribute: false})
], CleanupControlBlocks.prototype, "selectedControlItems", 2);
__decorate([
  query(".deleteButton")
], CleanupControlBlocks.prototype, "cleanButton", 2);
__decorate([
  query(".cleanupList")
], CleanupControlBlocks.prototype, "cleanupList", 2);
__decorate([
  queryAll("mwc-check-list-item.cleanupListItem")
], CleanupControlBlocks.prototype, "cleanupListItems", 2);
__decorate([
  query(".cleanupAddressCheckbox")
], CleanupControlBlocks.prototype, "cleanupAddressCheckbox", 2);
__decorate([
  query(".tGSEControlFilter")
], CleanupControlBlocks.prototype, "cleanupGSEControlFilter", 2);
__decorate([
  query(".tSampledValueControlFilter")
], CleanupControlBlocks.prototype, "cleanupSampledValueControlFilter", 2);
__decorate([
  query(".tLogControlFilter")
], CleanupControlBlocks.prototype, "cleanupLogControlFilter", 2);
__decorate([
  query(".tReportControlFilter")
], CleanupControlBlocks.prototype, "cleanupReportControlFilter", 2);
CleanupControlBlocks = __decorate([
  customElement("cleanup-control-blocks")
], CleanupControlBlocks);
