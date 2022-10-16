import { LitElement, property } from 'lit-element';

import { formatXml } from '../foundation.js';

export default class SaveProjectPlugin extends LitElement {
  @property() doc!: XMLDocument;
  @property() docName!: string;

  async run(): Promise<void> {
    if (this.doc) {
      const blob = new Blob(
        [formatXml(new XMLSerializer().serializeToString(this.doc))],
        {
          type: 'application/xml',
        }
      );

      const a = document.createElement('a');
      a.download = this.docName;
      a.href = URL.createObjectURL(blob);
      a.dataset.downloadurl = ['application/xml', a.download, a.href].join(':');
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () {
        URL.revokeObjectURL(a.href);
      }, 5000);
    }
  }
}
