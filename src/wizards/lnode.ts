import { html, render, TemplateResult } from 'lit-html';
import { get, translate } from 'lit-translate';

import '@material/mwc-icon';
import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-list/mwc-list-item';
import { List } from '@material/mwc-list';
import { ListBase } from '@material/mwc-list/mwc-list-base';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { MultiSelectedEvent } from '@material/mwc-list/mwc-list-foundation';

import '../filtered-list.js';
import {
  Create,
  cloneElement,
  createElement,
  EditorAction,
  find,
  getChildElementsByTagName,
  getValue,
  identity,
  isPublic,
  newLogEvent,
  newWizardEvent,
  referencePath,
  Wizard,
  WizardActor,
  WizardInputElement,
  WizardMenuActor,
  newLnInstGenerator,
} from '../foundation.js';
import { patterns } from './foundation/limits.js';

function createLNodeAction(parent: Element): WizardActor {
  return (
    inputs: WizardInputElement[],
    wizard: Element,
    list?: List | null
  ): EditorAction[] => {
    const selectedLNodeTypes = <Element[]>list!.items
      .filter(item => item.selected)
      .map(item => item.value)
      .map(identity => find(parent.ownerDocument, 'LNodeType', identity))
      .filter(item => item !== null);

    const lnInstGenerator = newLnInstGenerator(parent);

    const createActions: Create[] = <Create[]>selectedLNodeTypes
      .map(selectedLNodeType => {
        const lnClass = selectedLNodeType.getAttribute('lnClass');
        if (!lnClass) return null;

        const uniqueLnInst = lnInstGenerator(lnClass);

        if (!uniqueLnInst) {
          wizard.dispatchEvent(
            newLogEvent({
              kind: 'error',
              title: get('lnode.log.title', { lnClass }),
              message: get('lnode.log.nonuniquelninst'),
            })
          );
          return;
        }

        const hasLLN0 = getChildElementsByTagName(parent, 'LNode').some(
          lnode => lnode.getAttribute('lnClass') === 'LLN0'
        );
        if (lnClass === 'LLN0' && hasLLN0) {
          wizard.dispatchEvent(
            newLogEvent({
              kind: 'error',
              title: get('lnode.log.title', { lnClass }),
              message: get('lnode.log.uniqueln0', { lnClass }),
            })
          );
          return;
        }

        const hasLPHD = getChildElementsByTagName(parent, 'LNode').some(
          lnode => lnode.getAttribute('lnClass') === 'LPHD'
        );
        if (lnClass === 'LPHD' && hasLPHD) {
          wizard.dispatchEvent(
            newLogEvent({
              kind: 'error',
              title: get('lnode.log.title', { lnClass }),
              message: get('lnode.log.uniqueln0', { lnClass }),
            })
          );
          return;
        }

        const lnInst = lnClass === 'LLN0' ? '' : uniqueLnInst;

        const element = createElement(parent.ownerDocument, 'LNode', {
          iedName: 'None',
          ldInst: null,
          prefix: null,
          lnClass,
          lnInst,
          lnType: selectedLNodeType.getAttribute('id')!,
        });

        return { new: { parent, element } };
      })
      .filter(action => action);

    return createActions;
  };
}

function openLNodeReferenceWizard(parent: Element): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(newWizardEvent());
    wizard.dispatchEvent(newWizardEvent(lNodeReferenceWizard(parent)));
  };
}

function lNodeInstanceWizard(parent: Element): Wizard {
  const lNodeTypes = Array.from(
    parent.ownerDocument.querySelectorAll('LNodeType')
  );

  return [
    {
      title: get('lnode.wizard.title.selectLNodeTypes'),
      menuActions: [
        {
          icon: '',
          label: get('lnode.wizard.reference'),
          action: openLNodeReferenceWizard(parent),
        },
      ],
      primary: {
        icon: 'save',
        label: get('save'),
        action: createLNodeAction(parent),
      },
      content: [
        html`<filtered-list multi
          >${lNodeTypes.map(lNodeType => {
            const isDisabled =
              (lNodeType.getAttribute('lnClass') === 'LLN0' &&
                getChildElementsByTagName(parent, 'LNode').some(
                  lnode => lnode.getAttribute('lnClass') === 'LLN0'
                )) ||
              (lNodeType.getAttribute('lnClass') === 'LPHD' &&
                getChildElementsByTagName(parent, 'LNode').some(
                  lnode => lnode.getAttribute('lnClass') === 'LPHD'
                ));

            return html`<mwc-check-list-item
              twoline
              value="${identity(lNodeType)}"
              ?disabled=${isDisabled}
              ><span>${lNodeType.getAttribute('lnClass')}</span
              ><span slot="secondary"
                >${isDisabled
                  ? get('lnode.wizard.uniquewarning')
                  : identity(lNodeType)}</span
              ></mwc-check-list-item
            >`;
          })}</filtered-list
        >`,
      ],
    },
  ];
}

/** Description of a `ListItem` representing an `IED` or `LN[0]` */
interface ItemDescription {
  selected: boolean;
  disabled?: boolean;
  preferred?: boolean;
  element?: Element;
}

/** Logical nodes perferred for lnode reference to substation element */
const preferredLn: Partial<Record<string, string[]>> = {
  CBR: ['CSWI', 'CILO', 'XCBR'],
  DIS: ['CSWI', 'CILO', 'XSWI'],
  VTR: ['TVTR'],
  CTR: ['TCTR'],
  Bay: ['LLN0'],
  VoltageLevel: ['LLN0'],
  Substation: ['LLN0'],
};

/** Sorts selected `ListItem`s to the top and disabled ones to the bottom. */
function compare(a: ItemDescription, b: ItemDescription): number {
  if (a.disabled !== b.disabled) return b.disabled ? -1 : 1;

  if (a.preferred !== b.preferred) return a.preferred ? -1 : 1;

  if (a.selected !== b.selected) return a.selected ? -1 : 1;

  return 0;
}

const APldInst = 'Client LN';

/** Queries `parent` for an `LNode` described by logical node element. */
export function getLNode(
  parent: Element | XMLDocument,
  anyln: Element
): Element | null {
  return (
    Array.from(parent.getElementsByTagName('LNode'))
      .filter(item => !item.closest('Private'))
      .filter(lnode => isLNodeReference(anyln, lnode))[0] ?? null
  );
}

function isLNodeReference(anyln: Element, lnode: Element): boolean {
  return (
    (lnode.getAttribute('iedName') ?? '') ===
      (anyln.closest('IED')?.getAttribute('name') ?? '') &&
    (lnode.getAttribute('ldInst') ?? '') ===
      (anyln.closest('LDevice')?.getAttribute('inst') ?? '') &&
    (lnode.getAttribute('prefix') ?? '') ===
      (anyln.getAttribute('prefix') ?? '') &&
    (lnode.getAttribute('lnClass') ?? '') ===
      (anyln.getAttribute('lnClass') ?? '') &&
    (lnode.getAttribute('lnInst') ?? '') === (anyln.getAttribute('inst') ?? '')
  );
}

function createAction(parent: Element, anyln: Element): EditorAction {
  const element = createElement(parent.ownerDocument, 'LNode', {
    iedName: anyln.closest('IED')?.getAttribute('name') ?? '',
    ldInst: anyln.closest('LDevice')?.getAttribute('inst') ?? '',
    prefix: anyln.getAttribute('prefix') ?? '',
    lnClass: anyln.getAttribute('lnClass') ?? '',
    lnInst: anyln.getAttribute('inst') ?? '',
  });

  return {
    new: {
      parent,
      element,
    },
  };
}

function deleteAction(parent: Element, lnode: Element): EditorAction {
  return {
    old: {
      parent: parent,
      element: lnode,
      reference: lnode.nextElementSibling,
    },
  };
}

function includesAnyLN(anylns: Element[], lnode: Element): boolean {
  return anylns.some(anyln => isLNodeReference(anyln, lnode));
}

function includesLNode(anyln: Element, lnodes: Element[]): boolean {
  return lnodes.some(lnode => isLNodeReference(anyln, lnode));
}

/**
 * @returns a `WizardAction` updating `parent`'s `LNodes`
 * to the entries selected in `wizard`'s `#lnList`.
 */
export function lNodeWizardAction(parent: Element): WizardActor {
  return (
    inputs: WizardInputElement[],
    wizard: Element,
    list?: List | null
  ): EditorAction[] => {
    const selectedAnyLn = <Element[]>list!.items
      .filter(item => item.selected)
      .map(item => item.value)
      .map(identity => {
        const ln0 = find(parent.ownerDocument, 'LN0', identity);
        if (ln0) return ln0;
        return find(parent.ownerDocument, 'LN', identity);
      })
      .filter(item => item !== null);

    const oldLNodes = getChildElementsByTagName(parent, 'LNode').filter(
      isPublic
    );

    const deleteActions = oldLNodes
      .filter(lnode => !includesAnyLN(selectedAnyLn, lnode))
      .map(lnode => deleteAction(parent, lnode));
    const createActions = selectedAnyLn
      .filter(anyln => !includesLNode(anyln, oldLNodes))
      .map(anyln => createAction(parent, anyln));

    return deleteActions.concat(createActions);
  };
}

function getListContainer(target: Element, selector: string): Element | null {
  return (
    target.parentElement?.parentElement?.nextElementSibling?.querySelector(
      selector
    ) ?? null
  );
}

function onIEDSelect(evt: MultiSelectedEvent, parent: Element): void {
  if (!(evt.target instanceof ListBase)) return;
  const lnList = getListContainer(evt.target, '#lnList');
  if (lnList === null) return;

  const doc = parent.ownerDocument;

  const selectedIEDItems = <ListItem[]>evt.target.selected;

  const lnItems = selectedIEDItems
    .flatMap(item =>
      Array.from(
        doc.querySelectorAll(
          `:root > IED[name="${item.value}"] > AccessPoint > LN,` +
            `:root > IED[name="${item.value}"] > AccessPoint > Server > LDevice > LN,` +
            `:root > IED[name="${item.value}"] > AccessPoint > Server > LDevice > LN0`
        )
      ).filter(item => !item.closest('Private'))
    )
    .filter(item => item !== null)
    .map(item => {
      const isPrefered =
        preferredLn[
          parent.getAttribute('type')
            ? parent.getAttribute('type') ?? ''
            : parent.tagName ?? ''
        ]?.includes(item.getAttribute('lnClass') ?? '') ?? false;

      const lnode = getLNode(parent.ownerDocument, item);
      const selected = lnode?.parentElement === parent;

      return {
        selected,
        disabled: lnode !== null && !selected,
        prefered: isPrefered,
        element: item,
      };
    })
    .sort(compare);

  const lnTemplates = lnItems.map(item => {
    return html`<mwc-check-list-item
      ?selected=${item.selected}
      ?disabled=${item.disabled}
      value="${identity(item.element)}"
      twoline
      ><span
        >${item.element.getAttribute('prefix') ??
        ''}${item.element.getAttribute('lnClass')}${item.element.getAttribute(
          'inst'
        ) ?? ''}
        ${item.disabled
          ? html` <mwc-icon style="--mdc-icon-size: 1em;"
                >account_tree</mwc-icon
              >
              ${referencePath(getLNode(doc, item.element)!)}`
          : ''}</span
      ><span slot="secondary"
        >${item.element.closest('IED')?.getAttribute('name') ?? ''} |
        ${item.element.closest('LDevice')
          ? item.element.closest('LDevice')?.getAttribute('inst')
          : APldInst}</span
      ></mwc-check-list-item
    >`;
  });

  render(html`${lnTemplates}`, lnList);
}

function renderIEDPage(element: Element): TemplateResult {
  const doc = element.ownerDocument;
  if (doc.querySelectorAll(':root > IED').length > 0)
    return html`<filtered-list
      disableCheckAll
      multi
      id="iedList"
      @selected=${(evt: MultiSelectedEvent) => onIEDSelect(evt, element)}
      >${Array.from(doc.querySelectorAll(':root > IED'))
        .map(ied => ied.getAttribute('name')!)
        .map(iedName => {
          return {
            selected:
              Array.from(element.children)
                .filter(item => !item.closest('Private'))
                .filter(
                  item =>
                    item.tagName === 'LNode' &&
                    item.getAttribute('iedName') === iedName
                ).length > 0,
            iedName: iedName,
          };
        })
        .sort(compare)
        .map(
          item =>
            html`<mwc-check-list-item
              value="${item.iedName ?? ''}"
              ?selected=${item.selected}
              >${item.iedName}</mwc-check-list-item
            >`
        )}</filtered-list
    >`;
  else
    return html`<mwc-list-item noninteractive graphic="icon">
      <span>${translate('lnode.wizard.placeholder')}</span>
      <mwc-icon slot="graphic">info</mwc-icon>
    </mwc-list-item>`;
}

function openLNodeInstanceWizard(parent: Element): WizardMenuActor {
  return (wizard: Element): void => {
    wizard.dispatchEvent(newWizardEvent());
    wizard.dispatchEvent(newWizardEvent(lNodeInstanceWizard(parent)));
  };
}

function lNodeReferenceWizard(parent: Element): Wizard {
  return [
    {
      title: get('lnode.wizard.title.selectIEDs'),
      menuActions: [
        {
          icon: '',
          label: get('lnode.wizard.instance'),
          action: openLNodeInstanceWizard(parent),
        },
      ],
      content: [renderIEDPage(parent)],
    },
    {
      initial: Array.from(parent.children).some(
        child => child.tagName === 'LNode'
      ),
      title: get('lnode.wizard.title.selectLNs'),
      primary: {
        icon: 'save',
        label: get('save'),
        action: lNodeWizardAction(parent),
      },
      content: [html`<filtered-list multi id="lnList"></filtered-list>`],
    },
  ];
}

/** @returns a Wizard for editing `element`'s `LNode` children. */
export function lNodeWizard(parent: Element): Wizard {
  if (
    parent.tagName === 'Function' ||
    parent.tagName === 'SubFunction' ||
    parent.tagName === 'EqFunction' ||
    parent.tagName === 'EqSubFunction'
  )
    return lNodeInstanceWizard(parent);

  return lNodeReferenceWizard(parent);
}

interface ContentOptions {
  iedName: string | null;
  ldInst: string | null;
  prefix: string | null;
  lnClass: string | null;
  lnInst: string | null;
  reservedLnInst: string[];
}

function contentLNodeWizard(options: ContentOptions): TemplateResult[] {
  const isIedRef = options.iedName !== 'None';

  return [
    html`<wizard-textfield
      label="iedName"
      .maybeValue=${options.iedName}
      helper="${translate('scl.iedName')}"
      helperPersistent
      disabled
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="ldInst"
      .maybeValue=${options.ldInst}
      helper="${translate('scl.ldInst')}"
      helperPersistent
      nullable
      disabled
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="prefix"
      .maybeValue=${options.prefix}
      helper="${translate('scl.prefix')}"
      pattern="${patterns.asciName}"
      maxLength="11"
      helperPersistent
      nullable
      ?disabled=${isIedRef}
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="lnClass"
      .maybeValue=${options.lnClass}
      helper="${translate('scl.lnClass')}"
      helperPersistent
      disabled
    ></wizard-textfield>`,
    html`<wizard-textfield
      label="lnInst"
      .maybeValue=${options.lnInst}
      helper="${translate('scl.lnInst')}"
      helperPersistent
      type="number"
      min="1"
      max="99"
      .reservedValues=${options.reservedLnInst}
      ?disabled=${isIedRef}
    ></wizard-textfield>`,
  ];
}

function updateLNodeAction(element: Element): WizardActor {
  return (inputs: WizardInputElement[]): EditorAction[] => {
    const attributes: Record<string, string | null> = {};
    const attributeKeys = ['iedName', 'ldInst', 'prefix', 'lnClass', 'lnInst'];

    attributeKeys.forEach(key => {
      attributes[key] = getValue(inputs.find(i => i.label === key)!);
    });

    let lNodeAction: EditorAction | null = null;
    if (
      attributeKeys.some(key => attributes[key] !== element.getAttribute(key))
    ) {
      const newElement = cloneElement(element, attributes);
      lNodeAction = {
        old: { element },
        new: { element: newElement },
      };
      return [lNodeAction];
    }

    return [];
  };
}

export function editLNodeWizard(element: Element): Wizard {
  const [iedName, ldInst, prefix, lnClass, lnInst] = [
    'iedName',
    'ldInst',
    'prefix',
    'lnClass',
    'lnInst',
  ].map(attr => element.getAttribute(attr));

  const reservedLnInst = getChildElementsByTagName(
    element.parentElement,
    'LNode'
  )
    .filter(
      sibling =>
        sibling !== element &&
        sibling.getAttribute('lnClass') === element.getAttribute('lnClass')
    )
    .map(sibling => sibling.getAttribute('lnInst')!);

  return [
    {
      title: get('wizard.title.edit', { tagName: 'LNode' }),
      element,
      primary: {
        label: get('save'),
        icon: 'save',
        action: updateLNodeAction(element),
      },
      content: [
        ...contentLNodeWizard({
          iedName,
          ldInst,
          prefix,
          lnClass,
          lnInst,
          reservedLnInst,
        }),
      ],
    },
  ];
}
