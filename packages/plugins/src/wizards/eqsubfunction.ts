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

function updateEqSubFunctionAction(element: Element): WizardActor {
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

export function editEqSubFunctionWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const type = element.getAttribute('type');
  const reservedNames: string[] = getChildElementsByTagName(
    element.parentElement!,
    'EqSubFunction'
  )
    .filter(sibling => sibling !== element)
    .map(sibling => sibling.getAttribute('name')!);

  return [
    {
      title: get('wizard.title.edit', { tagName: 'EqSubFunction' }),
      element: element,
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateEqSubFunctionAction(element),
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

function createEqSubFunctionAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]) => {
    const eqSubFunctionAttrs: Record<string, string | null> = {};
    const eqSubFunctionKeys = ['name', 'desc', 'type'];
    eqSubFunctionKeys.forEach(key => {
      eqSubFunctionAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const eqSubFunction = createElement(
      parent.ownerDocument,
      'EqSubFunction',
      eqSubFunctionAttrs
    );

    return [{ new: { parent, element: eqSubFunction } }];
  };
}

export function createEqSubFunctionWizard(parent: Element): Wizard {
  const name = '';
  const desc = null;
  const type = null;
  const reservedNames = Array.from(
    parent.querySelectorAll('EqSubFunction')
  ).map(eqSubFunction => eqSubFunction.getAttribute('name')!);

  return [
    {
      title: get('wizard.title.add', { tagName: 'EqSubFunction' }),
      primary: {
        icon: 'save',
        label: get('save'),
        action: createEqSubFunctionAction(parent),
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
