import { __decorate } from "tslib";
import { html } from 'lit';
import { state, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { get, translate } from 'lit-translate';
import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-icon-button-toggle';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-snackbar';
import './filtered-list.js';
import { invert, newActionEvent, } from './foundation.js';
import { getFilterIcon, iconColors } from './icons/icons.js';
const icons = {
    info: 'info',
    warning: 'warning',
    error: 'report',
};
function getPluginName(src) {
    const plugin = (JSON.parse(localStorage.getItem('plugins') ?? '[]').find((p) => p.src === src));
    if (!plugin)
        return src;
    const name = plugin.name;
    return name || src;
}
export function Historing(Base) {
    class HistoringElement extends Base {
        constructor() {
            super(...arguments);
            /** All [[`LogEntry`]]s received so far through [[`LogEvent`]]s. */
            this.log = [];
            /** All [[`CommitEntry`]]s received so far through [[`LogEvent`]]s */
            this.history = [];
            /** Index of the last [[`EditorAction`]] applied. */
            this.editCount = -1;
            this.diagnoses = new Map();
        }
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
            this.dispatchEvent(newActionEvent(invert(this.history[this.editCount].action)));
            this.editCount = this.previousAction;
            return true;
        }
        redo() {
            if (!this.canRedo)
                return false;
            this.dispatchEvent(newActionEvent(this.history[this.nextAction].action));
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
        /*
        async performUpdate() {
          await new Promise<void>(resolve =>
            requestAnimationFrame(() => resolve())
          );
          return super.performUpdate();
        }
    */
        connectedCallback() {
            super.connectedCallback();
            this.undo = this.undo.bind(this);
            this.redo = this.redo.bind(this);
            this.onLog = this.onLog.bind(this);
            this.addEventListener('log', this.onLog);
            this.addEventListener('issue', this.onIssue);
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
            style="--mdc-theme-text-icon-on-background:var(${ifDefined(iconColors[entry.kind])})"
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
            style="--mdc-theme-text-icon-on-background:var(${ifDefined(iconColors[entry.kind])})"
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
          <span>${translate('log.placeholder')}</span>
          <mwc-icon slot="graphic">info</mwc-icon>
        </mwc-list-item>`;
        }
        renderHistory() {
            if (this.history.length > 0)
                return this.history
                    .slice()
                    .reverse()
                    .map(this.renderHistoryEntry, this);
            else
                return html `<mwc-list-item disabled graphic="icon">
          <span>${translate('history.placeholder')}</span>
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
                html `<mwc-list-item noninteractive
          >${getPluginName(issues[0].validatorId)}</mwc-list-item
        >`,
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
            <span>${translate('diag.placeholder')}</span>
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
            return html ` <mwc-dialog id="log" heading="${translate('log.name')}">
        ${this.renderFilterButtons()}
        <mwc-list id="content" wrapFocus>${this.renderLog()}</mwc-list>
        <mwc-button slot="primaryAction" dialogaction="close"
          >${translate('close')}</mwc-button
        >
      </mwc-dialog>`;
        }
        renderHistoryDialog() {
            return html ` <mwc-dialog
        id="history"
        heading="${translate('history.name')}"
      >
        <mwc-list id="content" wrapFocus>${this.renderHistory()}</mwc-list>
        <mwc-button
          icon="undo"
          label="${translate('undo')}"
          ?disabled=${!this.canUndo}
          @click=${this.undo}
          slot="secondaryAction"
        ></mwc-button>
        <mwc-button
          icon="redo"
          label="${translate('redo')}"
          ?disabled=${!this.canRedo}
          @click=${this.redo}
          slot="secondaryAction"
        ></mwc-button>
        <mwc-button slot="primaryAction" dialogaction="close"
          >${translate('close')}</mwc-button
        >
      </mwc-dialog>`;
        }
        render() {
            return html `${super.render()}
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
        ${this.renderLogDialog()} ${this.renderHistoryDialog()}
        <mwc-dialog id="diagnostic" heading="${translate('diag.name')}">
          <filtered-list id="content" wrapFocus
            >${this.renderIssues()}</filtered-list
          >
          <mwc-button slot="primaryAction" dialogaction="close"
            >${translate('close')}</mwc-button
          >
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
            >${translate('log.snackbar.show')}</mwc-button
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
            >${translate('log.snackbar.show')}</mwc-button
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
            >${translate('log.snackbar.show')}</mwc-button
          >
          <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
        </mwc-snackbar>`;
        }
    }
    __decorate([
        property({ type: Array })
    ], HistoringElement.prototype, "log", void 0);
    __decorate([
        property({ type: Array })
    ], HistoringElement.prototype, "history", void 0);
    __decorate([
        property({ type: Number })
    ], HistoringElement.prototype, "editCount", void 0);
    __decorate([
        property()
    ], HistoringElement.prototype, "diagnoses", void 0);
    __decorate([
        state()
    ], HistoringElement.prototype, "latestIssue", void 0);
    __decorate([
        query('#log')
    ], HistoringElement.prototype, "logUI", void 0);
    __decorate([
        query('#history')
    ], HistoringElement.prototype, "historyUI", void 0);
    __decorate([
        query('#diagnostic')
    ], HistoringElement.prototype, "diagnosticUI", void 0);
    __decorate([
        query('#error')
    ], HistoringElement.prototype, "errorUI", void 0);
    __decorate([
        query('#warning')
    ], HistoringElement.prototype, "warningUI", void 0);
    __decorate([
        query('#info')
    ], HistoringElement.prototype, "infoUI", void 0);
    __decorate([
        query('#issue')
    ], HistoringElement.prototype, "issueUI", void 0);
    return HistoringElement;
}
//# sourceMappingURL=Historing.js.map