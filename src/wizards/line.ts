import { html, TemplateResult } from 'lit-html';
import { get, translate } from 'lit-translate';

import '../wizard-textfield.js';
import {
  cloneElement,
  ComplexAction,
  createElement,
  EditorAction,
  getMultiplier,
  getValue,
  patterns,
  SimpleAction,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';

import { updateReferences } from './foundation/references.js';

const initial = {
  nomFreq: '50',
  numPhases: '3',
  Voltage: '110',
  multiplier: 'k',
};

function render(
  name: string,
  desc: string | null,
  type: string | null,
  nomFreq: string | null,
  numPhases: string | null
): TemplateResult[] {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${translate('line.wizard.nameHelper')}"
      required
      validationMessage="${translate('textfield.required')}"
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${translate('line.wizard.descHelper')}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="type"
      .maybeValue=${type}
      disabled
      helper="${translate('line.wizard.typeHelper')}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="nomFreq"
      .maybeValue=${nomFreq}
      nullable
      helper="${translate('voltagelevel.wizard.nomFreqHelper')}"
      suffix="Hz"
      validationMessage="${translate('textfield.nonempty')}"
      pattern="${patterns.unsigned}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="numPhases"
      .maybeValue=${numPhases}
      nullable
      helper="${translate('voltagelevel.wizard.numPhaseHelper')}"
      suffix="#"
      validationMessage="${translate('textfield.nonempty')}"
      type="number"
      min="1"
      max="255"
    ></wizard-textfield>`,
  ];
}

function updateAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): SimpleAction[] => {
    const lineAttrs: Record<string, string | null> = {};
    const lineKeys = ['name', 'desc', 'type', 'nomFreq', 'numPhases'];
    lineKeys.forEach(key => {
      lineAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    if (lineKeys.some(key => lineAttrs[key] !== element.getAttribute(key))) {
      const newElement = cloneElement(element, lineAttrs);
      return [
        {
          old: { element },
          new: { element: newElement },
        },
      ];
    }
    return [];
  };
}

export function editLineWizard(element: Element): Wizard {
  return [
    {
      title: get('line.wizard.title.edit'),
      element,
      primary: {
        icon: 'edit',
        label: get('save'),
        action: updateAction(element),
      },
      content: render(
        element.getAttribute('name') ?? '',
        element.getAttribute('desc'),
        element.getAttribute('type'),
        element.getAttribute('nomFreq'),
        element.getAttribute('numPhases')
      ),
    },
  ];
}
