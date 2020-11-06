import {
  Create,
  Delete,
  EditorAction,
  EditorActionEvent,
  LitElementConstructor,
  Mixin,
  Move,
  Update,
  isCreate,
  isDelete,
  isMove,
  isUpdate,
  newLogEvent,
} from './foundation.js';

import { LitElement, property } from 'lit-element';
import { get } from 'lit-translate';

/** Returns a new empty SCD document, i.e. one containing `<SCL></SCL>` */
export function newEmptySCD(): XMLDocument {
  return document.implementation.createDocument(
    'http://www.iec.ch/61850/2003/SCL',
    'SCL',
    null
  );
}

/** Mixin that edits an `XML` `doc`, listening to [[`EditorActionEvent`]]s */
export type EditingElement = Mixin<typeof Editing>;

/** @typeParam TBase a type extending `LitElement`
 * @returns `Base` with an `XMLDocument` property "`doc`" and an event listener
 * applying [[`EditorActionEvent`]]s and dispatching [[`LogEvent`]]s. */
export function Editing<TBase extends LitElementConstructor>(Base: TBase) {
  class EditingElement extends Base {
    /** The `XMLDocument` to be edited */
    @property()
    doc: XMLDocument = newEmptySCD();

    private onCreate(event: EditorActionEvent<Create>) {
      event.detail.action.new.parent.insertBefore(
        event.detail.action.new.element,
        event.detail.action.new.reference
      );
      this.dispatchEvent(
        newLogEvent({
          kind: 'action',
          title: get('editing.created', {
            name: event.detail.action.new.element.tagName,
          }),
          action: event.detail.action,
        })
      );
    }

    private onDelete(event: EditorActionEvent<Delete>) {
      event.detail.action.old.element.remove();
      this.dispatchEvent(
        newLogEvent({
          kind: 'action',
          title: get('editing.deleted', {
            name: event.detail.action.old.element.tagName,
          }),
          action: event.detail.action,
        })
      );
    }

    private onMove(event: EditorActionEvent<Move>) {
      event.detail.action.new.parent.insertBefore(
        event.detail.action.old.element,
        event.detail.action.new.reference
      );
      this.dispatchEvent(
        newLogEvent({
          kind: 'action',
          title: get('editing.moved', {
            name: event.detail.action.old.element.tagName,
          }),
          action: event.detail.action,
        })
      );
    }

    private onUpdate(event: EditorActionEvent<Update>) {
      event.detail.action.new.element.append(
        ...Array.from(event.detail.action.old.element.children)
      );
      event.detail.action.old.element.replaceWith(
        event.detail.action.new.element
      );
      this.dispatchEvent(
        newLogEvent({
          kind: 'action',
          title: get('editing.updated', {
            name: event.detail.action.new.element.tagName,
          }),
          action: event.detail.action,
        })
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
