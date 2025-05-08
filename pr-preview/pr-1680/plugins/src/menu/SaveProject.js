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
function formatXml(xml, tab) {
  let formatted = "", indent = "";
  if (!tab)
    tab = "	";
  xml.split(/>\s*</).forEach(function(node) {
    if (node.match(/^\/\w/))
      indent = indent.substring(tab.length);
    formatted += indent + "<" + node + ">\r\n";
    if (node.match(/^<?\w[^>]*[^/]$/))
      indent += tab;
  });
  return formatted.substring(1, formatted.length - 3);
}
export default class SaveProjectPlugin extends LitElement {
  async run() {
    if (this.doc) {
      let documentAsString = formatXml(new XMLSerializer().serializeToString(this.doc));
      documentAsString = documentAsString.startsWith("<?xml") ? documentAsString : '<?xml version="1.0" encoding="UTF-8"?>\n' + documentAsString;
      const blob = new Blob([documentAsString], {
        type: "application/xml"
      });
      const a = document.createElement("a");
      a.download = this.docName;
      a.href = URL.createObjectURL(blob);
      a.dataset.downloadurl = ["application/xml", a.download, a.href].join(":");
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function() {
        URL.revokeObjectURL(a.href);
      }, 5e3);
    }
  }
}
__decorate([
  property()
], SaveProjectPlugin.prototype, "doc", 2);
__decorate([
  property()
], SaveProjectPlugin.prototype, "docName", 2);
