import { html } from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import { List } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { Select } from '@material/mwc-select';

import '@openscd/open-scd/src/wizard-textfield.js';
import {
  find,
  getValue,
  identity,
  newSubWizardEvent,
  newWizardEvent,
  patterns,
  Wizard,
  WizardActor,
  WizardInputElement,
  WizardMenuActor,
} from '@openscd/open-scd/src/foundation.js';

import { cloneElement, createElement } from '@openscd/xml';

import {
  EditorAction,
  newActionEvent,
  Replace,
} from '@openscd/core/foundation/deprecated/editor.js';
import { CreateOptions, UpdateOptions, WizardOptions } from './foundation.js';

function remove(element: Element): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(
      newActionEvent({ old: { parent: element.parentElement!, element } })
    );
    wizard.dispatchEvent(newWizardEvent());
  };
}

function nextOrd(parent: Element): string {
  const maxOrd = Math.max(
    ...Array.from(parent.children).map(child =>
      parseInt(child.getAttribute('ord') ?? '-2', 10)
    )
  );
  return isFinite(maxOrd) ? (maxOrd + 1).toString(10) : '0';
}

function createEnumValAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const value = getValue(inputs.find(i => i.label === 'value')!);
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const ord =
      getValue(inputs.find(i => i.label === 'ord')!) || nextOrd(parent);

    const element = createElement(parent.ownerDocument, 'EnumVal', {
      ord,
      desc,
    });

    element.textContent = value;

    const action = {
      new: {
        parent,
        element,
      },
    };

    return [action];
  };
}

function updateEnumValAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const value = getValue(inputs.find(i => i.label === 'value')!) ?? '';
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const ord =
      getValue(inputs.find(i => i.label === 'ord')!) ||
      element.getAttribute('ord') ||
      nextOrd(element.parentElement!);

    if (
      value === element.textContent &&
      desc === element.getAttribute('desc') &&
      ord === element.getAttribute('ord')
    )
      return [];

    const newElement = cloneElement(element, { desc, ord });
    newElement.textContent = value;

    return [{ old: { element }, new: { element: newElement } }];
  };
}

function eNumValWizard(options: WizardOptions): Wizard {
  const doc = (<UpdateOptions>options).doc
    ? (<UpdateOptions>options).doc
    : (<CreateOptions>options).parent.ownerDocument;
  const enumval = find(
    doc,
    'EnumVal',
    (<UpdateOptions>options).identity ?? NaN
  );

  const [title, action, ord, desc, value, menuActions] = enumval
    ? [
        get('enum-val.wizard.title.edit'),
        updateEnumValAction(enumval),
        enumval.getAttribute('ord'),
        enumval.getAttribute('desc'),
        enumval.textContent,
        [
          {
            icon: 'delete',
            label: get('remove'),
            action: remove(enumval),
          },
        ],
      ]
    : [
        get('enum-val.wizard.title.add'),
        createEnumValAction((<CreateOptions>options).parent),
        nextOrd((<CreateOptions>options).parent),
        null, // desc is uncommon on EnumVal
        '',
        undefined,
      ];

  return [
    {
      title,
      element: enumval ?? undefined,
      primary: {
        icon: '',
        label: 'Save',
        action: action,
      },
      menuActions,
      content: [
        html`<wizard-textfield
          label="ord"
          helper="${get('scl.ord')}"
          .maybeValue=${ord}
          required
          type="number"
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="value"
          helper="${get('scl.value')}"
          .maybeValue=${value}
          pattern="${patterns.normalizedString}"
          dialogInitialFocus
        ></wizard-textfield>`,
        html`<wizard-textfield
          id="evDesc"
          label="desc"
          helper="${get('scl.desc')}"
          .maybeValue=${desc}
          nullable
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
      ],
    },
  ];
}

function createAction(parent: Element, templates: XMLDocument): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const id = getValue(inputs.find(i => i.label === 'id')!);

    if (!id) return [];

    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const values = <Select>inputs.find(i => i.label === 'values');
    const element = values.selected
      ? <Element>(
          templates
            .querySelector(`EnumType[id="${values.selected.value}"]`)!
            .cloneNode(true)
        )
      : createElement(parent.ownerDocument, 'EnumType', {});

    element.setAttribute('id', id);
    if (desc) element.setAttribute('desc', desc);

    const action = {
      new: {
        parent,
        element,
      },
    };

    return [action];
  };
}

export function createEnumTypeWizard(
  parent: Element,
  templates: Document
): Wizard {
  return [
    {
      title: get('enum.wizard.title.add'),
      primary: {
        icon: 'add',
        label: get('add'),
        action: createAction(parent, templates),
      },
      content: [
        html`<mwc-select
          style="--mdc-menu-max-height: 196px;"
          outlined
          icon="playlist_add_check"
          label="values"
          helper="Default enumerations"
        >
          ${Array.from(templates.querySelectorAll('EnumType')).map(
            e =>
              html`<mwc-list-item
                graphic="icon"
                hasMeta
                value="${e.getAttribute('id') ?? ''}"
                ><span>${e.getAttribute('id')}</span>
                <span slot="meta">${e.querySelectorAll('EnumVal').length}</span>
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
      ],
    },
  ];
}

function openAddEnumVal(parent: Element): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(newSubWizardEvent(() => eNumValWizard({ parent })));
  };
}

function updateEnumTpyeAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const id = getValue(inputs.find(i => i.label === 'id')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);

    if (
      id === element.getAttribute('id') &&
      desc === element.getAttribute('desc')
    )
      return [];

    const newElement = cloneElement(element, { id, desc });

    const actions: Replace[] = [];
    actions.push({ old: { element }, new: { element: newElement } });

    const oldId = element.getAttribute('id')!;
    Array.from(
      element.ownerDocument.querySelectorAll(
        `DOType > DA[type="${oldId}"], DAType > BDA[type="${oldId}"]`
      )
    ).forEach(oldDa => {
      const newDa = <Element>oldDa.cloneNode(false);
      newDa.setAttribute('type', id);

      actions.push({ old: { element: oldDa }, new: { element: newDa } });
    });

    return [{ title: get('enum.action.edit', { oldId, newId: id }), actions }];
  };
}

export function eNumTypeEditWizard(
  eNumTypeIdentity: string,
  doc: XMLDocument
): Wizard | undefined {
  const enumtype = find(doc, 'EnumType', eNumTypeIdentity);
  if (!enumtype) return undefined;

  return [
    {
      title: get('enum.wizard.title.edit'),
      element: enumtype,
      primary: {
        icon: '',
        label: get('save'),
        action: updateEnumTpyeAction(enumtype),
      },
      menuActions: [
        {
          label: get('remove'),
          icon: 'delete',
          action: remove(enumtype),
        },
        {
          label: get('scl.EnumVal'),
          icon: 'playlist_add',
          action: openAddEnumVal(enumtype),
        },
      ],
      content: [
        html`<wizard-textfield
          label="id"
          helper="${get('scl.id')}"
          .maybeValue=${enumtype.getAttribute('id')}
          required
          maxlength="127"
          minlength="1"
          pattern="${patterns.nmToken}"
          dialogInitialFocus
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="desc"
          helper="${get('scl.desc')}"
          .maybeValue=${enumtype.getAttribute('desc')}
          nullable
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
        html`<mwc-list
          style="margin-top: 0px;"
          @selected=${(e: SingleSelectedEvent) => {
            const wizard = eNumValWizard({
              identity: (<ListItem>(<List>e.target).selected).value,
              doc,
            });
            if (wizard) e.target!.dispatchEvent(newSubWizardEvent(wizard));
          }}
          >${Array.from(enumtype.querySelectorAll('EnumVal')).map(
            enumval =>
              html`<mwc-list-item
                graphic="icon"
                hasMeta
                tabindex="0"
                value="${identity(enumval)}"
              >
                <span>${enumval.textContent ?? ''}</span>
                <span slot="graphic"
                  >${enumval.getAttribute('ord') ?? '-1'}</span
                >
              </mwc-list-item>`
          )}</mwc-list
        > `,
      ],
    },
  ];
}
