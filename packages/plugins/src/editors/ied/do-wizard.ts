import { html } from 'lit-element';
import { TemplateResult } from 'lit-html';
import { get } from 'lit-translate';

import '@material/mwc-textarea';
import '@material/mwc-textfield';

import {
  getDescriptionAttribute,
  getInstanceAttribute,
  getNameAttribute,
  Wizard,
} from '@openscd/open-scd/src/foundation.js';
import { Nsdoc } from '@openscd/open-scd/src/foundation/nsdoc.js';
import {
  findDOTypeElement,
  findElement,
  findLogicalNodeElement,
} from './foundation.js';

function renderFields(
  element: Element,
  instanceElement: Element | undefined,
  ancestors: Element[],
  nsdoc: Nsdoc
): TemplateResult[] {
  const iedElement = findElement(ancestors, 'IED');
  const accessPointElement = findElement(ancestors, 'AccessPoint');
  const lDeviceElement = findElement(ancestors, 'LDevice');
  const logicalNodeElement = findLogicalNodeElement(ancestors);
  const doTypeElement = findDOTypeElement(element);

  return [
    html`
      <mwc-textarea
        label="${get('iededitor.wizard.nsdocDescription')}"
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
        label="${get('iededitor.wizard.doName')}"
        value="${getNameAttribute(element) ?? '-'}"
        id="doName"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${get('iededitor.wizard.doiDescription')}"
        value="${instanceElement
          ? getDescriptionAttribute(instanceElement) ?? '-'
          : '-'}"
        id="doiDescription"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${get('iededitor.wizard.doCdc')}"
        value="${doTypeElement?.getAttribute('cdc') ?? '-'}"
        id="doCdc"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html` <br /> `,
    html`
      <mwc-textfield
        label="${get('iededitor.wizard.lnPrefix')}"
        value="${logicalNodeElement
          ? logicalNodeElement.getAttribute('prefix') ?? '-'
          : '-'}"
        id="ln"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${get('scl.lnClass')}"
        value="${logicalNodeElement
          ? nsdoc.getDataDescription(logicalNodeElement, ancestors).label
          : '-'}"
        id="lnPrefix"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${get('iededitor.wizard.lnInst')}"
        value="${logicalNodeElement
          ? getInstanceAttribute(logicalNodeElement) ?? '-'
          : '-'}"
        id="lnInst"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html` <br /> `,
    html`
      <mwc-textfield
        label="${get('iededitor.wizard.lDevice')}"
        value="${lDeviceElement
          ? getNameAttribute(lDeviceElement) ??
            getInstanceAttribute(lDeviceElement) ??
            '-'
          : '-'}"
        id="lDevice"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${get('iededitor.wizard.accessPoint')}"
        value="${accessPointElement
          ? getNameAttribute(accessPointElement) ?? '-'
          : '-'}"
        id="accessPoint"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${get('iededitor.wizard.ied')}"
        value="${iedElement ? getNameAttribute(iedElement) ?? '-' : '-'}"
        id="ied"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
  ];
}

export function createDoInfoWizard(
  element: Element,
  instanceElement: Element | undefined,
  ancestors: Element[],
  nsdoc: Nsdoc
): Wizard {
  return [
    {
      title: get('iededitor.wizard.doTitle'),
      content: [...renderFields(element, instanceElement, ancestors, nsdoc)],
    },
  ];
}
