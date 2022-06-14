import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import '../../../wizard-textfield.js';
import {
  pTypesRedundancyGroup104, typeDescriptiveNameKeys, typePattern,
} from '../foundation/p-types.js';
import {
  cloneElement,
  ComplexAction,
  createElement,
  EditorAction,
  getValue,
  newActionEvent,
  newSubWizardEvent,
  newWizardEvent,
  Wizard,
  WizardActor,
  WizardInputElement,
  WizardMenuActor
} from '../../../foundation.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { typeMaxLength } from '../../../wizards/foundation/p-types.js';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { createLogicLinkWizard, editLogicLinkWizard } from './logiclink.js';
import { createCreateTextField } from './foundation.js';

export function editRedundancyGroupWizard(parent: Element, rGNumber: number): Wizard {
  const usedLLNumbers = getLogicLinkNumbers(parent, rGNumber);
  return [
    {
      title: get('protocol104.network.redundancyGroup.wizard.title.edit'),
      menuActions: [
        {
          icon: 'playlist_add',
          label: get('protocol104.network.redundancyGroup.wizard.addLogicLink'),
          action: openLogicLinkWizard(parent, rGNumber, usedLLNumbers),
        },
        {
          icon: 'delete',
          label: get('remove'),
          action: remove(parent, rGNumber),
        },
      ],
      primary: {
        icon: 'save',
        label: get('save'), 
        action: editRedundancyGroupAction(parent, rGNumber),
      },
      content: [
        html`<wizard-textfield
          readOnly
          label="${get('protocol104.network.redundancyGroup.wizard.redundancyGroupNumberLabel')}"
          .maybeValue=${rGNumber}
        ></wizard-textfield>
        ${pTypesRedundancyGroup104.map(
          pType => html`${createEditTextField(parent, pType, rGNumber)}`
        )}
        <h3>${get('protocol104.network.redundancyGroup.wizard.logicLinkGroupTitle')}</h3>
        <mwc-list
          @selected=${(e: SingleSelectedEvent) => {
            e.target!.dispatchEvent(
              newSubWizardEvent(() =>
                editLogicLinkWizard(
                  parent,
                  rGNumber,
                  usedLLNumbers[e.detail.index]
                )
              )
            );
          }}>
          ${usedLLNumbers.length != 0
            ? usedLLNumbers.map(number => html`<mwc-list-item>Logic Link ${number}</mwc-list-item>`)
            : html`<p>${get('protocol104.network.redundancyGroup.wizard.noLogicLinksAvailable')}</p>`}
        </mwc-list>`,
      ],
    },
  ];
}

export function createRedundancyGroupWizard(parent: Element, occupiedRGNumbers: number[]): Wizard {
  // Calculate the first available number for the Logic Link group.
  let rGNumber = 1;
  while (occupiedRGNumbers.find(n => n == rGNumber)) {
    rGNumber++;
  }

  return [
    {
      title: get('protocol104.network.redundancyGroup.wizard.title.add'),
      primary: {
        icon: '',
        label: get('save'),
        action: createRedundancyGroupAction(parent, rGNumber),
      },
      content: [
        html`<wizard-textfield
          readOnly
          label="${get('protocol104.network.redundancyGroup.wizard.redundancyGroupNumberLabel')}"
          value="${rGNumber}"
        ></wizard-textfield>
        ${pTypesRedundancyGroup104.map(
          pType => html`${createCreateTextField(pType)}`
        )}`
      ],
    },
  ];
}

function editRedundancyGroupAction(parent: Element, rGNumber: number): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const complexAction: ComplexAction = {
      actions: [],
      title: get('protocol104.network.redundancyGroup.wizard.edittedRedundancyGroup', {
        rGNumber,
        subNetworkName: parent.parentElement!.getAttribute('name')!,
        apName: parent.getAttribute('apName')!,
        iedName:  parent.getAttribute('iedName')!
      }),
    };

    const wFactorValue = getValue(inputs.find(i => i.label === 'W-FACTOR')!)!;
    const wFactorElement = parent.querySelector(`Address > P[type="RG${rGNumber}-W-FACTOR"]`);
    const kFactorValue = getValue(inputs.find(i => i.label === 'K-FACTOR')!)!;
    const kFactorElement = parent.querySelector(`Address > P[type="RG${rGNumber}-K-FACTOR"]`);
    const timeout0Value = getValue(inputs.find(i => i.label === 'TIMEOUT-0')!)!;
    const timeout0Element = parent.querySelector(`Address > P[type="RG${rGNumber}-TIMEOUT-0"]`);
    const timeout1Value = getValue(inputs.find(i => i.label === 'TIMEOUT-1')!)!;
    const timeout1Element = parent.querySelector(`Address > P[type="RG${rGNumber}-TIMEOUT-1"]`);
    const timeout2Value = getValue(inputs.find(i => i.label === 'TIMEOUT-2')!)!;
    const timeout2Element = parent.querySelector(`Address > P[type="RG${rGNumber}-TIMEOUT-2"]`);
    const timeout3Value = getValue(inputs.find(i => i.label === 'TIMEOUT-3')!)!;
    const timeout3Element = parent.querySelector(`Address > P[type="RG${rGNumber}-TIMEOUT-3"]`);

    if (
      wFactorValue === wFactorElement?.textContent &&
      kFactorValue === kFactorElement?.textContent &&
      timeout0Value === timeout0Element?.textContent &&
      timeout1Value === timeout1Element?.textContent &&
      timeout2Value === timeout2Element?.textContent &&
      timeout3Value === timeout3Element?.textContent
    ) {
      return [];
    }

    const wFactorClone = cloneElement(wFactorElement!, {});
    wFactorClone.textContent = wFactorValue;
    const kFactorClone = cloneElement(kFactorElement!, {});
    kFactorClone.textContent = kFactorValue;
    const timeout0Clone = cloneElement(timeout0Element!, {});
    timeout0Clone.textContent = timeout0Value;
    const timeout1Clone = cloneElement(timeout1Element!, {});
    timeout1Clone.textContent = timeout1Value;
    const timeout2Clone = cloneElement(timeout2Element!, {});
    timeout2Clone.textContent = timeout2Value;
    const timeout3Clone = cloneElement(timeout3Element!, {});
    timeout3Clone.textContent = timeout3Value;

    complexAction.actions.push(
      { old: { element: wFactorElement! }, new: { element: wFactorClone }, },
      { old: { element: kFactorElement! }, new: { element: kFactorClone }, },
      { old: { element: timeout0Element! }, new: { element: timeout0Clone }, },
      { old: { element: timeout1Element! }, new: { element: timeout1Clone }, },
      { old: { element: timeout2Element! }, new: { element: timeout2Clone }, },
      { old: { element: timeout3Element! }, new: { element: timeout3Clone }, }
    );

    return [complexAction];
  };
}

function createRedundancyGroupAction(parent: Element, rGNumber: number): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const complexAction: ComplexAction = {
      actions: [],
      title: get('protocol104.network.redundancyGroup.wizard.addedLRedundancyGroup', {
        rGNumber,
        subNetworkName: parent.parentElement!.getAttribute('name')!,
        apName: parent.getAttribute('apName')!,
        iedName:  parent.getAttribute('iedName')!
      }),
    };

    pTypesRedundancyGroup104.forEach(type => {
      const pElement = createElement(parent.ownerDocument, 'P', {
        type: `RG${rGNumber}-${type}`
      });
      pElement.textContent = getValue(inputs.find(i => i.label === type)!)!;
      complexAction.actions.push({
        new: {
          parent: parent.querySelector('Address')!,
          element: pElement
        }
      });
    });

    return [complexAction];
  };
}

function openLogicLinkWizard(parent: Element, rGNumber: number, lLNumber: number[]): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(newSubWizardEvent(createLogicLinkWizard(parent, rGNumber, lLNumber)));
  };
}

/**
 * Remove all P elements belonging to a single Redundancy Group.
 * @param parent - The parent element of the P elements to remove.
 * @param rGNumber - The Redundancy Group number of all the P elements to remove.
 * @returns - Removing all P elements belonging to a Redundancy Group.
 */
function remove(parent: Element, rGNumber: number): WizardMenuActor {
  return (wizard: Element): void => {
    const addressElement = parent.querySelector('Address');

    const complexAction: ComplexAction = {
      actions: [],
      title: get('protocol104.network.redundancyGroup.wizard.removedRedundancyGroup', {
        rGNumber,
        subNetworkName: parent.parentElement!.getAttribute('name')!,
        apName: parent.getAttribute('apName')!,
        iedName:  parent.getAttribute('iedName')!
      }),
    };
    
    addressElement!.querySelectorAll(`P[type^="RG${rGNumber}-"]`).forEach(p => {
      complexAction.actions.push(
        { old: { parent: addressElement!, element: p! } }
      )
    });
    
    wizard.dispatchEvent(newActionEvent(complexAction));
    wizard.dispatchEvent(newWizardEvent());
  };
}

/**
 * Get all the current used Logic Link numbers.
 * @param parent - The parent element of all the P elements.
 * @param rGNumber - The Redundancy Group number to use for searching Logic Link groups.
 * @returns An array with all the Logic Link group numbers.
 */
function getLogicLinkNumbers(parent: Element, rGNumber: number): number[] {
  const usedNumbers: number[] = [];

  parent.querySelectorAll(`Address > P[type^="RG${rGNumber}-LL"]`).forEach(p => {
    const logicLinkPart = p.getAttribute('type')?.split('-')[1];
    const number = Number(logicLinkPart?.substring(2));
    
    if (!usedNumbers.includes(number)) usedNumbers.push(number)
  })

  return usedNumbers.sort();
}

/**
 * Create a wizard-textfield element for the Edit wizard.
 * @param parent - The parent element of the P to create. 
 * @param pType - The type of P a Text Field has to be created for.
 * @param rGNumber - The Redundancy Group number of the Text Field used in the type.
 * @returns - A Text Field created for a specific type for the Edit wizard.
 */
function createEditTextField(parent: Element, pType: string, rGNumber: number): TemplateResult {
  return html`<wizard-textfield
    required
    label="${pType}"
    pattern="${ifDefined(typePattern[pType])}"
    .maybeValue=${parent.querySelector(
      `Address > P[type$="RG${rGNumber}-${pType}"]`
    )?.innerHTML ?? null}
    maxLength="${ifDefined(typeMaxLength[pType])}"
    helper="${translate(typeDescriptiveNameKeys[pType])}"
  ></wizard-textfield>`
}
