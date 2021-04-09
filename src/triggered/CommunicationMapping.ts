import { html, LitElement } from 'lit-element';
import { get } from 'lit-translate';

import {
  createElement,
  EditorAction,
  findControlBlocks,
  identity,
  newWizardEvent,
  Wizard,
  WizardAction,
  WizardInput,
} from '../foundation.js';

import { List } from '@material/mwc-list';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';

import { clientIcon, controlBlockIcons, inputIcon } from '../icons.js';

type CommunicationMapping =
  | {
      controlBlock: Element;
      sinkReference: Element;
      fcda: Element | null;
      extRef: Element | null;
    }
  | {
      controlBlock: Element;
      sinkReference: Element | null;
      fcda: Element;
      extRef: Element;
    }
  | {
      controlBlock: null;
      sinkReference: null;
      fcda: Element;
      extRef: Element;
    };

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
  const [intAddr, desc, serviceType, pServT, pLN, pDO, pDA] = [
    'intAddr',
    'desc',
    'serviceType',
    'pServT',
    'pLN',
    'pDO',
    'pDA',
  ].map(name => extRef.getAttribute(name));

  if (intAddr) {
    // FIXME(JakobVogelsang): Which specific attribute does this comment refer to?
    // cannot delete extRef but only specific attribute
    const newExtRef = createElement(extRef.ownerDocument, 'ExtRef', {
      intAddr,
      desc,
      serviceType,
      pServT,
      pLN,
      pDO,
      pDA,
    });

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

function disconnectSink(connections: Element[]): WizardAction {
  return (inputs: WizardInput[], wizard: Element): EditorAction[] => {
    const items = <Set<number>>(
      (<List>wizard.shadowRoot!.querySelector('filtered-list')).index
    );

    const actions: EditorAction[] = [];

    items.forEach(index => {
      if (connections[index].tagName === 'ExtRef')
        actions.push(disconnectExtRef(connections[index]));
      else {
        // Connections to IEDName are not direct but can shared for severel ExtRef's
        actions.push({
          old: {
            parent: connections[index].parentElement!,
            element: connections[index],
            reference: connections[index].nextElementSibling,
          },
        });
      }
    });

    return actions;
  };
}

function cbConnectionWizard(
  connections: Element[],
  cbId: string,
  cbTag: string,
  iedName: string
): Wizard {
  return [
    {
      title: cbId + ' - ' + iedName,
      primary: {
        icon: 'delete',
        label: 'Disconnect',
        action: disconnectSink(connections),
      },
      content: [
        html`<filtered-list multi
          >${connections.map(
            element =>
              html`<mwc-check-list-item graphic="icon" twoline>
                <span>${sinkPrimary(element)}</span
                ><span slot="secondary">${sinkSecondary(element)}</span>
                <mwc-icon slot="graphic"
                  >${element.tagName === 'ClientLN'
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

function getSinkReferences(root: Document | Element): Element[] {
  return Array.from(root.getElementsByTagName('IEDName'))
    .concat(Array.from(root.getElementsByTagName('ClientLN')))
    .filter(element => !element.closest('Private'));
}

function getSourceReferences(root: Document | Element): Element[] {
  return Array.from(root.getElementsByTagName('ExtRef'))
    .filter(element => !element.closest('Private'))
    .filter(element => element.getAttribute('iedName'));
}

function communicationMappingWizard(root: XMLDocument | Element): Wizard {
  const connections = new Map<string, Element[]>();
  const sourceRefs = getSourceReferences(root);
  const sinkRefs = getSinkReferences(root);

  sinkRefs.forEach(element => {
    const controlBlock = element.parentElement!;
    const iedName =
      element.tagName === 'IEDName'
        ? element.textContent
        : element.getAttribute('iedName');
    const key =
      identity(controlBlock) + ' | ' + controlBlock.tagName + ' | ' + iedName;
    if (!connections.has(key)) connections.set(key, []);
    connections.get(key)?.push(element);
  });

  sourceRefs.forEach(element => {
    const iedName = element.closest('IED')?.getAttribute('name') ?? '';
    const controlBlocks = findControlBlocks(element);
    controlBlocks.forEach(controlBlock => {
      const key =
        identity(controlBlock) + ' | ' + controlBlock.tagName + ' | ' + iedName;
      if (!connections.has(key)) connections.set(key, []);
      connections.get(key)?.push(element);
    });
    if (controlBlocks.size === 0) {
      const key = ' |  | ' + iedName;
      if (!connections.has(key)) connections.set(key, []);
      connections.get(key)?.push(element);
    }
  });

  return [
    {
      title: get('transform.comm-map.wizard.title'),
      content: [
        html`<filtered-list
          >${Array.from(connections.keys()).map(key => {
            const [cbId, cbTag, iedName] = key.split(' | ');
            return html`<mwc-list-item
              graphic="icon"
              hasMeta
              @click="${(evt: SingleSelectedEvent) =>
                evt.target!.dispatchEvent(
                  newWizardEvent(
                    cbConnectionWizard(
                      connections.get(key)!,
                      cbId,
                      cbTag,
                      iedName
                    ),
                    {
                      detail: { subwizard: true },
                    }
                  )
                )}"
            >
              <span
                >${cbId}
                <mwc-icon style="--mdc-icon-size: 1em;">trending_flat</mwc-icon>
                ${iedName}</span
              >
              <span slot="meta" style="padding-left: 10px"
                >${connections.get(key)!.length}</span
              >
              <mwc-icon slot="graphic">${controlBlockIcons[cbTag]}</mwc-icon>
            </mwc-list-item>`;
          })}</filtered-list
        >`,
      ],
    },
  ];
}

export default class CommunicationMappingPlugin extends LitElement {
  doc!: XMLDocument;

  async trigger(): Promise<void> {
    this.dispatchEvent(newWizardEvent(communicationMappingWizard(this.doc)));
  }
}
