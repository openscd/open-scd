import { Change, ElementConstructor, invert } from './foundation.js';

export interface LogEntry {
  time: Date;
  title: string;
  message?: string;
  icon?: string;
  change?: Change;
  cause?: LogEntry;
}

export type LogOptions = Pick<LogEntry, 'cause' | 'icon' | 'message'>;

export function Logging<TBase extends ElementConstructor>(Base: TBase) {
  return class LoggingElement extends Base {
    history: LogEntry[] = [];

    currentChange = -1;
    get hasChanges(): boolean {
      return this.currentChange >= 0;
    }
    get previousChangeIndex(): number {
      if (!this.hasChanges) return -1;
      return this.history
        .slice(0, this.currentChange)
        .map(entry => (entry.change ? true : false))
        .lastIndexOf(true);
    }
    get nextChangeIndex(): number {
      return this.history
        .slice(this.currentChange + 1)
        .findIndex(entry => entry.change);
    }

    undo(): boolean {
      if (this.previousChangeIndex < 0) return false;
      console.log(this.history[this.currentChange].change);
      console.log(invert(this.history[this.currentChange].change!));
      // FIXME: dispatch instead of logging!
      this.currentChange = this.previousChangeIndex;
      return true;
    }

    log(title: string, detail?: Partial<LogEntry>): LogEntry {
      const entry: LogEntry = {
        time: new Date(),
        title,
        ...detail,
      };
      if (entry.change) {
        if (this.hasChanges) this.history.splice(this.currentChange + 1);
        this.currentChange = this.history.length;
        console.log(
          'current ',
          this.currentChange,
          ' next ',
          this.nextChangeIndex,
          ' prev ',
          this.previousChangeIndex
        );
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
    commit(title: string, change: Change, options?: LogOptions): LogEntry {
      return this.log(title, { change, icon: 'history', ...options });
    }

    constructor(...args: any[]) {
      super(...args);
      this.log = this.log.bind(this); // allow log to reference history
      this.info = this.info.bind(this); // and others to reference log...
      this.warn = this.warn.bind(this);
      this.error = this.error.bind(this);
    }
  };
}
