import { get } from 'lit-translate';

import {
  ComplexAction,
  EditorAction,
  identity,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInput,
} from '../foundation.js';

import { renderGseSmvAddress, updateAddress } from './address.js';

import { Checkbox } from '@material/mwc-checkbox';
import {
  editSampledValueControlWizard,
  openEditSampledValueControlWizardAction,
} from './sampledvaluecontrol.js';

function getControlBlock(element: Element): Element | null {
  const iedName = element.closest('ConnectedAP')?.getAttribute('iedName');
  const apName = element.closest('ConnectedAP')?.getAttribute('apName');
  const ldInst = element.getAttribute('ldInst');
  const cbName = element.getAttribute('cbName');

  return element.ownerDocument.querySelector(
    `IED[name="${iedName}"] > AccessPoint[name="${apName}"] ` +
      ` LDevice[inst="${ldInst}"] SampledValueControl[name="${cbName}"]`
  );
}

export function updateSmvAction(element: Element): WizardActor {
  return (inputs: WizardInput[], wizard: Element): WizardAction[] => {
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

    const parent = getControlBlock(element);
    if (!parent) return [complexAction];

    const openEditSmvCbWizard = () => editSampledValueControlWizard(parent);
    return [complexAction, openEditSmvCbWizard];
  };
}

export function editSmvWizard(element: Element): Wizard {
  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      element,
      secondary: {
        icon: '',
        label: get('back'),
        action: openEditSampledValueControlWizardAction(
          getControlBlock(element)
        ),
      },
      primary: {
        label: get('save'),
        icon: 'edit',
        action: updateSmvAction(element),
      },
      content: [...renderGseSmvAddress(element)],
    },
  ];
}
