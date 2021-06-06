import { html } from 'lit-html';
import { get, translate } from 'lit-translate';

import {
  EditorAction,
  getReference,
  getValue,
  identity,
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
  updateIDNamingAction,
} from './foundation.js';

import { Select } from '@material/mwc-select';

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
          helper="Default enumerations"
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
          ></mwc-button>
          <mwc-button
            slot="graphic"
            icon="playlist_add"
            trailingIcon
            label="${translate('scl.DA')}"
          ></mwc-button>
        </section>`,
        html`
          <mwc-list style="margin-top: 0px;">
            ${Array.from(dotype.querySelectorAll('SDO, DA')).map(
              daorsdo =>
                html`<mwc-list-item
                  twoline
                  tabindex="0"
                  value="${identity(daorsdo)}"
                  ><span>${daorsdo.getAttribute('name')}</span
                  ><span slot="secondary"
                    >${daorsdo.getAttribute('bType') === 'Enum' ||
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
