import { html, render, TemplateResult } from 'lit-html';
import { get, translate } from 'lit-translate';

import {
  Wizard,
  WizardAction,
  WizardInput,
  CloseableElement,
  EditorAction,
} from '../../foundation.js';

import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-textfield';
import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { MultiSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { TextField } from '@material/mwc-textfield';
import { selectors, substationChild } from './foundation.js';

interface ldValue {
  iedName: string;
  ldInst: string;
}

interface lnValue extends ldValue {
  prefix: string | null;
  lnClass: string;
  inst: string | null;
}

function valueToSelector(value: lnValue): string {
  if ((value.prefix === null || value.prefix === '') && value.inst)
    return `LNode[iedName="${value.iedName}"][ldInst="${value.ldInst}"]:not([prefix])[lnClass="${value.lnClass}"][lnInst="${value.inst}"], 
            LNode[iedName="${value.iedName}"][ldInst="${value.ldInst}"][prefix=""][lnClass="${value.lnClass}"][lnInst="${value.inst}"]`;
  else if ((value.inst === null || value.inst === '') && value.prefix)
    return `LNode[iedName="${value.iedName}"][ldInst="${value.ldInst}"][prefix="${value.prefix}"][lnClass="${value.lnClass}"]:not([lnInst]), 
            LNode[iedName="${value.iedName}"][ldInst="${value.ldInst}"][prefix="${value.prefix}"][lnClass="${value.lnClass}"][lnInst=""]`;
  else if (
    (value.prefix === null || value.prefix === '') &&
    (value.inst === null || value.inst === '')
  )
    return `LNode[iedName="${value.iedName}"][ldInst="${value.ldInst}"]:not([prefix])[lnClass="${value.lnClass}"]:not([lnInst]), 
            LNode[iedName="${value.iedName}"][ldInst="${value.ldInst}"][prefix=""][lnClass="${value.lnClass}"]:not([lnInst]),
            LNode[iedName="${value.iedName}"][ldInst="${value.ldInst}"]:not([prefix])[lnClass="${value.lnClass}"][lnInst=""], 
            LNode[iedName="${value.iedName}"][ldInst="${value.ldInst}"][prefix=""][lnClass="${value.lnClass}"][lnInst=""]`;

  return `LNode[iedName="${value.iedName}"][ldInst="${value.ldInst}"][prefix="${value.prefix}"][lnClass="${value.lnClass}"][lnInst="${value.inst}"]`;
}

export function hasLNode(parent: Element, value: lnValue): boolean {
  return (
    parent.querySelector(
      `${selectors[<substationChild>parent.tagName]} > ${valueToSelector(
        value
      )}"]`
    ) !== null
  );
}

export function existLNode(parent: Element, value: lnValue): boolean {
  const doc = parent.ownerDocument;
  return doc.querySelector(valueToSelector(value)) !== null;
}

function getConnectedEquipment(element: Element, value: lnValue): string {
  const doc = element.ownerDocument;
  const lNode = doc.querySelector(valueToSelector(value));

  let path = 'Connected to: ';
  let nextParent: Element | null | undefined = lNode?.parentElement;
  while (nextParent?.getAttribute('name')) {
    path = path + ' ' + nextParent.getAttribute('name');
    nextParent = nextParent.parentElement;
  }
  return path;
}

function createAction(parent: Element, value: lnValue): EditorAction {
  return {
    new: {
      parent,
      element: new DOMParser().parseFromString(
        `<LNode iedName="${value.iedName}" ldInst="${value.ldInst}" ${
          value.prefix ? `prefix="${value.prefix}"` : ''
        } lnClass="${value.lnClass}" lnInst="${value.inst}"></LNode>`,
        'application/xml'
      ).documentElement,
      reference: null,
    },
  };
}

function deleteAction(parent: Element, value: lnValue): EditorAction {
  const element = parent.querySelector(
    `${selectors[<substationChild>parent.tagName]} > ${valueToSelector(value)}`
  )!;
  return {
    old: {
      parent: parent,
      element: element,
      reference: element.nextElementSibling ?? null,
    },
  };
}

export function lNodeActions(parent: Element): WizardAction {
  return (inputs: WizardInput[], wizard: CloseableElement): EditorAction[] => {
    const newLNodes = (<List>wizard.shadowRoot!.querySelector('#lnList')).items
      .filter(item => item.selected)
      .map(item => item.value);
    const oldLNodes = Array.from(
      parent.querySelectorAll(
        `${selectors[<substationChild>parent.tagName]} > LNode`
      )
    )
      .map(node => {
        return {
          iedName: node.getAttribute('iedName') ?? '',
          ldInst: node.getAttribute('ldInst') ?? '',
          prefix: node.getAttribute('prefix') ?? '',
          lnClass: node.getAttribute('lnClass') ?? '',
          inst: node.getAttribute('lnInst') ?? '',
          /* ORDER IS IMPORTANT HERE, since we stringify to compare! */
        };
      })
      .map(value => JSON.stringify(value));

    const deleteActions = oldLNodes
      .filter(node => !newLNodes.includes(node))
      .map(node => deleteAction(parent, JSON.parse(node)));
    const createActions = newLNodes
      .filter(node => !oldLNodes.includes(node))
      .map(node => createAction(parent, JSON.parse(node)));

    wizard.close();
    return deleteActions.concat(createActions);
  };
}

function onIEDSelect(evt: MultiSelectedEvent, element: Element): void {
  const doc = element.ownerDocument;
  const ldList =
    (<Element>(
      evt.target
    )).parentElement?.parentElement?.nextElementSibling?.querySelector(
      '#ldList'
    ) ?? null;

  if (ldList === null) return;

  const itemGroups = (<ListItemBase[]>(<List>evt.target).selected)
    .map(item => doc.querySelector(`:root > IED[name="${item.value}"]`)!)
    .map(ied => {
      const values = Array.from(
        ied.querySelectorAll(':root > IED > AccessPoint > Server > LDevice')
      ).map(lDevice => {
        return {
          iedName: ied.getAttribute('name'),
          ldInst: lDevice.getAttribute('inst') ?? '',
          /* ORDER IS IMPORTANT HERE, since we stringify to compare! */
        };
      });
      const deviceItems = values.map(
        value =>
          html`<mwc-check-list-item
            value="${JSON.stringify(value)}"
            twoline
            ?selected="${element.querySelector(
              `${selectors[<substationChild>element.tagName]} > LNode[ldInst="${
                value.ldInst
              }"]`
            )}"
            ><span>${value.ldInst}</span
            ><span slot="secondary">${value.iedName}</span></mwc-check-list-item
          >`
      );
      return html`${deviceItems}
        <li divider role="separator"></li>`;
    });

  render(html`${itemGroups}`, ldList);
}

function onLdSelect(evt: MultiSelectedEvent, element: Element): void {
  const doc = element.ownerDocument;
  const lnList =
    (<Element>(
      evt.target
    )).parentElement?.parentElement?.nextElementSibling?.querySelector(
      '#lnList'
    ) ?? null;
  if (lnList === null) return;

  const itemGroups = (<ListItemBase[]>(<List>evt.target).selected)
    .map((item): ldValue => JSON.parse(item.value))
    .map(ldValue => {
      const values = Array.from(
        doc.querySelectorAll(
          `:root > IED[name="${ldValue.iedName}"] > AccessPoint > Server > LDevice[inst="${ldValue.ldInst}"] > LN
          ,:root > IED[name="${ldValue.iedName}"] > AccessPoint > Server > LDevice[inst="${ldValue.ldInst}"] > LN0`
        )
      ).map(ln => {
        return {
          ...ldValue,
          prefix: ln.getAttribute('prefix') ?? '',
          lnClass: ln.getAttribute('lnClass') ?? '',
          inst: ln.getAttribute('inst') ?? '',
          /* ORDER IS IMPORTANT HERE, since we stringify to compare! */
        };
      });
      const nodeItems = values.map(value => {
        return html`<mwc-check-list-item
          ?selected=${hasLNode(element, value)}
          ?disabled=${!hasLNode(element, value) && existLNode(element, value)}
          value="${JSON.stringify(value)}"
          twoline
          ><span
            >${value.prefix}${value.lnClass}${value.inst}
            ${!hasLNode(element, value) && existLNode(element, value)
              ? ' (' + getConnectedEquipment(element, value) + ') '
              : ''}</span
          ><span slot="secondary"
            >${value.iedName} | ${value.ldInst}}</span
          ></mwc-check-list-item
        >`;
      });
      return html`${nodeItems}
        <li divider role="separator"></li>`;
    });

  render(html`${itemGroups}`, lnList);
}

function onFilter(evt: InputEvent, selector: string): void {
  (<List>(
    (<TextField>evt.target).parentElement?.querySelector(selector)
  )).items.forEach(item => {
    item.value
      .toUpperCase()
      .includes((<TextField>evt.target).value.toUpperCase())
      ? item.removeAttribute('style')
      : item.setAttribute('style', 'display:none;');
  });
}

function renderIEDPage(element: Element): TemplateResult {
  const doc = element.ownerDocument;
  return html`<mwc-textfield
      label="${translate('filter')}"
      iconTrailing="search"
      @input="${(evt: InputEvent) => onFilter(evt, '#iedList')}"
    ></mwc-textfield>
    <mwc-list
      multi
      id="iedList"
      @selected="${(evt: MultiSelectedEvent) => onIEDSelect(evt, element)}"
      >${Array.from(doc.querySelectorAll(':root > IED'))
        .map(ied => ied.getAttribute('name'))
        .map(
          iedName =>
            html`<mwc-check-list-item
              .value=${iedName ?? ''}
              ?selected="${element.querySelector(
                `${
                  selectors[<substationChild>element.tagName]
                } > LNode[iedName="${iedName}"]`
              )}"
              >${iedName}</mwc-check-list-item
            >`
        )}</mwc-list
    >`;
}

function renderLdPage(element: Element): TemplateResult {
  return html`<mwc-textfield
      label="${translate('filter')}"
      iconTrailing="search"
      @input="${(evt: InputEvent) => onFilter(evt, '#ldList')}"
    ></mwc-textfield>
    <mwc-list
      multi
      id="ldList"
      @selected="${(evt: MultiSelectedEvent) => onLdSelect(evt, element)}"
    ></mwc-list>`;
}

function renderLnPage(): TemplateResult {
  return html`<mwc-textfield
      label="${translate('filter')}"
      iconTrailing="search"
      @input="${(evt: InputEvent) => onFilter(evt, '#lnList')}"
    ></mwc-textfield>
    <mwc-list multi id="lnList"></mwc-list>`;
}

export function editlNode(element: Element): Wizard {
  return [
    {
      title: get('lnode.wizard.title.selectIEDs'),
      content: [renderIEDPage(element)],
    },
    {
      title: get('lnode.wizard.title.selectLDs'),
      content: [renderLdPage(element)],
    },
    {
      title: get('lnode.wizard.title.selectLNs'),
      primary: {
        icon: 'save',
        label: get('save'),
        action: lNodeActions(element),
      },
      content: [renderLnPage()],
    },
  ];
}
