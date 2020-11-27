import { html, render, TemplateResult } from 'lit-html';
import { get, translate } from 'lit-translate';

import {
  CloseableElement,
  EditorAction,
  Wizard,
  WizardAction,
  WizardInput,
  crossProduct,
} from '../../foundation.js';

import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-textfield';
import '@material/mwc-icon';
import { List } from '@material/mwc-list';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { MultiSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { TextField } from '@material/mwc-textfield';
import { selectors, SubstationTag } from './foundation.js';
import { ListItem } from '@material/mwc-list/mwc-list-item';
interface LDValue {
  iedName: string;
  ldInst: string;
}

interface LNValue extends LDValue {
  prefix: string | null;
  lnClass: string;
  inst: string | null;
}

const APldInst = 'Client LN';

function valueToSelector(value: LNValue, parentTag?: SubstationTag): string {
  const base = `LNode[iedName="${value.iedName}"][ldInst="${value.ldInst}"][lnClass="${value.lnClass}"]`;
  const ancestries = parentTag
    ? [selectors[parentTag]]
    : (<SubstationTag[]>[
        'Substation',
        'VoltageLevel',
        'Bay',
        'ConductingEquipment',
      ]).map(s => selectors[s]);
  const prefix = value.prefix
    ? [`[prefix="${value.prefix}"]`]
    : [':not([prefix])', '[prefix=""]'];
  const lnInst = value.inst
    ? [`[lnInst="${value.inst}"]`]
    : [':not([lnInst])', '[lnInst=""]'];
  return crossProduct(ancestries, [' > '], [base], prefix, lnInst)
    .map(a => a.join(''))
    .join(',');
}

export function getLNode(
  parent: Element | XMLDocument,
  value: LNValue
): Element | null {
  const parentTag =
    parent instanceof Element ? <SubstationTag>parent.tagName : undefined;
  return parent.querySelector(valueToSelector(value, parentTag));
}

function connectedEquipmentPath(lNode: Element): string {
  let path = '';
  let nextParent: Element | null | undefined = lNode?.parentElement;
  while (nextParent?.getAttribute('name')) {
    path = '/' + nextParent.getAttribute('name') + path;
    nextParent = nextParent.parentElement;
  }
  return path;
}

function createAction(parent: Element, value: LNValue): EditorAction {
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

function deleteAction(parent: Element, value: LNValue): EditorAction {
  const element = parent.querySelector(
    valueToSelector(value, <SubstationTag>parent.tagName)
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
        `${selectors[<SubstationTag>parent.tagName]} > LNode`
      )
    )
      .map(node => {
        return {
          iedName: node.getAttribute('iedName') ?? '',
          ldInst:
            node.getAttribute('ldInst') === APldInst
              ? ''
              : node.getAttribute('ldInst') ?? '',
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

  const selectedIEDItems = <ListItemBase[]>(<List>evt.target).selected;

  const selectedIEDs = selectedIEDItems.map(
    item => doc.querySelector(`:root > IED[name="${item.value}"]`)!
  );

  const LDList = selectedIEDs.flatMap(ied => {
    const values = Array.from(
      ied.querySelectorAll(':root > IED > AccessPoint > Server > LDevice')
    ).map(lDevice => {
      return {
        iedName: ied.getAttribute('name'),
        ldInst: lDevice.getAttribute('inst') ?? '',
        /* ORDER IS IMPORTANT HERE, since we stringify to compare! */
      };
    });
    if (ied.querySelectorAll(':root > IED > AccessPoint > LN').length) {
      values.push({
        iedName: ied.getAttribute('name'),
        ldInst: APldInst,
        /* ORDER IS IMPORTANT HERE, since we stringify to compare! */
      });
    }
    return values;
  });

  const deviceItems = LDList.map(value => {
    return {
      value,
      selected:
        element.querySelector(
          `${selectors[<SubstationTag>element.tagName]} > LNode[ldInst="${
            value.ldInst === APldInst ? '' : value.ldInst
          }"]`
        ) !== null,
    };
  })
    .sort((a, b) => {
      if (a.selected !== b.selected) return a.selected ? -1 : 1;
      return 0;
    })
    .map(
      item =>
        html`<mwc-check-list-item
          value="${JSON.stringify(item.value)}"
          twoline
          ?selected="${item.selected}"
          ><span>${item.value.ldInst}</span
          ><span slot="secondary"
            >${item.value.iedName}</span
          ></mwc-check-list-item
        >`
    );

  render(html`${deviceItems}`, ldList);
}

function onLDSelect(evt: MultiSelectedEvent, element: Element): void {
  const doc = element.ownerDocument;
  const lnList =
    (<Element>(
      evt.target
    )).parentElement?.parentElement?.nextElementSibling?.querySelector(
      '#lnList'
    ) ?? null;
  if (lnList === null) return;

  const selectedValues = (<ListItem[]>(<List>evt.target).selected).map(
    (item): LDValue => JSON.parse(item.value)
  );

  const ldValues = selectedValues.flatMap(ldValue => {
    const selector =
      ldValue.ldInst === APldInst
        ? `:root > IED[name="${ldValue.iedName}"] > AccessPoint > LN`
        : `:root > IED[name="${ldValue.iedName}"] > AccessPoint > Server > LDevice[inst="${ldValue.ldInst}"] > LN` +
          `,:root > IED[name="${ldValue.iedName}"] > AccessPoint > Server > LDevice[inst="${ldValue.ldInst}"] > LN0`;
    const values = Array.from(doc.querySelectorAll(selector)).map(ln => {
      return {
        ...ldValue,
        prefix: ln.getAttribute('prefix') ?? '',
        lnClass: ln.getAttribute('lnClass') ?? '',
        inst: ln.getAttribute('inst') ?? '',
        /* ORDER IS IMPORTANT HERE, since we stringify to compare! */
      };
    });
    return values;
  });
  const nodeItems = ldValues
    .map(value => {
      return {
        value,
        selected: getLNode(element, value) !== null,
        lNode: getLNode(element.ownerDocument, value),
      };
    })
    .map(item => {
      return {
        ...item,
        disabled: !item.selected && item.lNode !== null,
      };
    })
    .sort((a, b) => {
      if (a.selected !== b.selected) return a.selected ? -1 : 1;
      if (a.disabled !== b.disabled) return b.disabled ? -1 : 1;
      return 0;
    })
    .map(item => {
      return html`<mwc-check-list-item
        ?selected=${item.selected}
        ?disabled=${item.disabled}
        value="${JSON.stringify(item.value)}"
        twoline
        ><span
          >${item.value.prefix}${item.value.lnClass}${item.value.inst}
          ${item.disabled
            ? html` <mwc-icon style="--mdc-icon-size: 1em;"
                  >account_tree</mwc-icon
                >
                ${connectedEquipmentPath(item.lNode!)}`
            : ''}</span
        ><span slot="secondary"
          >${item.value.iedName} | ${item.value.ldInst}</span
        ></mwc-check-list-item
      >`;
    });

  render(html`${nodeItems}`, lnList);
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
        .map(iedName => {
          return {
            selected:
              element.querySelector(
                `${
                  selectors[<SubstationTag>element.tagName]
                } > LNode[iedName="${iedName}"]`
              ) !== null,
            name: iedName,
          };
        })
        .sort((a, b) => {
          if (a.selected !== b.selected) return a.selected ? -1 : 1;
          return 0;
        })
        .map(
          item =>
            html`<mwc-check-list-item
              value="${item.name ?? ''}"
              ?selected=${item.selected}
              >${item.name}</mwc-check-list-item
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
      @selected="${(evt: MultiSelectedEvent) => onLDSelect(evt, element)}"
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
