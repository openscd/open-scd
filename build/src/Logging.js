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
  internalProperty,
  property,
  query
} from "../_snowpack/pkg/lit-element.js";
import {ifDefined} from "../_snowpack/pkg/lit-html/directives/if-defined.js";
import {get, translate} from "../_snowpack/pkg/lit-translate.js";
import "../_snowpack/pkg/@material/mwc-button.js";
import "../_snowpack/pkg/@material/mwc-dialog.js";
import "../_snowpack/pkg/@material/mwc-icon.js";
import "../_snowpack/pkg/@material/mwc-icon-button.js";
import "../_snowpack/pkg/@material/mwc-icon-button-toggle.js";
import "../_snowpack/pkg/@material/mwc-list.js";
import "../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../_snowpack/pkg/@material/mwc-snackbar.js";
import "./filtered-list.js";
import {
  ifImplemented,
  invert,
  newActionEvent
} from "./foundation.js";
import {getFilterIcon, iconColors} from "./icons/icons.js";
const icons = {
  info: "info",
  warning: "warning",
  error: "report",
  action: "history"
};
function getPluginName(src) {
  const plugin = JSON.parse(localStorage.getItem("plugins") ?? "[]").find((p) => p.src === src);
  if (!plugin)
    return src;
  const name = plugin.name;
  return name || src;
}
export function Logging(Base) {
  class LoggingElement extends Base {
    constructor(...args) {
      super(...args);
      this.history = [];
      this.currentAction = -1;
      this.diagnoses = new Map();
      this.undo = this.undo.bind(this);
      this.redo = this.redo.bind(this);
      this.onLog = this.onLog.bind(this);
      this.addEventListener("log", this.onLog);
      this.addEventListener("issue", this.onIssue);
    }
    get canUndo() {
      return this.currentAction >= 0;
    }
    get canRedo() {
      return this.nextAction >= 0;
    }
    get previousAction() {
      if (!this.canUndo)
        return -1;
      return this.history.slice(0, this.currentAction).map((entry) => entry.kind == "action" ? true : false).lastIndexOf(true);
    }
    get nextAction() {
      let index = this.history.slice(this.currentAction + 1).findIndex((entry) => entry.kind == "action");
      if (index >= 0)
        index += this.currentAction + 1;
      return index;
    }
    onIssue(de) {
      const issues = this.diagnoses.get(de.detail.validatorId);
      if (!issues)
        this.diagnoses.set(de.detail.validatorId, [de.detail]);
      else
        issues?.push(de.detail);
      this.latestIssue = de.detail;
      this.issueUI.close();
      this.issueUI.show();
    }
    undo() {
      if (!this.canUndo)
        return false;
      this.dispatchEvent(newActionEvent(invert(this.history[this.currentAction].action)));
      this.currentAction = this.previousAction;
      return true;
    }
    redo() {
      if (!this.canRedo)
        return false;
      this.dispatchEvent(newActionEvent(this.history[this.nextAction].action));
      this.currentAction = this.nextAction;
      return true;
    }
    onLog(le) {
      if (le.detail.kind === "reset") {
        this.history = [];
        this.currentAction = -1;
        return;
      }
      const entry = {
        time: new Date(),
        ...le.detail
      };
      if (entry.kind === "action") {
        if (entry.action.derived)
          return;
        entry.action.derived = true;
        if (this.nextAction !== -1)
          this.history.splice(this.nextAction);
        this.currentAction = this.history.length;
      }
      this.history.push(entry);
      if (!this.logUI.open) {
        const ui = {
          error: this.errorUI,
          warning: this.warningUI,
          info: this.infoUI,
          action: this.infoUI
        }[le.detail.kind];
        ui.close();
        ui.show();
      }
      if (le.detail.kind == "error") {
        this.errorUI.close();
        this.errorUI.show();
      }
      this.requestUpdate("history", []);
    }
    async performUpdate() {
      await new Promise((resolve) => requestAnimationFrame(() => resolve()));
      super.performUpdate();
    }
    renderLogEntry(entry, index, history) {
      return html` <abbr title="${entry.title}">
        <mwc-list-item
          class="${entry.kind}"
          graphic="icon"
          ?twoline=${!!entry.message}
          ?activated=${this.currentAction == history.length - index - 1}
        >
          <span>
            <!-- FIXME: replace tt with mwc-chip asap -->
            <tt>${entry.time?.toLocaleString()}</tt>
            ${entry.title}</span
          >
          <span slot="secondary">${entry.message}</span>
          <mwc-icon
            slot="graphic"
            style="--mdc-theme-text-icon-on-background:var(${ifDefined(iconColors[entry.kind])})"
            >${icons[entry.kind]}</mwc-icon
          >
        </mwc-list-item></abbr
      >`;
    }
    renderHistory() {
      if (this.history.length > 0)
        return this.history.slice().reverse().map(this.renderLogEntry, this);
      else
        return html`<mwc-list-item disabled graphic="icon">
          <span>${translate("log.placeholder")}</span>
          <mwc-icon slot="graphic">info</mwc-icon>
        </mwc-list-item>`;
    }
    renderIssueEntry(issue) {
      return html` <abbr title="${issue.title + "\n" + issue.message}"
        ><mwc-list-item ?twoline=${!!issue.message}>
          <span> ${issue.title}</span>
          <span slot="secondary">${issue.message}</span>
        </mwc-list-item></abbr
      >`;
    }
    renderValidatorsIssues(issues) {
      if (issues.length === 0)
        return [html``];
      return [
        html`<mwc-list-item noninteractive
          >${getPluginName(issues[0].validatorId)}</mwc-list-item
        >`,
        html`<li divider padded role="separator"></li>`,
        ...issues.map((issue) => this.renderIssueEntry(issue))
      ];
    }
    renderIssues() {
      const issueItems = [];
      this.diagnoses.forEach((issues) => {
        this.renderValidatorsIssues(issues).forEach((issueItem) => issueItems.push(issueItem));
      });
      return issueItems.length ? issueItems : html`<mwc-list-item disabled graphic="icon">
            <span>${translate("diag.placeholder")}</span>
            <mwc-icon slot="graphic">info</mwc-icon>
          </mwc-list-item>`;
    }
    renderFilterButtons() {
      return Object.keys(icons).map((kind) => html`<mwc-icon-button-toggle id="${kind}filter" on
          >${getFilterIcon(kind, false)}
          ${getFilterIcon(kind, true)}</mwc-icon-button-toggle
        >`);
    }
    render() {
      return html`${ifImplemented(super.render())}
        <style>
          #log > mwc-icon-button-toggle {
            position: absolute;
            top: 8px;
            right: 14px;
          }
          #log > mwc-icon-button-toggle:nth-child(2) {
            right: 62px;
          }
          #log > mwc-icon-button-toggle:nth-child(3) {
            right: 110px;
          }
          #log > mwc-icon-button-toggle:nth-child(4) {
            right: 158px;
          }
          #log > mwc-icon-button-toggle:nth-child(5) {
            right: 206px;
          }
          #content mwc-list-item.info,
          #content mwc-list-item.warning,
          #content mwc-list-item.error,
          #content mwc-list-item.action {
            display: none;
          }
          #infofilter[on] ~ #content mwc-list-item.info {
            display: flex;
          }
          #warningfilter[on] ~ #content mwc-list-item.warning {
            display: flex;
          }
          #errorfilter[on] ~ #content mwc-list-item.error {
            display: flex;
          }
          #actionfilter[on] ~ #content mwc-list-item.action {
            display: flex;
          }

          #infofilter[on] {
            color: var(--cyan);
          }

          #warningfilter[on] {
            color: var(--yellow);
          }

          #errorfilter[on] {
            color: var(--red);
          }

          #actionfilter[on] {
            color: var(--blue);
          }

          #log {
            --mdc-dialog-min-width: 92vw;
          }

          #log > #filterContainer {
            position: absolute;
            top: 14px;
            right: 14px;
          }
        </style>
        <mwc-dialog id="log" heading="${translate("log.name")}">
          ${this.renderFilterButtons()}
          <mwc-list id="content" wrapFocus>${this.renderHistory()}</mwc-list>
          <mwc-button
            icon="undo"
            label="${translate("undo")}"
            ?disabled=${!this.canUndo}
            @click=${this.undo}
            slot="secondaryAction"
          ></mwc-button>
          <mwc-button
            icon="redo"
            label="${translate("redo")}"
            ?disabled=${!this.canRedo}
            @click=${this.redo}
            slot="secondaryAction"
          ></mwc-button>
          <mwc-button slot="primaryAction" dialogaction="close"
            >${translate("close")}</mwc-button
          >
        </mwc-dialog>

        <mwc-dialog id="diagnostic" heading="${translate("diag.name")}">
          <filtered-list id="content" wrapFocus
            >${this.renderIssues()}</filtered-list
          >
          <mwc-button slot="primaryAction" dialogaction="close"
            >${translate("close")}</mwc-button
          >
        </mwc-dialog>

        <mwc-snackbar
          id="info"
          timeoutMs="4000"
          labelText="${this.history.slice().reverse().find((le) => le.kind === "info" || le.kind === "action")?.title ?? get("log.snackbar.placeholder")}"
        >
          <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
        </mwc-snackbar>
        <mwc-snackbar
          id="warning"
          timeoutMs="6000"
          labelText="${this.history.slice().reverse().find((le) => le.kind === "warning")?.title ?? get("log.snackbar.placeholder")}"
        >
          <mwc-button
            slot="action"
            icon="history"
            @click=${() => this.logUI.show()}
            >${translate("log.snackbar.show")}</mwc-button
          >
          <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
        </mwc-snackbar>
        <mwc-snackbar
          id="error"
          timeoutMs="10000"
          labelText="${this.history.slice().reverse().find((le) => le.kind === "error")?.title ?? get("log.snackbar.placeholder")}"
        >
          <mwc-button
            slot="action"
            icon="history"
            @click=${() => this.logUI.show()}
            >${translate("log.snackbar.show")}</mwc-button
          >
          <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
        </mwc-snackbar>
        <mwc-snackbar
          id="issue"
          timeoutMs="10000"
          labelText="${this.latestIssue?.title ?? get("log.snackbar.placeholder")}"
        >
          <mwc-button
            slot="action"
            icon="rule"
            @click=${() => this.diagnosticUI.show()}
            >${translate("log.snackbar.show")}</mwc-button
          >
          <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
        </mwc-snackbar>`;
    }
  }
  __decorate([
    property({type: Array})
  ], LoggingElement.prototype, "history", 2);
  __decorate([
    property({type: Number})
  ], LoggingElement.prototype, "currentAction", 2);
  __decorate([
    property()
  ], LoggingElement.prototype, "diagnoses", 2);
  __decorate([
    internalProperty()
  ], LoggingElement.prototype, "latestIssue", 2);
  __decorate([
    query("#log")
  ], LoggingElement.prototype, "logUI", 2);
  __decorate([
    query("#diagnostic")
  ], LoggingElement.prototype, "diagnosticUI", 2);
  __decorate([
    query("#error")
  ], LoggingElement.prototype, "errorUI", 2);
  __decorate([
    query("#warning")
  ], LoggingElement.prototype, "warningUI", 2);
  __decorate([
    query("#info")
  ], LoggingElement.prototype, "infoUI", 2);
  __decorate([
    query("#issue")
  ], LoggingElement.prototype, "issueUI", 2);
  return LoggingElement;
}
