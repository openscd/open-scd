import { property } from 'lit-element';
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
  isReplace,
  LitElementConstructor,
  Mixin,
  Move,
  newLogEvent,
  newValidateEvent,
  OpenDocEvent,
  SCLTag,
  SimpleAction,
  Replace,
  Update,
  isUpdate,
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
    /** The ID of the current [[`doc`]] */
    @property({ type: String }) docId = '';

    private checkCreateValidity(create: Create): boolean {
      if (create.checkValidity !== undefined) return create.checkValidity();

      if (
        !(create.new.element instanceof Element) ||
        !(create.new.parent instanceof Element)
      )
        return true;

      const invalidNaming =
        create.new.element.hasAttribute('name') &&
        Array.from(create.new.parent.children).some(
          elm =>
            elm.tagName === (<Element>create.new.element).tagName &&
            elm.getAttribute('name') ===
              (<Element>create.new.element).getAttribute('name')
        );

      if (invalidNaming) {
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

        return false;
      }

      const invalidId =
        create.new.element.hasAttribute('id') &&
        Array.from(
          create.new.parent.ownerDocument.querySelectorAll(
            'LNodeType, DOType, DAType, EnumType'
          )
        ).some(
          elm =>
            elm.getAttribute('id') ===
            (<Element>create.new.element).getAttribute('id')
        );

      if (invalidId) {
        this.dispatchEvent(
          newLogEvent({
            kind: 'error',
            title: get('editing.error.create', {
              name: create.new.element.tagName,
            }),
            message: get('editing.error.idClash', {
              id: create.new.element.getAttribute('id')!,
            }),
          })
        );

        return false;
      }

      return true;
    }

    private onCreate(action: Create) {
      if (!this.checkCreateValidity(action)) return false;

      if (
        action.new.reference === undefined &&
        action.new.element instanceof Element &&
        action.new.parent instanceof Element
      )
        action.new.reference = getReference(
          action.new.parent,
          <SCLTag>action.new.element.tagName
        );
      else action.new.reference = action.new.reference ?? null;

      action.new.parent.insertBefore(action.new.element, action.new.reference);
      return true;
    }

    private logCreate(action: Create) {
      const name =
        action.new.element instanceof Element
          ? action.new.element.tagName
          : get('editing.node');

      this.dispatchEvent(
        newLogEvent({
          kind: 'action',
          title: get('editing.created', { name }),
          action,
        })
      );
    }

    private onDelete(action: Delete) {
      if (!action.old.reference)
        action.old.reference = action.old.element.nextSibling;

      if (action.old.element.parentNode !== action.old.parent) return false;

      action.old.parent.removeChild(action.old.element);
      return true;
    }

    private logDelete(action: Delete) {
      const name =
        action.old.element instanceof Element
          ? action.old.element.tagName
          : get('editing.node');

      this.dispatchEvent(
        newLogEvent({
          kind: 'action',
          title: get('editing.deleted', { name }),
          action,
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

    private checkReplaceValidity(replace: Replace): boolean {
      if (replace.checkValidity !== undefined) return replace.checkValidity();

      const invalidNaming =
        replace.new.element.hasAttribute('name') &&
        replace.new.element.getAttribute('name') !==
          replace.old.element.getAttribute('name') &&
        Array.from(replace.old.element.parentElement?.children ?? []).some(
          elm =>
            elm.tagName === replace.new.element.tagName &&
            elm.getAttribute('name') ===
              replace.new.element.getAttribute('name')
        );

      if (invalidNaming) {
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

        return false;
      }

      const invalidId =
        replace.new.element.hasAttribute('id') &&
        replace.new.element.getAttribute('id') !==
          replace.old.element.getAttribute('id') &&
        Array.from(
          replace.new.element.ownerDocument.querySelectorAll(
            'LNodeType, DOType, DAType, EnumType'
          )
        ).some(
          elm =>
            elm.getAttribute('id') ===
            (<Element>replace.new.element).getAttribute('id')
        );

      if (invalidId) {
        this.dispatchEvent(
          newLogEvent({
            kind: 'error',
            title: get('editing.error.update', {
              name: replace.new.element.tagName,
            }),
            message: get('editing.error.idClash', {
              id: replace.new.element.getAttribute('id')!,
            }),
          })
        );

        return false;
      }

      return true;
    }

    private onReplace(action: Replace) {
      if (!this.checkReplaceValidity(action)) return false;

      action.new.element.append(...Array.from(action.old.element.children));
      action.old.element.replaceWith(action.new.element);
      return true;
    }

    private logUpdate(action: Replace | Update) {
      const name = isReplace(action)
        ? action.new.element.tagName
        : (action as Update).element.tagName;

      this.dispatchEvent(
        newLogEvent({
          kind: 'action',
          title: get('editing.updated', {
            name,
          }),
          action: action,
        })
      );
    }

    private checkUpdateValidity(update: Update): boolean {
      if (update.checkValidity !== undefined) return update.checkValidity();

      if (update.oldAttributes['name'] !== update.newAttributes['name']) {
        const invalidNaming = Array.from(
          update.element.parentElement?.children ?? []
        ).some(
          elm =>
            elm.tagName === update.element.tagName &&
            elm.getAttribute('name') === update.newAttributes['name']
        );

        if (invalidNaming) {
          this.dispatchEvent(
            newLogEvent({
              kind: 'error',
              title: get('editing.error.update', {
                name: update.element.tagName,
              }),
              message: get('editing.error.nameClash', {
                parent: update.element.parentElement!.tagName,
                child: update.element.tagName,
                name: update.newAttributes['name']!,
              }),
            })
          );

          return false;
        }
      }

      const invalidId =
        update.newAttributes['id'] &&
        Array.from(
          update.element.ownerDocument.querySelectorAll(
            'LNodeType, DOType, DAType, EnumType'
          )
        ).some(elm => elm.getAttribute('id') === update.newAttributes['id']);

      if (invalidId) {
        this.dispatchEvent(
          newLogEvent({
            kind: 'error',
            title: get('editing.error.update', {
              name: update.element.tagName,
            }),
            message: get('editing.error.idClash', {
              id: update.newAttributes['id']!,
            }),
          })
        );

        return false;
      }

      return true;
    }

    private onUpdate(action: Update) {
      if (!this.checkUpdateValidity(action)) return false;

      Array.from(action.element.attributes).forEach(attr =>
        action.element.removeAttributeNode(attr)
      );

      Object.entries(action.newAttributes).forEach(([key, value]) => {
        if (value !== null && value !== undefined)
          action.element.setAttribute(key, value);
      });

      return true;
    }

    private onSimpleAction(action: SimpleAction) {
      if (isMove(action)) return this.onMove(action as Move);
      else if (isCreate(action)) return this.onCreate(action as Create);
      else if (isDelete(action)) return this.onDelete(action as Delete);
      else if (isReplace(action)) return this.onReplace(action as Replace);
      else if (isUpdate(action)) return this.onUpdate(action as Update);
    }

    private logSimpleAction(action: SimpleAction) {
      if (isMove(action)) this.logMove(action as Move);
      else if (isCreate(action)) this.logCreate(action as Create);
      else if (isDelete(action)) this.logDelete(action as Delete);
      else if (isReplace(action)) this.logUpdate(action as Replace);
      else if (isUpdate(action)) this.logUpdate(action as Update);
    }

    private async onAction(event: EditorActionEvent<EditorAction>) {
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
      } else return;

      if (!this.doc) return;

      await this.updateComplete;
      this.dispatchEvent(newValidateEvent());
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
