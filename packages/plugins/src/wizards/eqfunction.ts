import { get } from 'lit-translate';

import {
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '@openscd/open-scd/src/foundation.js';

import {
  cloneElement,
  createElement,
  getChildElementsByTagName,
} from '@openscd/xml';

import { SimpleAction } from '@openscd/core/foundation/deprecated/editor.js';
import { contentFunctionWizard } from './function.js';

function updateEqFunctionAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): SimpleAction[] => {
    const functionAttrs: Record<string, string | null> = {};
    const functionKeys = ['name', 'desc', 'type'];
    functionKeys.forEach(key => {
      functionAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    if (
      functionKeys.some(key => functionAttrs[key] !== element.getAttribute(key))
    ) {
      const newElement = cloneElement(element, functionAttrs);
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

export function editEqFunctionWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const type = element.getAttribute('type');
  const reservedNames: string[] = getChildElementsByTagName(
    element.parentElement!,
    'EqFunction'
  )
    .filter(sibling => sibling !== element)
    .map(sibling => sibling.getAttribute('name')!);

  return [
    {
      title: get('wizard.title.edit', { tagName: 'EqFunction' }),
      element: element,
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateEqFunctionAction(element),
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
