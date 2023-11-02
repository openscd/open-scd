import { get } from 'lit-translate';

import '@material/mwc-button';

import {
  cloneElement,
  createElement,
  EditorAction,
  getValue,
  isPublic,
  newActionEvent,
  newWizardEvent,
  Wizard,
  WizardActor,
  WizardInputElement,
  WizardMenuActor,
} from '../foundation.js';
import { getValAction, wizardContent } from './abstractda.js';

function remove(element: Element): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(
      newActionEvent({ old: { parent: element.parentElement!, element } })
    );
    wizard.dispatchEvent(newWizardEvent());
  };
}

export function updateBDaAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const bType = getValue(inputs.find(i => i.label === 'bType')!)!;
    const type =
      bType === 'Enum' || bType === 'Struct'
        ? getValue(inputs.find(i => i.label === 'type')!)
        : null;
    const sAddr = getValue(inputs.find(i => i.label === 'sAddr')!);
    const valKind = getValue(inputs.find(i => i.label === 'valKind')!);
    const valImport = getValue(inputs.find(i => i.label === 'valImport')!);
    const valField = inputs.find(
      i => i.label === 'Val' && i.style.display !== 'none'
    );
    const Val = valField ? getValue(valField) : null;

    let bdaAction: EditorAction | null;
    let valAction: EditorAction | null;

    if (
      name === element.getAttribute('name') &&
      desc === element.getAttribute('desc') &&
      bType === element.getAttribute('bType') &&
      type === element.getAttribute('type') &&
      sAddr === element.getAttribute('sAddr') &&
      valKind === element.getAttribute('valKind') &&
      valImport === element.getAttribute('valImprot')
    ) {
      bdaAction = null;
    } else {
      const newElement = cloneElement(element, {
        name,
        desc,
        bType,
        type,
        sAddr,
        valKind,
        valImport,
      });
      bdaAction = { old: { element }, new: { element: newElement } };
    }

    if (Val === (element.querySelector('Val')?.textContent?.trim() ?? null)) {
      valAction = null;
    } else {
      valAction = getValAction(
        element.querySelector('Val'),
        Val,
        bdaAction?.new.element ?? element
      );
    }

    const actions: EditorAction[] = [];
    if (bdaAction) actions.push(bdaAction);
    if (valAction) actions.push(valAction);
    return actions;
  };
}

export function editBDAWizard(element: Element): Wizard {
  const doc = element.ownerDocument;
  const type = element.getAttribute('type');
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const bType = element.getAttribute('bType') ?? '';
  const sAddr = element.getAttribute('sAddr');
  const Val = element.querySelector('Val')?.innerHTML.trim() ?? null;
  const valKind = element.getAttribute('valKind');
  const valImport = element.getAttribute('valImport');

  const types = Array.from(doc.querySelectorAll('DAType, EnumType'))
    .filter(isPublic)
    .filter(type => type.getAttribute('id'));

  const data = element.closest('DataTypeTemplates')!;

  return [
    {
      title: get('bda.wizard.title.edit'),
      element: element,
      primary: {
        icon: '',
        label: get('save'),
        action: updateBDaAction(element),
      },
      menuActions: [
        {
          icon: 'delete',
          label: get('remove'),
          action: remove(element),
        },
      ],
      content: [
        ...wizardContent(
          name,
          desc,
          bType,
          types,
          type,
          sAddr,
          valKind,
          valImport,
          Val,
          data
        ),
      ],
    },
  ];
}

export function createBDaAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const bType = getValue(inputs.find(i => i.label === 'bType')!)!;
    const type =
      bType === 'Enum' || bType === 'Struct'
        ? getValue(inputs.find(i => i.label === 'type')!)
        : null;
    const sAddr = getValue(inputs.find(i => i.label === 'sAddr')!);
    const valKind =
      getValue(inputs.find(i => i.label === 'valKind')!) !== ''
        ? getValue(inputs.find(i => i.label === 'valKind')!)
        : null;
    const valImport =
      getValue(inputs.find(i => i.label === 'valImport')!) !== ''
        ? getValue(inputs.find(i => i.label === 'valImport')!)
        : null;

    const valField = inputs.find(
      i => i.label === 'Val' && i.style.display !== 'none'
    );
    const Val = valField ? getValue(valField) : null;

    const element = createElement(parent.ownerDocument, 'BDA', {
      name,
      desc,
      bType,
      type,
      sAddr,
      valKind,
      valImport,
    });

    if (Val !== null) {
      const valElement = createElement(parent.ownerDocument, 'Val', {});
      valElement.textContent = Val;
      element.appendChild(valElement);
    }

    return [
      {
        new: {
          parent,
          element,
        },
      },
    ];
  };
}

export function createBDAWizard(element: Element): Wizard {
  const doc = element.ownerDocument;

  const name = '';
  const desc = null;
  const bType = '';
  const type = null;
  const sAddr = null;
  const Val = null;
  const valKind = null;
  const valImport = null;

  const types = Array.from(doc.querySelectorAll('DAType, EnumType'))
    .filter(isPublic)
    .filter(type => type.getAttribute('id'));

  const data = element.closest('DataTypeTemplates')!;

  return [
    {
      title: get('bda.wizard.title.edit'),
      primary: {
        icon: '',
        label: get('save'),
        action: createBDaAction(element),
      },
      content: [
        ...wizardContent(
          name,
          desc,
          bType,
          types,
          type,
          sAddr,
          valKind,
          valImport,
          Val,
          data
        ),
      ],
    },
  ];
}
