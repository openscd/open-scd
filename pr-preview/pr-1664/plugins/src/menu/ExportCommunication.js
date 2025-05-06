var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {LitElement, property} from "../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import {formatXml} from "../../../_snowpack/link/packages/xml/dist/index.js";
import {newLogEvent} from "../../../_snowpack/link/packages/core/dist/foundation/deprecated/history.js";
function cloneAttributes(destElement, sourceElement) {
  let attr;
  const attributes = Array.prototype.slice.call(sourceElement.attributes);
  while (attr = attributes.pop()) {
    destElement.setAttribute(attr.nodeName, attr.nodeValue);
  }
}
export function saveXmlBlob(doc, document2, filename) {
  const blob = new Blob([formatXml(new XMLSerializer().serializeToString(doc))], {
    type: "application/xml"
  });
  const a = document2.createElement("a");
  a.download = filename;
  a.href = URL.createObjectURL(blob);
  a.dataset.downloadurl = ["application/xml", a.download, a.href].join(":");
  a.style.display = "none";
  document2.body.appendChild(a);
  a.click();
  document2.body.removeChild(a);
  setTimeout(function() {
    URL.revokeObjectURL(a.href);
  }, 5e3);
}
export default class ExportCommunication extends LitElement {
  constructor() {
    super(...arguments);
    this.editCount = -1;
  }
  async run() {
    const sclNamespace = "http://www.iec.ch/61850/2003/SCL";
    const sclDoc = document.implementation.createDocument(sclNamespace, "SCL", null);
    const pi = sclDoc.createProcessingInstruction("xml", 'version="1.0" encoding="UTF-8"');
    sclDoc.insertBefore(pi, sclDoc.firstChild);
    cloneAttributes(sclDoc.documentElement, this.doc.documentElement);
    const communicationSection = this.doc.querySelector(":root > Communication");
    if (communicationSection) {
      const header = this.doc.querySelector(":root > Header")?.cloneNode(true);
      const communication = this.doc.querySelector(":root > Communication")?.cloneNode(true);
      if (header)
        sclDoc.documentElement.appendChild(header);
      sclDoc.documentElement.appendChild(communication);
      const ending = this.docName.slice(0, -4);
      let docName = `${this.docName}-Communication.scd`;
      if (ending.slice(0, 1) === ".") {
        docName = `${this.docName.slice(0, -4)}-Communication${ending}`;
      }
      saveXmlBlob(sclDoc, document, docName);
    } else {
      this.dispatchEvent(newLogEvent({
        kind: "warning",
        title: get("exportCommunication.noCommunicationSection")
      }));
    }
  }
}
__decorate([
  property({attribute: false})
], ExportCommunication.prototype, "doc", 2);
__decorate([
  property({type: Number})
], ExportCommunication.prototype, "editCount", 2);
__decorate([
  property({attribute: false})
], ExportCommunication.prototype, "docName", 2);
