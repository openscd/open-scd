import { Select } from '@material/mwc-select';
import { html } from 'lit-element';
import { get, translate } from 'lit-translate';
import {
  Create,
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
import { addReferencedDataTypes, allDataTypeSelector } from './foundation.js';

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
      addReferencedDataTypes(selectedElement, parent, actions).forEach(action =>
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
      title: get('dotype.wizard.title.edit'),
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
        ></mwc-button>`,
        html`
          <mwc-list style="margin-top: 0px;">
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
