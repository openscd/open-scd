import {html} from "../../../_snowpack/pkg/lit-element.js";
import {get, translate} from "../../../_snowpack/pkg/lit-translate.js";
import "../../../_snowpack/pkg/@material/mwc-textarea.js";
import "../../../_snowpack/pkg/@material/mwc-textfield.js";
import {
  getDescriptionAttribute,
  getInstanceAttribute,
  getNameAttribute
} from "../../foundation.js";
import {
  findDOTypeElement,
  findElement,
  findLogicaNodeElement,
  getValueElements
} from "./foundation.js";
function getValues(element) {
  const hasValue = getValueElements(element).length !== 0;
  return hasValue ? `${getValueElements(element).map((val) => val.textContent ?? "").join(", ")}` : "-";
}
function renderFields(element, instanceElement, ancestors, nsdoc) {
  const iedElement = findElement(ancestors, "IED");
  const accessPointElement = findElement(ancestors, "AccessPoint");
  const lDeviceElement = findElement(ancestors, "LDevice");
  const logicalNodeElement = findLogicaNodeElement(ancestors);
  const doElement = findElement(ancestors, "DO");
  const doTypeElement = findDOTypeElement(doElement);
  return [
    html`
      <mwc-textarea
        label="${translate("iededitor.wizard.nsdocDescription")}"
        value="${nsdoc.getDataDescription(element, ancestors).label}"
        rows="3"
        cols="50"
        id="nsdocDescription"
        readonly
        disabled
      >
      </mwc-textarea>
    `,
    html`
      <mwc-textfield
        label="${translate("iededitor.wizard.daName")}"
        value="${getNameAttribute(element) ?? "-"}"
        id="daName"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${translate("iededitor.wizard.daiDescription")}"
        value="${instanceElement ? getDescriptionAttribute(instanceElement) ?? "-" : "-"}"
        id="daiDescription"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${translate("iededitor.wizard.daFc")}"
        value="${element.getAttribute("fc") ?? "-"}"
        id="daFc"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${translate("iededitor.wizard.daBType")}"
        value="${element.getAttribute("bType") ?? "-"}"
        id="daBType"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${translate("iededitor.wizard.daValue")}"
        value="${instanceElement ? getValues(instanceElement) : getValues(element)}"
        id="daValue"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html` <br /> `,
    html`
      <mwc-textfield
        label="${translate("iededitor.wizard.doName")}"
        value="${doElement ? getNameAttribute(doElement) ?? "-" : "-"}"
        id="doName"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${translate("iededitor.wizard.doCdc")}"
        value="${doTypeElement?.getAttribute("cdc") ?? "-"}"
        id="doCdc"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html` <br /> `,
    html`
      <mwc-textfield
        label="${translate("iededitor.wizard.lnPrefix")}"
        value="${logicalNodeElement ? logicalNodeElement.getAttribute("prefix") ?? "-" : "-"}"
        id="lnPrefix"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${translate("iededitor.wizard.lnDescription")}"
        value="${logicalNodeElement ? nsdoc.getDataDescription(logicalNodeElement, ancestors).label : "-"}"
        id="lnPrefix"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${translate("iededitor.wizard.lnInst")}"
        value="${logicalNodeElement ? getInstanceAttribute(logicalNodeElement) ?? "-" : "-"}"
        id="lnInst"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html` <br /> `,
    html`
      <mwc-textfield
        label="${translate("iededitor.wizard.lDevice")}"
        value="${lDeviceElement ? getNameAttribute(lDeviceElement) ?? getInstanceAttribute(lDeviceElement) ?? "-" : "-"}"
        id="lDevice"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${translate("iededitor.wizard.accessPoint")}"
        value="${accessPointElement ? getNameAttribute(accessPointElement) ?? "-" : "-"}"
        id="accessPoint"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${translate("iededitor.wizard.ied")}"
        value="${iedElement ? getNameAttribute(iedElement) ?? "-" : "-"}"
        id="ied"
        readonly
        disabled
      >
      </mwc-textfield>
    `
  ];
}
export function createDaInfoWizard(element, instanceElement, ancestors, nsdoc) {
  return [
    {
      title: get("iededitor.wizard.daTitle"),
      content: [...renderFields(element, instanceElement, ancestors, nsdoc)]
    }
  ];
}
