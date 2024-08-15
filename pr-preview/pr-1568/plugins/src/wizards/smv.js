import {get} from "../../../_snowpack/pkg/lit-translate.js";
import {
  getValue,
  identity
} from "../../../openscd/src/foundation.js";
import {contentGseOrSmvWizard, updateAddress} from "./address.js";
export function updateSmvAction(element) {
  return (inputs, wizard) => {
    const complexAction = {
      actions: [],
      title: get("smv.action.addaddress", {
        identity: identity(element)
      })
    };
    const instType = wizard.shadowRoot?.querySelector("#instType")?.checked;
    const addressContent = {};
    addressContent["MAC-Address"] = getValue(inputs.find((i) => i.label === "MAC-Address"));
    addressContent["APPID"] = getValue(inputs.find((i) => i.label === "APPID"));
    addressContent["VLAN-ID"] = getValue(inputs.find((i) => i.label === "VLAN-ID"));
    addressContent["VLAN-PRIORITY"] = getValue(inputs.find((i) => i.label === "VLAN-PRIORITY"));
    const addressActions = updateAddress(element, addressContent, instType);
    if (!addressActions.length)
      return [];
    addressActions.forEach((action) => {
      complexAction.actions.push(action);
    });
    return [complexAction];
  };
}
export function editSMvWizard(element) {
  const hasInstType = Array.from(element.querySelectorAll("Address > P")).some((pType) => pType.getAttribute("xsi:type"));
  const attributes = {};
  ["MAC-Address", "APPID", "VLAN-ID", "VLAN-PRIORITY"].forEach((key) => {
    if (!attributes[key])
      attributes[key] = element.querySelector(`Address > P[type="${key}"]`)?.innerHTML.trim() ?? null;
  });
  return [
    {
      title: get("wizard.title.edit", {tagName: element.tagName}),
      element,
      primary: {
        label: get("save"),
        icon: "edit",
        action: updateSmvAction(element)
      },
      content: [...contentGseOrSmvWizard({hasInstType, attributes})]
    }
  ];
}
