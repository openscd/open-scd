import { TemplateResult, html } from 'lit-element';
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
  WizardInput,
  compareNames,
  getValue,
  createElement,
  ComplexAction,
} from '../foundation.js';
import {
  getTypes,
  typePattern,
  typeNullable,
  typeMaxLength,
} from '../editors/communication/p-types.js';

/** Data needed to uniquely identify an `AccessPoint` */
interface apAttributes {
  iedName: string;
  apName: string;
}

/** Description of a `ListItem` representing an `IED` and `AccessPoint` */
interface ItemDescription {
  value: apAttributes;
  connected?: boolean;
}

/** Sorts disabled `ListItem`s to the bottom. */
function compareListItemConnection(
  a: ItemDescription,
  b: ItemDescription
): number {
  if (a.connected !== b.connected) return b.connected ? -1 : 1;
  return 0;
}

function isEqualAddress(oldAddr: Element, newAdddr: Element): boolean {
  return (
    Array.from(oldAddr.querySelectorAll('Address > P')).filter(
      pType =>
        !newAdddr
          .querySelector(`Address > P[type="${pType.getAttribute('type')}"]`)
          ?.isEqualNode(pType)
    ).length === 0
  );
}

function createAddressElement(
  inputs: WizardInput[],
  parent: Element,
  instType: boolean
): Element {
  const element = createElement(parent.ownerDocument, 'Address', {});

  inputs
    .filter(input => getValue(input) !== null)
    .forEach(validInput => {
      const type = validInput.label;
      const child = createElement(parent.ownerDocument, 'P', { type });
      if (instType)
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

function createConnectedApAction(parent: Element): WizardActor {
  return (
    inputs: WizardInput[],
    wizard: Element,
    list?: List | null
  ): EditorAction[] => {
    if (!list) return [];

    const apValue = (<ListItemBase[]>list.selected).map(
      item => <apAttributes>JSON.parse(item.value)
    );

    const actions = apValue.map(
      value =>
        <EditorAction>{
          new: {
            parent,
            element: createElement(parent.ownerDocument, 'ConnectedAP', {
              iedName: value.iedName,
              apName: value.apName,
            }),
          },
        }
    );

    return actions;
  };
}

function renderWizardPage(element: Element): TemplateResult {
  const doc = element.ownerDocument;

  const accPoints = Array.from(doc.querySelectorAll(':root > IED'))
    .sort(compareNames)
    .flatMap(ied =>
      Array.from(ied.querySelectorAll(':root > IED > AccessPoint'))
    )
    .map(accP => {
      return {
        iedName: accP.parentElement!.getAttribute('name')!,
        apName: accP.getAttribute('name')!,
      };
    });

  const accPointDescription = accPoints
    .map(value => {
      return {
        value,
        connected:
          doc?.querySelector(
            `:root > Communication > SubNetwork > ConnectedAP[iedName="${value.iedName}"][apName="${value.apName}"]`
          ) !== null,
      };
    })
    .sort(compareListItemConnection);

  if (accPointDescription.length)
    return html` <filtered-list id="apList" multi
      >${accPointDescription.map(
        item => html`<mwc-check-list-item
          value="${JSON.stringify(item.value)}"
          twoline
          ?disabled=${item.connected}
          ><span>${item.value.apName}</span
          ><span slot="secondary"
            >${item.value.iedName}</span
          ></mwc-check-list-item
        >`
      )}
    </filtered-list>`;

  return html`<mwc-list-item disabled graphic="icon">
    <span>${translate('lnode.wizard.placeholder')}</span>
    <mwc-icon slot="graphic">info</mwc-icon>
  </mwc-list-item>`;
}

/** @returns a Wizard for creating `element` `ConnectedAP`. */
export function createConnectedApWizard(element: Element): Wizard {
  return [
    {
      title: get('connectedap.wizard.title.connect'),
      primary: {
        icon: 'save',
        label: get('save'),
        action: createConnectedApAction(element),
      },
      content: [renderWizardPage(element)],
    },
  ];
}

export function editConnectedApAction(parent: Element): WizardActor {
  return (inputs: WizardInput[], wizard: Element): EditorAction[] => {
    const instType: boolean =
      (<Checkbox>wizard.shadowRoot?.querySelector('#instType'))?.checked ??
      false;

    const newAddress = createAddressElement(inputs, parent, instType);

    const complexAction: ComplexAction = {
      actions: [],
      title: get('connectedap.action.addaddress', {
        iedName: parent.getAttribute('iedName') ?? '',
        apName: parent.getAttribute('apName') ?? '',
      }),
    };

    const oldAddress = parent.querySelector('Address');

    if (oldAddress !== null && !isEqualAddress(oldAddress, newAddress)) {
      // We cannot use updateAction on address as both address child elements P are changed
      complexAction.actions.push({
        old: {
          parent,
          element: oldAddress,
          reference: oldAddress.nextSibling,
        },
      });
      complexAction.actions.push({
        new: {
          parent,
          element: newAddress,
          reference: oldAddress.nextSibling,
        },
      });
    } else if (oldAddress === null)
      complexAction.actions.push({
        new: {
          parent: parent,
          element: newAddress,
        },
      });

    return [complexAction];
  };
}

export function editConnectedApWizard(element: Element): Wizard {
  return [
    {
      title: get('connectedap.wizard.title.edit'),
      element,
      primary: {
        icon: 'save',
        label: get('save'),
        action: editConnectedApAction(element),
      },
      content: [
        html`<mwc-formfield
            label="${translate('connectedap.wizard.addschemainsttype')}"
          >
            <mwc-checkbox
              id="instType"
              ?checked="${Array.from(
                element.querySelectorAll('Address > P')
              ).filter(pType => pType.getAttribute('xsi:type')).length > 0}"
            ></mwc-checkbox> </mwc-formfield
          >${getTypes(element).map(
            ptype =>
              html`<wizard-textfield
                label="${ptype}"
                pattern="${ifDefined(typePattern[ptype])}"
                ?nullable=${typeNullable[ptype]}
                .maybeValue=${element.querySelector(
                  `:root > Communication > SubNetwork > ConnectedAP > Address > P[type="${ptype}"]`
                )?.innerHTML ?? null}
                maxLength="${ifDefined(typeMaxLength[ptype])}"
              ></wizard-textfield>`
          )}`,
      ],
    },
  ];
}
