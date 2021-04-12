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
import { createConnectionWizard } from './communicationmapping/reportcbwizards.js';

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

function disconnectExtRefs(extRefs: Element[]): EditorAction[] {
  const actions = <EditorAction[]>[];
  extRefs.forEach(extRef => {
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
      // cannot delete extRef but only DAPath attributes
      const newExtRef = createElement(extRef.ownerDocument, 'ExtRef', {
        intAddr,
        desc,
        serviceType,
        pServT,
        pLN,
        pDO,
        pDA,
      });

      actions.push({
        new: {
          element: newExtRef,
        },
        old: {
          element: extRef,
        },
      });
    } else {
      actions.push({
        old: {
          parent: extRef.parentElement!,
          element: extRef,
          reference: extRef.nextElementSibling,
        },
      });
    }
  });

  // cbConnectionWizard shows connections sources in ONE controlBlock
  const sinkReference: Set<Element> = new Set();
  extRefs.forEach(extRef => {
    findControlBlocks(extRef).forEach(cb => {
      const ied = extRef.closest('IED')?.getAttribute('name');
      const ld = extRef.closest('LDevice')?.getAttribute('inst');
      const ap = extRef.closest('AccessPoint')?.getAttribute('name');
      const ln = extRef.closest('LN0') || extRef.closest('LN');
      const [prefix, lnClass, inst] = ['prefix', 'lnClass', 'inst'].map(name =>
        ln?.getAttribute(name)
      );
      const iedNames = Array.from(cb.getElementsByTagName('IEDName')).filter(
        iedName =>
          iedName.textContent === ied &&
          (iedName.getAttribute('apRef') || ap) === ap &&
          (iedName.getAttribute('ldInst') || ld) === ld &&
          (iedName.getAttribute('prefix') || prefix) === prefix &&
          (iedName.getAttribute('lnClass') || lnClass) === lnClass &&
          (iedName.getAttribute('lnInst') || inst) === inst
      );

      iedNames.forEach(iedName => {
        sinkReference.add(iedName);
      });
    });
  });

  const sourceReferences: Set<Element> = new Set();
  sinkReference.forEach(iedName => {
    sourceReferences.clear();

    const target = findIEDNameTarget(iedName);

    if (target)
      getSourceReferences(target).forEach(sourceReference =>
        sourceReferences.add(sourceReference)
      );

    extRefs.forEach(extRef => sourceReferences.delete(extRef));
    if (sourceReferences.size === 0)
      actions.push({
        old: {
          parent: iedName.parentElement!,
          element: iedName,
          reference: iedName.nextElementSibling,
        },
      });
  });

  return actions;
}

function findIEDNameTarget(iedName: Element): Element | null {
  const name = iedName.textContent ?? '';
  const [apRef, ldInst, prefix, lnClass, lnInst] = [
    'apRef',
    'ldInst',
    'prefix',
    'lnClass',
    'lnInst',
  ].map(name => iedName.getAttribute(name));
  const ied = iedName.ownerDocument.querySelector(`:root > IED[name=${name}]`);
  if (!ied) return null;

  const apRefSelector = apRef ? `AccessPoint[name="${apRef}"]` : '``';
  const ldInstSeletor = ldInst ? `LDevice[inst="${ldInst}"]` : '';
  const lnClassSelector = lnClass
    ? lnClass === 'LLN0'
      ? `LN0`
      : `LN[lnClass="${lnClass}"]`
    : '';
  const prefixSelector = prefix ? `[prefix="${prefix}"]` : '';
  const lnInstSelector = lnInst ? `[inst="${lnInst}"]` : '';

  const selector = ` ${apRefSelector} ${ldInstSeletor} ${lnClassSelector}${prefixSelector}${lnInstSelector}`;

  return ied.querySelector(selector);
}

function disconnect(
  connections: Element[],
  root: XMLDocument | Element
): WizardActor {
  return (inputs: WizardInput[], wizard: Element): WizardAction[] => {
    const items = <Set<number>>(
      (<List>wizard.shadowRoot!.querySelector('filtered-list')).index
    );

    const actions: WizardAction[] = [];
    const selected = Array.from(items).map(index => connections[index]);

    const selectedExtRefs = selected.filter(
      connection => connection.tagName === 'ExtRef'
    );
    disconnectExtRefs(selectedExtRefs).forEach(action => actions.push(action));

    const selectedClientLNs = selected.filter(
      connection => connection.tagName === 'ClientLN'
    );
    selectedClientLNs.forEach(clientLN => {
      actions.push({
        old: {
          parent: clientLN.parentElement!,
          element: clientLN,
          reference: clientLN.nextElementSibling,
        },
      });
    });

    actions.push(() => communicationMappingWizard(root));

    return actions;
  };
}

export function openCommunicationMappingWizard(
  root: XMLDocument | Element
): WizardActor {
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
        action: openCommunicationMappingWizard(root),
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

export function getSinkReferences(root: Document | Element): Element[] {
  return Array.from(root.getElementsByTagName('IEDName'))
    .concat(Array.from(root.getElementsByTagName('ClientLN')))
    .filter(element => !element.closest('Private'));
}

export function getSourceReferences(root: Document | Element): Element[] {
  return Array.from(root.getElementsByTagName('ExtRef'))
    .filter(element => !element.closest('Private'))
    .filter(element => element.getAttribute('iedName'));
}

export function openCreateConnection(doc: Document): WizardActor {
  return (inputs: WizardInput[], wizard: Element): WizardAction[] => {
    return [() => createConnectionWizard(doc)];
  };
}

export function communicationMappingWizard(
  root: XMLDocument | Element
): Wizard {
  const connections = new Map<string, Element[]>();
  const sourceRefs = getSourceReferences(root);
  const sinkRefs = getSinkReferences(root);

  sinkRefs
    .filter(element => element.tagName === 'ClientLN')
    .forEach(element => {
      const controlBlock = element.parentElement!.parentElement!;
      const iedName = element.getAttribute('iedName');
      const key =
        identity(controlBlock) + ' | ' + controlBlock.tagName + ' | ' + iedName;
      if (!connections.has(key)) connections.set(key, []);
      connections.get(key)?.push(element);
      console.warn(key, element);
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
      primary: {
        icon: 'add',
        label: get('transform.comm-map.connectCB', { CbType: get('Report') }),
        action: openCreateConnection(
          root instanceof XMLDocument ? root : root.ownerDocument
        ),
      },
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
