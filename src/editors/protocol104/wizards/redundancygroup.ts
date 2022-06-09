import { html, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import '../../../wizard-textfield.js';
import {
  pTypesRedundancyGroup104, typePattern,
} from '../foundation/p-types.js';
import {
  cloneElement,
  EditorAction,
  getValue,
  newSubWizardEvent,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInputElement,
  WizardMenuActor
} from '../../../foundation.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { typeMaxLength, typeNullable } from '../../../wizards/foundation/p-types.js';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { editLogicLink104Wizard } from './logiclink.js';

export function updateRedundancyGroupAction(parent: Element, redundancyGroupNumber: number): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const wFactorValue = getValue(inputs.find(i => i.label === 'W-FACTOR')!)!;
    const wFactorElement = parent.querySelector(`Address > P[type="RG${redundancyGroupNumber}-W-FACTOR"]`);
    const kFactorValue = getValue(inputs.find(i => i.label === 'K-FACTOR')!)!;
    const kFactorElement = parent.querySelector(`Address > P[type="RG${redundancyGroupNumber}-K-FACTOR"]`);
    const timeout0Value = getValue(inputs.find(i => i.label === 'TIMEOUT-0')!)!;
    const timeout0Element = parent.querySelector(`Address > P[type="RG${redundancyGroupNumber}-TIMEOUT-0"]`);
    const timeout1Value = getValue(inputs.find(i => i.label === 'TIMEOUT-1')!)!;
    const timeout1Element = parent.querySelector(`Address > P[type="RG${redundancyGroupNumber}-TIMEOUT-1"]`);
    const timeout2Value = getValue(inputs.find(i => i.label === 'TIMEOUT-2')!)!;
    const timeout2Element = parent.querySelector(`Address > P[type="RG${redundancyGroupNumber}-TIMEOUT-2"]`);
    const timeout3Value = getValue(inputs.find(i => i.label === 'TIMEOUT-3')!)!;
    const timeout3Element = parent.querySelector(`Address > P[type="RG${redundancyGroupNumber}-TIMEOUT-3"]`);

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

    return [
      { old: { element: wFactorElement! }, new: { element: wFactorClone }, },
      { old: { element: kFactorElement! }, new: { element: kFactorClone }, },
      { old: { element: timeout0Element! }, new: { element: timeout0Clone }, },
      { old: { element: timeout1Element! }, new: { element: timeout1Clone }, },
      { old: { element: timeout2Element! }, new: { element: timeout2Clone }, },
      { old: { element: timeout3Element! }, new: { element: timeout3Clone }, }
    ];
  };
}

export function createRedundancyGroupPTextField(element: Element, pType: string, redundancyGroupNumber: number): TemplateResult {
  return html`<wizard-textfield
    required
    label="${pType}"
    pattern="${ifDefined(typePattern[pType])}"
    ?nullable=${typeNullable[pType]}
    .maybeValue=${element.querySelector(
      `Address > P[type$="RG${redundancyGroupNumber}-${pType}"]`
    )?.innerHTML ?? null}
    maxLength="${ifDefined(typeMaxLength[pType])}"
  ></wizard-textfield>`
}

function getLogicLinkNumbers(element: Element, redundancyGroupNumber: number): number[] {
  const groupNumbers = [];
  let groupNumber = 1;

  while (element.querySelectorAll(`Address > P[type^="RG${redundancyGroupNumber}-LL${groupNumber}"]`).length == 2) {
    groupNumbers.push(groupNumber++);
  }

  return groupNumbers;
}

function openLogicLinkWizard(element: Element): WizardMenuActor {
  return (): WizardAction[] => {
    //return [() => createFCDAsWizard(element)];
    return [];
  };
}

function remove(element: Element): WizardMenuActor {
  return (): EditorAction[] => {
    return [];
  };
}

export function editRedundancyGroup104Wizard(element: Element, redundancyGroupNumber: number): Wizard {
  const logicLinkNumbers = getLogicLinkNumbers(element, redundancyGroupNumber);
  return [
    {
      title: get('protocol104.network.redundancyGroup.wizard.title.edit'),
      menuActions: [
        {
          icon: 'add',
          label: get('protocol104.network.redundancyGroup.wizard.addLogicLink'),
          action: openLogicLinkWizard(element),
        },
        {
          icon: 'delete',
          label: get('remove'),
          action: remove(element),
        },
      ],
      primary: {
        icon: 'save',
        label: get('save'), 
        action: updateRedundancyGroupAction(element, redundancyGroupNumber),
      },
      content: [
        html`<wizard-textfield
          readOnly
          label="${get('protocol104.network.redundancyGroup.wizard.redundancyGroupNumberLabel')}"
          .maybeValue=${redundancyGroupNumber}
        ></wizard-textfield>
        ${pTypesRedundancyGroup104.map(
          pType => html`${createRedundancyGroupPTextField(element, pType, redundancyGroupNumber)}`
        )}
        <h3>${get('protocol104.network.redundancyGroup.wizard.logicLinkGroupTitle')}</h3>
        <mwc-list
          @selected=${(e: SingleSelectedEvent) => {
            const logicLinkNumber = ++e.detail.index;
            e.target!.dispatchEvent(
              newSubWizardEvent(
                editLogicLink104Wizard(element, redundancyGroupNumber, logicLinkNumber)
              )
            );
          }}>
          ${logicLinkNumbers.length != 0 ? logicLinkNumbers.map(
            number => html`<mwc-list-item>Logic Link ${number}</mwc-list-item>`
          ) : html`<p>${get('protocol104.network.redundancyGroup.wizard.noLogicLinksAvailable')}</p>`}
        </mwc-list>`,
      ],
    },
  ];
}
