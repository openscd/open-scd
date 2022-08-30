import { html, TemplateResult } from 'lit-element';
import { nothing } from 'lit-html';
import { get } from 'lit-translate';

import { DaiFieldTypes, getCustomField } from './foundation/dai-field-type.js';

import '../../src/wizard-textfield.js';

import {
  ComplexAction,
  EditorAction,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';
import { SCL_NAMESPACE } from '../schemas.js';

export function updateValue(
  element: Element,
  instanceElement: Element
): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const bType = element.getAttribute('bType')!;
    const newValue = getCustomField()[<DaiFieldTypes>bType].value(inputs);

    const name = instanceElement.getAttribute('name');
    const complexAction: ComplexAction = {
      actions: [],
      title: get('dai.action.updatedai', { daiName: name! }),
    };

    const oldVal = instanceElement.querySelector('Val');
    if (oldVal) {
      const newVal = <Element>oldVal.cloneNode(false);
      newVal.textContent = newValue;
      complexAction.actions.push({
        old: { element: oldVal },
        new: { element: newVal },
      });
    } else {
      const newVal = instanceElement.ownerDocument.createElementNS(
        SCL_NAMESPACE,
        'Val'
      );
      newVal.textContent = newValue;
      complexAction.actions.push({
        new: { parent: instanceElement, element: newVal },
      });
    }
    return [complexAction];
  };
}

export function createValue(
  parent: Element,
  element: Element,
  newElement: Element,
  instanceElement: Element
): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const bType = element.getAttribute('bType')!;
    const newValue = getCustomField()[<DaiFieldTypes>bType].value(inputs);

    let valElement = instanceElement.querySelector('Val');
    if (!valElement) {
      valElement = parent.ownerDocument.createElementNS(SCL_NAMESPACE, 'Val');
      instanceElement.append(valElement);
    }
    valElement.textContent = newValue;

    const name = instanceElement.getAttribute('name');
    const complexAction: ComplexAction = {
      actions: [{ new: { parent, element: newElement } }],
      title: get('dai.action.createdai', { daiName: name! }),
    };
    return [complexAction];
  };
}

export function renderDAIWizard(
  element: Element,
  instanceElement?: Element
): TemplateResult[] {
  const bType = element.getAttribute('bType')!;
  const daValue = element.querySelector('Val')?.textContent?.trim() ?? '';

  return [
    html` ${getCustomField()[<DaiFieldTypes>bType].render(
      element,
      instanceElement
    )}
    ${daValue
      ? html`<wizard-textfield
          id="daVal"
          label="DA Template Value"
          .maybeValue=${daValue}
          readonly
          disabled
        >
        </wizard-textfield>`
      : nothing}`,
  ];
}

export function createDAIWizard(
  parent: Element,
  newElement: Element,
  element: Element
): Wizard {
  // Retrieve the created DAI, can be the new element or one of the child elements below.
  const instanceElement =
    newElement.tagName === 'DAI'
      ? newElement
      : newElement.querySelector('DAI')!;

  return [
    {
      title: get('dai.wizard.title.create', {
        daiName: instanceElement?.getAttribute('name') ?? '',
      }),
      element: instanceElement,
      primary: {
        icon: 'edit',
        label: get('save'),
        action: createValue(parent, element, newElement, instanceElement),
      },
      content: renderDAIWizard(element, instanceElement),
    },
  ];
}

export function editDAIWizard(
  element: Element,
  instanceElement?: Element
): Wizard {
  return [
    {
      title: get('dai.wizard.title.edit', {
        daiName: instanceElement?.getAttribute('name') ?? '',
      }),
      element: instanceElement,
      primary: {
        icon: 'edit',
        label: get('save'),
        action: updateValue(element, instanceElement!),
      },
      content: renderDAIWizard(element, instanceElement),
    },
  ];
}
