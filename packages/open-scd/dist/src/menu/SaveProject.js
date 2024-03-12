import { __decorate } from "tslib";
import { LitElement, property } from 'lit-element';
function formatXml(xml, tab) {
    let formatted = '', indent = '';
    if (!tab)
        tab = '\t';
    xml.split(/>\s*</).forEach(function (node) {
        if (node.match(/^\/\w/))
            indent = indent.substring(tab.length);
        formatted += indent + '<' + node + '>\r\n';
        if (node.match(/^<?\w[^>]*[^/]$/))
            indent += tab;
    });
    return formatted.substring(1, formatted.length - 3);
}
export default class SaveProjectPlugin extends LitElement {
    async run() {
        if (this.doc) {
            let documentAsString = formatXml(new XMLSerializer().serializeToString(this.doc));
            // Add XML declaration/prolog if it's been stripped
            // TODO: This can be removed once the improved OpenSCD core edit API is present
            documentAsString = documentAsString.startsWith('<?xml')
                ? documentAsString
                : '<?xml version="1.0" encoding="UTF-8"?>' + '\n' + documentAsString;
            const blob = new Blob([documentAsString], {
                type: 'application/xml',
            });
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
__decorate([
    property()
], SaveProjectPlugin.prototype, "doc", void 0);
__decorate([
    property()
], SaveProjectPlugin.prototype, "docName", void 0);
//# sourceMappingURL=SaveProject.js.map