import { html } from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-icon';
import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import '@openscd/open-scd/src/filtered-list.js';
import {
  find,
  identity,
  pathParts,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInputElement,
} from '@openscd/open-scd/src/foundation.js';

import {
  createElement,
} from '@openscd/xml';

import { clientIcon } from '@openscd/open-scd/src/icons/icons.js';
import { openCommunicationMappingWizard } from './commmap-wizards.js';

function getPath(identity: string | number): string {
  if (typeof identity !== 'string') return '';

  return pathParts(identity)[0] ?? '';
}

function getElement(identity: string | number): string {
  if (typeof identity !== 'string') return '';

  return pathParts(identity)[1] ?? '';
}

function getLogicalNode(doc: XMLDocument, identity: string): Element | null {
  if (identity.split('>').length === 4) {
    return find(doc, 'LN', identity);
  }

  if (identity.split('>').length === 3) {
    if (getElement(identity).split(' ').length > 1) {
      return find(doc, 'LN', identity);
    }

    if (getElement(identity).split(' ').length === 1) {
      return find(doc, 'LN0', identity);
    }
  }

  return null;
}

function hasClientLN(cb: Element, identity: string): boolean {
  for (const clientLN of Array.from(cb.getElementsByTagName('ClientLN'))) {
    const [iedName, apRef, ldInst, prefix, lnClass, lnInst] = [
      'iedName',
      'apRef',
      'ldInst',
      'prefix',
      'lnClass',
      'lnInst',
    ].map(attribute => clientLN.getAttribute(attribute));

    const ln = getLogicalNode(cb.ownerDocument, identity);
    if (!ln) break;
    const ied = ln.closest('IED');
    const ap = ln.closest('AccessPoint');
    const ld = ln.closest('LDevice');

    if (identity.split('>').length === 4) {
      if (
        iedName === ied?.getAttribute('name') &&
        apRef === ap?.getAttribute('name') &&
        ldInst === ld?.getAttribute('inst') &&
        (prefix ?? '') === (ln.getAttribute('prefix') ?? '') &&
        lnClass === ln.getAttribute('lnClass') &&
        (lnInst ?? '') === (ln.getAttribute('inst') ?? '')
      )
        return true;
    }

    if (identity.split('>').length === 3) {
      if (getElement(identity).split(' ').length > 1) {
        // ClientLNs for LNs inside an AccessPoint have these requirements:
        // apRef: AccessPoint name (optional if IED has only one AccessPoint)
        // ldInst: can be arbitrary
        const apCount = ied?.querySelectorAll('AccessPoint').length;
        if (
          iedName === ied?.getAttribute('name') &&
          apCount &&
          (apCount <= 1 || apRef === ap?.getAttribute('name')) &&
          (prefix ?? '') === (ln.getAttribute('prefix') ?? '') &&
          lnClass === ln.getAttribute('lnClass') &&
          (lnInst ?? '') === (ln.getAttribute('inst') ?? '')
        )
          return true;
      }

      if (getElement(identity).split(' ').length === 1) {
        if (
          iedName === ied?.getAttribute('name') &&
          apRef === ap?.getAttribute('name') &&
          ldInst === ld?.getAttribute('inst') &&
          lnClass === ln.getAttribute('lnClass')
        )
          return true;
      }
    }
  }

  return false;
}

function addClientLnAction(doc: XMLDocument): WizardActor {
  return (inputs: WizardInputElement[], wizard: Element): WizardAction[] => {
    const cbSelected = <ListItemBase[]>(
      (<List>wizard.shadowRoot!.querySelector('#sourcelist')).selected
    );

    const selectedLNs = <ListItemBase[]>(
      (<List>wizard.shadowRoot!.querySelector('#sinklist')).selected
    );

    const actions: WizardAction[] = [];

    selectedLNs.forEach(selectedLN => {
      const lnIdentity = selectedLN.value;

      const reportCbs = <Element[]>cbSelected
        .map(cb => cb.value)
        .map(cbValue => find(doc, 'ReportControl', cbValue))
        .filter(cb => cb !== null);

      reportCbs.forEach(cb => {
        //RptEnabled is the parent for ClientLN and might be missing
        if (cb.querySelector('RptEnabled') === null) {
          const rptEnabled: Element = createElement(doc, 'RptEnabled', {
            max: '1',
          });
          cb.appendChild(rptEnabled);
        }

        const ln = getLogicalNode(doc, lnIdentity);
        if (
          cb.querySelector('RptEnabled') !== null &&
          !hasClientLN(cb, lnIdentity) &&
          ln
        ) {
          const element: Element = createElement(doc, 'ClientLN', {
            iedName: ln?.closest('IED')?.getAttribute('name') ?? null,
            apRef: ln?.closest('AccessPoint')?.getAttribute('name') ?? null,
            ldInst: ln?.closest('LDevice')?.getAttribute('inst') ?? 'LD0', //ldInst is required and with Ed2 'LD0' for client ln's
            prefix: ln?.getAttribute('prefix') ?? '', //OpenSCD empty string over null
            lnClass: ln?.getAttribute('lnClass') ?? '',
            lnInst: ln?.getAttribute('inst') ?? '', //OpenSCD empty string over null
          });
          actions.push({
            new: {
              parent: cb.querySelector('RptEnabled')!,
              element,
            },
          });
        }
      });
    });

    return actions;
  };
}

export function createClientLnWizard(
  sourceIEDs: Element[],
  sinkIED: Element
): Wizard {
  const reportItems = sourceIEDs.flatMap(sourceIED => {
    return Array.from(sourceIED.getElementsByTagName('ReportControl')).map(
      cb => {
        return {
          identity: identity(cb),
          numberClientLNs: Array.from(cb.getElementsByTagName('ClientLN'))
            .length,
          max: Number(cb.querySelector('RptEnabled')?.getAttribute('max')),
        };
      }
    );
  });
  const clientLns = Array.from(
    sinkIED.querySelectorAll(':root > IED > AccessPoint > LN')
  );
  const serverLns = Array.from(
    sinkIED.querySelectorAll(
      ':root > IED > AccessPoint > Server > LDevice > LN'
    )
  );
  const serverLn0s = Array.from(
    sinkIED.querySelectorAll(
      ':root > IED > AccessPoint > Server > LDevice > LN0'
    )
  );

  return [
    {
      title: get('commmap.connectToIED', {
        iedName: sinkIED.getAttribute('name') ?? '',
      }),
      primary: {
        label: get('connect'),
        icon: '',
        action: addClientLnAction(sinkIED.ownerDocument),
      },
      content: [
        html`<div
          class="wrapper"
          style="display: grid; grid-template-columns: 1fr 1fr;"
        >
          <filtered-list
            id="sourcelist"
            multi
            searchFieldLabel="${get('scl.Report')}"
            >${reportItems
              .sort((a, b) => b.numberClientLNs - a.numberClientLNs)
              .map(
                item =>
                  html`<mwc-check-list-item
                    left
                    hasMeta
                    twoline
                    value="${item.identity}"
                    ?disabled=${item.numberClientLNs >= item.max}
                    ><span>${getElement(item.identity)}</span
                    ><span slot="secondary">${getPath(item.identity)}</span
                    ><span slot="meta"
                      >${item.max
                        ? item.numberClientLNs + `/` + item.max
                        : item.numberClientLNs}</span
                    ></mwc-check-list-item
                  >`
              )}</filtered-list
          ><filtered-list
            multi
            id="sinklist"
            activatable
            searchFieldLabel="${get('scl.LN')}"
            >${clientLns.map(
              ln =>
                html`<mwc-check-list-item twoline value="${identity(ln)}">
                  <span>${getElement(identity(ln))}</span>
                  <span slot="secondary">${getPath(identity(ln))}</span>
                </mwc-check-list-item>`
            )}
            <li divider role="separator"></li>
            ${serverLns.map(
              ln =>
                html`<mwc-check-list-item twoline value="${identity(ln)}">
                  <span>${getElement(identity(ln))}</span>
                  <span slot="secondary">${getPath(identity(ln))}</span>
                </mwc-check-list-item>`
            )}
            ${serverLn0s.map(
              ln0 =>
                html`<mwc-check-list-item twoline value="${identity(ln0)}">
                  <span>LLN0</span>
                  <span slot="secondary">${identity(ln0)}</span>
                </mwc-check-list-item>`
            )}</filtered-list
          >
        </div>`,
      ],
    },
  ];
}

function disconnectClientLnAction(elements: Element[]): WizardActor {
  return (
    inputs: WizardInputElement[],
    wizard: Element,
    list?: List | null
  ): WizardAction[] => {
    const items = <Set<number>>list!.index;
    const selectedClientLNs = Array.from(items).map(index => elements[index]);

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

export function selectClientLNsWizard(
  clientLns: Element[],
  root: XMLDocument | Element
): Wizard {
  const controlBlock = clientLns[0].closest('ReportControl');
  const cbId = identity(controlBlock);
  const sinkIedName = clientLns[0].getAttribute('iedName');

  return [
    {
      title: cbId + ' - ' + sinkIedName,
      primary: {
        icon: 'delete',
        label: get('disconnect'),
        action: disconnectClientLnAction(clientLns),
      },
      secondary: {
        icon: '',
        label: get('back'),
        action: openCommunicationMappingWizard(root),
      },
      content: [
        html`<filtered-list multi
          >${clientLns.map(clientLN => {
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
