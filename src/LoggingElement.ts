import { LitElement, property } from 'lit-element';

export interface LogEntry {
  time: Date;
  title: string;
  message?: string;
  icon?: string;
}

export class LoggingElement extends LitElement {
  @property({ type: Array }) history: Array<LogEntry> = [];

  log(title: string, message?: string, icon?: string): void {
    this.history.unshift({ time: new Date(), title, message, icon });
  }
  info(title: string, ...detail: string[]): void {
    this.log(title, detail.join(' | '), 'info');
  }
  warn(title: string, ...detail: string[]): void {
    this.log(title, detail.join(' | '), 'warning');
  }
  error(title: string, ...detail: string[]): void {
    this.log(title, detail.join(' | '), 'error_outline');
  }

  firstUpdated(): void {
    this.log = this.log.bind(this); // allow log to reference history
    this.info = this.info.bind(this); // and others to reference log...
    this.warn = this.warn.bind(this);
    this.error = this.error.bind(this);
  }
}
