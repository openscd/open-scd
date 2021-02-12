import { html, render, TemplateResult } from 'lit-html';
import { get, translate } from 'lit-translate';

import {
  CloseableElement,
  createElement,
  crossProduct,
  EditorAction,
  referencePath,
  Wizard,
  WizardAction,
  WizardInput,
} from '../../foundation.js';

import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-textfield';
import '@material/mwc-icon';
import { List } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { MultiSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { TextField } from '@material/mwc-textfield';
import { selectors, SubstationTag } from './foundation.js';

/** Data needed to uniquely identify an `LDevice` */
interface LDValue {
  iedName: string;
  ldInst: string;
}

/** Data needed to uniquely identify an `LN` or `LN0` */
interface LNValue extends LDValue {
  prefix: string | null;
  lnClass: string;
  inst: string | null;
}

/** Description of a `ListItem` representing an `IED`, `LDevice`, or `LN[0]` */
interface ItemDescription {
  value: LNValue | LDValue | string;
  selected: boolean;
  disabled?: boolean;
}

/** Sorts selected `ListItem`s to the top and disabled ones to the bottom. */
function compareDescription(a: ItemDescription, b: ItemDescription): number {
  if (a.selected !== b.selected) return a.selected ? -1 : 1;
  if (a.disabled !== b.disabled) return b.disabled ? -1 : 1;
  return 0;
}

const APldInst = 'Client LN';

/** Queries `parent` for an `LNode` described by `value`. */
export function getLNode(
  parent: Element | XMLDocument,
  value: LNValue
): Element | null {
  const parentTag =
    parent instanceof Element ? <SubstationTag>parent.tagName : undefined;

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
  const selector = crossProduct(ancestries, [' > '], [base], prefix, lnInst)
    .map(a => a.join(''))
    .join(',');

  return parent.querySelector(selector);
}

function createAction(
  parent: Element,
  { iedName, ldInst, prefix, lnClass, inst: lnInst }: LNValue
): EditorAction {
  const element = createElement(parent.ownerDocument, 'LNode', {
    iedName,
    ldInst,
    prefix,
    lnClass,
    lnInst,
  });

  return {
    new: {
      parent,
      element,
      reference: null,
    },
  };
}

function deleteAction(parent: Element, value: LNValue): EditorAction {
  const element = getLNode(parent, value)!;
  return {
    old: {
      parent: parent,
      element: element,
      reference: element.nextElementSibling,
    },
  };
}

/**
 * @returns a `WizardAction` updating `parent`'s `LNodes`
 * to the entries selected in `wizard`'s `#lnList`.
 */
export function lNodeWizardAction(parent: Element): WizardAction {
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

function getListContainer(target: Element, id: string): Element | null {
  return (
    target.parentElement?.parentElement?.nextElementSibling?.querySelector(
      id
    ) ?? null
  );
}

function onIEDSelect(evt: MultiSelectedEvent, element: Element): void {
  if (!(evt.target instanceof List)) return;
  const ldList = getListContainer(evt.target, '#ldList');
  if (ldList === null) return;

  const doc = element.ownerDocument;

  const selectedIEDItems = <ListItem[]>evt.target.selected;
  const selectedIEDs = selectedIEDItems.map(
    item => doc.querySelector(`:root > IED[name="${item.value}"]`)!
  );

  const ldValues = selectedIEDs.flatMap(ied => {
    const values = Array.from(
      ied.querySelectorAll(':root > IED > AccessPoint > Server > LDevice')
    ).map(lDevice => {
      return {
        iedName: ied.getAttribute('name')!,
        ldInst: lDevice.getAttribute('inst') ?? '',
        /* ORDER IS IMPORTANT HERE, since we stringify to compare! */
      };
    });
    if (ied.querySelectorAll(':root > IED > AccessPoint > LN').length) {
      values.push({
        iedName: ied.getAttribute('name')!,
        ldInst: APldInst,
        /* ORDER IS IMPORTANT HERE, since we stringify to compare! */
      });
    }
    return values;
  });

  const ldDescriptions = ldValues
    .map(value => {
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
    .sort(compareDescription);

  const ldItems = ldDescriptions.map(
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

  render(html`${ldItems}`, ldList);
}

function onLDSelect(evt: MultiSelectedEvent, element: Element): void {
  if (!(evt.target instanceof List)) return;
  const lnList = getListContainer(evt.target, '#lnList');
  if (lnList === null) return;

  const doc = element.ownerDocument;

  const selectedLDItems = <ListItem[]>evt.target.selected;
  const ldValues = selectedLDItems.map(
    (item): LDValue => JSON.parse(item.value)
  );

  const lnValues = ldValues.flatMap(ldValue => {
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

  const lnDescriptions = lnValues
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
    .sort(compareDescription);

  const lnItems = lnDescriptions.map(item => {
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
              ${referencePath(item.lNode!)}`
          : ''}</span
      ><span slot="secondary"
        >${item.value.iedName} | ${item.value.ldInst}</span
      ></mwc-check-list-item
    >`;
  });

  render(html`${lnItems}`, lnList);
}

function onFilterInput(evt: InputEvent): void {
  (<List>(
    (<TextField>evt.target).parentElement?.querySelector('mwc-list')
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
  if (doc.querySelectorAll(':root > IED').length > 0)
    return html`<mwc-textfield
        label="${translate('filter')}"
        iconTrailing="search"
        outlined
        @input=${onFilterInput}
      ></mwc-textfield>
      <mwc-list
        multi
        id="iedList"
        @selected="${(evt: MultiSelectedEvent) => onIEDSelect(evt, element)}"
        >${Array.from(doc.querySelectorAll(':root > IED'))
          .map(ied => ied.getAttribute('name')!)
          .map(iedName => {
            return {
              selected:
                element.querySelector(
                  `${
                    selectors[<SubstationTag>element.tagName]
                  } > LNode[iedName="${iedName}"]`
                ) !== null,
              value: iedName,
            };
          })
          .sort(compareDescription)
          .map(
            item =>
              html`<mwc-check-list-item
                value="${item.value ?? ''}"
                ?selected=${item.selected}
                >${item.value}</mwc-check-list-item
              >`
          )}</mwc-list
      >`;
  else
    return html`<mwc-list-item disabled graphic="icon">
      <span>${translate('lnode.wizard.placeholder')}</span>
      <mwc-icon slot="graphic">info</mwc-icon>
    </mwc-list-item>`;
}

function renderLdPage(element: Element): TemplateResult {
  return html`<mwc-textfield
      label="${translate('filter')}"
      iconTrailing="search"
      outlined
      @input=${onFilterInput}
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
      outlined
      @input=${onFilterInput}
    ></mwc-textfield>
    <mwc-list multi id="lnList"></mwc-list>`;
}

/** @returns a Wizard for editing `element`'s `LNode`s. */
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
        action: lNodeWizardAction(element),
      },
      content: [renderLnPage()],
    },
  ];
}
