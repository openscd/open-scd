import { html } from 'lit-element';
import { get } from 'lit-translate';

import '@openscd/open-scd/src/wizard-textfield.js';
import { pTypesRedundancyGroup104 } from '../foundation/p-types.js';
import {
  getValue,
  newSubWizardEvent,
  newWizardEvent,
  Wizard,
  WizardActor,
  WizardInputElement,
  WizardMenuActor,
} from '@openscd/open-scd/src/foundation.js';

import {
  cloneElement,
  createElement,
} from '@openscd/xml';

import {
  ComplexAction,
  EditorAction,
  newActionEvent,
  SimpleAction
} from '@openscd/core/foundation/deprecated/editor.js';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { createLogicLinkWizard, editLogicLinkWizard } from './logiclink.js';
import {
  createNetworkTextField,
  getTypeAttribute,
} from '../foundation/foundation.js';

export function editRedundancyGroupWizard(
  parent: Element,
  rGNumber: number
): Wizard {
  const usedLLNumbers = getLogicLinkNumbers(parent, rGNumber);
  return [
    {
      title: get('protocol104.network.redundancyGroup.wizard.title.edit'),
      menuActions: [
        {
          icon: 'playlist_add',
          label: get('protocol104.network.redundancyGroup.wizard.addLogicLink'),
          action: (wizard: Element): void => {
            wizard.dispatchEvent(
              newSubWizardEvent(
                createLogicLinkWizard(parent, rGNumber, usedLLNumbers)
              )
            );
          },
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
            label="${get(
              'protocol104.network.redundancyGroup.wizard.redundancyGroupNumberLabel'
            )}"
            .maybeValue=${rGNumber}
          ></wizard-textfield>
          ${pTypesRedundancyGroup104.map(
            pType =>
              html`${createNetworkTextField(
                pType,
                parent.querySelector(
                  `Address > P[type$="RG${rGNumber}-${pType}"]`
                )?.innerHTML
              )}`
          )}
          <h3>
            ${get(
              'protocol104.network.redundancyGroup.wizard.logicLinkGroupTitle'
            )}
          </h3>
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
            }}
          >
            ${usedLLNumbers.length != 0
              ? usedLLNumbers.map(
                  number =>
                    html`<mwc-list-item>Logic Link ${number}</mwc-list-item>`
                )
              : html`<p>
                  ${get(
                    'protocol104.network.redundancyGroup.wizard.noLogicLinksAvailable'
                  )}
                </p>`}
          </mwc-list>`,
      ],
    },
  ];
}

export function createRedundancyGroupWizard(
  parent: Element,
  occupiedRGNumbers: number[]
): Wizard {
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
        action: addRedundancyGroupAction(parent, rGNumber),
      },
      content: [
        html`<wizard-textfield
            readOnly
            label="${get(
              'protocol104.network.redundancyGroup.wizard.redundancyGroupNumberLabel'
            )}"
            value="${rGNumber}"
          ></wizard-textfield>
          ${pTypesRedundancyGroup104.map(
            pType => html`${createNetworkTextField(pType)}`
          )}`,
      ],
    },
  ];
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
      title: get(
        'protocol104.network.redundancyGroup.wizard.removedRedundancyGroup',
        {
          rGNumber,
          subNetworkName: parent.parentElement!.getAttribute('name')!,
          apName: parent.getAttribute('apName')!,
          iedName: parent.getAttribute('iedName')!,
        }
      ),
    };

    addressElement!.querySelectorAll(`P[type^="RG${rGNumber}-"]`).forEach(p => {
      complexAction.actions.push({
        old: {
          parent: addressElement!,
          element: p!,
        },
      });
    });

    wizard.dispatchEvent(newActionEvent(complexAction));
    wizard.dispatchEvent(newWizardEvent());
  };
}

function editRedundancyGroupAction(
  parent: Element,
  rGNumber: number
): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const actions: SimpleAction[] = [];

    pTypesRedundancyGroup104.forEach(type => {
      const inputValue = getValue(inputs.find(i => i.label === type)!)!;
      const elementOriginal = parent.querySelector(
        `Address > P[type="RG${rGNumber}-${type}"]`
      );

      if (elementOriginal == null) {
        const pElement = createElement(parent.ownerDocument, 'P', {
          type: `RG${rGNumber}-${type}`,
        });
        pElement.textContent = inputValue;

        actions.push({
          new: {
            parent: parent.querySelector('Address')!,
            element: pElement,
          },
        });
      } else if (inputValue !== elementOriginal?.textContent) {
        const elementClone = cloneElement(elementOriginal!, {});
        elementClone.textContent = inputValue;

        actions.push({
          old: {
            element: elementOriginal!,
          },
          new: {
            element: elementClone,
          },
        });
      }
    });

    return actions.length != 0
      ? [
          {
            actions,
            title: get(
              'protocol104.network.redundancyGroup.wizard.editedRedundancyGroup',
              {
                rGNumber,
                subNetworkName: parent.parentElement!.getAttribute('name')!,
                apName: parent.getAttribute('apName')!,
                iedName: parent.getAttribute('iedName')!,
              }
            ),
          },
        ]
      : [];
  };
}

function addRedundancyGroupAction(
  parent: Element,
  rGNumber: number
): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const complexAction: ComplexAction = {
      actions: [],
      title: get(
        'protocol104.network.redundancyGroup.wizard.addedLRedundancyGroup',
        {
          rGNumber,
          subNetworkName: parent.parentElement!.getAttribute('name')!,
          apName: parent.getAttribute('apName')!,
          iedName: parent.getAttribute('iedName')!,
        }
      ),
    };

    pTypesRedundancyGroup104.forEach(type => {
      const pElement = createElement(parent.ownerDocument, 'P', {
        type: `RG${rGNumber}-${type}`,
      });
      pElement.textContent = getValue(inputs.find(i => i.label === type)!)!;

      complexAction.actions.push({
        new: {
          parent: parent.querySelector('Address')!,
          element: pElement,
        },
      });
    });

    return [complexAction];
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

  parent
    .querySelectorAll(`Address > P[type^="RG${rGNumber}-LL"]`)
    .forEach(p => {
      const logicLinkPart = getTypeAttribute(p)?.split('-')[1];
      const number = Number(logicLinkPart?.substring(2));

      if (!usedNumbers.includes(number)) usedNumbers.push(number);
    });

  return usedNumbers.sort();
}
