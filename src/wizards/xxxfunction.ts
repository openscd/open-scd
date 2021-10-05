import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';

import {
  cloneElement,
  createElement,
  EditorAction,
  getReference,
  getValue,
  Wizard,
  WizardActor,
  WizardInput,
} from '../foundation.js';

export function render(
  name: string | null,
  desc: string | null,
  type: string | null
): TemplateResult[] {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${translate('scl.name')}"
      required
      validationMessage="${translate('textfield.required')}"
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${desc}
      nullable
      helper="${translate('scl.desc')}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="type"
      .maybeValue=${type}
      nullable
      helper="${translate('scl.type')}"
    ></wizard-textfield>`,
  ];
}

export function updateXxxFunctionAction(element: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!);
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const type = getValue(inputs.find(i => i.label === 'type')!);

    if (
      name === element.getAttribute('name') &&
      desc === element.getAttribute('desc') &&
      type === element.getAttribute('type')
    )
      return [];

    const newElement = cloneElement(element, { name, desc, type });

    return [{ old: { element }, new: { element: newElement } }];
  };
}

export function editXxxFunctionWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const type = element.getAttribute('type');

  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      element: element,
      primary: {
        label: get('save'),
        icon: 'save',
        action: updateXxxFunctionAction(element),
      },
      content: [...render(name, desc, type)],
    },
  ];
}

export function createEqSubFunctionAction(parent: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!);
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const type = getValue(inputs.find(i => i.label === 'type')!);

    const element = createElement(parent.ownerDocument, 'EqSubFunction', {
      name,
      desc,
      type,
    });

    const action = {
      new: {
        parent,
        element,
        reference: getReference(parent, 'EqSubFunction'),
      },
    };

    return [action];
  };
}

export function createEqSubFunctionWizard(parent: Element): Wizard {
  return [
    {
      title: get('wizard.title.add', { tagName: 'EqSubFunction' }),
      primary: {
        label: get('save'),
        icon: 'save',
        action: createEqSubFunctionAction(parent),
      },
      content: [...render('', null, null)],
    },
  ];
}

export function createEqFunctionAction(parent: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!);
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const type = getValue(inputs.find(i => i.label === 'type')!);

    const element = createElement(parent.ownerDocument, 'EqFunction', {
      name,
      desc,
      type,
    });

    const action = {
      new: {
        parent,
        element,
        reference: getReference(parent, 'EqFunction'),
      },
    };

    return [action];
  };
}

export function createEqFunctionWizard(parent: Element): Wizard {
  return [
    {
      title: get('wizard.title.add', { tagName: 'EqFunction' }),
      primary: {
        label: get('save'),
        icon: 'save',
        action: createEqFunctionAction(parent),
      },
      content: [...render('', null, null)],
    },
  ];
}

export function createFunctionAction(parent: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!);
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const type = getValue(inputs.find(i => i.label === 'type')!);

    const element = createElement(parent.ownerDocument, 'Function', {
      name,
      desc,
      type,
    });

    const action = {
      new: {
        parent,
        element,
        reference: getReference(parent, 'Function'),
      },
    };

    return [action];
  };
}

export function createFunctionWizard(parent: Element): Wizard {
  return [
    {
      title: get('wizard.title.add', { tagName: 'Function' }),
      primary: {
        label: get('save'),
        icon: 'save',
        action: createFunctionAction(parent),
      },
      content: [...render('', null, null)],
    },
  ];
}

export function createSubFunctionAction(parent: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!);
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const type = getValue(inputs.find(i => i.label === 'type')!);

    const element = createElement(parent.ownerDocument, 'SubFunction', {
      name,
      desc,
      type,
    });

    const action = {
      new: {
        parent,
        element,
        reference: getReference(parent, 'SubFunction'),
      },
    };

    return [action];
  };
}

export function createSubFunctionWizard(parent: Element): Wizard {
  return [
    {
      title: get('wizard.title.add', { tagName: 'SubFunction' }),
      primary: {
        label: get('save'),
        icon: 'save',
        action: createSubFunctionAction(parent),
      },
      content: [...render('', null, null)],
    },
  ];
}
