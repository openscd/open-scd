import { html, render, TemplateResult } from 'lit-html';
import { translate } from 'lit-translate';

import '@material/mwc-list/mwc-list-item';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { SelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { Select } from '@material/mwc-select';

import '../wizard-checkbox.js';
import '../wizard-select.js';
import '../wizard-textfield.js';
import { createElement, EditorAction } from '../foundation.js';
import { WizardSelect } from '../wizard-select.js';
import { WizardTextField } from '../wizard-textfield.js';
import { maxLength, patterns } from './foundation/limits.js';
import { predefinedBasicTypeEnum, valKindEnum } from './foundation/enums.js';

function selectType(e: SelectedEvent, data: Element, Val: string | null): void {
  if (!e.target || !(e.target as Select).parentElement) return;

  const typeSelected = (<Select>e.target).selected?.value;
  const selectedBType = (<WizardSelect>(
    (<Select>e.target).parentElement!.querySelector(
      'wizard-select[label="bType"]'
    )!
  )).value;

  if (selectedBType !== 'Enum') return;

  const enumVals = Array.from(
    data.querySelectorAll(`EnumType[id="${typeSelected}"] > EnumVal`)
  ).map(
    enumval =>
      html`<mwc-list-item
        value="${enumval.textContent?.trim() ?? ''}"
        ?selected=${enumval.textContent?.trim() === Val}
        >${enumval.textContent?.trim()}</mwc-list-item
      >`
  );

  const selectValOptionUI = <WizardSelect>(
    (<Select>e.target).parentElement!.querySelector(
      'wizard-select[label="Val"]'
    )!
  );
  render(html`${enumVals}`, selectValOptionUI);
  selectValOptionUI.requestUpdate();
}

function selectBType(
  e: SelectedEvent,
  bType: string | null,
  type: string | null
): void {
  const bTypeSelected = (<Select>e.target).selected!.value;

  const typeUI = <Select>(
    (<Select>e.target).parentElement!.querySelector(
      'wizard-select[label="type"]'
    )!
  );
  typeUI.disabled = !(bTypeSelected === 'Enum' || bTypeSelected === 'Struct');
  const enabledItems: ListItem[] = [];
  Array.from(typeUI.children).forEach(child => {
    const childItem = <ListItem>child;
    childItem.disabled = !child.classList.contains(bTypeSelected);
    childItem.noninteractive = !child.classList.contains(bTypeSelected);
    childItem.style.display = !child.classList.contains(bTypeSelected)
      ? 'none'
      : '';
    if (!childItem.disabled) enabledItems.push(childItem);
  });
  if (type && bType === bTypeSelected) typeUI.value = type;
  else typeUI.value = enabledItems.length ? enabledItems[0].value : '';

  const selectValOptionUI = <WizardSelect>(
    (<Select>e.target).parentElement!.querySelector(
      'wizard-select[label="Val"]'
    )!
  );
  if (bTypeSelected === 'Enum') selectValOptionUI.style.display = '';
  else selectValOptionUI.style.display = 'none';

  const textfieldValOptionUI = <WizardTextField>(
    (<Select>e.target).parentElement!.querySelector(
      'wizard-textfield[label="Val"]'
    )!
  );
  if (bTypeSelected === 'Enum' || bTypeSelected === 'Struct')
    textfieldValOptionUI.style.display = 'none';
  else textfieldValOptionUI.style.display = '';

  selectValOptionUI.requestUpdate();
  textfieldValOptionUI.requestUpdate();
  typeUI.requestUpdate();
}

export function wizardContent(
  name: string | null,
  desc: string | null,
  bType: string,
  types: Element[],
  type: string | null,
  sAddr: string | null,
  valKind: string | null,
  valImport: string | null,
  Val: string | null,
  data: Element
): TemplateResult[] {
  return [
    html`<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${translate('scl.name')}"
      required
      pattern="${patterns.abstractDataAttributeName}"
      maxLength="${maxLength.abstracDaName}"
      dialogInitialFocus
    >
      ></wizard-textfield
    >`,
    html`<wizard-textfield
      label="desc"
      helper="${translate('scl.desc')}"
      .maybeValue=${desc}
      nullable
      pattern="${patterns.normalizedString}"
    ></wizard-textfield>`,
    html`<wizard-select
      fixedMenuPosition
      label="bType"
      .value=${bType}
      helper="${translate('scl.bType')}"
      required
      @selected=${(e: SelectedEvent) => selectBType(e, bType, type)}
      >${predefinedBasicTypeEnum.map(
        redefinedBType =>
          html`<mwc-list-item value="${redefinedBType}"
            >${redefinedBType}</mwc-list-item
          >`
      )}</wizard-select
    >`,
    html`<wizard-select
      label="type"
      .maybeValue=${type}
      helper="${translate('scl.type')}"
      fixedMenuPosition
      @selected=${(e: SelectedEvent) => selectType(e, data, Val)}
      >${types.map(
        dataType =>
          html`<mwc-list-item
            class="${dataType.tagName === 'EnumType' ? 'Enum' : 'Struct'}"
            value=${dataType.id}
            >${dataType.id}</mwc-list-item
          >`
      )}</wizard-select
    >`,
    html`<wizard-textfield
      label="sAddr"
      .maybeValue=${sAddr}
      helper="${translate('scl.sAddr')}"
      nullable
      pattern="${patterns.normalizedString}"
    ></wizard-textfield>`,
    html`<wizard-select
      label="valKind"
      .maybeValue=${valKind}
      helper="${translate('scl.valKind')}"
      nullable
      required
      fixedMenuPosition
      >${valKindEnum.map(
        valKindOption =>
          html`<mwc-list-item value="${valKindOption}"
            >${valKindOption}</mwc-list-item
          >`
      )}</wizard-select
    >`,
    html`<wizard-checkbox
      label="valImport"
      .maybeValue=${valImport}
      helper="${translate('scl.valImport')}"
      nullable
      required
    ></wizard-checkbox>`,
    html`<wizard-select
      label="Val"
      .maybeValue=${Val}
      helper="${translate('scl.Val')}"
      nullable
      >${Array.from(
        data.querySelectorAll(`EnumType > EnumVal[id="${type}"]`)
      ).map(
        enumVal =>
          html`<mwc-list-item value="${enumVal.textContent?.trim() ?? ''}"
            >${enumVal.textContent?.trim()}</mwc-list-item
          >`
      )}</wizard-select
    >`,
    html`<wizard-textfield
      label="Val"
      .maybeValue=${Val}
      helper="${translate('scl.Val')}"
      nullable
    ></wizard-textfield>`,
  ];
}

export function getValAction(
  oldVal: Element | null,
  Val: string | null,
  abstractda: Element
): EditorAction {
  if (oldVal === null) {
    const element = createElement(abstractda.ownerDocument, 'Val', {});
    element.textContent = Val;
    return {
      new: {
        parent: abstractda,
        element,
        reference: abstractda.firstElementChild,
      },
    };
  }

  if (Val === null)
    return {
      old: {
        parent: abstractda,
        element: oldVal,
        reference: oldVal.nextSibling,
      },
    };

  const newVal = <Element>oldVal.cloneNode(false);
  newVal.textContent = Val;
  return {
    old: { element: oldVal },
    new: { element: newVal },
  };
}
