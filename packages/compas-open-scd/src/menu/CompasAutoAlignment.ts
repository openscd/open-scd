import { html, LitElement, property } from 'lit-element';
import { get } from 'lit-translate';

import {
  newPendingStateEvent,
  newWizardEvent,
  Wizard,
  WizardInputElement,
} from '../foundation.js';

import CompasAutoAlignmentElement from '../compas/CompasAutoAlignment.js';

import '../compas/CompasAutoAlignment.js';

export default class CompasAutoAlignmentMenuPlugin extends LitElement {
  doc!: XMLDocument;
  docName!: string;
  docId?: string;
  @property({ type: Number })
  editCount = -1;

  private autoAlignmentCompasWizard(
    plugin: CompasAutoAlignmentMenuPlugin
  ): Wizard {
    function execute() {
      return function (inputs: WizardInputElement[], wizard: Element) {
        const compasAutoAlignmentElement = <CompasAutoAlignmentElement>(
          wizard.shadowRoot!.querySelector('compas-auto-alignment')
        );
        if (!compasAutoAlignmentElement.valid()) {
          return [];
        }

        plugin.dispatchEvent(
          newPendingStateEvent(compasAutoAlignmentElement.execute())
        );
        return [];
      };
    }

    return [
      {
        title: get('compas.autoAlignment.title'),
        primary: {
          icon: 'dashboard',
          label: get('compas.autoAlignment.button'),
          action: execute(),
        },
        content: [
          html`
            <compas-auto-alignment
              .doc="${this.doc}"
              .docName="${this.docName}"
              .docId="${this.docId}"
              .editCount=${this.editCount}
            >
            </compas-auto-alignment>
          `,
        ],
      },
    ];
  }

  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(this.autoAlignmentCompasWizard(this)));
  }
}
