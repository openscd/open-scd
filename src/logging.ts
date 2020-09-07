import {
  Action,
  ElementConstructor,
  invert,
  ActionDetail,
  Mixin,
} from './foundation.js';

export interface LogEntry {
  time: Date;
  title: string;
  message?: string;
  icon?: string;
  action?: Action;
  cause?: LogEntry;
}

export type LogOptions = Pick<LogEntry, 'cause' | 'icon' | 'message'>;

export type LoggingElement = Mixin<typeof Logging>;

export function Logging<TBase extends ElementConstructor>(Base: TBase) {
  return class LoggingElement extends Base {
    history: LogEntry[] = [];

    lastAction = -1;

    get canUndo(): boolean {
      return this.lastAction >= 0;
    }
    get canRedo(): boolean {
      return this.nextAction >= 0;
    }
    get previousAction(): number {
      if (!this.canUndo) return -1;
      return this.history
        .slice(0, this.lastAction)
        .map(entry => (entry.action ? true : false))
        .lastIndexOf(true);
    }
    get nextAction(): number {
      let index = this.history
        .slice(this.lastAction + 1)
        .findIndex(entry => entry.action);
      if (index >= 0) index += this.lastAction + 1;
      return index;
    }

    undo(): boolean {
      if (!this.canUndo) return false;
      this.dispatchEvent(
        new CustomEvent<ActionDetail<Action>>('editor-action', {
          bubbles: true,
          composed: true,
          detail: { action: invert(this.history[this.lastAction].action!) },
        })
      );
      this.lastAction = this.previousAction;
      return true;
    }

    redo(): boolean {
      if (!this.canRedo) return false;
      this.dispatchEvent(
        new CustomEvent<ActionDetail<Action>>('editor-action', {
          bubbles: true,
          composed: true,
          detail: { action: this.history[this.nextAction].action! },
        })
      );
      this.lastAction = this.nextAction;
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
        if (this.canUndo) this.history.splice(this.lastAction + 1);
        this.lastAction = this.history.length;
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
