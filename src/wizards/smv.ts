import { get } from 'lit-translate';

import { Checkbox } from '@material/mwc-checkbox';

import {
  ComplexAction,
  identity,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInput,
} from '../foundation.js';
import { renderGseSmvAddress, updateAddress } from './address.js';

export function updateSmvAction(element: Element): WizardActor {
  return (inputs: WizardInput[], wizard: Element): WizardAction[] => {
    const complexAction: ComplexAction = {
      actions: [],
      title: get('smv.action.addaddress', {
        identity: identity(element),
      }),
    };

    const instType: boolean = (<Checkbox>(
      wizard.shadowRoot?.querySelector('#instType')
    ))?.checked;
    const addressActions = updateAddress(element, inputs, instType);
    if (!addressActions.length) return [];

    addressActions.forEach(action => {
      complexAction.actions.push(action);
    });

    return [complexAction];
  };
}

export function editSMvWizard(element: Element): Wizard {
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
