import { html, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';
import { DaiValidationTypes, getCustomField } from '../editors/ied/foundation/foundation.js';

import {
  cloneElement,
  ComplexAction,
  EditorAction,
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';

export function updateValue(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    // const name = getValue(inputs.find(i => i.label === 'name')!)!;
    // const oldName = element.getAttribute('name');
    // const desc = getValue(inputs.find(i => i.label === 'desc')!);

    // if ( name === oldName &&
    //      desc === element.getAttribute('desc')) {
    //   return [];
    // }

    // const complexAction: ComplexAction = {
    //   actions: [],
    //   title: get('dai.action.updatedai', {daiName: name}),
    // };

    // const newElement = cloneElement(element, { name, desc });
    // complexAction.actions.push({ old: { element }, new: { element: newElement } });
    // return complexAction.actions.length ? [complexAction] : [];

    return [];
  };
}


  // -    const oldVal = this.element.querySelector('Val');
  // -    const newVal = <Element>oldVal?.cloneNode(false);
  // -    newVal.textContent = this.value;
  // -
  // -    const inputAction: Replace = {
  // -      old: {
  // -        element: oldVal!
  // -      },
  // -      new: {
  // -        element: newVal
  // -      },
  // -    };
  // -    this.dispatchEvent(newActionEvent({ title: 'Replace', actions: [inputAction] }));


export function renderDAIWizard(
  element: Element,
  instanceElement?: Element
): TemplateResult[] {
  const bType = element.getAttribute('bType')!;
  const value = instanceElement!.querySelector('Val')?.textContent?.trim() ?? '';

  return [
    html`${getCustomField()[<DaiValidationTypes>bType].render(value)}`,
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
        action: updateValue(element),
      },
      content: renderDAIWizard(
        element,
        instanceElement
      ),
    },
  ];
}
