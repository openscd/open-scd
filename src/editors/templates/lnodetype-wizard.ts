import { get, translate } from 'lit-translate';

import {
  cloneElement,
  Create,
  createElement,
  EditorAction,
  getChildElementsByTagName,
  getReference,
  getValue,
  html,
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
  CreateOptions,
  unifyCreateActionArray,
  UpdateOptions,
  WizardOptions,
} from './foundation.js';

import { List } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { Select } from '@material/mwc-select';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { WizardSelect } from '../../wizard-select.js';
import { WizardTextField } from '../../wizard-textfield.js';

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
          label="${translate('remove')}"
          @click=${(e: MouseEvent) => {
            e.target!.dispatchEvent(newWizardEvent());
            e.target!.dispatchEvent(
              newActionEvent({
                old: {
                  parent: DO.parentElement!,
                  element: DO,
                  reference: DO.nextSibling,
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
      element: DO ?? undefined,
      primary: { icon: '', label: get('save'), action },
      content: [
        deleteButton,
        html`<${WizardTextField}
          label="name"
          .maybeValue=${name}
          helper="${translate('scl.name')}"
          required
          pattern="${patterns.alphanumericFirstUpperCase}"
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
        html`<${WizardTextField}
          label="accessControl"
          helper="${translate('scl.accessControl')}"
          .maybeValue=${accessControl}
          nullable
          pattern="${patterns.normalizedString}"
        ></${WizardTextField}>`,
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

function getDescendantClasses(nsd74: XMLDocument, base: string): Element[] {
  if (base === '') return [];
  const descendants = getDescendantClasses(
    nsd74,
    nsd74
      .querySelector(`LNClass[name="${base}"], AbstractLNClass[name="${base}"]`)
      ?.getAttribute('base') ?? ''
  );
  return descendants.concat(
    Array.from(
      nsd74.querySelectorAll(
        `LNClass[name="${base}"], AbstractLNClass[name="${base}"]`
      )
    )
  );
}

function getAllDataObjects(nsd74: XMLDocument, base: string): Element[] {
  const lnodeclasses = getDescendantClasses(nsd74, base);

  return lnodeclasses.flatMap(lnodeclass =>
    Array.from(lnodeclass.querySelectorAll('DataObject'))
  );
}

function createNewLNodeType(parent: Element, element: Element): WizardActor {
  return (_: WizardInput[], wizard: Element): EditorAction[] => {
    const selected = Array.from(
      wizard.shadowRoot!.querySelectorAll<WizardSelect>('wizard-select')
    ).filter(select => select.maybeValue);

    const actions: Create[] = [];

    selected.forEach(select => {
      const DO = createElement(parent.ownerDocument, 'DO', {
        name: select.label,
        bType: 'Struct',
        type: select.value,
      });

      actions.push({
        new: {
          parent: element,
          element: DO,
          reference: getReference(element, <SCLTag>DO.tagName),
        },
      });
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
              html`<mwc-list-item value="${doType.getAttribute('id')}"
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
      reference: getReference(parent, 'LNodeType'),
    },
  });

  return unifyCreateActionArray(actions);
}

function startLNodeTypeCreate(
  parent: Element,
  templates: XMLDocument,
  nsd74: XMLDocument
): WizardActor {
  return (inputs: WizardInput[], wizard: Element): EditorAction[] => {
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
      ? templates.querySelector(selector('LNodeType', value))
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

    const allDo = getAllDataObjects(nsd74, value!);
    wizard.dispatchEvent(
      newWizardEvent(createLNodeTypeHelperWizard(parent, newLNodeType, allDo))
    );

    wizard.dispatchEvent(newWizardEvent());
    return [];
  };
}

function onLnClassChange(e: Event, templates: XMLDocument): void {
  const identity = (<Select>e.target).selected?.value;
  const lnodetype = identity
    ? templates.querySelector(selector('LNodeType', identity))
    : null;

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
  nsd74: XMLDocument
): Wizard {
  return [
    {
      title: get('lnodetype.wizard.title.add'),
      primary: {
        icon: '',
        label: get('next') + '...',
        action: startLNodeTypeCreate(parent, templates, nsd74),
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
                  >${getAllDataObjects(nsd74, className).length}</span
                >
              </mwc-list-item>`;
            }
          )}
        </mwc-select>`,
        html`<${WizardTextField}
          label="id"
          helper="${translate('scl.id')}"
          .maybeValue=${''}
          required
          maxlength="127"
          minlength="1"
          pattern="${patterns.nmToken}"
        ></${WizardTextField}>`,
        html`<${WizardTextField}
          label="desc"
          helper="${translate('scl.desc')}"
          .maybeValue=${null}
          nullable
          pattern="${patterns.normalizedString}"
        ></${WizardTextField}>`,
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

    const newElement = cloneElement(element, { id, desc, lnClass });

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
      element: lnodetype,
      primary: {
        icon: '',
        label: get('save'),
        action: updateLNodeTypeAction(lnodetype),
      },
      content: [
        html`<mwc-button
          icon="delete"
          trailingIcon
          label="${translate('remove')}"
          @click=${(e: MouseEvent) => {
            e.target!.dispatchEvent(newWizardEvent());
            e.target!.dispatchEvent(
              newActionEvent({
                old: {
                  parent: lnodetype.parentElement!,
                  element: lnodetype,
                  reference: lnodetype.nextSibling,
                },
              })
            );
          }}
          fullwidth
        ></mwc-button> `,
        html`<${WizardTextField}
          label="id"
          helper="${translate('scl.id')}"
          .maybeValue=${lnodetype.getAttribute('id')}
          required
          maxlength="127"
          minlength="1"
          pattern="${patterns.nmToken}"
          dialogInitialFocus
        ></${WizardTextField}>`,
        html`<${WizardTextField}
          label="desc"
          helper="${translate('scl.desc')}"
          .maybeValue=${lnodetype.getAttribute('desc')}
          nullable
          pattern="${patterns.normalizedString}"
        ></${WizardTextField}>`,
        html`<${WizardTextField}
          label="lnClass"
          helper="${translate('scl.lnClass')}"
          .maybeValue=${lnodetype.getAttribute('lnClass')}
          required
          pattern="${patterns.lnClass}"
        ></${WizardTextField}>`,
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
