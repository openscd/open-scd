import {html} from "../../_snowpack/pkg/lit-element.js";
import {get} from "../../_snowpack/pkg/lit-translate.js";
import {
  createElement,
  selector
} from "../foundation.js";
import {
  dataAttributePicker,
  getDataModelChildren
} from "./foundation/finder.js";
export function newFCDA(parent, path) {
  const [leafTag, leafId] = path[path.length - 1].split(": ");
  const leaf = parent.ownerDocument.querySelector(selector(leafTag, leafId));
  if (!leaf || getDataModelChildren(leaf).length > 0)
    return;
  const lnSegment = path.find((segment) => segment.startsWith("LN"));
  if (!lnSegment)
    return;
  const [lnTag, lnId] = lnSegment.split(": ");
  const ln = parent.ownerDocument.querySelector(selector(lnTag, lnId));
  if (!ln)
    return;
  const ldInst = ln.closest("LDevice")?.getAttribute("inst");
  const prefix = ln.getAttribute("prefix") ?? "";
  const lnClass = ln.getAttribute("lnClass");
  const lnInst = ln.getAttribute("inst") && ln.getAttribute("inst") !== "" ? ln.getAttribute("inst") : null;
  let doName = "";
  let daName = "";
  let fc = "";
  for (const segment of path) {
    const [tagName, id] = segment.split(": ");
    if (!["DO", "DA", "SDO", "BDA"].includes(tagName))
      continue;
    const element = parent.ownerDocument.querySelector(selector(tagName, id));
    if (!element)
      return;
    const name = element.getAttribute("name");
    if (tagName === "DO")
      doName = name;
    if (tagName === "SDO")
      doName = doName + "." + name;
    if (tagName === "DA") {
      daName = name;
      fc = element.getAttribute("fc") ?? "";
    }
    if (tagName === "BDA")
      daName = daName + "." + name;
  }
  if (!ldInst || !lnClass || !doName || !daName || !fc)
    return;
  return createElement(parent.ownerDocument, "FCDA", {
    ldInst,
    prefix,
    lnClass,
    lnInst,
    doName,
    daName,
    fc
  });
}
function createFCDAsAction(parent) {
  return (inputs, wizard) => {
    const finder = wizard.shadowRoot.querySelector("finder-list");
    const paths = finder?.paths ?? [];
    const actions = [];
    for (const path of paths) {
      const element = newFCDA(parent, path);
      if (!element)
        continue;
      actions.push({
        new: {
          parent,
          element,
          reference: null
        }
      });
    }
    return actions;
  };
}
export function createFCDAsWizard(parent) {
  const server = parent.closest("Server");
  return [
    {
      title: get("wizard.title.add", {tagName: "FCDA"}),
      primary: {
        label: "add",
        icon: "add",
        action: createFCDAsAction(parent)
      },
      content: [server ? dataAttributePicker(server) : html``]
    }
  ];
}
