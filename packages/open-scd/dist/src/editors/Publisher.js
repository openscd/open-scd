import { __decorate } from "tslib";
import { css, html, LitElement, property, state, } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import '@material/mwc-formfield';
import '@material/mwc-radio';
import './publisher/report-control-editor.js';
import './publisher/gse-control-editor.js';
import './publisher/sampled-value-control-editor.js';
import './publisher/data-set-editor.js';
/** An editor [[`plugin`]] to configure `Report`, `GOOSE`, `SampledValue` control blocks and its `DataSet` */
export default class PublisherPlugin extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
        this.publisherType = 'GOOSE';
    }
    render() {
        return html `<div class="publishertypeselector">
        <mwc-formfield label="Report"
          ><mwc-radio
            value="Report"
            ?checked=${this.publisherType === 'Report'}
            @checked=${() => (this.publisherType = 'Report')}
          ></mwc-radio></mwc-formfield
        ><mwc-formfield label="GOOSE"
          ><mwc-radio
            value="GOOSE"
            ?checked=${this.publisherType === 'GOOSE'}
            @checked=${() => (this.publisherType = 'GOOSE')}
          ></mwc-radio></mwc-formfield
        ><mwc-formfield label="SampledValue"
          ><mwc-radio
            value="SampledValue"
            ?checked=${this.publisherType === 'SampledValue'}
            @checked=${() => (this.publisherType = 'SampledValue')}
          ></mwc-radio></mwc-formfield
        ><mwc-formfield label="DataSet"
          ><mwc-radio
            value="DataSet"
            ?checked=${this.publisherType === 'DataSet'}
            @checked=${() => (this.publisherType = 'DataSet')}
          ></mwc-radio
        ></mwc-formfield>
      </div>
      <report-control-editor
        .editCount=${this.editCount}
        .doc=${this.doc}
        class="${classMap({
            hidden: this.publisherType !== 'Report',
        })}"
      ></report-control-editor
      ><gse-control-editor
        .editCount=${this.editCount}
        .doc=${this.doc}
        class="${classMap({
            hidden: this.publisherType !== 'GOOSE',
        })}"
      ></gse-control-editor
      ><sampled-value-control-editor
        .editCount=${this.editCount}
        .doc=${this.doc}
        class="${classMap({
            hidden: this.publisherType !== 'SampledValue',
        })}"
      ></sampled-value-control-editor
      ><data-set-editor
        .editCount=${this.editCount}
        .doc=${this.doc}
        class="${classMap({
            hidden: this.publisherType !== 'DataSet',
        })}"
      ></data-set-editor>`;
    }
}
PublisherPlugin.styles = css `
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
    property({ attribute: false })
], PublisherPlugin.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], PublisherPlugin.prototype, "editCount", void 0);
__decorate([
    state()
], PublisherPlugin.prototype, "publisherType", void 0);
//# sourceMappingURL=Publisher.js.map