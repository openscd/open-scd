import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

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

function typeStr(condEq: Element): string {
  return condEq.getAttribute('type') === 'DIS' &&
    condEq.querySelector('Terminal')?.getAttribute('cNodeName') === 'grounded'
    ? 'ERS'
    : condEq.getAttribute('type') ?? '';
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
