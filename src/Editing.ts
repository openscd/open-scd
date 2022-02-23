import { LitElement, property } from 'lit-element';
import { get } from 'lit-translate';

import {
  Create,
  Delete,
  EditorAction,
  EditorActionEvent,
  getReference,
  isCreate,
  isDelete,
  isMove,
  isSimple,
  isUpdate,
  LitElementConstructor,
  Mixin,
  Move,
  newLogEvent,
  newValidateEvent,
  OpenDocEvent,
  SCLTag,
  SimpleAction,
  Replace,
} from './foundation.js';

/** Mixin that edits an `XML` `doc`, listening to [[`EditorActionEvent`]]s */
export type EditingElement = Mixin<typeof Editing>;

/** @typeParam TBase - a type extending `LitElement`
 * @returns `Base` with an `XMLDocument` property "`doc`" and an event listener
 * applying [[`EditorActionEvent`]]s and dispatching [[`LogEvent`]]s. */
export function Editing<TBase extends LitElementConstructor>(Base: TBase) {
  class EditingElement extends Base {
    /** The `XMLDocument` to be edited */
    @property({ attribute: false })
    doc: XMLDocument | null = null;
    /** The name of the current [[`doc`]] */
    @property({ type: String }) docName = '';
    /** The UUID of the current [[`doc`]] */
    @property({ type: String }) docId = '';

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

      if (action.new.reference === undefined)
        action.new.reference = getReference(
          action.new.parent,
          <SCLTag>action.new.element.tagName
        );

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
      if (!action.old.reference)
        action.old.reference = action.old.element.nextSibling;

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

      if (!action.old.reference)
        action.old.reference = action.old.element.nextSibling;

      if (action.new.reference === undefined)
        action.new.reference = getReference(
          action.new.parent,
          <SCLTag>action.old.element.tagName
        );

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

    private checkUpdateValidity(replace: Replace): boolean {
      if (replace.checkValidity !== undefined) return replace.checkValidity();

      const invalid =
        replace.new.element.hasAttribute('name') &&
        replace.new.element.getAttribute('name') !==
          replace.old.element.getAttribute('name') &&
        Array.from(replace.old.element.parentElement?.children ?? []).some(
          elm =>
            elm.tagName === replace.new.element.tagName &&
            elm.getAttribute('name') ===
              replace.new.element.getAttribute('name')
        );

      if (invalid)
        this.dispatchEvent(
          newLogEvent({
            kind: 'error',
            title: get('editing.error.update', {
              name: replace.new.element.tagName,
            }),
            message: get('editing.error.nameClash', {
              parent: replace.old.element.parentElement!.tagName,
              child: replace.new.element.tagName,
              name: replace.new.element.getAttribute('name')!,
            }),
          })
        );

      return !invalid;
    }

    private onUpdate(action: Replace) {
      if (!this.checkUpdateValidity(action)) return false;

      action.new.element.append(...Array.from(action.old.element.children));
      action.old.element.replaceWith(action.new.element);
      return true;
    }

    private logUpdate(action: Replace) {
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
      else if (isUpdate(action)) return this.onUpdate(action as Replace);
    }

    private logSimpleAction(action: SimpleAction) {
      if (isMove(action)) this.logMove(action as Move);
      else if (isCreate(action)) this.logCreate(action as Create);
      else if (isDelete(action)) this.logDelete(action as Delete);
      else if (isUpdate(action)) this.logUpdate(action as Replace);
    }

    private onAction(event: EditorActionEvent<EditorAction>) {
      if (isSimple(event.detail.action)) {
        if (this.onSimpleAction(event.detail.action))
          this.logSimpleAction(event.detail.action);
      } else if (event.detail.action.actions.length > 0) {
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

      this.dispatchEvent(newValidateEvent());

      for (const element of event.composedPath())
        if (element instanceof LitElement) element.requestUpdate();
    }

    private async onOpenDoc(event: OpenDocEvent) {
      this.doc = event.detail.doc;
      this.docName = event.detail.docName;
      this.docId = event.detail.docId ?? '';

      await this.updateComplete;

      this.dispatchEvent(newValidateEvent());

      this.dispatchEvent(
        newLogEvent({
          kind: 'info',
          title: get('openSCD.loaded', { name: this.docName }),
        })
      );
    }

    constructor(...args: any[]) {
      super(...args);

      this.addEventListener('editor-action', this.onAction);
      this.addEventListener('open-doc', this.onOpenDoc);
    }
  }

  return EditingElement;
}
