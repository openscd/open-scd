import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { css, html, LitElement, property, query, } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import '../../../_snowpack/pkg/@material/mwc-dialog.js';
import '../../../_snowpack/pkg/@material/mwc-list.js';
import '../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js';
import '../../../_snowpack/pkg/@material/mwc-formfield.js';
import '../../../_snowpack/pkg/@material/mwc-checkbox.js';
import '../../../openscd/src/plain-compare-list.js';
import { compareNames, find, getNameAttribute, identity, isPublic, } from '../../../openscd/src/foundation.js';
import { newPendingStateEvent } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/waiter.js';
const tctrClass = `LN[lnClass='TCTR']`;
const tvtrClass = `LN[lnClass='TVTR']`;
const setMag = `SDI[name='setMag'] Val`;
const setVal = `DAI[name='setVal'] Val`;
const filterToIgnore = {
    ':scope': {
        attributes: {
            name: true,
        },
    },
    P: {
        full: true,
    },
};
filterToIgnore[`${tctrClass} DOI[name='Rat'] ${setMag}`] = {
    full: true,
};
filterToIgnore[`${tctrClass} DOI[name='ARtg'] ${setMag}`] = {
    full: true,
};
filterToIgnore[`${tctrClass} DOI[name='ARtgNom'] ${setMag}`] = {
    full: true,
};
filterToIgnore[`${tctrClass} DOI[name='ARtgSec'] ${setVal}`] = {
    full: true,
};
filterToIgnore[`${tvtrClass} DOI[name='VRtg'] ${setMag}`] = {
    full: true,
};
filterToIgnore[`${tvtrClass} DOI[name='Rat'] ${setMag}`] = {
    full: true,
};
filterToIgnore[`${tvtrClass} DOI[name='VRtgSec'] ${setVal}`] = {
    full: true,
};
export default class CompareIEDPlugin extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
        this.templateDocName = '';
    }
    get ieds() {
        if (this.doc) {
            return Array.from(this.doc.querySelectorAll(`IED`))
                .filter(isPublic)
                .sort(compareNames);
        }
        return [];
    }
    get templateIeds() {
        if (this.templateDoc) {
            return Array.from(this.templateDoc.querySelectorAll(`IED`))
                .filter(isPublic)
                .sort(compareNames);
        }
        return [];
    }
    async run() {
        this.dialog.open = true;
    }
    onClosed() {
        this.templateDoc = undefined;
        this.selectedProjectIed = undefined;
        this.selectedTemplateIed = undefined;
    }
    getSelectedListItem(doc, listId) {
        const selectListItem = (this.shadowRoot.querySelector(`mwc-list[id='${listId}']`)
            .selected);
        const identity = selectListItem?.value;
        if (identity) {
            return find(doc, 'IED', identity) ?? undefined;
        }
        return undefined;
    }
    async getTemplateFile(evt) {
        const file = evt.target?.files?.item(0) ?? false;
        if (!file)
            return;
        this.templateDocName = file.name;
        const templateText = await file.text();
        this.templateDoc = new DOMParser().parseFromString(templateText, 'application/xml');
        this.templateFileUI.onchange = null;
    }
    renderSelectIedButton() {
        return html `<mwc-button
      slot="primaryAction"
      icon="arrow_back"
      trailingIcon
      label="${get('compare-ied.selectIedButton')}"
      @click=${() => {
            this.selectedProjectIed = undefined;
            this.selectedTemplateIed = undefined;
        }}
    ></mwc-button>`;
    }
    renderCompareButton() {
        return html `<mwc-button
      slot="primaryAction"
      icon="compare_arrows"
      trailingIcon
      label="${get('compare.compareButton')}"
      @click=${() => {
            this.selectedProjectIed = this.getSelectedListItem(this.doc, 'currentDocument');
            this.selectedTemplateIed = this.getSelectedListItem(this.templateDoc, 'currentTemplate');
        }}
    ></mwc-button>`;
    }
    renderCloseButton() {
        return html `<mwc-button
      slot="secondaryAction"
      dialogAction="close"
      label="${get('close')}"
      style="--mdc-theme-primary: var(--mdc-theme-error)"
    ></mwc-button>`;
    }
    renderCompare() {
        const leftHandTitle = identity(this.selectedProjectIed);
        const rightHandTitle = identity(this.selectedTemplateIed);
        return html `<plain-compare-list
        .leftHandObject=${this.selectedProjectIed}
        .rightHandObject=${this.selectedTemplateIed}
        .leftHandTitle=${typeof leftHandTitle === 'number' ? '' : leftHandTitle}
        .rightHandTitle=${typeof rightHandTitle === 'number'
            ? ''
            : rightHandTitle}
        .leftHandSubtitle=${this.docName}
        .rightHandSubtitle=${this.templateDocName}
        .filterToIgnore=${filterToIgnore}
      ></plain-compare-list>
      ${this.renderSelectIedButton()} ${this.renderCloseButton()}`;
    }
    renderIEDList(ieds, id) {
        return html `<mwc-list id="${id}" activatable>
      ${ieds.map(ied => {
            const name = getNameAttribute(ied);
            return html `<mwc-list-item value="${identity(ied)}" left>
          <span>${name}</span>
        </mwc-list-item>`;
        })}
    </mwc-list>`;
    }
    renderIEDLists() {
        return html `<div class="splitContainer">
        <div>
          <div>${get('compare-ied.projectIedTitle')}</div>
          <div class="iedList">
            ${this.renderIEDList(this.ieds, 'currentDocument')}
          </div>
        </div>
        <div>
          <div>${get('compare-ied.templateIedTitle')}</div>
          <div class="iedList">
            ${this.renderIEDList(this.templateIeds, 'currentTemplate')}
          </div>
        </div>
      </div>
      ${this.renderCompareButton()} ${this.renderCloseButton()}`;
    }
    renderSelectTemplateFile() {
        return html `<div>
        <input
          id="template-file"
          accept=".sed,.scd,.ssd,.isd,.iid,.cid,.icd"
          type="file"
          hidden
          required
          @change=${(evt) => this.dispatchEvent(newPendingStateEvent(this.getTemplateFile(evt)))}
        />

        <mwc-button
          label="${get('compare-ied.selectTemplateButton')}"
          @click=${() => {
            const input = (this.shadowRoot.querySelector('#template-file'));
            input?.click();
        }}
        ></mwc-button>
      </div>
      ${this.renderCloseButton()}`;
    }
    renderDialog(content, heading) {
        return html `<mwc-dialog heading="${heading}" @closed=${this.onClosed}>
      ${content}
    </mwc-dialog>`;
    }
    render() {
        if (!this.doc)
            return html ``;
        if (this.selectedProjectIed && this.selectedTemplateIed) {
            return this.renderDialog(this.renderCompare(), get('compare-ied.resultTitle'));
        }
        else if (this.templateDoc) {
            return this.renderDialog(this.renderIEDLists(), get('compare-ied.selectIedTitle'));
        }
        else {
            return this.renderDialog(this.renderSelectTemplateFile(), get('compare-ied.selectProjectTitle'));
        }
    }
}
CompareIEDPlugin.styles = css `
    mwc-dialog {
      --mdc-dialog-min-width: 64vw;
    }

    .splitContainer {
      display: flex;
      padding: 8px 6px 16px;
      height: 64vh;
    }

    .iedList {
      flex: 50%;
      margin: 0px 6px 0px;
      min-width: 300px;
      height: 100%;
      overflow-y: auto;
    }

    .resultTitle {
      font-weight: bold;
    }
  `;
__decorate([
    property({ attribute: false })
], CompareIEDPlugin.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], CompareIEDPlugin.prototype, "editCount", void 0);
__decorate([
    property({ attribute: false })
], CompareIEDPlugin.prototype, "templateDoc", void 0);
__decorate([
    property({ attribute: false })
], CompareIEDPlugin.prototype, "selectedProjectIed", void 0);
__decorate([
    property({ attribute: false })
], CompareIEDPlugin.prototype, "selectedTemplateIed", void 0);
__decorate([
    query('mwc-dialog')
], CompareIEDPlugin.prototype, "dialog", void 0);
__decorate([
    query('#template-file')
], CompareIEDPlugin.prototype, "templateFileUI", void 0);
__decorate([
    property({ attribute: false })
], CompareIEDPlugin.prototype, "docName", void 0);
//# sourceMappingURL=CompareIED.js.map