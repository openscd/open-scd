import { Action, ElementConstructor, invert } from './foundation.js';

export interface LogEntry {
  time: Date;
  title: string;
  message?: string;
  icon?: string;
  action?: Action;
  cause?: LogEntry;
}

export type LogOptions = Pick<LogEntry, 'cause' | 'icon' | 'message'>;

export function Logging<TBase extends ElementConstructor>(Base: TBase) {
  return class LoggingElement extends Base {
    history: LogEntry[] = [];

    currentAction = -1;
    get hasActions(): boolean {
      return this.currentAction >= 0;
    }
    get previousAction(): number {
      if (!this.hasActions) return -1;
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
      if (!this.hasActions) return false;
      this.dispatchEvent(
        new CustomEvent<Action>('action', {
          bubbles: true,
          composed: true,
          detail: invert(this.history[this.currentAction].action!),
        })
      );
      this.currentAction = this.previousAction;
      return true;
    }
    redo(): boolean {
      if (this.nextAction < 0) return false;
      this.dispatchEvent(
        new CustomEvent<Action>('action', {
          bubbles: true,
          composed: true,
          detail: this.history[this.nextAction].action,
        })
      );
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
        if (this.hasActions) this.history.splice(this.currentAction + 1);
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
    commit(title: string, action: Action, options?: LogOptions): LogEntry {
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
  };
}
