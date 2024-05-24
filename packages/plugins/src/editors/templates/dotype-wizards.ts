import { html } from 'lit-html';
import { get } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import { Select } from '@material/mwc-select';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { List } from '@material/mwc-list';

import '@openscd/open-scd/src/wizard-textfield.js';
import {
  find,
  getValue,
  identity,
  isPublic,
  newSubWizardEvent,
  newWizardEvent,
  Wizard,
  WizardActor,
  WizardInputElement,
  WizardMenuActor,
} from '@openscd/open-scd/src/foundation.js';

import { cloneElement, createElement } from '@openscd/xml';

import {
  Create,
  EditorAction,
  newActionEvent,
  Replace,
} from '@openscd/core/foundation/deprecated/editor.js';
import { createDaWizard, editDAWizard } from '../../wizards/da.js';
import { patterns } from '../../wizards/foundation/limits.js';
import {
  addReferencedDataTypes,
  allDataTypeSelector,
  CreateOptions,
  unifyCreateActionArray,
  UpdateOptions,
  WizardOptions,
} from './foundation.js';

function remove(element: Element): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(
      newActionEvent({ old: { parent: element.parentElement!, element } })
    );
    wizard.dispatchEvent(newWizardEvent());
  };
}

function updateSDoAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
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

    const newElement = cloneElement(element, { name, desc, type });
    actions.push({ old: { element }, new: { element: newElement } });

    return actions;
  };
}

function createSDoAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
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
      },
    });

    return actions;
  };
}

function sDOWizard(options: WizardOptions): Wizard | undefined {
  const doc = (<UpdateOptions>options).doc
    ? (<UpdateOptions>options).doc
    : (<CreateOptions>options).parent.ownerDocument;
  const sdo = find(doc, 'SDO', (<UpdateOptions>options).identity ?? NaN);

  const [title, action, type, menuActions, name, desc] = sdo
    ? [
        get('sdo.wizard.title.edit'),
        updateSDoAction(sdo),
        sdo.getAttribute('type'),
        [{ icon: 'delete', label: get('remove'), action: remove(sdo) }],
        sdo.getAttribute('name'),
        sdo.getAttribute('desc'),
      ]
    : [
        get('sdo.wizard.title.add'),
        createSDoAction((<CreateOptions>options).parent),
        null,
        undefined,
        '',
        null,
      ];

  const types = Array.from(doc.querySelectorAll('DOType'))
    .filter(isPublic)
    .filter(type => type.getAttribute('id'));

  return [
    {
      title,
      element: sdo ?? undefined,
      primary: { icon: '', label: get('save'), action },
      menuActions,
      content: [
        html`<wizard-textfield
          label="name"
          .maybeValue=${name}
          helper="${get('scl.name')}"
          required
          pattern="${patterns.tRestrName1stL}"
          dialogInitialFocus
        >
          ></wizard-textfield
        >`,
        html`<wizard-textfield
          label="desc"
          helper="${get('scl.desc')}"
          .maybeValue=${desc}
          nullable
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
        html`<mwc-select
          fixedMenuPosition
          label="type"
          required
          helper="${get('scl.type')}"
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

function addPredefinedDOType(
  parent: Element,
  templates: XMLDocument
): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const id = getValue(inputs.find(i => i.label === 'id')!);

    if (!id) return [];

    const existId = Array.from(
      templates.querySelectorAll(allDataTypeSelector)
    ).some(type => type.getAttribute('id') === id);

    if (existId) return [];

    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const cdc = getValue(inputs.find(i => i.label === 'cdc')!)!;

    const values = <Select>inputs.find(i => i.label === 'values');
    const selectedElement = values.selected
      ? templates.querySelector(`DOType[id="${values.selected.value}"]`)
      : null;
    const element = values.selected
      ? <Element>selectedElement!.cloneNode(true)
      : createElement(parent.ownerDocument, 'DOType', {});

    element.setAttribute('id', id);
    element.setAttribute('cdc', cdc);
    if (desc) element.setAttribute('desc', desc);

    const actions: Create[] = [];

    if (selectedElement)
      addReferencedDataTypes(selectedElement, parent).forEach(action =>
        actions.push(action)
      );

    actions.push({
      new: {
        parent,
        element,
      },
    });

    return unifyCreateActionArray(actions);
  };
}

function onSelectTemplateDOType(e: Event, templates: Document): void {
  const cdcUI = <Select>(
    (<Select>e.target).parentElement!.querySelector(
      'wizard-textfield[label="cdc"]'
    )!
  );

  const doTypeId = (<Select>e.target).value;
  const cdc =
    templates.querySelector(`DOType[id="${doTypeId}"]`)?.getAttribute('cdc') ??
    null;

  if (cdc) cdcUI.value = cdc;
  cdcUI.disabled = true;
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
          helper="${get('dotype.wizard.enums')}"
          @selected=${(e: Event) => onSelectTemplateDOType(e, templates)}
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
          helper="${get('scl.id')}"
          .maybeValue=${''}
          required
          maxlength="127"
          minlength="1"
          pattern="${patterns.nmToken}"
          dialogInitialFocus
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="desc"
          helper="${get('scl.desc')}"
          .maybeValue=${null}
          nullable
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="cdc"
          helper="${get('scl.CDC')}"
          required
          pattern="${patterns.cdc}"
        ></wizard-textfield>`,
      ],
    },
  ];
}

function openAddSdo(parent: Element): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(newSubWizardEvent(() => sDOWizard({ parent })!));
  };
}

function openAddDa(parent: Element): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(newSubWizardEvent(() => createDaWizard(parent)!));
  };
}

function updateDOTypeAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const id = getValue(inputs.find(i => i.label === 'id')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const cdc = getValue(inputs.find(i => i.label === 'CDC')!)!;

    if (
      id === element.getAttribute('id') &&
      desc === element.getAttribute('desc') &&
      cdc == element.getAttribute('cdc')
    )
      return [];

    const newElement = cloneElement(element, { id, desc, cdc });

    const actions: Replace[] = [];
    actions.push({ old: { element }, new: { element: newElement } });

    const oldId = element.getAttribute('id')!;
    Array.from(
      element.ownerDocument.querySelectorAll(
        `LNodeType > DO[type="${oldId}"], DOType > SDO[type="${oldId}"]`
      )
    ).forEach(oldDo => {
      const newDo = <Element>oldDo.cloneNode(false);
      newDo.setAttribute('type', id);

      actions.push({ old: { element: oldDo }, new: { element: newDo } });
    });

    return [
      { title: get('dotype.action.edit', { oldId, newId: id }), actions },
    ];
  };
}

export function dOTypeWizard(
  dOTypeIdentity: string,
  doc: XMLDocument
): Wizard | undefined {
  const dotype = find(doc, 'DOType', dOTypeIdentity);
  if (!dotype) return undefined;

  return [
    {
      title: get('dotype.wizard.title.edit'),
      element: dotype,
      primary: {
        icon: '',
        label: get('save'),
        action: updateDOTypeAction(dotype),
      },
      menuActions: [
        {
          label: get('remove'),
          icon: 'delete',
          action: remove(dotype),
        },
        {
          label: get('scl.DO'),
          icon: 'playlist_add',
          action: openAddSdo(dotype),
        },
        {
          label: get('scl.DA'),
          icon: 'playlist_add',
          action: openAddDa(dotype),
        },
      ],
      content: [
        html`<wizard-textfield
          label="id"
          helper="${get('scl.id')}"
          .maybeValue=${dotype.getAttribute('id')}
          required
          maxlength="127"
          minlength="1"
          pattern="${patterns.nmToken}"
          dialogInitialFocus
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="desc"
          helper="${get('scl.desc')}"
          .maybeValue=${dotype.getAttribute('desc')}
          nullable
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="CDC"
          helper="${get('scl.CDC')}"
          .maybeValue=${dotype.getAttribute('cdc')}
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
        html`
          <mwc-list
            style="margin-top: 0px;"
            @selected=${(e: SingleSelectedEvent) => {
              const item = <ListItem>(<List>e.target).selected;

              const daIdentity = (<ListItem>(<List>e.target).selected).value;
              const da = find(doc, 'DA', daIdentity);

              const wizard = item.classList.contains('DA')
                ? da
                  ? editDAWizard(da)
                  : undefined
                : sDOWizard({
                    identity: item.value,
                    doc,
                  });

              if (wizard) e.target!.dispatchEvent(newSubWizardEvent(wizard));
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
