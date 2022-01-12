import { html } from 'lit-element';
import { get, translate } from 'lit-translate';

import '../wizard-textfield.js';
import {
  cloneElement,
  createElement,
  EditorAction,
  getMultiplier,
  getValue,
  patterns,
  Wizard,
  WizardActor,
  WizardInput,
} from '../foundation.js';
import {
  isCreateOptions,
  WizardOptions,
} from '../editors/communication/foundation.js';

/** Initial attribute values suggested for `SubNetwork` creation */
const initial = {
  type: '8-MMS',
  bitrate: '100',
  multiplier: 'M',
};

function getBitRateAction(
  oldBitRate: Element | null,
  BitRate: string | null,
  multiplier: string | null,
  SubNetwork: Element
): EditorAction {
  if (oldBitRate === null)
    return {
      new: {
        parent: SubNetwork,
        element: new DOMParser().parseFromString(
          `<BitRate unit="b/s" ${
            multiplier === null ? '' : `multiplier="${multiplier}"`
          }>${BitRate === null ? '' : BitRate}</BitRate>`,
          'application/xml'
        ).documentElement,
        reference: SubNetwork.firstElementChild,
      },
    };

  if (BitRate === null)
    return {
      old: {
        parent: SubNetwork,
        element: oldBitRate,
        reference: oldBitRate.nextSibling,
      },
    };

  const newBitRate = cloneElement(oldBitRate, { multiplier });
  newBitRate.textContent = BitRate;

  return {
    old: { element: oldBitRate },
    new: { element: newBitRate },
  };
}

export function updateSubNetworkAction(element: Element): WizardActor {
  return (inputs: WizardInput[], wizard: Element): EditorAction[] => {
    const name = inputs.find(i => i.label === 'name')!.value!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const type = getValue(inputs.find(i => i.label === 'type')!);
    const BitRate = getValue(inputs.find(i => i.label === 'BitRate')!);
    const multiplier = getMultiplier(inputs.find(i => i.label === 'BitRate')!);

    let subNetworkAction: EditorAction | null;
    let bitRateAction: EditorAction | null;

    if (
      name === element.getAttribute('name') &&
      desc === element.getAttribute('desc') &&
      type === element.getAttribute('type')
    ) {
      subNetworkAction = null;
    } else {
      const newElement = cloneElement(element, { name, desc, type });
      subNetworkAction = { old: { element }, new: { element: newElement } };
    }

    if (
      BitRate ===
        (element.querySelector('SubNetwork > BitRate')?.textContent?.trim() ??
          null) &&
      multiplier ===
        (element
          .querySelector('SubNetwork > BitRate')
          ?.getAttribute('multiplier') ?? null)
    ) {
      bitRateAction = null;
    } else {
      bitRateAction = getBitRateAction(
        element.querySelector('SubNetwork > BitRate'),
        BitRate,
        multiplier,
        subNetworkAction?.new.element ?? element
      );
    }

    const actions: EditorAction[] = [];
    if (subNetworkAction) actions.push(subNetworkAction);
    if (bitRateAction) actions.push(bitRateAction);
    return actions;
  };
}

export function createSubNetworkAction(parent: Element): WizardActor {
  return (inputs: WizardInput[], wizard: Element): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!);
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const type = getValue(inputs.find(i => i.label === 'type')!);
    const BitRate = getValue(inputs.find(i => i.label === 'BitRate')!);
    const multiplier = getMultiplier(inputs.find(i => i.label === 'BitRate')!);

    const element = createElement(parent.ownerDocument, 'SubNetwork', {
      name,
      desc,
      type,
    });

    if (BitRate !== null) {
      const bitRateElement = createElement(parent.ownerDocument, 'BitRate', {
        unit: 'b/s',
        multiplier,
      });
      bitRateElement.textContent = BitRate;
      element.appendChild(bitRateElement);
    }

    const action = {
      new: {
        parent,
        element,
      },
    };

    return [action];
  };
}

export function subNetworkWizard(options: WizardOptions): Wizard {
  const [
    heading,
    actionName,
    actionIcon,
    action,
    name,
    desc,
    type,
    BitRate,
    multiplier,
    element,
  ] = isCreateOptions(options)
    ? [
        get('subnetwork.wizard.title.add'),
        get('add'),
        'add',
        createSubNetworkAction(options.parent),
        '',
        '',
        initial.type,
        initial.bitrate,
        initial.multiplier,
        undefined,
      ]
    : [
        get('subnetwork.wizard.title.edit'),
        get('save'),
        'edit',
        updateSubNetworkAction(options.element),
        options.element.getAttribute('name'),
        options.element.getAttribute('desc'),
        options.element.getAttribute('type'),
        options.element
          .querySelector('SubNetwork > BitRate')
          ?.textContent?.trim() ?? null,
        options.element
          .querySelector('SubNetwork > BitRate')
          ?.getAttribute('multiplier') ?? null,
        options.element,
      ];

  return [
    {
      title: heading,
      element,
      primary: {
        icon: actionIcon,
        label: actionName,
        action: action,
      },
      content: [
        html`<wizard-textfield
          label="name"
          .maybeValue=${name}
          helper="${translate('subnetwork.wizard.nameHelper')}"
          required
          validationMessage="${translate('textfield.required')}"
          dialogInitialFocus
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="desc"
          .maybeValue=${desc}
          nullable
          helper="${translate('subnetwork.wizard.descHelper')}"
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="type"
          .maybeValue=${type}
          nullable
          helper="${translate('subnetwork.wizard.typeHelper')}"
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="BitRate"
          .maybeValue=${BitRate}
          nullable
          unit="b/s"
          .multipliers=${[null, 'M']}
          .multiplier=${multiplier}
          helper="${translate('subnetwork.wizard.bitrateHelper')}"
          required
          validationMessage="${translate('textfield.nonempty')}"
          pattern="${patterns.decimal}"
        ></wizard-textfield>`,
      ],
    },
  ];
}
