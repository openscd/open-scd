import { html, TemplateResult } from 'lit-element';
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
  WizardInputElement,
} from '../foundation.js';

/** Initial attribute values suggested for `SubNetwork` creation */
const initial = {
  type: '8-MMS',
  bitrate: '100',
  multiplier: 'M',
};

interface ContentOptions {
  name: string | null;
  desc: string | null;
  type: string | null;
  BitRate: string | null;
  multiplier: string | null;
}

function contentSubNetwork(options: ContentOptions): TemplateResult[] {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${options.name}
      helper="${translate('subnetwork.wizard.nameHelper')}"
      required
      validationMessage="${translate('textfield.required')}"
      dialogInitialFocus
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="desc"
      .maybeValue=${options.desc}
      nullable
      helper="${translate('subnetwork.wizard.descHelper')}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="type"
      .maybeValue=${options.type}
      nullable
      helper="${translate('subnetwork.wizard.typeHelper')}"
      pattern="${patterns.normalizedString}"
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="BitRate"
      .maybeValue=${options.BitRate}
      nullable
      unit="b/s"
      .multipliers=${[null, 'M']}
      .multiplier=${options.multiplier}
      helper="${translate('subnetwork.wizard.bitrateHelper')}"
      required
      validationMessage="${translate('textfield.nonempty')}"
      pattern="${patterns.decimal}"
    ></wizard-textfield>`,
  ];
}

export function createSubNetworkAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
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

export function createSubNetworkWizard(parent: Element): Wizard {
  return [
    {
      title: get('wizard.title.add', { tagName: 'SubNetwork' }),
      primary: {
        icon: 'add',
        label: get('add'),
        action: createSubNetworkAction(parent),
      },
      content: contentSubNetwork({
        name: '',
        desc: '',
        type: initial.type,
        BitRate: initial.bitrate,
        multiplier: initial.multiplier,
      }),
    },
  ];
}

function getBitRateAction(
  oldBitRate: Element | null,
  BitRate: string | null,
  multiplier: string | null,
  SubNetwork: Element
): EditorAction {
  if (oldBitRate === null) {
    const bitRateElement = createElement(SubNetwork.ownerDocument, 'BitRate', {
      unit: 'b/s',
    });

    if (multiplier) bitRateElement.setAttribute('multiplier', multiplier);
    if (BitRate) bitRateElement.textContent = BitRate;

    return {
      new: {
        parent: SubNetwork,
        element: bitRateElement,
        reference: SubNetwork.firstElementChild,
      },
    };
  }

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

function updateSubNetworkAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
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

export function editSubNetworkWizard(element: Element): Wizard {
  const name = element.getAttribute('name');
  const desc = element.getAttribute('desc');
  const type = element.getAttribute('type');
  const BitRate =
    element.querySelector('SubNetwork > BitRate')?.textContent?.trim() ?? null;
  const multiplier =
    element.querySelector('SubNetwork > BitRate')?.getAttribute('multiplier') ??
    null;

  return [
    {
      title: get('wizard.title.edit', { tagName: element.tagName }),
      element,
      primary: {
        icon: 'save',
        label: get('save'),
        action: updateSubNetworkAction(element),
      },
      content: contentSubNetwork({ name, desc, type, BitRate, multiplier }),
    },
  ];
}
