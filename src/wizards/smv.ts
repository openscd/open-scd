import { get } from 'lit-translate';

import {
  ComplexAction,
  EditorAction,
  identity,
  Wizard,
  WizardActor,
  WizardInput,
} from '../foundation.js';

import { renderGseSmvAddress, updateAddress } from './address.js';

import { Checkbox } from '@material/mwc-checkbox';

export function updateSmvAction(element: Element): WizardActor {
  return (inputs: WizardInput[], wizard: Element): EditorAction[] => {
    const complexAction: ComplexAction = {
      actions: [],
      title: get('smv.action.addaddress', {
        identity: identity(element),
      }),
    };

    const instType: boolean =
      (<Checkbox>wizard.shadowRoot?.querySelector('#instType'))?.checked ??
      false;
    const addressActions = updateAddress(element, inputs, instType);

    addressActions.forEach(action => {
      complexAction.actions.push(action);
    });

    return [complexAction];
  };
}

export function editSmvWizard(element: Element): Wizard {
  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      element,
      primary: {
        label: get('save'),
        icon: 'edit',
        action: updateSmvAction(element),
      },
      content: [...renderGseSmvAddress(element)],
    },
  ];
}
