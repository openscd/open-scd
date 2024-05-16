/**
 * @since 0.0.1
 */
export type OpenDetail = {
  doc: XMLDocument;
  docName: string;
};

/** 
 * @since 0.0.1
 * 
 * Represents the intent to open `doc` with filename `docName`. 
 */
export type OpenEvent = CustomEvent<OpenDetail>;

/**
 * @since 0.0.1
 * 
 * Creates a new OpenEvent from the provided `doc` and `docName`
 * 
 * @param doc XMLDocument
 * @param docName string
 * 
 * @returns OpenEvent {@link OpenEvent}
 */
export function newOpenEvent(doc: XMLDocument, docName: string): OpenEvent {
  return new CustomEvent<OpenDetail>('oscd-open', {
    bubbles: true,
    composed: true,
    detail: { doc, docName },
  });
}

declare global {
  interface ElementEventMap {
    ['oscd-open']: OpenEvent;
  }
}
