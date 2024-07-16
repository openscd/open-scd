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
import {get} from "../../../../_snowpack/pkg/lit-translate.js";
import "../../../../_snowpack/pkg/@material/mwc-button.js";
import "../../../../_snowpack/pkg/@material/mwc-icon.js";
import "../../../../_snowpack/pkg/@material/mwc-icon-button-toggle.js";
import "../../../../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js";
import "../../../../_snowpack/pkg/@material/mwc-checkbox.js";
import "../../../../openscd/src/filtered-list.js";
import {editDataSetWizard} from "../../wizards/dataset.js";
import {styles} from "../templates/foundation.js";
import {
  identity,
  isPublic,
  newSubWizardEvent
} from "../../../../openscd/src/foundation.js";
import {newActionEvent} from "../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js";
import {cleanSCLItems, identitySort} from "./foundation.js";
export let CleanupDatasets = class extends LitElement {
  constructor() {
    super(...arguments);
    this.disableDataSetClean = false;
    this.unreferencedDataSets = [];
    this.selectedDatasetItems = [];
  }
  async firstUpdated() {
    this.dataSetList?.addEventListener("selected", () => {
      this.selectedDatasetItems = this.dataSetList.index;
    });
  }
  renderListItem(dataSet) {
    return html` <mwc-check-list-item
      twoline
      class="checkListItem"
      value="${identity(dataSet)}"
      ><span class="unreferencedDataSet"
        >${dataSet.getAttribute("name")}
      </span>
      <span>
        <mwc-icon-button
          label="Edit"
          icon="edit"
          class="editUnreferencedDataSet editItem"
          @click=${(e) => {
      e.stopPropagation();
      e.target?.dispatchEvent(newSubWizardEvent(() => editDataSetWizard(dataSet)));
    }}
        ></mwc-icon-button>
      </span>
      <span slot="secondary"
        >${dataSet.closest("IED")?.getAttribute("name")}
        (${dataSet.closest("IED")?.getAttribute("manufacturer") ?? "No manufacturer defined"})
        -
        ${dataSet.closest("IED")?.getAttribute("type") ?? "No Type Defined"}</span
      >
    </mwc-check-list-item>`;
  }
  renderDeleteButton() {
    const sizeSelectedItems = this.selectedDatasetItems.size;
    return html` <mwc-button
      outlined
      icon="delete"
      class="deleteButton cleanupDeleteButton"
      label="${get("cleanup.unreferencedDataSets.deleteButton")} (${sizeSelectedItems || "0"})"
      ?disabled=${this.selectedDatasetItems.size === 0 || Array.isArray(this.selectedDatasetItems) && !this.selectedDatasetItems.length}
      @click=${(e) => {
      const cleanItems = Array.from(this.selectedDatasetItems.values()).map((index) => this.unreferencedDataSets[index]);
      const deleteActions = cleanSCLItems(cleanItems);
      deleteActions.forEach((deleteAction) => e.target?.dispatchEvent(newActionEvent(deleteAction)));
      this.dataSetItems.forEach((item) => {
        item.selected = false;
      });
    }}
    ></mwc-button>`;
  }
  renderUnreferencedDataSets() {
    const unreferencedDataSets = [];
    Array.from(this.doc?.querySelectorAll("DataSet") ?? []).filter(isPublic).forEach((dataSet) => {
      const parent = dataSet.parentElement;
      const name = dataSet.getAttribute("name");
      const isReferenced = Array.from(parent?.querySelectorAll("GSEControl, ReportControl, SampledValueControl, LogControl") ?? []).some((cb) => cb.getAttribute("datSet") === name);
      if (parent && (!name || !isReferenced))
        unreferencedDataSets.push(dataSet);
    });
    this.unreferencedDataSets = identitySort(unreferencedDataSets);
    return html`
      <div>
        <h1>
          ${get("cleanup.unreferencedDataSets.title")}
          (${unreferencedDataSets.length})
          <abbr slot="action">
            <mwc-icon-button
              icon="info"
              title="${get("cleanup.unreferencedDataSets.tooltip")}"
            >
            </mwc-icon-button>
          </abbr>
        </h1>
        <filtered-list multi class="dataSetList"
          >${Array.from(this.unreferencedDataSets.map((item) => html`${this.renderListItem(item)}`))}
        </filtered-list>
      </div>
      <footer>${this.renderDeleteButton()}</footer>
    `;
  }
  render() {
    return html`
      <section tabindex="0">${this.renderUnreferencedDataSets()}</section>
    `;
  }
};
CleanupDatasets.styles = css`
    ${styles}

    section {
      flex: 1;
      display: flex;
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

    .editItem {
      --mdc-icon-size: 16px;
    }

    .editItem {
      visibility: hidden;
      opacity: 0;
    }

    .checkListItem:hover .editItem {
      visibility: visible;
      opacity: 1;
      transition: visibility 0s, opacity 0.5s linear;
    }

    .cleanupDeleteButton {
      float: right;
    }

    footer {
      margin: 16px;
      display: flex;
      flex-flow: row wrap;
      flex-direction: row-reverse;
      justify-content: space-between;
      align-items: center;
      align-content: center;
    }

    filtered-list {
      max-height: 70vh;
      min-height: 20vh;
      overflow-y: scroll;
    }
  `;
__decorate([
  property({attribute: false})
], CleanupDatasets.prototype, "doc", 2);
__decorate([
  property({type: Boolean})
], CleanupDatasets.prototype, "disableDataSetClean", 2);
__decorate([
  property({type: Array})
], CleanupDatasets.prototype, "unreferencedDataSets", 2);
__decorate([
  property({attribute: false})
], CleanupDatasets.prototype, "selectedDatasetItems", 2);
__decorate([
  query(".deleteButton")
], CleanupDatasets.prototype, "cleanupButton", 2);
__decorate([
  query(".dataSetList")
], CleanupDatasets.prototype, "dataSetList", 2);
__decorate([
  queryAll("mwc-check-list-item.checkListItem")
], CleanupDatasets.prototype, "dataSetItems", 2);
CleanupDatasets = __decorate([
  customElement("cleanup-datasets")
], CleanupDatasets);
