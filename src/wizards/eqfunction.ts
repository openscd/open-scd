import { get } from 'lit-translate';

import {
  createElement,
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';
import { contentFunctionWizard } from './function.js';

function createEqFunctionAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]) => {
    const eqFunctionAttrs: Record<string, string | null> = {};
    const eqFunctionKeys = ['name', 'desc', 'type'];
    eqFunctionKeys.forEach(key => {
      eqFunctionAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const eqFunction = createElement(
      parent.ownerDocument,
      'EqFunction',
      eqFunctionAttrs
    );

    return [{ new: { parent, element: eqFunction } }];
  };
}

export function createEqFunctionWizard(parent: Element): Wizard {
  const name = '';
  const desc = null;
  const type = null;
  const reservedNames = Array.from(parent.querySelectorAll('EqFunction')).map(
    fUnction => fUnction.getAttribute('name')!
  );

  return [
    {
      title: get('wizard.title.add', { tagName: 'EqFunction' }),
      primary: {
        icon: 'save',
        label: get('save'),
        action: createEqFunctionAction(parent),
      },
      content: [
        ...contentFunctionWizard({
          name,
          desc,
          type,
          reservedNames,
        }),
      ],
    },
  ];
}
