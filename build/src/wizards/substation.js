import {html} from "../../_snowpack/pkg/lit-element.js";
import {get, translate} from "../../_snowpack/pkg/lit-translate.js";
import "../../_snowpack/pkg/@material/mwc-checkbox.js";
import "../../_snowpack/pkg/@material/mwc-formfield.js";
import "../wizard-textfield.js";
import {
  createElement,
  getValue
} from "../foundation.js";
import {guessVoltageLevel} from "../editors/substation/guess-wizard.js";
import {updateNamingAttributeWithReferencesAction} from "./foundation/actions.js";
function render(name, desc, guessable) {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${translate("substation.wizard.nameHelper")}"
      required
      validationMessage="${translate("textfield.required")}"
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${translate("substation.wizard.descHelper")}"
    ></wizard-textfield>`,
    guessable ? html`<mwc-formfield label="${translate("guess.wizard.primary")}">
          <mwc-checkbox></mwc-checkbox>
        </mwc-formfield>` : html``
  ];
}
export function createAction(parent) {
  return (inputs, wizard) => {
    const name = getValue(inputs.find((i) => i.label === "name"));
    const desc = getValue(inputs.find((i) => i.label === "desc"));
    const guess = wizard.shadowRoot?.querySelector("mwc-checkbox")?.checked;
    parent.ownerDocument.createElement("Substation");
    const substation = createElement(parent.ownerDocument, "Substation", {
      name,
      desc
    });
    if (guess)
      return [() => guessVoltageLevel(parent.ownerDocument, substation)];
    return [{new: {parent, element: substation}}];
  };
}
export function createSubstationWizard(parent) {
  const guessable = parent.querySelector("Substation") === null;
  return [
    {
      title: get("substation.wizard.title.add"),
      element: void 0,
      primary: {
        icon: "add",
        label: get("add"),
        action: createAction(parent)
      },
      content: render("", "", guessable)
    }
  ];
}
export function substationEditWizard(element) {
  return [
    {
      title: get("substation.wizard.title.edit"),
      element,
      primary: {
        icon: "edit",
        label: get("save"),
        action: updateNamingAttributeWithReferencesAction(element, "substation.action.updatesubstation")
      },
      content: render(element.getAttribute("name") ?? "", element.getAttribute("desc"), false)
    }
  ];
}
