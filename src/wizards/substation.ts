import { TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import {
  Checkbox,
  createElement,
  EditorAction,
  getReference,
  getValue,
  html,
  newWizardEvent,
  Wizard,
  WizardActor,
  WizardInput,
} from '../foundation.js';
import { updateNamingAction } from './foundation/actions.js';

import { guessVoltageLevel } from '../editors/substation/guess-wizard.js';
import { WizardTextField } from '../wizard-textfield.js';

function render(
  name: string,
  desc: string | null,
  guessable: boolean
): TemplateResult[] {
  return [
    html`<${WizardTextField}
      label="name"
      .maybeValue=${name}
      helper="${translate('substation.wizard.nameHelper')}"
      required
      validationMessage="${translate('textfield.required')}"
      dialogInitialFocus
    ></${WizardTextField}>`,
    html`<${WizardTextField}
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${translate('substation.wizard.descHelper')}"
    ></${WizardTextField}>`,
    guessable
      ? html`<mwc-formfield label="${translate('guess.wizard.primary')}">
          <${Checkbox}></${Checkbox}>
        </mwc-formfield>`
      : html``,
  ];
}

export function createAction(parent: Element): WizardActor {
  return (inputs: WizardInput[], wizard: Element): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!);
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const guess = wizard.shadowRoot?.querySelector('mwc-checkbox')?.checked;
    parent.ownerDocument.createElement('Substation');
    const element = createElement(parent.ownerDocument, 'Substation', {
      name,
      desc,
    });

    const action = {
      new: {
        parent,
        element,
        reference: getReference(parent, 'Substation'),
      },
    };

    if (guess)
      wizard.dispatchEvent(
        newWizardEvent(guessVoltageLevel(parent.ownerDocument))
      );

    return [action];
  };
}

export function createSubstationWizard(parent: Element): Wizard {
  const guessable = parent.querySelector('Substation') === null;

  return [
    {
      title: get('substation.wizard.title.add'),
      element: undefined,
      primary: {
        icon: 'add',
        label: get('add'),
        action: createAction(parent),
      },
      content: render('', '', guessable),
    },
  ];
}

export function substationEditWizard(element: Element): Wizard {
  return [
    {
      title: get('substation.wizard.title.edit'),
      element,
      primary: {
        icon: 'edit',
        label: get('save'),
        action: updateNamingAction(element),
      },
      content: render(
        element.getAttribute('name') ?? '',
        element.getAttribute('desc'),
        false
      ),
    },
  ];
}
