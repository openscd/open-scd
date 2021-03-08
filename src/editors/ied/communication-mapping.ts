import { html } from 'lit-html';

import '../../filtered-list.js';
import { Wizard } from '../../foundation.js';

export function communicationMappingWizard(doc: Document): Wizard {
  return [
    {
      title: 'trans: Communication mapping',
      content:
        doc.querySelectorAll(':root > IED').length > 1
          ? [
              html`<div
                class="wrapper"
                style="display: grid; grid-template-columns: 1fr 1fr;"
              >
                <filtered-list
                  id="sourceList"
                  multi
                  activatable
                  searchFieldLabel="Source"
                >
                  ${Array.from(doc.querySelectorAll(':root > IED') ?? []).map(
                    IED =>
                      html`<mwc-list-item value="${IED.getAttribute('name')!}"
                        >${IED.getAttribute('name')}</mwc-list-item
                      >`
                  )}
                </filtered-list>
                <filtered-list
                  id="sinkList"
                  activatable
                  searchFieldLabel="Sink"
                >
                  ${Array.from(doc.querySelectorAll(':root > IED') ?? []).map(
                    IED =>
                      html`<mwc-list-item value="${IED.getAttribute('name')!}"
                        >${IED.getAttribute('name')}</mwc-list-item
                      >`
                  )}
                </filtered-list>
              </div>`,
            ]
          : [
              html`
                <div style="display:flex">
                  <mwc-icon slot="graphic">info</mwc-icon
                  ><span style="margin-left:20px">trans: missing ied's</span>
                </div>
              `,
            ],
    },
  ];
}
