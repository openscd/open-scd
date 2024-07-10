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
} from "../../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../../_snowpack/pkg/lit-translate.js";
import "../../../../openscd/src/wizard-textfield.js";
import "../../../../openscd/src/wizard-checkbox.js";
import {identity} from "../../../../openscd/src/foundation.js";
import {maxLength, patterns} from "../../wizards/foundation/limits.js";
export let ReportControlElementEditor = class extends LitElement {
  renderOptFieldsContent() {
    const [
      seqNum,
      timeStamp,
      dataSet,
      reasonCode,
      dataRef,
      entryID,
      configRef,
      bufOvfl
    ] = [
      "seqNum",
      "timeStamp",
      "dataSet",
      "reasonCode",
      "dataRef",
      "entryID",
      "configRef",
      "bufOvfl"
    ].map((attr) => this.element.querySelector("OptFields")?.getAttribute(attr) ?? null);
    return html`<h3>Optional Fields</h3>
      ${Object.entries({
      seqNum,
      timeStamp,
      dataSet,
      reasonCode,
      dataRef,
      entryID,
      configRef,
      bufOvfl
    }).map(([key, value]) => html`<wizard-checkbox
            label="${key}"
            .maybeValue=${value}
            nullable
            helper="${get(`scl.${key}`)}"
            disabled
          ></wizard-checkbox>`)}`;
  }
  renderTrgOpsContent() {
    const [dchg, qchg, dupd, period, gi] = [
      "dchg",
      "qchg",
      "dupd",
      "period",
      "gi"
    ].map((attr) => this.element.querySelector("TrgOps")?.getAttribute(attr) ?? null);
    return html` <h3>Trigger Options</h3>
      ${Object.entries({dchg, qchg, dupd, period, gi}).map(([key, value]) => html`<wizard-checkbox
            label="${key}"
            .maybeValue=${value}
            nullable
            helper="${get(`scl.${key}`)}"
            disabled
          ></wizard-checkbox>`)}`;
  }
  renderChildElements() {
    return html`<div class="content">
      ${this.renderTrgOpsContent()}${this.renderOptFieldsContent()}
    </div>`;
  }
  renderReportControlContent() {
    const [name, desc, buffered, rptID, indexed, bufTime, intgPd] = [
      "name",
      "desc",
      "buffered",
      "rptID",
      "indexed",
      "bufTime",
      "intgPd"
    ].map((attr) => this.element?.getAttribute(attr));
    const max = this.element.querySelector("RptEnabled")?.getAttribute("max") ?? null;
    return html`<div class="content">
      <wizard-textfield
        label="name"
        .maybeValue=${name}
        helper="${get("scl.name")}"
        required
        validationMessage="${get("textfield.required")}"
        pattern="${patterns.asciName}"
        maxLength="${maxLength.cbName}"
        dialogInitialFocus
        disabled
      ></wizard-textfield
      ><wizard-textfield
        label="desc"
        .maybeValue=${desc}
        nullable
        helper="${get("scl.desc")}"
        disabled
      ></wizard-textfield
      ><wizard-checkbox
        label="buffered"
        .maybeValue=${buffered}
        helper="${get("scl.buffered")}"
        disabled
      ></wizard-checkbox
      ><wizard-textfield
        label="rptID"
        .maybeValue=${rptID}
        nullable
        required
        helper="${get("report.rptID")}"
        disabled
      ></wizard-textfield
      ><wizard-checkbox
        label="indexed"
        .maybeValue=${indexed}
        nullable
        helper="${get("scl.indexed")}"
        disabled
      ></wizard-checkbox
      ><wizard-textfield
        label="max Clients"
        .maybeValue=${max}
        helper="${get("scl.maxReport")}"
        nullable
        type="number"
        suffix="#"
        disabled
      ></wizard-textfield
      ><wizard-textfield
        label="bufTime"
        .maybeValue=${bufTime}
        helper="${get("scl.bufTime")}"
        nullable
        required
        type="number"
        min="0"
        suffix="ms"
        disabled
      ></wizard-textfield
      ><wizard-textfield
        label="intgPd"
        .maybeValue=${intgPd}
        helper="${get("scl.intgPd")}"
        nullable
        required
        type="number"
        min="0"
        suffix="ms"
        disabled
      ></wizard-textfield>
    </div>`;
  }
  render() {
    if (this.element)
      return html`<h2 style="display: flex;">
          <div style="flex:auto">
            <div>ReportControl</div>
            <div class="headersubtitle">${identity(this.element)}</div>
          </div>
        </h2>
        <div class="parentcontent">
          ${this.renderReportControlContent()}${this.renderChildElements()}
        </div>`;
    return html`<div class="content">
      <h2>${get("publisher.nodataset")}</h2>
    </div>`;
  }
};
ReportControlElementEditor.styles = css`
    .parentcontent {
      display: grid;
      grid-gap: 12px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, auto));
    }

    .content {
      border-left: thick solid var(--mdc-theme-on-primary);
    }

    .content > * {
      display: block;
      margin: 4px 8px 16px;
    }

    h2,
    h3 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      margin: 4px 8px 16px;
      padding-left: 0.3em;
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

    @media (max-width: 950px) {
      .content {
        border-left: 0px solid var(--mdc-theme-on-primary);
      }
    }
  `;
__decorate([
  property({attribute: false})
], ReportControlElementEditor.prototype, "doc", 2);
__decorate([
  property({attribute: false})
], ReportControlElementEditor.prototype, "element", 2);
ReportControlElementEditor = __decorate([
  customElement("report-control-element-editor")
], ReportControlElementEditor);
