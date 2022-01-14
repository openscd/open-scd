import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';

import '../wizard-textfield.js';
import {
  createElement,
  EditorAction,
  getValue,
  isPublic,
  Wizard,
  WizardActor,
  WizardInput,
} from '../foundation.js';
import { updateNamingAction } from './foundation/actions.js';
import { getDirections } from '../editors/singlelinediagram/sld-drawing.js';

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
 * Finds Logical Node from IED based on Logical Node in the Substation SCL section.
 * @param lNode - Logical Node in Substation SCL section.
 * @returns - Logical Node in the IED SCL section.
 */
function getLNodefromIED(lNode: Element | null): Element | null {
  if (!lNode) return null;
  const [iedName, ldInst, lnClass, lnInst, lnType] = [
    'iedName',
    'ldInst',
    'lnClass',
    'lnInst',
    'lnType',
  ].map(attribute => lNode?.getAttribute(attribute));
  return (<Element>lNode?.getRootNode()).querySelector(`IED[name='${iedName}'] > AccessPoint > Server > LDevice[inst='${ldInst}'] > LN[inst='${lnInst}'][lnType='${lnType}'][lnClass='${lnClass}']`);
}

/**
 * Finds data attribute by inspecting an IED's logical node or types.
 * @param lNode - LNode within the IED section.
 * @param doName - name for data object (e.g. SwTyp).
 * @param sdName - id for sub data object.
 * @param daName - name for data attribute (e.g. stVal).
 * @returns - value of type as a string.
 */
function getDataAttributeValue(lNode: Element, doName: string, sdName: string | undefined, daName: string): string | undefined {
  const sdDef = sdName ? ` > SDI[name='${sdName}']` : '';
  const daInstantiated = lNode.querySelector(`DOI[name='${doName}']${sdDef} > DAI[name='${daName}'`);
  if (daInstantiated) {
    // data attribute is fully instantiated within a DOI/SDI, look for it within: DOI > ?SDI > DAI
    return daInstantiated.querySelector('Val')?.innerHTML.trim();
  } else {
    const rootNode = <Element>lNode?.getRootNode();
    const lNodeType = lNode.getAttribute('type');
    const lnClass = lNode.getAttribute('lnClass');
    if (sdName) {
      // definition to be found on the subdata type
      // this code path has not been tested but may be of use elsewhere
      const sdo = rootNode.querySelector(`DataTypeTemplates > LNodeType[id=${lNodeType}][class=${lnClass}] > SDO[name=${doName}]`);
      if (sdo) {
        const sdoRef = sdo.getAttribute('type');
        return rootNode.querySelector(`DataTypeTemplates > DOType[id=${sdoRef}] > DA[name='${daName}'] > Val`)?.innerHTML.trim();
      }
      // definition missing
      return undefined;
    } else {
      // definition must be on the data object type
      const doObj = rootNode.querySelector(`DataTypeTemplates > LNodeType[id=${lNodeType}][class=${lnClass}] > DO[name=${doName}]`);
      if (doObj) {
        const doRef = doObj.getAttribute('type');
        return rootNode.querySelector(`DataTypeTemplates > DOType[id=${doRef}] > DA[name='${daName}'] > Val`)?.innerHTML.trim();
      }
      // definition missing
      return undefined;
    } 
  }
}

/**
 * Returns true if any terminal of the ConductingEquipment has a connectivity node name 'grounded'.
 * @param condEq - SCL ConductingEquipment.
 * @returns if any terminal of the ConductingEquipment is grounded.
 */
function containsGroundedTerminal(condEq: Element): boolean {
  return (Array.from(condEq.querySelectorAll('Terminal'))
    .map(t => t.getAttribute('cNodeName'))
    .includes('grounded')
  );
}

/**
 * Looks to see if the Conducting Equipment contains an XSWI logical node. If so, check if the XSWI definition
 * includes SwTyp and if stVal indicates an Earth/Earthing Switch.
 * @param condEq - SCL ConductingEquipment
 * @returns true if an earth switch is found, false otherwise.
 */
function containsEarthSwitchDefinition(condEq: Element): boolean {
  const lNodeXSWI = condEq.querySelector("LNode[lnClass='XSWI']");
  const lNode = getLNodefromIED(lNodeXSWI);
  if (lNode) {
    const swTypVal = getDataAttributeValue(lNode, 'SwTyp', undefined, 'stVal');
    return swTypVal ? ['Earthing Switch', 'High Speed Earthing Switch'].includes(swTypVal) : false;
  } else {
    return false; 
  }
}

/**
 * Find the type of an SCL conducting equipment. For earth switches derive this from terminals or XSWI logical node definition.
 * @param condEq - SCL ConductingEquipment
 * @returns  Three letter primary apparatus device type as defined in IEC 61850-6.
 */
export function typeStr(condEq: Element): string {
  if (containsGroundedTerminal(condEq) || (condEq.getAttribute('type') === 'DIS' && ( containsEarthSwitchDefinition (condEq)))) {
    // these checks only carried out for a three phase system
    return 'ERS';
  } else {
    return condEq.getAttribute('type') ?? '';
  }
}

function typeName(condEq: Element): string {
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

function render(
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

export function createConductingEquipmentWizard(parent: Element): Wizard {
  const reservedNames = Array.from(
    parent.querySelectorAll('ConductingEquipment')
  )
    .filter(isPublic)
    .map(condEq => condEq.getAttribute('name') ?? '');

  return [
    {
      title: get('conductingequipment.wizard.title.add'),
      element: undefined,
      primary: {
        icon: 'add',
        label: get('add'),
        action: createAction(parent),
      },
      content: render('', '', 'create', '', reservedNames),
    },
  ];
}

export function editConductingEquipmentWizard(element: Element): Wizard {
  const reservedNames = Array.from(
    element.parentNode!.querySelectorAll('ConductingEquipment')
  )
    .filter(isPublic)
    .map(condEq => condEq.getAttribute('name') ?? '')
    .filter(name => name !== element.getAttribute('name'));

  return [
    {
      title: get('conductingequipment.wizard.title.edit'),
      element,
      primary: {
        icon: 'edit',
        label: get('save'),
        action: updateNamingAction(element),
      },
      content: render(
        element.getAttribute('name'),
        element.getAttribute('desc'),
        'edit',
        typeName(element),
        reservedNames
      ),
    },
  ];
}
