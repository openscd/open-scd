import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { LitElement, property } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import { formatXml } from '../../../_snowpack/link/packages/xml/dist/index.js';
import { newLogEvent } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/history.js';
function cloneAttributes(destElement, sourceElement) {
    let attr;
    const attributes = Array.prototype.slice.call(sourceElement.attributes);
    while ((attr = attributes.pop())) {
        destElement.setAttribute(attr.nodeName, attr.nodeValue);
    }
}
/**
 * Take an XMLDocument and pretty-print, format it, attach it to a document link and then download it.
 * @param doc - The XML document
 * @param document - The element to attach to within the DOM
 * @param filename - The filename to produce
 * @returns The blob object that is serialised
 */
export function saveXmlBlob(doc, document, filename) {
    const blob = new Blob([formatXml(new XMLSerializer().serializeToString(doc))], {
        type: 'application/xml',
    });
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
}
/**
 * Plug-in to allow exporting of the Communication SCL element as an XML file.
 */
export default class ExportCommunication extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
    }
    /** Entry point for this plug-in */
    async run() {
        // create document
        const sclNamespace = 'http://www.iec.ch/61850/2003/SCL';
        const sclDoc = document.implementation.createDocument(sclNamespace, 'SCL', null);
        const pi = sclDoc.createProcessingInstruction('xml', 'version="1.0" encoding="UTF-8"');
        sclDoc.insertBefore(pi, sclDoc.firstChild);
        // ensure schema revision and namespace definitions are transferred
        cloneAttributes(sclDoc.documentElement, this.doc.documentElement);
        const communicationSection = this.doc.querySelector(':root > Communication');
        if (communicationSection) {
            const header = this.doc.querySelector(':root > Header')?.cloneNode(true);
            const communication = this.doc
                .querySelector(':root > Communication')
                ?.cloneNode(true);
            if (header)
                sclDoc.documentElement.appendChild(header);
            sclDoc.documentElement.appendChild(communication);
            const ending = this.docName.slice(0, -4);
            let docName = `${this.docName}-Communication.scd`;
            // use filename extension if there seems to be one
            if (ending.slice(0, 1) === '.') {
                docName = `${this.docName.slice(0, -4)}-Communication${ending}`;
            }
            saveXmlBlob(sclDoc, document, docName);
        }
        else {
            this.dispatchEvent(newLogEvent({
                kind: 'warning',
                title: get('exportCommunication.noCommunicationSection'),
            }));
        }
    }
}
__decorate([
    property({ attribute: false })
], ExportCommunication.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], ExportCommunication.prototype, "editCount", void 0);
__decorate([
    property({ attribute: false })
], ExportCommunication.prototype, "docName", void 0);
//# sourceMappingURL=ExportCommunication.js.map