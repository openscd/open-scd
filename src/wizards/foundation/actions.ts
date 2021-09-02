import {
  cloneElement,
  EditorAction,
  getValue,
  WizardActor,
  WizardInput,
} from '../../foundation.js';

export function updateNamingAction(element: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);

    if (
      name === element.getAttribute('name') &&
      desc === element.getAttribute('desc')
    )
      return [];

    const newElement = cloneElement(element, { name, desc });

    return [{ old: { element }, new: { element: newElement } }];
  };
}
