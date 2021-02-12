import { css, html, property, query, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';

import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-snackbar';
import { Dialog } from '@material/mwc-dialog';
import { Snackbar } from '@material/mwc-snackbar';

import {
  CommitEntry,
  ifImplemented,
  invert,
  isSimple,
  LitElementConstructor,
  LogEntry,
  LogEvent,
  Mixin,
  newActionEvent,
} from './foundation.js';
import { get, translate } from 'lit-translate';
const icons = {
  info: 'info',
  warning: 'warning',
  error: 'report',
  action: 'history',
};

const colors = {
  info: '--cyan',
  warning: '--yellow',
  error: '--red',
  action: undefined,
};

/**
 * A mixin adding a `history` property to any `LitElement`, in which
 * incoming [[`LogEvent`]]s are logged.
 *
 * For [[`EditorAction`]] entries, also sets `currentAction` to the index of
 * the committed action, allowing the user to go to `previousAction` with
 * `undo()` if `canUndo` and to go to `nextAction` with `redo()` if `canRedo`.
 *
 * Also provides a `reset()` method resetting the history and `currentAction`.
 *
 * Renders the `history` to `logUI` and the latest `'error'` [[`LogEntry`]] to
 * `messageUI`.
 */
export type LoggingElement = Mixin<typeof Logging>;

export function Logging<TBase extends LitElementConstructor>(Base: TBase) {
  class LoggingElement extends Base {
    /** All [[`LogEntry`]]s received so far through [[`LogEvent`]]s. */
    @property()
    history: LogEntry[] = [];
    /** Index of the last [[`EditorAction`]] applied. */
    @property({ type: Number })
    currentAction = -1;

    @query('#log') logUI!: Dialog;
    @query('#message') messageUI!: Snackbar;

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

    /** Resets the history to an empty state. */
    reset(): void {
      this.history = [];
      this.currentAction = -1;
    }

    private onLog(le: LogEvent): void {
      const entry: LogEntry = {
        time: new Date(),
        ...le.detail,
      };

      if (entry.kind == 'action') {
        if (entry.action.derived) return;
        entry.action.derived = true;
        if (this.nextAction !== -1) this.history.splice(this.nextAction);
        this.currentAction = this.history.length;
      }

      this.history.push(entry);
      if (le.detail.kind == 'error' && !this.logUI.open) {
        this.messageUI.close(); // hack to reset timeout
        this.messageUI.show();
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
    }

    renderLogEntry(
      entry: LogEntry,
      index: number,
      history: LogEntry[]
    ): TemplateResult {
      return html` <abbr title="${entry.title}">
        <mwc-list-item
          graphic="icon"
          ?twoline=${entry.message}
          ?activated=${this.currentAction == history.length - index - 1}
        >
          <span>
            <!-- FIXME: replace tt with mwc-chip asap -->
            <tt>${entry.time.toLocaleTimeString()}</tt>
            ${entry.title}</span
          >
          <span slot="secondary">${entry.message}</span>
          <mwc-icon
            slot="graphic"
            style="--mdc-theme-text-icon-on-background:var(${ifDefined(
              colors[entry.kind]
            )})"
            >${icons[entry.kind]}</mwc-icon
          >
        </mwc-list-item></abbr
      >`;
    }

    renderHistory(): TemplateResult[] | TemplateResult {
      if (this.history.length > 0)
        return this.history.slice().reverse().map(this.renderLogEntry, this);
      else
        return html`<mwc-list-item disabled graphic="icon">
          <span>${translate('log.placeholder')}</span>
          <mwc-icon slot="graphic">info</mwc-icon>
        </mwc-list-item>`;
    }

    render(): TemplateResult {
      return html`${ifImplemented(super.render())}
        <mwc-dialog id="log" heading="${translate('log.name')}">
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
        </mwc-dialog>

        <mwc-snackbar
          id="message"
          timeoutMs="10000"
          labelText="${this.history
            .slice()
            .reverse()
            .find(le => le.kind == 'error')?.title ??
          get('log.snackbar.placeholder')}"
        >
          <mwc-button
            slot="action"
            icon="rule"
            @click=${() => this.logUI.show()}
            >${translate('log.snackbar.show')}</mwc-button
          >
          <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
        </mwc-snackbar>`;
    }
  }

  return LoggingElement;
}
