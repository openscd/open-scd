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

function createTapChangerAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]) => {
    const tapChangerAttrs: Record<string, string | null> = {};
    const tapChangerKeys = ['name', 'desc', 'type', 'virtual'];
    tapChangerKeys.forEach(key => {
      tapChangerAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const tapChanger = createElement(
      parent.ownerDocument,
      'TapChanger',
      tapChangerAttrs
    );

    return [{ new: { parent, element: tapChanger } }];
  };
}

function updateTapChangerAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): SimpleAction[] => {
    const tapChangerAttrs: Record<string, string | null> = {};
    const tapChangerKeys = ['name', 'desc', 'type', 'virtual'];
    tapChangerKeys.forEach(key => {
      tapChangerAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    if (
      tapChangerKeys.some(
        key => tapChangerAttrs[key] !== element.getAttribute(key)
      )
    ) {
      const newElement = cloneElement(element, tapChangerAttrs);
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

export function contentTapChangerWizard(
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
      disabled
      helper="${translate('scl.type')}"
    ></wizard-textfield>`,
    html`<wizard-checkbox
      label="virtual"
      .maybeValue=${content.virtual}
      helper="${translate('scl.virtual')}"
      nullable
    ></wizard-checkbox>`,
  ];
}

export function createTapChangerWizard(parent: Element): Wizard {
  const name = '';
  const desc = null;
  const type = 'LTC';
  const virtual = null;
  const reservedNames = Array.from(parent.querySelectorAll('TapChanger')).map(
    TapChanger => TapChanger.getAttribute('name')!
  );

  return [
    {
      title: get('wizard.title.add', { tagName: 'TapChanger' }),
      primary: {
        icon: 'save',
        label: get('save'),
        action: createTapChangerAction(parent),
      },
      content: [
        ...contentTapChangerWizard({
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

export function editTapChangerWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const type = element.getAttribute('type');
  const virtual = element.getAttribute('virtual');
  const reservedNames: string[] = getChildElementsByTagName(
    element.parentElement!,
    'TapChanger'
  )
    .filter(sibling => sibling !== element)
    .map(sibling => sibling.getAttribute('name')!);
  return [
    {
      title: get('wizard.title.edit', { tagName: 'TapChanger' }),
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateTapChangerAction(element),
      },
      content: [
        ...contentTapChangerWizard({
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
