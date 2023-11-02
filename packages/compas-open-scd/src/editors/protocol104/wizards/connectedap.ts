import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';
import { ifDefined } from 'lit-html/directives/if-defined';

import '@material/mwc-checkbox';
import '@material/mwc-switch';
import '@material/mwc-formfield';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-icon';

import { Checkbox } from '@material/mwc-checkbox';
import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';

import '../../../wizard-textfield.js';
import '../../../filtered-list.js';

import {
  pTypes104,
  stationTypeOptions,
  typeDescriptiveNameKeys,
  typePattern,
} from '../foundation/p-types.js';
import {
  cloneElement,
  compareNames,
  ComplexAction,
  createElement,
  EditorAction,
  getValue,
  identity,
  isPublic,
  newSubWizardEvent,
  newWizardEvent,
  Wizard,
  WizardActor,
  WizardInputElement,
  WizardMenuActor,
} from '../../../foundation.js';
import { getTypeAttribute } from '../foundation/foundation.js';
import {
  createRedundancyGroupWizard,
  editRedundancyGroupWizard,
} from './redundancygroup.js';

interface AccessPointDescription {
  element: Element;
  connected?: boolean;
}

/** Sorts connected `AccessPoint`s to the bottom. */
function compareAccessPointConnection(
  a: AccessPointDescription,
  b: AccessPointDescription
): number {
  if (a.connected !== b.connected) return b.connected ? -1 : 1;
  return 0;
}

function createConnectedApAction(parent: Element): WizardActor {
  return (
    _: WizardInputElement[],
    __: Element,
    list?: List | null
  ): EditorAction[] => {
    if (!list) return [];

    const identities = (<ListItemBase[]>list.selected).map(item => item.value);

    const actions = identities.map(identity => {
      const [iedName, apName] = identity.split('>');

      return {
        new: {
          parent,
          element: createElement(parent.ownerDocument, 'ConnectedAP', {
            iedName,
            apName,
          }),
        },
      };
    });

    return actions;
  };
}

function existConnectedAp(accesspoint: Element): boolean {
  const iedName = accesspoint.closest('IED')?.getAttribute('name');
  const apName = accesspoint.getAttribute('name');

  const connAp = accesspoint.ownerDocument.querySelector(
    `ConnectedAP[iedName="${iedName}"][apName="${apName}"]`
  );

  return (connAp && isPublic(connAp)) ?? false;
}

/** @returns single page  [[`Wizard`]] for creating SCL element ConnectedAP. */
export function createConnectedApWizard(element: Element): Wizard {
  const doc = element.ownerDocument;

  const accessPoints = Array.from(doc.querySelectorAll(':root > IED'))
    .sort(compareNames)
    .flatMap(ied =>
      Array.from(ied.querySelectorAll(':root > IED > AccessPoint'))
    )
    .map(accesspoint => {
      return {
        element: accesspoint,
        connected: existConnectedAp(accesspoint),
      };
    })
    .sort(compareAccessPointConnection);

  return [
    {
      title: get('wizard.title.add', { tagName: 'ConnectedAP' }),
      primary: {
        icon: 'save',
        label: get('save'),
        action: createConnectedApAction(element),
      },
      content: [
        html` <filtered-list id="apList" multi
          >${accessPoints.map(accesspoint => {
            const id = identity(accesspoint.element);

            return html`<mwc-check-list-item
              value="${id}"
              ?disabled=${accesspoint.connected}
              ><span>${id}</span></mwc-check-list-item
            >`;
          })}
        </filtered-list>`,
      ],
    },
  ];
}

function isEqualAddress(oldAddress: Element, newAddress: Element): boolean {
  return Array.from(oldAddress.querySelectorAll('Address > P')).every(pType =>
    newAddress
      .querySelector(`Address > P[type="${getTypeAttribute(pType)}"]`)
      ?.isEqualNode(pType)
  );
}

function createAddressElement(
  inputs: WizardInputElement[],
  parent: Element,
  typeRestriction: boolean
): Element {
  const element = createElement(parent.ownerDocument, 'Address', {});

  inputs
    .filter(input => getValue(input) !== null)
    .forEach(validInput => {
      const type = validInput.label;
      const child = createElement(parent.ownerDocument, 'P', { type });

      if (typeRestriction)
        child.setAttributeNS(
          'http://www.w3.org/2001/XMLSchema-instance',
          'xsi:type',
          'tP_' + type
        );

      child.textContent = getValue(validInput);
      element.appendChild(child);
    });

  return element;
}

/** @returns single page [[`Wizard`]] to edit SCL element ConnectedAP for the 104 plugin. */
export function editConnectedApWizard(
  parent: Element,
  redundancy?: boolean
): Wizard {
  const redundancyGroupNumbers = getRedundancyGroupNumbers(parent);
  return [
    {
      title: get('protocol104.network.connectedAp.wizard.title.edit'),
      element: parent,
      menuActions: redundancy
        ? [
            {
              icon: 'playlist_add',
              label: get(
                'protocol104.network.connectedAp.wizard.addRedundancyGroup'
              ),
              action: openRedundancyGroupWizard(parent, redundancyGroupNumbers),
            },
          ]
        : undefined,
      primary: {
        icon: 'save',
        label: get('save'),
        action: editConnectedApAction(parent, redundancy),
      },
      content: [
        html`<mwc-formfield
            label="${get(
              'protocol104.network.connectedAp.wizard.redundancySwitchLabel'
            )}"
          >
            <mwc-switch
              id="redundancy"
              ?checked=${redundancy}
              @change=${(event: Event) => {
                event.target!.dispatchEvent(newWizardEvent());
                event.target!.dispatchEvent(
                  newSubWizardEvent(() =>
                    editConnectedApWizard(parent, !redundancy)
                  )
                );
              }}
            ></mwc-switch>
          </mwc-formfield>
          <wizard-divider></wizard-divider>
          ${createTypeRestrictionCheckbox(parent)}
          <wizard-select
            label="StationType"
            .maybeValue=${parent.querySelector(
              `Address > P[type="StationType"]`
            )?.innerHTML ?? null}
            required
            fixedMenuPosition
            helper="${translate(typeDescriptiveNameKeys['StationType'])}"
          >
            ${stationTypeOptions.map(
              option =>
                html`<mwc-list-item value="${option}">${option}</mwc-list-item>`
            )}
          </wizard-select>
          ${redundancy
            ? html`<h3>
                  ${get(
                    'protocol104.network.connectedAp.wizard.redundancyGroupTitle'
                  )}
                </h3>
                <mwc-list
                  @selected=${(e: SingleSelectedEvent) => {
                    e.target!.dispatchEvent(
                      newSubWizardEvent(() =>
                        editRedundancyGroupWizard(
                          parent,
                          redundancyGroupNumbers[e.detail.index]
                        )
                      )
                    );
                  }}
                >
                  ${redundancyGroupNumbers.length != 0
                    ? redundancyGroupNumbers.map(
                        number =>
                          html`<mwc-list-item
                            >Redundancy Group ${number}</mwc-list-item
                          >`
                      )
                    : html`<p>
                        ${get(
                          'protocol104.network.connectedAp.wizard.noRedundancyGroupsAvailable'
                        )}
                      </p>`}
                </mwc-list>`
            : html`${pTypes104.map(
                pType => html`${createEditTextField(parent, pType)}`
              )}`} `,
      ],
    },
  ];
}

function editConnectedApAction(
  parent: Element,
  redundancy?: boolean
): WizardActor {
  return (inputs: WizardInputElement[], wizard: Element): EditorAction[] => {
    const typeRestriction: boolean =
      (<Checkbox>wizard.shadowRoot?.querySelector('#typeRestriction'))
        ?.checked ?? false;

    const newAddress = createAddressElement(inputs, parent, typeRestriction);
    const oldAddress = parent.querySelector('Address');

    const complexAction: ComplexAction = {
      actions: [],
      title: get('connectedap.action.addaddress', {
        iedName: parent.getAttribute('iedName') ?? '',
        apName: parent.getAttribute('apName') ?? '',
      }),
    };
    // When we have a redundanct ConnectedAP, we are only interested in the StationType value.
    // All redundancy group actions are done in those wizards itself.
    if (redundancy) {
      const stationTypeValue = getValue(
        inputs.find(i => i.label === 'StationType')!
      )!;
      const originalElement = oldAddress?.querySelector(
        'P[type="StationType"]'
      );

      const elementClone = cloneElement(originalElement!, {});
      elementClone!.textContent = stationTypeValue;

      complexAction.actions.push({
        old: {
          element: originalElement!,
        },
        new: {
          element: elementClone,
        },
      });
    } else if (oldAddress !== null && !isEqualAddress(oldAddress, newAddress)) {
      //address & child elements P are changed: cannot use replace editor action
      complexAction.actions.push({
        old: {
          parent,
          element: oldAddress,
        },
      });
      complexAction.actions.push({
        new: {
          parent,
          element: newAddress,
        },
      });
    } else if (oldAddress === null)
      complexAction.actions.push({
        new: {
          parent: parent,
          element: newAddress,
        },
      });

    return complexAction.actions.length ? [complexAction] : [];
  };
}

function openRedundancyGroupWizard(
  element: Element,
  rGNumbers: number[]
): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(
      newSubWizardEvent(createRedundancyGroupWizard(element, rGNumbers))
    );
  };
}

/**
 * Get all the current used Redundancy Group numbers.
 * @param parent - The parent element of all the P elements.
 * @returns An array with all the Redundancy Group numbers.
 */
function getRedundancyGroupNumbers(parent: Element): number[] {
  const groupNumbers: number[] = [];

  parent.querySelectorAll(`Address > P[type^="RG"]`).forEach(p => {
    const redundancyGroupPart = getTypeAttribute(p)?.split('-')[0];
    const number = Number(redundancyGroupPart?.substring(2));

    if (!groupNumbers.includes(number)) groupNumbers.push(number);
  });

  return groupNumbers.sort();
}

/**
 * Create a wizard-textfield element for the Edit wizard.
 * @param parent - The parent element of the P to create.
 * @param pType - The type of P a Text Field has to be created for.
 * @returns - A Text Field created for a specific type for the Edit wizard.
 */
function createEditTextField(parent: Element, pType: string): TemplateResult {
  return html`<wizard-textfield
    required
    label="${pType}"
    pattern="${ifDefined(typePattern[pType])}"
    .maybeValue=${parent.querySelector(`Address > P[type="${pType}"]`)
      ?.innerHTML ?? null}
  ></wizard-textfield>`;
}

function createTypeRestrictionCheckbox(element: Element): TemplateResult {
  return html`<mwc-formfield
    label="${translate('connectedap.wizard.addschemainsttype')}"
    ><mwc-checkbox
      id="typeRestriction"
      ?checked=${hasTypeRestriction(element)}
    ></mwc-checkbox>
  </mwc-formfield>`;
}

function hasTypeRestriction(element: Element): boolean {
  return Array.from(element.querySelectorAll('Address > P'))
    .filter(p => isPublic(p))
    .some(pType => pType.getAttribute('xsi:type'));
}
