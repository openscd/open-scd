import {html} from "../../../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../../../_snowpack/pkg/lit-translate.js";
import "../../../../../openscd/src/wizard-textfield.js";
import {pTypesLogicLink104} from "../foundation/p-types.js";
import {
  getValue,
  newWizardEvent
} from "../../../../../openscd/src/foundation.js";
import {cloneElement, createElement} from "../../../../../_snowpack/link/packages/xml/dist/index.js";
import {
  newActionEvent
} from "../../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js";
import {createNetworkTextField} from "../foundation/foundation.js";
export function editLogicLinkWizard(parent, rGNumber, lLNumber) {
  return [
    {
      title: get("protocol104.network.logicLink.wizard.title.edit"),
      menuActions: [
        {
          icon: "delete",
          label: get("remove"),
          action: remove(parent, rGNumber, lLNumber)
        }
      ],
      primary: {
        icon: "save",
        label: get("save"),
        action: editLogicLinkAction(parent, rGNumber, lLNumber)
      },
      content: [
        html`<wizard-textfield
            readOnly
            label="${get("protocol104.network.logicLink.wizard.logicLinkNumberLabel")}"
            .maybeValue=${lLNumber}
          ></wizard-textfield>
          ${pTypesLogicLink104.map((pType) => html`${createNetworkTextField(pType, parent.querySelector(`Address > P[type$="RG${rGNumber}-LL${lLNumber}-${pType}"]`)?.innerHTML)}`)}`
      ]
    }
  ];
}
export function createLogicLinkWizard(parent, rGNumber, occupiedLLNumbers) {
  let lLNumber = 1;
  while (occupiedLLNumbers.find((n) => n == lLNumber)) {
    lLNumber++;
  }
  return [
    {
      title: get("protocol104.network.logicLink.wizard.title.add"),
      primary: {
        icon: "",
        label: get("save"),
        action: addLogicLinkAction(parent, rGNumber, lLNumber)
      },
      content: [
        html`<wizard-textfield
            readOnly
            label="${get("protocol104.network.logicLink.wizard.logicLinkNumberLabel")}"
            value="${lLNumber}"
          ></wizard-textfield>
          ${pTypesLogicLink104.map((pType) => html`${createNetworkTextField(pType)}`)}`
      ]
    }
  ];
}
function remove(parent, rGNumber, lLNumber) {
  return (wizard) => {
    const addressElement = parent.querySelector("Address");
    const complexAction = {
      actions: [],
      title: get("protocol104.network.logicLink.wizard.removedLogicLink", {
        subNetworkName: parent.parentElement.getAttribute("name"),
        apName: parent.getAttribute("apName"),
        iedName: parent.getAttribute("iedName")
      })
    };
    addressElement.querySelectorAll(`P[type^="RG${rGNumber}-LL${lLNumber}-"]`).forEach((p) => {
      complexAction.actions.push({
        old: {
          parent: addressElement,
          element: p
        }
      });
    });
    wizard.dispatchEvent(newActionEvent(complexAction));
    wizard.dispatchEvent(newWizardEvent());
  };
}
function editLogicLinkAction(parent, rGNumber, lLNumber) {
  return (inputs) => {
    const actions = [];
    pTypesLogicLink104.forEach((type) => {
      const inputValue = getValue(inputs.find((i) => i.label === type));
      const elementOriginal = parent.querySelector(`Address > P[type="RG${rGNumber}-LL${lLNumber}-${type}"]`);
      if (elementOriginal == null) {
        const element = createElement(parent.ownerDocument, "P", {
          type: `RG${rGNumber}-LL${lLNumber}-${type}`
        });
        element.textContent = getValue(inputs.find((i) => i.label === type));
        actions.push({
          new: {
            parent: parent.querySelector("Address"),
            element
          }
        });
      } else if (inputValue !== elementOriginal?.textContent) {
        const elementClone = cloneElement(elementOriginal, {});
        elementClone.textContent = inputValue;
        actions.push({
          old: {
            element: elementOriginal
          },
          new: {
            element: elementClone
          }
        });
      }
    });
    return actions.length != 0 ? [
      {
        actions,
        title: get("protocol104.network.logicLink.wizard.editedLogicLink", {
          subNetworkName: parent.parentElement.getAttribute("name"),
          apName: parent.getAttribute("apName"),
          iedName: parent.getAttribute("iedName")
        })
      }
    ] : [];
  };
}
function addLogicLinkAction(parent, rGNumber, lLNumber) {
  return (inputs) => {
    const complexAction = {
      actions: [],
      title: get("protocol104.network.logicLink.wizard.addedLogicLink", {
        subNetworkName: parent.parentElement.getAttribute("name"),
        apName: parent.getAttribute("apName"),
        iedName: parent.getAttribute("iedName")
      })
    };
    pTypesLogicLink104.forEach((type) => {
      const element = createElement(parent.ownerDocument, "P", {
        type: `RG${rGNumber}-LL${lLNumber}-${type}`
      });
      element.textContent = getValue(inputs.find((i) => i.label === type));
      complexAction.actions.push({
        new: {
          parent: parent.querySelector("Address"),
          element
        }
      });
    });
    return [complexAction];
  };
}
