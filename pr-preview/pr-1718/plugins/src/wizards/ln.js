import {html} from "../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import "../../../openscd/src/wizard-textfield.js";
import {
  getValue
} from "../../../openscd/src/foundation.js";
import {cloneElement} from "../../../_snowpack/link/packages/xml/dist/index.js";
export function renderLNWizard(lnType, desc, prefix, lnClass, inst, reservedInst) {
  return [
    html`<wizard-textfield
      label="lnType"
      .maybeValue=${lnType}
      readonly
      required
      helper="${get("ln.wizard.lnTypeHelper")}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${get("ln.wizard.descHelper")}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="prefix"
      nullable
      .maybeValue=${prefix}
      helper="${get("ln.wizard.prefixHelper")}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="lnClass"
      readonly
      required
      .maybeValue=${lnClass}
      helper="${get("ln.wizard.lnClassHelper")}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="inst"
      .maybeValue=${inst}
      helper="${get("ln.wizard.instHelper")}"
      pattern="[0-9]{1,12}"
      required
      .reservedValues=${reservedInst}
    ></wizard-textfield>`
  ];
}
function updateAction(element) {
  return (inputs) => {
    const ldAttrs = {};
    const ldKeys = ["lnType", "desc", "prefix", "lnClass", "inst"];
    ldKeys.forEach((key) => {
      ldAttrs[key] = getValue(inputs.find((i) => i.label === key));
    });
    if (!ldKeys.some((key) => ldAttrs[key] !== element.getAttribute(key))) {
      return [];
    }
    const ldevice = element.closest("LDevice");
    if (ldevice) {
      const newPrefix = ldAttrs["prefix"] || "";
      const newLnClass = ldAttrs["lnClass"];
      const newInst = ldAttrs["inst"];
      const isDuplicate = Array.from(ldevice.querySelectorAll(":scope > LN")).some((ln) => ln !== element && (ln.getAttribute("prefix") || "") === newPrefix && ln.getAttribute("lnClass") === newLnClass && ln.getAttribute("inst") === newInst);
      if (isDuplicate) {
        return [];
      }
    }
    const newElement = cloneElement(element, ldAttrs);
    return [
      {
        old: {element},
        new: {element: newElement}
      }
    ];
  };
}
function reservedInstLN(currentElement, prefixInput) {
  const ldevice = currentElement.closest("LDevice");
  if (!ldevice)
    return [];
  const currentLnClass = currentElement.getAttribute("lnClass");
  const targetPrefix = prefixInput !== void 0 ? prefixInput : currentElement.getAttribute("prefix") || "";
  const lnElements = Array.from(ldevice.querySelectorAll(":scope > LN")).filter((ln) => ln !== currentElement && (ln.getAttribute("prefix") || "") === targetPrefix && ln.getAttribute("lnClass") === currentLnClass);
  return lnElements.map((ln) => ln.getAttribute("inst")).filter((inst) => inst !== null);
}
export function editLNWizard(element) {
  return [
    {
      title: get("ln.wizard.title.edit"),
      element,
      primary: {
        icon: "edit",
        label: get("save"),
        action: updateAction(element)
      },
      content: renderLNWizard(element.getAttribute("lnType"), element.getAttribute("desc"), element.getAttribute("prefix"), element.getAttribute("lnClass"), element.getAttribute("inst"), reservedInstLN(element))
    }
  ];
}
