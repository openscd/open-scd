import {html, render} from "../../../_snowpack/pkg/lit-html.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import "../../../_snowpack/pkg/@material/mwc-icon.js";
import "../../../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js";
import "../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import {ListBase} from "../../../_snowpack/pkg/@material/mwc-list/mwc-list-base.js";
import "../../../openscd/src/filtered-list.js";
import {
  find,
  getValue,
  identity,
  isPublic,
  newWizardEvent,
  referencePath,
  newLnInstGenerator
} from "../../../openscd/src/foundation.js";
import {
  cloneElement,
  createElement,
  getChildElementsByTagName
} from "../../../_snowpack/link/packages/xml/dist/index.js";
import {patterns} from "./foundation/limits.js";
import {newLogEvent} from "../../../_snowpack/link/packages/core/dist/foundation/deprecated/history.js";
function createLNodeAction(parent) {
  return (inputs, wizard, list) => {
    const selectedLNodeTypes = list.items.filter((item) => item.selected).map((item) => item.value).map((identity2) => find(parent.ownerDocument, "LNodeType", identity2)).filter((item) => item !== null);
    const lnInstGenerator = newLnInstGenerator(parent);
    const createActions = selectedLNodeTypes.map((selectedLNodeType) => {
      const lnClass = selectedLNodeType.getAttribute("lnClass");
      if (!lnClass)
        return null;
      const uniqueLnInst = lnInstGenerator(lnClass);
      if (!uniqueLnInst) {
        wizard.dispatchEvent(newLogEvent({
          kind: "error",
          title: get("lnode.log.title", {lnClass}),
          message: get("lnode.log.nonuniquelninst")
        }));
        return;
      }
      const hasLLN0 = getChildElementsByTagName(parent, "LNode").some((lnode) => lnode.getAttribute("lnClass") === "LLN0");
      if (lnClass === "LLN0" && hasLLN0) {
        wizard.dispatchEvent(newLogEvent({
          kind: "error",
          title: get("lnode.log.title", {lnClass}),
          message: get("lnode.log.uniqueln0", {lnClass})
        }));
        return;
      }
      const hasLPHD = getChildElementsByTagName(parent, "LNode").some((lnode) => lnode.getAttribute("lnClass") === "LPHD");
      if (lnClass === "LPHD" && hasLPHD) {
        wizard.dispatchEvent(newLogEvent({
          kind: "error",
          title: get("lnode.log.title", {lnClass}),
          message: get("lnode.log.uniqueln0", {lnClass})
        }));
        return;
      }
      const lnInst = lnClass === "LLN0" ? "" : uniqueLnInst;
      const element = createElement(parent.ownerDocument, "LNode", {
        iedName: "None",
        ldInst: null,
        prefix: null,
        lnClass,
        lnInst,
        lnType: selectedLNodeType.getAttribute("id")
      });
      return {new: {parent, element}};
    }).filter((action) => action);
    return createActions;
  };
}
function openLNodeReferenceWizard(parent) {
  return (wizard) => {
    wizard.dispatchEvent(newWizardEvent());
    wizard.dispatchEvent(newWizardEvent(lNodeReferenceWizard(parent)));
  };
}
function lNodeInstanceWizard(parent) {
  const lNodeTypes = Array.from(parent.ownerDocument.querySelectorAll("LNodeType"));
  return [
    {
      title: get("lnode.wizard.title.selectLNodeTypes"),
      menuActions: [
        {
          icon: "",
          label: get("lnode.wizard.reference"),
          action: openLNodeReferenceWizard(parent)
        }
      ],
      primary: {
        icon: "save",
        label: get("save"),
        action: createLNodeAction(parent)
      },
      content: [
        html`<filtered-list multi
          >${lNodeTypes.map((lNodeType) => {
          const isDisabled = lNodeType.getAttribute("lnClass") === "LLN0" && getChildElementsByTagName(parent, "LNode").some((lnode) => lnode.getAttribute("lnClass") === "LLN0") || lNodeType.getAttribute("lnClass") === "LPHD" && getChildElementsByTagName(parent, "LNode").some((lnode) => lnode.getAttribute("lnClass") === "LPHD");
          return html`<mwc-check-list-item
              twoline
              value="${identity(lNodeType)}"
              ?disabled=${isDisabled}
              ><span>${lNodeType.getAttribute("lnClass")}</span
              ><span slot="secondary"
                >${isDisabled ? get("lnode.wizard.uniquewarning") : identity(lNodeType)}</span
              ></mwc-check-list-item
            >`;
        })}</filtered-list
        >`
      ]
    }
  ];
}
const preferredLn = {
  CBR: ["CSWI", "CILO", "XCBR"],
  DIS: ["CSWI", "CILO", "XSWI"],
  VTR: ["TVTR"],
  CTR: ["TCTR"],
  Bay: ["LLN0"],
  VoltageLevel: ["LLN0"],
  Substation: ["LLN0"]
};
function compare(a, b) {
  if (a.disabled !== b.disabled)
    return b.disabled ? -1 : 1;
  if (a.preferred !== b.preferred)
    return a.preferred ? -1 : 1;
  if (a.selected !== b.selected)
    return a.selected ? -1 : 1;
  return 0;
}
const APldInst = "Client LN";
export function getLNode(parent, anyln) {
  return Array.from(parent.getElementsByTagName("LNode")).filter((item) => !item.closest("Private")).filter((lnode) => isLNodeReference(anyln, lnode))[0] ?? null;
}
function isLNodeReference(anyln, lnode) {
  return (lnode.getAttribute("iedName") ?? "") === (anyln.closest("IED")?.getAttribute("name") ?? "") && (lnode.getAttribute("ldInst") ?? "") === (anyln.closest("LDevice")?.getAttribute("inst") ?? "") && (lnode.getAttribute("prefix") ?? "") === (anyln.getAttribute("prefix") ?? "") && (lnode.getAttribute("lnClass") ?? "") === (anyln.getAttribute("lnClass") ?? "") && (lnode.getAttribute("lnInst") ?? "") === (anyln.getAttribute("inst") ?? "");
}
function createAction(parent, anyln) {
  const element = createElement(parent.ownerDocument, "LNode", {
    iedName: anyln.closest("IED")?.getAttribute("name") ?? "",
    ldInst: anyln.closest("LDevice")?.getAttribute("inst") ?? "",
    prefix: anyln.getAttribute("prefix") ?? "",
    lnClass: anyln.getAttribute("lnClass") ?? "",
    lnInst: anyln.getAttribute("inst") ?? ""
  });
  return {
    new: {
      parent,
      element
    }
  };
}
function deleteAction(parent, lnode) {
  return {
    old: {
      parent,
      element: lnode,
      reference: lnode.nextElementSibling
    }
  };
}
function includesAnyLN(anylns, lnode) {
  return anylns.some((anyln) => isLNodeReference(anyln, lnode));
}
function includesLNode(anyln, lnodes) {
  return lnodes.some((lnode) => isLNodeReference(anyln, lnode));
}
export function lNodeWizardAction(parent) {
  return (inputs, wizard, list) => {
    const selectedAnyLn = list.items.filter((item) => item.selected).map((item) => item.value).map((identity2) => {
      const ln0 = find(parent.ownerDocument, "LN0", identity2);
      if (ln0)
        return ln0;
      return find(parent.ownerDocument, "LN", identity2);
    }).filter((item) => item !== null);
    const oldLNodes = getChildElementsByTagName(parent, "LNode").filter(isPublic);
    const deleteActions = oldLNodes.filter((lnode) => !includesAnyLN(selectedAnyLn, lnode)).map((lnode) => deleteAction(parent, lnode));
    const createActions = selectedAnyLn.filter((anyln) => !includesLNode(anyln, oldLNodes)).map((anyln) => createAction(parent, anyln));
    return deleteActions.concat(createActions);
  };
}
function getListContainer(target, selector) {
  return target.parentElement?.parentElement?.nextElementSibling?.querySelector(selector) ?? null;
}
function onIEDSelect(evt, parent) {
  if (!(evt.target instanceof ListBase))
    return;
  const lnList = getListContainer(evt.target, "#lnList");
  if (lnList === null)
    return;
  const doc = parent.ownerDocument;
  const selectedIEDItems = evt.target.selected;
  const lnItems = selectedIEDItems.flatMap((item) => Array.from(doc.querySelectorAll(`:root > IED[name="${item.value}"] > AccessPoint > LN,:root > IED[name="${item.value}"] > AccessPoint > Server > LDevice > LN,:root > IED[name="${item.value}"] > AccessPoint > Server > LDevice > LN0`)).filter((item2) => !item2.closest("Private"))).filter((item) => item !== null).map((item) => {
    const isPrefered = preferredLn[parent.getAttribute("type") ? parent.getAttribute("type") ?? "" : parent.tagName ?? ""]?.includes(item.getAttribute("lnClass") ?? "") ?? false;
    const lnode = getLNode(parent.ownerDocument, item);
    const selected = lnode?.parentElement === parent;
    return {
      selected,
      disabled: lnode !== null && !selected,
      prefered: isPrefered,
      element: item
    };
  }).sort(compare);
  const lnTemplates = lnItems.map((item) => {
    return html`<mwc-check-list-item
      ?selected=${item.selected}
      ?disabled=${item.disabled}
      value="${identity(item.element)}"
      twoline
      ><span
        >${item.element.getAttribute("prefix") ?? ""}${item.element.getAttribute("lnClass")}${item.element.getAttribute("inst") ?? ""}
        ${item.disabled ? html` <mwc-icon style="--mdc-icon-size: 1em;"
                >account_tree</mwc-icon
              >
              ${referencePath(getLNode(doc, item.element))}` : ""}</span
      ><span slot="secondary"
        >${item.element.closest("IED")?.getAttribute("name") ?? ""} |
        ${item.element.closest("LDevice") ? item.element.closest("LDevice")?.getAttribute("inst") : APldInst}</span
      ></mwc-check-list-item
    >`;
  });
  render(html`${lnTemplates}`, lnList);
}
function renderIEDPage(element) {
  const doc = element.ownerDocument;
  if (doc.querySelectorAll(":root > IED").length > 0)
    return html`<filtered-list
      disableCheckAll
      multi
      id="iedList"
      @selected=${(evt) => onIEDSelect(evt, element)}
      >${Array.from(doc.querySelectorAll(":root > IED")).map((ied) => ied.getAttribute("name")).map((iedName) => {
      return {
        selected: Array.from(element.children).filter((item) => !item.closest("Private")).filter((item) => item.tagName === "LNode" && item.getAttribute("iedName") === iedName).length > 0,
        iedName
      };
    }).sort(compare).map((item) => html`<mwc-check-list-item
              value="${item.iedName ?? ""}"
              ?selected=${item.selected}
              >${item.iedName}</mwc-check-list-item
            >`)}</filtered-list
    >`;
  else
    return html`<mwc-list-item noninteractive graphic="icon">
      <span>${get("lnode.wizard.placeholder")}</span>
      <mwc-icon slot="graphic">info</mwc-icon>
    </mwc-list-item>`;
}
function openLNodeInstanceWizard(parent) {
  return (wizard) => {
    wizard.dispatchEvent(newWizardEvent());
    wizard.dispatchEvent(newWizardEvent(lNodeInstanceWizard(parent)));
  };
}
function lNodeReferenceWizard(parent) {
  return [
    {
      title: get("lnode.wizard.title.selectIEDs"),
      menuActions: [
        {
          icon: "",
          label: get("lnode.wizard.instance"),
          action: openLNodeInstanceWizard(parent)
        }
      ],
      content: [renderIEDPage(parent)]
    },
    {
      initial: Array.from(parent.children).some((child) => child.tagName === "LNode"),
      title: get("lnode.wizard.title.selectLNs"),
      primary: {
        icon: "save",
        label: get("save"),
        action: lNodeWizardAction(parent)
      },
      content: [html`<filtered-list multi id="lnList"></filtered-list>`]
    }
  ];
}
export function lNodeWizard(parent) {
  if (parent.tagName === "Function" || parent.tagName === "SubFunction" || parent.tagName === "EqFunction" || parent.tagName === "EqSubFunction")
    return lNodeInstanceWizard(parent);
  return lNodeReferenceWizard(parent);
}
function contentLNodeWizard(options) {
  const isIedRef = options.iedName !== "None";
  return [
    html`<wizard-textfield
      label="iedName"
      .maybeValue=${options.iedName}
      helper="${get("scl.iedName")}"
      helperPersistent
      disabled
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="ldInst"
      .maybeValue=${options.ldInst}
      helper="${get("scl.ldInst")}"
      helperPersistent
      nullable
      disabled
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="prefix"
      .maybeValue=${options.prefix}
      helper="${get("scl.prefix")}"
      pattern="${patterns.asciName}"
      maxLength="11"
      helperPersistent
      nullable
      ?disabled=${isIedRef}
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="lnClass"
      .maybeValue=${options.lnClass}
      helper="${get("scl.lnClass")}"
      helperPersistent
      disabled
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="lnInst"
      .maybeValue=${options.lnInst}
      helper="${get("scl.lnInst")}"
      helperPersistent
      type="number"
      min="1"
      max="99"
      .reservedValues=${options.reservedLnInst}
      ?disabled=${isIedRef}
    ></wizard-textfield>`
  ];
}
function updateLNodeAction(element) {
  return (inputs) => {
    const attributes = {};
    const attributeKeys = ["iedName", "ldInst", "prefix", "lnClass", "lnInst"];
    attributeKeys.forEach((key) => {
      attributes[key] = getValue(inputs.find((i) => i.label === key));
    });
    let lNodeAction = null;
    if (attributeKeys.some((key) => attributes[key] !== element.getAttribute(key))) {
      const newElement = cloneElement(element, attributes);
      lNodeAction = {
        old: {element},
        new: {element: newElement}
      };
      return [lNodeAction];
    }
    return [];
  };
}
export function editLNodeWizard(element) {
  const [iedName, ldInst, prefix, lnClass, lnInst] = [
    "iedName",
    "ldInst",
    "prefix",
    "lnClass",
    "lnInst"
  ].map((attr) => element.getAttribute(attr));
  const reservedLnInst = getChildElementsByTagName(element.parentElement, "LNode").filter((sibling) => sibling !== element && sibling.getAttribute("lnClass") === element.getAttribute("lnClass")).map((sibling) => sibling.getAttribute("lnInst"));
  return [
    {
      title: get("wizard.title.edit", {tagName: "LNode"}),
      element,
      primary: {
        label: get("save"),
        icon: "save",
        action: updateLNodeAction(element)
      },
      content: [
        ...contentLNodeWizard({
          iedName,
          ldInst,
          prefix,
          lnClass,
          lnInst,
          reservedLnInst
        })
      ]
    }
  ];
}
