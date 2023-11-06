import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import '@material/mwc-list/mwc-list-item';

import '../wizard-checkbox.js';
import '../wizard-select.js';
import {
  cloneElement,
  getValue,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';

interface ContentOptions {
  seqNum: string | null;
  timeStamp: string | null;
  dataSet: string | null;
  reasonCode: string | null;
  dataRef: string | null;
  entryID: string | null;
  configRef: string | null;
  bufOvfl: string | null;
}

export function contentOptFieldsWizard(
  option: ContentOptions
): TemplateResult[] {
  return Object.entries(option).map(
    ([key, value]) =>
      html`<wizard-checkbox
        label="${key}"
        .maybeValue=${value}
        nullable
        helper="${translate(`scl.${key}`)}"
      ></wizard-checkbox>`
  );
}

function updateOptFieldsAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): WizardAction[] => {
    const seqNum = getValue(inputs.find(i => i.label === 'seqNum')!);
    const timeStamp = getValue(inputs.find(i => i.label === 'timeStamp')!);
    const dataSet = getValue(inputs.find(i => i.label === 'dataSet')!);
    const reasonCode = getValue(inputs.find(i => i.label === 'reasonCode')!);
    const dataRef = getValue(inputs.find(i => i.label === 'dataRef')!);
    const entryID = getValue(inputs.find(i => i.label === 'entryID')!);
    const configRef = getValue(inputs.find(i => i.label === 'configRef')!);
    const bufOvfl = getValue(inputs.find(i => i.label === 'bufOvfl')!);

    if (
      seqNum === element.getAttribute('seqNum') &&
      timeStamp === element.getAttribute('timeStamp') &&
      dataSet === element.getAttribute('dataSet') &&
      reasonCode === element.getAttribute('reasonCode') &&
      dataRef === element.getAttribute('dataRef') &&
      entryID === element.getAttribute('entryID') &&
      configRef === element.getAttribute('configRef') &&
      bufOvfl === element.getAttribute('bufOvfl')
    )
      return [];

    const newElement = cloneElement(element, {
      seqNum,
      timeStamp,
      dataSet,
      reasonCode,
      dataRef,
      entryID,
      configRef,
      bufOvfl,
    });

    return [{ old: { element }, new: { element: newElement } }];
  };
}

export function editOptFieldsWizard(element: Element): Wizard {
  const [
    seqNum,
    timeStamp,
    dataSet,
    reasonCode,
    dataRef,
    entryID,
    configRef,
    bufOvfl,
  ] = [
    'seqNum',
    'timeStamp',
    'dataSet',
    'reasonCode',
    'dataRef',
    'entryID',
    'configRef',
    'bufOvfl',
  ].map(optField => element.getAttribute(optField));

  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateOptFieldsAction(element),
      },
      content: contentOptFieldsWizard({
        seqNum,
        timeStamp,
        dataSet,
        reasonCode,
        dataRef,
        entryID,
        configRef,
        bufOvfl,
      }),
    },
  ];
}
