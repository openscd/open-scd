export declare type OpenDetail = {
    doc: XMLDocument;
    docName: string;
};
/** Represents the intent to open `doc` with filename `docName`. */
export declare type OpenEvent = CustomEvent<OpenDetail>;
export declare function newOpenEvent(doc: XMLDocument, docName: string): OpenEvent;
declare global {
    interface ElementEventMap {
        ['oscd-open']: OpenEvent;
    }
}
