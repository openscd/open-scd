import { LitElement, property } from 'lit-element';

function formatXml(xml: string, tab?: string) {
  let formatted = '',
    indent = '';

  if (!tab) tab = '\t';
  xml.split(/>\s*</).forEach(function (node) {
    if (node.match(/^\/\w/)) indent = indent.substring(tab!.length);
    formatted += indent + '<' + node + '>\r\n';
    if (node.match(/^<?\w[^>]*[^/]$/)) indent += tab;
  });
  return formatted.substring(1, formatted.length - 3);
}

export default class SaveProjectPlugin extends LitElement {
  @property() doc!: XMLDocument;
  @property() docName!: string;

  async save(): Promise<void> {
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
