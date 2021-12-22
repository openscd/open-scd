import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import {
  isPublic,
  Wizard,
} from '../foundation.js';

import { updateNamingAction } from "./foundation/actions.js";

export function renderPowerTransformerWizard(
  name: string | null,
  desc: string | null,
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
  ];
}

export function reservedNamesPowerTransformer(currentElement: Element): string[] {
  return Array.from(
    currentElement.parentNode!.querySelectorAll('PowerTransformer')
  )
    .filter(isPublic)
    .map(cNode => cNode.getAttribute('name') ?? '')
    .filter(name => name !== currentElement.getAttribute('name'));
}

export function editPowerTransformerWizard(element: Element): Wizard {
  return [
    {
      title: get('powertransformer.wizard.title.edit'),
      element,
      primary: {
        icon: 'edit',
        label: get('save'),
        action: updateNamingAction(element),
      },
      content: renderPowerTransformerWizard(
        element.getAttribute('name'),
        element.getAttribute('desc'),
        reservedNamesPowerTransformer(element)
      ),
    },
  ];
}
