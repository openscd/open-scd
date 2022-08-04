export interface OpenDocDetail {
  doc: XMLDocument;
  docName: string;
}

/** Represents the intent to open `doc` with filename `docName`. */
export type OpenDocEvent = CustomEvent<OpenDocDetail>;

export function newOpenDocEvent(
  doc: XMLDocument,
  docName: string
): OpenDocEvent {
  return new CustomEvent<OpenDocDetail>('open-doc', {
    bubbles: true,
    composed: true,
    detail: { doc, docName },
  });
}

declare global {
  interface ElementEventMap {
    ['open-doc']: OpenDocEvent;
  }
}
