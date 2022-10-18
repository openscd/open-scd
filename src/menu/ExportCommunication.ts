import { LitElement, property } from 'lit-element';
import { get } from 'lit-translate';

import { saveXmlBlob } from './SaveProject.js';
import { newLogEvent } from '../foundation.js';

function cloneAttributes(destElement: Element, sourceElement: Element) {
  let attr;
  const attributes = Array.prototype.slice.call(sourceElement.attributes);
  while ((attr = attributes.pop())) {
    destElement.setAttribute(attr.nodeName, attr.nodeValue);
  }
}

/**
 * Plug-in to allow exporting of the Communication SCL element as an XML file.
 */
export default class ExportCommunication extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property({ attribute: false }) doc!: XMLDocument;
  @property({ attribute: false }) docName!: string;
  @property() exportBlob!: Blob | null;

  /** Entry point for this plug-in */
  async run(): Promise<void> {
    // create document
    const sclNamespace = 'http://www.iec.ch/61850/2003/SCL';
    const sclDoc = document.implementation.createDocument(
      sclNamespace,
      'SCL',
      null
    );
    const pi = sclDoc.createProcessingInstruction(
      'xml',
      'version="1.0" encoding="UTF-8"'
    );
    sclDoc.insertBefore(pi, sclDoc.firstChild);

    // ensure schema revision and namespace definitions are transferred
    cloneAttributes(sclDoc.documentElement, this.doc.documentElement);

    const communicationSection = this.doc.querySelector(
      ':root > Communication'
    );

    if (communicationSection) {
      const header = this.doc.querySelector(':root > Header')?.cloneNode(true);
      const communication = this.doc
        .querySelector(':root > Communication')
        ?.cloneNode(true);

      if (header) sclDoc.documentElement.appendChild(<Node>header);
      sclDoc.documentElement.appendChild(<Node>communication);

      const ending = this.docName.slice(0, -4);
      let docName = `${this.docName}-Communication.scd`;
      // use filename extension if there seems to be one
      if (ending.slice(0, 1) === '.') {
        docName = `${this.docName.slice(0, -4)}-Communication${ending}`;
      }
      this.exportBlob = saveXmlBlob(sclDoc, document, docName);
    } else {
      this.exportBlob = null;
      this.dispatchEvent(
        newLogEvent({
          kind: 'warning',
          title: get('exportCommunication.noCommunicationSection'),
        })
      );
    }
  }
}
