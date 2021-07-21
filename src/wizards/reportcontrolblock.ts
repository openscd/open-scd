import { html } from 'lit-element';
import { get } from 'lit-translate';

import {
  identity,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInput,
} from '../foundation.js';

import { clientIcon } from '../icons.js';

import { List } from '@material/mwc-list';
import { openCommunicationMappingWizard } from './commmap-wizards.js';

function disconnect(clientLNs: Element[]): WizardActor {
  return (
    inputs: WizardInput[],
    wizard: Element,
    list?: List | null
  ): WizardAction[] => {
    const items = <Set<number>>list!.index;
    const selectedClientLNs = Array.from(items).map(index => clientLNs[index]);

    const actions: WizardAction[] = [];
    selectedClientLNs.forEach(clientLN => {
      actions.push({
        old: {
          parent: clientLN.parentElement!,
          element: clientLN,
          reference: clientLN.nextElementSibling,
        },
      });
    });

    return actions;
  };
}

export function editClientLNsWizard(
  clientLNs: Element[],
  root: XMLDocument | Element
): Wizard {
  const controlBlock = clientLNs[0].closest('ReportControl');
  const cbId = identity(controlBlock);
  const sinkIedName = clientLNs[0].getAttribute('iedName');

  return [
    {
      title: cbId + ' - ' + sinkIedName,
      primary: {
        icon: 'delete',
        label: get('disconnect'), // FIXME: translate
        action: disconnect(clientLNs),
      },
      secondary: {
        icon: '',
        label: get('back'),
        action: openCommunicationMappingWizard(root),
      },
      content: [
        html`<filtered-list multi
          >${clientLNs.map(clientLN => {
            const ln =
              (clientLN.getAttribute('prefix') ?? '') +
              clientLN.getAttribute('lnClass') +
              (clientLN.getAttribute('lnInst') ?? '');

            return html`<mwc-check-list-item graphic="icon">
              <span>${ln}</span>
              <mwc-icon slot="graphic">${clientIcon}</mwc-icon>
            </mwc-check-list-item> `;
          })}</filtered-list
        >`,
      ],
    },
  ];
}
