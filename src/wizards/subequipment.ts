import { html, TemplateResult } from 'lit-html';
import { get, translate } from 'lit-translate';

import {
  cloneElement,
  getChildElementsByTagName,
  getValue,
  SimpleAction,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';

import '../wizard-textfield.js';
import '../wizard-select.js';
interface ContentOptions {
  name: string | null;
  desc: string | null;
  phase: string | null;
  virtual: string | null;
  reservedNames: string[];
}

export function contentFunctionWizard(
  content: ContentOptions
): TemplateResult[] {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${content.name}
      .reservedValues=${content.reservedNames}
      helper="${translate('scl.name')}"
      required
      validationMessage="${translate('textfield.required')}"
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${content.desc}
      nullable
      helper="${translate('scl.desc')}"
    ></wizard-textfield>`,
    html`<wizard-select
      label="phase"
      fixedMenuPosition
      .maybeValue=${content.phase || ''}
      nullable
      helper="${translate('scl.phase')}"
    >
      <mwc-list-item value="A"> A </mwc-list-item>
      <mwc-list-item value="B"> B </mwc-list-item>
      <mwc-list-item value="C"> C </mwc-list-item>
      <mwc-list-item value="N"> N </mwc-list-item>
      <mwc-list-item value="all"> All </mwc-list-item>
      <mwc-list-item value="none"> None </mwc-list-item>
      <mwc-list-item value="AB"> AB </mwc-list-item>
      <mwc-list-item value="BC"> BC </mwc-list-item>
      <mwc-list-item value="CA"> CA </mwc-list-item>
    </wizard-select> `,
    html`<wizard-checkbox
      label="virtual"
      .maybeValue=${content.virtual}
      nullable
      helper="${translate('scl.virtual')}"
    ></wizard-checkbox>`,
  ];
}

function updateSubEquipmentAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): SimpleAction[] => {
    const subfunctionAttrs: Record<string, string | null> = {};
    const subFunctionKeys = ['name', 'desc', 'phase', 'virtual'];
    subFunctionKeys.forEach(key => {
      subfunctionAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    if (
      subFunctionKeys.some(
        key => subfunctionAttrs[key] !== element.getAttribute(key)
      )
    ) {
      const newElement = cloneElement(element, subfunctionAttrs);
      return [
        {
          old: { element },
          new: { element: newElement },
        },
      ];
    }

    return [];
  };
}

export function editSubEquipmentWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const phase = element.getAttribute('phase');
  const virtual = element.getAttribute('virtual');

  const reservedNames: string[] = getChildElementsByTagName(
    element.parentElement!,
    'SubEquipment'
  )
    .filter(sibling => sibling !== element)
    .map(sibling => sibling.getAttribute('name')!);

  return [
    {
      title: get('wizard.title.edit', { tagName: 'SubEquipment' }),
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateSubEquipmentAction(element),
      },
      content: [
        ...contentFunctionWizard({
          name,
          desc,
          phase,
          virtual,
          reservedNames,
        }),
      ],
    },
  ];
}
