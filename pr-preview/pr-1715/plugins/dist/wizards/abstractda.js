import { html, render } from '../../../_snowpack/pkg/lit-html.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import '../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js';
import '../../../openscd/src/wizard-checkbox.js';
import '../../../openscd/src/wizard-select.js';
import '../../../openscd/src/wizard-textfield.js';
import { createElement, } from '../../../_snowpack/link/packages/xml/dist/index.js';
import { maxLength, patterns } from './foundation/limits.js';
import { predefinedBasicTypeEnum, valKindEnum } from './foundation/enums.js';
function selectType(e, data, Val) {
    if (!e.target || !e.target.parentElement)
        return;
    const typeSelected = e.target.selected?.value;
    const selectedBType = (e.target.parentElement.querySelector('wizard-select[label="bType"]')).value;
    if (selectedBType !== 'Enum')
        return;
    const enumVals = Array.from(data.querySelectorAll(`EnumType[id="${typeSelected}"] > EnumVal`)).map(enumval => html `<mwc-list-item
        value="${enumval.textContent?.trim() ?? ''}"
        ?selected=${enumval.textContent?.trim() === Val}
        >${enumval.textContent?.trim()}</mwc-list-item
      >`);
    const selectValOptionUI = (e.target.parentElement.querySelector('wizard-select[label="Val"]'));
    render(html `${enumVals}`, selectValOptionUI);
    selectValOptionUI.requestUpdate();
}
function selectBType(e, bType, type) {
    const bTypeSelected = e.target.selected.value;
    const typeUI = (e.target.parentElement.querySelector('wizard-select[label="type"]'));
    typeUI.disabled = !(bTypeSelected === 'Enum' || bTypeSelected === 'Struct');
    const enabledItems = [];
    Array.from(typeUI.children).forEach(child => {
        const childItem = child;
        childItem.disabled = !child.classList.contains(bTypeSelected);
        childItem.noninteractive = !child.classList.contains(bTypeSelected);
        childItem.style.display = !child.classList.contains(bTypeSelected)
            ? 'none'
            : '';
        if (!childItem.disabled)
            enabledItems.push(childItem);
    });
    if (type && bType === bTypeSelected)
        typeUI.value = type;
    else
        typeUI.value = enabledItems.length ? enabledItems[0].value : '';
    const selectValOptionUI = (e.target.parentElement.querySelector('wizard-select[label="Val"]'));
    if (bTypeSelected === 'Enum')
        selectValOptionUI.style.display = '';
    else
        selectValOptionUI.style.display = 'none';
    const textfieldValOptionUI = (e.target.parentElement.querySelector('wizard-textfield[label="Val"]'));
    if (bTypeSelected === 'Enum' || bTypeSelected === 'Struct')
        textfieldValOptionUI.style.display = 'none';
    else
        textfieldValOptionUI.style.display = '';
    selectValOptionUI.requestUpdate();
    textfieldValOptionUI.requestUpdate();
    typeUI.requestUpdate();
}
export function wizardContent(name, desc, bType, types, type, sAddr, valKind, valImport, Val, data) {
    return [
        html `<wizard-textfield
      label="name"
      .maybeValue=${name}
      helper="${get('scl.name')}"
      required
      pattern="${patterns.abstractDataAttributeName}"
      maxLength="${maxLength.abstracDaName}"
      dialogInitialFocus
    >
      ></wizard-textfield
    >`,
        html `<wizard-textfield
      label="desc"
      helper="${get('scl.desc')}"
      .maybeValue=${desc}
      nullable
      pattern="${patterns.normalizedString}"
    ></wizard-textfield>`,
        html `<wizard-select
      fixedMenuPosition
      label="bType"
      .value=${bType}
      helper="${get('scl.bType')}"
      required
      @selected=${(e) => selectBType(e, bType, type)}
      >${predefinedBasicTypeEnum.map(redefinedBType => html `<mwc-list-item value="${redefinedBType}"
            >${redefinedBType}</mwc-list-item
          >`)}</wizard-select
    >`,
        html `<wizard-select
      label="type"
      .maybeValue=${type}
      helper="${get('scl.type')}"
      fixedMenuPosition
      @selected=${(e) => selectType(e, data, Val)}
      >${types.map(dataType => html `<mwc-list-item
            class="${dataType.tagName === 'EnumType' ? 'Enum' : 'Struct'}"
            value=${dataType.id}
            >${dataType.id}</mwc-list-item
          >`)}</wizard-select
    >`,
        html `<wizard-textfield
      label="sAddr"
      .maybeValue=${sAddr}
      helper="${get('scl.sAddr')}"
      nullable
      pattern="${patterns.normalizedString}"
    ></wizard-textfield>`,
        html `<wizard-select
      label="valKind"
      .maybeValue=${valKind}
      helper="${get('scl.valKind')}"
      nullable
      required
      fixedMenuPosition
      >${valKindEnum.map(valKindOption => html `<mwc-list-item value="${valKindOption}"
            >${valKindOption}</mwc-list-item
          >`)}</wizard-select
    >`,
        html `<wizard-checkbox
      label="valImport"
      .maybeValue=${valImport}
      helper="${get('scl.valImport')}"
      nullable
      required
    ></wizard-checkbox>`,
        html `<wizard-select
      label="Val"
      .maybeValue=${Val}
      helper="${get('scl.Val')}"
      nullable
      >${Array.from(data.querySelectorAll(`EnumType > EnumVal[id="${type}"]`)).map(enumVal => html `<mwc-list-item value="${enumVal.textContent?.trim() ?? ''}"
            >${enumVal.textContent?.trim()}</mwc-list-item
          >`)}</wizard-select
    >`,
        html `<wizard-textfield
      label="Val"
      .maybeValue=${Val}
      helper="${get('scl.Val')}"
      nullable
    ></wizard-textfield>`,
    ];
}
export function getValAction(oldVal, Val, abstractda) {
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
    const newVal = oldVal.cloneNode(false);
    newVal.textContent = Val;
    return {
        old: { element: oldVal },
        new: { element: newVal },
    };
}
//# sourceMappingURL=abstractda.js.map