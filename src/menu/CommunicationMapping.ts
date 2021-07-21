import { LitElement } from 'lit-element';

import { newWizardEvent } from '../foundation.js';

import { communicationMappingWizard } from '../wizards/commmap-wizards.js';

export default class CommunicationMappingPlugin extends LitElement {
  doc!: XMLDocument;

  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(communicationMappingWizard(this.doc)));
  }
}
