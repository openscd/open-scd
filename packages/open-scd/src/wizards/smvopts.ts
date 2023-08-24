import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import {
  cloneElement,
  getValue,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';

interface ContentOptions {
  refreshTime: string | null;
  sampleRate: string | null;
  dataSet: string | null;
  security: string | null;
  synchSourceId: string | null;
}

export function contentSmvOptsWizard(option: ContentOptions): TemplateResult[] {
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

function updateSmvOptsAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): WizardAction[] => {
    const attributes: Record<string, string | null> = {};
    const attributeKeys = [
      'refreshTime',
      'sampleRate',
      'dataSet',
      'security',
      'synchSourceId',
    ];
    attributeKeys.forEach(key => {
      attributes[key] = getValue(inputs.find(i => i.label === key)!);
    });

    if (
      !attributeKeys.some(key => attributes[key] !== element.getAttribute(key))
    )
      return [];

    const newElement = cloneElement(element, attributes);
    return [{ old: { element }, new: { element: newElement } }];
  };
}

export function editSmvOptsWizard(element: Element): Wizard {
  const [refreshTime, sampleRate, dataSet, security, synchSourceId] = [
    'refreshTime',
    'sampleRate',
    'dataSet',
    'security',
    'synchSourceId',
  ].map(smvopt => element.getAttribute(smvopt));

  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      element,
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateSmvOptsAction(element),
      },
      content: [
        ...contentSmvOptsWizard({
          refreshTime,
          sampleRate,
          dataSet,
          security,
          synchSourceId,
        }),
      ],
    },
  ];
}
