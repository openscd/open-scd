import { html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { get, translate } from 'lit-translate';
import {
  pTypesGSESMV,
  typeMaxLength,
  typeNullable,
  typePattern,
} from '../editors/communication/p-types.js';

import {
  ComplexAction,
  createElement,
  EditorAction,
  getReference,
  getValue,
  SimpleAction,
  Wizard,
  WizardActor,
  WizardInput,
} from '../foundation.js';

import { Checkbox } from '@material/mwc-checkbox';

function getMTimeAction(
  type: 'MinTime' | 'MaxTime',
  oldTime: Element | null,
  Time: string | null,
  gSE: Element
): SimpleAction {
  if (oldTime === null) {
    const element = createElement(gSE.ownerDocument, type, {
      unit: 's',
      multiplier: 'm',
    });
    element.textContent = Time;
    return {
      new: {
        parent: gSE,
        element,
        reference: gSE.firstElementChild,
      },
    };
  }

  if (Time === null)
    return {
      old: {
        parent: gSE,
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

function isEqualAddress(oldAddr: Element, newAdddr: Element): boolean {
  return (
    Array.from(oldAddr.querySelectorAll('P')).filter(
      pType =>
        !newAdddr
          .querySelector(`Address > P[type="${pType.getAttribute('type')}"]`)
          ?.isEqualNode(pType)
    ).length === 0
  );
}

function createAddressElement(
  inputs: WizardInput[],
  parent: Element,
  instType: boolean
): Element {
  const element = createElement(parent.ownerDocument, 'Address', {});

  inputs
    .filter(input => getValue(input) !== null)
    .forEach(validInput => {
      const type = validInput.label;
      const child = createElement(parent.ownerDocument, 'P', { type });
      if (instType)
        child.setAttributeNS(
          'http://www.w3.org/2001/XMLSchema-instance',
          'xsi:type',
          'tP_' + type
        );
      child.textContent = getValue(validInput);
      element.appendChild(child);
    });

  return element;
}

function editGSEAction(element: Element): WizardActor {
  return (inputs: WizardInput[], wizard: Element): EditorAction[] => {
    const instType: boolean =
      (<Checkbox>wizard.shadowRoot?.querySelector('#instType'))?.checked ??
      false;

    const newAddress = createAddressElement(inputs, element, instType);

    const complexAction: ComplexAction = {
      actions: [],
      title: get('connectedap.action.addaddress', {
        iedName: element.getAttribute('iedName') ?? '',
        apName: element.getAttribute('apName') ?? '',
      }),
    };

    const oldAddress = element.querySelector('Address');

    if (oldAddress !== null && !isEqualAddress(oldAddress, newAddress)) {
      // We cannot use updateAction on address as both address child elements P are changed
      complexAction.actions.push({
        old: {
          parent: element,
          element: oldAddress,
          reference: oldAddress.nextSibling,
        },
      });
      complexAction.actions.push({
        new: {
          parent: element,
          element: newAddress,
          reference: oldAddress.nextSibling,
        },
      });
    } else if (oldAddress === null)
      complexAction.actions.push({
        new: {
          parent: element,
          element: newAddress,
          reference: getReference(element, 'Address'),
        },
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
  const minTime = element.querySelector('MinTime')?.innerHTML.trim();
  const maxTime = element.querySelector('MaxTime')?.innerHTML.trim();
  return [
    {
      title: get('gse.edit'),
      element,
      primary: {
        label: get('save'),
        icon: 'edit',
        action: editGSEAction(element),
      },
      content: [
        html`<mwc-formfield
          label="${translate('connectedap.wizard.addschemainsttype')}"
        >
          <mwc-checkbox
            id="instType"
            ?checked="${Array.from(
              element.querySelectorAll('Address > P')
            ).some(pType => pType.getAttribute('xsi:type'))}"
          ></mwc-checkbox>
        </mwc-formfield>`,
        html`${pTypesGSESMV.map(
          ptype =>
            html`<wizard-textfield
              label="${ptype}"
              .maybeValue=${element
                .querySelector(`Address > P[type="${ptype}"]`)
                ?.innerHTML.trim() ?? null}
              ?nullable=${typeNullable[ptype]}
              pattern="${ifDefined(typePattern[ptype])}"
              maxLength="${ifDefined(typeMaxLength[ptype])}"
            ></wizard-textfield>`
        )}`,
        html`<wizard-textfield
          label="MinTime"
          .maybeValue=${minTime}
          nullable
          suffix="ms"
          type="number"
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="MinTime"
          .maybeValue=${maxTime}
          nullable
          suffix="ms"
          type="number"
        ></wizard-textfield>`,
      ],
    },
  ];
}
