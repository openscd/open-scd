import { LitElement, property } from 'lit-element';
import { get } from 'lit-translate';

import { formatXml, newLogEvent } from '../foundation.js';

/**
 * Plug-in to allow exporting of the Communication SCL element as an XML file.
 */
export default class ExportCommunication extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property({ attribute: false }) doc!: XMLDocument;
  @property({ attribute: false }) docName!: string;

  @property() exportedCommunicationSection!: Blob | null;

  /** Entry point for this plug-in */
  async run(): Promise<void> {
    const communicationElement = this.doc.querySelector(
      ':root > Communication'
    );

    if (this.doc && communicationElement) {
      this.exportedCommunicationSection = new Blob(
        [
          formatXml(
            new XMLSerializer().serializeToString(<Node>communicationElement)
          ),
        ],
        {
          type: 'application/xml',
        }
      );

      const a = document.createElement('a');
      const hasDotInFileName = this.docName.slice(-4, -3) === '.';
      if (hasDotInFileName) {
        a.download = `${this.docName.slice(0, -4)}-Communication.xml`;
      } else {
        a.download = `${this.docName}-Communication.xml`;
      }
      a.href = URL.createObjectURL(this.exportedCommunicationSection);
      a.dataset.downloadurl = ['application/xml', a.download, a.href].join(':');
      a.style.display = 'none';
      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
      }, 5000);
    } else {
      this.exportedCommunicationSection = null;
      this.dispatchEvent(
        newLogEvent({
          kind: 'warning',
          title: get('exportCommunication.noCommunicationSection'),
        })
      );
    }
  }
}
