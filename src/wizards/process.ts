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

function createProcessAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]) => {
    const processAttrs: Record<string, string | null> = {};
    const processKeys = ['name', 'desc', 'type'];
    processKeys.forEach(key => {
      processAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const line = createElement(parent.ownerDocument, 'Process', processAttrs);

    return [{ new: { parent, element: line } }];
  };
}

function updateProcessAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): SimpleAction[] => {
    const tapProcessAttrs: Record<string, string | null> = {};
    const tapProcessKeys = ['name', 'desc', 'type'];
    tapProcessKeys.forEach(key => {
      tapProcessAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    if (
      tapProcessKeys.some(
        key => tapProcessAttrs[key] !== element.getAttribute(key)
      )
    ) {
      const newElement = cloneElement(element, tapProcessAttrs);
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
  reservedNames: string[];
}

export function contentProcessWizard(
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
      nullable
      helper="${translate('scl.type')}"
    ></wizard-textfield>`,
  ];
}

export function createProcessWizard(parent: Element): Wizard {
  const name = '';
  const desc = '';
  const type = '';
  const reservedNames: string[] = getChildElementsByTagName(
    parent.parentElement!,
    'Process'
  )
    .filter(sibling => sibling !== parent)
    .map(sibling => sibling.getAttribute('name')!);
  return [
    {
      title: get('wizard.title.add', { tagName: 'Process' }),
      primary: {
        icon: 'save',
        label: get('save'),
        action: createProcessAction(parent),
      },
      content: [
        ...contentProcessWizard({
          name,
          desc,
          type,
          reservedNames,
        }),
      ],
    },
  ];
}

export function editProcessWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const type = element.getAttribute('type');
  const reservedNames: string[] = getChildElementsByTagName(
    element.parentElement!,
    'Process'
  )
    .filter(sibling => sibling !== element)
    .map(sibling => sibling.getAttribute('name')!);
  return [
    {
      title: get('wizard.title.edit', { tagName: 'Process' }),
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateProcessAction(element),
      },
      content: [
        ...contentProcessWizard({
          name,
          desc,
          type,
          reservedNames,
        }),
      ],
    },
  ];
}
