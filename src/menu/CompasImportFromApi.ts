import { html, LitElement } from 'lit-element';
import { get } from 'lit-translate';

import '../filtered-list.js';
import '../wizard-textfield.js';
import { newWizardEvent, Wizard } from '../foundation.js';

import '../compas/CompasImportFromApi.js';

export default class ImportFromApiPlugin extends LitElement {
  private importFromApiWizard(): Wizard {
    return [
      {
        title: get('compas.import.title'),
        content: [html`<compas-import-from-api></compas-import-from-api>`],
      },
    ];
  }

  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(this.importFromApiWizard()));
  }
}
