import { get, translate } from 'lit-translate';

import {
  Button,
  cloneElement,
  Create,
  createElement,
  EditorAction,
  getReference,
  getValue,
  html,
  identity,
  isPublic,
  ListItem,
  newActionEvent,
  newWizardEvent,
  SCLTag,
  Select,
  selector,
  Wizard,
  WizardActor,
  WizardInput,
} from '../../foundation.js';

import {
  addReferencedDataTypes,
  allDataTypeSelector,
  CreateOptions,
  unifyCreateActionArray,
  UpdateOptions,
  WizardOptions,
} from './foundation.js';

import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { List } from '@material/mwc-list';
import { createDaWizard, editDAWizard } from '../../wizards/da.js';
import { patterns } from '../../wizards/foundation/limits.js';
import { WizardTextField } from '../../wizard-textfield.js';

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

    const newElement = cloneElement(element, { name, desc, type });
    actions.push({ old: { element }, new: { element: newElement } });

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
        html`<${Button}
          icon="delete"
          trailingIcon
          label="${translate('remove')}"
          @click=${(e: MouseEvent) => {
            e.target!.dispatchEvent(newWizardEvent());
            e.target!.dispatchEvent(
              newActionEvent({
                old: {
                  parent: sdo.parentElement!,
                  element: sdo,
                  reference: sdo.nextSibling,
                },
              })
            );
          }}
          fullwidth
        ></${Button}> `,
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
      element: sdo ?? undefined,
      primary: { icon: '', label: get('save'), action },
      content: [
        deleteButton,
        html`<${WizardTextField}
          label="name"
          .maybeValue=${name}
          helper="${translate('scl.name')}"
          required
          pattern="${patterns.tRestrName1stL}"
          dialogInitialFocus
        >
          ></${WizardTextField}
        >`,
        html`<${WizardTextField}
          label="desc"
          helper="${translate('scl.desc')}"
          .maybeValue=${desc}
          nullable
          pattern="${patterns.normalizedString}"
        ></${WizardTextField}>`,
        html`<${Select}
          fixedMenuPosition
          label="type"
          required
          helper="${translate('scl.type')}"
          >${types.map(
            dataType =>
              html`<${ListItem}
                value=${dataType.id}
                ?selected=${dataType.id === type}
                >${dataType.id}</${ListItem}
              >`
          )}</${Select}
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
    const cdc = getValue(inputs.find(i => i.label === 'cdc')!)!;

    const values = <Select>inputs.find(i => i.label === 'values');
    const selectedElement = values.selected
      ? templates.querySelector(`DOType[id="${values.selected.value}"]`)
      : null;
    const element = values.selected
      ? <Element>selectedElement!.cloneNode(true)
      : parent.ownerDocument.createElement('DOType');

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
        reference: getReference(parent, <SCLTag>element.tagName),
      },
    });

    return unifyCreateActionArray(actions);
  };
}

function onSelectTemplateDOType(e: Event, templates: Document): void {
  const cdcUI = <Select>(
    (<Select>e.target).parentElement!.querySelector(
      'wizard-text-field[label="cdc"]'
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
        html`<${Select}
          fixedMenuPosition
          outlined
          icon="playlist_add_check"
          label="values"
          helper="${translate('dotype.wizard.enums')}"
          @selected=${(e: Event) => onSelectTemplateDOType(e, templates)}
        >
          ${Array.from(templates.querySelectorAll('DOType')).map(
            datype =>
              html`<${ListItem}
                graphic="icon"
                hasMeta
                value="${datype.getAttribute('id') ?? ''}"
                ><span
                  >${datype.getAttribute('id')?.replace('OpenSCD_', '')}</span
                >
                <span slot="meta"
                  >${datype.querySelectorAll('SDO,DA').length}</span
                >
              </${ListItem}>`
          )}
        </${Select}>`,
        html`<${WizardTextField}
          label="id"
          helper="${translate('scl.id')}"
          .maybeValue=${''}
          required
          maxlength="127"
          minlength="1"
          pattern="${patterns.nmToken}"
          dialogInitialFocus
        ></${WizardTextField}>`,
        html`<${WizardTextField}
          label="desc"
          helper="${translate('scl.desc')}"
          .maybeValue=${null}
          nullable
          pattern="${patterns.normalizedString}"
        ></${WizardTextField}>`,
        html`<${WizardTextField}
          label="cdc"
          helper="${translate('scl.cdc')}"
          required
          pattern="${patterns.cdc}"
        ></${WizardTextField}>`,
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

    const newElement = cloneElement(element, { id, desc, cdc });

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
      element: dotype,
      primary: {
        icon: '',
        label: get('save'),
        action: updateDOTypeAction(dotype),
      },
      content: [
        html`<${Button}
          icon="delete"
          trailingIcon
          label="${translate('remove')}"
          @click=${(e: MouseEvent) => {
            e.target!.dispatchEvent(newWizardEvent());
            e.target!.dispatchEvent(
              newActionEvent({
                old: {
                  parent: dotype.parentElement!,
                  element: dotype,
                  reference: dotype.nextSibling,
                },
              })
            );
          }}
          fullwidth
        ></${Button}> `,
        html`<${WizardTextField}
          label="id"
          helper="${translate('scl.id')}"
          .maybeValue=${dotype.getAttribute('id')}
          required
          maxlength="127"
          minlength="1"
          pattern="${patterns.nmToken}"
          dialogInitialFocus
        ></${WizardTextField}>`,
        html`<${WizardTextField}
          label="desc"
          helper="${translate('scl.desc')}"
          .maybeValue=${dotype.getAttribute('desc')}
          nullable
          pattern="${patterns.normalizedString}"
        ></${WizardTextField}>`,
        html`<${WizardTextField}
          label="CDC"
          helper="${translate('scl.CDC')}"
          .maybeValue=${dotype.getAttribute('cdc')}
          pattern="${patterns.normalizedString}"
        ></${WizardTextField}>`,
        html`<section>
          <${Button}
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
          ></${Button}>
          <${Button}
            slot="graphic"
            icon="playlist_add"
            trailingIcon
            label="${translate('scl.DA')}"
            @click=${(e: Event) => {
              if (dotype)
                e.target!.dispatchEvent(newWizardEvent(createDaWizard(dotype)));
              e.target!.dispatchEvent(newWizardEvent());
            }}
          ></${Button}>
        </section>`,
        html`
          <mwc-list
            style="margin-top: 0px;"
            @selected=${(e: SingleSelectedEvent) => {
              const item = <ListItem>(<List>e.target).selected;

              const daIdentity = (<ListItem>(<List>e.target).selected).value;
              const da = doc.querySelector(selector('DA', daIdentity));

              const wizard = item.classList.contains('DA')
                ? da
                  ? editDAWizard(da)
                  : undefined
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
                html`<${ListItem}
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
                  ></${ListItem}
                >`
            )}
          </mwc-list>
        `,
      ],
    },
  ];
}
