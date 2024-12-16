import {html} from "../../../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../../../_snowpack/pkg/lit-translate.js";
import {ifDefined} from "../../../../../_snowpack/pkg/lit-html/directives/if-defined.js";
import "../../../../../_snowpack/pkg/@material/mwc-checkbox.js";
import "../../../../../_snowpack/pkg/@material/mwc-switch.js";
import "../../../../../_snowpack/pkg/@material/mwc-formfield.js";
import "../../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../../../../../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js";
import "../../../../../_snowpack/pkg/@material/mwc-icon.js";
import "../../../../../openscd/src/wizard-textfield.js";
import "../../../../../openscd/src/filtered-list.js";
import {
  pTypes104,
  stationTypeOptions,
  typeDescriptiveNameKeys,
  typePattern
} from "../foundation/p-types.js";
import {
  compareNames,
  getValue,
  identity,
  isPublic,
  newSubWizardEvent,
  newWizardEvent
} from "../../../../../openscd/src/foundation.js";
import {cloneElement, createElement} from "../../../../../_snowpack/link/packages/xml/dist/index.js";
import {getTypeAttribute} from "../foundation/foundation.js";
import {
  createRedundancyGroupWizard,
  editRedundancyGroupWizard
} from "./redundancygroup.js";
function compareAccessPointConnection(a, b) {
  if (a.connected !== b.connected)
    return b.connected ? -1 : 1;
  return 0;
}
function createConnectedApAction(parent) {
  return (_, __, list) => {
    if (!list)
      return [];
    const identities = list.selected.map((item) => item.value);
    const actions = identities.map((identity2) => {
      const [iedName, apName] = identity2.split(">");
      return {
        new: {
          parent,
          element: createElement(parent.ownerDocument, "ConnectedAP", {
            iedName,
            apName
          })
        }
      };
    });
    return actions;
  };
}
function existConnectedAp(accesspoint) {
  const iedName = accesspoint.closest("IED")?.getAttribute("name");
  const apName = accesspoint.getAttribute("name");
  const connAp = accesspoint.ownerDocument.querySelector(`ConnectedAP[iedName="${iedName}"][apName="${apName}"]`);
  return (connAp && isPublic(connAp)) ?? false;
}
export function createConnectedApWizard(element) {
  const doc = element.ownerDocument;
  const accessPoints = Array.from(doc.querySelectorAll(":root > IED")).sort(compareNames).flatMap((ied) => Array.from(ied.querySelectorAll(":root > IED > AccessPoint"))).map((accesspoint) => {
    return {
      element: accesspoint,
      connected: existConnectedAp(accesspoint)
    };
  }).sort(compareAccessPointConnection);
  return [
    {
      title: get("wizard.title.add", {tagName: "ConnectedAP"}),
      primary: {
        icon: "save",
        label: get("save"),
        action: createConnectedApAction(element)
      },
      content: [
        html` <filtered-list id="apList" multi
          >${accessPoints.map((accesspoint) => {
          const id = identity(accesspoint.element);
          return html`<mwc-check-list-item
              value="${id}"
              ?disabled=${accesspoint.connected}
              ><span>${id}</span></mwc-check-list-item
            >`;
        })}
        </filtered-list>`
      ]
    }
  ];
}
function isEqualAddress(oldAddress, newAddress) {
  return Array.from(oldAddress.querySelectorAll("Address > P")).every((pType) => newAddress.querySelector(`Address > P[type="${getTypeAttribute(pType)}"]`)?.isEqualNode(pType));
}
function createAddressElement(inputs, parent, typeRestriction) {
  const element = createElement(parent.ownerDocument, "Address", {});
  inputs.filter((input) => getValue(input) !== null).forEach((validInput) => {
    const type = validInput.label;
    const child = createElement(parent.ownerDocument, "P", {type});
    if (typeRestriction)
      child.setAttributeNS("http://www.w3.org/2001/XMLSchema-instance", "xsi:type", "tP_" + type);
    child.textContent = getValue(validInput);
    element.appendChild(child);
  });
  return element;
}
export function editConnectedApWizard(parent, redundancy) {
  const redundancyGroupNumbers = getRedundancyGroupNumbers(parent);
  return [
    {
      title: get("protocol104.network.connectedAp.wizard.title.edit"),
      element: parent,
      menuActions: redundancy ? [
        {
          icon: "playlist_add",
          label: get("protocol104.network.connectedAp.wizard.addRedundancyGroup"),
          action: openRedundancyGroupWizard(parent, redundancyGroupNumbers)
        }
      ] : void 0,
      primary: {
        icon: "save",
        label: get("save"),
        action: editConnectedApAction(parent, redundancy)
      },
      content: [
        html`<mwc-formfield
            label="${get("protocol104.network.connectedAp.wizard.redundancySwitchLabel")}"
          >
            <mwc-switch
              id="redundancy"
              ?checked=${redundancy}
              @change=${(event) => {
          event.target.dispatchEvent(newWizardEvent());
          event.target.dispatchEvent(newSubWizardEvent(() => editConnectedApWizard(parent, !redundancy)));
        }}
            ></mwc-switch>
          </mwc-formfield>
          <wizard-divider></wizard-divider>
          ${createTypeRestrictionCheckbox(parent)}
          <wizard-select
            label="StationType"
            .maybeValue=${parent.querySelector(`Address > P[type="StationType"]`)?.innerHTML ?? null}
            required
            fixedMenuPosition
            helper="${get(typeDescriptiveNameKeys["StationType"])}"
          >
            ${stationTypeOptions.map((option) => html`<mwc-list-item value="${option}">${option}</mwc-list-item>`)}
          </wizard-select>
          ${redundancy ? html`<h3>
                  ${get("protocol104.network.connectedAp.wizard.redundancyGroupTitle")}
                </h3>
                <mwc-list
                  @selected=${(e) => {
          e.target.dispatchEvent(newSubWizardEvent(() => editRedundancyGroupWizard(parent, redundancyGroupNumbers[e.detail.index])));
        }}
                >
                  ${redundancyGroupNumbers.length != 0 ? redundancyGroupNumbers.map((number) => html`<mwc-list-item
                            >Redundancy Group ${number}</mwc-list-item
                          >`) : html`<p>
                        ${get("protocol104.network.connectedAp.wizard.noRedundancyGroupsAvailable")}
                      </p>`}
                </mwc-list>` : html`${pTypes104.map((pType) => html`${createEditTextField(parent, pType)}`)}`} `
      ]
    }
  ];
}
function editConnectedApAction(parent, redundancy) {
  return (inputs, wizard) => {
    const typeRestriction = wizard.shadowRoot?.querySelector("#typeRestriction")?.checked ?? false;
    const newAddress = createAddressElement(inputs, parent, typeRestriction);
    const oldAddress = parent.querySelector("Address");
    const complexAction = {
      actions: [],
      title: get("connectedap.action.addaddress", {
        iedName: parent.getAttribute("iedName") ?? "",
        apName: parent.getAttribute("apName") ?? ""
      })
    };
    if (redundancy) {
      const stationTypeValue = getValue(inputs.find((i) => i.label === "StationType"));
      const originalElement = oldAddress?.querySelector('P[type="StationType"]');
      const elementClone = cloneElement(originalElement, {});
      elementClone.textContent = stationTypeValue;
      complexAction.actions.push({
        old: {
          element: originalElement
        },
        new: {
          element: elementClone
        }
      });
    } else if (oldAddress !== null && !isEqualAddress(oldAddress, newAddress)) {
      complexAction.actions.push({
        old: {
          parent,
          element: oldAddress
        }
      });
      complexAction.actions.push({
        new: {
          parent,
          element: newAddress
        }
      });
    } else if (oldAddress === null)
      complexAction.actions.push({
        new: {
          parent,
          element: newAddress
        }
      });
    return complexAction.actions.length ? [complexAction] : [];
  };
}
function openRedundancyGroupWizard(element, rGNumbers) {
  return (wizard) => {
    wizard.dispatchEvent(newSubWizardEvent(createRedundancyGroupWizard(element, rGNumbers)));
  };
}
function getRedundancyGroupNumbers(parent) {
  const groupNumbers = [];
  parent.querySelectorAll(`Address > P[type^="RG"]`).forEach((p) => {
    const redundancyGroupPart = getTypeAttribute(p)?.split("-")[0];
    const number = Number(redundancyGroupPart?.substring(2));
    if (!groupNumbers.includes(number))
      groupNumbers.push(number);
  });
  return groupNumbers.sort();
}
function createEditTextField(parent, pType) {
  return html`<wizard-textfield
    required
    label="${pType}"
    pattern="${ifDefined(typePattern[pType])}"
    .maybeValue=${parent.querySelector(`Address > P[type="${pType}"]`)?.innerHTML ?? null}
  ></wizard-textfield>`;
}
function createTypeRestrictionCheckbox(element) {
  return html`<mwc-formfield
    label="${get("connectedap.wizard.addschemainsttype")}"
    ><mwc-checkbox
      id="typeRestriction"
      ?checked=${hasTypeRestriction(element)}
    ></mwc-checkbox>
  </mwc-formfield>`;
}
function hasTypeRestriction(element) {
  return Array.from(element.querySelectorAll("Address > P")).filter((p) => isPublic(p)).some((pType) => pType.getAttribute("xsi:type"));
}
