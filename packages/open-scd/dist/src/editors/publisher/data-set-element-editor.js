import { __decorate } from "tslib";
import { css, customElement, html, LitElement, property, state, } from 'lit-element';
import { translate } from 'lit-translate';
import '@material/mwc-list/mwc-list-item';
import '../../wizard-textfield.js';
import '../../filtered-list.js';
import { identity } from '../../foundation.js';
let DataSetElementEditor = class DataSetElementEditor extends LitElement {
    get name() {
        return this.element ? this.element.getAttribute('name') : 'UNDEFINED';
    }
    get desc() {
        return this.element ? this.element.getAttribute('desc') : 'UNDEFINED';
    }
    renderContent() {
        return html `<wizard-textfield
        label="name"
        .maybeValue=${this.name}
        helper="${translate('scl.name')}"
        required
        disabled
      >
      </wizard-textfield>
      <wizard-textfield
        label="desc"
        .maybeValue=${this.desc}
        helper="${translate('scl.desc')}"
        nullable
        disabled
      >
      </wizard-textfield>
      <filtered-list
        >${Array.from(this.element.querySelectorAll('FCDA')).map(fcda => {
            const [ldInst, prefix, lnClass, lnInst, doName, daName, fc] = [
                'ldInst',
                'prefix',
                'lnClass',
                'lnInst',
                'doName',
                'daName',
                'fc',
            ].map(attributeName => fcda.getAttribute(attributeName) ?? '');
            return html `<mwc-list-item selected twoline value="${identity(fcda)}"
            ><span
              >${doName}${daName
                ? '.' + daName + ' ' + '[' + fc + ']'
                : ' ' + '[' + fc + ']'}</span
            ><span slot="secondary"
              >${ldInst + '/' + prefix + lnClass + lnInst}</span
            >
          </mwc-list-item>`;
        })}</filtered-list
      >`;
    }
    render() {
        if (this.element)
            return html `<div class="content">
        <h2>
          <div>DataSet</div>
          <div class="headersubtitle">${identity(this.element)}</div>
        </h2>
        ${this.renderContent()}
      </div>`;
        return html `<div class="content">
      <h2>
        <div>DataSet</div>
        <div class="headersubtitle">${translate('publisher.nodataset')}</div>
      </h2>
    </div>`;
    }
};
DataSetElementEditor.styles = css `
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
    property({ attribute: false })
], DataSetElementEditor.prototype, "doc", void 0);
__decorate([
    property({ attribute: false })
], DataSetElementEditor.prototype, "element", void 0);
__decorate([
    state()
], DataSetElementEditor.prototype, "name", null);
__decorate([
    state()
], DataSetElementEditor.prototype, "desc", null);
DataSetElementEditor = __decorate([
    customElement('data-set-element-editor')
], DataSetElementEditor);
export { DataSetElementEditor };
//# sourceMappingURL=data-set-element-editor.js.map