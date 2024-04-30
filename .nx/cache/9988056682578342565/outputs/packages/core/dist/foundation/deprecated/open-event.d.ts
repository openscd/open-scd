/** Represents a document to be opened. */
export interface OpenDocDetail {
    doc: XMLDocument;
    docName: string;
    docId?: string;
}
export type OpenDocEvent = CustomEvent<OpenDocDetail>;
export declare function newOpenDocEvent(doc: XMLDocument, docName: string, eventInitDict?: CustomEventInit<Partial<OpenDocDetail>>): OpenDocEvent;
declare global {
    interface ElementEventMap {
        ['open-doc']: OpenDocEvent;
    }
}
