import { get } from 'lit-translate';

import {
  cloneElement,
  createElement,
  getChildElementsByTagName,
  getValue,
  SimpleAction,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';
import { contentFunctionWizard } from './function.js';

function updateSubFunctionAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): SimpleAction[] => {
    const subfunctionAttrs: Record<string, string | null> = {};
    const subFunctionKeys = ['name', 'desc', 'type'];
    subFunctionKeys.forEach(key => {
      subfunctionAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    if (
      subFunctionKeys.some(
        key => subfunctionAttrs[key] !== element.getAttribute(key)
      )
    ) {
      const newElement = cloneElement(element, subfunctionAttrs);
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

export function editSubFunctionWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const type = element.getAttribute('type');
  const reservedNames: string[] = getChildElementsByTagName(
    element.parentElement!,
    'SubFunction'
  )
    .filter(sibling => sibling !== element)
    .map(sibling => sibling.getAttribute('name')!);

  return [
    {
      title: get('wizard.title.edit', { tagName: 'SubFunction' }),
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateSubFunctionAction(element),
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

function createSubFunctionAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]) => {
    const subFunctionAttrs: Record<string, string | null> = {};
    const subFunctionKeys = ['name', 'desc', 'type'];
    subFunctionKeys.forEach(key => {
      subFunctionAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const subFunction = createElement(
      parent.ownerDocument,
      'SubFunction',
      subFunctionAttrs
    );

    return [{ new: { parent, element: subFunction } }];
  };
}

export function createSubFunctionWizard(parent: Element): Wizard {
  const name = '';
  const desc = null;
  const type = null;
  const reservedNames = Array.from(parent.querySelectorAll('SubFunction')).map(
    fUnction => fUnction.getAttribute('name')!
  );

  return [
    {
      title: get('wizard.title.add', { tagName: 'SubFunction' }),
      primary: {
        icon: 'save',
        label: get('save'),
        action: createSubFunctionAction(parent),
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
