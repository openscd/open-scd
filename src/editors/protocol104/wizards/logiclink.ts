import { html, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import '../../../wizard-textfield.js';
import {
  pTypesLogicLink104,
  typePattern,
} from '../foundation/p-types.js';
import {
  cloneElement,
  EditorAction,
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
  WizardMenuActor
} from '../../../foundation.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { typeMaxLength, typeNullable } from '../../../wizards/foundation/p-types.js';

export function updateLogicLinkAction(parent: Element, redundancyGroupNumber: number, logicLinkNumber: number): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const ipValue = getValue(inputs.find(i => i.label === 'IP')!)!;
    const ipElement = parent.querySelector(`Address > P[type="RG${redundancyGroupNumber}-LL${logicLinkNumber}-IP"]`);
    const ipSubnetValue = getValue(inputs.find(i => i.label === 'IP-SUBNET')!)!;
    const ipSubnetElement = parent.querySelector(`Address > P[type="RG${redundancyGroupNumber}-LL${logicLinkNumber}-IP-SUBNET"]`);

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

export function createLogicLinkPTextField(element: Element, pType: string, redundancyGroupNumber: number, logicLinkNumber: number): TemplateResult {
  return html`<wizard-textfield
    required
    label="${pType}"
    pattern="${ifDefined(typePattern[pType])}"
    ?nullable=${typeNullable[pType]}
    .maybeValue=${element.querySelector(
      `Address > P[type$="RG${redundancyGroupNumber}-LL${logicLinkNumber}-${pType}"]`
    )?.innerHTML ?? null}
    maxLength="${ifDefined(typeMaxLength[pType])}"
  ></wizard-textfield>`
}

function remove(element: Element): WizardMenuActor {
  return (): EditorAction[] => {
    return [];
  };
}

export function editLogicLink104Wizard(element: Element, redundancyGroupNumber: number, logicLinkNumber: number): Wizard {
  return [
    {
      title: get('protocol104.network.logiclink.title.edit'),
      element,
      menuActions: [
        {
          icon: 'delete',
          label: get('remove'),
          action: remove(element),
        },
      ],
      primary: {
        icon: 'save',
        label: get('save'), 
        action: updateLogicLinkAction(element, redundancyGroupNumber, logicLinkNumber),
      },
      content: [
        html`<wizard-textfield
          readOnly
          label="${get('protocol104.network.logiclink.logicLinkNumber')}"
          .maybeValue=${logicLinkNumber}
        ></wizard-textfield>
        ${pTypesLogicLink104.map(
          pType => html`${createLogicLinkPTextField(element, pType, redundancyGroupNumber, logicLinkNumber)}`
        )}`,
      ],
    },
  ];
}
