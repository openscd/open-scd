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
import { TextField } from '@material/mwc-textfield';
import { MultiSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { html, render } from 'lit-html';
import { get, translate } from 'lit-translate';

function createAction(parent: Element): WizardAction {
  return (inputs: WizardInput[], wizard: CloseableElement): EditorAction[] => {
    const actions: EditorAction[] = [];
    (<ListItemBase[]>(
      (<List>wizard.shadowRoot?.querySelector('#lnList')).selected
    )).map(item => {
      const value = JSON.parse(item.value);
      const action = {
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
      actions.push(action);
    });
    wizard.close();
    return actions;
  };
}

function removeAction(parent: Element): WizardAction {
  return (inputs: WizardInput[], wizard: CloseableElement): EditorAction[] => {
    const actions: EditorAction[] = [];

    Array.from(
      <Set<number>>(<List>wizard.shadowRoot?.querySelector('#lNodeList')).index
    ).map(index => {
      const element = Array.from(parent.children).filter(
        child => child.tagName === 'LNode'
      )[index];
      const action = {
        old: {
          parent: parent,
          element: element,
          reference: element.nextElementSibling ?? null,
        },
      };
      actions.push(action);
    });

    wizard.close();
    return actions;
  };
}

function onIEDSelect(evt: MultiSelectedEvent, doc: Document): void {
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
            ldInst: lDevice.getAttribute('inst')!,
          };
        }
      );
      const deviceItems = values.map(
        value =>
          html`<mwc-check-list-item value="${JSON.stringify(value)}" twoline
            ><span>${value.ldInst}</span
            ><span slot="secondary">${value.iedName}</span></mwc-check-list-item
          >`
      );
      return html`${deviceItems}
        <li divider role="separator"></li>`;
    });

  render(html`${itemGroups}`, ldList);
}

interface ldValue {
  iedName: string;
  ldInst: string;
}

interface lnValue extends ldValue {
  prefix: string | null;
  lnClass: string;
  inst: string;
}

function existLNode(value: lnValue, element: Element): boolean {
  return Array.from(element.children)
    .filter(child => child.tagName === 'LNode')
    .some(
      lNode =>
        lNode.getAttribute('iedName') === value.iedName &&
        lNode.getAttribute('ldInst') === value.ldInst &&
        lNode.getAttribute('prefix') === value.prefix &&
        lNode.getAttribute('lnClass') === value.lnClass &&
        (lNode.getAttribute('lnInst') // `inst` in `tAnyLN` is required but `lnInst` in `tLNode` is optional default ""
          ? lNode.getAttribute('lnInst') === value.inst
          : '' === value.inst)
    );
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
          prefix: ln.getAttribute('prefix'),
          lnClass: ln.getAttribute('lnClass') ?? '',
          inst: ln.getAttribute('inst') ?? '',
          ...ldValue,
        };
      });
      const nodeItems = values.map(value => {
        return html`<mwc-check-list-item
          ?disabled=${existLNode(value, element)}
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

function onIedFilter(evt: InputEvent): void {
  (<List>(
    (<TextField>evt.target).parentElement?.querySelector('#iedList')
  )).items.map(item => {
    if (
      item.value
        .toUpperCase()
        .includes((<TextField>evt.target).value.toUpperCase())
    ) {
      item.removeAttribute('disabled');
      item.removeAttribute('style');
    } else {
      item.setAttribute('disabled', 'true');
      item.setAttribute('style', 'display:none;');
    }
  });
}

function onLdFilter(evt: InputEvent): void {
  (<List>(
    (<TextField>evt.target).parentElement?.querySelector('#ldList')
  )).items.map(item => {
    if (
      item
        .querySelector('span')
        ?.innerText.toUpperCase()
        .includes((<TextField>evt.target).value.toUpperCase())
    ) {
      item.removeAttribute('disabled');
      item.removeAttribute('style');
    } else {
      item.setAttribute('disabled', 'true');
      item.setAttribute('style', 'display:none;');
    }
  });
}

function onLnFilter(evt: InputEvent): void {
  Array.from(
    (<List>(<TextField>evt.target).parentElement?.querySelector('#lnList'))
      .children
  ).forEach(item => {
    if (
      item
        .querySelector('span')
        ?.innerText.toUpperCase()
        .includes((<TextField>evt.target).value.toUpperCase())
    ) {
      item.removeAttribute('style');
    } else {
      item.setAttribute('style', 'display:none;');
    }
  });
}

function onLNodeFilter(evt: InputEvent): void {
  (<List>(
    (<TextField>evt.target).parentElement?.querySelector('#lNodeList')
  )).items.map(item => {
    if (
      item
        .querySelector('span')
        ?.innerText.toUpperCase()
        .includes((<TextField>evt.target).value.toUpperCase())
    ) {
      item.removeAttribute('disabled');
      item.removeAttribute('style');
    } else {
      item.setAttribute('disabled', 'true');
      item.setAttribute('style', 'display:none;');
    }
  });
}

export function add(element: Element): Wizard {
  const doc = element.ownerDocument;
  return [
    {
      title: get('lnode.wizard.title.selectIEDs'),
      content: [
        html`<wizard-textfield
            label="${translate('filter')}"
            iconTrailing="search"
            @input="${onIedFilter}"
          ></wizard-textfield>
          <mwc-list
            activatable
            multi
            id="iedList"
            @selected="${(evt: MultiSelectedEvent) => onIEDSelect(evt, doc)}"
            >${Array.from(doc.querySelectorAll('IED')).map(
              ied =>
                html`<mwc-check-list-item
                  .value=${ied.getAttribute('name') ?? ''}
                  >${ied.getAttribute('name')}</mwc-check-list-item
                >`
            )}</mwc-list
          >`,
      ],
    },
    {
      title: get('lnode.wizard.title.selectLDs'),
      content: [
        html`<wizard-textfield
            label="${translate('filter')}"
            iconTrailing="search"
            @input="${onLdFilter}"
          ></wizard-textfield>
          <mwc-list
            activatable
            multi
            id="ldList"
            @selected="${(evt: MultiSelectedEvent) => onLdSelect(evt, element)}"
          ></mwc-list>`,
      ],
    },
    {
      title: get('lnode.wizard.title.selectLNs'),
      primary: {
        icon: 'add',
        label: get('add'),
        action: createAction(element),
      },
      content: [
        html`<wizard-textfield
            label="${translate('filter')}"
            iconTrailing="search"
            @input="${onLnFilter}"
          ></wizard-textfield>
          <mwc-list activatable multi id="lnList"></mwc-list>`,
      ],
    },
  ];
}

export function remove(element: Element): Wizard {
  return [
    {
      title: get('lnode.wizard.title.selectLNodes'),
      primary: {
        icon: 'delete',
        label: get('remove'),
        action: removeAction(element),
      },
      content: [
        html`<wizard-textfield
            label="${translate('filter')}"
            iconTrailing="search"
            @input="${onLNodeFilter}"
          ></wizard-textfield>
          <mwc-list activatable multi id="lNodeList"
            >${Array.from(element.children)
              .filter(child => child.tagName === 'LNode')
              .map(
                lNode =>
                  html`<mwc-check-list-item twoline
                    ><span
                      >${(lNode.getAttribute('prefix') ?? '') +
                      (lNode.getAttribute('lnClass') ?? '') +
                      (lNode.getAttribute('lnInst') ?? '')}</span
                    ><span slot="secondary"
                      >${lNode.getAttribute('iedName') +
                      '|' +
                      lNode.getAttribute('ldInst')}</span
                    ></mwc-check-list-item
                  >`
              )}</mwc-list
          >`,
      ],
    },
  ];
}
