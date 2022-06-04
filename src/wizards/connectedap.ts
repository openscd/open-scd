import { html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { translate, get } from 'lit-translate';

import '@material/mwc-checkbox';
import '@material/mwc-formfield';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-icon';
import { Checkbox } from '@material/mwc-checkbox';
import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import '../wizard-textfield.js';
import '../filtered-list.js';
import {
  EditorAction,
  Wizard,
  WizardActor,
  WizardInputElement,
  compareNames,
  getValue,
  createElement,
  ComplexAction,
  isPublic,
  identity,
} from '../foundation.js';
import {
  getTypes,
  typeMaxLength,
  typeNullable,
  typePattern,
} from './foundation/p-types.js';

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

function hasTypeRestriction(element: Element): boolean {
  return Array.from(element.querySelectorAll('Address > P'))
    .filter(p => isPublic(p))
    .some(pType => pType.getAttribute('xsi:type'));
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
        html`<mwc-formfield
            label="${translate('connectedap.wizard.addschemainsttype')}"
            ><mwc-checkbox
              id="typeRestriction"
              ?checked=${hasTypeRestriction(element)}
            ></mwc-checkbox></mwc-formfield
          >${getTypes(element).map(
            ptype =>
              html`<wizard-textfield
                required
                label="${ptype}"
                pattern="${ifDefined(typePattern[ptype])}"
                ?nullable=${typeNullable[ptype]}
                .maybeValue=${element.querySelector(
                  `Address > P[type="${ptype}"]`
                )?.innerHTML ?? null}
                maxLength="${ifDefined(typeMaxLength[ptype])}"
              ></wizard-textfield>`
          )}`,
      ],
    },
  ];
}
