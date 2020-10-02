import { html, property, query, TemplateResult } from 'lit-element';

import '@material/mwc-dialog';
import { Dialog } from '@material/mwc-dialog';

import {
  EditorAction,
  ifImplemented,
  invert,
  LitElementConstructor,
  Mixin,
  newActionEvent,
} from './foundation.js';

export interface LogEntry {
  time: Date;
  title: string;
  message?: string;
  icon?: string;
  action?: EditorAction;
  cause?: LogEntry;
}

export type LogOptions = Pick<LogEntry, 'cause' | 'icon' | 'message'>;

export type LoggingElement = Mixin<typeof Logging>;

export function Logging<TBase extends LitElementConstructor>(Base: TBase) {
  class LoggingElement extends Base {
    @property()
    history: LogEntry[] = [];
    @query('#log') logUI!: Dialog;

    currentAction = -1;

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
        .map(entry => (entry.action ? true : false))
        .lastIndexOf(true);
    }
    get nextAction(): number {
      let index = this.history
        .slice(this.currentAction + 1)
        .findIndex(entry => entry.action);
      if (index >= 0) index += this.currentAction + 1;
      return index;
    }

    undo(): boolean {
      if (!this.canUndo) return false;
      this.dispatchEvent(
        newActionEvent(invert(this.history[this.currentAction].action!))
      );
      this.currentAction = this.previousAction;
      return true;
    }

    redo(): boolean {
      if (!this.canRedo) return false;
      this.dispatchEvent(newActionEvent(this.history[this.nextAction].action!));
      this.currentAction = this.nextAction;
      return true;
    }

    log(title: string, detail?: Partial<LogEntry>): LogEntry {
      const entry: LogEntry = {
        time: new Date(),
        title,
        ...detail,
      };
      if (entry.action) {
        if (entry.action.derived) {
          return {
            time: new Date(),
            title: `Will not log derivative action ${title}`,
          };
        }
        entry.action.derived = true;
        this.history.splice(this.currentAction + 1);
        this.currentAction = this.history.length;
      }
      this.history.push(entry);
      return entry;
    }

    info(title: string, options?: LogOptions): LogEntry {
      return this.log(title, { icon: 'info', ...options });
    }
    warn(title: string, options?: LogOptions): LogEntry {
      return this.log(title, { icon: 'warning', ...options });
    }
    error(title: string, options?: LogOptions): LogEntry {
      return this.log(title, { icon: 'error_outline', ...options });
    }
    commit(
      title: string,
      action: EditorAction,
      options?: LogOptions
    ): LogEntry {
      return this.log(title, { action, icon: 'history', ...options });
    }

    constructor(...args: any[]) {
      super(...args);

      this.log = this.log.bind(this); // allow log to reference history
      this.info = this.info.bind(this); // and others to reference log...
      this.warn = this.warn.bind(this);
      this.error = this.error.bind(this);
      this.commit = this.commit.bind(this);
      this.undo = this.undo.bind(this);
      this.redo = this.redo.bind(this);
    }

    renderLogEntry(
      entry: LogEntry,
      index: number,
      history: LogEntry[]
    ): TemplateResult {
      return html`<mwc-list-item
        ?twoline=${entry.message}
        ?hasmeta=${entry.icon}
        ?activated=${this.currentAction == history.length - index - 1}
      >
        <span>
          <!-- FIXME: replace tt by mwc-chip asap -->
          <tt>${entry.time.toLocaleTimeString()}</tt>
          ${entry.title}</span
        >
        <span slot="secondary">${entry.message}</span>
        <mwc-icon slot="meta">${entry.icon}</mwc-icon>
      </mwc-list-item>`;
    }

    renderHistory(history: LogEntry[]): TemplateResult[] {
      if (history.length > 0)
        return history.slice().reverse().map(this.renderLogEntry, this);
      else
        return [
          html`<mwc-list-item disabled hasmeta>
            <span
              >Edits, errors, and other notifications will show up here.</span
            >
            <mwc-icon slot="meta">info</mwc-icon>
          </mwc-list-item>`,
        ];
    }

    render(): TemplateResult {
      return html`<!--BOLogging-->
        ${ifImplemented(super.render())}
        <mwc-dialog id="log" heading="Log">
          <mwc-list id="content" wrapFocus>
            ${this.renderHistory(this.history)}
          </mwc-list>
          <mwc-button
            icon="undo"
            label="Undo"
            ?disabled=${!this.canUndo}
            @click=${this.undo}
            slot="secondaryAction"
          ></mwc-button>
          <mwc-button
            icon="redo"
            label="Redo"
            ?disabled=${!this.canRedo}
            @click=${this.redo}
            slot="secondaryAction"
          ></mwc-button>
          <mwc-button slot="primaryAction" dialogaction="close"
            >Close</mwc-button
          >
        </mwc-dialog>

        <mwc-snackbar
          id="message"
          timeoutMs="-1"
          labelText="${this.history
            .slice()
            .reverse()
            .find(le => le.icon == 'error_outline')?.title ?? 'No errors'}"
        >
          <mwc-button
            slot="action"
            icon="rule"
            @click=${() => this.logUI.show()}
            >Show</mwc-button
          >
          <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
        </mwc-snackbar>
        <!--EOLogging-->`;
    }
  }

  return LoggingElement;
}
