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
  html,
  css,
  property,
  query,
  LitElement
} from "../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import "../../../_snowpack/pkg/@material/mwc-button.js";
import "../../../_snowpack/pkg/@material/mwc-dialog.js";
import "../../../_snowpack/pkg/@material/mwc-list.js";
import "../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
export default class SclHistoryPlugin extends LitElement {
  constructor() {
    super(...arguments);
    this.editCount = -1;
  }
  createMessage(who, why) {
    let message = who;
    if (message !== null && why !== null) {
      message += " : " + why;
    } else if (why !== null) {
      message = why;
    }
    return message ?? void 0;
  }
  get sclHistory() {
    if (this.doc) {
      return Array.from(this.doc.querySelectorAll(":root > Header > History > Hitem"));
    }
    return [];
  }
  async run() {
    this.historyLog.open = true;
  }
  renderSclHistoryEntry(element) {
    const message = this.createMessage(element.getAttribute("who"), element.getAttribute("why"));
    const title = element.getAttribute("what");
    return html` <abbr title="${title}">
      <mwc-list-item class="sclHistory" ?twoline=${!!message}>
        <span>
          <tt>${element.getAttribute("when")}</tt>
          ${title}</span
        >
        <span slot="secondary">${message}</span>
      </mwc-list-item></abbr
    >`;
  }
  renderSclHistory() {
    if (this.sclHistory.length > 0)
      return this.sclHistory.slice().reverse().map(this.renderSclHistoryEntry, this);
    else
      return html`<mwc-list-item disabled>
        <span>${get("history.noEntries")}</span>
      </mwc-list-item>`;
  }
  render() {
    return html` <mwc-dialog id="historyLog" heading="${get("history.name")}">
      <mwc-list id="historyLogContent" wrapFocus
        >${this.renderSclHistory()}</mwc-list
      >
      <mwc-button slot="secondaryAction" dialogaction="close"
        >${get("close")}</mwc-button
      >
    </mwc-dialog>`;
  }
}
SclHistoryPlugin.styles = css`
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
  property({attribute: false})
], SclHistoryPlugin.prototype, "doc", 2);
__decorate([
  property({type: Number})
], SclHistoryPlugin.prototype, "editCount", 2);
__decorate([
  query("#historyLog")
], SclHistoryPlugin.prototype, "historyLog", 2);
