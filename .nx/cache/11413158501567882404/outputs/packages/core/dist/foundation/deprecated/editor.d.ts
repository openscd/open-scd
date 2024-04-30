/** Inserts `new.element` to `new.parent` before `new.reference`. */
export interface Create {
    new: {
        parent: Node;
        element: Node;
        reference?: Node | null;
    };
    derived?: boolean;
    checkValidity?: () => boolean;
}
/** Removes `old.element` from `old.parent` before `old.reference`. */
export interface Delete {
    old: {
        parent: Node;
        element: Node;
        reference?: Node | null;
    };
    derived?: boolean;
    checkValidity?: () => boolean;
}
/** Reparents of `old.element` to `new.parent` before `new.reference`. */
export interface Move {
    old: {
        parent: Element;
        element: Element;
        reference?: Node | null;
    };
    new: {
        parent: Element;
        reference?: Node | null;
    };
    derived?: boolean;
    checkValidity?: () => boolean;
}
/** Replaces `old.element` with `new.element`, keeping element children. */
export interface Replace {
    old: {
        element: Element;
    };
    new: {
        element: Element;
    };
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
export declare function isCreate(action: EditorAction): action is Create;
export declare function isDelete(action: EditorAction): action is Delete;
export declare function isMove(action: EditorAction): action is Move;
export declare function isReplace(action: EditorAction): action is Replace;
export declare function isUpdate(action: EditorAction): action is Update;
export declare function isSimple(action: EditorAction): action is SimpleAction;
export declare function createUpdateAction(element: Element, newAttributes: Record<string, string | null>): Update;
/** Throws an error bearing `message`, never returning. */
export declare function unreachable(message: string): never;
/** @returns an [[`EditorAction`]] with opposite effect of `action`. */
export declare function invert(action: EditorAction): EditorAction;
/** Represents some intended modification of a `Document` being edited. */
export interface EditorActionDetail<T extends EditorAction> {
    action: T;
}
export type EditorActionEvent<T extends EditorAction> = CustomEvent<EditorActionDetail<T>>;
export declare function newActionEvent<T extends EditorAction>(action: T, eventInitDict?: CustomEventInit<Partial<EditorActionDetail<T>>>): EditorActionEvent<T>;
declare global {
    interface ElementEventMap {
        ['editor-action']: EditorActionEvent<EditorAction>;
    }
}
