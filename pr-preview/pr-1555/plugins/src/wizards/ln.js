import {html} from "../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import "../../../openscd/src/wizard-textfield.js";
import {
  getValue
} from "../../../openscd/src/foundation.js";
import {cloneElement} from "../../../_snowpack/link/packages/xml/dist/index.js";
export function renderLNWizard(lnType, desc, prefix, lnClass, inst) {
  return [
    html`<wizard-textfield
      label="lnType"
      .maybeValue=${lnType}
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
      required
      .maybeValue=${lnClass}
      helper="${get("ln.wizard.lnClassHelper")}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="inst"
      .maybeValue=${inst}
      helper="${get("ln.wizard.instHelper")}"
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
    if (ldKeys.some((key) => ldAttrs[key] !== element.getAttribute(key))) {
      const newElement = cloneElement(element, ldAttrs);
      return [
        {
          old: {element},
          new: {element: newElement}
        }
      ];
    }
    return [];
  };
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
      content: renderLNWizard(element.getAttribute("lnType"), element.getAttribute("desc"), element.getAttribute("prefix"), element.getAttribute("lnClass"), element.getAttribute("inst"))
    }
  ];
}
