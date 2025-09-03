import {html} from "../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import "../../../_snowpack/pkg/@material/mwc-icon.js";
import "../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../../../openscd/src/filtered-list.js";
import {
  find,
  findControlBlocks,
  identity,
  isPublic,
  newWizardEvent
} from "../../../openscd/src/foundation.js";
import {selectClientLNsWizard} from "./clientln.js";
import {selectExtRefsWizard} from "./controlwithiedname.js";
import {controlBlockIcons} from "../../../openscd/src/icons/icons.js";
export function openCommunicationMappingWizard(root) {
  return () => [() => communicationMappingWizard(root)];
}
export function getSinkReferences(root) {
  if (root instanceof Element && root.tagName === "IED")
    return Array.from(root.ownerDocument.getElementsByTagName("ClientLN")).filter(isPublic).filter((clientLn) => clientLn.getAttribute("iedName") === root.getAttribute("name") || clientLn.closest("IED") === root);
  return Array.from(root.getElementsByTagName("ClientLN")).filter(isPublic);
}
export function getSourceReferences(root) {
  if (root instanceof Element && root.tagName === "IED")
    return Array.from(root.ownerDocument.getElementsByTagName("ExtRef")).filter(isPublic).filter((extRef) => extRef.getAttribute("iedName") === root.getAttribute("name") || extRef.closest("IED") === root && extRef.getAttribute("iedName"));
  return Array.from(root.getElementsByTagName("ExtRef")).filter(isPublic).filter((element) => element.getAttribute("iedName"));
}
export function communicationMappingWizard(element) {
  const ownerDocument = element instanceof XMLDocument ? element : element.ownerDocument;
  const connections = new Map();
  const sourceRefs = getSourceReferences(element);
  const sinkRefs = getSinkReferences(element);
  sinkRefs.forEach((element2) => {
    const controlBlock = element2.parentElement.parentElement;
    const iedName = element2.getAttribute("iedName");
    const key = identity(controlBlock) + " | " + controlBlock.tagName + " | " + iedName;
    if (!connections.has(key))
      connections.set(key, []);
    connections.get(key)?.push(element2);
  });
  sourceRefs.forEach((element2) => {
    const iedName = element2.closest("IED")?.getAttribute("name") ?? "";
    const controlBlocks = findControlBlocks(element2);
    controlBlocks.forEach((controlBlock) => {
      const key = identity(controlBlock) + " | " + controlBlock.tagName + " | " + iedName;
      if (!connections.has(key))
        connections.set(key, []);
      connections.get(key)?.push(element2);
    });
  });
  return [
    {
      title: get("commmap.title"),
      content: [
        html`<filtered-list
          >${Array.from(connections.keys()).map((key) => {
          const elements = connections.get(key);
          const [cbId, cbTag, sinkIED] = key.split(" | ");
          const cbElement = find(ownerDocument, cbTag, cbId);
          const [_, sourceIED, controlBlock] = cbId.match(/^(.+)>>(.*)$/);
          return html`<mwc-list-item
              twoline
              graphic="icon"
              hasMeta
              @click="${(evt) => {
            evt.target.dispatchEvent(newWizardEvent(cbTag === "ReportControl" ? selectClientLNsWizard(elements, element) : selectExtRefsWizard(elements, cbElement, element)));
            evt.target.dispatchEvent(newWizardEvent());
          }}"
            >
              <span
                >${sourceIED}
                <mwc-icon style="--mdc-icon-size: 1em;">trending_flat</mwc-icon>
                ${sinkIED}</span
              >
              <span slot="secondary">${controlBlock}</span>
              <span slot="meta" style="padding-left: 10px"
                >${connections.get(key).length}</span
              >
              <mwc-icon slot="graphic">${controlBlockIcons[cbTag]}</mwc-icon>
            </mwc-list-item>`;
        })}</filtered-list
        >`
      ]
    }
  ];
}
