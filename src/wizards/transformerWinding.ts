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
      minLength="${1}"
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
