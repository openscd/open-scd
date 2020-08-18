type ElementConstructor = new (...args: any[]) => HTMLElement;

declare global {
  interface ElementEventMap {
    ['create']: CustomEvent<Create>;
    ['update']: CustomEvent<Update>;
  }
}

/** Represents an intended change to an `Element`. */
export type Change = Create | Update | Delete | Move;
export interface Move {
  old: { parent: Element; element: Element };
  new: { parent: Element };
}
export interface Create {
  new: { parent: Element; element: Element };
}
export interface Delete {
  old: { parent: Element; element: Element };
}
export interface Update {
  old: { element: Element };
  new: { element: Element };
}

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

    log(title: string, detail?: Partial<LogEntry>): LogEntry {
      const entry = {
        time: new Date(),
        title,
        ...detail,
      };
      this.history.unshift(entry);
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
