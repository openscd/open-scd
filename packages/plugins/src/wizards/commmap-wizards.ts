import { html } from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-icon';
import '@material/mwc-list/mwc-list-item';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';

import '@openscd/open-scd/src/filtered-list.js';
import {
  find,
  findControlBlocks,
  identity,
  isPublic,
  newWizardEvent,
  Wizard,
  WizardActor,
} from '@openscd/open-scd/src/foundation.js';
import { selectClientLNsWizard } from './clientln.js';
import { selectExtRefsWizard } from './controlwithiedname.js';
import { controlBlockIcons } from '@openscd/open-scd/src/icons/icons.js';

export function openCommunicationMappingWizard(
  root: XMLDocument | Element
): WizardActor {
  return () => [() => communicationMappingWizard(root)];
}

export function getSinkReferences(root: Document | Element): Element[] {
  if (root instanceof Element && root.tagName === 'IED')
    return Array.from(root.ownerDocument.getElementsByTagName('ClientLN'))
      .filter(isPublic)
      .filter(
        clientLn =>
          clientLn.getAttribute('iedName') === root.getAttribute('name') ||
          clientLn.closest('IED') === root
      );

  return Array.from(root.getElementsByTagName('ClientLN')).filter(isPublic);
}

export function getSourceReferences(root: Document | Element): Element[] {
  if (root instanceof Element && root.tagName === 'IED')
    return Array.from(root.ownerDocument.getElementsByTagName('ExtRef'))
      .filter(isPublic)
      .filter(
        extRef =>
          extRef.getAttribute('iedName') === root.getAttribute('name') ||
          (extRef.closest('IED') === root && extRef.getAttribute('iedName'))
      );

  return Array.from(root.getElementsByTagName('ExtRef'))
    .filter(isPublic)
    .filter(element => element.getAttribute('iedName'));
}

export function communicationMappingWizard(
  element: XMLDocument | Element
): Wizard {
  const ownerDocument =
    element instanceof XMLDocument ? element : element.ownerDocument;

  const connections = new Map<string, Element[]>();
  const sourceRefs = getSourceReferences(element);
  const sinkRefs = getSinkReferences(element);

  sinkRefs.forEach(element => {
    const controlBlock = element.parentElement!.parentElement!;
    const iedName = element.getAttribute('iedName');
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
  });

  return [
    {
      title: get('commmap.title'),
      content: [
        html`<filtered-list
          >${Array.from(connections.keys()).map(key => {
            const elements = connections.get(key)!;
            const [cbId, cbTag, sinkIED] = key.split(' | ');
            const cbElement = find(ownerDocument, cbTag, cbId);
            const [_, sourceIED, controlBlock] = cbId.match(/^(.+)>>(.*)$/)!;

            return html`<mwc-list-item
              twoline
              graphic="icon"
              hasMeta
              @click="${(evt: SingleSelectedEvent) => {
                evt.target!.dispatchEvent(
                  newWizardEvent(
                    cbTag === 'ReportControl'
                      ? selectClientLNsWizard(elements, element)
                      : selectExtRefsWizard(elements, cbElement, element)
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
