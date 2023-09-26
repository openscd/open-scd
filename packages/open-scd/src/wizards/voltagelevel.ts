import { html, TemplateResult } from 'lit-html';
import { get, translate } from 'lit-translate';

import '../wizard-textfield.js';
import {
  cloneElement,
  ComplexAction,
  createElement,
  EditorAction,
  getMultiplier,
  getValue,
  patterns,
  SimpleAction,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';

import { updateReferences } from "./foundation/references.js";

const initial = {
  nomFreq: '50',
  numPhases: '3',
  Voltage: '110',
  multiplier: 'k',
};

function render(
  name: string,
  desc: string | null,
  nomFreq: string | null,
  numPhases: string | null,
  Voltage: string | null,
  multiplier: string | null
): TemplateResult[] {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${translate('voltagelevel.wizard.nameHelper')}"
      required
      validationMessage="${translate('textfield.required')}"
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${translate('voltagelevel.wizard.descHelper')}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="nomFreq"
      .maybeValue=${nomFreq}
      nullable
      helper="${translate('voltagelevel.wizard.nomFreqHelper')}"
      suffix="Hz"
      required
      validationMessage="${translate('textfield.nonempty')}"
      pattern="${patterns.unsigned}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="numPhases"
      .maybeValue=${numPhases}
      nullable
      helper="${translate('voltagelevel.wizard.numPhaseHelper')}"
      suffix="#"
      required
      validationMessage="${translate('textfield.nonempty')}"
      type="number"
      min="1"
      max="255"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="Voltage"
      .maybeValue=${Voltage}
      nullable
      unit="V"
      .multipliers=${[null, 'G', 'M', 'k', '', 'm']}
      .multiplier=${multiplier}
      helper="${translate('voltagelevel.wizard.voltageHelper')}"
      required
      validationMessage="${translate('textfield.nonempty')}"
      pattern="${patterns.decimal}"
    ></wizard-textfield>`,
  ];
}

export function createAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!);
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const nomFreq = getValue(inputs.find(i => i.label === 'nomFreq')!);
    const numPhases = getValue(inputs.find(i => i.label === 'numPhases')!);
    const Voltage = getValue(inputs.find(i => i.label === 'Voltage')!);
    const multiplier = getMultiplier(inputs.find(i => i.label === 'Voltage')!);

    const element = createElement(parent.ownerDocument, 'VoltageLevel', {
      name,
      desc,
      nomFreq,
      numPhases,
    });

    if (Voltage !== null) {
      const voltageElement = createElement(parent.ownerDocument, 'Voltage', {
        unit: 'V',
        multiplier,
      });
      voltageElement.textContent = Voltage;
      element.appendChild(voltageElement);
    }

    return [
      {
        new: {
          parent,
          element,
        },
      },
    ];
  };
}

export function voltageLevelCreateWizard(parent: Element): Wizard {
  return [
    {
      title: get('voltagelevel.wizard.title.add'),
      element: undefined,
      primary: {
        icon: 'add',
        label: get('add'),
        action: createAction(parent),
      },
      content: render(
        '',
        '',
        initial.nomFreq,
        initial.numPhases,
        initial.Voltage,
        initial.multiplier
      ),
    },
  ];
}

function getVoltageAction(
  oldVoltage: Element | null,
  Voltage: string | null,
  multiplier: string | null,
  voltageLevel: Element
): SimpleAction {
  if (oldVoltage === null) {
    const element = createElement(voltageLevel.ownerDocument, 'Voltage', {
      unit: 'V',
      multiplier,
    });
    element.textContent = Voltage;
    return {
      new: {
        parent: voltageLevel,
        element,
        reference: voltageLevel.firstElementChild,
      },
    };
  }

  if (Voltage === null)
    return {
      old: {
        parent: voltageLevel,
        element: oldVoltage,
        reference: oldVoltage.nextSibling,
      },
    };

  const newVoltage = cloneElement(oldVoltage, { multiplier });
  newVoltage.textContent = Voltage;

  return {
    old: { element: oldVoltage },
    new: { element: newVoltage },
  };
}

export function updateAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const name = inputs.find(i => i.label === 'name')!.value!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const nomFreq = getValue(inputs.find(i => i.label === 'nomFreq')!);
    const numPhases = getValue(inputs.find(i => i.label === 'numPhases')!);
    const Voltage = getValue(inputs.find(i => i.label === 'Voltage')!);
    const multiplier = getMultiplier(inputs.find(i => i.label === 'Voltage')!);

    let voltageLevelAction: SimpleAction | null;
    let voltageAction: SimpleAction | null;

    if (
      name === element.getAttribute('name') &&
      desc === element.getAttribute('desc') &&
      nomFreq === element.getAttribute('nomFreq') &&
      numPhases === element.getAttribute('numPhases')
    ) {
      voltageLevelAction = null;
    } else {
      const newElement = cloneElement(element, {
        name,
        desc,
        nomFreq,
        numPhases,
      });
      voltageLevelAction = { old: { element }, new: { element: newElement } };
    }

    if (
      Voltage ===
        (element.querySelector('VoltageLevel > Voltage')?.textContent?.trim() ??
          null) &&
      multiplier ===
        (element
          .querySelector('VoltageLevel > Voltage')
          ?.getAttribute('multiplier') ?? null)
    ) {
      voltageAction = null;
    } else {
      voltageAction = getVoltageAction(
        element.querySelector('VoltageLevel > Voltage'),
        Voltage,
        multiplier,
        voltageLevelAction?.new.element ?? element
      );
    }

    const complexAction: ComplexAction = {
      actions: [],
      title: get('voltagelevel.action.updateVoltagelevel', {name}),
    };
    if (voltageLevelAction) complexAction.actions.push(voltageLevelAction);
    if (voltageAction) complexAction.actions.push(voltageAction);
    complexAction.actions.push(...updateReferences(
      element,
      element.getAttribute('name'),
      name));
    return complexAction.actions.length ? [complexAction] : [];
  };
}

export function voltageLevelEditWizard(element: Element): Wizard {
  return [
    {
      title: get('voltagelevel.wizard.title.edit'),
      element,
      primary: {
        icon: 'edit',
        label: get('save'),
        action: updateAction(element),
      },
      content: render(
        element.getAttribute('name') ?? '',
        element.getAttribute('desc'),
        element.getAttribute('nomFreq'),
        element.getAttribute('numPhases'),
        element.querySelector('VoltageLevel > Voltage')?.textContent?.trim() ??
          null,
        element
          .querySelector('VoltageLevel > Voltage')
          ?.getAttribute('multiplier') ?? null
      ),
    },
  ];
}
