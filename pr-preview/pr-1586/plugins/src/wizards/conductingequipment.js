import {html} from "../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import "../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../../../_snowpack/pkg/@material/mwc-select.js";
import "../../../openscd/src/wizard-textfield.js";
import {
  crossProduct,
  getValue,
  isPublic
} from "../../../openscd/src/foundation.js";
import {
  createElement
} from "../../../_snowpack/link/packages/xml/dist/index.js";
import {replaceNamingAction} from "./foundation/actions.js";
const types = {
  CBR: "Circuit Breaker",
  DIS: "Disconnector",
  ERS: "Earth Switch",
  CTR: "Current Transformer",
  VTR: "Voltage Transformer",
  AXN: "Auxiliary Network",
  BAT: "Battery",
  BSH: "Bushing",
  CAP: "Capacitor Bank",
  CON: "Converter",
  EFN: "Earth Fault Neutralizer",
  FAN: "Fan",
  GIL: "Gas Insulated Line",
  GEN: "Generator",
  IFL: "Infeeding Line",
  MOT: "Motor",
  RES: "Neutral Resistor",
  REA: "Reactor",
  PSH: "Power Shunt",
  CAB: "Power Cable",
  PMP: "Pump",
  LIN: "Power Overhead Line",
  RRC: "Rotating Reactive Component",
  SCR: "Semiconductor Controlled Rectifier",
  SAR: "Surge Arrester",
  SMC: "Synchronous Machine",
  TCF: "Thyristor Controlled Frequency Converter",
  TCR: "Thyristor Controlled Reactive Component"
};
function getLogicalNodeInstance(lNode) {
  if (!lNode)
    return null;
  const [lnInst, lnClass, iedName, ldInst, prefix] = [
    "lnInst",
    "lnClass",
    "iedName",
    "ldInst",
    "prefix"
  ].map((attribute) => lNode?.getAttribute(attribute));
  const iedSelector = [`IED[name="${iedName}"]`, "IED"];
  const lDevicePath = ["AccessPoint > Server"];
  const lNSelector = [
    `LDevice[inst="${ldInst}"] > LN[inst="${lnInst}"][lnClass="${lnClass}"]`
  ];
  const lNPrefixSelector = prefix && prefix !== "" ? [`[prefix="${prefix}"]`] : ['[prefix=""]', ":not(prefix)"];
  return lNode.ownerDocument.querySelector(crossProduct(iedSelector, [" > "], lDevicePath, [" > "], lNSelector, lNPrefixSelector).map((strings) => strings.join("")).join(","));
}
function getSwitchTypeValueFromDTT(lNorlNode) {
  const rootNode = lNorlNode?.ownerDocument;
  const lNodeType = lNorlNode.getAttribute("lnType");
  const lnClass = lNorlNode.getAttribute("lnClass");
  const dObj = rootNode.querySelector(`DataTypeTemplates > LNodeType[id="${lNodeType}"][lnClass="${lnClass}"] > DO[name="SwTyp"]`);
  if (dObj) {
    const dORef = dObj.getAttribute("type");
    return rootNode.querySelector(`DataTypeTemplates > DOType[id="${dORef}"] > DA[name="stVal"] > Val`)?.innerHTML.trim();
  }
  return void 0;
}
function getSwitchTypeValue(lN) {
  const daInstantiated = lN.querySelector('DOI[name="SwTyp"] > DAI[name="stVal"]');
  if (daInstantiated) {
    return daInstantiated.querySelector("Val")?.innerHTML.trim();
  } else {
    return getSwitchTypeValueFromDTT(lN);
  }
}
function containsGroundedTerminal(condEq) {
  return Array.from(condEq.querySelectorAll("Terminal")).some((t) => t.getAttribute("cNodeName") === "grounded");
}
function containsEarthSwitchDefinition(condEq) {
  const lNodeXSWI = condEq.querySelector('LNode[lnClass="XSWI"]');
  const lN = getLogicalNodeInstance(lNodeXSWI);
  let swTypVal;
  if (lN) {
    swTypVal = getSwitchTypeValue(lN);
  } else if (lNodeXSWI) {
    swTypVal = getSwitchTypeValueFromDTT(lNodeXSWI);
  }
  return swTypVal ? ["Earthing Switch", "High Speed Earthing Switch"].includes(swTypVal) : false;
}
export function typeStr(condEq) {
  if (condEq.getAttribute("type") === "DIS" && (containsGroundedTerminal(condEq) || containsEarthSwitchDefinition(condEq))) {
    return "ERS";
  } else {
    return condEq.getAttribute("type") ?? "";
  }
}
export function typeName(condEq) {
  return types[typeStr(condEq)] ?? get("conductingequipment.unknownType");
}
function renderTypeSelector(option, type) {
  return option === "create" ? html`<mwc-select
        style="--mdc-menu-max-height: 196px;"
        required
        label="type"
        helper="${get("conductingequipment.wizard.typeHelper")}"
        validationMessage="${get("textfield.required")}"
      >
        ${Object.keys(types).map((v) => html`<mwc-list-item value="${v}">${types[v]}</mwc-list-item>`)}
      </mwc-select>` : html`<mwc-select
        label="type"
        helper="${get("conductingequipment.wizard.typeHelper")}"
        validationMessage="${get("textfield.required")}"
        disabled
      >
        <mwc-list-item selected value="0">${type}</mwc-list-item>
      </mwc-select>`;
}
export function renderConductingEquipmentWizard(name, desc, option, type, reservedNames) {
  return [
    renderTypeSelector(option, type),
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${get("conductingequipment.wizard.nameHelper")}"
      required
      validationMessage="${get("textfield.required")}"
      dialogInitialFocus
      .reservedValues=${reservedNames}
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${get("conductingequipment.wizard.descHelper")}"
    ></wizard-textfield>`
  ];
}
export function createAction(parent) {
  return (inputs) => {
    const name = getValue(inputs.find((i) => i.label === "name"));
    const desc = getValue(inputs.find((i) => i.label === "desc"));
    const proxyType = getValue(inputs.find((i) => i.label === "type"));
    const type = proxyType === "ERS" ? "DIS" : proxyType;
    const element = createElement(parent.ownerDocument, "ConductingEquipment", {
      name,
      type,
      desc
    });
    if (proxyType !== "ERS")
      return [{new: {parent, element}}];
    const groundNode = parent.closest("VoltageLevel")?.querySelector('ConnectivityNode[name="grounded"]');
    const substationName = groundNode ? groundNode.closest("Substation")?.getAttribute("name") ?? null : parent.closest("Substation")?.getAttribute("name") ?? null;
    const voltageLevelName = groundNode ? groundNode.closest("VoltageLevel")?.getAttribute("name") ?? null : parent.closest("VoltageLevel")?.getAttribute("name") ?? null;
    const bayName = groundNode ? groundNode.closest("Bay")?.getAttribute("name") ?? null : parent.closest("Bay")?.getAttribute("name") ?? null;
    const connectivityNode = bayName && voltageLevelName && substationName ? substationName + "/" + voltageLevelName + "/" + bayName + "/grounded" : null;
    element.appendChild(createElement(parent.ownerDocument, "Terminal", {
      name: "T1",
      cNodeName: "grounded",
      substationName,
      voltageLevelName,
      bayName,
      connectivityNode
    }));
    const action = {
      new: {
        parent,
        element
      }
    };
    if (groundNode)
      return [action];
    const cNodeElement = createElement(parent.ownerDocument, "ConnectivityNode", {
      name: "grounded",
      pathName: connectivityNode
    });
    const cNodeAction = {
      new: {
        parent,
        element: cNodeElement
      }
    };
    return [action, cNodeAction];
  };
}
export function reservedNamesConductingEquipment(parent, currentName) {
  return Array.from(parent.querySelectorAll("ConductingEquipment")).filter(isPublic).map((condEq) => condEq.getAttribute("name") ?? "").filter((name) => currentName && name !== currentName);
}
export function createConductingEquipmentWizard(parent) {
  const reservedNames = reservedNamesConductingEquipment(parent);
  return [
    {
      title: get("conductingequipment.wizard.title.add"),
      element: void 0,
      primary: {
        icon: "add",
        label: get("add"),
        action: createAction(parent)
      },
      content: renderConductingEquipmentWizard("", "", "create", "", reservedNames)
    }
  ];
}
export function editConductingEquipmentWizard(element) {
  const reservedNames = reservedNamesConductingEquipment(element.parentNode, element.getAttribute("name"));
  return [
    {
      title: get("conductingequipment.wizard.title.edit"),
      element,
      primary: {
        icon: "edit",
        label: get("save"),
        action: replaceNamingAction(element)
      },
      content: renderConductingEquipmentWizard(element.getAttribute("name"), element.getAttribute("desc"), "edit", typeName(element), reservedNames)
    }
  ];
}
