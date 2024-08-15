import {html} from "../../../_snowpack/pkg/lit-html.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import "../../../openscd/src/wizard-textfield.js";
import {
  getValue,
  patterns
} from "../../../openscd/src/foundation.js";
import {cloneElement, createElement} from "../../../_snowpack/link/packages/xml/dist/index.js";
const initial = {
  nomFreq: "50",
  numPhases: "3",
  Voltage: "110",
  multiplier: "k"
};
function render(name, desc, type, nomFreq, numPhases) {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${get("line.wizard.nameHelper")}"
      required
      validationMessage="${get("textfield.required")}"
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${get("line.wizard.descHelper")}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="type"
      .maybeValue=${type}
      nullable
      helper="${get("line.wizard.typeHelper")}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="nomFreq"
      .maybeValue=${nomFreq}
      nullable
      helper="${get("voltagelevel.wizard.nomFreqHelper")}"
      suffix="Hz"
      validationMessage="${get("textfield.nonempty")}"
      pattern="${patterns.unsigned}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="numPhases"
      .maybeValue=${numPhases}
      nullable
      helper="${get("voltagelevel.wizard.numPhaseHelper")}"
      suffix="#"
      validationMessage="${get("textfield.nonempty")}"
      type="number"
      min="1"
      max="255"
    ></wizard-textfield>`
  ];
}
function createLineAction(parent) {
  return (inputs) => {
    const lineAttrs = {};
    const lineKeys = ["name", "desc", "type", "nomFreq", "numPhases"];
    lineKeys.forEach((key) => {
      lineAttrs[key] = getValue(inputs.find((i) => i.label === key));
    });
    const line = createElement(parent.ownerDocument, "Line", lineAttrs);
    return [{new: {parent, element: line}}];
  };
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
export function createLineWizard(parent) {
  const name = "";
  const desc = "";
  const type = "";
  const nomFreq = "";
  const numPhases = "";
  return [
    {
      title: get("wizard.title.add", {tagName: "Line"}),
      primary: {
        icon: "save",
        label: get("save"),
        action: createLineAction(parent)
      },
      content: [...render(name, desc, type, nomFreq, numPhases)]
    }
  ];
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
