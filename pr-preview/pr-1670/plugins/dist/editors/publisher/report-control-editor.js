import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { css, customElement, html, LitElement, property, query, state, } from '../../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../../_snowpack/pkg/lit-translate.js';
import '../../../../_snowpack/pkg/@material/mwc-button.js';
import '../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js';
import './data-set-element-editor.js';
import './report-control-element-editor.js';
import '../../../../openscd/src/filtered-list.js';
import { compareNames, identity, find, } from '../../../../openscd/src/foundation.js';
import { reportIcon } from '../../../../openscd/src/icons/icons.js';
import { styles, updateElementReference } from './foundation.js';
let ReportControlEditor = class ReportControlEditor extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
    }
    /** Resets selected Report and its DataSet, if not existing in new doc */
    update(props) {
        if (props.has('doc') && this.selectedReportControl) {
            const newReportControl = updateElementReference(this.doc, this.selectedReportControl);
            this.selectedReportControl = newReportControl ?? undefined;
            this.selectedDataSet = this.selectedReportControl
                ? updateElementReference(this.doc, this.selectedDataSet)
                : undefined;
            if (!newReportControl &&
                this.selectionList &&
                this.selectionList.selected)
                this.selectionList.selected.selected = false;
        }
        super.update(props);
    }
    selectReportControl(evt) {
        const id = evt.target.selected.value;
        const reportControl = find(this.doc, 'ReportControl', id);
        if (!reportControl)
            return;
        this.selectedReportControl = reportControl;
        if (this.selectedReportControl) {
            this.selectedDataSet =
                this.selectedReportControl.parentElement?.querySelector(`DataSet[name="${this.selectedReportControl.getAttribute('datSet')}"]`);
            evt.target.classList.add('hidden');
            this.selectReportControlButton.classList.remove('hidden');
        }
    }
    renderElementEditorContainer() {
        if (this.selectedReportControl !== undefined)
            return html `<div class="elementeditorcontainer">
        <data-set-element-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${this.selectedDataSet}
        ></data-set-element-editor>
        <report-control-element-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${this.selectedReportControl}
        ></report-control-element-editor>
      </div>`;
        return html ``;
    }
    renderSelectionList() {
        return html `<filtered-list
      activatable
      class="selectionlist"
      @action=${this.selectReportControl}
      >${Array.from(this.doc.querySelectorAll('IED'))
            .sort(compareNames)
            .flatMap(ied => {
            const ieditem = html `<mwc-list-item
              class="listitem header"
              noninteractive
              graphic="icon"
              value="${Array.from(ied.querySelectorAll('ReportControl'))
                .map(element => {
                const id = identity(element);
                return typeof id === 'string' ? id : '';
            })
                .join(' ')}"
            >
              <span>${ied.getAttribute('name')}</span>
              <mwc-icon slot="graphic">developer_board</mwc-icon>
            </mwc-list-item>
            <li divider role="separator"></li>`;
            const reports = Array.from(ied.querySelectorAll('ReportControl')).map(reportCb => html `<mwc-list-item
                twoline
                value="${identity(reportCb)}"
                graphic="icon"
                ><span>${reportCb.getAttribute('name')}</span
                ><span slot="secondary">${identity(reportCb)}</span>
                <mwc-icon slot="graphic">${reportIcon}</mwc-icon>
              </mwc-list-item>`);
            return [ieditem, ...reports];
        })}</filtered-list
    >`;
    }
    renderToggleButton() {
        return html `<mwc-button
      outlined
      label="${get('publisher.selectbutton', { type: 'Report' })}"
      @click=${() => {
            this.selectionList.classList.remove('hidden');
            this.selectReportControlButton.classList.add('hidden');
        }}
    ></mwc-button>`;
    }
    render() {
        return html `${this.renderToggleButton()}
      <div class="content">
        ${this.renderSelectionList()}${this.renderElementEditorContainer()}
      </div>`;
    }
};
ReportControlEditor.styles = css `
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

    report-control-element-editor {
      grid-column: 2 / 4;
    }

    @media (max-width: 950px) {
      .elementeditorcontainer {
        display: block;
      }
    }
  `;
__decorate([
    property({ attribute: false })
], ReportControlEditor.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], ReportControlEditor.prototype, "editCount", void 0);
__decorate([
    state()
], ReportControlEditor.prototype, "selectedReportControl", void 0);
__decorate([
    state()
], ReportControlEditor.prototype, "selectedDataSet", void 0);
__decorate([
    query('.selectionlist')
], ReportControlEditor.prototype, "selectionList", void 0);
__decorate([
    query('mwc-button')
], ReportControlEditor.prototype, "selectReportControlButton", void 0);
ReportControlEditor = __decorate([
    customElement('report-control-editor')
], ReportControlEditor);
export { ReportControlEditor };
//# sourceMappingURL=report-control-editor.js.map