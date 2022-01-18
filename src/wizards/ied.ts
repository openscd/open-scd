import {html, TemplateResult} from 'lit-element';
import {get, translate} from 'lit-translate';

import {cloneElement, EditorAction, getValue, isPublic, Wizard, WizardActor, WizardInput,} from '../foundation.js';
import {updateReferences} from "./foundation/references.js";

export function updateIED(element: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!)!;
    const oldName = element.getAttribute('name');
    const desc = getValue(inputs.find(i => i.label === 'desc')!);

    if ( name === oldName &&
         desc === element.getAttribute('desc')) {
      return [];
    }

    const newElement = cloneElement(element, { name, desc });
    const actions: EditorAction[] = [];
    actions.push({ old: { element }, new: { element: newElement } });
    actions.push(...updateReferences(element, oldName, name));
    return actions;
  };
}

export function renderIEDWizard(
  name: string | null,
  desc: string | null,
  reservedNames: string[]
): TemplateResult[] {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${translate('ied.wizard.nameHelper')}"
      required
      validationMessage="${translate('textfield.required')}"
      dialogInitialFocus
      .reservedValues=${reservedNames}
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${translate('ied.wizard.descHelper')}"
    ></wizard-textfield>`,
  ];
}

export function reservedNamesIED(currentElement: Element): string[] {
  return Array.from(
    currentElement.parentNode!.querySelectorAll('IED')
  )
    .filter(isPublic)
    .map(cNode => cNode.getAttribute('name') ?? '')
    .filter(name => name !== currentElement.getAttribute('name'));
}

export function editIEDWizard(element: Element): Wizard {
  return [
    {
      title: get('ied.wizard.title.edit'),
      element,
      primary: {
        icon: 'edit',
        label: get('save'),
        action: updateIED(element),
      },
      content: renderIEDWizard(
        element.getAttribute('name'),
        element.getAttribute('desc'),
        reservedNamesIED(element)
      ),
    },
  ];
}
