import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { html, css, property, query, LitElement, } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import '../../../_snowpack/pkg/@material/mwc-button.js';
import '../../../_snowpack/pkg/@material/mwc-dialog.js';
import '../../../_snowpack/pkg/@material/mwc-list.js';
import '../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js';
export default class SclHistoryPlugin extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
    }
    createMessage(who, why) {
        let message = who;
        if (message !== null && why !== null) {
            message += ' : ' + why;
        }
        else if (why !== null) {
            message = why;
        }
        return message ?? undefined;
    }
    get sclHistory() {
        if (this.doc) {
            return Array.from(this.doc.querySelectorAll(':root > Header > History > Hitem'));
        }
        return [];
    }
    async run() {
        this.historyLog.open = true;
    }
    renderSclHistoryEntry(element) {
        const message = this.createMessage(element.getAttribute('who'), element.getAttribute('why'));
        const title = element.getAttribute('what');
        return html ` <abbr title="${title}">
      <mwc-list-item class="sclHistory" ?twoline=${!!message}>
        <span>
          <tt>${element.getAttribute('when')}</tt>
          ${title}</span
        >
        <span slot="secondary">${message}</span>
      </mwc-list-item></abbr
    >`;
    }
    renderSclHistory() {
        if (this.sclHistory.length > 0)
            return this.sclHistory
                .slice()
                .reverse()
                .map(this.renderSclHistoryEntry, this);
        else
            return html `<mwc-list-item disabled>
        <span>${get('history.noEntries')}</span>
      </mwc-list-item>`;
    }
    render() {
        return html ` <mwc-dialog id="historyLog" heading="${get('history.name')}">
      <mwc-list id="historyLogContent" wrapFocus
        >${this.renderSclHistory()}</mwc-list
      >
      <mwc-button slot="secondaryAction" dialogaction="close"
        >${get('close')}</mwc-button
      >
    </mwc-dialog>`;
    }
}
SclHistoryPlugin.styles = css `
    .sclHistory {
      display: flex;
    }
    #historyLog {
      --mdc-dialog-min-width: 92vw;
    }
    abbr {
      text-decoration: none;
    }
  `;
__decorate([
    property({ attribute: false })
], SclHistoryPlugin.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], SclHistoryPlugin.prototype, "editCount", void 0);
__decorate([
    query('#historyLog')
], SclHistoryPlugin.prototype, "historyLog", void 0);
//# sourceMappingURL=SclHistory.js.map