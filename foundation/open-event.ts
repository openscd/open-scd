export type OpenDetail = {
  doc: XMLDocument;
  docName: string;
}

/** Represents the intent to open `doc` with filename `docName`. */
export type OpenEvent = CustomEvent<OpenDetail>;

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
