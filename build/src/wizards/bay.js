import {html} from "../../_snowpack/pkg/lit-html.js";
import {get, translate} from "../../_snowpack/pkg/lit-translate.js";
import "../wizard-textfield.js";
import {
  createElement,
  getValue
} from "../foundation.js";
import {replaceNamingAttributeWithReferencesAction} from "./foundation/actions.js";
export function renderBayWizard(name, desc) {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${translate("bay.wizard.nameHelper")}"
      required
      validationMessage="${translate("textfield.required")}"
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${translate("bay.wizard.descHelper")}"
    ></wizard-textfield>`
  ];
}
export function createAction(parent) {
  return (inputs) => {
    const name = getValue(inputs.find((i) => i.label === "name"));
    const desc = getValue(inputs.find((i) => i.label === "desc"));
    const element = createElement(parent.ownerDocument, "Bay", {
      name,
      desc
    });
    const action = {
      new: {
        parent,
        element
      }
    };
    return [action];
  };
}
export function createBayWizard(parent) {
  return [
    {
      title: get("bay.wizard.title.add"),
      element: void 0,
      primary: {
        icon: "",
        label: get("add"),
        action: createAction(parent)
      },
      content: renderBayWizard("", "")
    }
  ];
}
export function editBayWizard(element) {
  return [
    {
      title: get("bay.wizard.title.edit"),
      element,
      primary: {
        icon: "edit",
        label: get("save"),
        action: replaceNamingAttributeWithReferencesAction(element, "bay.action.updateBay")
      },
      content: renderBayWizard(element.getAttribute("name"), element.getAttribute("desc"))
    }
  ];
}
