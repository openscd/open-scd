import { html, property, query, TemplateResult } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { get, translate } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-dialog';
import '@material/mwc-icon';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-snackbar';
import { Dialog } from '@material/mwc-dialog';

import './filtered-list.js';
import {
  CommitEntry,
  HistoryEvent,
  ifImplemented,
  invert,
  LogEntry,
  LogEvent,
  Mixin,
  newActionEvent,
} from './foundation.js';
import { iconColors } from './icons/icons.js';
import { LoggingElement } from './Logging.js';

const icons = {
  action: 'history',
};

/**
 * A mixin adding a `history` property to any `LitElement`, in which
 * incoming [[`LogEvent`]]s are logged.
 *
 * For [[`EditorAction`]] entries, also sets `editCount` to the index of
 * the committed action, allowing the user to go to `previousAction` with
 * `undo()` if `canUndo` and to go to `nextAction` with `redo()` if `canRedo`.
 *
 * Renders the `history` to `logUI` and the latest `'error'` [[`LogEntry`]] to
 * `messageUI`.
 */
export type HistoringElement = Mixin<typeof Historing>;

export function Historing<TBase extends new (...args: any[]) => LoggingElement>(
  Base: TBase
) {
  class HistoringElement extends Base {
    /** All [[`LogEntry`]]s received so far through [[`LogEvent`]]s. */
    @property({ type: Array })
    history: LogEntry[] = [];
    /** Index of the last [[`EditorAction`]] applied. */
    @property({ type: Number })
    editCount = -1;

    @query('#history') historyUI!: Dialog;

    get canUndo(): boolean {
      return this.editCount >= 0;
    }
    get canRedo(): boolean {
      return this.nextAction >= 0;
    }

    get previousAction(): number {
      if (!this.canUndo) return -1;
      return this.history
        .slice(0, this.editCount)
        .map(entry => (entry.kind == 'action' ? true : false))
        .lastIndexOf(true);
    }

    get nextAction(): number {
      let index = this.history
        .slice(this.editCount + 1)
        .findIndex(entry => entry.kind == 'action');
      if (index >= 0) index += this.editCount + 1;
      return index;
    }

    undo(): boolean {
      if (!this.canUndo) return false;
      this.dispatchEvent(
        newActionEvent(
          invert((<CommitEntry>this.history[this.editCount]).action)
        )
      );
      this.editCount = this.previousAction;
      return true;
    }

    redo(): boolean {
      if (!this.canRedo) return false;
      this.dispatchEvent(
        newActionEvent((<CommitEntry>this.history[this.nextAction]).action)
      );
      this.editCount = this.nextAction;
      return true;
    }

    private onHistoryLog(le: LogEvent): void {
      if (le.detail.kind === 'reset') {
        this.history = [];
        this.editCount = -1;
        return;
      }

      if (le.detail.kind !== 'action') {
        return;
      }

      const event: HistoryEvent = le as HistoryEvent;

      const entry: LogEntry = {
        time: new Date(),
        ...event.detail,
      };

      if (entry.action.derived) return;
      entry.action.derived = true;
      if (this.nextAction !== -1) this.history.splice(this.nextAction);
      this.editCount = this.history.length;

      this.history.push(entry);

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
      this.onHistoryLog = this.onHistoryLog.bind(this);

      this.addEventListener('log', this.onHistoryLog);
    }

    renderHistoryEntry(
      entry: LogEntry,
      index: number,
      history: LogEntry[]
    ): TemplateResult {
      return html` <abbr title="${entry.title}">
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
            style="--mdc-theme-text-icon-on-background:var(${ifDefined(
              iconColors[entry.kind]
            )})"
            >${icons.action}</mwc-icon
          >
        </mwc-list-item></abbr
      >`;
    }

    private renderHistory(): TemplateResult[] | TemplateResult {
      if (this.history.length > 0)
        return this.history
          .slice()
          .reverse()
          .map(this.renderHistoryEntry, this);
      else
        return html`<mwc-list-item disabled graphic="icon">
          <span>${translate('log.placeholder')}</span>
          <mwc-icon slot="graphic">info</mwc-icon>
        </mwc-list-item>`;
    }

    render(): TemplateResult {
      return html`${ifImplemented(super.render())}
        <style>
          #history {
            --mdc-dialog-min-width: 92vw;
          }
        </style>
        <mwc-dialog id="history" heading="History">
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
  }

  return HistoringElement;
}
