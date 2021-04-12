import { List } from '@material/mwc-list';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { html } from 'lit-html';
import { get } from 'lit-translate';
import {
  createElement,
  crossProduct,
  EditorAction,
  identity,
  newWizardEvent,
  pathParts,
  selector,
  Wizard,
  WizardAction,
  WizardActor,
  WizardInput,
} from '../../foundation';
import {
  openCommunicationMappingWizard,
  communicationMappingWizard,
  openCreateConnection,
} from '../CommunicationMapping';

interface CBValue {
  iedName: string;
  apRef: string;
  ldInst: string;
  prefix: string | null;
  lnClass: string;
  lnInst: string | null;
  cbName: string;
}

interface LNValue {
  iedName: string;
  apRef: string;
  ldInst: string | null;
  prefix: string;
  lnClass: string;
  lnInst: string;
}

interface ItemDescription {
  value: string | number;
  numberClientLNs: number;
}

/** Sorts connected `ListItem`s to the top*/
function compareConnected(a: ItemDescription, b: ItemDescription): number {
  return b.numberClientLNs - a.numberClientLNs;
}

function getClientLN(cb: Element, ln: LNValue): Element | null {
  const base = `RptEnabled > ClientLN[iedName="${ln.iedName}"][lnClass="${ln.lnClass}"]`;
  const prefix = ln.prefix
    ? [`[prefix="${ln.prefix}"]`]
    : [':not([prefix])', '[prefix=""]'];
  const lnInst = ln.lnInst
    ? [`[lnInst="${ln.lnInst}"]`]
    : [':not([lnInst])', '[lnInst=""]'];
  const ldInst = ln.ldInst
    ? [`[ldInst="${ln.ldInst}"]`]
    : ['[ldInst="LD0"]', '[ldInst=""]'];

  const selector = crossProduct([base], ldInst, prefix, lnInst)
    .map(a => a.join(''))
    .join(',');

  return cb.querySelector(selector);
}

function addClientLNAction(doc: XMLDocument): WizardActor {
  return (inputs: WizardInput[], wizard: Element): WizardAction[] => {
    const cbSelected = <ListItemBase[]>(
      (<List>wizard.shadowRoot!.querySelector('#sourcelist')).selected
    );

    const selectedLNs = <ListItemBase[]>(
      (<List>wizard.shadowRoot!.querySelector('#sinklist')).selected
    );

    const actions: WizardAction[] = [];

    selectedLNs.forEach(selectedLN => {
      const lnValue: LNValue = JSON.parse(selectedLN.value);

      const cbList: Element[] = <Element[]>cbSelected
        .map(cb => JSON.parse(cb.value))
        .map(cbValue => getReportCb(doc, cbValue))
        .filter(cb => cb !== null);

      cbList.forEach(cb => {
        //RptEnabled is the parent for ClientLN and might be missing
        if (cb.querySelector('RptEnabled') === null) {
          const element: Element = createElement(doc, 'RptEnabled', {
            max: '1',
          });
          cb.appendChild(element);
        }

        if (
          cb.querySelector('RptEnabled') !== null &&
          getClientLN(cb, lnValue) === null
        ) {
          const element: Element = createElement(doc, 'ClientLN', {
            iedName: lnValue.iedName,
            apRef: lnValue.apRef,
            ldInst: lnValue.ldInst ?? 'LD0', //ldInst is required and with Ed2 'LD0' for client ln's
            prefix: lnValue.prefix ?? '', //OpenSCD empty string over null
            lnClass: lnValue.lnClass,
            lnInst: lnValue.lnInst ?? '', //OpenSCD empty string over null
          });
          actions.push({
            new: {
              parent: cb.querySelector('RptEnabled')!,
              element,
              reference: null,
            },
          });
        }
      });
    });

    actions.push(() => communicationMappingWizard(doc));

    return actions;
  };
}

function getReportCb(
  source: Element | Document,
  cbValue: CBValue
): Element | null {
  const base =
    source instanceof Document
      ? `IED[name="${cbValue.iedName}"]  LDevice[inst="${cbValue.ldInst}"]`
      : `LDevice[inst="${cbValue.ldInst}"]`;
  const cb = `ReportControl[name="${cbValue.cbName}"]`;

  const lnBase = [];
  if (cbValue.lnClass === 'LLN0') lnBase.push('LN0[lnClass="LLN0"]');
  else lnBase.push(`LN[lnClass="${cbValue.lnClass}"]`);
  const prefix = cbValue.prefix
    ? [`[prefix="${cbValue.prefix}"]`]
    : [':not([prefix])', '[prefix=""]'];
  const lnInst = cbValue.lnInst
    ? [`[inst="${cbValue.lnInst}"]`]
    : [':not([inst])', '[inst=""]'];
  const ln = crossProduct(lnBase, prefix, lnInst).map(a => a.join(''));

  const selector = crossProduct([base], ln, [cb])
    .map(a => a.join(' > '))
    .join(',');

  return source.querySelector(selector);
}

export function clientlnwizard(
  sourceIEDs: Element[],
  sinkIED: Element
): Wizard {
  return [
    {
      title: get('transform.comm-map.connectToIED', {
        iedName: sinkIED.getAttribute('name') ?? '',
      }),
      primary: {
        label: get('connect'),
        icon: '',
        action: addClientLNAction(sinkIED.ownerDocument),
      },
      secondary: {
        label: get('cancel'),
        icon: '',
        action: openCreateConnection(sinkIED.ownerDocument),
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
              //.sort(compareConnected)
              .map(
                item =>
                  html`<mwc-check-list-item
                    left
                    hasMeta
                    twoline
                    value="${pathParts(item.identity as string)[1] ?? ''}"
                    ><span>${pathParts(item.identity as string)[0] ?? ''}</span
                    ><span slot="secondary">${item.identity}</span
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
            >${Array.from(sinkIED.getElementsByTagName('LN'))
              .concat(Array.from(sinkIED.getElementsByTagName('LN0')))
              .map(
                ln =>
                  html`<mwc-check-list-item twoline value="${identity(ln)}">
                    <span
                      >${(ln.getAttribute('prefix') ?? '') +
                      (ln.getAttribute('lnClass') ?? '') +
                      (ln.getAttribute('lnInst') ?? '')}</span
                    >
                    <span slot="secondary">${identity(ln)}</span>
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

export function createConnectionWizard(doc: Document): Wizard {
  return [
    {
      title: get('transform.comm-map.connectCB', { CbType: get('Report') }),
      secondary: {
        icon: '',
        label: get('cancel'),
        action: openCommunicationMappingWizard(doc),
      },
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
                  searchFieldLabel="${get('transform.comm-map.sourceIED')}"
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
                  searchFieldLabel="${get('transform.comm-map.sinkIED')}"
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
