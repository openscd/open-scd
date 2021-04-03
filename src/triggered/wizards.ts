import { html } from 'lit-element';
import { get } from 'lit-translate';

import '../filtered-list.js';

import { List } from '@material/mwc-list';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';

import {
  createElement,
  EditorAction,
  newWizardEvent,
  Wizard,
  WizardAction,
  WizardInput,
} from '../foundation.js';
import { clientIcon, controlBlockIcons, inputIcon } from '../icons.js';
import {
  Connection,
  getConnection,
  getConnectionIndexOf,
} from './CommunicationMapping.js';

function sinkPrimary(sink: Element): string {
  const ln =
    (sink.getAttribute('prefix') ?? '') +
    sink.getAttribute('lnClass') +
    (sink.getAttribute('lnInst') ?? '');

  return sink.tagName === 'ClientLN'
    ? ln
    : ln +
        '>' +
        sink.getAttribute('doName') +
        '.' +
        (sink.getAttribute('daName') ?? '');
}

function sinkSecondary(sink: Element): string {
  return sink.tagName === 'ClientLN' ? '' : sink.getAttribute('ldInst') ?? '';
}

function disconnectExtRef(extRef: Element): EditorAction {
  if (extRef.getAttribute('intAddr')) {
    // cannot delete extRef but only specific attribute
    const newExtRef = createElement(extRef.ownerDocument, 'ExtRef', {});
    if (extRef.getAttribute('intAddr'))
      newExtRef.setAttribute('intAddr', extRef.getAttribute('intAddr')!);
    if (extRef.getAttribute('desc'))
      newExtRef.setAttribute('desc', extRef.getAttribute('desc')!);
    if (extRef.getAttribute('serviceType'))
      newExtRef.setAttribute(
        'serviceType',
        extRef.getAttribute('serviceType')!
      );
    if (extRef.getAttribute('pServT'))
      newExtRef.setAttribute('pServT', extRef.getAttribute('pServT')!);
    if (extRef.getAttribute('pLN'))
      newExtRef.setAttribute('pLN', extRef.getAttribute('pLN')!);
    if (extRef.getAttribute('pDO'))
      newExtRef.setAttribute('pDO', extRef.getAttribute('pDO')!);
    if (extRef.getAttribute('pDA'))
      newExtRef.setAttribute('pDA', extRef.getAttribute('pDA')!);

    return {
      new: {
        element: newExtRef,
      },
      old: {
        element: extRef,
      },
    };
  }

  return {
    old: {
      parent: extRef.parentElement!,
      element: extRef,
      reference: extRef.nextElementSibling,
    },
  };
}

export function disconnectSink(connections: Connection[]): WizardAction {
  return (inputs: WizardInput[], wizard: Element): EditorAction[] => {
    const items = <Set<number>>(
      (<List>wizard.shadowRoot!.querySelector('filtered-list')).index
    );

    const actions: EditorAction[] = [];

    items.forEach(index => {
      const sink = connections[index].sink;
      if (sink.tagName === 'ExtRef') actions.push(disconnectExtRef(sink));

      if (sink.tagName === 'ClientLN') {
        actions.push({
          old: {
            parent: sink.parentElement!,
            element: sink,
            reference: sink.nextElementSibling,
          },
        });
      }
    });

    return actions;
  };
}

function cbConnectionWizard(connections: Connection[]): Wizard {
  return [
    {
      title:
        (connections[0].source.closest('IED')?.getAttribute('name') ?? '') +
        ' - ' +
        (connections[0].sink.tagName === 'ClientLN'
          ? connections[0].sink.getAttribute('iedName') ?? ''
          : connections[0].sink.closest('IED')?.getAttribute('name') ?? ''),
      primary: {
        icon: 'delete',
        label: 'Disconnect',
        action: disconnectSink(connections),
      },
      content: [
        html`<filtered-list multi
          >${connections.map(
            item =>
              html`<mwc-check-list-item graphic="icon" twoline>
                <span>${sinkPrimary(item.sink)}</span
                ><span slot="secondary">${sinkSecondary(item.sink)}</span>
                <mwc-icon slot="graphic"
                  >${item.sink.tagName === 'ClientLN'
                    ? clientIcon
                    : inputIcon}</mwc-icon
                >
              </mwc-check-list-item> `
          )}</filtered-list
        >`,
      ],
    },
  ];
}

export function commMappingWizard(connections: Connection[]): Wizard {
  return [
    {
      title: get('transform.comm-map.wizard.title'),
      content: [
        html`<filtered-list
          >${connections
            .filter((v, i, a) => getConnectionIndexOf(a, v!) === i)
            .map(
              item =>
                html`<mwc-list-item
                  graphic="icon"
                  twoline
                  hasMeta
                  @click="${(evt: SingleSelectedEvent) =>
                    evt.target!.dispatchEvent(
                      newWizardEvent(
                        cbConnectionWizard(getConnection(connections, item)),
                        {
                          detail: { subwizard: true },
                        }
                      )
                    )}"
                >
                  <span
                    >${item.source.closest('IED')?.getAttribute('name') ?? ''}
                    ${html`
                      <mwc-icon style="--mdc-icon-size: 1em;"
                        >trending_flat</mwc-icon
                      >
                    `}
                    ${item.sink.tagName === 'ClientLN'
                      ? item.sink.getAttribute('iedName')
                      : item.sink.closest('IED')?.getAttribute('name') ??
                        ''}</span
                  ><span slot="secondary"
                    >${item.source.getAttribute('name') ?? ''}</span
                  >
                  <span slot="meta" style="padding-left: 10px"
                    >${getConnection(connections, item).length}</span
                  >
                  <mwc-icon slot="graphic"
                    >${controlBlockIcons[item.source.tagName ?? '']}</mwc-icon
                  >
                </mwc-list-item> `
            )}</filtered-list
        >`,
      ],
    },
  ];
}
