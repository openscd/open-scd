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
  WizardActor,
  WizardInput,
} from '../foundation.js';

import { List } from '@material/mwc-list';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';

import { clientIcon, controlBlockIcons, inputIcon } from '../icons.js';

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

    const actions: WizardAction[] = [];

    items.forEach(index => {
      if (connections[index].tagName === 'ExtRef')
        actions.push(disconnectExtRef(connections[index]));
      else {
        // Connections to IEDName are not direct but can shared for several ExtRef's
        actions.push({
          old: {
            parent: connections[index].parentElement!,
            element: connections[index],
            reference: connections[index].nextElementSibling,
          },
        });
      }
    });

    actions.push(() => communicationMappingWizard(root));

    return actions;
  };
}

function cancel(root: XMLDocument | Element): WizardActor {
  return () => [() => communicationMappingWizard(root)];
}

function cbConnectionWizard(
  connections: Element[],
  cbId: string,
  cbTag: string,
  iedName: string,
  root: XMLDocument | Element
): Wizard {
  return [
    {
      title: cbId + ' - ' + iedName,
      primary: {
        icon: 'delete',
        label: get('disconnect'), // FIXME: translate
        action: disconnect(connections, root),
      },
      secondary: {
        icon: '',
        label: get('cancel'),
        action: cancel(root),
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
            const [cbId, cbTag, sinkIED] = key.split(' | ');
            const [_, sourceIED, controlBlock] = cbId.match(/^(.+)>>(.*)$/)!;
            return html`<mwc-list-item
              twoline
              graphic="icon"
              hasMeta
              @click="${(evt: SingleSelectedEvent) => {
                evt.target!.dispatchEvent(
                  newWizardEvent(
                    cbConnectionWizard(
                      connections.get(key)!,
                      cbId,
                      cbTag,
                      sinkIED,
                      root
                    )
                  )
                );
                evt.target!.dispatchEvent(newWizardEvent());
              }}"
            >
              <span
                >${sourceIED}
                <mwc-icon style="--mdc-icon-size: 1em;">trending_flat</mwc-icon>
                ${sinkIED}</span
              >
              <span slot="secondary">${controlBlock}</span>
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
