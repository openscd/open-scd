import { html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { get } from 'lit-translate';

import '@material/mwc-formfield';
import '@material/mwc-list/mwc-list-item';
import { Checkbox } from '@material/mwc-checkbox';

import '../../../wizard-textfield.js';
import '../../../filtered-list.js';
import {
  EditorAction,
  Wizard,
  WizardActor,
  WizardInputElement,
  getValue,
  createElement,
  ComplexAction,
} from '../../../foundation.js';
import { pTypes104, stationTypeOptions, typePattern } from './foundation/p-types.js';

function isEqualAddress(oldAddress: Element, newAddress: Element): boolean {
  return Array.from(oldAddress.querySelectorAll('Address > P')).every(pType =>
    newAddress
      .querySelector(`Address > P[type="${pType.getAttribute('type')}"]`)
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

function updateConnectedApAction(parent: Element): WizardActor {
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
    if (oldAddress !== null && !isEqualAddress(oldAddress, newAddress)) {
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

/** @returns single page [[`Wizard`]] to edit SCL element ConnectedAP. */
export function editConnectedApWizard(element: Element): Wizard {
  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      element,
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateConnectedApAction(element),
      },
      content: [
        html`<wizard-select
          label="StationType"
          .maybeValue=${element.querySelector(
            `Address > P[type="StationType"]`
          )?.innerHTML ?? null}
          required
          >${stationTypeOptions.map(
            option =>
              html`<mwc-list-item value="${option}">${option}</mwc-list-item>`
          )}</wizard-select>
          ${pTypes104.map(
            ptype =>
              html`<wizard-textfield
                required
                label="${ptype}"
                pattern="${ifDefined(typePattern[ptype])}"
                .maybeValue=${element.querySelector(
                  `Address > P[type="${ptype}"]`
                )?.innerHTML ?? null}
              ></wizard-textfield>`
          )}`,
      ],
    },
  ];
}
