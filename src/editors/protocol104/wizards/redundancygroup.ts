import { html, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import '../../../wizard-textfield.js';
import {
  pTypesRedundancyGroup104, typePattern,
} from '../foundation/p-types.js';
import {
  EditorAction,
  Wizard,
  WizardActor,
  WizardInputElement
} from '../../../foundation.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { typeMaxLength, typeNullable } from '../../../wizards/foundation/p-types.js';

export function updateRedundancyGroupAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[], wizard: Element): EditorAction[] => {

    return [];
  };
}

export function createRedundancyGroupPTextField(element: Element, pType: string): TemplateResult {
  return html`<wizard-textfield
    required
    label="${pType}"
    pattern="${ifDefined(typePattern[pType])}"
    ?nullable=${typeNullable[pType]}
    .maybeValue=${element.querySelector(
      `Address > P[type$="${pType}"]`
    )?.innerHTML ?? null}
    maxLength="${ifDefined(typeMaxLength[pType])}"
  ></wizard-textfield>`
}

export function editRedundancyGroup104Wizard(element: Element): Wizard {
  return [
    {
      title: get('protocol104.network.redundancygroup.title.edit'),
      element,
      primary: {
        icon: 'save',
        label: get('save'), 
        action: updateRedundancyGroupAction(element),
      },
      content: [
        html`<wizard-textfield
          readOnly
          label="Redundancy group number"
          .maybeValue=${element.getAttribute('number') ?? null}
        ></wizard-textfield>
        ${pTypesRedundancyGroup104.map(
          pType => html`${createRedundancyGroupPTextField(element, pType)}`
        )}`,
      ],
    },
  ];
}
