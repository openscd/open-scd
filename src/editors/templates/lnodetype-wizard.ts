import { html } from 'lit-element';
import { get, translate } from 'lit-translate';

import {
  Create,
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
  unifyCreateActionArray,
} from './foundation.js';

import { List } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { Select } from '@material/mwc-select';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';

interface UpdateOptions {
  identity: string | null;
  doc: XMLDocument;
}
interface CreateOptions {
  parent: Element;
}
export type WizardOptions = UpdateOptions | CreateOptions;

function updateDoAction(element: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const type = getValue(inputs.find(i => i.label === 'type')!)!;
    const accessControl = getValue(
      inputs.find(i => i.label === 'accessControl')!
    );
    const transient =
      getValue(inputs.find(i => i.label === 'transient')!) !== ''
        ? getValue(inputs.find(i => i.label === 'transient')!)
        : null;

    const actions: EditorAction[] = [];
    if (
      name === element.getAttribute('name') &&
      desc === element.getAttribute('desc') &&
      type === element.getAttribute('type') &&
      accessControl === element.getAttribute('accessControl') &&
      transient === element.getAttribute('transient')
    ) {
      return [];
    }

    const newElement = <Element>element.cloneNode(false);
    newElement.setAttribute('name', name);
    if (desc === null) newElement.removeAttribute('desc');
    else newElement.setAttribute('desc', desc);
    newElement.setAttribute('type', type);
    if (accessControl === null) newElement.removeAttribute('accessControl');
    else newElement.setAttribute('accessControl', accessControl);
    if (transient === null) newElement.removeAttribute('transient');
    else newElement.setAttribute('transient', transient);
    actions.push({
      old: { element },
      new: { element: newElement },
    });

    return actions;
  };
}

function createDoAction(parent: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const type = getValue(inputs.find(i => i.label === 'type')!);
    const accessControl = getValue(
      inputs.find(i => i.label === 'accessControl')!
    );
    const transient =
      getValue(inputs.find(i => i.label === 'transient')!) !== ''
        ? getValue(inputs.find(i => i.label === 'transient')!)
        : null;

    const actions: EditorAction[] = [];

    const element = createElement(parent.ownerDocument, 'DO', {
      name,
      desc,
      type,
      accessControl,
      transient,
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

function dOWizard(options: WizardOptions): Wizard | undefined {
  const doc = (<UpdateOptions>options).doc
    ? (<UpdateOptions>options).doc
    : (<CreateOptions>options).parent.ownerDocument;
  const DO =
    Array.from(
      doc.querySelectorAll(
        selector('DO', (<UpdateOptions>options).identity ?? NaN)
      )
    ).find(isPublic) ?? null;

  const [
    title,
    action,
    type,
    deleteButton,
    name,
    desc,
    accessControl,
    transientList,
  ] = DO
    ? [
        get('do.wizard.title.edit'),
        updateDoAction(DO),
        DO.getAttribute('type'),
        html`<mwc-button
          icon="delete"
          trailingIcon
          label="${translate('delete')}"
          @click=${(e: MouseEvent) => {
            e.target!.dispatchEvent(newWizardEvent());
            e.target!.dispatchEvent(
              newActionEvent({
                old: {
                  parent: DO.parentElement!,
                  element: DO,
                  reference: DO.nextElementSibling,
                },
              })
            );
          }}
          fullwidth
        ></mwc-button> `,
        DO.getAttribute('name'),
        DO.getAttribute('desc'),
        DO.getAttribute('accessControl'),
        buildListFromStringArray(
          [null, 'true', 'false'],
          DO.getAttribute('transient')
        ),
      ]
    : [
        get('do.wizard.title.add'),
        createDoAction((<CreateOptions>options).parent),
        null,
        html``,
        '',
        null,
        null,
        buildListFromStringArray([null, 'true', 'false'], null),
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
          pattern="${patterns.alphanumericFirstUpperCase}"
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
        html`<wizard-textfield
          label="accessControl"
          helper="${translate('scl.accessControl')}"
          .maybeValue=${accessControl}
          nullable
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
        html`<mwc-select
          fixedMenuPosition
          label="transient"
          helper="${translate('scl.transient')}"
          >${transientList}</mwc-select
        >`,
      ],
    },
  ];
}

function addPredefinedLNodeType(
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
      ? templates.querySelector(`LNodeType[id="${values.selected.value}"]`)
      : null;
    const element = values.selected
      ? <Element>selectedElement!.cloneNode(true)
      : parent.ownerDocument.createElement('LNodeType');

    element.setAttribute('id', id);
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

export function createLNodeTypeWizard(
  parent: Element,
  templates: Document
): Wizard {
  return [
    {
      title: get('lnodetype.wizard.title.add'),
      primary: {
        icon: 'add',
        label: get('add'),
        action: addPredefinedLNodeType(parent, templates),
      },
      content: [
        html`<mwc-select
          fixedMenuPosition
          outlined
          icon="playlist_add_check"
          label="values"
          helper="Default logical nodes"
        >
          ${Array.from(templates.querySelectorAll('LNodeType')).map(
            datype =>
              html`<mwc-list-item
                graphic="icon"
                hasMeta
                value="${datype.getAttribute('id') ?? ''}"
                ><span
                  >${datype.getAttribute('id')?.replace('OpenSCD_', '')}</span
                >
                <span slot="meta">${datype.querySelectorAll('DO').length}</span>
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

function updateLNodeTypeAction(element: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const id = getValue(inputs.find(i => i.label === 'id')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const lnClass = getValue(inputs.find(i => i.label === 'lnClass')!)!;

    if (
      id === element.getAttribute('id') &&
      desc === element.getAttribute('desc') &&
      lnClass == element.getAttribute('lnClass')
    )
      return [];

    const newElement = <Element>element.cloneNode(false);
    newElement.setAttribute('id', id);
    if (desc === null) newElement.removeAttribute('desc');
    else newElement.setAttribute('desc', desc);
    newElement.setAttribute('lnClass', lnClass);

    return [{ old: { element }, new: { element: newElement } }];
  };
}

export function lNodeTypeWizard(
  lNodeTypeIdentity: string,
  doc: XMLDocument
): Wizard | undefined {
  const lnodetype = doc.querySelector(selector('LNodeType', lNodeTypeIdentity));
  if (!lnodetype) return undefined;

  return [
    {
      title: get('lnodetype.wizard.title.edit'),
      primary: {
        icon: '',
        label: get('save'),
        action: updateLNodeTypeAction(lnodetype),
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
                  parent: lnodetype.parentElement!,
                  element: lnodetype,
                  reference: lnodetype.nextElementSibling,
                },
              })
            );
          }}
          fullwidth
        ></mwc-button> `,
        html`<wizard-textfield
          label="id"
          helper="${translate('scl.id')}"
          .maybeValue=${lnodetype.getAttribute('id')}
          required
          maxlength="127"
          minlength="1"
          pattern="${patterns.nmToken}"
          dialogInitialFocus
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="desc"
          helper="${translate('scl.desc')}"
          .maybeValue=${lnodetype.getAttribute('desc')}
          nullable
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="lnClass"
          helper="${translate('scl.lnClass')}"
          .maybeValue=${lnodetype.getAttribute('lnClass')}
          required
          pattern="${patterns.lnClass}"
        ></wizard-textfield>`,
        html` <mwc-button
          slot="graphic"
          icon="playlist_add"
          trailingIcon
          label="${translate('scl.DO')}"
          @click=${(e: Event) => {
            const wizard = dOWizard({
              parent: lnodetype,
            });
            if (wizard) e.target!.dispatchEvent(newWizardEvent(wizard));
            e.target!.dispatchEvent(newWizardEvent());
          }}
        ></mwc-button>`,
        html`
          <mwc-list
            style="margin-top: 0px;"
            @selected=${(e: SingleSelectedEvent) => {
              const wizard = dOWizard({
                identity: (<ListItem>(<List>e.target).selected).value,
                doc,
              });

              if (wizard) e.target!.dispatchEvent(newWizardEvent(wizard));
              e.target!.dispatchEvent(newWizardEvent());
            }}
          >
            ${Array.from(lnodetype.querySelectorAll('DO')).map(
              doelement =>
                html`<mwc-list-item
                  twoline
                  tabindex="0"
                  value="${identity(doelement)}"
                  ><span>${doelement.getAttribute('name')}</span
                  ><span slot="secondary"
                    >${'#' + doelement.getAttribute('type')}</span
                  ></mwc-list-item
                >`
            )}
          </mwc-list>
        `,
      ],
    },
  ];
}
