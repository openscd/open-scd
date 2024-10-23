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
  state
} from "../../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../../_snowpack/pkg/lit-translate.js";
import "../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../../../../openscd/src/wizard-textfield.js";
import "../../../../openscd/src/filtered-list.js";
import {identity} from "../../../../openscd/src/foundation.js";
export let DataSetElementEditor = class extends LitElement {
  get name() {
    return this.element ? this.element.getAttribute("name") : "UNDEFINED";
  }
  get desc() {
    return this.element ? this.element.getAttribute("desc") : "UNDEFINED";
  }
  renderContent() {
    return html`<wizard-textfield
        label="name"
        .maybeValue=${this.name}
        helper="${get("scl.name")}"
        required
        disabled
      >
      </wizard-textfield>
      <wizard-textfield
        label="desc"
        .maybeValue=${this.desc}
        helper="${get("scl.desc")}"
        nullable
        disabled
      >
      </wizard-textfield>
      <filtered-list
        >${Array.from(this.element.querySelectorAll("FCDA")).map((fcda) => {
      const [ldInst, prefix, lnClass, lnInst, doName, daName, fc] = [
        "ldInst",
        "prefix",
        "lnClass",
        "lnInst",
        "doName",
        "daName",
        "fc"
      ].map((attributeName) => fcda.getAttribute(attributeName) ?? "");
      return html`<mwc-list-item selected twoline value="${identity(fcda)}"
            ><span
              >${doName}${daName ? "." + daName + " [" + fc + "]" : " [" + fc + "]"}</span
            ><span slot="secondary"
              >${ldInst + "/" + prefix + lnClass + lnInst}</span
            >
          </mwc-list-item>`;
    })}</filtered-list
      >`;
  }
  render() {
    if (this.element)
      return html`<div class="content">
        <h2>
          <div>DataSet</div>
          <div class="headersubtitle">${identity(this.element)}</div>
        </h2>
        ${this.renderContent()}
      </div>`;
    return html`<div class="content">
      <h2>
        <div>DataSet</div>
        <div class="headersubtitle">${get("publisher.nodataset")}</div>
      </h2>
    </div>`;
  }
};
DataSetElementEditor.styles = css`
    .content {
      display: flex;
      flex-direction: column;
      background-color: var(--mdc-theme-surface);
    }

    .content > * {
      display: block;
      margin: 4px 8px 16px;
    }

    h2 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;

      margin: 0px;
      padding-left: 0.3em;
      transition: background-color 150ms linear;
    }

    .headersubtitle {
      font-size: 16px;
      font-weight: 200;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    *[iconTrailing='search'] {
      --mdc-shape-small: 28px;
    }
  `;
__decorate([
  property({attribute: false})
], DataSetElementEditor.prototype, "doc", 2);
__decorate([
  property({attribute: false})
], DataSetElementEditor.prototype, "element", 2);
__decorate([
  state()
], DataSetElementEditor.prototype, "name", 1);
__decorate([
  state()
], DataSetElementEditor.prototype, "desc", 1);
DataSetElementEditor = __decorate([
  customElement("data-set-element-editor")
], DataSetElementEditor);
