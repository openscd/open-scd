import {html} from "../../../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../../../_snowpack/pkg/lit-translate.js";
import {live} from "../../../../../_snowpack/pkg/lit-html/directives/live.js";
import "../../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../../../../../_snowpack/pkg/@material/mwc-select.js";
import "../../../../../_snowpack/pkg/@material/mwc-textarea.js";
import {
  getNameAttribute,
  getValue,
  patterns
} from "../../../../../openscd/src/foundation.js";
import {cloneElement} from "../../../../../_snowpack/link/packages/xml/dist/index.js";
import "../../../../../openscd/src/wizard-textfield.js";
import "../../../../../openscd/src/wizard-select.js";
import {
  getCdcValueFromDOIElement,
  getEnumVal,
  getFullPath
} from "../foundation/foundation.js";
import {hasScaleFields, hasUnitMultiplierField} from "../foundation/cdc.js";
import {getSignalName} from "../foundation/signalNames.js";
const allowedMultipliers = [
  "m",
  "k",
  "M",
  "mu",
  "y",
  "z",
  "a",
  "f",
  "p",
  "n",
  "c",
  "d",
  "da",
  "h",
  "G",
  "T",
  "P",
  "E",
  "Z",
  "Y"
];
export function updateAddressValue(doiElement, daiElement, addressElement) {
  return (inputs) => {
    const foundCdc = getCdcValueFromDOIElement(doiElement) ?? "";
    const cdc = foundCdc === "WYE" || foundCdc === "DEL" ? "CMV" : foundCdc;
    const ti = addressElement.getAttribute("ti") ?? "";
    const casdu = getValue(inputs.find((i) => i.label === "casdu"));
    const ioa = getValue(inputs.find((i) => i.label === "ioa"));
    const unitMultiplier = hasUnitMultiplierField(cdc, ti) ? getValue(inputs.find((i) => i.label === "unitMultiplier")) : null;
    const scaleMultiplier = hasScaleFields(cdc, ti) ? getValue(inputs.find((i) => i.label === "scaleMultiplier")) : null;
    const scaleOffset = hasScaleFields(cdc, ti) ? getValue(inputs.find((i) => i.label === "scaleOffset")) : null;
    if (casdu === addressElement.getAttribute("casdu") && ioa === addressElement.getAttribute("ioa") && unitMultiplier === addressElement.getAttribute("unitMultiplier") && scaleMultiplier === addressElement.getAttribute("scaleMultiplier") && scaleOffset === addressElement.getAttribute("scaleOffset")) {
      return [];
    }
    const newElement = cloneElement(addressElement, {
      casdu,
      ioa,
      unitMultiplier,
      scaleMultiplier,
      scaleOffset
    });
    return [
      {old: {element: addressElement}, new: {element: newElement}}
    ];
  };
}
export function editAddressWizard(iedElement, doiElement, daiElement, addressElement) {
  function renderAddressWizard() {
    const foundCdc = getCdcValueFromDOIElement(doiElement) ?? "";
    const reqCmvMapping = foundCdc === "WYE" || foundCdc === "DEL";
    const cdc = reqCmvMapping ? "CMV" : foundCdc;
    const ti = addressElement.getAttribute("ti") ?? "";
    let casdu = addressElement.getAttribute("casdu") ?? "";
    function validateIOA(value) {
      const existingAddress = iedElement.querySelector(`Address[casdu="${casdu}"][ioa="${value}"]`);
      if (existingAddress) {
        this.validationMessage = get("protocol104.wizard.error.ioaConflict");
        return {
          valid: false,
          customError: true
        };
      }
      return {};
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
        label="DOI"
        value="${getFullPath(doiElement, "IED")}"
        rows="2"
        cols="40"
        readonly
        disabled
      >
      </mwc-textarea>`,
      html`<wizard-textfield
        label="cdc"
        .maybeValue="${cdc}"
        .helper="${reqCmvMapping ? get("protocol104.mappedCmv", {cdc: foundCdc}) : ""}"
        .helperPersistent="${reqCmvMapping}"
        disabled
        readonly
      >
      </wizard-textfield>`,
      html`<mwc-textarea
        label="DAI"
        value="${getFullPath(daiElement, "DOI")}"
        rows="2"
        cols="40"
        readonly
        disabled
      >
      </mwc-textarea>`,
      html`<wizard-textfield
        label="casdu"
        @change="${(evt) => {
        casdu = evt.target.value ?? "";
      }}}"
        .maybeValue="${live(addressElement.getAttribute("casdu") ?? "")}"
        helper="${get("protocol104.wizard.casduHelper")}"
        required
      >
      </wizard-textfield>`,
      html`<wizard-textfield
        .validityTransform="${validateIOA}"
        label="ioa"
        .maybeValue="${live(addressElement.getAttribute("ioa") ?? "")}"
        helper="${get("protocol104.wizard.ioaHelper")}"
        required
      >
      </wizard-textfield>`,
      html`<wizard-textfield
        label="ti"
        .maybeValue=${ti + " (" + getSignalName(ti) + ")"}
        disabled
        readonly
      >
      </wizard-textfield>`
    ];
    if (hasUnitMultiplierField(cdc, ti)) {
      fields.push(html`<wizard-select
        label="unitMultiplier"
        .maybeValue="${addressElement.getAttribute("unitMultiplier")}"
        helper="${get("protocol104.wizard.unitMultiplierHelper")}"
        fixedMenuPosition
        nullable
      >
        ${allowedMultipliers.map((multiplier) => html`<mwc-list-item value="${multiplier}">
              <span>${multiplier}</span>
            </mwc-list-item>`)}
      </wizard-select>`);
    }
    if (hasScaleFields(cdc, ti)) {
      fields.push(html`<wizard-textfield
        label="scaleMultiplier"
        .maybeValue="${addressElement.getAttribute("scaleMultiplier")}"
        helper="${get("protocol104.wizard.scaleMultiplierHelper")}"
        pattern="${patterns.decimal}"
        nullable
      >
      </wizard-textfield>`);
      fields.push(html`<wizard-textfield
        label="scaleOffset"
        .maybeValue="${addressElement.getAttribute("scaleOffset")}"
        helper="${get("protocol104.wizard.scaleOffsetHelper")}"
        pattern="${patterns.decimal}"
        nullable
      >
      </wizard-textfield>`);
    }
    const expectedValue = addressElement.getAttribute("expectedValue");
    if (expectedValue) {
      fields.push(html`<wizard-textfield
        label="expectedValue"
        .maybeValue="${expectedValue}"
        disabled
        readonly
      >
      </wizard-textfield>`);
      fields.push(html`<wizard-textfield
        label="enumValue"
        .maybeValue="${getEnumVal(daiElement, expectedValue)}"
        disabled
        readonly
      >
      </wizard-textfield>`);
    }
    if (addressElement.hasAttribute("inverted")) {
      fields.push(html`<wizard-textfield
        label="inverted"
        .maybeValue="${addressElement.getAttribute("inverted")}"
        disabled
        readonly
      >
      </wizard-textfield>`);
    }
    if (addressElement.hasAttribute("check")) {
      fields.push(html`<wizard-textfield
        label="check"
        .maybeValue="${addressElement.getAttribute("check")}"
        disabled
        readonly
      >
      </wizard-textfield>`);
    }
    return fields;
  }
  return [
    {
      title: get("protocol104.wizard.title.addressEdit"),
      element: addressElement,
      primary: {
        icon: "edit",
        label: get("save"),
        action: updateAddressValue(doiElement, daiElement, addressElement)
      },
      content: renderAddressWizard()
    }
  ];
}
