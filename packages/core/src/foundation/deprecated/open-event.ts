/** 
 * @since 0.0.1
 * 
 * @deprecated
 * 
 * Represents a document to be opened. 
 */
export interface OpenDocDetail {
  doc: XMLDocument;
  docName: string;
  docId?: string;
}

/**
 * @since 0.0.1
 * 
 * @deprecated
 */
export type OpenDocEvent = CustomEvent<OpenDocDetail>;

/**
 * @since 0.0.1
 * 
 * @deprecated
 * 
 * @param doc XMLDocument
 * @param docName string
 * @param eventInitDict 
 * @returns OpenDocEvent {@Link OpenDocEvent}
 */
export function newOpenDocEvent(
  doc: XMLDocument,
  docName: string,
  eventInitDict?: CustomEventInit<Partial<OpenDocDetail>>
): OpenDocEvent {
  return new CustomEvent<OpenDocDetail>('open-doc', {
    bubbles: true,
    composed: true,
    ...eventInitDict,
    detail: { doc, docName, ...eventInitDict?.detail },
  });
}

declare global {
    interface ElementEventMap {
      ['open-doc']: OpenDocEvent;
    }
  }