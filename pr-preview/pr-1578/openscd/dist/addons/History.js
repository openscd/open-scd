import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { html, state, property, query, customElement, LitElement, } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import '../../../_snowpack/pkg/@material/mwc-button.js';
import '../../../_snowpack/pkg/@material/mwc-dialog.js';
import '../../../_snowpack/pkg/@material/mwc-icon.js';
import '../../../_snowpack/pkg/@material/mwc-icon-button.js';
import '../../../_snowpack/pkg/@material/mwc-icon-button-toggle.js';
import '../../../_snowpack/pkg/@material/mwc-list.js';
import '../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js';
import '../../../_snowpack/pkg/@material/mwc-snackbar.js';
import '../filtered-list.js';
import { newActionEvent, invert, } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js';
import { getFilterIcon, iconColors } from '../icons/icons.js';
const icons = {
    info: 'info',
    warning: 'warning',
    error: 'report',
};
function getPluginName(src) {
    let storedPluginsString = localStorage.getItem('plugins');
    if (!storedPluginsString) {
        storedPluginsString = '[]';
    }
    const storedPlugins = JSON.parse(storedPluginsString);
    const wantedPlugin = storedPlugins.find((p) => p.src === src);
    if (!wantedPlugin) {
        return `pluginnotfound: ${src} in ${storedPluginsString}`;
    }
    const name = wantedPlugin.name;
    if (!name) {
        return `pluginhasnoname:${src}`;
    }
    return name;
}
export var HistoryUIKind;
(function (HistoryUIKind) {
    HistoryUIKind["log"] = "log";
    HistoryUIKind["history"] = "history";
    HistoryUIKind["diagnostic"] = "diagnostic";
})(HistoryUIKind || (HistoryUIKind = {}));
export function newHistoryUIEvent(show, kind, eventInitDict) {
    return new CustomEvent('history-dialog-ui', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: {
            show,
            kind,
            ...eventInitDict?.detail,
        },
    });
}
export function newEmptyIssuesEvent(pluginSrc, eventInitDict) {
    return new CustomEvent('empty-issues', {
        bubbles: true,
        composed: true,
        ...eventInitDict,
        detail: { pluginSrc, ...eventInitDict?.detail },
    });
}
export function newUndoEvent() {
    return new CustomEvent('undo', { bubbles: true, composed: true });
}
export function newRedoEvent() {
    return new CustomEvent('redo', { bubbles: true, composed: true });
}
let OscdHistory = class OscdHistory extends LitElement {
    get canUndo() {
        return this.editCount >= 0;
    }
    get canRedo() {
        return this.nextAction >= 0;
    }
    get previousAction() {
        if (!this.canUndo)
            return -1;
        return this.history
            .slice(0, this.editCount)
            .map(entry => (entry.kind == 'action' ? true : false))
            .lastIndexOf(true);
    }
    get nextAction() {
        let index = this.history
            .slice(this.editCount + 1)
            .findIndex(entry => entry.kind == 'action');
        if (index >= 0)
            index += this.editCount + 1;
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
        const invertedAction = invert(this.history[this.editCount].action);
        this.dispatchEvent(newActionEvent(invertedAction, 'undo'));
        this.editCount = this.previousAction;
        return true;
    }
    redo() {
        if (!this.canRedo)
            return false;
        const nextAction = this.history[this.nextAction].action;
        this.dispatchEvent(newActionEvent(nextAction, 'redo'));
        this.editCount = this.nextAction;
        return true;
    }
    onHistory(detail) {
        const entry = {
            time: new Date(),
            ...detail,
        };
        if (entry.kind === 'action') {
            if (entry.action.derived)
                return;
            entry.action.derived = true;
            if (this.nextAction !== -1)
                this.history.splice(this.nextAction);
            this.editCount = this.history.length;
        }
        this.history.push(entry);
        this.requestUpdate('history', []);
    }
    onReset() {
        this.log = [];
        this.history = [];
        this.editCount = -1;
    }
    onInfo(detail) {
        const entry = {
            time: new Date(),
            ...detail,
        };
        this.log.push(entry);
        if (!this.logUI.open) {
            const ui = {
                error: this.errorUI,
                warning: this.warningUI,
                info: this.infoUI,
            }[detail.kind];
            ui.close();
            ui.show();
        }
        if (detail.kind == 'error') {
            this.errorUI.close(); // hack to reset timeout
            this.errorUI.show();
        }
        this.requestUpdate('log', []);
    }
    onLog(le) {
        switch (le.detail.kind) {
            case 'reset':
                this.onReset();
                break;
            case 'action':
                this.onHistory(le.detail);
                break;
            default:
                this.onInfo(le.detail);
                break;
        }
    }
    historyUIHandler(e) {
        const ui = {
            log: this.logUI,
            history: this.historyUI,
            diagnostic: this.diagnosticUI,
        }[e.detail.kind];
        if (e.detail.show)
            ui.show();
        else
            ui.close();
    }
    emptyIssuesHandler(e) {
        if (this.diagnoses.get(e.detail.pluginSrc))
            this.diagnoses.get(e.detail.pluginSrc).length = 0;
    }
    handleKeyPress(e) {
        const ctrlAnd = (key) => e.key === key && e.ctrlKey;
        if (ctrlAnd('y'))
            this.redo();
        if (ctrlAnd('z'))
            this.undo();
        if (ctrlAnd('l'))
            this.logUI.open ? this.logUI.close() : this.logUI.show();
        if (ctrlAnd('d'))
            this.diagnosticUI.open
                ? this.diagnosticUI.close()
                : this.diagnosticUI.show();
    }
    constructor() {
        super();
        /** All [[`LogEntry`]]s received so far through [[`LogEvent`]]s. */
        this.log = [];
        /** All [[`CommitEntry`]]s received so far through [[`LogEvent`]]s */
        this.history = [];
        /** Index of the last [[`EditorAction`]] applied. */
        this.editCount = -1;
        this.diagnoses = new Map();
        this.undo = this.undo.bind(this);
        this.redo = this.redo.bind(this);
        this.onLog = this.onLog.bind(this);
        this.onIssue = this.onIssue.bind(this);
        this.historyUIHandler = this.historyUIHandler.bind(this);
        this.emptyIssuesHandler = this.emptyIssuesHandler.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        document.onkeydown = this.handleKeyPress;
    }
    connectedCallback() {
        super.connectedCallback();
        this.host.addEventListener('log', this.onLog);
        this.host.addEventListener('issue', this.onIssue);
        this.host.addEventListener('history-dialog-ui', this.historyUIHandler);
        this.host.addEventListener('empty-issues', this.emptyIssuesHandler);
        this.host.addEventListener('undo', this.undo);
        this.host.addEventListener('redo', this.redo);
        this.diagnoses.clear();
    }
    renderLogEntry(entry, index, log) {
        return html ` <abbr title="${entry.title}">
      <mwc-list-item
        class="${entry.kind}"
        graphic="icon"
        ?twoline=${!!entry.message}
        ?activated=${this.editCount == log.length - index - 1}
      >
        <span>
          <!-- FIXME: replace tt with mwc-chip asap -->
          <tt>${entry.time?.toLocaleString()}</tt>
          ${entry.title}</span
        >
        <span slot="secondary">${entry.message}</span>
        <mwc-icon
          slot="graphic"
          style="--mdc-theme-text-icon-on-background:var(${iconColors[entry.kind]})"
          >${icons[entry.kind]}</mwc-icon
        >
      </mwc-list-item></abbr
    >`;
    }
    renderHistoryEntry(entry, index, history) {
        return html ` <abbr title="${entry.title}">
      <mwc-list-item
        class="${entry.kind}"
        graphic="icon"
        ?twoline=${!!entry.message}
        ?activated=${this.editCount == history.length - index - 1}
      >
        <span>
          <!-- FIXME: replace tt with mwc-chip asap -->
          <tt>${entry.time?.toLocaleString()}</tt>
          ${entry.title}</span
        >
        <span slot="secondary">${entry.message}</span>
        <mwc-icon
          slot="graphic"
          style="--mdc-theme-text-icon-on-background:var(${iconColors[entry.kind]})"
          >history</mwc-icon
        >
      </mwc-list-item></abbr
    >`;
    }
    renderLog() {
        if (this.log.length > 0)
            return this.log.slice().reverse().map(this.renderLogEntry, this);
        else
            return html `<mwc-list-item disabled graphic="icon">
        <span>${get('log.placeholder')}</span>
        <mwc-icon slot="graphic">info</mwc-icon>
      </mwc-list-item>`;
    }
    renderHistory() {
        if (this.history.length > 0)
            return this.history.slice().reverse().map(this.renderHistoryEntry, this);
        else
            return html `<mwc-list-item disabled graphic="icon">
        <span>${get('history.placeholder')}</span>
        <mwc-icon slot="graphic">info</mwc-icon>
      </mwc-list-item>`;
    }
    renderIssueEntry(issue) {
        return html ` <abbr title="${issue.title + '\n' + issue.message}"
      ><mwc-list-item ?twoline=${!!issue.message}>
        <span> ${issue.title}</span>
        <span slot="secondary">${issue.message}</span>
      </mwc-list-item></abbr
    >`;
    }
    renderValidatorsIssues(issues) {
        if (issues.length === 0)
            return [html ``];
        return [
            html `
        <mwc-list-item noninteractive>
          ${getPluginName(issues[0].validatorId)}
        </mwc-list-item>
      `,
            html `<li divider padded role="separator"></li>`,
            ...issues.map(issue => this.renderIssueEntry(issue)),
        ];
    }
    renderIssues() {
        const issueItems = [];
        this.diagnoses.forEach(issues => {
            this.renderValidatorsIssues(issues).forEach(issueItem => issueItems.push(issueItem));
        });
        return issueItems.length
            ? issueItems
            : html `<mwc-list-item disabled graphic="icon">
          <span>${get('diag.placeholder')}</span>
          <mwc-icon slot="graphic">info</mwc-icon>
        </mwc-list-item>`;
    }
    renderFilterButtons() {
        return Object.keys(icons).map(kind => html `<mwc-icon-button-toggle id="${kind}filter" on
        >${getFilterIcon(kind, false)}
        ${getFilterIcon(kind, true)}</mwc-icon-button-toggle
      >`);
    }
    renderLogDialog() {
        return html ` <mwc-dialog id="log" heading="${get('log.name')}">
      ${this.renderFilterButtons()}
      <mwc-list id="content" wrapFocus>${this.renderLog()}</mwc-list>
      <mwc-button slot="primaryAction" dialogaction="close"
        >${get('close')}</mwc-button
      >
    </mwc-dialog>`;
    }
    renderHistoryUI() {
        return html ` <mwc-dialog id="history" heading="${get('history.name')}">
      <mwc-list id="content" wrapFocus>${this.renderHistory()}</mwc-list>
      <mwc-button
        icon="undo"
        label="${get('undo')}"
        ?disabled=${!this.canUndo}
        @click=${this.undo}
        slot="secondaryAction"
      ></mwc-button>
      <mwc-button
        icon="redo"
        label="${get('redo')}"
        ?disabled=${!this.canRedo}
        @click=${this.redo}
        slot="secondaryAction"
      ></mwc-button>
      <mwc-button slot="primaryAction" dialogaction="close"
        >${get('close')}</mwc-button
      >
    </mwc-dialog>`;
    }
    render() {
        return html `<slot></slot>
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
        #content mwc-list-item.info,
        #content mwc-list-item.warning,
        #content mwc-list-item.error {
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

        #log,
        #history {
          --mdc-dialog-min-width: 92vw;
        }

        #log > #filterContainer {
          position: absolute;
          top: 14px;
          right: 14px;
        }
      </style>
      ${this.renderLogDialog()} ${this.renderHistoryUI()}
      <mwc-dialog id="diagnostic" heading="${get('diag.name')}">
        <filtered-list id="content" wrapFocus>
          ${this.renderIssues()}
        </filtered-list>
        <mwc-button slot="primaryAction" dialogaction="close">
          ${get('close')}
        </mwc-button>
      </mwc-dialog>

      <mwc-snackbar
        id="info"
        timeoutMs="4000"
        labelText="${this.log
            .slice()
            .reverse()
            .find(le => le.kind === 'info')?.title ??
            get('log.snackbar.placeholder')}"
      >
        <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
      </mwc-snackbar>
      <mwc-snackbar
        id="warning"
        timeoutMs="6000"
        labelText="${this.log
            .slice()
            .reverse()
            .find(le => le.kind === 'warning')?.title ??
            get('log.snackbar.placeholder')}"
      >
        <mwc-button
          slot="action"
          icon="history"
          @click=${() => this.logUI.show()}
          >${get('log.snackbar.show')}</mwc-button
        >
        <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
      </mwc-snackbar>
      <mwc-snackbar
        id="error"
        timeoutMs="10000"
        labelText="${this.log
            .slice()
            .reverse()
            .find(le => le.kind === 'error')?.title ??
            get('log.snackbar.placeholder')}"
      >
        <mwc-button
          slot="action"
          icon="history"
          @click=${() => this.logUI.show()}
          >${get('log.snackbar.show')}</mwc-button
        >
        <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
      </mwc-snackbar>
      <mwc-snackbar
        id="issue"
        timeoutMs="10000"
        labelText="${this.latestIssue?.title ??
            get('log.snackbar.placeholder')}"
      >
        <mwc-button
          slot="action"
          icon="rule"
          @click=${() => this.diagnosticUI.show()}
          >${get('log.snackbar.show')}</mwc-button
        >
        <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
      </mwc-snackbar>`;
    }
};
__decorate([
    property({ type: Array })
], OscdHistory.prototype, "log", void 0);
__decorate([
    property({ type: Array })
], OscdHistory.prototype, "history", void 0);
__decorate([
    property({ type: Number })
], OscdHistory.prototype, "editCount", void 0);
__decorate([
    property()
], OscdHistory.prototype, "diagnoses", void 0);
__decorate([
    property({
        type: Object,
    })
], OscdHistory.prototype, "host", void 0);
__decorate([
    state()
], OscdHistory.prototype, "latestIssue", void 0);
__decorate([
    query('#log')
], OscdHistory.prototype, "logUI", void 0);
__decorate([
    query('#history')
], OscdHistory.prototype, "historyUI", void 0);
__decorate([
    query('#diagnostic')
], OscdHistory.prototype, "diagnosticUI", void 0);
__decorate([
    query('#error')
], OscdHistory.prototype, "errorUI", void 0);
__decorate([
    query('#warning')
], OscdHistory.prototype, "warningUI", void 0);
__decorate([
    query('#info')
], OscdHistory.prototype, "infoUI", void 0);
__decorate([
    query('#issue')
], OscdHistory.prototype, "issueUI", void 0);
OscdHistory = __decorate([
    customElement('oscd-history')
], OscdHistory);
export { OscdHistory };
//# sourceMappingURL=History.js.map