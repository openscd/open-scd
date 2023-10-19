import { html, LitElement } from 'lit-element';
import { get } from 'lit-translate';

import { newWizardEvent, Wizard, WizardInputElement } from '../foundation.js';

import { CompasSettingsElement } from '../compas/CompasSettings.js';

import '../compas/CompasSettings.js';

export default class CompasSettingsMenuPlugin extends LitElement {
  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(compasSettingWizard()));
  }
}

export function compasSettingWizard(): Wizard {
  function save() {
    return function (inputs: WizardInputElement[], wizard: Element) {
      const compasSettingsElement = <CompasSettingsElement>(
        wizard.shadowRoot!.querySelector('compas-settings')
      );
      if (compasSettingsElement.save()) {
        compasSettingsElement.close();
      }
      return [];
    };
  }

  return [
    {
      title: get('compas.settings.title'),
      primary: {
        icon: 'save',
        label: get('save'),
        action: save(),
      },
      content: [html`<compas-settings></compas-settings>`],
    },
  ];
}
