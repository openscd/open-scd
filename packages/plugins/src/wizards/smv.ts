import { get } from 'lit-translate';

import { Checkbox } from '@material/mwc-checkbox';

import {
  getValue,
  identity,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInputElement,
} from '@openscd/open-scd/src/foundation.js';
import { ComplexAction } from '@openscd/core/foundation/deprecated/editor.js';
import { contentGseOrSmvWizard, updateAddress } from './address.js';

export function updateSmvAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[], wizard: Element): WizardAction[] => {
    const complexAction: ComplexAction = {
      actions: [],
      title: get('smv.action.addaddress', {
        identity: identity(element),
      }),
    };

    const instType: boolean = (<Checkbox>(
      wizard.shadowRoot?.querySelector('#instType')
    ))?.checked;

    const addressContent: Record<string, string | null> = {};
    addressContent['MAC-Address'] = getValue(
      inputs.find(i => i.label === 'MAC-Address')!
    );
    addressContent['APPID'] = getValue(inputs.find(i => i.label === 'APPID')!);
    addressContent['VLAN-ID'] = getValue(
      inputs.find(i => i.label === 'VLAN-ID')!
    );
    addressContent['VLAN-PRIORITY'] = getValue(
      inputs.find(i => i.label === 'VLAN-PRIORITY')!
    );

    const addressActions = updateAddress(element, addressContent, instType);
    if (!addressActions.length) return [];

    addressActions.forEach(action => {
      complexAction.actions.push(action);
    });

    return [complexAction];
  };
}

export function editSMvWizard(element: Element): Wizard {
  const hasInstType = Array.from(element.querySelectorAll('Address > P')).some(
    pType => pType.getAttribute('xsi:type')
  );

  const attributes: Record<string, string | null> = {};

  ['MAC-Address', 'APPID', 'VLAN-ID', 'VLAN-PRIORITY'].forEach(key => {
    if (!attributes[key])
      attributes[key] =
        element.querySelector(`Address > P[type="${key}"]`)?.innerHTML.trim() ??
        null;
  });
  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      element,
      primary: {
        label: get('save'),
        icon: 'edit',
        action: updateSmvAction(element),
      },
      content: [...contentGseOrSmvWizard({ hasInstType, attributes })],
    },
  ];
}
