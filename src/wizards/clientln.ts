import { html } from 'lit-element';
import { get } from 'lit-translate';

import {
  createElement,
  getReference,
  identity,
  newWizardEvent,
  pathParts,
  selector,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInput,
} from '../foundation.js';

import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';

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
    return doc.querySelector(selector('LN', identity));
  }

  if (identity.split('>').length === 3) {
    if (getElement(identity).split(' ').length > 1) {
      return doc.querySelector(selector('LN', identity));
    }

    if (getElement(identity).split(' ').length === 1) {
      return doc.querySelector(selector('LN0', identity));
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
  return (inputs: WizardInput[], wizard: Element): WizardAction[] => {
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
        .map(cbValue => doc.querySelector(selector('ReportControl', cbValue)))
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
              reference: getReference(
                cb.querySelector('RptEnabled')!,
                'ClientLN'
              ),
            },
          });
        }
      });
    });

    return actions;
  };
}

export function clientlnwizard(
  sourceIEDs: Element[],
  sinkIED: Element
): Wizard {
  return [
    {
      title: get('commMap.connectToIED', {
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
            >${sourceIEDs
              .filter(
                sourceIED =>
                  sourceIED.getAttribute('name') !==
                  sinkIED.getAttribute('name')
              )
              .flatMap(sourceIED => {
                return Array.from(
                  sourceIED.getElementsByTagName('ReportControl')
                ).map(cb => {
                  return {
                    identity: identity(cb),
                    numberClientLNs: Array.from(
                      cb.getElementsByTagName('ClientLN')
                    ).filter(
                      clientLN =>
                        clientLN.getAttribute('iedName') ===
                        sinkIED.getAttribute('name')
                    ).length,
                  };
                });
              })
              .sort((a, b) => b.numberClientLNs - a.numberClientLNs)
              .map(
                item =>
                  html`<mwc-check-list-item
                    left
                    hasMeta
                    twoline
                    value="${item.identity}"
                    ><span>${getElement(item.identity)}</span
                    ><span slot="secondary">${getPath(item.identity)}</span
                    ><span slot="meta"
                      >${item.numberClientLNs}</span
                    ></mwc-check-list-item
                  >`
              )}</filtered-list
          ><filtered-list
            multi
            id="sinklist"
            activatable
            searchFieldLabel="${get('scl.LN')}"
            >${Array.from(
              sinkIED.querySelectorAll(':root > IED > AccessPoint > LN')
            ).map(
              ln =>
                html`<mwc-check-list-item twoline value="${identity(ln)}">
                  <span>${getElement(identity(ln))}</span>
                  <span slot="secondary">${getPath(identity(ln))}</span>
                </mwc-check-list-item>`
            )}
            <li divider role="separator"></li>
            ${Array.from(
              sinkIED.querySelectorAll(
                ':root > IED > AccessPoint > Server > LDevice > LN'
              )
            ).map(
              ln =>
                html`<mwc-check-list-item twoline value="${identity(ln)}">
                  <span>${getElement(identity(ln))}</span>
                  <span slot="secondary">${getPath(identity(ln))}</span>
                </mwc-check-list-item>`
            )}
            ${Array.from(
              sinkIED.querySelectorAll(
                ':root > IED > AccessPoint > Server > LDevice > LN0'
              )
            ).map(
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

function getSinkIedElement(evt: SingleSelectedEvent, doc: Document): Element {
  const selectedItem = <ListItemBase>(<List>evt.target)?.selected ?? [];

  return <Element>doc.querySelector(selector('IED', selectedItem.value));
}

function getSelectedSourceIedElements(
  evt: SingleSelectedEvent,
  doc: Document
): Element[] {
  const selectedItems =
    <ListItemBase[]>(
      (
        <List>(<List>evt.target).parentElement?.querySelector('#sourcelist') ??
        []
      ).selected
    ) ?? [];

  return <Element[]>(
    selectedItems
      .map(item => doc.querySelector(selector('IED', item.value)))
      .filter(item => item !== null)
  );
}

export function createClientLnWizard(doc: Document): Wizard {
  return [
    {
      title: get('commMap.connectCB', { CbType: get('Report') }),
      content:
        doc.querySelectorAll(':root > IED').length > 1
          ? [
              html` <div
                class="wrapper"
                style="display: grid; grid-template-columns: 1fr 1fr;"
              >
                <filtered-list
                  id="sourcelist"
                  multi
                  searchFieldLabel="${get('commMap.sourceIED')}"
                >
                  ${Array.from(doc.querySelectorAll(':root > IED') ?? []).map(
                    ied =>
                      html`<mwc-check-list-item left value="${identity(ied)}"
                        >${ied.getAttribute('name')}</mwc-check-list-item
                      >`
                  )}
                </filtered-list>
                <filtered-list
                  id="sinklist"
                  searchFieldLabel="${get('commMap.sinkIED')}"
                  @selected="${(evt: SingleSelectedEvent) => {
                    evt.target!.dispatchEvent(
                      newWizardEvent(
                        clientlnwizard(
                          getSelectedSourceIedElements(evt, doc),
                          getSinkIedElement(evt, doc)
                        )
                      )
                    );
                    evt.target!.dispatchEvent(newWizardEvent());
                  }}"
                >
                  ${Array.from(doc.querySelectorAll(':root > IED') ?? []).map(
                    ied =>
                      html`<mwc-list-item
                        style="height:56px"
                        value="${identity(ied)}"
                        >${ied.getAttribute('name')}</mwc-list-item
                      >`
                  )}
                </filtered-list>
              </div>`,
            ]
          : [
              html`
                <div style="display:flex">
                  <mwc-icon slot="graphic">info</mwc-icon
                  ><span style="margin-left:20px">No IEDs in the project</span>
                </div>
              `,
            ],
    },
  ];
}
