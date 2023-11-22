import {html} from "../../../../_snowpack/pkg/lit-element.js";
import {get, translate} from "../../../../_snowpack/pkg/lit-translate.js";
import {createElement, getMultiplier, getValue, patterns} from "../../../foundation.js";
import "../../../wizard-textfield.js";
const initial = {
  type: "104",
  bitrate: "100",
  multiplier: "M"
};
function contentSubNetwork(options) {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${options.name}
      helper="${translate("subnetwork.wizard.nameHelper")}"
      required
      validationMessage="${translate("textfield.required")}"
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
      helper="${translate("subnetwork.wizard.descHelper")}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="type"
      .maybeValue=${options.type}
      nullable
      helper="${translate("subnetwork.wizard.typeHelper")}"
      pattern="${patterns.normalizedString}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="BitRate"
      .maybeValue=${options.BitRate}
      nullable
      unit="b/s"
      .multipliers=${[null, "M"]}
      .multiplier=${options.multiplier}
      helper="${translate("subnetwork.wizard.bitrateHelper")}"
      required
      validationMessage="${translate("textfield.nonempty")}"
      pattern="${patterns.decimal}"
    ></wizard-textfield>`
  ];
}
export function createSubNetworkAction(parent) {
  return (inputs) => {
    const name = getValue(inputs.find((i) => i.label === "name"));
    const desc = getValue(inputs.find((i) => i.label === "desc"));
    const type = getValue(inputs.find((i) => i.label === "type"));
    const BitRate = getValue(inputs.find((i) => i.label === "BitRate"));
    const multiplier = getMultiplier(inputs.find((i) => i.label === "BitRate"));
    const element = createElement(parent.ownerDocument, "SubNetwork", {
      name,
      desc,
      type
    });
    if (BitRate !== null) {
      const bitRateElement = createElement(parent.ownerDocument, "BitRate", {
        unit: "b/s",
        multiplier
      });
      bitRateElement.textContent = BitRate;
      element.appendChild(bitRateElement);
    }
    const action = {
      new: {
        parent,
        element
      }
    };
    return [action];
  };
}
export function createSubNetworkWizard(parent) {
  return [
    {
      title: get("wizard.title.add", {tagName: "SubNetwork"}),
      primary: {
        icon: "add",
        label: get("add"),
        action: createSubNetworkAction(parent)
      },
      content: contentSubNetwork({
        name: "",
        desc: "",
        type: initial.type,
        BitRate: initial.bitrate,
        multiplier: initial.multiplier
      })
    }
  ];
}
