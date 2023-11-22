import {html} from "../../_snowpack/pkg/lit-element.js";
import {get, translate} from "../../_snowpack/pkg/lit-translate.js";
import {
  isPublic
} from "../foundation.js";
function render(name, connectivityNode, cNodeName, reservedNames) {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${translate("terminal.wizard.nameHelper")}"
      required
      validationMessage="${translate("textfield.required")}"
      dialogInitialFocus
      .reservedValues=${reservedNames}
      readonly
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="connectivityNode"
      .maybeValue=${connectivityNode}
      helper="${translate("terminal.wizard.connectivityNodeHelper")}"
      required
      validationMessage="${translate("textfield.required")}"
      readonly
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="cNodeName"
      .maybeValue=${cNodeName}
      helper="${translate("terminal.wizard.cNodeNameHelper")}"
      required
      validationMessage="${translate("textfield.required")}"
      readonly
    ></wizard-textfield>`
  ];
}
export function editTerminalWizard(element) {
  const reservedNames = Array.from(element.parentNode.querySelectorAll("ConnectivityNode")).filter(isPublic).map((cNode) => cNode.getAttribute("name") ?? "").filter((name) => name !== element.getAttribute("name"));
  return [
    {
      title: get("terminal.wizard.title.edit"),
      element,
      content: render(element.getAttribute("name"), element.getAttribute("connectivityNode"), element.getAttribute("cNodeName"), reservedNames)
    }
  ];
}
