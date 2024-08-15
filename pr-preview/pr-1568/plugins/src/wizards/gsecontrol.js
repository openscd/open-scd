import {html} from "../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import "../../../_snowpack/pkg/@material/mwc-button.js";
import "../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../../../openscd/src/filtered-list.js";
import "../../../openscd/src/wizard-checkbox.js";
import "../../../openscd/src/wizard-select.js";
import "../../../openscd/src/wizard-textfield.js";
import {
  find,
  getValue,
  identity,
  isPublic,
  newSubWizardEvent,
  newWizardEvent
} from "../../../openscd/src/foundation.js";
import {
  cloneElement,
  createElement,
  getUniqueElementName
} from "../../../_snowpack/link/packages/xml/dist/index.js";
import {
  newActionEvent
} from "../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js";
import {maxLength, patterns} from "./foundation/limits.js";
import {editDataSetWizard} from "./dataset.js";
import {editGseWizard} from "./gse.js";
import {securityEnabledEnum} from "./foundation/enums.js";
import {dataAttributePicker, iEDPicker} from "./foundation/finder.js";
import {newFCDA} from "./fcda.js";
import {
  getConnectedAP,
  isAccessPointConnected,
  uniqueAppId,
  uniqueMacAddress
} from "./foundation/scl.js";
import {contentGseOrSmvWizard, createAddressElement} from "./address.js";
export function getGSE(element) {
  const cbName = element.getAttribute("name");
  const iedName = element.closest("IED")?.getAttribute("name");
  const apName = element.closest("AccessPoint")?.getAttribute("name");
  const ldInst = element.closest("LDevice")?.getAttribute("inst");
  return element.closest("SCL")?.querySelector(`:root > Communication > SubNetwork > ConnectedAP[iedName="${iedName}"][apName="${apName}"] > GSE[ldInst="${ldInst}"][cbName="${cbName}"]`);
}
export function contentGseControlWizard(content) {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${content.name}
      helper="${get("scl.name")}"
      required
      validationMessage="${get("textfield.required")}"
      pattern="${patterns.asciName}"
      maxLength="${maxLength.cbName}"
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${content.desc}
      nullable
      helper="${get("scl.desc")}"
    ></wizard-textfield>`,
    html`<wizard-select
      label="type"
      .maybeValue=${content.type}
      helper="${get("scl.type")}"
      nullable
      required
      >${["GOOSE", "GSSE"].map((type) => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`)}</wizard-select
    >`,
    html`<wizard-textfield
      label="appID"
      .maybeValue=${content.appID}
      helper="${get("scl.id")}"
      required
      validationMessage="${get("textfield.nonempty")}"
    ></wizard-textfield>`,
    html`<wizard-checkbox
      label="fixedOffs"
      .maybeValue=${content.fixedOffs}
      nullable
      helper="${get("scl.fixedOffs")}"
    ></wizard-checkbox>`,
    html`<wizard-select
      label="securityEnabled"
      .maybeValue=${content.securityEnabled}
      nullable
      required
      helper="${get("scl.securityEnable")}"
      >${securityEnabledEnum.map((type) => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`)}</wizard-select
    >`
  ];
}
function createGseControlAction(parent) {
  return (inputs, wizard) => {
    const actions = [];
    const gseControlAttrs = {};
    const gseControlKeys = [
      "name",
      "desc",
      "type",
      "appID",
      "fixedOffs",
      "securityEnabled"
    ];
    gseControlKeys.forEach((key) => {
      gseControlAttrs[key] = getValue(inputs.find((i) => i.label === key));
    });
    gseControlAttrs["confRev"] = "1";
    const dataSetName = gseControlAttrs.name + "sDataSet";
    gseControlAttrs["datSet"] = dataSetName;
    const gseControl = createElement(parent.ownerDocument, "GSEControl", gseControlAttrs);
    actions.push({new: {parent, element: gseControl}});
    if (isAccessPointConnected(parent)) {
      const gseParent = getConnectedAP(parent);
      const gse = createElement(parent.ownerDocument, "GSE", {
        ldInst: parent.closest("LDevice")?.getAttribute("inst") ?? "",
        cbName: gseControlAttrs["name"]
      });
      actions.push({new: {parent: gseParent, element: gse}});
      const instType = wizard.shadowRoot?.querySelector("#instType")?.checked ?? false;
      const gseAttrs = {};
      const gseKeys = ["MAC-Address", "APPID", "VLAN-ID", "VLAN-PRIORITY"];
      gseKeys.forEach((key) => {
        gseAttrs[key] = getValue(inputs.find((i) => i.label === key));
      });
      const address = createAddressElement(gseAttrs, gse, instType);
      actions.push({new: {parent: gse, element: address}});
      const minTime = getValue(inputs.find((i) => i.label === "MinTime"));
      const minTimeElement = createElement(parent.ownerDocument, "MinTime", {
        unit: "s",
        multiplier: "m"
      });
      minTimeElement.textContent = minTime;
      actions.push({new: {parent: gse, element: minTimeElement}});
      const maxTime = getValue(inputs.find((i) => i.label === "MaxTime"));
      const maxTimeElement = createElement(parent.ownerDocument, "MaxTime", {
        unit: "s",
        multiplier: "m"
      });
      maxTimeElement.textContent = maxTime;
      actions.push({new: {parent: gse, element: maxTimeElement}});
    }
    const dataSet = createElement(parent.ownerDocument, "DataSet", {
      name: dataSetName
    });
    actions.push({new: {parent, element: dataSet}});
    const finder = wizard.shadowRoot.querySelector("finder-list");
    const paths = finder?.paths ?? [];
    for (const path of paths) {
      const element = newFCDA(parent, path);
      if (!element)
        continue;
      actions.push({new: {parent: dataSet, element}});
    }
    return [
      {
        title: get("editing.created", {name: "GSEControl"}),
        actions
      }
    ];
  };
}
export function createGseControlWizard(ln0OrLn) {
  const server = ln0OrLn.closest("Server");
  const name = getUniqueElementName(ln0OrLn, "GSEControl");
  const desc = null;
  const type = "GOOSE";
  const appID = "";
  const fixedOffs = null;
  const securityEnabled = null;
  const hasInstType = true;
  const attributes = {
    "MAC-Address": uniqueMacAddress(ln0OrLn.ownerDocument, "GOOSE"),
    APPID: uniqueAppId(ln0OrLn.ownerDocument),
    "VLAN-ID": null,
    "VLAN-PRIORITY": null
  };
  const minTime = "10";
  const maxTime = "1000";
  return isAccessPointConnected(ln0OrLn) ? [
    {
      title: get("wizard.title.add", {tagName: "GSEControl"}),
      content: contentGseControlWizard({
        name,
        desc,
        type,
        appID,
        fixedOffs,
        securityEnabled
      })
    },
    {
      title: get("wizard.title.add", {tagName: "GSE"}),
      content: [
        ...contentGseOrSmvWizard({hasInstType, attributes}),
        html`<wizard-textfield
              label="MinTime"
              .maybeValue=${minTime}
              nullable
              suffix="ms"
              type="number"
            ></wizard-textfield>`,
        html`<wizard-textfield
              label="MaxTime"
              .maybeValue=${maxTime}
              nullable
              suffix="ms"
              type="number"
            ></wizard-textfield>`
      ]
    },
    {
      title: get("dataset.fcda.add"),
      primary: {
        icon: "save",
        label: get("save"),
        action: createGseControlAction(ln0OrLn)
      },
      content: [server ? dataAttributePicker(server) : html``]
    }
  ] : [
    {
      title: get("wizard.title.add", {tagName: "GSEControl"}),
      content: contentGseControlWizard({
        name,
        desc,
        type,
        appID,
        fixedOffs,
        securityEnabled
      })
    },
    {
      title: get("wizard.title.add", {tagName: "GSE"}),
      content: [
        html`<h3
              style="color: var(--mdc-theme-on-surface);
                      font-family: 'Roboto', sans-serif;
                      font-weight: 300;"
            >
              ${get("gse.missingaccp")}
            </h3>`
      ]
    },
    {
      title: get("dataset.fcda.add"),
      primary: {
        icon: "save",
        label: get("save"),
        action: createGseControlAction(ln0OrLn)
      },
      content: [server ? dataAttributePicker(server) : html``]
    }
  ];
}
function openGseControlCreateWizard(doc) {
  return (_, wizard) => {
    const finder = wizard.shadowRoot?.querySelector("finder-list");
    const path = finder?.path ?? [];
    if (path.length === 0)
      return [];
    const [tagName, id] = path.pop().split(": ");
    if (tagName !== "IED")
      return [];
    const ied = find(doc, tagName, id);
    if (!ied)
      return [];
    const ln0 = ied.querySelector("LN0");
    if (!ln0)
      return [];
    return [() => createGseControlWizard(ln0)];
  };
}
export function gseControlParentSelector(doc) {
  return [
    {
      title: get("gsecontrol.wizard.location"),
      primary: {
        icon: "",
        label: get("next"),
        action: openGseControlCreateWizard(doc)
      },
      content: [iEDPicker(doc)]
    }
  ];
}
function prepareGseControlCreateWizard(anyParent) {
  return () => {
    if (anyParent.tagName === "IED" && anyParent.querySelector("LN0"))
      return [() => createGseControlWizard(anyParent.querySelector("LN0"))];
    return [() => gseControlParentSelector(anyParent.ownerDocument)];
  };
}
export function removeGseControlAction(element) {
  if (!element.parentElement)
    return null;
  const dataSet = element.parentElement.querySelector(`DataSet[name="${element.getAttribute("datSet")}"]`);
  const gSE = getGSE(element);
  const singleUse = Array.from(element.parentElement?.querySelectorAll("ReportControl, GSEControl, SampledValueControl") ?? []).filter((controlblock) => controlblock.getAttribute("datSet") === dataSet?.getAttribute("name")).length <= 1;
  const actions = [];
  actions.push({
    old: {
      parent: element.parentElement,
      element,
      reference: element.nextSibling
    }
  });
  if (dataSet && singleUse)
    actions.push({
      old: {
        parent: element.parentElement,
        element: dataSet,
        reference: dataSet.nextSibling
      }
    });
  if (gSE)
    actions.push({
      old: {
        parent: gSE.parentElement,
        element: gSE,
        reference: gSE.nextSibling
      }
    });
  const name = element.getAttribute("name");
  const iedName = element.closest("IED")?.getAttribute("name") ?? "";
  return {
    title: get("controlblock.action.remove", {
      type: element.tagName,
      name,
      iedName
    }),
    actions
  };
}
export function removeGseControl(element) {
  return (wizard) => {
    const complexAction = removeGseControlAction(element);
    if (complexAction)
      wizard.dispatchEvent(newActionEvent(complexAction));
    wizard.dispatchEvent(newWizardEvent());
  };
}
function openDataSetWizard(element) {
  return (wizard) => {
    wizard.dispatchEvent(newSubWizardEvent(() => editDataSetWizard(element)));
  };
}
function openGseWizard(element) {
  return (wizard) => {
    wizard.dispatchEvent(newSubWizardEvent(() => editGseWizard(element)));
  };
}
export function updateGseControlAction(element) {
  return (inputs) => {
    const name = inputs.find((i) => i.label === "name").value;
    const desc = getValue(inputs.find((i) => i.label === "desc"));
    const type = getValue(inputs.find((i) => i.label === "type"));
    const appID = getValue(inputs.find((i) => i.label === "appID"));
    const fixedOffs = getValue(inputs.find((i) => i.label === "fixedOffs"));
    const securityEnabled = getValue(inputs.find((i) => i.label === "securityEnabled"));
    if (name === element.getAttribute("name") && desc === element.getAttribute("desc") && type === element.getAttribute("type") && appID === element.getAttribute("appID") && fixedOffs === element.getAttribute("fixedOffs") && securityEnabled === element.getAttribute("securityEnabled"))
      return [];
    const newElement = cloneElement(element, {
      name,
      desc,
      type,
      appID,
      fixedOffs,
      securityEnabled
    });
    return [{old: {element}, new: {element: newElement}}];
  };
}
export function editGseControlWizard(element) {
  const name = element.getAttribute("name");
  const desc = element.getAttribute("desc");
  const type = element.getAttribute("type");
  const appID = element.getAttribute("appID");
  const fixedOffs = element.getAttribute("fixedOffs");
  const securityEnabled = element.getAttribute("securityEnabled");
  const gSE = getGSE(element);
  const dataSet = element.parentElement?.querySelector(`DataSet[name="${element.getAttribute("datSet")}"]`);
  const menuActions = [];
  menuActions.push({
    icon: "delete",
    label: get("remove"),
    action: removeGseControl(element)
  });
  if (dataSet)
    menuActions.push({
      icon: "edit",
      label: get("scl.DataSet"),
      action: openDataSetWizard(dataSet)
    });
  if (gSE)
    menuActions.push({
      icon: "edit",
      label: get("scl.Communication"),
      action: openGseWizard(gSE)
    });
  return [
    {
      title: get("wizard.title.edit", {tagName: element.tagName}),
      element,
      primary: {
        icon: "save",
        label: get("save"),
        action: updateGseControlAction(element)
      },
      menuActions,
      content: [
        ...contentGseControlWizard({
          name,
          desc,
          type,
          appID,
          fixedOffs,
          securityEnabled
        })
      ]
    }
  ];
}
export function selectGseControlWizard(element) {
  const gseControls = Array.from(element.querySelectorAll("GSEControl")).filter(isPublic);
  const primary = element.querySelector("LN0") ? {
    icon: "add",
    label: get("GOOSE"),
    action: prepareGseControlCreateWizard(element)
  } : void 0;
  return [
    {
      title: get("wizard.title.select", {tagName: "GSEcontrol"}),
      primary,
      content: [
        html`<filtered-list
          @selected=${(e) => {
          const gseControlIndentity = e.target.selected.value;
          const gseControl = find(element, "GSEControl", gseControlIndentity);
          if (gseControl) {
            e.target.dispatchEvent(newSubWizardEvent(() => editGseControlWizard(gseControl)));
          }
        }}
          >${gseControls.map((gseControl) => html`<mwc-list-item twoline value="${identity(gseControl)}"
                ><span>${gseControl.getAttribute("name")}</span
                ><span slot="secondary"
                  >${identity(gseControl)}</span
                ></mwc-list-item
              >`)}</filtered-list
        >`
      ]
    }
  ];
}
