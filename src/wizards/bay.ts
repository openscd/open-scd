import { TemplateResult } from 'lit-html';
import { get, translate } from 'lit-translate';

import {
  createElement,
  EditorAction,
  getReference,
  getValue,
  html,
  Wizard,
  WizardActor,
  WizardInput,
} from '../foundation.js';
import { WizardTextField } from '../wizard-textfield.js';
import { updateNamingAction } from './foundation/actions.js';

function render(name: string | null, desc: string | null): TemplateResult[] {
  return [
    html`<${WizardTextField}
      label="name"
      .maybeValue=${name}
      helper="${translate('bay.wizard.nameHelper')}"
      required
      validationMessage="${translate('textfield.required')}"
      dialogInitialFocus
    ></${WizardTextField}>`,
    html`<${WizardTextField}
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${translate('bay.wizard.descHelper')}"
    ></${WizardTextField}>`,
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
        reference: getReference(parent, 'Bay'),
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
