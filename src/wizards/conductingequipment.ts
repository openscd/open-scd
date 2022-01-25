import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';

import '../wizard-textfield.js';
import {
  createElement,
  crossProduct,
  EditorAction,
  getValue,
  isPublic,
  Wizard,
  WizardActor,
  WizardInput,
} from '../foundation.js';
import { updateNamingAction } from './foundation/actions.js';

const types: Partial<Record<string, string>> = {
  // standard
  CBR: 'Circuit Breaker',
  DIS: 'Disconnector',
  // custom
  ERS: 'Earth Switch',
  CTR: 'Current Transformer',
  VTR: 'Voltage Transformer',
  AXN: 'Auxiliary Network',
  BAT: 'Battery',
  BSH: 'Bushing',
  CAP: 'Capacitor Bank',
  CON: 'Converter',
  EFN: 'Earth Fault Neutralizer',
  FAN: 'Fan',
  GIL: 'Gas Insulated Line',
  GEN: 'Generator',
  IFL: 'Infeeding Line',
  MOT: 'Motor',
  RES: 'Neutral Resistor',
  REA: 'Reactor',
  PSH: 'Power Shunt',
  CAB: 'Power Cable',
  PMP: 'Pump',
  LIN: 'Power Overhead Line',
  RRC: 'Rotating Reactive Component',
  SCR: 'Semiconductor Controlled Rectifier',
  SAR: 'Surge Arrester',
  SMC: 'Synchronous Machine',
  TCF: 'Thyristor Controlled Frequency Converter',
  TCR: 'Thyristor Controlled Reactive Component',
};

/**
 * Finds LN within IED based on LNode from Substation SCL section.
 * @param lNode - LNode in Substation SCL section.
 * @returns - LN in the IED SCL section.
 */
function getLogicalNodeInstance(lNode: Element | null): Element | null {
  if (!lNode) return null;
  const [lnInst, lnClass, iedName, ldInst, prefix] = [
    'lnInst',
    'lnClass',
    'iedName',
    'ldInst',
    'prefix',
  ].map(attribute => lNode?.getAttribute(attribute));
  const iedSelector = [`IED[name="${iedName}"]`, 'IED'];
  const lDevicePath = ['AccessPoint > Server'];
  const lNSelector = [
    `LDevice[inst="${ldInst}"] > LN[inst="${lnInst}"][lnClass="${lnClass}"]`,
  ];
  const lNPrefixSelector =
    prefix && prefix !== ''
      ? [`[prefix="${prefix}"]`]
      : ['[prefix=""]', ':not(prefix)'];
  return lNode.ownerDocument.querySelector(
    crossProduct(
      iedSelector,
      [' > '],
      lDevicePath,
      [' > '],
      lNSelector,
      lNPrefixSelector
    )
      .map(strings => strings.join(''))
      .join(',')
  );
}

/**
 * Searches DataTypeTemplates for SwTyp:stVal from an LN or LNode reference.
 * @param lNorlNode - SCL IED Logical Node or LNode from Substation section.
 * @returns - value of stVal data attribute if found.
 */
function getSwitchTypeValueFromDTT(lNorlNode: Element): string | undefined {
  const rootNode = lNorlNode?.ownerDocument;
  const lNodeType = lNorlNode.getAttribute('lnType');
  const lnClass = lNorlNode.getAttribute('lnClass');
  const dObj = rootNode.querySelector(
    `DataTypeTemplates > LNodeType[id="${lNodeType}"][lnClass="${lnClass}"] > DO[name="SwTyp"]`
  );
  if (dObj) {
    const dORef = dObj.getAttribute('type');
    return rootNode
      .querySelector(
        `DataTypeTemplates > DOType[id="${dORef}"] > DA[name="stVal"] > Val`
      )
      ?.innerHTML.trim();
  }
  // definition missing
  return undefined;
}

/**
 * Finds whether a logical node has the SwTyp:stVal data attribute.
 * @param lN - logical node within the IED section.
 * @returns - value of type as a string.
 */
function getSwitchTypeValue(lN: Element): string | undefined {
  const daInstantiated = lN.querySelector(
    'DOI[name="SwTyp"] > DAI[name="stVal"]'
  );
  // definition is on instantiated object
  if (daInstantiated) {
    return daInstantiated.querySelector('Val')?.innerHTML.trim();
    // definition must be on the data object type
  } else {
    return getSwitchTypeValueFromDTT(lN);
  }
}

/**
 * Returns true if any terminal of the ConductingEquipment has a connectivity node name 'grounded'.
 * @param condEq - SCL ConductingEquipment.
 * @returns if any terminal of the ConductingEquipment is grounded.
 */
function containsGroundedTerminal(condEq: Element): boolean {
  return Array.from(condEq.querySelectorAll('Terminal')).some(
    t => t.getAttribute('cNodeName') === 'grounded'
  );
}

/**
 * Looks to see if the Conducting Equipment contains an XSWI LN. If so, check if the XSWI definition
 * includes SwTyp and if stVal indicates an Earth/Earthing Switch by looking at either the IED or the
 * DataTypeTemplates.
 * @param condEq - SCL ConductingEquipment.
 * @returns true if an earth switch is found, false otherwise.
 */
function containsEarthSwitchDefinition(condEq: Element): boolean {
  const lNodeXSWI = condEq.querySelector('LNode[lnClass="XSWI"]');
  const lN = getLogicalNodeInstance(lNodeXSWI);
  let swTypVal;
  if (lN) {
    swTypVal = getSwitchTypeValue(lN);
  } else if (lNodeXSWI) {
    swTypVal = getSwitchTypeValueFromDTT(lNodeXSWI);
  }
  return swTypVal
    ? ['Earthing Switch', 'High Speed Earthing Switch'].includes(swTypVal)
    : false;
}

/**
 * Find the type of an SCL conducting equipment. For earth switches derive this from terminals or XSWI logical node definition.
 * @param condEq - SCL ConductingEquipment
 * @returns  Three letter primary apparatus device type as defined in IEC 61850-6.
 */
export function typeStr(condEq: Element): string {
  if (
    containsGroundedTerminal(condEq) ||
    (condEq.getAttribute('type') === 'DIS' &&
      containsEarthSwitchDefinition(condEq))
  ) {
    // these checks only carried out for a three phase system
    return 'ERS';
  } else {
    return condEq.getAttribute('type') ?? '';
  }
}

export function typeName(condEq: Element): string {
  return types[typeStr(condEq)] ?? get('conductingequipment.unknownType');
}

function renderTypeSelector(
  option: 'edit' | 'create',
  type: string
): TemplateResult {
  return option === 'create'
    ? html`<mwc-select
        style="--mdc-menu-max-height: 196px;"
        required
        label="type"
        helper="${translate('conductingequipment.wizard.typeHelper')}"
        validationMessage="${translate('textfield.required')}"
      >
        ${Object.keys(types).map(
          v => html`<mwc-list-item value="${v}">${types[v]}</mwc-list-item>`
        )}
      </mwc-select>`
    : html`<mwc-select
        label="type"
        helper="${translate('conductingequipment.wizard.typeHelper')}"
        validationMessage="${translate('textfield.required')}"
        disabled
      >
        <mwc-list-item selected value="0">${type}</mwc-list-item>
      </mwc-select>`;
}

export function renderConductingEquipmentWizard(
  name: string | null,
  desc: string | null,
  option: 'edit' | 'create',
  type: string,
  reservedNames: string[]
): TemplateResult[] {
  return [
    renderTypeSelector(option, type),
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${translate('conductingequipment.wizard.nameHelper')}"
      required
      validationMessage="${translate('textfield.required')}"
      dialogInitialFocus
      .reservedValues=${reservedNames}
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${translate('conductingequipment.wizard.descHelper')}"
    ></wizard-textfield>`,
  ];
}

export function createAction(parent: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!);
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const proxyType = getValue(inputs.find(i => i.label === 'type')!);
    const type = proxyType === 'ERS' ? 'DIS' : proxyType;

    const element = createElement(parent.ownerDocument, 'ConductingEquipment', {
      name,
      type,
      desc,
    });

    if (proxyType === 'ERS')
      element.appendChild(
        createElement(parent.ownerDocument, 'Terminal', {
          name: 'T1',
          cNodeName: 'grounded',
        })
      );

    const action = {
      new: {
        parent,
        element,
      },
    };

    return [action];
  };
}

export function reservedNamesConductingEquipment(parent: Element, currentName?: string | null): string[] {
  return Array.from(parent.querySelectorAll('ConductingEquipment'))
    .filter(isPublic)
    .map(condEq => condEq.getAttribute('name') ?? '')
    .filter(name => currentName && name !== currentName);
}

export function createConductingEquipmentWizard(parent: Element): Wizard {
  const reservedNames = reservedNamesConductingEquipment(parent);

  return [
    {
      title: get('conductingequipment.wizard.title.add'),
      element: undefined,
      primary: {
        icon: 'add',
        label: get('add'),
        action: createAction(parent),
      },
      content: renderConductingEquipmentWizard('', '', 'create', '', reservedNames),
    },
  ];
}

export function editConductingEquipmentWizard(element: Element): Wizard {
  const reservedNames = reservedNamesConductingEquipment(
    <Element>element.parentNode!,
    element.getAttribute('name'));

  return [
    {
      title: get('conductingequipment.wizard.title.edit'),
      element,
      primary: {
        icon: 'edit',
        label: get('save'),
        action: updateNamingAction(element),
      },
      content: renderConductingEquipmentWizard(
        element.getAttribute('name'),
        element.getAttribute('desc'),
        'edit',
        typeName(element),
        reservedNames
      ),
    },
  ];
}
