import { html, LitElement } from 'lit-element';
import { get } from 'lit-translate';

import {
  newLogEvent,
  newOpenDocEvent,
  newPendingStateEvent,
  newWizardEvent,
  Wizard,
} from '../foundation.js';

import { DocRetrievedEvent } from '../compas/CompasOpen.js';
import { updateDocumentInOpenSCD } from '../compas/foundation.js';

import '../compas/CompasOpen.js';

export default class CompasOpenMenuPlugin extends LitElement {
  private openCompasWizard(): Wizard {
    async function openDoc(
      plugin: CompasOpenMenuPlugin,
      event: DocRetrievedEvent
    ): Promise<void> {
      if (event.detail.localFile) {
        plugin.dispatchEvent(newLogEvent({ kind: 'reset' }));
        plugin.dispatchEvent(
          newOpenDocEvent(event.detail.doc, event.detail.docName!, {
            detail: { docId: undefined },
          })
        );
      } else {
        updateDocumentInOpenSCD(plugin, event.detail.doc, event.detail.docName);
        plugin.dispatchEvent(newWizardEvent());
      }
    }

    return [
      {
        title: get('compas.open.title'),
        content: [
          html`<compas-open
            @docRetrieved=${(event: DocRetrievedEvent) => {
              this.dispatchEvent(newPendingStateEvent(openDoc(this, event)));
            }}
          >
          </compas-open> `,
        ],
      },
    ];
  }

  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(this.openCompasWizard()));
  }
}
