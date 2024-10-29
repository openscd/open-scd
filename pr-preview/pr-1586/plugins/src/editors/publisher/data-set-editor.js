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
import {get} from "../../../../_snowpack/pkg/lit-translate.js";
import "../../../../_snowpack/pkg/@material/mwc-button.js";
import "../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "./data-set-element-editor.js";
import "../../../../openscd/src/filtered-list.js";
import {
  compareNames,
  identity,
  find
} from "../../../../openscd/src/foundation.js";
import {styles, updateElementReference} from "./foundation.js";
export let DataSetEditor = class extends LitElement {
  update(props) {
    if (props.has("doc") && this.selectedDataSet) {
      const newDataSet = updateElementReference(this.doc, this.selectedDataSet);
      this.selectedDataSet = newDataSet ?? void 0;
      if (!newDataSet && this.selectionList && this.selectionList.selected)
        this.selectionList.selected.selected = false;
    }
    super.update(props);
  }
  selectDataSet(evt) {
    const id = evt.target.selected.value;
    const dataSet = find(this.doc, "DataSet", id);
    if (dataSet) {
      this.selectedDataSet = dataSet;
      evt.target.classList.add("hidden");
      this.selectDataSetButton.classList.remove("hidden");
    }
  }
  renderElementEditorContainer() {
    if (this.selectedDataSet)
      return html`<div class="elementeditorcontainer">
        <data-set-element-editor
          .element=${this.selectedDataSet}
        ></data-set-element-editor>
      </div>`;
    return html``;
  }
  renderSelectionList() {
    return html`<filtered-list
      activatable
      @action=${this.selectDataSet}
      class="selectionlist"
      >${Array.from(this.doc.querySelectorAll("IED")).sort(compareNames).flatMap((ied) => {
      const ieditem = html`<mwc-list-item
              class="listitem header"
              noninteractive
              graphic="icon"
              value="${Array.from(ied.querySelectorAll("DataSet")).map((element) => {
        const id = identity(element);
        return typeof id === "string" ? id : "";
      }).join(" ")}"
            >
              <span>${ied.getAttribute("name")}</span>
              <mwc-icon slot="graphic">developer_board</mwc-icon>
            </mwc-list-item>
            <li divider role="separator"></li>`;
      const dataSets = Array.from(ied.querySelectorAll("DataSet")).map((dataSet) => html`<mwc-list-item twoline value="${identity(dataSet)}"
                ><span>${dataSet.getAttribute("name")}</span
                ><span slot="secondary">${identity(dataSet)}</span>
              </mwc-list-item>`);
      return [ieditem, ...dataSets];
    })}</filtered-list
    >`;
  }
  renderToggleButton() {
    return html`<mwc-button
      outlined
      label="${get("publisher.selectbutton", {type: "DataSet"})}"
      @click=${() => {
      this.selectionList.classList.remove("hidden");
      this.selectDataSetButton.classList.add("hidden");
    }}
    ></mwc-button>`;
  }
  render() {
    return html`${this.renderToggleButton()}
      <div class="content">
        ${this.renderSelectionList()}${this.renderElementEditorContainer()}
      </div>`;
  }
};
DataSetEditor.styles = css`
    ${styles}

    data-set-element-editor {
      flex: auto;
    }
  `;
__decorate([
  property({attribute: false})
], DataSetEditor.prototype, "doc", 2);
__decorate([
  state()
], DataSetEditor.prototype, "selectedDataSet", 2);
__decorate([
  query(".selectionlist")
], DataSetEditor.prototype, "selectionList", 2);
__decorate([
  query("mwc-button")
], DataSetEditor.prototype, "selectDataSetButton", 2);
DataSetEditor = __decorate([
  customElement("data-set-editor")
], DataSetEditor);
