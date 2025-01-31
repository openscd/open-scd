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
import {newLogEvent} from "../../../../_snowpack/link/packages/core/dist/foundation/deprecated/history.js";
import {styles} from "../templates/foundation.js";
import {
  dataTypeTemplateIcons,
  getFilterIcon
} from "../../../../openscd/src/icons/icons.js";
import {lNodeTypeWizard} from "../templates/lnodetype-wizard.js";
import {editDaTypeWizard} from "../templates/datype-wizards.js";
import {dOTypeWizard} from "../templates/dotype-wizards.js";
import {eNumTypeEditWizard} from "../templates/enumtype-wizard.js";
import {cleanSCLItems, identitySort, uniq} from "./foundation.js";
const iconMapping = {
  EnumType: "enumIcon",
  DAType: "dAIcon",
  DOType: "dOIcon",
  LNodeType: "lNIcon"
};
const filterClassMapping = {
  EnumType: "enum-type",
  DAType: "da-type",
  DOType: "do-type",
  LNodeType: "lnode-type"
};
export let CleanupDataTypes = class extends LitElement {
  constructor() {
    super(...arguments);
    this.disableControlClean = false;
    this.unreferencedDataTypes = [];
    this.selectedDataTypeItems = [];
  }
  async firstUpdated() {
    this.cleanupList?.addEventListener("selected", () => {
      this.selectedDataTypeItems = this.cleanupList.index;
    });
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
  renderFilterIconButton(dataType, initialState = true) {
    return html`<mwc-icon-button-toggle
      slot="graphic"
      label="filter"
      ?on=${initialState}
      class="t-${filterClassMapping[dataType]}-filter filter"
      @click=${() => {
      this.toggleHiddenClass(`t-${filterClassMapping[dataType]}`);
    }}
      >${getFilterIcon(iconMapping[dataType], true)}
      ${getFilterIcon(iconMapping[dataType], false)}
    </mwc-icon-button-toggle>`;
  }
  openDataTypeEditor(dType) {
    if (dType.tagName === "LNodeType") {
      this.dispatchEvent(newSubWizardEvent(lNodeTypeWizard(identity(dType), this.doc)));
    } else if (dType.tagName === "DAType") {
      this.dispatchEvent(newSubWizardEvent(editDaTypeWizard(identity(dType), this.doc)));
    } else if (dType.tagName === "DOType") {
      this.dispatchEvent(newSubWizardEvent(dOTypeWizard(identity(dType), this.doc)));
    } else if (dType.tagName === "EnumType") {
      this.dispatchEvent(newSubWizardEvent(eNumTypeEditWizard(identity(dType), this.doc)));
    }
  }
  getDataTypeSecondaryText(dType) {
    if (dType.tagName === "LNodeType") {
      return dType.getAttribute("lnClass");
    } else if (dType.tagName === "DAType") {
      return dType.getAttribute("desc");
    } else if (dType.tagName === "DOType") {
      return dType.getAttribute("cdc");
    } else if (dType.tagName === "EnumType") {
      return dType.getAttribute("desc");
    }
    return "Unknown";
  }
  renderListItem(dType) {
    return html`<mwc-check-list-item
      twoline
      class="${classMap({
      "cleanup-list-item": true,
      "t-lnode-type": dType.tagName === "LNodeType",
      "t-do-type": dType.tagName === "DOType",
      "t-da-type": dType.tagName === "DAType",
      "t-enum-type": dType.tagName === "EnumType"
    })}"
      value="${identity(dType)}"
      graphic="large"
      ><span class="unreferenced-control">${dType.getAttribute("id")} </span>
      <span>
        <mwc-icon-button
          label="Edit"
          icon="edit"
          class="edit-item"
          @click="${() => this.openDataTypeEditor(dType)}"
        ></mwc-icon-button>
      </span>
      <span slot="secondary">${this.getDataTypeSecondaryText(dType)} </span>
      <mwc-icon slot="graphic"
        >${dataTypeTemplateIcons[dType.tagName]}</mwc-icon
      >
    </mwc-check-list-item>`;
  }
  indexDataTypeTemplates(dttStart) {
    const dataTypeFrequencyUsage = new Map();
    const allUsages = this.fetchTree(dttStart);
    allUsages.forEach((item) => {
      dataTypeFrequencyUsage.set(item, (dataTypeFrequencyUsage.get(item) || 0) + 1);
    });
    return dataTypeFrequencyUsage;
  }
  getSubType(element) {
    const dataTypeTemplates = this.doc.querySelector(":root > DataTypeTemplates");
    const type = element.getAttribute("type");
    if (element.tagName === "DO" || element.tagName === "SDO") {
      return dataTypeTemplates.querySelector(`DOType[id="${type}"]`);
    } else if ((element.tagName === "DA" || element.tagName === "BDA") && element.getAttribute("bType") === "Struct") {
      return dataTypeTemplates.querySelector(`DAType[id="${type}"]`);
    } else if ((element.tagName === "DA" || element.tagName === "BDA") && element.getAttribute("bType") === "Enum") {
      return dataTypeTemplates.querySelector(`EnumType[id="${type}"]`);
    }
    return null;
  }
  fetchTree(rootElements) {
    const elementStack = [...rootElements];
    const traversedElements = [];
    const MAX_STACK_DEPTH = 3e5;
    while (elementStack.length > 0 && elementStack.length <= MAX_STACK_DEPTH) {
      const currentElement = elementStack.pop();
      traversedElements.push(currentElement.getAttribute("id"));
      const selector = "DO, SDO, DA, BDA";
      Array.from(currentElement.querySelectorAll(selector)).filter(isPublic).forEach((element) => {
        const newElement = this.getSubType(element);
        if (newElement !== null) {
          elementStack.unshift(newElement);
        }
      });
      if (elementStack.length >= MAX_STACK_DEPTH) {
        this.dispatchEvent(newLogEvent({
          kind: "error",
          title: get("cleanup.unreferencedDataTypes.title"),
          message: get("cleanup.unreferencedDataTypes.stackExceeded", {
            maxStackDepth: MAX_STACK_DEPTH.toString()
          })
        }));
      }
    }
    return traversedElements;
  }
  getCleanItems() {
    const cleanItems = Array.from(this.selectedDataTypeItems.values()).map((index) => this.unreferencedDataTypes[index]);
    if (this.cleanSubTypesCheckbox.checked === true) {
      const dataTypeTemplates = this.doc.querySelector(":root > DataTypeTemplates");
      const startingLNodeTypes = Array.from(dataTypeTemplates.querySelectorAll("LNodeType"));
      const dataTypeUsageCounter = this.indexDataTypeTemplates(startingLNodeTypes);
      cleanItems.forEach((item) => {
        if (item.tagName === "LNodeType") {
          const childDataTypeTemplateIds = this.fetchTree([item]);
          childDataTypeTemplateIds.forEach((id) => {
            dataTypeUsageCounter?.set(id, dataTypeUsageCounter.get(id) - 1);
          });
        }
      });
      cleanItems.forEach((item) => {
        if (["DOType", "DAType"].includes(item.tagName)) {
          const unusedDataTypeTemplateChildrenIds = uniq(this.fetchTree([item]));
          unusedDataTypeTemplateChildrenIds.forEach((id) => {
            if (dataTypeUsageCounter.get(id) === void 0)
              cleanItems.push(dataTypeTemplates.querySelector(`[id="${id}"]`));
          });
        }
      });
      dataTypeUsageCounter?.forEach((count, dataTypeId) => {
        if (count <= 0) {
          cleanItems.push(dataTypeTemplates.querySelector(`[id="${dataTypeId}"]`));
        }
      });
    }
    return cleanItems;
  }
  renderDeleteButton() {
    return html`<mwc-button
      outlined
      icon="delete"
      class="delete-button"
      label="${get("cleanup.unreferencedDataTypes.deleteButton")} (${this.selectedDataTypeItems.size || "0"})"
      ?disabled=${this.selectedDataTypeItems.size === 0 || Array.isArray(this.selectedDataTypeItems) && !this.selectedDataTypeItems.length}
      @click=${() => {
      const dataTypeItemsDeleteActions = cleanSCLItems(this.getCleanItems());
      dataTypeItemsDeleteActions.forEach((deleteAction) => this.dispatchEvent(newActionEvent(deleteAction)));
      this.cleanupListItems.forEach((item) => {
        item.selected = false;
      });
    }}
    ></mwc-button>`;
  }
  getUnusedType(usedSelector, keyAttributeName, templateSelector) {
    const usedTypes = uniq(Array.from(this.doc?.querySelectorAll(usedSelector) ?? []).filter(isPublic).map((uType) => uType.getAttribute(keyAttributeName)));
    const unreferencedTypes = [];
    Array.from(this.doc?.querySelectorAll(`DataTypeTemplates > ${templateSelector}`) ?? []).filter(isPublic).forEach((dType) => {
      if (!usedTypes.includes(dType.getAttribute("id") ?? "Unknown"))
        unreferencedTypes.push(dType);
    });
    return identitySort(unreferencedTypes);
  }
  getUnusedTypes() {
    const unreferencedLNTypes = this.getUnusedType("LN, LN0", "lnType", "LNodeType");
    const unreferencedDOTypes = this.getUnusedType("DO, SDO", "type", "DOType");
    const unreferencedDATypes = this.getUnusedType('DA[bType="Struct"], BDA[bType="Struct"]', "type", "DAType");
    const unreferencedEnumTypes = this.getUnusedType('DA[bType="Enum"], BDA[bType="Enum"]', "type", "EnumType");
    return unreferencedLNTypes.concat(unreferencedDOTypes, unreferencedDATypes, unreferencedEnumTypes);
  }
  renderUnreferencedDataTypes() {
    this.unreferencedDataTypes = this.getUnusedTypes();
    return html`
      <div>
        <h1>
          ${get("cleanup.unreferencedDataTypes.title")}
          (${this.unreferencedDataTypes.length})
          <abbr slot="action">
            <mwc-icon-button
              icon="info"
              title="${get("cleanup.unreferencedDataTypes.tooltip")}"
            >
            </mwc-icon-button>
          </abbr>
        </h1>
        ${this.renderFilterIconButton("LNodeType")}
        ${this.renderFilterIconButton("DOType")}
        ${this.renderFilterIconButton("DAType")}
        ${this.renderFilterIconButton("EnumType")}
        <filtered-list multi class="cleanup-list"
          >${Array.from(this.unreferencedDataTypes.map((type) => this.renderListItem(type)))}
        </filtered-list>
      </div>
      <footer>
        ${this.renderDeleteButton()}
        <mwc-formfield
          class="remove-from-communication"
          label="${get("cleanup.unreferencedDataTypes.alsoRemoveSubTypes")}"
        >
          <mwc-checkbox checked class="clean-sub-types-checkbox"></mwc-checkbox
        ></mwc-formfield>
      </footer>
    `;
  }
  render() {
    return html`
      <section tabindex="1">${this.renderUnreferencedDataTypes()}</section>
    `;
  }
};
CleanupDataTypes.styles = css`
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

    .edit-item {
      --mdc-icon-size: 16px;
      visibility: hidden;
      opacity: 0;
    }

    .cleanup-list-item:hover .edit-item {
      visibility: visible;
      opacity: 1;
      transition: visibility 0s, opacity 0.5s linear;
    }

    .edit-item[disabled] {
      display: none;
    }

    .delete-button {
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

    /* filter itself changes colour after click */
    .t-da-type-filter[on],
    .t-enum-type-filter[on],
    .t-lnode-type-filter[on],
    .t-do-type-filter[on] {
      color: var(--secondary);
      opacity: 1;
    }

    /* Make sure to type filter here
    .hidden is set on string filter in filtered-list and must always filter*/
    .cleanup-list-item.hiddenontypefilter:not(.hidden) {
      display: none;
    }

    /* filter disabled, Material Design guidelines for opacity */
    .t-da-type-filter,
    .t-enum-type-filter,
    .t-lnode-type-filter,
    .t-do-type-filter {
      opacity: 0.38;
    }
  `;
__decorate([
  property({attribute: false})
], CleanupDataTypes.prototype, "doc", 2);
__decorate([
  property({type: Boolean})
], CleanupDataTypes.prototype, "disableControlClean", 2);
__decorate([
  property({type: Array})
], CleanupDataTypes.prototype, "unreferencedDataTypes", 2);
__decorate([
  property({attribute: false})
], CleanupDataTypes.prototype, "selectedDataTypeItems", 2);
__decorate([
  query(".delete-button")
], CleanupDataTypes.prototype, "cleanButton", 2);
__decorate([
  query(".cleanup-list")
], CleanupDataTypes.prototype, "cleanupList", 2);
__decorate([
  queryAll("mwc-check-list-item.cleanup-list-item")
], CleanupDataTypes.prototype, "cleanupListItems", 2);
__decorate([
  query(".clean-sub-types-checkbox")
], CleanupDataTypes.prototype, "cleanSubTypesCheckbox", 2);
__decorate([
  query(".t-da-type-filter")
], CleanupDataTypes.prototype, "cleanupDATypeFilter", 2);
__decorate([
  query(".t-enum-type-filter")
], CleanupDataTypes.prototype, "cleanupEnumTypeFilter", 2);
__decorate([
  query(".t-lnode-type-filter")
], CleanupDataTypes.prototype, "cleanupLNodeTypeFilter", 2);
__decorate([
  query(".t-do-type-filter")
], CleanupDataTypes.prototype, "cleanupDOTypeFilter", 2);
CleanupDataTypes = __decorate([
  customElement("cleanup-data-types")
], CleanupDataTypes);
