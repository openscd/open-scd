import { internalProperty, property, query, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

import { Snackbar } from '@material/mwc-snackbar';

import {
  CommitEntry,
  Dialog,
  html,
  ifImplemented,
  invert,
  IssueDetail,
  IssueEvent,
  LitElementConstructor,
  LogEntry,
  LogEntryType,
  LogEvent,
  Mixin,
  newActionEvent,
  OpenDocEvent,
  SclhistoryEntry,
} from './foundation.js';
import { get, translate } from 'lit-translate';
import { getFilterIcon, iconColors } from './icons.js';
import { Plugin } from './Plugging.js';
import { FilteredList } from './filtered-list.js';

const icons = {
  info: 'info',
  warning: 'warning',
  error: 'report',
  action: 'history',
  sclhistory: 'history_toggle_off',
};

function getPluginName(src: string): string {
  const plugin = <Plugin>(
    JSON.parse(localStorage.getItem('plugins') ?? '[]').find(
      (p: Plugin) => p.src === src
    )
  );
  if (!plugin) return src;

  const name = plugin.name;
  return name || src;
}

/**
 * A mixin adding a `history` property to any `LitElement`, in which
 * incoming [[`LogEvent`]]s are logged.
 *
 * For [[`EditorAction`]] entries, also sets `currentAction` to the index of
 * the committed action, allowing the user to go to `previousAction` with
 * `undo()` if `canUndo` and to go to `nextAction` with `redo()` if `canRedo`.
 *
 * Renders the `history` to `logUI` and the latest `'error'` [[`LogEntry`]] to
 * `messageUI`.
 */
export type LoggingElement = Mixin<typeof Logging>;

export function Logging<TBase extends LitElementConstructor>(Base: TBase) {
  class LoggingElement extends Base {
    /** All [[`LogEntry`]]s received so far through [[`LogEvent`]]s. */
    @property({ type: Array })
    history: LogEntry[] = [];
    /** Index of the last [[`EditorAction`]] applied. */
    @property({ type: Number })
    currentAction = -1;
    @property()
    diagnoses = new Map<string, IssueDetail[]>();
    @internalProperty()
    latestIssue!: IssueDetail;

    @query('#log') logUI!: Dialog;
    @query('#diagnostic') diagnosticUI!: Dialog;
    @query('#error') errorUI!: Snackbar;
    @query('#warning') warningUI!: Snackbar;
    @query('#info') infoUI!: Snackbar;
    @query('#issue') issueUI!: Snackbar;

    get canUndo(): boolean {
      return this.currentAction >= 0;
    }
    get canRedo(): boolean {
      return this.nextAction >= 0;
    }

    get previousAction(): number {
      if (!this.canUndo) return -1;
      return this.history
        .slice(0, this.currentAction)
        .map(entry => (entry.kind == 'action' ? true : false))
        .lastIndexOf(true);
    }
    get nextAction(): number {
      let index = this.history
        .slice(this.currentAction + 1)
        .findIndex(entry => entry.kind == 'action');
      if (index >= 0) index += this.currentAction + 1;
      return index;
    }

    private convertToDate(when: string | null): Date | null {
      const convertedTime = new Date(when ?? '');
      if (!isNaN(convertedTime.getTime())) {
        return convertedTime;
      }
      return null;
    }

    private createMessage(
      who: string | null,
      why: string | null
    ): string | undefined {
      let message = who;
      if (message !== null && why !== null) {
        message += ' : ' + why;
      } else if (why !== null) {
        message = why;
      }
      return message ?? undefined;
    }

    private createSclHistoryEntry(
      who: string | null,
      what: string | null,
      why: string | null,
      when: string | null
    ): SclhistoryEntry {
      return {
        kind: 'sclhistory',
        title: what ?? 'UNDEFINED',
        message: this.createMessage(who, why),
        time: this.convertToDate(when),
      };
    }

    private async onLoadHistoryFromDoc(event: OpenDocEvent) {
      const doc = event.detail.doc;

      Array.from(
        doc.querySelectorAll(':root > Header > History > Hitem')
      ).forEach(historyItem => {
        this.history.push(
          this.createSclHistoryEntry(
            historyItem.getAttribute('who'),
            historyItem.getAttribute('what'),
            historyItem.getAttribute('why'),
            historyItem.getAttribute('when')
          )
        );
      });
    }

    private onIssue(de: IssueEvent): void {
      const issues = this.diagnoses.get(de.detail.validatorId);

      if (!issues) this.diagnoses.set(de.detail.validatorId, [de.detail]);
      else issues?.push(de.detail);

      this.latestIssue = de.detail;
      this.issueUI.close();
      this.issueUI.show();
    }

    undo(): boolean {
      if (!this.canUndo) return false;
      this.dispatchEvent(
        newActionEvent(
          invert((<CommitEntry>this.history[this.currentAction]).action)
        )
      );
      this.currentAction = this.previousAction;
      return true;
    }
    redo(): boolean {
      if (!this.canRedo) return false;
      this.dispatchEvent(
        newActionEvent((<CommitEntry>this.history[this.nextAction]).action)
      );
      this.currentAction = this.nextAction;
      return true;
    }

    private onLog(le: LogEvent): void {
      if (le.detail.kind === 'reset') {
        this.history = [];
        this.currentAction = -1;
        return;
      }

      const entry: LogEntry = {
        time: new Date(),
        ...le.detail,
      };

      if (entry.kind === 'action') {
        if (entry.action.derived) return;
        entry.action.derived = true;
        if (this.nextAction !== -1) this.history.splice(this.nextAction);
        this.currentAction = this.history.length;
      }

      this.history.push(entry);
      if (!this.logUI.open) {
        const ui = {
          error: this.errorUI,
          warning: this.warningUI,
          info: this.infoUI,
          action: this.infoUI,
        }[le.detail.kind];

        ui.close();
        ui.show();
      }
      if (le.detail.kind == 'error') {
        this.errorUI.close(); // hack to reset timeout
        this.errorUI.show();
      }
      this.requestUpdate('history', []);
    }

    async performUpdate() {
      await new Promise<void>(resolve =>
        requestAnimationFrame(() => resolve())
      );
      super.performUpdate();
    }

    constructor(...args: any[]) {
      super(...args);

      this.undo = this.undo.bind(this);
      this.redo = this.redo.bind(this);

      this.onLog = this.onLog.bind(this);
      this.addEventListener('log', this.onLog);
      this.addEventListener('issue', this.onIssue);
      this.addEventListener('open-doc', this.onLoadHistoryFromDoc);
    }

    renderLogEntry(
      entry: LogEntry,
      index: number,
      history: LogEntry[]
    ): TemplateResult {
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
            style="--mdc-theme-text-icon-on-background:var(${ifDefined(
              iconColors[entry.kind]
            )})"
            >${icons[entry.kind]}</mwc-icon
          >
        </mwc-list-item></abbr
      >`;
    }

    private renderHistory(): TemplateResult[] | TemplateResult {
      if (this.history.length > 0)
        return this.history.slice().reverse().map(this.renderLogEntry, this);
      else
        return html`<mwc-list-item disabled graphic="icon">
          <span>${translate('log.placeholder')}</span>
          <mwc-icon slot="graphic">info</mwc-icon>
        </mwc-list-item>`;
    }

    private renderIssueEntry(issue: IssueDetail): TemplateResult {
      return html` <abbr title="${issue.title + '\n' + issue.message}"
        ><mwc-list-item ?twoline=${!!issue.message}>
          <span> ${issue.title}</span>
          <span slot="secondary">${issue.message}</span>
        </mwc-list-item></abbr
      >`;
    }

    renderValidatorsIssues(issues: IssueDetail[]): TemplateResult[] {
      if (issues.length === 0) return [html``];
      return [
        html`<mwc-list-item noninteractive
          >${getPluginName(issues[0].validatorId)}</mwc-list-item
        >`,
        html`<li divider padded role="separator"></li>`,
        ...issues.map(issue => this.renderIssueEntry(issue)),
      ];
    }

    private renderIssues(): TemplateResult[] | TemplateResult {
      const issueItems: TemplateResult[] = [];

      this.diagnoses.forEach(issues => {
        this.renderValidatorsIssues(issues).forEach(issueItem =>
          issueItems.push(issueItem)
        );
      });

      return issueItems.length
        ? issueItems
        : html`<mwc-list-item disabled graphic="icon">
            <span>${translate('diag.placeholder')}</span>
            <mwc-icon slot="graphic">info</mwc-icon>
          </mwc-list-item>`;
    }

    private renderFilterButtons() {
      return (<LogEntryType[]>Object.keys(icons)).map(
        kind => html`<mwc-icon-button-toggle
          id="${kind}filter"
          ?on=${kind !== 'sclhistory'}
          >${getFilterIcon(kind, false)}
          ${getFilterIcon(kind, true)}</mwc-icon-button-toggle
        >`
      );
    }

    render(): TemplateResult {
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
          #content mwc-list-item.action,
          #content mwc-list-item.sclhistory {
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
          #sclhistoryfilter[on] ~ #content mwc-list-item.sclhistory {
            display: flex;
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
        <${Dialog} id="log" heading="${translate('log.name')}">
          ${this.renderFilterButtons()}
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
        </${Dialog}>

        <${Dialog} id="diagnostic" heading="${translate('diag.name')}">
          <${FilteredList} id="content" wrapFocus
            >${this.renderIssues()}</${FilteredList}
          >
          <mwc-button slot="primaryAction" dialogaction="close"
            >${translate('close')}</mwc-button
          >
        </${Dialog}>

        <mwc-snackbar
          id="info"
          timeoutMs="4000"
          labelText="${
            this.history
              .slice()
              .reverse()
              .find(le => le.kind === 'info' || le.kind === 'action')?.title ??
            get('log.snackbar.placeholder')
          }"
        >
          <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
        </mwc-snackbar>
        <mwc-snackbar
          id="warning"
          timeoutMs="6000"
          labelText="${
            this.history
              .slice()
              .reverse()
              .find(le => le.kind === 'warning')?.title ??
            get('log.snackbar.placeholder')
          }"
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
          labelText="${
            this.history
              .slice()
              .reverse()
              .find(le => le.kind === 'error')?.title ??
            get('log.snackbar.placeholder')
          }"
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
          labelText="${
            this.latestIssue?.title ?? get('log.snackbar.placeholder')
          }"
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

  return LoggingElement;
}
