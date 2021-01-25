import { LitElement, property } from 'lit-element';
import { get } from 'lit-translate';

import {
  Create,
  Delete,
  EditorAction,
  EditorActionEvent,
  isCreate,
  isDelete,
  isMove,
  isSimple,
  isUpdate,
  LitElementConstructor,
  Mixin,
  Move,
  newLogEvent,
  SimpleAction,
  Update,
} from './foundation.js';

import { supportedAttributes, SupportedVersion } from './schemas.js';

/** Returns a new empty SCD document. */
export function newEmptySCD(
  id: string,
  versionId: SupportedVersion
): XMLDocument {
  const { version, revision, release } = supportedAttributes[versionId];
  const markup = `<?xml version="1.0" encoding="UTF-8"?>
    <SCL xmlns="http://www.iec.ch/61850/2003/SCL" ${
      version ? `version="${version}"` : ''
    } ${revision ? `revision="${revision}"` : ''} ${
    release ? `release="${release}"` : ''
  }>
      <Header id="${id}"/>
    </SCL>`;
  return new DOMParser().parseFromString(markup, 'application/xml');
}

/** Mixin that edits an `XML` `doc`, listening to [[`EditorActionEvent`]]s */
export type EditingElement = Mixin<typeof Editing>;

/** @typeParam TBase - a type extending `LitElement`
 * @returns `Base` with an `XMLDocument` property "`doc`" and an event listener
 * applying [[`EditorActionEvent`]]s and dispatching [[`LogEvent`]]s. */
export function Editing<TBase extends LitElementConstructor>(Base: TBase) {
  class EditingElement extends Base {
    /** The `XMLDocument` to be edited */
    @property()
    doc: XMLDocument | null = null;

    private checkCreateValidity(create: Create): boolean {
      if (create.checkValidity !== undefined) return create.checkValidity();

      const invalid =
        create.new.element.hasAttribute('name') &&
        Array.from(create.new.parent.children).some(
          elm =>
            elm.tagName === create.new.element.tagName &&
            elm.getAttribute('name') === create.new.element.getAttribute('name')
        );

      if (invalid)
        this.dispatchEvent(
          newLogEvent({
            kind: 'error',
            title: get('editing.error.create', {
              name: create.new.element.tagName,
            }),
            message: get('editing.error.nameClash', {
              parent:
                create.new.parent instanceof HTMLElement
                  ? create.new.parent.tagName
                  : 'Document',
              child: create.new.element.tagName,
              name: create.new.element.getAttribute('name')!,
            }),
          })
        );

      return !invalid;
    }

    private onCreate(action: Create) {
      if (!this.checkCreateValidity(action)) return false;

      action.new.parent.insertBefore(action.new.element, action.new.reference);
      return true;
    }

    private logCreate(action: Create) {
      this.dispatchEvent(
        newLogEvent({
          kind: 'action',
          title: get('editing.created', {
            name: action.new.element.tagName,
          }),
          action: action,
        })
      );
    }

    private onDelete(action: Delete) {
      action.old.element.remove();
      return true;
    }

    private logDelete(action: Delete) {
      this.dispatchEvent(
        newLogEvent({
          kind: 'action',
          title: get('editing.deleted', {
            name: action.old.element.tagName,
          }),
          action: action,
        })
      );
    }

    private checkMoveValidity(move: Move): boolean {
      if (move.checkValidity !== undefined) return move.checkValidity();

      const invalid =
        move.old.element.hasAttribute('name') &&
        move.new.parent !== move.old.parent &&
        Array.from(move.new.parent.children).some(
          elm =>
            elm.tagName === move.old.element.tagName &&
            elm.getAttribute('name') === move.old.element.getAttribute('name')
        );

      if (invalid)
        this.dispatchEvent(
          newLogEvent({
            kind: 'error',
            title: get('editing.error.move', {
              name: move.old.element.tagName,
            }),
            message: get('editing.error.nameClash', {
              parent: move.new.parent.tagName,
              child: move.old.element.tagName,
              name: move.old.element.getAttribute('name')!,
            }),
          })
        );

      return !invalid;
    }

    private onMove(action: Move) {
      if (!this.checkMoveValidity(action)) return false;

      action.new.parent.insertBefore(action.old.element, action.new.reference);
      return true;
    }

    private logMove(action: Move) {
      this.dispatchEvent(
        newLogEvent({
          kind: 'action',
          title: get('editing.moved', {
            name: action.old.element.tagName,
          }),
          action: action,
        })
      );
    }

    private checkUpdateValidity(update: Update): boolean {
      if (update.checkValidity !== undefined) return update.checkValidity();

      const invalid =
        update.new.element.hasAttribute('name') &&
        update.new.element.getAttribute('name') !==
          update.old.element.getAttribute('name') &&
        Array.from(update.old.element.parentElement?.children ?? []).some(
          elm =>
            elm.tagName === update.new.element.tagName &&
            elm.getAttribute('name') === update.new.element.getAttribute('name')
        );

      if (invalid)
        this.dispatchEvent(
          newLogEvent({
            kind: 'error',
            title: get('editing.error.update', {
              name: update.new.element.tagName,
            }),
            message: get('editing.error.nameClash', {
              parent: update.old.element.parentElement!.tagName,
              child: update.new.element.tagName,
              name: update.new.element.getAttribute('name')!,
            }),
          })
        );

      return !invalid;
    }

    private onUpdate(action: Update) {
      if (!this.checkUpdateValidity(action)) return false;

      action.new.element.append(...Array.from(action.old.element.children));
      action.old.element.replaceWith(action.new.element);
      return true;
    }

    private logUpdate(action: Update) {
      this.dispatchEvent(
        newLogEvent({
          kind: 'action',
          title: get('editing.updated', {
            name: action.new.element.tagName,
          }),
          action: action,
        })
      );
    }

    private onSimpleAction(action: SimpleAction) {
      if (isMove(action)) return this.onMove(action as Move);
      else if (isCreate(action)) return this.onCreate(action as Create);
      else if (isDelete(action)) return this.onDelete(action as Delete);
      else if (isUpdate(action)) return this.onUpdate(action as Update);
    }

    private logSimpleAction(action: SimpleAction) {
      if (isMove(action)) this.logMove(action as Move);
      else if (isCreate(action)) this.logCreate(action as Create);
      else if (isDelete(action)) this.logDelete(action as Delete);
      else if (isUpdate(action)) this.logUpdate(action as Update);
    }

    private onAction(event: EditorActionEvent<EditorAction>) {
      if (isSimple(event.detail.action)) {
        if (this.onSimpleAction(event.detail.action))
          this.logSimpleAction(event.detail.action);
      } else if (event.detail.action.actions !== []) {
        event.detail.action.actions.forEach(element =>
          this.onSimpleAction(element)
        );
        this.dispatchEvent(
          newLogEvent({
            kind: 'action',
            title: event.detail.action.title,
            action: event.detail.action,
          })
        );
      }

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
