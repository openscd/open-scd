import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import '@material/mwc-checkbox';
import '@material/mwc-formfield';

import '../wizard-textfield.js';
import {
  createElement,
  EditorAction,
  getValue,
  newWizardEvent,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';
import { guessVoltageLevel } from '../editors/substation/guess-wizard.js';
import { updateNamingAttributeWithReferencesAction } from "./foundation/actions.js";

function render(
  name: string,
  desc: string | null,
  guessable: boolean
): TemplateResult[] {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${translate('substation.wizard.nameHelper')}"
      required
      validationMessage="${translate('textfield.required')}"
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${translate('substation.wizard.descHelper')}"
    ></wizard-textfield>`,
    guessable
      ? html`<mwc-formfield label="${translate('guess.wizard.primary')}">
          <mwc-checkbox></mwc-checkbox>
        </mwc-formfield>`
      : html``,
  ];
}

export function createAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[], wizard: Element): EditorAction[] => {
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
        action: updateNamingAttributeWithReferencesAction(element, 'substation.action.updatesubstation'),
      },
      content: render(
        element.getAttribute('name') ?? '',
        element.getAttribute('desc'),
        false
      ),
    },
  ];
}
