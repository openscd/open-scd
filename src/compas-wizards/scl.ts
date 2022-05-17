import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import {
  cloneElement,
  EditorAction,
  getValue,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '../foundation.js';
import { COMPAS_SCL_PRIVATE_TYPE } from "../compas/private.js";
import {
  createCompasSclName,
  createPrivate,
  getCompasSclName,
  getPrivate
} from "../compas/private.js";

export function updateSCL(sclElement: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const newValue = getValue(inputs.find(i => i.label === 'filename')!)!;
    const oldSclNameElement = getCompasSclName(sclElement);

    if (oldSclNameElement) {
      // Update the value in the existing SclName Element by cloning.
      const oldValue = oldSclNameElement.textContent;
      if (newValue === oldValue) {
        return [];
      }

      const newSclNameElement = cloneElement(oldSclNameElement, {});
      newSclNameElement.textContent = newValue;
      return [{ old: { element: oldSclNameElement }, new: { element: newSclNameElement } }];
    } else {
      let privateElement = getPrivate(sclElement, COMPAS_SCL_PRIVATE_TYPE);
      if (!privateElement) {
        // No Private Element under SCL, so create both Private and SclName Element to be added to the SCL Element.
        const newSclNameElement = createCompasSclName(sclElement, newValue);
        privateElement = createPrivate(sclElement, COMPAS_SCL_PRIVATE_TYPE);
        privateElement.prepend(newSclNameElement);
        return [{ new: { parent: sclElement, element: privateElement } }];
      }

      // There is a Private Element, but no SclName Element, so only create a new SclName Element.
      const newSclNameElement = createCompasSclName(sclElement, newValue);
      return [{ new: { parent: privateElement, element: newSclNameElement } }];
    }
  };
}

export function renderCompasSCL(
  sclElement: Element
): TemplateResult[] {
  const privateFilenameElement = getCompasSclName(sclElement);
  const filename = privateFilenameElement ? privateFilenameElement.textContent : '';

  return [
    html`<wizard-textfield
      label="filename"
      .maybeValue=${filename}
      helper="${translate('compas.scl.filenameHelper')}"
      required
      validationMessage="${translate('textfield.required')}"
      dialogInitialFocus>
    </wizard-textfield>`,
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
