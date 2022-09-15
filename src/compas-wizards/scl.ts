import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import {
  cloneElement,
  ComplexAction,
  EditorAction,
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';

import '../compas/CompasLabelsField.js';

import {
  COMPAS_SCL_PRIVATE_TYPE,
  createCompasSclName,
  createPrivate,
  getCompasSclName,
  getPrivate,
} from '../compas/private.js';
import { CompasLabelsFieldElement } from '../compas/CompasLabelsField.js';

export function updateSCL(sclElement: Element): WizardActor {
  return (inputs: WizardInputElement[], wizard: Element): EditorAction[] => {
    const newValue = getValue(inputs.find(i => i.label === 'filename')!)!;
    const labelsField = <CompasLabelsFieldElement>(
      wizard.shadowRoot!.querySelector('compas-labels-field')
    );

    const privateElement = getPrivate(sclElement, COMPAS_SCL_PRIVATE_TYPE)!;
    const oldSclNameElement = getCompasSclName(privateElement);

    const complexAction: ComplexAction = {
      actions: [],
      title: get('compas.scl.updateAction'),
    };

    if (oldSclNameElement) {
      // Update the value in the existing SclName Element by cloning.
      const oldValue = oldSclNameElement.textContent;
      if (newValue !== oldValue) {
        const newSclNameElement = cloneElement(oldSclNameElement, {});
        newSclNameElement.textContent = newValue;
        complexAction.actions.push({
          old: { element: oldSclNameElement },
          new: { element: newSclNameElement },
        });
      }
    } else {
      // There is a Private Element, but no SclName Element, so only create a new SclName Element.
      const newSclNameElement = createCompasSclName(sclElement, newValue);
      complexAction.actions.push({
        new: { parent: privateElement, element: newSclNameElement },
      });
    }

    // We will replace the full Labels Element, so remove the original one and add the cloned/updated version.
    if (labelsField.originalLabelsElement) {
      complexAction.actions.push({
        old: {
          parent: privateElement,
          element: labelsField.originalLabelsElement,
        },
      });
    }
    complexAction.actions.push({
      new: { parent: privateElement, element: labelsField.newLabelsElement },
    });

    return [complexAction];
  };
}

export function renderCompasSCL(sclElement: Element): TemplateResult[] {
  let privateElement = getPrivate(sclElement, COMPAS_SCL_PRIVATE_TYPE);
  if (!privateElement) {
    privateElement = createPrivate(sclElement, COMPAS_SCL_PRIVATE_TYPE);
    sclElement.prepend(privateElement);
  }
  const privateFilenameElement = getCompasSclName(privateElement);
  const filename = privateFilenameElement?.textContent ?? '';

  return [
    html`<wizard-textfield
      label="filename"
      .maybeValue=${filename}
      helper="${translate('compas.scl.filenameHelper')}"
      required
      validationMessage="${translate('textfield.required')}"
      dialogInitialFocus
    >
    </wizard-textfield>`,
    html`<h3 style="color: var(--mdc-theme-on-surface);">
        ${translate('compas.scl.labelsTitle')}
      </h3>
      <compas-labels-field
        .privateElement="${privateElement}"
      ></compas-labels-field>`,
  ];
}

export function editCompasSCLWizard(sclElement: Element): Wizard {
  return [
    {
      title: get('compas.scl.wizardTitle'),
      element: sclElement,
      primary: {
        icon: 'edit',
        label: get('save'),
        action: updateSCL(sclElement),
      },
      content: renderCompasSCL(sclElement),
    },
  ];
}
