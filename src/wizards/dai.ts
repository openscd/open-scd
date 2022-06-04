import { html, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';
import { DaiValidationTypes, getCustomField } from '../editors/ied/foundation/foundation.js';

import {
  ComplexAction,
  EditorAction,
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';

export function updateValue(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const newValue = getValue(inputs.find(i => i.value)!)!;
    const name = element.getAttribute('name');

    const oldVal = element.querySelector('Val')!;

    const complexAction: ComplexAction = {
      actions: [],
      title: get('dai.action.updatedai', {daiName: name!}),
    };

    const newVal = <Element>oldVal.cloneNode(false);
    newVal.textContent = newValue;

    complexAction.actions.push({ old: { element: oldVal }, new: { element: newVal } });
    return [complexAction];
  };
}

export function renderDAIWizard(
  element: Element,
  instanceElement?: Element
): TemplateResult[] {
  const bType = element.getAttribute('bType')!;

  return [
    html`${getCustomField()[<DaiValidationTypes>bType].render(element, instanceElement)}`,
  ];
}

export function editDAIWizard(element: Element, instanceElement?: Element): Wizard {
  return [
    {
      title: get('dai.wizard.title.edit', {
        daiName: instanceElement?.getAttribute('name') ?? ''
      }),
      element: instanceElement,
      primary: {
        icon: 'edit',
        label: get('save'),
        action: updateValue(instanceElement!),
      },
      content: renderDAIWizard(
        element,
        instanceElement
      ),
    },
  ];
}
