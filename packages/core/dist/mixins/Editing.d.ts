import { LitElement } from 'lit';
import { Edit, EditEvent, LitElementConstructor, OpenEvent } from '../foundation.js';
export declare type LogEntry = {
    undo: Edit;
    redo: Edit;
};
export interface EditingMixin {
    doc: XMLDocument;
    history: LogEntry[];
    editCount: number;
    last: number;
    canUndo: boolean;
    canRedo: boolean;
    docs: Record<string, XMLDocument>;
    docName: string;
    handleOpenDoc(evt: OpenEvent): void;
    handleEditEvent(evt: EditEvent): void;
    undo(n?: number): void;
    redo(n?: number): void;
}
declare type ReturnConstructor = new (...args: any[]) => LitElement & EditingMixin;
/** A mixin for editing a set of [[docs]] using [[EditEvent]]s */
export declare function Editing<TBase extends LitElementConstructor>(Base: TBase): TBase & ReturnConstructor;
export {};
