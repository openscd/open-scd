import {
  ElementConstructor,
  Mixin,
  ActionEvent,
  Create,
  Delete,
  Move,
  Update,
  Action,
  isMove,
  isCreate,
  isDelete,
  isUpdate,
  newActionEvent,
  invert,
} from './foundation.js';
import { LitElement } from 'lit-element';

export interface LogEntry {
  time: Date;
  title: string;
  message?: string;
  icon?: string;
  action?: Action;
  cause?: LogEntry;
}

export type LogOptions = Pick<LogEntry, 'cause' | 'icon' | 'message'>;

export type EditingElement = Mixin<typeof Editing>;

export function Editing<TBase extends ElementConstructor>(Base: TBase) {
  return class EditingElement extends Base {
    doc!: XMLDocument;

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
        newActionEvent(invert(this.history[this.lastAction].action!))
      );
      this.lastAction = this.previousAction;
      return true;
    }

    redo(): boolean {
      if (!this.canRedo) return false;
      this.dispatchEvent(newActionEvent(this.history[this.nextAction].action!));
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
        this.history.splice(this.lastAction + 1);
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

    private onCreate(event: ActionEvent<Create>) {
      event.detail.action.new.parent.insertBefore(
        event.detail.action.new.element,
        event.detail.action.new.reference
      );
      this.commit(
        `Create ${event.detail.action.new.element.tagName}`,
        event.detail.action
      );
    }

    private onDelete(event: ActionEvent<Delete>) {
      event.detail.action.old.element.remove();
      this.commit(
        `Delete ${event.detail.action.old.element.tagName}`,
        event.detail.action
      );
    }

    private onMove(event: ActionEvent<Move>) {
      event.detail.action.new.parent.insertBefore(
        event.detail.action.old.element,
        event.detail.action.new.reference
      );
      this.commit(
        `Move ${event.detail.action.old.element.tagName}`,
        event.detail.action
      );
    }

    private onUpdate(event: ActionEvent<Update>) {
      event.detail.action.new.element.append(
        ...Array.from(event.detail.action.old.element.childNodes)
      );
      event.detail.action.old.element.replaceWith(
        event.detail.action.new.element
      );
      this.commit(
        `Update ${event.detail.action.new.element.tagName}`,
        event.detail.action
      );
    }

    private onAction(event: ActionEvent<Action>) {
      if (isMove(event.detail.action)) this.onMove(event as ActionEvent<Move>);
      else if (isCreate(event.detail.action))
        this.onCreate(event as ActionEvent<Create>);
      else if (isDelete(event.detail.action))
        this.onDelete(event as ActionEvent<Delete>);
      else if (isUpdate(event.detail.action))
        this.onUpdate(event as ActionEvent<Update>);

      for (const element of event.composedPath())
        if (element instanceof LitElement) element.requestUpdate();
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

      this.addEventListener('editor-action', this.onAction);
    }
  };
}
