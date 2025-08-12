import {html} from "../../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../../_snowpack/pkg/lit-translate.js";
import "../../../../_snowpack/pkg/@material/mwc-list.js";
import "../../../../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js";
import {
  compareNames
} from "../../../../openscd/src/foundation.js";
import {
  createElement
} from "../../../../_snowpack/link/packages/xml/dist/index.js";
let bayNum = 1;
let cbNum = 1;
let dsNum = 1;
function addLNodes(condEq, cswi) {
  cswi.parentElement?.querySelectorAll(`LN[lnClass="CSWI"]${cswi.getAttribute("prefix") ? `[prefix="${cswi.getAttribute("prefix")}"]` : ``}${cswi.getAttribute("inst") ? `[inst="${cswi.getAttribute("inst")}"]` : ``},LN[lnClass="CILO"]${cswi.getAttribute("prefix") ? `[prefix="${cswi.getAttribute("prefix")}"]` : ``}${cswi.getAttribute("inst") ? `[inst="${cswi.getAttribute("inst")}"]` : ``},LN[lnClass="XCBR"]${cswi.getAttribute("prefix") ? `[prefix="${cswi.getAttribute("prefix")}"]` : ``}${cswi.getAttribute("inst") ? `[inst="${cswi.getAttribute("inst")}"]` : ``},LN[lnClass="XSWI"]${cswi.getAttribute("prefix") ? `[prefix="${cswi.getAttribute("prefix")}"]` : ``}${cswi.getAttribute("inst") ? `[inst="${cswi.getAttribute("inst")}"]` : ``}`).forEach((ln) => {
    condEq.appendChild(createElement(cswi.ownerDocument, "LNode", {
      iedName: ln.parentElement?.parentElement?.parentElement?.parentElement?.getAttribute("name") ?? null,
      ldInst: cswi.parentElement?.getAttribute("inst") ?? null,
      prefix: ln.getAttribute("prefix"),
      lnClass: ln.getAttribute("lnClass"),
      lnInst: ln.getAttribute("inst")
    }));
  });
  return condEq;
}
function getSwitchGearType(cswi) {
  return cswi.parentElement?.querySelector(`LN[lnClass="XCBR"]${cswi.getAttribute("prefix") ? `[prefix="${cswi.getAttribute("prefix")}"]` : ``}${cswi.getAttribute("inst") ? `[inst="${cswi.getAttribute("inst")}"]` : ``}`) ? "CBR" : "DIS";
}
function getSwitchGearName(ln) {
  if (ln.getAttribute("prefix") && ln.getAttribute("inst"))
    return ln.getAttribute("prefix") + ln.getAttribute("inst");
  if (ln.getAttribute("inst") && getSwitchGearType(ln) === "CBR")
    return "QA" + cbNum++;
  return "QB" + dsNum++;
}
function isSwitchGear(ln, selectedCtlModel) {
  if (Array.from(ln.querySelectorAll('DOI[name="Pos"] > DAI[name="ctlModel"] > Val')).filter((val) => selectedCtlModel.includes(val.innerHTML.trim())).length)
    return true;
  const doc = ln.ownerDocument;
  return Array.from(doc.querySelectorAll(`DataTypeTemplates > LNodeType[id="${ln.getAttribute("lnType")}"] > DO[name="Pos"]`)).map((DO) => DO.getAttribute("type")).flatMap((doType) => Array.from(doc.querySelectorAll(`DOType[id="${doType}"] > DA[name="ctlModel"] > Val`))).filter((val) => selectedCtlModel.includes(val.innerHTML.trim())).length > 0;
}
function getCSWI(ied) {
  return Array.from(ied.querySelectorAll('AccessPoint > Server > LDevice > LN[lnClass="CSWI"]'));
}
function getValidCSWI(ied, selectedCtlModel) {
  if (!ied.parentElement)
    return [];
  return getCSWI(ied).filter((cswi) => isSwitchGear(cswi, selectedCtlModel));
}
function createBayElement(ied, ctlModelList) {
  const switchGear = getValidCSWI(ied, ctlModelList);
  cbNum = 1;
  dsNum = 1;
  if (switchGear.length) {
    const bay = createElement(ied.ownerDocument, "Bay", {
      name: "Q" + bayNum++,
      desc: "Bay for controller " + ied.getAttribute("name")
    });
    const condEq = switchGear.map((cswi) => {
      return addLNodes(createElement(ied.ownerDocument, "ConductingEquipment", {
        name: getSwitchGearName(cswi),
        type: getSwitchGearType(cswi)
      }), cswi);
    });
    condEq.forEach((condEq2) => bay.appendChild(condEq2));
    return bay;
  }
  return null;
}
function guessBasedOnCSWI(doc, substation) {
  return (inputs, wizard, list) => {
    const actions = [];
    const ctlModelList = list.selected.map((item) => item.value);
    const voltageLevel = createElement(doc, "VoltageLevel", {
      name: "E1",
      desc: "guessed by OpenSCD",
      nomFreq: "50.0",
      numPhases: "3"
    });
    const voltage = createElement(doc, "Voltage", {
      unit: "V",
      multiplier: "k"
    });
    voltage.textContent = "110.00";
    voltageLevel.appendChild(voltage);
    actions.push({
      new: {parent: doc.querySelector("SCL"), element: substation}
    });
    actions.push({
      new: {
        parent: substation,
        element: voltageLevel
      }
    });
    Array.from(doc.querySelectorAll(":root > IED")).sort(compareNames).map((ied) => createBayElement(ied, ctlModelList)).forEach((bay) => {
      if (bay)
        actions.push({new: {parent: voltageLevel, element: bay}});
    });
    return actions;
  };
}
export function guessVoltageLevel(doc, substation) {
  return [
    {
      title: get("guess.wizard.title"),
      primary: {
        icon: "play_arrow",
        label: get("guess.wizard.primary"),
        action: guessBasedOnCSWI(doc, substation)
      },
      content: [
        html`<p>${get("guess.wizard.description")}</p>`,
        html`<mwc-list multi id="ctlModelList"
          ><mwc-check-list-item value="status-only"
            >status-only</mwc-check-list-item
          ><mwc-check-list-item value="direct-with-normal-security"
            >direct-with-normal-security</mwc-check-list-item
          ><mwc-check-list-item value="direct-with-enhanced-security"
            >direct-with-enhanced-security</mwc-check-list-item
          ><mwc-check-list-item value="sbo-with-normal-security"
            >sbo-with-normal-security</mwc-check-list-item
          ><mwc-check-list-item selected value="sbo-with-enhanced-security"
            >sbo-with-enhanced-security</mwc-check-list-item
          ></mwc-list
        >`
      ]
    }
  ];
}
