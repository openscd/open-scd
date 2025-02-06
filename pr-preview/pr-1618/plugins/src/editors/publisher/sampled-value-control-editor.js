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
import "./sampled-value-control-element-editor.js";
import {
  compareNames,
  identity,
  find
} from "../../../../openscd/src/foundation.js";
import {smvIcon} from "../../../../openscd/src/icons/icons.js";
import {styles, updateElementReference} from "./foundation.js";
export let SampledValueControlEditor = class extends LitElement {
  constructor() {
    super(...arguments);
    this.editCount = -1;
  }
  update(props) {
    if (props.has("doc") && this.selectedSampledValueControl) {
      const newSampledValueControl = updateElementReference(this.doc, this.selectedSampledValueControl);
      this.selectedSampledValueControl = newSampledValueControl ?? void 0;
      this.selectedDataSet = this.selectedSampledValueControl ? updateElementReference(this.doc, this.selectedDataSet) : void 0;
      if (!newSampledValueControl && this.selectionList && this.selectionList.selected)
        this.selectionList.selected.selected = false;
    }
    super.update(props);
  }
  selectSMVControl(evt) {
    const id = evt.target.selected.value;
    const smvControl = find(this.doc, "SampledValueControl", id);
    if (!smvControl)
      return;
    this.selectedSampledValueControl = smvControl;
    if (smvControl) {
      this.selectedDataSet = smvControl.parentElement?.querySelector(`DataSet[name="${smvControl.getAttribute("datSet")}"]`) ?? null;
      evt.target.classList.add("hidden");
      this.selectSampledValueControlButton.classList.remove("hidden");
    }
  }
  renderElementEditorContainer() {
    if (this.selectedSampledValueControl !== void 0)
      return html`<div class="elementeditorcontainer">
        <data-set-element-editor
          .element=${this.selectedDataSet}
        ></data-set-element-editor>
        <sampled-value-control-element-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${this.selectedSampledValueControl}
        ></sampled-value-control-element-editor>
      </div>`;
    return html``;
  }
  renderSelectionList() {
    return html`<filtered-list
      activatable
      @action=${this.selectSMVControl}
      class="selectionlist"
      >${Array.from(this.doc.querySelectorAll("IED")).sort(compareNames).flatMap((ied) => {
      const ieditem = html`<mwc-list-item
              class="listitem header"
              noninteractive
              graphic="icon"
              value="${Array.from(ied.querySelectorAll("SampledValueControl")).map((element) => {
        const id = identity(element);
        return typeof id === "string" ? id : "";
      }).join(" ")}"
            >
              <span>${ied.getAttribute("name")}</span>
              <mwc-icon slot="graphic">developer_board</mwc-icon>
            </mwc-list-item>
            <li divider role="separator"></li>`;
      const sampledValueControls = Array.from(ied.querySelectorAll("SampledValueControl")).map((reportCb) => html`<mwc-list-item
                twoline
                value="${identity(reportCb)}"
                graphic="icon"
                ><span>${reportCb.getAttribute("name")}</span
                ><span slot="secondary">${identity(reportCb)}</span>
                <mwc-icon slot="graphic">${smvIcon}</mwc-icon>
              </mwc-list-item>`);
      return [ieditem, ...sampledValueControls];
    })}</filtered-list
    >`;
  }
  renderToggleButton() {
    return html`<mwc-button
      outlined
      label="${get("publisher.selectbutton", {type: "SMV"})}"
      @click=${() => {
      this.selectionList.classList.remove("hidden");
      this.selectSampledValueControlButton.classList.add("hidden");
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
SampledValueControlEditor.styles = css`
    ${styles}

    .elementeditorcontainer {
      flex: 65%;
      margin: 4px 8px 4px 4px;
      background-color: var(--mdc-theme-surface);
      overflow-y: scroll;
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      grid-template-columns: repeat(3, 1fr);
    }

    data-set-element-editor {
      grid-column: 1 / 2;
    }

    sampled-value-control-element-editor {
      grid-column: 2 / 4;
    }

    @media (max-width: 950px) {
      .elementeditorcontainer {
        display: block;
      }
    }
  `;
__decorate([
  property({attribute: false})
], SampledValueControlEditor.prototype, "doc", 2);
__decorate([
  property({type: Number})
], SampledValueControlEditor.prototype, "editCount", 2);
__decorate([
  state()
], SampledValueControlEditor.prototype, "selectedSampledValueControl", 2);
__decorate([
  state()
], SampledValueControlEditor.prototype, "selectedDataSet", 2);
__decorate([
  query(".selectionlist")
], SampledValueControlEditor.prototype, "selectionList", 2);
__decorate([
  query("mwc-button")
], SampledValueControlEditor.prototype, "selectSampledValueControlButton", 2);
SampledValueControlEditor = __decorate([
  customElement("sampled-value-control-editor")
], SampledValueControlEditor);
