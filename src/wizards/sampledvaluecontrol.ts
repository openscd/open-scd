import { html } from 'lit-element';
import { get } from 'lit-translate';

import { identity, isPublic, Wizard } from '../foundation.js';

export function selectSampledValueControlWizard(element: Element): Wizard {
  const smvControls = Array.from(
    element.querySelectorAll('SampledValueControl')
  ).filter(isPublic);

  return [
    {
      title: get('wizard.title.select', { tagName: 'SampledValueControl' }),
      content: [
        html`<filtered-list
          >${smvControls.map(
            smvControl =>
              html`<mwc-list-item twoline value="${identity(smvControl)}"
                ><span>${smvControl.getAttribute('name')}</span
                ><span slot="secondary"
                  >${identity(smvControl)}</span
                ></mwc-list-item
              >`
          )}</filtered-list
        >`,
      ],
    },
  ];
}
