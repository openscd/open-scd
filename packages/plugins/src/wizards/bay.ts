import { html, TemplateResult } from 'lit-html';
import { get } from 'lit-translate';

import '@openscd/open-scd/src/wizard-textfield.js';
import {
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '@openscd/open-scd/src/foundation.js';

import {
  createElement,
} from '@openscd/xml';

import { EditorAction } from '@openscd/core/foundation/deprecated/editor.js';
import { replaceNamingAttributeWithReferencesAction } from './foundation/actions.js';

export function renderBayWizard(
  name: string | null,
  desc: string | null
): TemplateResult[] {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${get('bay.wizard.nameHelper')}"
      required
      validationMessage="${get('textfield.required')}"
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${get('bay.wizard.descHelper')}"
    ></wizard-textfield>`,
  ];
}

export function createAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
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
      content: renderBayWizard('', ''),
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
        action: replaceNamingAttributeWithReferencesAction(
          element,
          'bay.action.updateBay'
        ),
      },
      content: renderBayWizard(
        element.getAttribute('name'),
        element.getAttribute('desc')
      ),
    },
  ];
}
