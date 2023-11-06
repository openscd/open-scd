import { html, TemplateResult } from 'lit-element';
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
  SimpleAction,
} from '../foundation.js';
import {
  getTypes,
  typeMaxLength,
  typeNullable,
  typePattern,
} from './foundation/p-types.js';
import {
  mACAddressGenerator,
  appIdGenerator,
} from '../foundation/generators.js';

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

function initSMVElements(
  doc: XMLDocument,
  connectedAp: Element,
  options: {
    macGeneratorSmv: () => string;
    appidGeneratorSmv: () => string;
    unconnectedSampledValueControl: Set<string>;
  }
): SimpleAction[] {
  const actions: SimpleAction[] = [];

  const ied = doc.querySelector(
    `IED[name="${connectedAp.getAttribute('iedName')}"]`
  );

  Array.from(ied?.querySelectorAll('SampledValueControl') ?? [])
    .filter(sampledValueControl => {
      const id = identity(sampledValueControl) as string;

      if (options.unconnectedSampledValueControl.has(id)) {
        options.unconnectedSampledValueControl.delete(id);
        return true;
      }

      return false;
    })
    .forEach(sampledValueControl => {
      const cbName = sampledValueControl.getAttribute('name');
      const ldInst =
        sampledValueControl.closest('LDevice')?.getAttribute('inst') ?? null;

      const sMV = createElement(connectedAp.ownerDocument, 'SMV', {
        cbName,
        ldInst,
      });
      actions.push({ new: { parent: connectedAp, element: sMV } });

      const address = createElement(connectedAp.ownerDocument, 'Address', {});
      actions.push({ new: { parent: sMV, element: address } });

      const pMac = createElement(connectedAp.ownerDocument, 'P', {
        type: 'MAC-Address',
      });
      pMac.textContent = options.macGeneratorSmv();
      actions.push({ new: { parent: address, element: pMac } });

      const pAppId = createElement(connectedAp.ownerDocument, 'P', {
        type: 'APPID',
      });
      pAppId.textContent = options.appidGeneratorSmv();
      actions.push({ new: { parent: address, element: pAppId } });

      const pVlanId = createElement(connectedAp.ownerDocument, 'P', {
        type: 'VLAN-ID',
      });
      pVlanId.textContent = '000';
      actions.push({ new: { parent: address, element: pVlanId } });

      const pVlanPrio = createElement(connectedAp.ownerDocument, 'P', {
        type: 'VLAN-PRIORITY',
      });
      pVlanPrio.textContent = '4';
      actions.push({ new: { parent: address, element: pVlanPrio } });
    });

  return actions;
}

function initGSEElements(
  doc: XMLDocument,
  connectedAp: Element,
  options: {
    macGeneratorGse: () => string;
    appidGeneratorGse: () => string;
    unconnectedGseControl: Set<string>;
  }
): SimpleAction[] {
  const actions: SimpleAction[] = [];

  const ied = doc.querySelector(
    `IED[name="${connectedAp.getAttribute('iedName')}"]`
  );

  Array.from(ied?.querySelectorAll('GSEControl') ?? [])
    .filter(gseControl => {
      const id = identity(gseControl) as string;

      if (options.unconnectedGseControl.has(id)) {
        options.unconnectedGseControl.delete(id);
        return true;
      }

      return false;
    })
    .forEach(gseControl => {
      const cbName = gseControl.getAttribute('name');
      const ldInst =
        gseControl.closest('LDevice')?.getAttribute('inst') ?? null;

      const gSE = createElement(connectedAp.ownerDocument, 'GSE', {
        cbName,
        ldInst,
      });
      actions.push({ new: { parent: connectedAp, element: gSE } });

      const address = createElement(connectedAp.ownerDocument, 'Address', {});
      actions.push({ new: { parent: gSE, element: address } });

      const pMac = createElement(connectedAp.ownerDocument, 'P', {
        type: 'MAC-Address',
      });
      pMac.textContent = options.macGeneratorGse();
      actions.push({ new: { parent: address, element: pMac } });

      const pAppId = createElement(connectedAp.ownerDocument, 'P', {
        type: 'APPID',
      });
      pAppId.textContent = options.appidGeneratorGse();
      actions.push({ new: { parent: address, element: pAppId } });

      const pVlanId = createElement(connectedAp.ownerDocument, 'P', {
        type: 'VLAN-ID',
      });
      pVlanId.textContent = '000';
      actions.push({ new: { parent: address, element: pVlanId } });

      const pVlanPrio = createElement(connectedAp.ownerDocument, 'P', {
        type: 'VLAN-PRIORITY',
      });
      pVlanPrio.textContent = '4';
      actions.push({ new: { parent: address, element: pVlanPrio } });

      const minTime = createElement(connectedAp.ownerDocument, 'MinTime', {
        unit: 's',
        multiplier: 'm',
      });
      minTime.textContent = '10';
      actions.push({ new: { parent: gSE, element: minTime } });

      const maxTime = createElement(connectedAp.ownerDocument, 'MaxTime', {
        unit: 's',
        multiplier: 'm',
      });
      maxTime.textContent = '10000';
      actions.push({ new: { parent: gSE, element: maxTime } });
    });

  return actions;
}

function unconnectedGseControls(doc: XMLDocument): Set<string> {
  const allGseControl = Array.from(doc.querySelectorAll('GSEControl'));

  const unconnectedGseControl = allGseControl
    .filter(gseControl => {
      const iedName = gseControl.closest('IED')?.getAttribute('name');
      const ldInst = gseControl.closest('LDevice')?.getAttribute('inst');
      const cbName = gseControl.getAttribute('name');

      return !doc.querySelector(
        `ConnectedAP[iedName="${iedName}"] ` +
          `> GSE[ldInst="${ldInst}"][cbName="${cbName}"]`
      );
    })
    .map(gseControl => identity(gseControl) as string);

  const mySet = new Set(unconnectedGseControl);
  return mySet;
}

function unconnectedSampledValueControls(doc: XMLDocument): Set<string> {
  const allSmvControl = Array.from(doc.querySelectorAll('SampledValueControl'));

  const unconnectedSmvControl = allSmvControl
    .filter(gseControl => {
      const iedName = gseControl.closest('IED')?.getAttribute('name');
      const ldInst = gseControl.closest('LDevice')?.getAttribute('inst');
      const cbName = gseControl.getAttribute('name');

      return !doc.querySelector(
        `ConnectedAP[iedName="${iedName}"] ` +
          `> SMV[ldInst="${ldInst}"][cbName="${cbName}"]`
      );
    })
    .map(gseControl => identity(gseControl) as string);

  const mySet = new Set(unconnectedSmvControl);
  return mySet;
}

function createConnectedApAction(parent: Element): WizardActor {
  return (
    _: WizardInputElement[],
    __: Element,
    list?: List | null
  ): EditorAction[] => {
    const doc = parent.ownerDocument;

    // generators ensure unique MAC-Address and APPID across the project
    const macGeneratorSmv = mACAddressGenerator(doc, 'SMV');
    const appidGeneratorSmv = appIdGenerator(doc, 'SMV');
    const macGeneratorGse = mACAddressGenerator(doc, 'GSE');
    const appidGeneratorGse = appIdGenerator(doc, 'GSE');

    // track GSE and SMV for multiselect access points connection
    const unconnectedGseControl = unconnectedGseControls(doc);
    const unconnectedSampledValueControl = unconnectedSampledValueControls(doc);

    if (!list) return [];

    const identities = (<ListItemBase[]>list.selected).map(item => item.value);

    const actions = identities.map(identity => {
      const [iedName, apName] = identity.split('>');
      const actions: SimpleAction[] = [];

      const connectedAp = createElement(parent.ownerDocument, 'ConnectedAP', {
        iedName,
        apName,
      });
      actions.push({ new: { parent, element: connectedAp } });
      actions.push(
        ...initSMVElements(doc, connectedAp, {
          macGeneratorSmv,
          appidGeneratorSmv,
          unconnectedSampledValueControl,
        })
      );
      actions.push(
        ...initGSEElements(doc, connectedAp, {
          macGeneratorGse,
          appidGeneratorGse,
          unconnectedGseControl,
        })
      );

      return { title: 'Added ConnectedAP', actions };
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

/**
 * Creates a TypeRestriction checkbox for a given ConnectedAP wizard.
 * @param element - The ConnectedAP of the wizard.
 * @returns The checkbox within a formfield.
 */
export function createTypeRestrictionCheckbox(
  element: Element
): TemplateResult {
  return html`<mwc-formfield
    label="${translate('connectedap.wizard.addschemainsttype')}"
    ><mwc-checkbox
      id="typeRestriction"
      ?checked=${hasTypeRestriction(element)}
    ></mwc-checkbox>
  </mwc-formfield>`;
}

export function createPTextField(
  element: Element,
  pType: string
): TemplateResult {
  return html`<wizard-textfield
    required
    label="${pType}"
    pattern="${ifDefined(typePattern[pType])}"
    ?nullable=${typeNullable[pType]}
    .maybeValue=${element.querySelector(`:scope > Address > P[type="${pType}"]`)
      ?.innerHTML ?? null}
    maxLength="${ifDefined(typeMaxLength[pType])}"
  ></wizard-textfield>`;
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
        html`${createTypeRestrictionCheckbox(element)}
        ${getTypes(element).map(
          pType => html`${createPTextField(element, pType)}`
        )}`,
      ],
    },
  ];
}
