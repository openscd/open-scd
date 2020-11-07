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

interface ldValue {
  iedName: string;
  ldInst: string;
}

interface lnValue extends ldValue {
  prefix: string | null;
  lnClass: string;
  inst: string;
}

export function hasLNode(parent: Element, value: lnValue): boolean {
  return (
    parent.querySelector(
      `${parent.tagName} > LNode[iedName="${value.iedName}"][ldInst="${
        value.ldInst
      }"]${value.prefix ? `[prefix="${value.prefix}"]` : ``}${
        value.inst ? `[lnInst="${value.inst}"]` : ''
      }[lnClass="${value.lnClass}"]`
    ) !== null
  );
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
    `${parent.tagName} > LNode[iedName="${value.iedName}"][ldInst="${
      value.ldInst
    }"]${value.prefix ? `[prefix="${value.prefix}"]` : ''}[lnClass="${
      value.lnClass
    }"]${value.inst ? `[lnInst="${value.inst}"]` : ''}`
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
      parent.querySelectorAll(`${parent.tagName} > LNode`)
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
    .map(item => doc.querySelector(`IED[name="${item.value}"]`)!)
    .map(ied => {
      const values = Array.from(ied.querySelectorAll('LDevice')).map(
        lDevice => {
          return {
            iedName: ied.getAttribute('name'),
            ldInst: lDevice.getAttribute('inst') ?? '',
            /* ORDER IS IMPORTANT HERE, since we stringify to compare! */
          };
        }
      );
      const deviceItems = values.map(
        value =>
          html`<mwc-check-list-item
            value="${JSON.stringify(value)}"
            twoline
            ?selected="${element.querySelector(
              `${element.tagName} > LNode[ldInst="${value.ldInst}"]`
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
          `IED[name="${ldValue.iedName}"] LDevice[inst="${ldValue.ldInst}"] LN
          ,IED[name="${ldValue.iedName}"] LDevice[inst="${ldValue.ldInst}"] LN0`
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
          value="${JSON.stringify(value)}"
          twoline
          ><span>${value.prefix}${value.lnClass}${value.inst}</span
          ><span slot="secondary"
            >${value.iedName} | ${value.ldInst}</span
          ></mwc-check-list-item
        >`;
      });
      return html`${nodeItems}
        <li divider role="separator"></li>`;
    });

  render(html`${itemGroups}`, lnList);
}

function filter(item: ListItemBase, searchfield: TextField): boolean {
  return item.value.toUpperCase().includes(searchfield.value.toUpperCase());
}

function onFilter(evt: InputEvent, selector: string): void {
  (<List>(
    (<TextField>evt.target).parentElement?.querySelector(selector)
  )).items.forEach(item => {
    filter(item, <TextField>evt.target)
      ? item.removeAttribute('style')
      : item.setAttribute('style', 'display:none;');
  });
}

function renderIEDPage(element: Element): TemplateResult {
  const doc = element.ownerDocument;
  return html`<wizard-textfield
      label="${translate('filter')}"
      iconTrailing="search"
      @input="${(evt: InputEvent) => onFilter(evt, '#iedList')}"
    ></wizard-textfield>
    <mwc-list
      multi
      id="iedList"
      @selected="${(evt: MultiSelectedEvent) => onIEDSelect(evt, element)}"
      >${Array.from(doc.querySelectorAll('IED'))
        .map(ied => ied.getAttribute('name'))
        .map(
          iedName =>
            html`<mwc-check-list-item
              .value=${iedName ?? ''}
              ?selected="${element.querySelector(
                `${element.tagName} > LNode[iedName="${iedName}"]`
              )}"
              >${iedName}</mwc-check-list-item
            >`
        )}</mwc-list
    >`;
}

function renderLdPage(element: Element): TemplateResult {
  return html`<wizard-textfield
      label="${translate('filter')}"
      iconTrailing="search"
      @input="${(evt: InputEvent) => onFilter(evt, '#ldList')}"
    ></wizard-textfield>
    <mwc-list
      multi
      id="ldList"
      @selected="${(evt: MultiSelectedEvent) => onLdSelect(evt, element)}"
    ></mwc-list>`;
}

function renderLnPage(): TemplateResult {
  return html`<wizard-textfield
      label="${translate('filter')}"
      iconTrailing="search"
      @input="${(evt: InputEvent) => onFilter(evt, '#lnList')}"
    ></wizard-textfield>
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
