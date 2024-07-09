import {html} from "../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../_snowpack/pkg/lit-translate.js";
import "../../../_snowpack/pkg/@material/mwc-list.js";
import "../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../../../openscd/src/wizard-textfield.js";
import {
  getValue
} from "../../../openscd/src/foundation.js";
import {cloneElement} from "../../../_snowpack/link/packages/xml/dist/index.js";
import {patterns} from "./foundation/limits.js";
const lDeviceNamePattern = "[A-Za-z][0-9A-Za-z_]{0,2}|[A-Za-z][0-9A-Za-z_]{4,63}|[A-MO-Za-z][0-9A-Za-z_]{3}|N[0-9A-Za-np-z_][0-9A-Za-z_]{2}|No[0-9A-Za-mo-z_][0-9A-Za-z_]|Non[0-9A-Za-df-z_]";
export function renderLdeviceWizard(ldName, readOnly, desc, ldInst) {
  return [
    readOnly ? html`<wizard-textfield
          label="ldName"
          .maybeValue=${ldName}
          helper="${get("ldevice.wizard.noNameSupportHelper")}"
          helperPersistent
          readOnly
          disabled
        ></wizard-textfield>` : html`<wizard-textfield
          label="ldName"
          .maybeValue=${ldName}
          nullable
          helper="${get("ldevice.wizard.nameHelper")}"
          validationMessage="${get("textfield.required")}"
          dialogInitialFocus
          pattern="${lDeviceNamePattern}"
        ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${get("ldevice.wizard.descHelper")}"
      pattern="${patterns.normalizedString}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="ldInst"
      .maybeValue=${ldInst}
      readOnly
      disabled
    ></wizard-textfield>`
  ];
}
function ldNameIsAllowed(element) {
  const ConfLdName = element.closest("IED")?.querySelector("Services > ConfLdName");
  if (ConfLdName)
    return true;
  return false;
}
function updateAction(element) {
  return (inputs) => {
    const ldAttrs = {};
    const ldKeys = ["ldName", "desc"];
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
export function editLDeviceWizard(element) {
  return [
    {
      title: get("ldevice.wizard.title.edit"),
      element,
      primary: {
        icon: "edit",
        label: get("save"),
        action: updateAction(element)
      },
      content: renderLdeviceWizard(element.getAttribute("ldName"), !ldNameIsAllowed(element), element.getAttribute("desc"), element.getAttribute("inst"))
    }
  ];
}
