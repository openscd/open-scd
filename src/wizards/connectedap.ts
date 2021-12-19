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
  isPublic,
} from '../foundation.js';
import {
  getTypes,
  typeMaxLength,
  typeNullable,
  typePattern,
} from './foundation/p-types.js';

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

function isEqualAddress(oldAddress: Element, newAddress: Element): boolean {
  return Array.from(oldAddress.querySelectorAll('Address > P')).every(pType =>
    newAddress
      .querySelector(`Address > P[type="${pType.getAttribute('type')}"]`)
      ?.isEqualNode(pType)
  );
}

function createAddressElement(
  inputs: WizardInput[],
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
  return (inputs: WizardInput[], wizard: Element): EditorAction[] => {
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
      // We cannot use updateAction on address as both address child elements P are changed
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

function existTypeRestriction(element: Element): boolean {
  return Array.from(element.querySelectorAll('Address > P'))
    .filter(p => isPublic(p))
    .some(pType => pType.getAttribute('xsi:type'));
}

/** Create a single page [[`Wizard`]] to edit SCL element ConnectedAP
 *  @param element - SCL element ConnectedAP
 *  @returns - Edition dependant [[`Wizard`]] with WizardInput for each configurable `P` element
 */
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
              ?checked=${existTypeRestriction(element)}
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
