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

function createTransformerWindingAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]) => {
    const transformerWindingAttrs: Record<string, string | null> = {};
    const transformerWindingKeys = ['name', 'desc', 'type', 'virtual'];
    transformerWindingKeys.forEach(key => {
      transformerWindingAttrs[key] = getValue(
        inputs.find(i => i.label === key)!
      );
    });

    const transformerWinding = createElement(
      parent.ownerDocument,
      'TransformerWinding',
      transformerWindingAttrs
    );

    return [{ new: { parent, element: transformerWinding } }];
  };
}

export function createTransformerWindingWizard(parent: Element): Wizard {
  const name = '';
  const desc = null;
  const type = null;
  const virtual = null;
  const reservedNames = Array.from(
    parent.querySelectorAll('TransformerWinding')
  ).map(TransformerWinding => TransformerWinding.getAttribute('name')!);

  return [
    {
      title: get('wizard.title.add', { tagName: 'TransformerWinding' }),
      primary: {
        icon: 'save',
        label: get('save'),
        action: createTransformerWindingAction(parent),
      },
      content: [
        ...contentTransformerWindingWizard({
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

function updateTransformerWindingAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): SimpleAction[] => {
    const transformerWindingAttrs: Record<string, string | null> = {};
    const transformerWindingKeys = ['name', 'desc', 'type', 'virtual'];
    transformerWindingKeys.forEach(key => {
      transformerWindingAttrs[key] = getValue(
        inputs.find(i => i.label === key)!
      );
    });

    if (
      transformerWindingKeys.some(
        key => transformerWindingAttrs[key] !== element.getAttribute(key)
      )
    ) {
      const newElement = cloneElement(element, transformerWindingAttrs);
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

export function contentTransformerWindingWizard(
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

export function editTransformerWindingWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const type = element.getAttribute('type');
  const virtual = element.getAttribute('virtual');
  const reservedNames: string[] = getChildElementsByTagName(
    element.parentElement!,
    'TransformerWinding'
  )
    .filter(sibling => sibling !== element)
    .map(sibling => sibling.getAttribute('name')!);

  return [
    {
      title: get('wizard.title.edit', { tagName: 'TransformerWinding' }),
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateTransformerWindingAction(element),
      },
      content: [
        ...contentTransformerWindingWizard({
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
