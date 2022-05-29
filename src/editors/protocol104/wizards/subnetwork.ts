import { html, TemplateResult } from 'lit-element';
import { get, translate } from 'lit-translate';
import { createElement, EditorAction, getMultiplier, getValue, patterns, Wizard, WizardActor, WizardInputElement } from '../../../foundation.js';

import '../../../wizard-textfield.js';

/** Initial attribute values suggested for `SubNetwork` creation for the 104 plugin */
const initial = {
  type: '104',
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
