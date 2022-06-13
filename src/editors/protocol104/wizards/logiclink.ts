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
  createElement,
  EditorAction,
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
  WizardMenuActor
} from '../../../foundation.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { typeMaxLength, typeNullable } from '../../../wizards/foundation/p-types.js';

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
        action: createLogicLinkAction(parent, rGNumber, lLNumber),
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
export function remove(parent: Element, rGNumber: number, lLNumber: number): WizardMenuActor {
  return (): EditorAction[] => {
    const addressElement = parent.querySelector('Address');
    const ipElement = addressElement!.querySelector(`P[type="RG${rGNumber}-LL${lLNumber}-IP"]`);
    const ipSubnetElement = addressElement!.querySelector(`P[type="RG${rGNumber}-LL${lLNumber}-IP-SUBNET"]`);

    return [
      { old: { parent: addressElement!, element: ipElement! } },
      { old: { parent: addressElement!, element: ipSubnetElement! } }
    ];
  };
}

function createLogicLinkAction(parent: Element, rGNumber: number, lLNumber: number): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const addressParent = parent.querySelector('Address')!;

    const ipElement = createElement(parent.ownerDocument, 'P', {
      type: `RG${rGNumber}-LL${lLNumber}-IP`
    });
    ipElement.textContent = getValue(inputs.find(i => i.label === 'IP')!)!;

    const ipSubnetElement = createElement(parent.ownerDocument, 'P', {
      type: `RG${rGNumber}-LL${lLNumber}-IP-SUBNET`
    });
    ipSubnetElement.textContent = getValue(inputs.find(i => i.label === 'IP-SUBNET')!)!;

    return [
      {
        new: {
          parent: addressParent,
          element: ipElement,
        },
      },
      {
        new: {
          parent: addressParent,
          element: ipSubnetElement,
        },
      }
    ];
  };
}

function editLogicLinkAction(parent: Element, rGNumber: number, lLNumber: number): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const ipValue = getValue(inputs.find(i => i.label === 'IP')!)!;
    const ipElement = parent.querySelector(`Address > P[type="RG${rGNumber}-LL${lLNumber}-IP"]`);
    const ipSubnetValue = getValue(inputs.find(i => i.label === 'IP-SUBNET')!)!;
    const ipSubnetElement = parent.querySelector(`Address > P[type="RG${rGNumber}-LL${lLNumber}-IP-SUBNET"]`);

    if (
      ipValue === ipElement?.textContent &&
      ipSubnetValue === ipSubnetElement?.textContent
    ) {
      return [];
    }

    const ipElementClone = cloneElement(ipElement!, {});
    ipElementClone.textContent = ipValue;
    const ipSubnetElementClone = cloneElement(ipSubnetElement!, {});
    ipSubnetElementClone.textContent = ipSubnetValue;

    return [
      { old: { element: ipElement! }, new: { element: ipElementClone }, },
      { old: { element: ipSubnetElement! }, new: { element: ipSubnetElementClone }, }
    ];
  };
}

/**
 * Create a wizard-textfield element for the Create wizard.
 * @param pType - The type of P a Text Field has to be created for.
 * @returns - A Text Field created for a specific type for the Create wizard.
 */
function createCreateTextField(pType: string): TemplateResult {
  return html`<wizard-textfield
    required
    label="${pType}"
    pattern="${ifDefined(typePattern[pType])}"
    ?nullable=${typeNullable[pType]}
    maxLength="${ifDefined(typeMaxLength[pType])}"
    helper="${translate(typeDescriptiveNameKeys[pType])}"
  ></wizard-textfield>`
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
    ?nullable=${typeNullable[pType]}
    .maybeValue=${parent.querySelector(
      `Address > P[type$="RG${rGNumber}-LL${lLNumber}-${pType}"]`
    )?.innerHTML ?? null}
    maxLength="${ifDefined(typeMaxLength[pType])}"
    helper="${translate(typeDescriptiveNameKeys[pType])}"
  ></wizard-textfield>`
}
