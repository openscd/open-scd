import { Initiator } from '../edit-event.js';

/** Inserts `new.element` to `new.parent` before `new.reference`. */
export interface Create {
  new: { parent: Node; element: Node; reference?: Node | null };
  derived?: boolean;
  checkValidity?: () => boolean;
}
/** Removes `old.element` from `old.parent` before `old.reference`. */
export interface Delete {
  old: { parent: Node; element: Node; reference?: Node | null };
  derived?: boolean;
  checkValidity?: () => boolean;
}
/** Reparents of `old.element` to `new.parent` before `new.reference`. */
export interface Move {
  old: { parent: Element; element: Element; reference?: Node | null };
  new: { parent: Element; reference?: Node | null };
  derived?: boolean;
  checkValidity?: () => boolean;
}
/** Replaces `old.element` with `new.element`, keeping element children. */
export interface Replace {
  old: { element: Element };
  new: { element: Element };
  derived?: boolean;
  checkValidity?: () => boolean;
}
/** Swaps `element`s `oldAttributes` with `newAttributes` */
export interface Update {
  element: Element;
  oldAttributes: Record<string, string | null>;
  newAttributes: Record<string, string | null>;
  derived?: boolean;
  checkValidity?: () => boolean;
}

export type SimpleAction = Update | Create | Replace | Delete | Move;
export type ComplexAction = {
  actions: SimpleAction[];
  title: string;
  derived?: boolean;
};
/** Represents an intended or committed change to some `Element`. */
export type EditorAction = SimpleAction | ComplexAction;

export function isCreate(action: EditorAction): action is Create {
  return (
    (action as Replace).old === undefined &&
    (action as Create).new?.parent !== undefined &&
    (action as Create).new?.element !== undefined
  );
}
export function isDelete(action: EditorAction): action is Delete {
  return (
    (action as Delete).old?.parent !== undefined &&
    (action as Delete).old?.element !== undefined &&
    (action as Replace).new === undefined
  );
}
export function isMove(action: EditorAction): action is Move {
  return (
    (action as Move).old?.parent !== undefined &&
    (action as Move).old?.element !== undefined &&
    (action as Move).new?.parent !== undefined &&
    (action as Replace).new?.element == undefined
  );
}
export function isReplace(action: EditorAction): action is Replace {
  return (
    (action as Move).old?.parent === undefined &&
    (action as Replace).old?.element !== undefined &&
    (action as Move).new?.parent === undefined &&
    (action as Replace).new?.element !== undefined
  );
}
export function isUpdate(action: EditorAction): action is Update {
  return (
    (action as Replace).old === undefined &&
    (action as Replace).new === undefined &&
    (action as Update).element !== undefined &&
    (action as Update).newAttributes !== undefined &&
    (action as Update).oldAttributes !== undefined
  );
}
export function isSimple(action: EditorAction): action is SimpleAction {
  return !((<ComplexAction>action).actions instanceof Array);
}

//** return `Update` action for `element` adding `oldAttributes` */
export function createUpdateAction(
  element: Element,
  newAttributes: Record<string, string | null>
): Update {
  const oldAttributes: Record<string, string | null> = {};
  Array.from(element.attributes).forEach(attr => {
    oldAttributes[attr.name] = attr.value;
  });

  return { element, oldAttributes, newAttributes };
}

/** Throws an error bearing `message`, never returning. */
export function unreachable(message: string): never {
  throw new Error(message);
}

/** @returns an [[`EditorAction`]] with opposite effect of `action`. */
export function invert(action: EditorAction): EditorAction {
  if (!isSimple(action)) {
    const inverse: ComplexAction = {
      title: action.title,
      derived: action.derived,
      actions: [],
    };
    action.actions.forEach(element =>
      inverse.actions.unshift(<SimpleAction>invert(element))
    );
    return inverse;
  }

  const metaData = {
    derived: action.derived,
    checkValidity: action.checkValidity,
  };
  if (isCreate(action)) return { old: action.new, ...metaData };
  else if (isDelete(action)) return { new: action.old, ...metaData };
  else if (isMove(action))
    return {
      old: {
        parent: action.new.parent,
        element: action.old.element,
        reference: action.new.reference,
      },
      new: { parent: action.old.parent, reference: action.old.reference },
      ...metaData,
    };
  else if (isReplace(action))
    return { new: action.old, old: action.new, ...metaData };
  else if (isUpdate(action))
    return {
      element: action.element,
      oldAttributes: action.newAttributes,
      newAttributes: action.oldAttributes,
      ...metaData,
    };
  else return unreachable('Unknown EditorAction type in invert.');
}

/** Represents some intended modification of a `Document` being edited. */
export interface EditorActionDetail<T extends EditorAction> {
  action: T;
  initiator?: Initiator;
}
export type EditorActionEvent<T extends EditorAction> = CustomEvent<
  EditorActionDetail<T>
>;

export function newActionEvent<T extends EditorAction>(
  action: T,
  initiator: Initiator = 'user',
  eventInitDict?: CustomEventInit<Partial<EditorActionDetail<T>>>
): EditorActionEvent<T> {
  return new CustomEvent<EditorActionDetail<T>>('editor-action', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { action, initiator, ...eventInitDict?.detail },
  });
}

declare global {
  interface ElementEventMap {
    ['editor-action']: EditorActionEvent<EditorAction>;
  }
}
