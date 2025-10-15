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
import {translate} from "../../../../_snowpack/pkg/lit-translate.js";
import "../../../../_snowpack/pkg/@material/mwc-dialog.js";
import "../../../../_snowpack/pkg/@material/mwc-textfield.js";
import "../../../../_snowpack/pkg/@material/mwc-button.js";
import "../../../../_snowpack/pkg/@material/mwc-select.js";
import "../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import {getLNodeTypes} from "./foundation.js";
export let AddLnDialog = class extends LitElement {
  constructor() {
    super(...arguments);
    this.lnType = "";
    this.amount = 1;
    this.filterText = "";
  }
  get lNodeTypes() {
    if (!this.doc)
      return [];
    return getLNodeTypes(this.doc).map((lnType) => ({
      id: lnType.getAttribute("id") || "",
      lnClass: lnType.getAttribute("lnClass") || "",
      desc: lnType.getAttribute("desc") || void 0
    }));
  }
  get filteredLNodeTypes() {
    const filter = this.filterText.trim().toLowerCase();
    if (!filter)
      return this.lNodeTypes;
    return this.lNodeTypes.filter((t) => t.lnClass.toLowerCase().includes(filter) || t.id.toLowerCase().includes(filter) || (t.desc?.toLowerCase().includes(filter) ?? false));
  }
  show() {
    this.lnType = "";
    this.amount = 1;
    this.filterText = "";
    this.dialog.show();
  }
  close() {
    this.dialog.close();
  }
  handleCreate() {
    const selectedType = this.lNodeTypes.find((t) => t.id === this.lnType);
    if (!selectedType)
      return;
    this.onConfirm({
      lnType: selectedType.id,
      lnClass: selectedType.lnClass,
      amount: this.amount
    });
    this.close();
  }
  render() {
    return html`
      <mwc-dialog
        id="addLnDialog"
        heading=${translate("iededitor.addLnDialog.title")}
        @closed=${this.close}
      >
        <div class="dialog-content">
          <div class="ln-list-container">
            <mwc-textfield
              label="${translate("iededitor.addLnDialog.filter")}"
              icon="search"
              type="text"
              .value=${this.filterText}
              @input=${(e) => {
      e.stopPropagation();
      this.filterText = e.target.value;
    }}
              style="margin-bottom: 8px; width: 100%;"
            ></mwc-textfield>
            <div class="ln-list-scroll">
              <mwc-list
                style="width: 100%;"
                @click=${(e) => e.stopPropagation()}
              >
                ${this.filteredLNodeTypes.length === 0 ? html`<mwc-list-item disabled
                      >${translate("iededitor.addLnDialog.noResults")}</mwc-list-item
                    >` : this.filteredLNodeTypes.map((t) => html`
                        <mwc-list-item
                          .selected=${this.lnType === t.id}
                          type="button"
                          @click=${(e) => {
      e.stopPropagation();
      this.lnType = t.id;
    }}
                          value=${t.id}
                          dialogAction="none"
                          style="cursor: pointer;"
                        >
                          <span class="ln-list-id">${t.id}</span>
                          <span class="ln-list-desc">${t.desc || ""}</span>
                        </mwc-list-item>
                      `)}
              </mwc-list>
            </div>
          </div>
          <mwc-textfield
            label=${translate("iededitor.addLnDialog.amount")}
            type="number"
            min="1"
            .value=${this.amount}
            @input=${(e) => {
      e.stopPropagation();
      this.amount = Number(e.target.value);
    }}
            @click=${(e) => e.stopPropagation()}
            @mousedown=${(e) => e.stopPropagation()}
            @mouseup=${(e) => e.stopPropagation()}
            style="width: 100%; margin-top: 12px;"
          ></mwc-textfield>
        </div>
        <mwc-button
          slot="secondaryAction"
          @click=${this.close}
          style="--mdc-theme-primary: var(--mdc-theme-error)"
        >
          ${translate("close")}
        </mwc-button>
        <mwc-button
          slot="primaryAction"
          icon="add"
          trailingIcon
          @click=${this.handleCreate}
          ?disabled=${!this.lnType || this.amount < 1 || this.amount % 1 != 0}
        >
          ${translate("add")}
        </mwc-button>
      </mwc-dialog>
    `;
  }
};
AddLnDialog.styles = css`
    .dialog-content {
      margin-top: 16px;
      width: 320px;
      max-width: 100vw;
      box-sizing: border-box;
    }

    .ln-list-scroll {
      width: 100%;
      height: 240px;
      overflow-y: auto;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: var(--mdc-theme-surface, #fff);
    }

    mwc-list-item {
      --mdc-list-item-graphic-size: 0;
      min-height: 56px;
      height: 56px;
      max-height: 56px;
      padding-top: 0;
      padding-bottom: 0;
    }

    mwc-list-item[selected] {
      background: var(--mdc-theme-primary, #6200ee);
    }

    mwc-list-item[selected] .ln-list-id,
    mwc-list-item[selected] .ln-list-desc {
      color: var(--mdc-theme-on-primary, #fff);
    }

    mwc-list-item > span.ln-list-id,
    mwc-list-item > span.ln-list-desc {
      display: block;
      width: 100%;
    }

    .ln-list-id {
      font-size: 1em;
      line-height: 1.2;
      color: var(--mdc-theme-on-surface, #222);
    }

    .ln-list-desc {
      font-size: 0.95em;
      color: var(--mdc-theme-text-secondary-on-background, #666);
      line-height: 1.1;
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `;
__decorate([
  property({attribute: false})
], AddLnDialog.prototype, "doc", 2);
__decorate([
  property({type: Function})
], AddLnDialog.prototype, "onConfirm", 2);
__decorate([
  query("#addLnDialog")
], AddLnDialog.prototype, "dialog", 2);
__decorate([
  state()
], AddLnDialog.prototype, "lnType", 2);
__decorate([
  state()
], AddLnDialog.prototype, "amount", 2);
__decorate([
  state()
], AddLnDialog.prototype, "filterText", 2);
AddLnDialog = __decorate([
  customElement("add-ln-dialog")
], AddLnDialog);
