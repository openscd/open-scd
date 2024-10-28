import { html } from 'lit-element';
import { get } from 'lit-translate';

import { Checkbox } from '@material/mwc-checkbox';

import '@openscd/open-scd/src/wizard-textfield.js';
import {
  getValue,
  identity,
  Wizard,
  WizardActor,
  WizardInputElement,
} from '@openscd/open-scd/src/foundation.js';

import { createElement } from '@openscd/xml';

import { contentGseOrSmvWizard, updateAddress } from './address.js';
import {
  ComplexAction,
  SimpleAction,
  EditorAction,
} from '@openscd/core/foundation/deprecated/editor.js';

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
  return (inputs: WizardInputElement[], wizard: Element): EditorAction[] => {
    const complexAction: ComplexAction = {
      actions: [],
      title: get('gse.action.addaddress', {
        identity: identity(element),
      }),
    };

    const instType: boolean =
      (<Checkbox>wizard.shadowRoot?.querySelector('#instType'))?.checked ??
      false;

    const addressContent: Record<string, string | null> = {};
    addressContent['MAC-Address'] = getValue(
      inputs.find(i => i.label === 'MAC-Address')!
    );
    addressContent['APPID'] = getValue(inputs.find(i => i.label === 'APPID')!);
    addressContent['VLAN-ID'] = getValue(
      inputs.find(i => i.label === 'VLAN-ID')!
    );
    addressContent['VLAN-PRIORITY'] = getValue(
      inputs.find(i => i.label === 'VLAN-PRIORITY')!
    );

    const addressActions = updateAddress(element, addressContent, instType);

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

  const hasInstType = Array.from(element.querySelectorAll('Address > P')).some(
    pType => pType.getAttribute('xsi:type')
  );

  const attributes: Record<string, string | null> = {};

  ['MAC-Address', 'APPID', 'VLAN-ID', 'VLAN-PRIORITY'].forEach(key => {
    if (!attributes[key])
      attributes[key] =
        element.querySelector(`Address > P[type="${key}"]`)?.innerHTML.trim() ??
        null;
  });

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
        ...contentGseOrSmvWizard({ hasInstType, attributes }),
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
