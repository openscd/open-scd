import {
  LitElementConstructor,
  Mixin,
  EditorActionEvent,
  Create,
  Delete,
  Move,
  Update,
  EditorAction,
  isMove,
  isCreate,
  isDelete,
  isUpdate,
} from './foundation.js';
import { Logging } from './logging.js';

import { html, LitElement, property } from 'lit-element';

export function newEmptySCD(): XMLDocument {
  return document.implementation.createDocument(
    'http://www.iec.ch/61850/2003/SCL',
    'SCL',
    null
  );
}

export type EditingElement = Mixin<typeof Editing>;

export function Editing<TBase extends LitElementConstructor>(Base: TBase) {
  class EditingElement extends Logging(Base) {
    /** The `XMLDocument` being edited. */
    @property()
    doc: XMLDocument = newEmptySCD();

    private onCreate(event: EditorActionEvent<Create>) {
      event.detail.action.new.parent.insertBefore(
        event.detail.action.new.element,
        event.detail.action.new.reference
      );
      this.commit(
        `Create ${event.detail.action.new.element.tagName}`,
        event.detail.action
      );
    }

    private onDelete(event: EditorActionEvent<Delete>) {
      event.detail.action.old.element.remove();
      this.commit(
        `Delete ${event.detail.action.old.element.tagName}`,
        event.detail.action
      );
    }

    private onMove(event: EditorActionEvent<Move>) {
      event.detail.action.new.parent.insertBefore(
        event.detail.action.old.element,
        event.detail.action.new.reference
      );
      this.commit(
        `Move ${event.detail.action.old.element.tagName}`,
        event.detail.action
      );
    }

    private onUpdate(event: EditorActionEvent<Update>) {
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

    private onAction(event: EditorActionEvent<EditorAction>) {
      if (isMove(event.detail.action))
        this.onMove(event as EditorActionEvent<Move>);
      else if (isCreate(event.detail.action))
        this.onCreate(event as EditorActionEvent<Create>);
      else if (isDelete(event.detail.action))
        this.onDelete(event as EditorActionEvent<Delete>);
      else if (isUpdate(event.detail.action))
        this.onUpdate(event as EditorActionEvent<Update>);

      for (const element of event.composedPath())
        if (element instanceof LitElement) element.requestUpdate();
    }

    constructor(...args: any[]) {
      super(...args);

      this.addEventListener('editor-action', this.onAction);
    }
  }

  return EditingElement;
}
