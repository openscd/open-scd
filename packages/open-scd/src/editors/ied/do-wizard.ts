import { html } from 'lit-element';
import { TemplateResult } from 'lit-html';
import { get, translate } from 'lit-translate';

import '@material/mwc-textarea';
import '@material/mwc-textfield';

import {
  getDescriptionAttribute,
  getInstanceAttribute,
  getNameAttribute,
  newWizardEvent,
  Wizard,
} from '../../foundation.js';
import { Nsdoc } from '../../foundation/nsdoc.js';
import {
  findDOTypeElement,
  findElement,
  findLogicaNodeElement,
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
  const logicalNodeElement = findLogicaNodeElement(ancestors);
  const doTypeElement = findDOTypeElement(element);

  return [
    html`
      <mwc-textarea
        label="${translate('iededitor.wizard.nsdocDescription')}"
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
        label="${translate('iededitor.wizard.doName')}"
        value="${getNameAttribute(element) ?? '-'}"
        id="doName"
        readonly
        disabled
      >
      </mwc-textfield>
    `,
    html`
      <mwc-textfield
        label="${translate('iededitor.wizard.doiDescription')}"
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
        label="${translate('iededitor.wizard.doCdc')}"
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
        label="${translate('iededitor.wizard.lnPrefix')}"
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
        label="${translate('iededitor.wizard.lnDescription')}"
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
        label="${translate('iededitor.wizard.lnInst')}"
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
        label="${translate('iededitor.wizard.lDevice')}"
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
        label="${translate('iededitor.wizard.accessPoint')}"
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
        label="${translate('iededitor.wizard.ied')}"
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
