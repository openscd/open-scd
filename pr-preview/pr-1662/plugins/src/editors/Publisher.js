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
  html,
  LitElement,
  property,
  state
} from "../../../_snowpack/pkg/lit-element.js";
import {classMap} from "../../../_snowpack/pkg/lit-html/directives/class-map.js";
import "../../../_snowpack/pkg/@material/mwc-formfield.js";
import "../../../_snowpack/pkg/@material/mwc-radio.js";
import "./publisher/report-control-editor.js";
import "./publisher/gse-control-editor.js";
import "./publisher/sampled-value-control-editor.js";
import "./publisher/data-set-editor.js";
export default class PublisherPlugin extends LitElement {
  constructor() {
    super(...arguments);
    this.editCount = -1;
    this.publisherType = "GOOSE";
  }
  render() {
    return html`<div class="publishertypeselector">
        <mwc-formfield label="Report"
          ><mwc-radio
            value="Report"
            ?checked=${this.publisherType === "Report"}
            @checked=${() => this.publisherType = "Report"}
          ></mwc-radio></mwc-formfield
        ><mwc-formfield label="GOOSE"
          ><mwc-radio
            value="GOOSE"
            ?checked=${this.publisherType === "GOOSE"}
            @checked=${() => this.publisherType = "GOOSE"}
          ></mwc-radio></mwc-formfield
        ><mwc-formfield label="SampledValue"
          ><mwc-radio
            value="SampledValue"
            ?checked=${this.publisherType === "SampledValue"}
            @checked=${() => this.publisherType = "SampledValue"}
          ></mwc-radio></mwc-formfield
        ><mwc-formfield label="DataSet"
          ><mwc-radio
            value="DataSet"
            ?checked=${this.publisherType === "DataSet"}
            @checked=${() => this.publisherType = "DataSet"}
          ></mwc-radio
        ></mwc-formfield>
      </div>
      <report-control-editor
        .editCount=${this.editCount}
        .doc=${this.doc}
        class="${classMap({
      hidden: this.publisherType !== "Report"
    })}"
      ></report-control-editor
      ><gse-control-editor
        .editCount=${this.editCount}
        .doc=${this.doc}
        class="${classMap({
      hidden: this.publisherType !== "GOOSE"
    })}"
      ></gse-control-editor
      ><sampled-value-control-editor
        .editCount=${this.editCount}
        .doc=${this.doc}
        class="${classMap({
      hidden: this.publisherType !== "SampledValue"
    })}"
      ></sampled-value-control-editor
      ><data-set-editor
        .editCount=${this.editCount}
        .doc=${this.doc}
        class="${classMap({
      hidden: this.publisherType !== "DataSet"
    })}"
      ></data-set-editor>`;
  }
}
PublisherPlugin.styles = css`
    .hidden {
      display: none;
    }

    .publishertypeselector {
      margin: 4px 8px 8px;
      background-color: var(--mdc-theme-surface);
      width: calc(100% - 16px);
      justify-content: space-around;
    }
  `;
__decorate([
  property({attribute: false})
], PublisherPlugin.prototype, "doc", 2);
__decorate([
  property({type: Number})
], PublisherPlugin.prototype, "editCount", 2);
__decorate([
  state()
], PublisherPlugin.prototype, "publisherType", 2);
