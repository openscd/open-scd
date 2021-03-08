import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { html } from 'lit-html';

import {
  createElement,
  crossProduct,
  EditorAction,
  Wizard,
  WizardAction,
  WizardInput,
} from '../../foundation.js';

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
  value: CBValue;
  connected: boolean;
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

function removeClientLNAction(doc: Document): WizardAction {
  return (inputs: WizardInput[], wizard: Element): EditorAction[] => {
    const cbSelected = <ListItemBase[]>(
      (<List>wizard.shadowRoot!.querySelector('#sourceList')).selected
    );

    const lnSelected: string = (<ListItemBase>(
      (<List>wizard.shadowRoot!.querySelector('#sinkList')).selected
    )).value;

    const lnValue: LNValue = JSON.parse(lnSelected);

    const cbList: Element[] = <Element[]>cbSelected
      .map(cb => JSON.parse(cb.value))
      .map(cbValue => getReportCb(doc, cbValue))
      .filter(cb => cb !== null);

    const actions: EditorAction[] = [];

    cbList.forEach(cb => {
      if (
        cb.querySelector('RptEnabled') !== null &&
        getClientLN(cb, lnValue) !== null
      ) {
        actions.push({
          old: {
            parent: cb.querySelector('RptEnabled')!,
            element: getClientLN(cb, lnValue)!,
            reference: null,
          },
        });
      }
    });

    return actions;
  };
}

function addClientLNAction(doc: Document): WizardAction {
  return (inputs: WizardInput[], wizard: Element): EditorAction[] => {
    const cbSelected = <ListItemBase[]>(
      (<List>wizard.shadowRoot!.querySelector('#sourceList')).selected
    );

    const lnSelected: string = (<ListItemBase>(
      (<List>wizard.shadowRoot!.querySelector('#sinkList')).selected
    )).value;

    const lnValue: LNValue = JSON.parse(lnSelected);

    const cbList: Element[] = <Element[]>cbSelected
      .map(cb => JSON.parse(cb.value))
      .map(cbValue => getReportCb(doc, cbValue))
      .filter(cb => cb !== null);

    const actions: EditorAction[] = [];
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

    return actions;
  };
}

/** Sorts connected `ListItem`s to the top*/
function compareConnected(a: ItemDescription, b: ItemDescription): number {
  if (a.connected !== b.connected) return a.connected ? -1 : 1;
  return 0;
}

/** Retruns all logical nodes from an IED as LNValues*/
function getLogicalNodeValue(ied: Element): LNValue[] {
  const value: LNValue[] = [];

  ied.querySelectorAll('AccessPoint > LN').forEach(ln => {
    value.push({
      iedName: ied.getAttribute('name')!,
      apRef: ln.parentElement!.getAttribute('name')!,
      ldInst: null,
      prefix: ln.getAttribute('prefix') ?? '',
      lnClass: ln.getAttribute('lnClass')!,
      lnInst: ln.getAttribute('inst') ?? '',
    });
  });

  ied.querySelectorAll('LDevice > LN,LDevice > LN0').forEach(ln => {
    value.push({
      iedName: ied.getAttribute('name')!,
      apRef: ln.parentElement!.parentElement!.parentElement!.getAttribute(
        'name'
      )!,
      ldInst: ln.parentElement!.getAttribute('inst'),
      prefix: ln.getAttribute('prefix') ?? '',
      lnClass: ln.getAttribute('lnClass')!,
      lnInst: ln.getAttribute('inst') ?? '',
    });
  });

  return value;
}

/** Returns control block element based on control block value*/
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

function getCbValues(
  ied: Element,
  cbType: 'Report' | 'GOOSE' | 'SMV'
): CBValue[] {
  const value: CBValue[] = [];

  let selector = '';
  if (cbType === 'Report')
    selector += `LDevice > LN0 > ReportControl, LDevice > LN > ReportControl`;

  if (cbType === 'GOOSE') selector += `LDevice > LN0 > GSEControl`;

  if (cbType === 'SMV') selector += `LDevice > LN0 > SampledValueControl`;

  ied.querySelectorAll(selector).forEach(cb => {
    value.push({
      iedName: ied.getAttribute('name')!,
      apRef: cb.parentElement!.parentElement!.parentElement!.parentElement!.getAttribute(
        'name'
      )!,
      ldInst: cb.parentElement!.parentElement!.getAttribute('inst')!,
      prefix: cb.parentElement!.getAttribute('prefix'),
      lnClass: cb.parentElement!.getAttribute('lnClass')!,
      lnInst: cb.parentElement!.getAttribute('inst'),
      cbName: cb.getAttribute('name')!,
    });
  });

  return value;
}

/** @returns a `Wizard` for editing `input`'s `ClientLN`'s. */
export function clientlnwizard(inputs: Element[], output: Element): Wizard {
  return [
    {
      title: `Report to client ${output.getAttribute('name')}`,
      primary: {
        icon: 'add',
        label: 'Add',
        action: addClientLNAction(output.ownerDocument!),
      },
      secondary: {
        icon: 'remove',
        label: 'Remove',
        action: removeClientLNAction(output.ownerDocument!),
      },
      content: [
        html`<div
          class="wrapper"
          style="display: grid; grid-template-columns: 1fr 1fr;"
        >
          <filtered-list
            id="sourceList"
            activatable
            multi
            searchFieldLabel="Source"
            >${inputs
              .filter(
                input =>
                  input.getAttribute('name') !== output.getAttribute('name')
              )
              .flatMap(ied => {
                return getCbValues(ied, 'Report').map(cbValue => {
                  return {
                    value: cbValue,
                    connected: getReportCb(ied, cbValue)?.querySelector(
                      `RptEnabled > ClientLN[iedName="${output.getAttribute(
                        'name'
                      )}"]`
                    )
                      ? true
                      : false,
                  };
                });
              })
              .sort(compareConnected)
              .map(
                item =>
                  html`<mwc-list-item
                    hasMeta
                    twoline
                    value="${JSON.stringify(item.value)}"
                    ><span>${item.value.cbName}</span
                    ><span slot="secondary">${item.value.iedName}</span
                    >${item.connected
                      ? html`<mwc-icon slot="meta">edit</mwc-icon>`
                      : ``}</mwc-list-item
                  >`
              )}</filtered-list
          ><filtered-list id="sinkList" activatable searchFieldLabel="Sink"
            >${getLogicalNodeValue(output).map(
              lnValue =>
                html`<mwc-list-item twoline value="${JSON.stringify(lnValue)}">
                  <span
                    >${(lnValue.prefix ?? '') +
                    (lnValue.lnClass ?? '') +
                    (lnValue.lnInst ?? '')}</span
                  >
                  <span slot="secondary">${lnValue.ldInst}</span>
                </mwc-list-item>`
            )}</filtered-list
          >
        </div>`,
      ],
    },
  ];
}
