import { html } from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-select';
import { List } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { Select } from '@material/mwc-select';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';

import '@openscd/open-scd/src/wizard-checkbox.js';
import '@openscd/open-scd/src/wizard-textfield.js';
import '@openscd/open-scd/src/wizard-select.js';
import {
  find,
  getValue,
  identity,
  isPublic,
  newSubWizardEvent,
  newWizardEvent,
  patterns,
  Wizard,
  WizardActor,
  WizardInputElement,
  WizardMenuActor,
} from '@openscd/open-scd/src/foundation.js';

import {
  cloneElement,
  createElement,
  getChildElementsByTagName,
} from '@openscd/xml';

import {
  Create,
  EditorAction,
  newActionEvent,
  Replace,
} from '@openscd/core/foundation/deprecated/editor.js';
import { WizardSelect } from '@openscd/open-scd/src/wizard-select.js';
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

function openAddDo(parent: Element): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(newSubWizardEvent(() => dOWizard({ parent })!));
  };
}

function updateDoAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
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

    if (
      name === element.getAttribute('name') &&
      desc === element.getAttribute('desc') &&
      type === element.getAttribute('type') &&
      accessControl === element.getAttribute('accessControl') &&
      transient === element.getAttribute('transient')
    ) {
      return [];
    }

    const newElement = cloneElement(element, {
      name,
      desc,
      type,
      accessControl,
      transient,
    });

    return [{ old: { element }, new: { element: newElement } }];
  };
}

function createDoAction(parent: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
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
      },
    });

    return actions;
  };
}

function dOWizard(options: WizardOptions): Wizard | undefined {
  const doc = (<UpdateOptions>options).doc
    ? (<UpdateOptions>options).doc
    : (<CreateOptions>options).parent.ownerDocument;
  const DO = find(doc, 'DO', (<UpdateOptions>options).identity ?? NaN);

  const [
    title,
    action,
    type,
    menuActions,
    name,
    desc,
    accessControl,
    transient,
  ] = DO
    ? [
        get('do.wizard.title.edit'),
        updateDoAction(DO),
        DO.getAttribute('type'),
        [
          {
            icon: 'delete',
            label: get('remove'),
            action: remove(DO),
          },
        ],
        DO.getAttribute('name'),
        DO.getAttribute('desc'),
        DO.getAttribute('accessControl'),
        DO.getAttribute('transient'),
      ]
    : [
        get('do.wizard.title.add'),
        createDoAction((<CreateOptions>options).parent),
        null,
        undefined,
        '',
        null,
        null,
        null,
      ];

  const types = Array.from(doc.querySelectorAll('DOType'))
    .filter(isPublic)
    .filter(type => type.getAttribute('id'));

  return [
    {
      title,
      element: DO ?? undefined,
      primary: { icon: '', label: get('save'), action },
      menuActions,
      content: [
        html`<wizard-textfield
          label="name"
          .maybeValue=${name}
          helper="${get('scl.name')}"
          required
          pattern="${patterns.alphanumericFirstUpperCase}"
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
        html`<wizard-textfield
          label="accessControl"
          helper="${get('scl.accessControl')}"
          .maybeValue=${accessControl}
          nullable
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
        html`<wizard-checkbox
          label="transient"
          .maybeValue="${transient}"
          helper="${get('scl.transient')}"
          nullable
        ></wizard-checkbox>`,
      ],
    },
  ];
}

function getDescendantClasses(
  nsd74: XMLDocument,
  base: string,
  otherNsd?: XMLDocument
): Element[] {
  if (base === '') return [];

  const currentNsd =
    !otherNsd ||
    nsd74.querySelector(
      `LNClass[name="${base}"], AbstractLNClass[name="${base}"]`
    )
      ? nsd74
      : otherNsd;

  const descendants = Array.from(
    nsd74.querySelectorAll(
      `LNClass[name="${base}"], AbstractLNClass[name="${base}"]`
    )
  );

  const otherDescendants = Array.from(
    otherNsd?.querySelectorAll(
      `LNClass[name="${base}"], AbstractLNClass[name="${base}"]`
    ) ?? []
  );

  const parentDescendants = getDescendantClasses(
    nsd74,
    currentNsd
      .querySelector(`LNClass[name="${base}"], AbstractLNClass[name="${base}"]`)
      ?.getAttribute('base') ?? '',
    otherNsd
  );
  return parentDescendants.concat(descendants, otherDescendants);
}

function getAllDataObjects(
  nsd74: XMLDocument,
  base: string,
  nsd7420?: XMLDocument
): Element[] {
  const lnodeclasses = getDescendantClasses(nsd74, base, nsd7420);

  return lnodeclasses.flatMap(lnodeclass =>
    Array.from(lnodeclass.querySelectorAll('DataObject'))
  );
}

function createNewLNodeType(parent: Element, element: Element): WizardActor {
  return (_: WizardInputElement[], wizard: Element): EditorAction[] => {
    const selected = Array.from(
      wizard.shadowRoot!.querySelectorAll<WizardSelect>('wizard-select')
    ).filter(select => select.maybeValue);

    const actions: Create[] = [];

    selected.forEach(select => {
      const DO = createElement(parent.ownerDocument, 'DO', {
        name: select.label,
        type: select.value,
      });

      actions.push({
        new: {
          parent: element,
          element: DO,
        },
      });
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

function doComparator(name: string) {
  return (a: Element, b: Element) => {
    const idA = a.getAttribute('id') ?? '';
    const idB = b.getAttribute('id') ?? '';

    const aHasName = idA.includes(name);
    const bHasName = idB.includes(name);

    if (!aHasName && bHasName) return 1;
    if (aHasName && !bHasName) return -1;

    return idA.localeCompare(idB);
  };
}

function createLNodeTypeHelperWizard(
  parent: Element,
  element: Element,
  allDo: Element[]
): Wizard {
  return [
    {
      title: get('lnodetype.wizard.title.select'),
      primary: {
        label: get('save'),
        icon: '',
        action: createNewLNodeType(parent, element),
      },
      content: allDo.map(DO => {
        const presCond = DO.getAttribute('presCond');
        const name = DO.getAttribute('name') ?? '';
        const validDOTypes = Array.from(
          parent
            .closest('DataTypeTemplates')!
            .querySelectorAll(`DOType[cdc="${DO.getAttribute('type')}"]`)
        ).sort(doComparator(name));

        return html`<wizard-select
          fixedMenuPosition
          naturalMenuWidth
          label="${name}"
          ?required=${presCond === 'M'}
          ?nullable=${presCond !== 'M'}
          .maybeValue=${null}
          >${validDOTypes.map(
            doType =>
              html`<mwc-list-item value="${doType.getAttribute('id')!}"
                >${doType.getAttribute('id')}</mwc-list-item
              >`
          )}</wizard-select
        >`;
      }),
    },
  ];
}

function addPredefinedLNodeType(
  parent: Element,
  newLNodeType: Element,
  templateLNodeType: Element
): Create[] {
  const actions: Create[] = [];
  addReferencedDataTypes(templateLNodeType, parent).forEach(action =>
    actions.push(action)
  );

  actions.push({
    new: {
      parent,
      element: newLNodeType,
    },
  });

  return unifyCreateActionArray(actions);
}

function startLNodeTypeCreate(
  parent: Element,
  templates: XMLDocument,
  nsd74: XMLDocument,
  nsd7420: XMLDocument
): WizardActor {
  return (inputs: WizardInputElement[], wizard: Element): EditorAction[] => {
    const id = getValue(inputs.find(i => i.label === 'id')!);
    if (!id) return [];

    const existId = Array.from(
      templates.querySelectorAll(allDataTypeSelector)
    ).some(type => type.getAttribute('id') === id);
    if (existId) return [];

    const desc = getValue(inputs.find(i => i.label === 'desc')!);

    const value = (<Select>inputs.find(i => i.label === 'lnClass'))?.selected
      ?.value;
    const templateLNodeType = value
      ? find(templates, 'LNodeType', value)
      : null;

    const newLNodeType = templateLNodeType
      ? <Element>templateLNodeType!.cloneNode(true)
      : createElement(parent.ownerDocument, 'LNodeType', {
          lnClass: value ?? '',
        });

    newLNodeType.setAttribute('id', id);
    if (desc) newLNodeType.setAttribute('desc', desc);

    if (templateLNodeType)
      return addPredefinedLNodeType(parent, newLNodeType, templateLNodeType);

    const allDo = getAllDataObjects(nsd74, value!, nsd7420);
    wizard.dispatchEvent(
      newWizardEvent(createLNodeTypeHelperWizard(parent, newLNodeType, allDo))
    );

    wizard.dispatchEvent(newWizardEvent());
    return [];
  };
}

function onLnClassChange(e: Event, templates: XMLDocument): void {
  const identity = (<Select>e.target).selected?.value;
  const lnodetype = identity ? find(templates, 'LNodeType', identity) : null;

  const primaryAction =
    (<Element>e.target)
      ?.closest('mwc-dialog')
      ?.querySelector('mwc-button[slot="primaryAction"]') ?? null;

  if (lnodetype) {
    primaryAction?.setAttribute('label', get('save'));
    primaryAction?.setAttribute('icon', 'save');
  } else {
    primaryAction?.setAttribute('label', get('next') + '...');
    primaryAction?.setAttribute('icon', '');
  }
}

export function createLNodeTypeWizard(
  parent: Element,
  templates: Document,
  nsd74: XMLDocument,
  nsd7420: XMLDocument
): Wizard {
  return [
    {
      title: get('lnodetype.wizard.title.add'),
      primary: {
        icon: '',
        label: get('next') + '...',
        action: startLNodeTypeCreate(parent, templates, nsd74, nsd7420),
      },
      content: [
        html`<mwc-select
          id="lnclassnamelist"
          fixedMenuPosition
          outlined
          icon="playlist_add_check"
          label="lnClass"
          helper="Default logical nodes"
          required
          dialogInitialFocus
          @selected=${(e: Event) => onLnClassChange(e, templates)}
        >
          <mwc-list-item noninteractive
            >Pre-defined lnClasses from templates</mwc-list-item
          >
          <li divider role="separator"></li>
          ${Array.from(templates.querySelectorAll('LNodeType')).map(
            lnodetpye => {
              const lnClass = lnodetpye.getAttribute('lnClass') ?? '';
              const desc = lnodetpye.getAttribute('desc') ?? '';

              return html`<mwc-list-item
                twoline
                style="min-width:200px"
                graphic="icon"
                hasMeta
                value="${identity(lnodetpye)}"
                ><span>${lnClass}</span>
                <span slot="secondary">${desc}</span>
                <span slot="meta"
                  >${getChildElementsByTagName(lnodetpye, 'DO').length}</span
                >
              </mwc-list-item>`;
            }
          )}
          <mwc-list-item noninteractive
            >Empty lnClasses from IEC 61850-7-4</mwc-list-item
          >
          <li divider role="separator"></li>
          ${Array.from(nsd74.querySelectorAll('LNClasses > LNClass')).map(
            lnClass => {
              const className = lnClass.getAttribute('name') ?? '';
              return html`<mwc-list-item
                style="min-width:200px"
                graphic="icon"
                hasMeta
                value="${className}"
                ><span>${className}</span>
                <span slot="meta"
                  >${getAllDataObjects(nsd74, className, nsd7420).length}</span
                >
              </mwc-list-item>`;
            }
          )}
          <mwc-list-item noninteractive
            >Empty lnClasses from IEC 61850-7-420</mwc-list-item
          >
          <li divider role="separator"></li>
          ${Array.from(nsd7420.querySelectorAll('LNClasses > LNClass')).map(
            lnClass => {
              const className = lnClass.getAttribute('name') ?? '';
              return html`<mwc-list-item
                style="min-width:200px"
                graphic="icon"
                hasMeta
                value="${className}"
                ><span>${className}</span>
                <span slot="meta"
                  >${getAllDataObjects(nsd74, className, nsd7420).length}</span
                >
              </mwc-list-item>`;
            }
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

function updateLNodeTypeAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const id = getValue(inputs.find(i => i.label === 'id')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);
    const lnClass = getValue(inputs.find(i => i.label === 'lnClass')!)!;

    if (
      id === element.getAttribute('id') &&
      desc === element.getAttribute('desc') &&
      lnClass == element.getAttribute('lnClass')
    )
      return [];

    const newElement = cloneElement(element, { id, desc, lnClass });

    const actions: Replace[] = [];
    actions.push({ old: { element }, new: { element: newElement } });

    const oldId = element.getAttribute('id')!;
    Array.from(
      element.ownerDocument.querySelectorAll(
        `LN0[lnType="${oldId}"], LN[lnType="${oldId}"]`
      )
    ).forEach(oldAnyLn => {
      const newAnyLn = <Element>oldAnyLn.cloneNode(false);
      newAnyLn.setAttribute('lnType', id);

      actions.push({ old: { element: oldAnyLn }, new: { element: newAnyLn } });
    });

    return [
      { title: get('lnodetype.action.edit', { oldId, newId: id }), actions },
    ];
  };
}

export function lNodeTypeWizard(
  lNodeTypeIdentity: string,
  doc: XMLDocument
): Wizard | undefined {
  const lnodetype = find(doc, 'LNodeType', lNodeTypeIdentity);
  if (!lnodetype) return undefined;

  return [
    {
      title: get('lnodetype.wizard.title.edit'),
      element: lnodetype,
      primary: {
        icon: '',
        label: get('save'),
        action: updateLNodeTypeAction(lnodetype),
      },
      menuActions: [
        {
          label: get('remove'),
          icon: 'delete',
          action: remove(lnodetype),
        },
        {
          label: get('scl.DO'),
          icon: 'playlist_add',
          action: openAddDo(lnodetype),
        },
      ],
      content: [
        html`<wizard-textfield
          label="id"
          helper="${get('scl.id')}"
          .maybeValue=${lnodetype.getAttribute('id')}
          required
          maxlength="127"
          minlength="1"
          pattern="${patterns.nmToken}"
          dialogInitialFocus
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="desc"
          helper="${get('scl.desc')}"
          .maybeValue=${lnodetype.getAttribute('desc')}
          nullable
          pattern="${patterns.normalizedString}"
        ></wizard-textfield>`,
        html`<wizard-textfield
          label="lnClass"
          helper="${get('scl.lnClass')}"
          .maybeValue=${lnodetype.getAttribute('lnClass')}
          required
          pattern="${patterns.lnClass}"
        ></wizard-textfield>`,
        html`
          <mwc-list
            style="margin-top: 0px;"
            @selected=${(e: SingleSelectedEvent) => {
              const wizard = dOWizard({
                identity: (<ListItem>(<List>e.target).selected).value,
                doc,
              });

              if (wizard) e.target!.dispatchEvent(newSubWizardEvent(wizard));
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
