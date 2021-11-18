import { html, TemplateResult } from 'lit-html';
import { get, translate } from 'lit-translate';

import {
  createElement,
  EditorAction,
  getValue,
  Wizard,
  WizardActor,
  WizardInput,
} from '../foundation.js';
import { updateNamingAction } from './foundation/actions.js';

function render(name: string | null, desc: string | null): TemplateResult[] {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${translate('bay.wizard.nameHelper')}"
      required
      validationMessage="${translate('textfield.required')}"
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${translate('bay.wizard.descHelper')}"
    ></wizard-textfield>`,
  ];
}

export function createAction(parent: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!);
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const element = createElement(parent.ownerDocument, 'Bay', {
      name,
      desc,
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

export function createBayWizard(parent: Element): Wizard {
  return [
    {
      title: get('bay.wizard.title.add'),
      element: undefined,
      primary: {
        icon: '',
        label: get('add'),
        action: createAction(parent),
      },
      content: render('', ''),
    },
  ];
}

export function editBayWizard(element: Element): Wizard {
  return [
    {
      title: get('bay.wizard.title.edit'),
      element,
      primary: {
        icon: 'edit',
        label: get('save'),
        action: updateNamingAction(element),
      },
      content: render(
        element.getAttribute('name'),
        element.getAttribute('desc')
      ),
    },
  ];
}
