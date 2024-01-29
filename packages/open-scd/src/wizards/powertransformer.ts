import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import {
  createElement,
  EditorAction,
  getValue,
  isPublic,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';

import { replaceNamingAction } from "./foundation/actions.js";

const defaultPowerTransformerType = 'PTR';

export function createAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!);
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const element = createElement(parent.ownerDocument, 'PowerTransformer', {
      name,
      desc,
      type: defaultPowerTransformerType
    });

    const action = {
      new: {
        parent,
        element,
      },
    };

    return [action];
  };
}

export function renderPowerTransformerWizard(
  name: string | null,
  desc: string | null,
  type: string | null,
  reservedNames: string[]
): TemplateResult[] {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${translate('powertransformer.wizard.nameHelper')}"
      required
      validationMessage="${translate('textfield.required')}"
      dialogInitialFocus
      .reservedValues=${reservedNames}
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${translate('powertransformer.wizard.descHelper')}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="type"
      .maybeValue=${type}
      disabled
      helper="${translate('powertransformer.wizard.typeHelper')}"
    ></wizard-textfield>`,
  ];
}

export function reservedNamesPowerTransformer(parent: Element, currentName?: string | null): string[] {
  return Array.from(parent.querySelectorAll('PowerTransformer'))
    .filter(isPublic)
    .map(pwt => pwt.getAttribute('name') ?? '')
    .filter(name => currentName && name !== currentName);
}

export function createPowerTransformerWizard(parent: Element): Wizard {
  const reservedNames = reservedNamesPowerTransformer(parent);

  return [
    {
      title: get('powertransformer.wizard.title.add'),
      element: undefined,
      primary: {
        icon: '',
        label: get('add'),
        action: createAction(parent),
      },
      content: renderPowerTransformerWizard('', null, defaultPowerTransformerType, reservedNames),
    },
  ];
}

export function editPowerTransformerWizard(element: Element): Wizard {
  const reservedNames = reservedNamesPowerTransformer(
    <Element>element.parentNode!,
    element.getAttribute('name'));

  return [
    {
      title: get('powertransformer.wizard.title.edit'),
      element,
      primary: {
        icon: 'edit',
        label: get('save'),
        action: replaceNamingAction(element),
      },
      content: renderPowerTransformerWizard(
        element.getAttribute('name'),
        element.getAttribute('desc'),
        element.getAttribute('type'),
        reservedNames
      ),
    },
  ];
}
