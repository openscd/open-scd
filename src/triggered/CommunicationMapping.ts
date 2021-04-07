import { html, LitElement } from 'lit-element';
import { get } from 'lit-translate';

import {
  createElement,
  EditorAction,
  getDataSink,
  newWizardEvent,
  Wizard,
  WizardAction,
  WizardInput,
} from '../foundation.js';

import { List } from '@material/mwc-list';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';

import { clientIcon, controlBlockIcons, inputIcon } from '../icons.js';

export type ControlBlockType =
  | 'ReportControl'
  | 'LogControl'
  | 'GSEControl'
  | 'SampledValuesControl';

type ControlBlockConnectionType = 'IEDName' | 'ClientLN';

const cbConnection: Record<ControlBlockType, ControlBlockConnectionType> = {
  ReportControl: 'ClientLN',
  LogControl: 'ClientLN',
  GSEControl: 'IEDName',
  SampledValuesControl: 'IEDName',
};

export interface Connection {
  source: Element;
  data?: Element;
  sink: Element;
}

export function getConnectionIndexOf(
  list: Connection[],
  match: Connection
): number {
  for (let i = 0; list.length; i++)
    if (
      list[i].source.closest('IED')?.getAttribute('name') ===
        match.source.closest('IED')?.getAttribute('name') &&
      list[i].source.getAttribute('name') ===
        match.source.getAttribute('name') &&
      list[i].sink.getAttribute('iedName') ===
        match.sink.getAttribute('iedName')
    )
      return i;

  return -1;
}

export function getConnection(
  connections: Connection[],
  item: Connection
): Connection[] {
  return connections.filter(
    match => match.source === item.source && match.sink === match.sink
  );
}

/**
 * @returns array of - control block - Connection's
 * Control block connection are connections defined within the control block
 * by the element `ClientLN` for `ReportControl` and `LogControl` and
 * by the element `IEDName` for `GSEControl` and `SampledValueControl`
 */
export function getControlBlockConnection(
  root: Document | Element,
  cbType: ControlBlockType
): Connection[] {
  return Array.from(root.querySelectorAll(cbType))
    .filter(controlBlock => !controlBlock.closest('Private'))
    .flatMap(controlBlock => {
      return Array.from(controlBlock.querySelectorAll(cbConnection[cbType]))
        .filter(item => !item.closest('Private'))
        .flatMap(connection => {
          return {
            source: controlBlock,
            sink: connection,
          };
        });
    });
}

/**
 * @returns array of - data - Connection's
 * Data connection are connections defined between the FCDA in the source
 * and ExtRef in the sink
 */
export function getDataConnection(
  root: Document | Element,
  cbTagName: 'GSEControl' | 'SampledValueControl' | 'ReportControl'
): Connection[] {
  const controlBlocks = Array.from(root.querySelectorAll(cbTagName)).filter(
    item => !item.closest('Private')
  );

  const conn: Connection[] = [];

  controlBlocks.forEach(controlBlock => {
    const anyLN: Element = controlBlock.parentElement!;
    const data: Element[] = Array.from(
      anyLN.querySelectorAll(
        ` DataSet[name="${controlBlock.getAttribute('datSet')}"] > FCDA`
      )
    ).filter(item => !item.closest('Private'));

    data.map(fcda => {
      getDataSink(fcda).forEach(extref => {
        conn.push({ source: controlBlock, data: fcda, sink: extref });
      });
    });
  });

  return conn;
}

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

export function communicationMappingWizard(connections: Connection[]): Wizard {
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

export default class CommunicationMappingPlugin extends LitElement {
  doc!: XMLDocument;

  async trigger(): Promise<void> {
    const report = getControlBlockConnection(this.doc, 'ReportControl');
    const goose = getDataConnection(this.doc, 'GSEControl');
    const smv = getDataConnection(this.doc, 'SampledValueControl');

    const connections = report.concat(goose, smv);

    this.dispatchEvent(newWizardEvent(communicationMappingWizard(connections)));
    return;
  }
}
