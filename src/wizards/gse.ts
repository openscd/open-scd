import { html } from 'lit-element';
import { get } from 'lit-translate';

import { Checkbox } from '@material/mwc-checkbox';

import '../wizard-textfield.js';
import {
  ComplexAction,
  createElement,
  EditorAction,
  getValue,
  identity,
  SimpleAction,
  Wizard,
  WizardActor,
  WizardInput,
} from '../foundation.js';
import { renderGseSmvAddress, updateAddress } from './address.js';

export function getMTimeAction(
  type: 'MinTime' | 'MaxTime',
  oldTime: Element | null,
  Time: string | null,
  gse: Element
): SimpleAction {
  if (oldTime === null) {
    const element = createElement(gse.ownerDocument, type, {
      unit: 's',
      multiplier: 'm',
    });
    element.textContent = Time;
    return {
      new: {
        parent: gse,
        element,
        reference: gse.firstElementChild,
      },
    };
  }

  if (Time === null)
    return {
      old: {
        parent: gse,
        element: oldTime,
        reference: oldTime.nextSibling,
      },
    };

  const newTime = <Element>oldTime.cloneNode(false);
  newTime.textContent = Time;
  return {
    old: { element: oldTime },
    new: { element: newTime },
  };
}

export function updateGSEAction(element: Element): WizardActor {
  return (inputs: WizardInput[], wizard: Element): EditorAction[] => {
    const complexAction: ComplexAction = {
      actions: [],
      title: get('gse.action.addaddress', {
        identity: identity(element),
      }),
    };

    const instType: boolean =
      (<Checkbox>wizard.shadowRoot?.querySelector('#instType'))?.checked ??
      false;
    const addressActions = updateAddress(element, inputs, instType);

    addressActions.forEach(action => {
      complexAction.actions.push(action);
    });

    const MinTime = getValue(inputs.find(i => i.label === 'MinTime')!);
    const MaxTime = getValue(inputs.find(i => i.label === 'MaxTime')!);
    if (
      MinTime !==
      (element.querySelector('MinTime')?.textContent?.trim() ?? null)
    ) {
      complexAction.actions.push(
        getMTimeAction(
          'MinTime',
          element.querySelector('MinTime'),
          MinTime,
          element
        )
      );
    }
    if (
      MaxTime !==
      (element.querySelector('MaxTime')?.textContent?.trim() ?? null)
    ) {
      complexAction.actions.push(
        getMTimeAction(
          'MaxTime',
          element.querySelector('MaxTime'),
          MaxTime,
          element
        )
      );
    }

    return [complexAction];
  };
}

export function editGseWizard(element: Element): Wizard {
  const minTime = element.querySelector('MinTime')?.innerHTML.trim() ?? null;
  const maxTime = element.querySelector('MaxTime')?.innerHTML.trim() ?? null;

  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      element,
      primary: {
        label: get('save'),
        icon: 'save',
        action: updateGSEAction(element),
      },
      content: [
        ...renderGseSmvAddress(element),
        html`<wizard-textfield
          label="MinTime"
          .maybeValue=${minTime}
          nullable
          suffix="ms"
          type="number"
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="MaxTime"
          .maybeValue=${maxTime}
          nullable
          suffix="ms"
          type="number"
        ></wizard-textfield>`,
      ],
    },
  ];
}
