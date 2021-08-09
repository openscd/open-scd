import { html } from 'lit-html';
import { get } from 'lit-translate';
import {
  cloneElement,
  getValue,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInput,
} from '../foundation.js';
import {
  editReportControlWizard,
  openEditReportControlWizardAction,
} from './reportcontrol.js';

export function updateOptFieldsAction(element: Element): WizardActor {
  return (inputs: WizardInput[]): WizardAction[] => {
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

    const parent = element.parentElement!;
    const openEditReportCbWizard = () => editReportControlWizard(parent);

    return [
      { old: { element }, new: { element: newElement } },
      openEditReportCbWizard,
    ];
  };
}

export function editOptFieldsWizard(element: Element): Wizard {
  const optFields = [
    'seqNum',
    'timeStamp',
    'dataSet',
    'reasonCode',
    'dataRef',
    'entryID',
    'configRef',
    'bufOvfl',
  ];

  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      secondary: {
        icon: '',
        label: get('back'),
        action: openEditReportControlWizardAction(element.parentElement!),
      },
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateOptFieldsAction(element),
      },
      content: optFields.map(
        optField =>
          html`<wizard-select
            label="${optField}"
            .maybeValue=${element.getAttribute(optField)}
            nullable
            required
            >${['true', 'false'].map(
              option =>
                html`<mwc-list-item value="${option}">${option}</mwc-list-item>`
            )}</wizard-select
          >`
      ),
    },
  ];
}
