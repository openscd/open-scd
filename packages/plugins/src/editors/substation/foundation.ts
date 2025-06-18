import { css, html, LitElement, TemplateResult } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';

import './function-editor.js';

import { identity, isPublic } from '@openscd/open-scd/src/foundation.js';

import { getChildElementsByTagName } from '@openscd/xml';

import { newActionEvent } from '@openscd/core/foundation/deprecated/editor.js';
import {
  circuitBreakerIcon,
  disconnectorIcon,
  currentTransformerIcon,
  voltageTransformerIcon,
  earthSwitchIcon,
  generalConductingEquipmentIcon,
} from '@openscd/open-scd/src/icons/icons.js';
import { typeStr } from '../../wizards/conductingequipment.js';
import { Select } from '@material/mwc-select';

import { WizardTextField } from '@openscd/open-scd/src/wizard-textfield.js';
import { get } from 'lit-translate';

import { BayEditor } from './bay-editor.js';
import { VoltageLevelEditor } from './voltage-level-editor.js';
import { SubstationEditor } from './substation-editor.js';

function containsReference(element: Element, iedName: string): boolean {
  return Array.from(element.getElementsByTagName('LNode'))
    .filter(isPublic)
    .some(lnode => lnode.getAttribute('iedName') === iedName);
}

function isReferencedItself(element: Element, iedName: string): boolean {
  return (<Element[]>Array.from(element.children)).some(
    child =>
      child.tagName === 'LNode' && child.getAttribute('iedName') === iedName
  );
}

function hasReferencedChildren(element: Element, iedName: string): boolean {
  const threshold = element.tagName === 'Bay' ? 0 : 1;
  return (
    (<Element[]>Array.from(element.children)).filter(child =>
      containsReference(child, iedName)
    ).length > threshold
  );
}

function hasOurs(element: Element, iedName: string): boolean {
  return Array.from(element.getElementsByTagName('LNode'))
    .filter(isPublic)
    .some(lnode => lnode.getAttribute('iedName') === iedName);
}

function getOurs(element: Element, iedName: string): Element[] {
  return Array.from(element.getElementsByTagName('LNode'))
    .filter(isPublic)
    .filter(lnode => lnode.getAttribute('iedName') === iedName);
}

function hasTheirs(element: Element, iedName: string): boolean {
  const ours = getOurs(element, iedName);
  const scl = element.closest('SCL')!;

  return Array.from(scl.getElementsByTagName('LNode'))
    .filter(isPublic)
    .filter(lnode => lnode.getAttribute('iedName') === iedName)
    .some(lnode => !ours.includes(lnode));
}

export function attachedIeds(
  element: Element,
  remainingIeds: Set<Element>
): Element[] {
  const attachedIeds: Element[] = [];
  for (const ied of remainingIeds) {
    const iedName = ied.getAttribute('name')!;

    if (element.tagName === 'SCL') {
      if (!hasOurs(element, iedName) || hasReferencedChildren(element, iedName))
        attachedIeds.push(ied);

      continue;
    }

    if (hasTheirs(element, iedName)) continue;
    if (
      hasReferencedChildren(element, iedName) ||
      isReferencedItself(element, iedName)
    )
      attachedIeds.push(ied);
  }

  for (const ied of attachedIeds) {
    remainingIeds.delete(ied);
  }

  return attachedIeds;
}

export function getAttachedIeds(
  doc: XMLDocument
): (element: Element) => Element[] {
  return (element: Element) => {
    const ieds = new Set(
      Array.from(doc.querySelectorAll('IED')).filter(isPublic)
    );

    return attachedIeds(element, ieds);
  };
}

/** Whether the LNode reference valid relatively (IED agnostic)  */
function validRelativeReference(
  ied: Element,
  lNode: Element
): Element | undefined {
  const [ldInst, prefix, lnClass, lnInst] = [
    'ldInst',
    'prefix',
    'lnClass',
    'lnInst',
  ].map(name => lNode.getAttribute(name));

  return Array.from(ied.querySelectorAll('LN, LN0'))
    .filter(isPublic)
    .find(
      anyLn =>
        anyLn?.closest('LDevice')?.getAttribute('inst') === ldInst &&
        (anyLn.getAttribute('prefix') ?? '') === (prefix ?? '') &&
        (anyLn.getAttribute('lnClass') ?? '') === (lnClass ?? '') &&
        (anyLn.getAttribute('inst') ?? '') === (lnInst ?? '')
    );
}

/** Identity of LNode with iedName !== None is global and independent of parent*/
function lNodeRegistry(doc: XMLDocument): (newLNode: Element) => boolean {
  const lNodes = new Set(
    Array.from(doc.querySelectorAll('LNode'))
      .filter(isPublic)
      .map(lNode => identity(lNode))
  );

  return (newLNode: Element) => {
    if (lNodes.has(identity(newLNode))) return true;

    lNodes.add(identity(newLNode));
    return false;
  };
}

/**
 * Clones - deep copy - substation element cloneEntity with removed single line diagram
 * @param cloneEntity - substation element to be cloned
 * @param newName - name of the clone
 * @param iedRedirect - redirection information for LNode elements (all LNodes's are removed for undefined)
 * @returns a deep cloned node without single line diagram information
 */
export function substationElementClone(
  cloneEntity: Element,
  newName: string,
  iedRedirect?: Partial<Record<string, string>>
): Element {
  const usedLNodes = lNodeRegistry(cloneEntity.ownerDocument);

  const clone: Element = <Element>cloneEntity.cloneNode(true);
  clone.querySelectorAll('LNode').forEach(lNode => {
    const oldIedName = lNode.getAttribute('iedName');

    if (oldIedName === 'None') return; // non referenced LNode
    if (!oldIedName) {
      //iedName required
      lNode.parentElement?.removeChild(lNode);
      return;
    }

    // no or invalid user choice
    if (!iedRedirect || !iedRedirect[oldIedName]) {
      lNode.parentElement?.removeChild(lNode);
      return;
    }

    // user decide to remove LNode
    if (iedRedirect[oldIedName] === 'No') {
      lNode.parentElement?.removeChild(lNode);
      return;
    }

    lNode.setAttribute('iedName', iedRedirect[oldIedName]!);

    // new LNode already in use
    if (usedLNodes(lNode)) {
      lNode.parentElement?.removeChild(lNode);
      return;
    }

    const ied = cloneEntity.ownerDocument.querySelector(
      `IED[name="${iedRedirect[oldIedName]}"]`
    );
    if (!ied || !validRelativeReference(ied, lNode)) {
      lNode.parentElement?.removeChild(lNode);
      return;
    }
  });

  clone
    .querySelectorAll('Terminal:not([cNodeName="grounded"])')
    .forEach(terminal => terminal.parentElement?.removeChild(terminal));
  // FIXME(JakobVogelsang): for the moment removes terminal as well.
  // For later terminal keep might be the better choice

  clone
    .querySelectorAll('ConnectivityNode')
    .forEach(condNode => condNode.parentElement?.removeChild(condNode));
  // FIXME(JakobVogelsang): for the moment beeing connectivity node remove as well.
  // For later connectivity keep might be the better choice to preserve substation structure

  clone.setAttribute('name', newName);

  return clone;
}

function cloneWithRedirect(evt: Event, cloneEntity: Element): void {
  const dialog = (<LitElement>evt.target)?.parentElement;
  if (!dialog) return;

  const children = <(Select | WizardTextField)[]>(
    Array.from(dialog.querySelectorAll('mwc-select, wizard-textfield'))
  );
  if (!children.every(child => child.checkValidity())) return;

  const nameField = dialog.querySelector<WizardTextField>('wizard-textfield')!;

  const iedRedirects = Array.from(
    dialog.querySelectorAll<Select>('mwc-select')
  );
  const iedRedirect: Partial<Record<string, string>> = {};
  iedRedirects.forEach(ied => {
    if (iedRedirect[ied.label]) return;
    iedRedirect[ied.label] = ied.value;
  });

  if (!cloneEntity.parentElement) return;

  const element = substationElementClone(
    cloneEntity,
    nameField.value,
    iedRedirect
  );

  dialog.dispatchEvent(
    newActionEvent({
      new: {
        parent: cloneEntity.parentElement,
        element,
        reference: cloneEntity.nextSibling,
      },
    })
  );
}

function someUnreferencedLNode(ied: Element, lNodes: Element[]): boolean {
  const iedName = ied.getAttribute('name');
  return !lNodes.some(lNode => {
    const [ldInst, prefix, lnClass, lnInst] = [
      'ldInst',
      'prefix',
      'lnClass',
      'lnInst',
    ].map(name => lNode.getAttribute(name));

    return !Array.from(
      ied.ownerDocument.querySelectorAll(
        `LNode[iedName="${iedName}"][ldInst="${ldInst}"]`
      )
    )
      .filter(isPublic)
      .every(
        otherLNode =>
          (otherLNode.getAttribute('prefix') ?? '') === (prefix ?? '') &&
          (otherLNode.getAttribute('lnClass') ?? '') === (lnClass ?? '') &&
          (otherLNode.getAttribute('inst') ?? '') === (lnInst ?? '')
      );
  });
}

/** Whether at least on LNode is a valid pointer into IED */
function someValidReference(ied: Element, lNodes: Element[]): boolean {
  return lNodes.some(lNode => validRelativeReference(ied, lNode));
}

function validUnreferencedIEDs(ied: Element, cloneEntity: Element): Element[] {
  const lNodes = Array.from(
    cloneEntity.querySelectorAll(`LNode[iedName="${ied.getAttribute('name')}"]`)
  );

  return Array.from(ied.ownerDocument.querySelectorAll('IED')).filter(
    otherIED =>
      ied !== otherIED &&
      someValidReference(otherIED, lNodes) &&
      someUnreferencedLNode(otherIED, lNodes)
  );
}

function referencedIEDs(substationElement: Element): Set<Element> {
  const usedIEDs = Array.from(
    substationElement.querySelectorAll('LNode:not([iedName="None"])')
  )
    .map(lNode =>
      substationElement.ownerDocument.querySelector(
        `IED[name="${lNode.getAttribute('iedName')}"]`
      )
    )
    .filter(ied => ied)
    .filter(ied => isPublic(ied!)) as Element[];

  return new Set(usedIEDs);
}

/** Function that returns unique name for a given element tag within parent scope
 * With given namesake the structure of the name of the namesake is use
 * @param parent - parent element that is the scope of name uniqueness
 * @param tagName - the element tag for which the name shall be unique
 * @param namesake - for predefined name structure
 */
export function uniqueSubstationElementName(
  parent: Element,
  tagName: string,
  namesake?: string
): string {
  const siblingNames = getChildElementsByTagName(parent, tagName).map(
    child => child.getAttribute('name') ?? child.tagName
  );
  if (!siblingNames.length) return tagName + '01';

  const lastDigit = namesake ? namesake.match(/\d+$/)?.[0] : undefined;

  let newName = '';
  for (let i = 0; i < siblingNames.length; i++) {
    if (!lastDigit) newName = (namesake ?? tagName) + (i + 1);
    else {
      const newDigit = (Number.parseInt(lastDigit, 10) + (i + 1))
        .toString()
        .padStart(lastDigit.length, '0');
      newName = namesake!.replace(lastDigit, newDigit);
    }

    if (!siblingNames.includes(newName)) return newName;
  }

  return newName;
}

/** A dialog that allows users of substation element clone function to add some configuration */
export function redirectDialog(cloneEntity: Element): TemplateResult {
  const parent = cloneEntity.parentElement;
  const tagName = cloneEntity.tagName;
  const namesake = cloneEntity.getAttribute('name');

  const newName =
    parent && namesake
      ? uniqueSubstationElementName(parent, tagName, namesake)
      : parent
      ? uniqueSubstationElementName(parent, tagName)
      : '';

  const entitySiblings = (
    parent ? getChildElementsByTagName(parent, tagName) : []
  )
    .map(sibling => sibling.getAttribute('name'))
    .filter(name => name);

  return html` <mwc-dialog
    stacked
    heading="${get('substation.clone.redirect')}"
  >
    <wizard-textfield
      label="${get('substation.clone.newname')}"
      value="${newName}"
      .reservedValues="${entitySiblings}"
    ></wizard-textfield>
    ${Array.from(referencedIEDs(cloneEntity)).map(ied => {
      const validOtherIEDs = validUnreferencedIEDs(ied, cloneEntity).map(
        ied => ied.getAttribute('name')!
      );
      const userChoice = ['no'].concat(validOtherIEDs);

      return html`<mwc-select
        required
        fixedMenuPosition
        value="${userChoice[0]}"
        label="${ied.getAttribute('name')!}"
        >${userChoice.map(
          iedName => html`<mwc-list-item value="${iedName}"
            >${iedName}</mwc-list-item
          >`
        )}</mwc-select
      >`;
    })}
    <mwc-button
      slot="secondaryAction"
      dialogAction="close"
      label="${get('close')}"
      style="--mdc-theme-primary: var(--mdc-theme-error)"
    ></mwc-button>
    <mwc-button
      slot="primaryAction"
      dialogAction="close"
      label="${get('substation.clone.cloneclose')}"
      icon="content_copy"
      @click=${(evt: Event) => cloneWithRedirect(evt, cloneEntity)}
    ></mwc-button>
    <mwc-button
      slot="primaryAction"
      label="${get('substation.clone.cloneproc')}"
      icon="content_copy"
      @click=${(evt: Event) => cloneWithRedirect(evt, cloneEntity)}
    ></mwc-button>
  </mwc-dialog>`;
}

export function someAvailableRedirection(cloneEntity: Element): boolean {
  return !Array.from(referencedIEDs(cloneEntity)).every(
    ied => !validUnreferencedIEDs(ied, cloneEntity).length
  );
}

export async function cloneSubstationElement(
  editor: BayEditor | VoltageLevelEditor | SubstationEditor
): Promise<void> {
  const cloneEntity = editor.element;
  if (someAvailableRedirection(cloneEntity)) {
    editor.cloneUI = true;
    await editor.updateComplete;

    editor.dialog.show();
  } else {
    const parent = editor.element.parentElement;
    const namesake = editor.element.getAttribute('name') ?? undefined;
    if (!parent) return;

    const newName = uniqueSubstationElementName(
      parent,
      editor.element.tagName,
      namesake
    );

    const element = substationElementClone(editor.element, newName);

    editor.dispatchEvent(newActionEvent({ new: { parent, element } }));
  }
}

export type ElementEditor = Element & {
  element: Element;
};
export type ElementEditorClass<T extends ElementEditor> = new () => T;

/**
 * Moves the element edited by `editor` to the place before the next `Child`
 * editor selected or to the end of the next `Parent` editor selected by mouse
 * click or keyboard (space or enter key).
 *
 * The move action can be aborted by clicking on something other than a `Child`
 * or `Parent` editor or by hitting the escape key on the keyboard.
 */
export function startMove<
  E extends ElementEditor,
  C extends ElementEditorClass<ElementEditor>,
  P extends ElementEditorClass<ElementEditor>
>(editor: E, childClass: C, parentClasses: P[]): void {
  if (!editor.element) return;

  editor.classList.add('moving');

  const moveToTarget = (e: MouseEvent | KeyboardEvent) => {
    if (
      e instanceof KeyboardEvent &&
      e.key !== 'Escape' &&
      e.key !== ' ' &&
      e.key !== 'Enter'
    )
      return;

    e.preventDefault();
    e.stopImmediatePropagation();
    editor.classList.remove('moving');

    window.removeEventListener('keydown', moveToTarget, true);
    window.removeEventListener('click', moveToTarget, true);

    if (e instanceof KeyboardEvent && e.key === 'Escape') return;

    const targetEditor = e
      .composedPath()
      .find(
        et =>
          et instanceof childClass ||
          checkInstanceOfParentClass(et, parentClasses)
      );
    if (targetEditor === undefined || targetEditor === editor) return;

    const destination =
      targetEditor instanceof childClass
        ? {
            parent: targetEditor.element.parentElement!,
            reference: targetEditor.element,
          }
        : { parent: (<E>targetEditor).element, reference: null };

    if (!destination.parent) return;

    if (
      editor.element.parentElement !== destination.parent ||
      editor.element.nextElementSibling !== destination.reference
    )
      editor.dispatchEvent(
        newActionEvent({
          old: {
            element: editor.element,
            parent: editor.element.parentElement!,
            reference: editor.element.nextSibling,
          },
          new: destination,
        })
      );
  };

  window.addEventListener('click', moveToTarget, true);
  window.addEventListener('keydown', moveToTarget, true);
}

/**
 * Check if the eventTarget that triggered the event is one of the classes that
 * we accepted as target to use to move an element to.
 *
 * @param et - The Event Target.
 * @param classes - The list of Classes which are acceptable.
 */
function checkInstanceOfParentClass<E extends ElementEditor>(
  et: EventTarget,
  classes: ElementEditorClass<E>[]
): boolean {
  const targetEditor = classes.find(clazz => et instanceof clazz);
  return targetEditor !== undefined;
}

/**
 * Get the correct icon for a specific Conducting Equipment.
 * @param condEq - The Conducting Equipment to search the icon for.
 * @returns The icon.
 */
export function getIcon(condEq: Element): TemplateResult {
  return typeIcons[typeStr(condEq)] ?? generalConductingEquipmentIcon;
}
/**
 * Creates a general-equipment template literal.
 * FIXME(ca-d): this cannot update since it is not a LitElement instance method.
 * @param doc - Project xml document.
 * @param element - scl general-equipment element.
 * @param showfunctions - Whether rendered as action pane (true).
 * @returns - template literal.
 */
export function renderGeneralEquipment(
  doc: XMLDocument,
  element: Element,
  showfunctions: boolean
): TemplateResult {
  const generalEquipment = getChildElementsByTagName(
    element,
    'GeneralEquipment'
  );

  return generalEquipment.length
    ? html` <div
        class="${classMap({
          content: true,
          actionicon: !showfunctions,
        })}"
      >
        ${generalEquipment.map(
          gEquipment =>
            html`<general-equipment-editor
              .doc=${doc}
              .element=${gEquipment}
              ?showfunctions=${showfunctions}
            ></general-equipment-editor>`
        )}
      </div>`
    : html``;
}

const typeIcons: Partial<Record<string, TemplateResult>> = {
  CBR: circuitBreakerIcon,
  DIS: disconnectorIcon,
  CTR: currentTransformerIcon,
  VTR: voltageTransformerIcon,
  ERS: earthSwitchIcon,
};

// Substation element hierarchy
const substationPath = [
  ':root',
  'Substation',
  'VoltageLevel',
  'Bay',
  'ConductingEquipment',
];

export type SubstationTag =
  | 'Substation'
  | 'VoltageLevel'
  | 'Bay'
  | 'ConductingEquipment';

/** `Private`-safeguarded selectors for `Substation` and its descendants */
export const selectors = <Record<SubstationTag, string>>(
  Object.fromEntries(
    substationPath.map((e, i, a) => [e, a.slice(0, i + 1).join(' > ')])
  )
);

/** Common `CSS` styles used by substation subeditors */
export const styles = css`
  abbr {
    text-decoration: none;
    border-bottom: none;
  }

  .ptrContent.actionicon {
    display: grid;
    grid-gap: 12px;
    padding: 8px 12px 16px;
    box-sizing: border-box;
    grid-template-columns: repeat(auto-fit, minmax(64px, auto));
  }

  .content.actionicon {
    display: grid;
    grid-gap: 12px;
    padding: 8px 12px 16px;
    box-sizing: border-box;
    grid-template-columns: repeat(auto-fit, minmax(64px, auto));
  }

  #iedcontainer {
    display: grid;
    grid-gap: 12px;
    padding: 8px 12px 16px;
    box-sizing: border-box;
    grid-template-columns: repeat(auto-fit, minmax(64px, auto));
  }

  .container.lnode {
    display: grid;
    grid-gap: 12px;
    padding: 8px 12px 16px;
    box-sizing: border-box;
    grid-template-columns: repeat(auto-fit, minmax(64px, auto));
  }

  mwc-dialog {
    display: flex;
    flex-direction: column;
  }

  mwc-dialog > * {
    display: block;
    margin-top: 16px;
  }

  powertransformer-editor[showfunctions] {
    margin: 4px 8px 16px;
  }

  general-equipment-editor[showfunctions] {
    margin: 4px 8px 16px;
  }

  .substation-editor-icon {
    width: 24px;
    height: 24px;
  }
`;
