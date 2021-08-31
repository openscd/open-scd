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
  editSampledValueControlWizard,
  openEditSampledValueControlWizardAction,
} from './sampledvaluecontrol.js';

export function updateSmvOptsAction(element: Element): WizardActor {
  return (inputs: WizardInput[]): WizardAction[] => {
    const refreshTime = getValue(inputs.find(i => i.label === 'refreshTime')!);
    const sampleSynchronized = getValue(
      inputs.find(i => i.label === 'sampleSynchronized')!
    );
    const sampleRate = getValue(inputs.find(i => i.label === 'sampleRate')!);
    const dataSet = getValue(inputs.find(i => i.label === 'dataSet')!);
    const security = getValue(inputs.find(i => i.label === 'security')!);
    const timestamp = getValue(inputs.find(i => i.label === 'timestamp')!);
    const synchSourceId = getValue(
      inputs.find(i => i.label === 'synchSourceId')!
    );

    if (
      refreshTime === element.getAttribute('refreshTime') &&
      sampleSynchronized === element.getAttribute('sampleSynchronized') &&
      sampleRate === element.getAttribute('sampleRate') &&
      dataSet === element.getAttribute('dataSet') &&
      security === element.getAttribute('security') &&
      timestamp === element.getAttribute('timestamp') &&
      synchSourceId === element.getAttribute('synchSourceId')
    )
      return [];

    const newElement = cloneElement(element, {
      refreshTime,
      sampleSynchronized,
      sampleRate,
      dataSet,
      security,
      timestamp,
      synchSourceId,
    });

    const parent = element.parentElement!;
    const openEditSmvCbWizard = () => editSampledValueControlWizard(parent);

    return [
      { old: { element }, new: { element: newElement } },
      openEditSmvCbWizard,
    ];
  };
}

export function editSmvOptsWizard(element: Element): Wizard {
  const optFields = [
    'refreshTime',
    'sampleSynchronized',
    'sampleRate',
    'dataSet',
    'security',
    'timestamp',
    'synchSourceId',
  ];

  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      element,
      secondary: {
        icon: '',
        label: 'back',
        action: openEditSampledValueControlWizardAction(element.parentElement!),
      },
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateSmvOptsAction(element),
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
