import {html} from "../../_snowpack/pkg/lit-html.js";
import {get, translate} from "../../_snowpack/pkg/lit-translate.js";
import "../wizard-textfield.js";
import {
  cloneElement,
  getValue,
  patterns
} from "../foundation.js";
const initial = {
  nomFreq: "50",
  numPhases: "3"
};
function render(name, desc, type, nomFreq, numPhases) {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${translate("line.wizard.nameHelper")}"
      required
      validationMessage="${translate("textfield.required")}"
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${translate("line.wizard.descHelper")}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="type"
      .maybeValue=${type}
      nullable
      helper="${translate("line.wizard.typeHelper")}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="nomFreq"
      .maybeValue=${nomFreq}
      nullable
      helper="${translate("voltagelevel.wizard.nomFreqHelper")}"
      suffix="Hz"
      validationMessage="${translate("textfield.nonempty")}"
      pattern="${patterns.unsigned}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="numPhases"
      .maybeValue=${numPhases}
      nullable
      helper="${translate("voltagelevel.wizard.numPhaseHelper")}"
      suffix="#"
      validationMessage="${translate("textfield.nonempty")}"
      type="number"
      min="1"
      max="255"
    ></wizard-textfield>`
  ];
}
function updateAction(element) {
  return (inputs) => {
    const lineAttrs = {};
    const lineKeys = ["name", "desc", "type", "nomFreq", "numPhases"];
    lineKeys.forEach((key) => {
      lineAttrs[key] = getValue(inputs.find((i) => i.label === key));
    });
    if (lineKeys.some((key) => lineAttrs[key] !== element.getAttribute(key))) {
      const newElement = cloneElement(element, lineAttrs);
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
export function editLineWizard(element) {
  return [
    {
      title: get("line.wizard.title.edit"),
      element,
      primary: {
        icon: "edit",
        label: get("save"),
        action: updateAction(element)
      },
      content: render(element.getAttribute("name") ?? "", element.getAttribute("desc"), element.getAttribute("type"), element.getAttribute("nomFreq"), element.getAttribute("numPhases"))
    }
  ];
}
