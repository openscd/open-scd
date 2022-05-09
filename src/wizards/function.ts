import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import {
  createElement,
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';

interface ContentOptions {
  name: string | null;
  desc: string | null;
  type: string | null;
  reservedNames: string[];
}

function contentFunctionWizard(content: ContentOptions): TemplateResult[] {
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
      nullable
    ></wizard-textfield>`,
  ];
}

function createFunctionAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]) => {
    const functionAttrs: Record<string, string | null> = {};
    const functionKeys = ['name', 'desc', 'type'];
    functionKeys.forEach(key => {
      functionAttrs[key] = getValue(inputs.find(i => i.label === key)!);
    });

    const fUnction = createElement(
      parent.ownerDocument,
      'Function',
      functionAttrs
    );

    return [{ new: { parent, element: fUnction } }];
  };
}

export function createFunctionWizard(parent: Element): Wizard {
  const name = '';
  const desc = null;
  const type = null;
  const reservedNames = Array.from(parent.querySelectorAll('Function')).map(
    fUnction => fUnction.getAttribute('name')!
  );

  return [
    {
      title: get('wizard.title.add', { tagName: 'Function' }),
      primary: {
        icon: 'save',
        label: get('save'),
        action: createFunctionAction(parent),
      },
      content: [
        ...contentFunctionWizard({
          name,
          desc,
          type,
          reservedNames,
        }),
      ],
    },
  ];
}
