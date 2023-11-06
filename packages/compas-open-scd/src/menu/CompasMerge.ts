import { html, LitElement } from 'lit-element';
import { get } from 'lit-translate';

import { newWizardEvent, Wizard } from '../foundation.js';
import { mergeWizard } from '../wizards.js';

import { DocRetrievedEvent } from '../compas/CompasOpen.js';

import '../compas/CompasOpen.js';

export default class CompasMergeMenuPlugin extends LitElement {
  doc!: XMLDocument;
  parent!: HTMLElement;

  private mergeCompasWizard(): Wizard {
    return [
      {
        title: get('compas.merge.title'),
        content: [
          html`<compas-open
            @doc-retrieved=${(evt: DocRetrievedEvent) => {
              this.parent.dispatchEvent(
                newWizardEvent(
                  mergeWizard(
                    this.doc.documentElement,
                    evt.detail.doc.documentElement
                  )
                )
              );
              this.parent.dispatchEvent(newWizardEvent());
            }}
          >
          </compas-open> `,
        ],
      },
    ];
  }

  firstUpdated(): void {
    this.parent = this.parentElement!;
  }

  async run(): Promise<void> {
    this.dispatchEvent(newWizardEvent(this.mergeCompasWizard()));
  }
}
