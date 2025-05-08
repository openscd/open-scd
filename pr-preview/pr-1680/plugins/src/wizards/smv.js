import {get} from "../../../_snowpack/pkg/lit-translate.js";
import {
  getValue,
  identity
} from "../../../openscd/src/foundation.js";
import {contentGseOrSmvWizard, updateAddress} from "./address.js";
import {html} from "../../../_snowpack/pkg/lit-element.js";
import {getAllConnectedAPsOfSameIED, getCurrentConnectedAP} from "../editors/communication/helpers.js";
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
let newlySelectedAP = null;
function setNewlySelectedAP(connectedAP) {
  newlySelectedAP = connectedAP;
}
function moveSVMAction(element) {
  return () => {
    const moveAction = {
      old: {
        parent: element.parentElement,
        element,
        reference: null
      },
      new: {
        parent: newlySelectedAP
      }
    };
    return [
      {
        actions: [moveAction],
        title: "Move SVM to another ConnectedAP"
      }
    ];
  };
}
export function moveSMVWizard(element, doc) {
  const currentConnectedAP = getCurrentConnectedAP(element);
  const iedName = currentConnectedAP?.getAttribute("iedName");
  const allConnectedAPsOfSameIED = getAllConnectedAPsOfSameIED(element, doc);
  return [
    {
      title: get("wizard.title.selectAp"),
      element,
      primary: {
        label: get("save"),
        icon: "save",
        action: moveSVMAction(element)
      },
      content: [
        html`
         ${allConnectedAPsOfSameIED.map((connectedAP) => html`
            <mwc-button
              label="${iedName} > ${connectedAP.getAttribute("apName")}"
              @click=${() => setNewlySelectedAP(connectedAP)}
              raised
              ?disabled=${connectedAP === currentConnectedAP}
              >
              </mwc-button>
          `)}
        `
      ]
    }
  ];
}
