import {html} from "../../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../../_snowpack/pkg/lit-translate.js";
import "../../../../_snowpack/pkg/@material/mwc-textarea.js";
import "../../../../_snowpack/pkg/@material/mwc-textfield.js";
import {
  getDescriptionAttribute,
  getInstanceAttribute,
  getNameAttribute
} from "../../../../openscd/src/foundation.js";
import {
  findDOTypeElement,
  findElement,
  findLogicaNodeElement
} from "./foundation.js";
function renderFields(element, instanceElement, ancestors, nsdoc) {
  const iedElement = findElement(ancestors, "IED");
  const accessPointElement = findElement(ancestors, "AccessPoint");
  const lDeviceElement = findElement(ancestors, "LDevice");
  const logicalNodeElement = findLogicaNodeElement(ancestors);
  const doTypeElement = findDOTypeElement(element);
  return [
    html`
      <mwc-textarea
        label="${get("iededitor.wizard.nsdocDescription")}"
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
        label="${get("iededitor.wizard.doName")}"
        value="${getNameAttribute(element) ?? "-"}"
        id="doName"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${get("iededitor.wizard.doiDescription")}"
        value="${instanceElement ? getDescriptionAttribute(instanceElement) ?? "-" : "-"}"
        id="doiDescription"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${get("iededitor.wizard.doCdc")}"
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
        label="${get("iededitor.wizard.lnPrefix")}"
        value="${logicalNodeElement ? logicalNodeElement.getAttribute("prefix") ?? "-" : "-"}"
        id="ln"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${get("scl.lnClass")}"
        value="${logicalNodeElement ? nsdoc.getDataDescription(logicalNodeElement, ancestors).label : "-"}"
        id="lnPrefix"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${get("iededitor.wizard.lnInst")}"
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
        label="${get("iededitor.wizard.lDevice")}"
        value="${lDeviceElement ? getNameAttribute(lDeviceElement) ?? getInstanceAttribute(lDeviceElement) ?? "-" : "-"}"
        id="lDevice"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${get("iededitor.wizard.accessPoint")}"
        value="${accessPointElement ? getNameAttribute(accessPointElement) ?? "-" : "-"}"
        id="accessPoint"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${get("iededitor.wizard.ied")}"
        value="${iedElement ? getNameAttribute(iedElement) ?? "-" : "-"}"
        id="ied"
        readonly
        disabled
      >
      </mwc-textfield>
    `
  ];
}
export function createDoInfoWizard(element, instanceElement, ancestors, nsdoc) {
  return [
    {
      title: get("iededitor.wizard.doTitle"),
      content: [...renderFields(element, instanceElement, ancestors, nsdoc)]
    }
  ];
}
