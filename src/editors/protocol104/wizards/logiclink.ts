import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import '../../../wizard-textfield.js';
import {
  pTypesLogicLink104,
  typeDescriptiveNameKeys,
  typePattern,
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
import { ifDefined } from 'lit-html/directives/if-defined';
import { typeMaxLength } from '../../../wizards/foundation/p-types.js';
import { createCreateTextField } from './foundation.js';

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
          pType => html`${createEditTextField(parent, pType, rGNumber, lLNumber)}`
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
          pType => html`${createCreateTextField(pType)}`
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
      actions: [{
        old: {
          parent: addressElement!,
          element: addressElement!.querySelector(`P[type="RG${rGNumber}-LL${lLNumber}-IP"]`)! 
        }
      },{
        old: {
          parent: addressElement!,
          element: addressElement!.querySelector(`P[type="RG${rGNumber}-LL${lLNumber}-IP-SUBNET"]`)!
        }
      }],
      title: get('protocol104.network.logicLink.wizard.removedLogicLink', {
        subNetworkName: parent.parentElement!.getAttribute('name')!,
        apName: parent.getAttribute('apName')!,
        iedName:  parent.getAttribute('iedName')!
      }),
    };
    
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

      if (inputValue !== elementOriginal?.textContent) {
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
          title: get('protocol104.network.logicLink.wizard.edittedLogicLink', {
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
    const addressParent = parent.querySelector('Address')!;
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
          parent: addressParent,
          element: element,
        }
      });
    });

    return [complexAction];
  };
}

/**
 * Create a wizard-textfield element for the Edit wizard.
 * @param parent - The parent element of the P to create. 
 * @param pType - The type of P a Text Field has to be created for.
 * @param rGNumber - The Redundancy Group number of the Text Field used in the type.
 * @param lLNumber - The Logic Link Group number of the Text Field used in the type.
 * @returns - A Text Field created for a specific type for the Edit wizard.
 */
function createEditTextField(parent: Element, pType: string, rGNumber: number, lLNumber: number): TemplateResult {
  return html`<wizard-textfield
    required
    label="${pType}"
    pattern="${ifDefined(typePattern[pType])}"
    .maybeValue=${parent.querySelector(
      `Address > P[type$="RG${rGNumber}-LL${lLNumber}-${pType}"]`
    )?.innerHTML ?? null}
    maxLength="${ifDefined(typeMaxLength[pType])}"
    helper="${translate(typeDescriptiveNameKeys[pType])}"
  ></wizard-textfield>`
}
