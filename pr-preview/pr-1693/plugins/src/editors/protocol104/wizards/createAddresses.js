import {get} from "../../../../../_snowpack/pkg/lit-translate.js";
import {html} from "../../../../../_snowpack/pkg/lit-element.js";
import "../../../../../_snowpack/pkg/@material/mwc-formfield.js";
import "../../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../../../../../_snowpack/pkg/@material/mwc-switch.js";
import "../../../../../openscd/src/wizard-textfield.js";
import "../../../../../openscd/src/WizardDivider.js";
import {
  getNameAttribute,
  getValue,
  newWizardEvent
} from "../../../../../openscd/src/foundation.js";
import {
  getCdcValueFromDOElement,
  getCtlModel,
  getFullPath
} from "../foundation/foundation.js";
import {
  cdcProcessings
} from "../foundation/cdc.js";
import {createActions, createCheckActions} from "../foundation/actions.js";
import {getSignalName} from "../foundation/signalNames.js";
function getSwitchValue(wizard, name) {
  const switchElement = wizard.shadowRoot?.querySelector(`mwc-switch[id="${name}"`);
  return switchElement?.checked ?? false;
}
export function createAddressesAction(lnElement, doElement, hasControlTis) {
  return (inputs, wizard) => {
    wizard.dispatchEvent(newWizardEvent());
    const cdc = getCdcValueFromDOElement(doElement) ?? "";
    const cdcProcessing = cdcProcessings[cdc];
    const complexAction = {
      actions: [],
      title: get("protocol104.values.addedAddress", {
        name: getNameAttribute(doElement) ?? "Unknown",
        lnName: getFullPath(lnElement, "IED")
      })
    };
    const lnClonedElement = lnElement.cloneNode(true);
    const selectedMonitorTi = getValue(inputs.find((i) => i.label === "monitorTi"))?.split(" (")[0] ?? "";
    const monitorInverted = getSwitchValue(wizard, "monitorInverted");
    const tiInformation = cdcProcessing.monitor[selectedMonitorTi];
    if (tiInformation) {
      complexAction.actions.push(...createActions(lnElement, lnClonedElement, doElement, wizard, selectedMonitorTi, monitorInverted, tiInformation));
    }
    const monitorCheck = getSwitchValue(wizard, "monitorCheck");
    if (monitorCheck) {
      complexAction.actions.push(...createCheckActions(lnElement, lnClonedElement, doElement, wizard, selectedMonitorTi, tiInformation));
    }
    if (hasControlTis) {
      const ctlModel = getCtlModel(lnElement, doElement);
      if (ctlModel !== null && ctlModel !== "status-only") {
        const selectedControlTi = getValue(inputs.find((i) => i.label === "controlTi"))?.split(" (")[0] ?? "";
        const controlInverted = getSwitchValue(wizard, "controlInverted");
        const tiInformation2 = cdcProcessing.control[selectedControlTi];
        if (tiInformation2) {
          complexAction.actions.push(...createActions(lnElement, lnClonedElement, doElement, wizard, selectedControlTi, controlInverted, tiInformation2));
        }
        const controlCheck = getSwitchValue(wizard, "controlCheck");
        if (controlCheck) {
          complexAction.actions.push(...createCheckActions(lnElement, lnClonedElement, doElement, wizard, selectedControlTi, tiInformation2));
        }
      }
    }
    if (complexAction.actions.length > 0) {
      return [complexAction];
    }
    wizard.dispatchEvent(newWizardEvent());
    return [];
  };
}
export function disableCheckSwitch(tiInfo) {
  let disableSwitch = true;
  Object.values(tiInfo).forEach((tiInformation) => {
    if (tiInformation.checkDaPaths && tiInformation.checkCreate) {
      disableSwitch = false;
    }
  });
  return disableSwitch;
}
export function disableInvertedSwitch(tiInfo) {
  let disableSwitch = true;
  Object.values(tiInfo).forEach((tiInformation) => {
    if (tiInformation.inverted === true) {
      disableSwitch = false;
    }
  });
  return disableSwitch;
}
export function disableMonitorInvertedSwitch(tiInfo, tiNumberInfo) {
  let disableSwitch = true;
  const tiNumber = tiNumberInfo.split(" (")[0];
  if (!isNaN(+tiNumber))
    disableSwitch = !tiInfo[tiNumber].inverted;
  return disableSwitch;
}
export function createAddressesWizard(lnElement, doElement) {
  const foundCdc = getCdcValueFromDOElement(doElement) ?? "";
  const reqCmvMapping = foundCdc === "WYE" || foundCdc === "DEL";
  const cdc = reqCmvMapping ? "CMV" : foundCdc;
  const cdcProcessing = cdcProcessings[foundCdc];
  const monitorTis = Object.keys(cdcProcessing.monitor);
  const controlTis = Object.keys(cdcProcessing.control);
  function renderCreateAddressesWizard() {
    const doName = getNameAttribute(doElement) ?? "";
    const iedElement = lnElement.closest("IED");
    const fullPath = getFullPath(lnElement, "IED");
    function setMonitorInvertedSwitch(e) {
      const selectedTi = e.target.selected.value;
      const selectElement = e.target.parentElement.querySelector('mwc-switch[id="monitorInverted"]');
      if (!selectElement)
        return;
      selectElement.disabled = disableMonitorInvertedSwitch(cdcProcessing.monitor, selectedTi);
    }
    function setMonitorControlValue(e, isMonitor) {
      const selectedTi = e.target.selected.value;
      const counterType = isMonitor ? "controlTi" : "monitorTi";
      const availableTis = e.target.parentElement.querySelector(`wizard-select[label="${counterType}"]`);
      availableTis.maybeValue = isMonitor ? selectedTi === "30" ? "58" : "62" : selectedTi === "58" ? "30" : "35";
    }
    const fields = [
      html`<wizard-textfield
        label="IED"
        .maybeValue="${getNameAttribute(iedElement)}"
        disabled
        readonly
      >
      </wizard-textfield>`,
      html`<mwc-textarea
        label="LN(0)"
        value="${fullPath}"
        rows="2"
        cols="40"
        readonly
        disabled
      >
      </mwc-textarea>`,
      html`<wizard-textfield
        label="DO"
        .maybeValue="${doName}"
        disabled
        readonly
      >
      </wizard-textfield>`,
      html`<wizard-textfield
        label="Common Data Class"
        .maybeValue="${cdc}"
        .helper="${reqCmvMapping ? get("protocol104.mappedCmv", {cdc: foundCdc}) : ""}"
        .helperPersistent="${reqCmvMapping}"
        disabled
        readonly
      >
      </wizard-textfield>`
    ];
    if (monitorTis.length > 0) {
      fields.push(html`<wizard-divider></wizard-divider>`);
      let disabledSwitchByDefault = true;
      if (monitorTis.length > 1) {
        fields.push(html`<wizard-select
            label="monitorTi"
            helper="${get("protocol104.wizard.monitorTiHelper")}"
            fixedMenuPosition
            required
            @selected=${(e) => {
          setMonitorInvertedSwitch(e);
          if (cdc === "ENC")
            setMonitorControlValue(e, true);
        }}
          >
            ${monitorTis.map((monitorTi) => html` <mwc-list-item value="${monitorTi}">
                  <span
                    >${monitorTi + " (" + getSignalName(monitorTi) + ")"}</span
                  >
                </mwc-list-item>`)}
          </wizard-select>`);
      } else {
        disabledSwitchByDefault = disableMonitorInvertedSwitch(cdcProcessing.monitor, monitorTis[0]);
        fields.push(html`<wizard-textfield
            label="monitorTi"
            .maybeValue=${monitorTis[0] ? monitorTis[0] + " (" + getSignalName(monitorTis[0]) + ")" : ""}
            disabled
          >
          </wizard-textfield>`);
      }
      fields.push(html`<mwc-formfield
          label="${get("protocol104.wizard.monitorInverted")}"
        >
          <mwc-switch
            id="monitorInverted"
            .disabled="${disabledSwitchByDefault}"
          >
          </mwc-switch>
        </mwc-formfield>`);
      fields.push(html`<mwc-formfield label="${get("protocol104.wizard.monitorCheck")}">
          <mwc-switch
            id="monitorCheck"
            .disabled="${disableCheckSwitch(cdcProcessing.monitor)}"
          >
          </mwc-switch>
        </mwc-formfield>`);
    }
    if (controlTis.length > 0) {
      fields.push(html` <wizard-divider></wizard-divider>`);
      const ctlModel = getCtlModel(lnElement, doElement);
      if (ctlModel !== null) {
        fields.push(html` <wizard-textfield
          label="ctlModel"
          .maybeValue=${ctlModel}
          disabled
          readonly
        >
        </wizard-textfield>`);
      }
      if (ctlModel !== null && ctlModel !== "status-only") {
        if (controlTis.length > 1) {
          fields.push(html` <wizard-select
              label="controlTi"
              helper="${get("protocol104.wizard.controlTiHelper")}"
              fixedMenuPosition
              required
              @selected=${(e) => {
            if (cdc === "ENC")
              setMonitorControlValue(e, false);
          }}
            >
              ${controlTis.map((controlTi) => html` <mwc-list-item value="${controlTi}">
                    <span
                      >${controlTi + " (" + getSignalName(controlTi) + ")"}</span
                    >
                  </mwc-list-item>`)}
            </wizard-select>`);
        } else {
          fields.push(html` <wizard-textfield
              label="controlTi"
              .maybeValue=${controlTis[0] ? controlTis[0] + " (" + getSignalName(controlTis[0]) + ")" : ""}
              disabled
            >
            </wizard-textfield>`);
        }
        fields.push(html` <mwc-formfield
            label="${get("protocol104.wizard.controlInverted")}"
          >
            <mwc-switch
              id="controlInverted"
              .disabled="${disableInvertedSwitch(cdcProcessing.control)}"
            >
            </mwc-switch>
          </mwc-formfield>`);
        fields.push(html` <mwc-formfield
            label="${get("protocol104.wizard.controlCheck")}"
          >
            <mwc-switch
              id="controlCheck"
              .disabled="${disableCheckSwitch(cdcProcessing.control)}"
            >
            </mwc-switch>
          </mwc-formfield>`);
      }
    }
    return fields;
  }
  return [
    {
      title: get("wizard.title.add", {tagName: "Address"}),
      primary: {
        icon: "add",
        label: get("add"),
        action: createAddressesAction(lnElement, doElement, controlTis.length > 0)
      },
      content: renderCreateAddressesWizard()
    }
  ];
}
