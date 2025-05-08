import {html} from "../../../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../../../_snowpack/pkg/lit-translate.js";
import "../../../../../_snowpack/pkg/@material/mwc-textarea.js";
import {
  getNameAttribute,
  newWizardEvent
} from "../../../../../openscd/src/foundation.js";
import {
  newActionEvent
} from "../../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js";
import "../../../../../openscd/src/wizard-textfield.js";
import {
  getCdcValueFromDOIElement,
  getCtlModel,
  getDoElement,
  getFullPath
} from "../foundation/foundation.js";
import {cdcProcessings} from "../foundation/cdc.js";
import {PROTOCOL_104_PRIVATE} from "../foundation/private.js";
function renderTiOverview(foundTis, label) {
  if (foundTis.length > 0) {
    return html` <wizard-textfield
      label="${label}"
      .maybeValue=${foundTis.join(", ")}
      disabled
      readonly
    >
    </wizard-textfield>`;
  }
  return html``;
}
export function renderDOIWizard(doiElement) {
  const iedElement = doiElement.closest("IED");
  const fullpath = getFullPath(doiElement, "IED");
  const foundCdc = getCdcValueFromDOIElement(doiElement);
  const cdc = foundCdc === "WYE" || foundCdc === "DEL" ? "CMV" : foundCdc;
  const fields = [
    html`<wizard-textfield
      label="IED"
      .maybeValue=${getNameAttribute(iedElement)}
      disabled
      readonly
    >
    </wizard-textfield>`,
    html`<mwc-textarea
      label="DOI"
      value="${fullpath}"
      rows="2"
      cols="40"
      readonly
      disabled
    >
    </mwc-textarea>`,
    html`<wizard-textfield
      label="Common Data Class"
      .maybeValue=${cdc}
      disabled
      readonly
    >
    </wizard-textfield>`
  ];
  const lnElement = doiElement.closest("LN0, LN");
  const doName = getNameAttribute(doiElement);
  if (lnElement && doName) {
    const doElement = getDoElement(lnElement, doName);
    if (doElement) {
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
    }
  }
  let monitorTis = [];
  let controlTis = [];
  const cdcProcessing = cdcProcessings[cdc];
  fields.push(html`<wizard-textfield
    label="104 Configuration available"
    .maybeValue=${cdcProcessing !== void 0}
    disabled
    readonly
  >
  </wizard-textfield>`);
  if (cdcProcessing) {
    monitorTis = Object.keys(cdcProcessing.monitor);
    controlTis = Object.keys(cdcProcessing.control);
  }
  let foundTis = Array.from(doiElement.querySelectorAll(`DAI > Private[type="${PROTOCOL_104_PRIVATE}"] > Address`)).filter((element) => element.getAttribute("ti") !== "").map((element) => element.getAttribute("ti"));
  foundTis = [...new Set(foundTis)];
  const foundMonitorTis = foundTis.filter((ti) => monitorTis.includes(ti));
  const foundControlTis = foundTis.filter((ti) => controlTis.includes(ti));
  const otherTis = foundTis.filter((ti) => !foundMonitorTis.includes(ti)).filter((ti) => !foundControlTis.includes(ti));
  fields.push(renderTiOverview(monitorTis, "Available Monitor TIs"));
  fields.push(renderTiOverview(foundMonitorTis, "Found Monitor TIs"));
  fields.push(renderTiOverview(controlTis, "Available Control TIs"));
  fields.push(renderTiOverview(foundControlTis, "Found Control TIs"));
  fields.push(renderTiOverview(otherTis, "Other TIs"));
  return fields;
}
export function remove104Private(doiElement) {
  return (wizard) => {
    const privateElements = doiElement.querySelectorAll(`DAI > Private[type="${PROTOCOL_104_PRIVATE}"] > Address`);
    if (privateElements.length > 0) {
      const complexAction = {
        actions: [],
        title: get("protocol104.values.removedAddresses", {
          name: getFullPath(doiElement, "SCL"),
          nrOfAddresses: privateElements.length
        })
      };
      privateElements.forEach((privateElement) => {
        complexAction.actions.push({
          old: {
            parent: privateElement.parentElement,
            element: privateElement
          }
        });
      });
      wizard.dispatchEvent(newActionEvent(complexAction));
      wizard.dispatchEvent(newWizardEvent());
    }
  };
}
export function showDOIInfoWizard(doiElement) {
  return [
    {
      title: get("protocol104.wizard.title.doiInfo"),
      menuActions: [
        {
          label: get("protocol104.values.removeAddresses"),
          icon: "delete",
          action: remove104Private(doiElement)
        }
      ],
      content: renderDOIWizard(doiElement)
    }
  ];
}
