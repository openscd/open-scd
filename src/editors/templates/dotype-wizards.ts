import { html } from 'lit-html';
import { get, translate } from 'lit-translate';

import {
  createElement,
  EditorAction,
  getReference,
  getValue,
  identity,
  isPublic,
  newActionEvent,
  newWizardEvent,
  patterns,
  SCLTag,
  selector,
  Wizard,
  WizardActor,
  WizardInput,
} from '../../foundation.js';

import {
  addReferencedDataTypes,
  allDataTypeSelector,
  buildListFromStringArray,
  functionalConstraintEnum,
  predefinedBasicTypeEnum,
  valKindEnum,
} from './foundation.js';

import { Select } from '@material/mwc-select';
import {
  SelectedEvent,
  SingleSelectedEvent,
} from '@material/mwc-list/mwc-list-foundation';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { List } from '@material/mwc-list';

interface UpdateOptions {
  identity: string | null;
  doc: XMLDocument;
}
interface CreateOptions {
  parent: Element;
}
export type WizardOptions = UpdateOptions | CreateOptions;

function updateSDoAction(element: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const type = getValue(inputs.find(i => i.label === 'type')!)!;

    const actions: EditorAction[] = [];
    if (
      name === element.getAttribute('name') &&
      desc === element.getAttribute('desc') &&
      type === element.getAttribute('type')
    ) {
      return [];
    }

    const newElement = <Element>element.cloneNode(false);
    newElement.setAttribute('name', name);
    if (desc === null) newElement.removeAttribute('desc');
    else newElement.setAttribute('desc', desc);
    newElement.setAttribute('type', type);
    actions.push({
      old: { element },
      new: { element: newElement },
    });

    return actions;
  };
}

function createSDoAction(parent: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const type = getValue(inputs.find(i => i.label === 'type')!);

    const actions: EditorAction[] = [];

    const element = createElement(parent.ownerDocument, 'SDO', {
      name,
      desc,
      type,
    });
    actions.push({
      new: {
        parent,
        element,
        reference: getReference(parent, <SCLTag>element.tagName),
      },
    });

    return actions;
  };
}

function sDOWizard(options: WizardOptions): Wizard | undefined {
  const doc = (<UpdateOptions>options).doc
    ? (<UpdateOptions>options).doc
    : (<CreateOptions>options).parent.ownerDocument;
  const sdo =
    Array.from(
      doc.querySelectorAll(
        selector('SDO', (<UpdateOptions>options).identity ?? NaN)
      )
    ).find(isPublic) ?? null;

  const [title, action, type, deleteButton, name, desc] = sdo
    ? [
        get('sdo.wizard.title.edit'),
        updateSDoAction(sdo),
        sdo.getAttribute('type'),
        html`<mwc-button
          icon="delete"
          trailingIcon
          label="${translate('delete')}"
          @click=${(e: MouseEvent) => {
            e.target!.dispatchEvent(newWizardEvent());
            e.target!.dispatchEvent(
              newActionEvent({
                old: {
                  parent: sdo.parentElement!,
                  element: sdo,
                  reference: sdo.nextElementSibling,
                },
              })
            );
          }}
          fullwidth
        ></mwc-button> `,
        sdo.getAttribute('name'),
        sdo.getAttribute('desc'),
      ]
    : [
        get('sdo.wizard.title.add'),
        createSDoAction((<CreateOptions>options).parent),
        null,
        html``,
        '',
        null,
      ];

  const types = Array.from(doc.querySelectorAll('DOType'))
    .filter(isPublic)
    .filter(type => type.getAttribute('id'));

  return [
    {
      title,
      primary: { icon: '', label: get('save'), action },
      content: [
        deleteButton,
        html`<wizard-textfield
          label="name"
          .maybeValue=${name}
          helper="${translate('scl.name')}"
          required
          pattern="${patterns.alphanumeric}"
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
        html`<mwc-select
          fixedMenuPosition
          label="type"
          required
          helper="${translate('scl.type')}"
          >${types.map(
            dataType =>
              html`<mwc-list-item
                value=${dataType.id}
                ?selected=${dataType.id === type}
                >${dataType.id}</mwc-list-item
              >`
          )}</mwc-select
        >`,
      ],
    },
  ];
}

function updateDaAction(element: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const bType = getValue(inputs.find(i => i.label === 'bType')!)!;
    const type =
      bType === 'Enum' || bType === 'Struct'
        ? getValue(inputs.find(i => i.label === 'type')!)
        : null;
    const sAddr = getValue(inputs.find(i => i.label === 'sAddr')!);
    const valKind =
      getValue(inputs.find(i => i.label === 'valKind')!) !== ''
        ? getValue(inputs.find(i => i.label === 'valKind')!)
        : null;
    const valImport =
      getValue(inputs.find(i => i.label === 'valImport')!) !== ''
        ? getValue(inputs.find(i => i.label === 'valImport')!)
        : null;

    const actions: EditorAction[] = [];
    if (
      name === element.getAttribute('name') &&
      desc === element.getAttribute('desc') &&
      bType === element.getAttribute('bType') &&
      type === element.getAttribute('type') &&
      sAddr === element.getAttribute('sAddr') &&
      valKind === element.getAttribute('valKind') &&
      valImport === element.getAttribute('valImprot')
    ) {
      return [];
    }

    const newElement = <Element>element.cloneNode(false);
    newElement.setAttribute('name', name);
    if (desc === null) newElement.removeAttribute('desc');
    else newElement.setAttribute('desc', desc);
    newElement.setAttribute('bType', bType);
    if (type === null) newElement.removeAttribute('type');
    else newElement.setAttribute('type', type);
    if (sAddr === null) newElement.removeAttribute('sAddr');
    else newElement.setAttribute('sAddr', sAddr);
    if (valKind === null) newElement.removeAttribute('valKind');
    else newElement.setAttribute('valKind', valKind);
    if (valImport === null) newElement.removeAttribute('valImport');
    else newElement.setAttribute('valImport', valImport);
    actions.push({
      old: { element },
      new: { element: newElement },
    });

    return actions;
  };
}

function createDaAction(parent: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const bType = getValue(inputs.find(i => i.label === 'bType')!)!;
    const type =
      bType === 'Enum' || bType === 'Struct'
        ? getValue(inputs.find(i => i.label === 'type')!)
        : null;
    const sAddr = getValue(inputs.find(i => i.label === 'sAddr')!);
    const valKind =
      getValue(inputs.find(i => i.label === 'valKind')!) !== ''
        ? getValue(inputs.find(i => i.label === 'valKind')!)
        : null;
    const valImport =
      getValue(inputs.find(i => i.label === 'valImport')!) !== ''
        ? getValue(inputs.find(i => i.label === 'valImport')!)
        : null;

    const actions: EditorAction[] = [];

    const element = createElement(parent.ownerDocument, 'DA', {
      name,
      desc,
      bType,
      type,
      sAddr,
      valKind,
      valImport,
    });
    actions.push({
      new: {
        parent,
        element,
        reference: getReference(parent, <SCLTag>element.tagName),
      },
    });

    return actions;
  };
}

function dAWizard(options: WizardOptions): Wizard | undefined {
  const doc = (<UpdateOptions>options).doc
    ? (<UpdateOptions>options).doc
    : (<CreateOptions>options).parent.ownerDocument;
  const da =
    Array.from(
      doc.querySelectorAll(
        selector('DA', (<UpdateOptions>options).identity ?? NaN)
      )
    ).find(isPublic) ?? null;

  const [
    title,
    action,
    type,
    deleteButton,
    name,
    desc,
    bTypeList,
    sAddr,
    valKindList,
    valImportList,
    fcList,
  ] = da
    ? [
        get('da.wizard.title.edit'),
        updateDaAction(da),
        da.getAttribute('type'),
        html`<mwc-button
          icon="delete"
          trailingIcon
          label="${translate('delete')}"
          @click=${(e: MouseEvent) => {
            e.target!.dispatchEvent(newWizardEvent());
            e.target!.dispatchEvent(
              newActionEvent({
                old: {
                  parent: da.parentElement!,
                  element: da,
                  reference: da.nextElementSibling,
                },
              })
            );
          }}
          fullwidth
        ></mwc-button> `,
        da.getAttribute('name'),
        da.getAttribute('desc'),
        buildListFromStringArray(
          predefinedBasicTypeEnum,
          da.getAttribute('bType')
        ),
        da.getAttribute('sAddr'),
        buildListFromStringArray(valKindEnum, da.getAttribute('valKind')),
        buildListFromStringArray(
          [null, 'true', 'false'],
          da.getAttribute('valImport')
        ),
        buildListFromStringArray(
          functionalConstraintEnum,
          da.getAttribute('fc')
        ),
      ]
    : [
        get('da.wizard.title.add'),
        createDaAction((<CreateOptions>options).parent),
        null,
        html``,
        '',
        null,
        buildListFromStringArray(predefinedBasicTypeEnum, 'Struct'),
        null,
        buildListFromStringArray(valKindEnum, null),
        buildListFromStringArray([null, 'true', 'false'], null),
        buildListFromStringArray(functionalConstraintEnum, null),
      ];

  const types = Array.from(doc.querySelectorAll('DAType, EnumType'))
    .filter(isPublic)
    .filter(type => type.getAttribute('id'));

  return [
    {
      title,
      primary: { icon: '', label: get('save'), action: action },
      content: [
        deleteButton,
        html`<wizard-textfield
          label="name"
          .maybeValue=${name}
          helper="${translate('scl.name')}"
          required
          pattern="${patterns.alphanumeric}"
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
        html`<mwc-select
          fixedMenuPosition
          label="bType"
          helper="${translate('scl.bType')}"
          required
          @selected=${(e: SelectedEvent) => {
            const bTypeOriginal = da?.getAttribute('bType') ?? '';
            const bType = (<Select>e.target).selected!.value!;

            const typeUI = <Select>(
              (<Select>e.target).parentElement!.querySelector(
                'mwc-select[label="type"]'
              )!
            );

            Array.from(typeUI.children).forEach(child => {
              (<ListItem>child).disabled = !child.classList.contains(bType);
              (<ListItem>child).noninteractive =
                !child.classList.contains(bType);
              (<ListItem>child).style.display = !child.classList.contains(bType)
                ? 'none'
                : '';
              (<ListItem>child).selected =
                bTypeOriginal === bType
                  ? (<ListItem>child).value === type
                  : child.classList.contains(bType);
            });

            typeUI.disabled = !(bType === 'Enum' || bType === 'Struct');
            typeUI.requestUpdate();
          }}
          >${bTypeList}</mwc-select
        >`,
        html`<mwc-select
          fixedMenuPosition
          label="type"
          helper="${translate('scl.type')}"
          >${types.map(
            dataType =>
              html`<mwc-list-item
                class="${dataType.tagName === 'EnumType' ? 'Enum' : 'Struct'}"
                value=${dataType.id}
                ?selected=${dataType.id === type}
                >${dataType.id}</mwc-list-item
              >`
          )}</mwc-select
        >`,
        html`<wizard-textfield
          label="sAddr"
          helper="${translate('scl.sAddr')}"
          .maybeValue=${sAddr}
          nullable
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
        html`<mwc-select
          label="valKind"
          helper="${translate('scl.valKind')}"
          fixedMenuPosition
          >${valKindList}</mwc-select
        >`,
        html`<mwc-select
          fixedMenuPosition
          label="valImport"
          helper="${translate('scl.valImport')}"
          >${valImportList}</mwc-select
        >`,
        html`<mwc-select
          label="fc"
          helper="${translate('scl.fc')}"
          required
          fixedMenuPosition
          >${fcList}</mwc-select
        >`,
      ],
    },
  ];
}

function addPredefinedDOType(
  parent: Element,
  templates: XMLDocument
): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const id = getValue(inputs.find(i => i.label === 'id')!);

    if (!id) return [];

    const existId = Array.from(
      templates.querySelectorAll(allDataTypeSelector)
    ).some(type => type.getAttribute('id') === id);

    if (existId) return [];

    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const values = <Select>inputs.find(i => i.label === 'values');
    const selectedElement = values.selected
      ? templates.querySelector(`DOType[id="${values.selected.value}"]`)
      : null;
    const element = values.selected
      ? <Element>selectedElement!.cloneNode(true)
      : parent.ownerDocument.createElement('DOType');

    element.setAttribute('id', id);
    if (desc) element.setAttribute('desc', desc);

    const actions = [];

    if (selectedElement)
      addReferencedDataTypes(selectedElement, parent).forEach(action =>
        actions.push(action)
      );

    actions.push({
      new: {
        parent,
        element,
        reference: getReference(parent, <SCLTag>element.tagName),
      },
    });

    return actions;
  };
}

export function createDOTypeWizard(
  parent: Element,
  templates: Document
): Wizard {
  return [
    {
      title: get('dotype.wizard.title.add'),
      primary: {
        icon: 'add',
        label: get('add'),
        action: addPredefinedDOType(parent, templates),
      },
      content: [
        html`<mwc-select
          fixedMenuPosition
          outlined
          icon="playlist_add_check"
          label="values"
          helper="${translate('dotype.wizard.enums')}"
        >
          ${Array.from(templates.querySelectorAll('DOType')).map(
            datype =>
              html`<mwc-list-item
                graphic="icon"
                hasMeta
                value="${datype.getAttribute('id') ?? ''}"
                ><span
                  >${datype.getAttribute('id')?.replace('OpenSCD_', '')}</span
                >
                <span slot="meta"
                  >${datype.querySelectorAll('SDO,DA').length}</span
                >
              </mwc-list-item>`
          )}
        </mwc-select>`,
        html`<wizard-textfield
          label="id"
          helper="${translate('scl.id')}"
          .maybeValue=${''}
          required
          maxlength="127"
          minlength="1"
          pattern="${patterns.nmToken}"
          dialogInitialFocus
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="desc"
          helper="${translate('scl.desc')}"
          .maybeValue=${null}
          nullable
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
      ],
    },
  ];
}

function updateDOTypeAction(element: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const id = getValue(inputs.find(i => i.label === 'id')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const cdc = getValue(inputs.find(i => i.label === 'CDC')!)!;

    if (
      id === element.getAttribute('id') &&
      desc === element.getAttribute('desc') &&
      cdc == element.getAttribute('cdc')
    )
      return [];

    const newElement = <Element>element.cloneNode(false);
    newElement.setAttribute('id', id);
    if (desc === null) newElement.removeAttribute('desc');
    else newElement.setAttribute('desc', desc);
    newElement.setAttribute('cdc', cdc);

    return [{ old: { element }, new: { element: newElement } }];
  };
}

export function dOTypeWizard(
  dOTypeIdentity: string,
  doc: XMLDocument
): Wizard | undefined {
  const dotype = doc.querySelector(selector('DOType', dOTypeIdentity));
  if (!dotype) return undefined;

  return [
    {
      title: get('dotype.wizard.title.edit'),
      primary: {
        icon: '',
        label: get('save'),
        action: updateDOTypeAction(dotype),
      },
      content: [
        html`<mwc-button
          icon="delete"
          trailingIcon
          label="${translate('delete')}"
          @click=${(e: MouseEvent) => {
            e.target!.dispatchEvent(newWizardEvent());
            e.target!.dispatchEvent(
              newActionEvent({
                old: {
                  parent: dotype.parentElement!,
                  element: dotype,
                  reference: dotype.nextElementSibling,
                },
              })
            );
          }}
          fullwidth
        ></mwc-button> `,
        html`<wizard-textfield
          label="id"
          helper="${translate('scl.id')}"
          .maybeValue=${dotype.getAttribute('id')}
          required
          maxlength="127"
          minlength="1"
          pattern="${patterns.nmToken}"
          dialogInitialFocus
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="desc"
          helper="${translate('scl.desc')}"
          .maybeValue=${dotype.getAttribute('desc')}
          nullable
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="CDC"
          helper="${translate('scl.CDC')}"
          .maybeValue=${dotype.getAttribute('cdc')}
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
        html`<section>
          <mwc-button
            slot="graphic"
            icon="playlist_add"
            trailingIcon
            label="${translate('scl.DO')}"
            @click=${(e: Event) => {
              const wizard = sDOWizard({
                parent: dotype,
              });
              if (wizard) e.target!.dispatchEvent(newWizardEvent(wizard));
              e.target!.dispatchEvent(newWizardEvent());
            }}
          ></mwc-button>
          <mwc-button
            slot="graphic"
            icon="playlist_add"
            trailingIcon
            label="${translate('scl.DA')}"
            @click=${(e: Event) => {
              const wizard = dAWizard({
                parent: dotype,
              });
              if (wizard) e.target!.dispatchEvent(newWizardEvent(wizard));
              e.target!.dispatchEvent(newWizardEvent());
            }}
          ></mwc-button>
        </section>`,
        html`
          <mwc-list
            style="margin-top: 0px;"
            @selected=${(e: SingleSelectedEvent) => {
              const item = <ListItem>(<List>e.target).selected;

              const wizard = item.classList.contains('DA')
                ? dAWizard({
                    identity: item.value,
                    doc,
                  })
                : sDOWizard({
                    identity: item.value,
                    doc,
                  });

              if (wizard) e.target!.dispatchEvent(newWizardEvent(wizard));
              e.target!.dispatchEvent(newWizardEvent());
            }}
          >
            ${Array.from(dotype.querySelectorAll('SDO, DA')).map(
              daorsdo =>
                html`<mwc-list-item
                  twoline
                  tabindex="0"
                  class="${daorsdo.tagName === 'DA' ? 'DA' : 'SDO'}"
                  value="${identity(daorsdo)}"
                  ><span>${daorsdo.getAttribute('name')}</span
                  ><span slot="secondary"
                    >${daorsdo.tagName === 'SDO' ||
                    daorsdo.getAttribute('bType') === 'Enum' ||
                    daorsdo.getAttribute('bType') === 'Struct'
                      ? '#' + daorsdo.getAttribute('type')
                      : daorsdo.getAttribute('bType')}</span
                  ></mwc-list-item
                >`
            )}
          </mwc-list>
        `,
      ],
    },
  ];
}
