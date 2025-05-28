import {html} from "../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import "../../../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js";
import "../../../_snowpack/pkg/@material/mwc-icon.js";
import "../../../openscd/src/filtered-list.js";
import {
  find,
  identity,
  pathParts
} from "../../../openscd/src/foundation.js";
import {
  createElement
} from "../../../_snowpack/link/packages/xml/dist/index.js";
import {clientIcon} from "../../../openscd/src/icons/icons.js";
import {openCommunicationMappingWizard} from "./commmap-wizards.js";
function getPath(identity2) {
  if (typeof identity2 !== "string")
    return "";
  return pathParts(identity2)[0] ?? "";
}
function getElement(identity2) {
  if (typeof identity2 !== "string")
    return "";
  return pathParts(identity2)[1] ?? "";
}
function getLogicalNode(doc, identity2) {
  if (identity2.split(">").length === 4) {
    return find(doc, "LN", identity2);
  }
  if (identity2.split(">").length === 3) {
    if (getElement(identity2).split(" ").length > 1) {
      return find(doc, "LN", identity2);
    }
    if (getElement(identity2).split(" ").length === 1) {
      return find(doc, "LN0", identity2);
    }
  }
  return null;
}
function hasClientLN(cb, identity2) {
  for (const clientLN of Array.from(cb.getElementsByTagName("ClientLN"))) {
    const [iedName, apRef, ldInst, prefix, lnClass, lnInst] = [
      "iedName",
      "apRef",
      "ldInst",
      "prefix",
      "lnClass",
      "lnInst"
    ].map((attribute) => clientLN.getAttribute(attribute));
    const ln = getLogicalNode(cb.ownerDocument, identity2);
    if (!ln)
      break;
    const ied = ln.closest("IED");
    const ap = ln.closest("AccessPoint");
    const ld = ln.closest("LDevice");
    if (identity2.split(">").length === 4) {
      if (iedName === ied?.getAttribute("name") && apRef === ap?.getAttribute("name") && ldInst === ld?.getAttribute("inst") && (prefix ?? "") === (ln.getAttribute("prefix") ?? "") && lnClass === ln.getAttribute("lnClass") && (lnInst ?? "") === (ln.getAttribute("inst") ?? ""))
        return true;
    }
    if (identity2.split(">").length === 3) {
      if (getElement(identity2).split(" ").length > 1) {
        const apCount = ied?.querySelectorAll("AccessPoint").length;
        if (iedName === ied?.getAttribute("name") && apCount && (apCount <= 1 || apRef === ap?.getAttribute("name")) && (prefix ?? "") === (ln.getAttribute("prefix") ?? "") && lnClass === ln.getAttribute("lnClass") && (lnInst ?? "") === (ln.getAttribute("inst") ?? ""))
          return true;
      }
      if (getElement(identity2).split(" ").length === 1) {
        if (iedName === ied?.getAttribute("name") && apRef === ap?.getAttribute("name") && ldInst === ld?.getAttribute("inst") && lnClass === ln.getAttribute("lnClass"))
          return true;
      }
    }
  }
  return false;
}
function addClientLnAction(doc) {
  return (inputs, wizard) => {
    const cbSelected = wizard.shadowRoot.querySelector("#sourcelist").selected;
    const selectedLNs = wizard.shadowRoot.querySelector("#sinklist").selected;
    const actions = [];
    selectedLNs.forEach((selectedLN) => {
      const lnIdentity = selectedLN.value;
      const reportCbs = cbSelected.map((cb) => cb.value).map((cbValue) => find(doc, "ReportControl", cbValue)).filter((cb) => cb !== null);
      reportCbs.forEach((cb) => {
        if (cb.querySelector("RptEnabled") === null) {
          const rptEnabled = createElement(doc, "RptEnabled", {
            max: "1"
          });
          cb.appendChild(rptEnabled);
        }
        const ln = getLogicalNode(doc, lnIdentity);
        if (cb.querySelector("RptEnabled") !== null && !hasClientLN(cb, lnIdentity) && ln) {
          const element = createElement(doc, "ClientLN", {
            iedName: ln?.closest("IED")?.getAttribute("name") ?? null,
            apRef: ln?.closest("AccessPoint")?.getAttribute("name") ?? null,
            ldInst: ln?.closest("LDevice")?.getAttribute("inst") ?? "LD0",
            prefix: ln?.getAttribute("prefix") ?? "",
            lnClass: ln?.getAttribute("lnClass") ?? "",
            lnInst: ln?.getAttribute("inst") ?? ""
          });
          actions.push({
            new: {
              parent: cb.querySelector("RptEnabled"),
              element
            }
          });
        }
      });
    });
    return actions;
  };
}
export function createClientLnWizard(sourceIEDs, sinkIED) {
  const reportItems = sourceIEDs.flatMap((sourceIED) => {
    return Array.from(sourceIED.getElementsByTagName("ReportControl")).map((cb) => {
      return {
        identity: identity(cb),
        numberClientLNs: Array.from(cb.getElementsByTagName("ClientLN")).length,
        max: Number(cb.querySelector("RptEnabled")?.getAttribute("max"))
      };
    });
  });
  const clientLns = Array.from(sinkIED.querySelectorAll(":root > IED > AccessPoint > LN"));
  const serverLns = Array.from(sinkIED.querySelectorAll(":root > IED > AccessPoint > Server > LDevice > LN"));
  const serverLn0s = Array.from(sinkIED.querySelectorAll(":root > IED > AccessPoint > Server > LDevice > LN0"));
  return [
    {
      title: get("commmap.connectToIED", {
        iedName: sinkIED.getAttribute("name") ?? ""
      }),
      primary: {
        label: get("connect"),
        icon: "",
        action: addClientLnAction(sinkIED.ownerDocument)
      },
      content: [
        html`<div
          class="wrapper"
          style="display: grid; grid-template-columns: 1fr 1fr;"
        >
          <filtered-list
            id="sourcelist"
            multi
            searchFieldLabel="${get("scl.Report")}"
            >${reportItems.sort((a, b) => b.numberClientLNs - a.numberClientLNs).map((item) => html`<mwc-check-list-item
                    left
                    hasMeta
                    twoline
                    value="${item.identity}"
                    ?disabled=${item.numberClientLNs >= item.max}
                    ><span>${getElement(item.identity)}</span
                    ><span slot="secondary">${getPath(item.identity)}</span
                    ><span slot="meta"
                      >${item.max ? item.numberClientLNs + `/` + item.max : item.numberClientLNs}</span
                    ></mwc-check-list-item
                  >`)}</filtered-list
          ><filtered-list
            multi
            id="sinklist"
            activatable
            searchFieldLabel="${get("scl.LN")}"
            >${clientLns.map((ln) => html`<mwc-check-list-item twoline value="${identity(ln)}">
                  <span>${getElement(identity(ln))}</span>
                  <span slot="secondary">${getPath(identity(ln))}</span>
                </mwc-check-list-item>`)}
            <li divider role="separator"></li>
            ${serverLns.map((ln) => html`<mwc-check-list-item twoline value="${identity(ln)}">
                  <span>${getElement(identity(ln))}</span>
                  <span slot="secondary">${getPath(identity(ln))}</span>
                </mwc-check-list-item>`)}
            ${serverLn0s.map((ln0) => html`<mwc-check-list-item twoline value="${identity(ln0)}">
                  <span>LLN0</span>
                  <span slot="secondary">${identity(ln0)}</span>
                </mwc-check-list-item>`)}</filtered-list
          >
        </div>`
      ]
    }
  ];
}
function disconnectClientLnAction(elements) {
  return (inputs, wizard, list) => {
    const items = list.index;
    const selectedClientLNs = Array.from(items).map((index) => elements[index]);
    const actions = [];
    selectedClientLNs.forEach((clientLN) => {
      actions.push({
        old: {
          parent: clientLN.parentElement,
          element: clientLN,
          reference: clientLN.nextElementSibling
        }
      });
    });
    return actions;
  };
}
export function selectClientLNsWizard(clientLns, root) {
  const controlBlock = clientLns[0].closest("ReportControl");
  const cbId = identity(controlBlock);
  const sinkIedName = clientLns[0].getAttribute("iedName");
  return [
    {
      title: cbId + " - " + sinkIedName,
      primary: {
        icon: "delete",
        label: get("disconnect"),
        action: disconnectClientLnAction(clientLns)
      },
      secondary: {
        icon: "",
        label: get("back"),
        action: openCommunicationMappingWizard(root)
      },
      content: [
        html`<filtered-list multi
          >${clientLns.map((clientLN) => {
          const ln = (clientLN.getAttribute("prefix") ?? "") + clientLN.getAttribute("lnClass") + (clientLN.getAttribute("lnInst") ?? "");
          return html`<mwc-check-list-item graphic="icon">
              <span>${ln}</span>
              <mwc-icon slot="graphic">${clientIcon}</mwc-icon>
            </mwc-check-list-item> `;
        })}</filtered-list
        >`
      ]
    }
  ];
}
