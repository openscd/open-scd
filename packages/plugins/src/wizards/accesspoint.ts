import { html, TemplateResult } from 'lit-element';
import { get } from 'lit-translate';

import '@openscd/open-scd/src/wizard-textfield.js';
import {
  newWizardEvent,
  Wizard,
  WizardInputElement,
  WizardActor,
  isPublic,
  identity,
} from '@openscd/open-scd/src/foundation.js';
import {
  Delete,
  ComplexAction,
  EditorAction,
} from '@openscd/core/foundation/deprecated/editor.js';
import { updateNamingAttributeWithReferencesAction } from './foundation/actions.js';
import { deleteReferences } from './foundation/references.js';
import { patterns } from './foundation/limits.js';

export function renderAccessPointWizard(
  name: string | null,
  desc: string | null,
  reservedNames: string[]
): TemplateResult[] {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${get('accesspoint.wizard.nameHelper')}"
      required
      validationMessage="${get('textfield.required')}"
      dialogInitialFocus
      .reservedValues=${reservedNames}
    >
    </wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${get('accesspoint.wizard.descHelper')}"
      pattern="${patterns.normalizedString}"
    >
    </wizard-textfield>`,
  ];
}
export function removeAccessPointWizard(element: Element): Wizard | null {
  const references = deleteReferences(element);
  if (references.length > 0) {
    return [
      {
        title: get('accesspoint.wizard.title.delete'),
        content: renderAccessPointReferencesWizard(references),
        primary: {
          icon: 'delete',
          label: get('remove'),
          action: removeAccessPointAndReferences(element),
        },
      },
    ];
  }
  return null;
}

export function editAccessPointWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  return [
    {
      title: get('accesspoint.wizard.title.edit'),
      element,
      primary: {
        icon: 'edit',
        label: get('save'),
        action: updateNamingAttributeWithReferencesAction(
          element,
          'accesspoint.action.updateAccessPoint'
        ),
      },
      content: renderAccessPointWizard(
        name,
        desc,
        reservedNamesAccessPoint(element)
      ),
    },
  ];
}

function renderAccessPointReferencesWizard(
  references: Delete[]
): TemplateResult[] {
  return [
    html` <section>
      <h3 style="margin: 0;">${get('accesspoint.wizard.title.references')}</h3>
      <mwc-list>
        ${references.map(reference => {
          const oldElement = <Element>reference.old.element;
          return html` <mwc-list-item noninteractive twoline>
            <span>${oldElement.tagName}</span>
            <span slot="secondary"
              >${identity(<Element>reference.old.element)}</span
            >
          </mwc-list-item>`;
        })}
      </mwc-list>
    </section>`,
  ];
}

function reservedNamesAccessPoint(currentElement: Element): string[] {
  const ied = currentElement.closest('IED');
  if (!ied) return [];

  return Array.from(ied.querySelectorAll(':scope > AccessPoint'))
    .filter(isPublic)
    .map(ap => ap.getAttribute('name') ?? '')
    .filter(name => name !== currentElement.getAttribute('name'));
}

export function removeAccessPointAndReferences(element: Element): WizardActor {
  return (inputs: WizardInputElement[], wizard: Element): EditorAction[] => {
    wizard.dispatchEvent(newWizardEvent());
    const referencesDeleteActions = deleteReferences(element);
    const name = element.getAttribute('name') ?? 'Unknown';
    const complexAction: ComplexAction = {
      actions: [],
      title: get('ied.action.deleteAccessPoint', { name }),
    };
    complexAction.actions.push({
      old: { parent: element.parentElement!, element },
    });
    complexAction.actions.push(...referencesDeleteActions);
    return [complexAction];
  };
}
