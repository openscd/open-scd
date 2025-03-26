import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { css, customElement, html, LitElement, property, query, state, } from '../../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../../_snowpack/pkg/lit-translate.js';
import '../../../../_snowpack/pkg/@material/mwc-button.js';
import '../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js';
import './data-set-element-editor.js';
import '../../../../openscd/src/filtered-list.js';
import { compareNames, identity, find, } from '../../../../openscd/src/foundation.js';
import { styles, updateElementReference } from './foundation.js';
let DataSetEditor = class DataSetEditor extends LitElement {
    /** Resets selected GOOSE, if not existing in new doc */
    update(props) {
        if (props.has('doc') && this.selectedDataSet) {
            const newDataSet = updateElementReference(this.doc, this.selectedDataSet);
            this.selectedDataSet = newDataSet ?? undefined;
            if (!newDataSet && this.selectionList && this.selectionList.selected)
                this.selectionList.selected.selected = false;
        }
        super.update(props);
    }
    selectDataSet(evt) {
        const id = evt.target.selected.value;
        const dataSet = find(this.doc, 'DataSet', id);
        if (dataSet) {
            this.selectedDataSet = dataSet;
            evt.target.classList.add('hidden');
            this.selectDataSetButton.classList.remove('hidden');
        }
    }
    renderElementEditorContainer() {
        if (this.selectedDataSet)
            return html `<div class="elementeditorcontainer">
        <data-set-element-editor
          .element=${this.selectedDataSet}
        ></data-set-element-editor>
      </div>`;
        return html ``;
    }
    renderSelectionList() {
        return html `<filtered-list
      activatable
      @action=${this.selectDataSet}
      class="selectionlist"
      >${Array.from(this.doc.querySelectorAll('IED'))
            .sort(compareNames)
            .flatMap(ied => {
            const ieditem = html `<mwc-list-item
              class="listitem header"
              noninteractive
              graphic="icon"
              value="${Array.from(ied.querySelectorAll('DataSet'))
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
            const dataSets = Array.from(ied.querySelectorAll('DataSet')).map(dataSet => html `<mwc-list-item twoline value="${identity(dataSet)}"
                ><span>${dataSet.getAttribute('name')}</span
                ><span slot="secondary">${identity(dataSet)}</span>
              </mwc-list-item>`);
            return [ieditem, ...dataSets];
        })}</filtered-list
    >`;
    }
    renderToggleButton() {
        return html `<mwc-button
      outlined
      label="${get('publisher.selectbutton', { type: 'DataSet' })}"
      @click=${() => {
            this.selectionList.classList.remove('hidden');
            this.selectDataSetButton.classList.add('hidden');
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
DataSetEditor.styles = css `
    ${styles}

    data-set-element-editor {
      flex: auto;
    }
  `;
__decorate([
    property({ attribute: false })
], DataSetEditor.prototype, "doc", void 0);
__decorate([
    state()
], DataSetEditor.prototype, "selectedDataSet", void 0);
__decorate([
    query('.selectionlist')
], DataSetEditor.prototype, "selectionList", void 0);
__decorate([
    query('mwc-button')
], DataSetEditor.prototype, "selectDataSetButton", void 0);
DataSetEditor = __decorate([
    customElement('data-set-editor')
], DataSetEditor);
export { DataSetEditor };
//# sourceMappingURL=data-set-editor.js.map