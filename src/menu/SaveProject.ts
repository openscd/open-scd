import { LitElement, property } from 'lit-element';

import { formatXml } from '../foundation.js';

/**
 * Take an XMLDocument and pretty-print, format it, attached it to a document and then automatically download it.
 * @param doc - The XML document
 * @param document - The element to attach to within the DOM
 * @param filename - The filename to produce
 * @returns The blob object that is serialised
 */
export function saveXmlBlob(
  doc: XMLDocument,
  document: Document,
  filename: string
): Blob {
  const blob = new Blob(
    [formatXml(new XMLSerializer().serializeToString(doc))],
    {
      type: 'application/xml',
    }
  );

  const a = document.createElement('a');
  a.download = filename;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = ['application/xml', a.download, a.href].join(':');
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function () {
    URL.revokeObjectURL(a.href);
  }, 5000);
  return blob;
}

export default class SaveProjectPlugin extends LitElement {
  @property() doc!: XMLDocument;
  @property() docName!: string;

  async run(): Promise<void> {
    if (this.doc) {
      saveXmlBlob(this.doc, document, this.docName);
    }
  }
}
