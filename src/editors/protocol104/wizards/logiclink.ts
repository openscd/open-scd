import { html } from 'lit-element';
import { get } from 'lit-translate';

import '../../../wizard-textfield.js';
import {
  pTypesLogicLink104
} from '../foundation/p-types.js';
import {
  cloneElement,
  ComplexAction,
  createElement,
  EditorAction,
  getValue,
  newActionEvent,
  newWizardEvent,
  SimpleAction,
  Wizard,
  WizardActor,
  WizardInputElement,
  WizardMenuActor
} from '../../../foundation.js';
import { createNetworkTextField } from '../foundation/foundation.js';

export function editLogicLinkWizard(parent: Element, rGNumber: number, lLNumber: number): Wizard {
  return [
    {
      title: get('protocol104.network.logicLink.wizard.title.edit'),
      menuActions: [
        {
          icon: 'delete',
          label: get('remove'),
          action: remove(parent, rGNumber, lLNumber),
        },
      ],
      primary: {
        icon: 'save',
        label: get('save'), 
        action: editLogicLinkAction(parent, rGNumber, lLNumber),
      },
      content: [
        html`<wizard-textfield
          readOnly
          label="${get('protocol104.network.logicLink.wizard.logicLinkNumberLabel')}"
          .maybeValue=${lLNumber}
        ></wizard-textfield>
        ${pTypesLogicLink104.map(
          pType => html`${createNetworkTextField(pType, parent.querySelector(
            `Address > P[type$="RG${rGNumber}-LL${lLNumber}-${pType}"]`
          )?.innerHTML)}`
        )}`
      ],
    },
  ];
}

export function createLogicLinkWizard(parent: Element, rGNumber: number, occupiedLLNumbers: number[]): Wizard {
  // Calculate the first available number for the Logic Link group.
  let lLNumber = 1;
  while (occupiedLLNumbers.find(n => n == lLNumber)) {
    lLNumber++;
  }

  return [
    {
      title: get('protocol104.network.logicLink.wizard.title.add'),
      primary: {
        icon: '',
        label: get('save'),
        action: addLogicLinkAction(parent, rGNumber, lLNumber),
      },
      content: [
        html`<wizard-textfield
          readOnly
          label="${get('protocol104.network.logicLink.wizard.logicLinkNumberLabel')}"
          value="${lLNumber}"
        ></wizard-textfield>
        ${pTypesLogicLink104.map(
          pType => html`${createNetworkTextField(pType)}`
        )}`
      ],
    },
  ];
}

/**
 * Remove all P elements belonging to a single Logic Link group.
 * @param parent - The parent element of the P elements to remove.
 * @param rGNumber - The Redundancy Group number of all the P elements to remove.
 * @param lLNumber - The Logic Link Group number of all the P elements to remove.
 * @returns - Removing all P elements belonging to a Logic Link group.
 */
function remove(parent: Element, rGNumber: number, lLNumber: number): WizardMenuActor {
  return (wizard: Element): void => {
    const addressElement = parent.querySelector('Address');

    const complexAction: ComplexAction = {
      actions: [],
      title: get('protocol104.network.logicLink.wizard.removedLogicLink', {
        subNetworkName: parent.parentElement!.getAttribute('name')!,
        apName: parent.getAttribute('apName')!,
        iedName:  parent.getAttribute('iedName')!
      }),
    };
    
    addressElement!.querySelectorAll(`P[type^="RG${rGNumber}-LL${lLNumber}-"]`).forEach(p => {
      complexAction.actions.push({
        old: {
          parent: addressElement!,
          element: p!
        }
      });
    });
    
    wizard.dispatchEvent(newActionEvent(complexAction));
    wizard.dispatchEvent(newWizardEvent());
  };
}

function editLogicLinkAction(parent: Element, rGNumber: number, lLNumber: number): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const actions: SimpleAction[] = [];

    pTypesLogicLink104.forEach(type => {
      const inputValue = getValue(inputs.find(i => i.label === type)!)!;
      const elementOriginal = parent.querySelector(`Address > P[type="RG${rGNumber}-LL${lLNumber}-${type}"]`);

      if (elementOriginal == null) {
        const element = createElement(parent.ownerDocument, 'P', {
          type: `RG${rGNumber}-LL${lLNumber}-${type}`
        });
        element.textContent = getValue(inputs.find(i => i.label === type)!)!;
        
        actions.push({
          new: {
            parent: parent.querySelector('Address')!,
            element: element,
          }
        });
      } else if (inputValue !== elementOriginal?.textContent) {
        const elementClone = cloneElement(elementOriginal!, {});
        elementClone.textContent = inputValue;

        actions.push({
          old: {
            element: elementOriginal!
          },
          new: {
            element: elementClone
          }
        });
      }
    });

    return actions.length != 0
      ? [{
          actions,
          title: get('protocol104.network.logicLink.wizard.editedLogicLink', {
            subNetworkName: parent.parentElement!.getAttribute('name')!,
            apName: parent.getAttribute('apName')!,
            iedName:  parent.getAttribute('iedName')!
          }),
        }]
      : [];
  };
}

function addLogicLinkAction(parent: Element, rGNumber: number, lLNumber: number): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const complexAction: ComplexAction = {
      actions: [],
      title: get('protocol104.network.logicLink.wizard.addedLogicLink', {
        subNetworkName: parent.parentElement!.getAttribute('name')!,
        apName: parent.getAttribute('apName')!,
        iedName:  parent.getAttribute('iedName')!
      }),
    };

    pTypesLogicLink104.forEach(type => {
      const element = createElement(parent.ownerDocument, 'P', {
        type: `RG${rGNumber}-LL${lLNumber}-${type}`
      });
      element.textContent = getValue(inputs.find(i => i.label === type)!)!;
      
      complexAction.actions.push({
        new: {
          parent: parent.querySelector('Address')!,
          element: element,
        }
      });
    });

    return [complexAction];
  };
}
