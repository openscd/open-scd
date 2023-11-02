import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';
import {
  cloneElement,
  createElement,
  getChildElementsByTagName,
  getValue,
  SimpleAction,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';

export function editGeneralEquipmentWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const type = element.getAttribute('type');
  const virtual = element.getAttribute('virtual');
  const reservedNames: string[] = getChildElementsByTagName(
    element.parentElement!,
    'GeneralEquipment'
  )
    .filter(sibling => sibling !== element)
    .map(sibling => sibling.getAttribute('name')!);

  return [
    {
      title: get('wizard.title.edit', { tagName: 'GeneralEquipment' }),
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateGeneralEquipmentAction(element),
      },
      content: [
        ...contentGeneralEquipmentWizard({
          name,
          desc,
          type,
          virtual,
          reservedNames,
        }),
      ],
    },
  ];
}

function updateGeneralEquipmentAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): SimpleAction[] => {
    const generalEquipmentAttrs: Record<string, string | null> = {};
    const generalEquipmentKeys = ['name', 'desc', 'type', 'virtual'];
    generalEquipmentKeys.forEach(key => {
      generalEquipmentAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    if (
      generalEquipmentKeys.some(
        key => generalEquipmentAttrs[key] !== element.getAttribute(key)
      )
    ) {
      const newElement = cloneElement(element, generalEquipmentAttrs);
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

interface ContentOptions {
  name: string | null;
  desc: string | null;
  type: string | null;
  virtual: string | null;
  reservedNames: string[];
}

export function contentGeneralEquipmentWizard(
  content: ContentOptions
): TemplateResult[] {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${content.name}
      helper="${translate('scl.name')}"
      required
      validationMessage="${translate('textfield.required')}"
      .reservedValues=${content.reservedNames}
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${content.desc}
      nullable
      helper="${translate('scl.desc')}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="type"
      .maybeValue=${content.type}
      helper="${translate('scl.type')}"
      minLength="${3}"
      pattern="AXN|BAT|MOT|FAN|FIL|PMP|TNK|VLV|E[A-Z]*"
      required
    ></wizard-textfield>`,
    html`<wizard-checkbox
      label="virtual"
      .maybeValue=${content.virtual}
      helper="${translate('scl.virtual')}"
      nullable
    ></wizard-checkbox>`,
  ];
}

export function createGeneralEquipmentWizard(parent: Element): Wizard {
  const name = '';
  const desc = null;
  const type = null;
  const virtual = null;
  const reservedNames = Array.from(
    parent.querySelectorAll('GeneralEquipment')
  ).map(generalEquipment => generalEquipment.getAttribute('name')!);

  return [
    {
      title: get('wizard.title.add', { tagName: 'GeneralEquipment' }),
      primary: {
        icon: 'save',
        label: get('save'),
        action: createGeneralEquipmentAction(parent),
      },
      content: [
        ...contentGeneralEquipmentWizard({
          name,
          desc,
          type,
          virtual,
          reservedNames,
        }),
      ],
    },
  ];
}

function createGeneralEquipmentAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]) => {
    const generalEquipmentAttrs: Record<string, string | null> = {};
    const generalEquipmentKeys = ['name', 'desc', 'type', 'virtual'];
    generalEquipmentKeys.forEach(key => {
      generalEquipmentAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const generalEquipment = createElement(
      parent.ownerDocument,
      'GeneralEquipment',
      generalEquipmentAttrs
    );

    return [{ new: { parent, element: generalEquipment } }];
  };
}
