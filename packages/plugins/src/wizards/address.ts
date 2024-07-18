import { html, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { get } from 'lit-translate';

import '@material/mwc-checkbox';
import '@material/mwc-formfield';

import '@openscd/open-scd/src/wizard-textfield.js';
import {
  createElement,
} from '@openscd/xml';
import { Create, Delete } from '@openscd/core/foundation/deprecated/editor.js';
import { typeNullable, typePattern } from './foundation/p-types.js';

interface ContentOptions {
  hasInstType: boolean;
  attributes: Record<string, string | null>;
}

export function contentGseOrSmvWizard(
  content: ContentOptions
): TemplateResult[] {
  return [
    html`<mwc-formfield label="${get('connectedap.wizard.addschemainsttype')}">
      <mwc-checkbox
        id="instType"
        ?checked="${content.hasInstType}"
      ></mwc-checkbox>
    </mwc-formfield>`,
    html`${Object.entries(content.attributes).map(
      ([key, value]) =>
        html`<wizard-textfield
          label="${key}"
          ?nullable=${typeNullable[key]}
          .maybeValue=${value}
          pattern="${ifDefined(typePattern[key])}"
          required
        ></wizard-textfield>`
    )}`,
  ];
}

function isEqualAddress(oldAddr: Element, newAdddr: Element): boolean {
  if (
    oldAddr.querySelectorAll('P').length !==
    newAdddr.querySelectorAll('P').length
  )
    return false;

  return (
    Array.from(oldAddr.querySelectorAll('P')).filter(
      pType =>
        !newAdddr
          .querySelector(`Address > P[type="${pType.getAttribute('type')}"]`)
          ?.isEqualNode(pType)
    ).length === 0
  );
}

export function createAddressElement(
  inputs: Record<string, string | null>,
  parent: Element,
  instType: boolean
): Element {
  const element = createElement(parent.ownerDocument, 'Address', {});

  Object.entries(inputs)
    .filter(([key, value]) => value !== null)
    .forEach(([key, value]) => {
      const type = key;
      const child = createElement(parent.ownerDocument, 'P', { type });
      if (instType)
        child.setAttributeNS(
          'http://www.w3.org/2001/XMLSchema-instance',
          'xsi:type',
          'tP_' + key
        );
      child.textContent = value;
      element.appendChild(child);
    });

  return element;
}

export function updateAddress(
  parent: Element,
  inputs: Record<string, string | null>,
  instType: boolean
): (Create | Delete)[] {
  const actions: (Create | Delete)[] = [];

  const newAddress = createAddressElement(inputs, parent, instType);
  const oldAddress = parent.querySelector('Address');

  if (oldAddress !== null && !isEqualAddress(oldAddress, newAddress)) {
    //address & child elements P are changed: cannot use replace editor action
    actions.push({
      old: {
        parent: parent,
        element: oldAddress,
        reference: oldAddress.nextSibling,
      },
    });
    actions.push({
      new: {
        parent: parent,
        element: newAddress,
        reference: oldAddress.nextSibling,
      },
    });
  } else if (oldAddress === null)
    actions.push({
      new: {
        parent: parent,
        element: newAddress,
      },
    });

  return actions;
}
