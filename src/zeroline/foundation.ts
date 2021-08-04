import { css } from 'lit-element';

import {
  EditorAction,
  getValue,
  newActionEvent,
  WizardActor,
  WizardInput,
  isPublic,
  cloneElement,
} from '../foundation.js';

import { BayEditor } from './bay-editor.js';
import { SubstationEditor } from './substation-editor.js';
import { VoltageLevelEditor } from './voltage-level-editor.js';

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

export type ElementEditor = Element & {
  element: Element;
};

export function updateNamingAction(element: Element): WizardActor {
  return (inputs: WizardInput[]): EditorAction[] => {
    const name = getValue(inputs.find(i => i.label === 'name')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);

    if (
      name === element.getAttribute('name') &&
      desc === element.getAttribute('desc')
    )
      return [];

    const newElement = <Element>element.cloneNode(false);
    newElement.setAttribute('name', name);
    if (desc === null) newElement.removeAttribute('desc');
    else newElement.setAttribute('desc', desc);

    return [{ old: { element }, new: { element: newElement } }];
  };
}

export function cloneSubstationElement(
  editor: BayEditor | VoltageLevelEditor | SubstationEditor
): void {
  const element: Element = editor.element;
  const parent: Element = element.parentElement!;
  const num = parent.querySelectorAll(
    `${element.tagName}[name^="${element.getAttribute('name') ?? ''}"]`
  ).length;

  const clone: Element = <Element>element.cloneNode(true);
  clone
    .querySelectorAll('LNode')
    .forEach(lNode => lNode.parentElement?.removeChild(lNode));
  // lNode element must be unique within substation -> must be removed

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

  clone.setAttribute('name', element.getAttribute('name')! + num);

  editor.dispatchEvent(
    newActionEvent({
      new: {
        parent: parent,
        element: clone,
        reference: element.nextSibling,
      },
    })
  );
}

/**
 * Moves the element edited by `editor` to the place before the next `Child`
 * editor selected or to the end of the next `Parent` editor selected by mouse
 * click or keyboard (space or enter key).
 *
 * The move action can be aborted by clicking on something other than a `Child`
 * or `Parent` editor or by hitting the escape key on the keyboard.
 */
export function startMove<E extends ElementEditor, P extends ElementEditor>(
  editor: E,
  Child: new () => E,
  Parent: new () => P
): void {
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
      .find(e => e instanceof Child || e instanceof Parent);

    if (targetEditor === undefined || targetEditor === editor) return;

    const destination =
      targetEditor instanceof Child
        ? {
            parent: targetEditor.element.parentElement!,
            reference: targetEditor.element,
          }
        : { parent: (<P>targetEditor).element, reference: null };

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
  :host(.moving) section {
    opacity: 0.3;
  }

  section {
    background-color: var(--mdc-theme-surface);
    transition: all 200ms linear;
    outline-color: var(--mdc-theme-primary);
    outline-style: solid;
    outline-width: 0px;
    margin: 8px 12px 16px;
    opacity: 1;
  }

  section:focus {
    box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  }

  section:focus-within {
    outline-width: 2px;
    transition: all 250ms linear;
  }

  h1,
  h2,
  h3 {
    color: var(--mdc-theme-on-surface);
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0px;
    line-height: 48px;
    padding-left: 0.3em;
    transition: background-color 150ms linear;
  }

  section:focus-within > h1,
  section:focus-within > h2,
  section:focus-within > h3 {
    color: var(--mdc-theme-surface);
    background-color: var(--mdc-theme-primary);
    transition: background-color 200ms linear;
  }

  h1 > nav,
  h2 > nav,
  h3 > nav,
  h1 > abbr > mwc-icon-button,
  h2 > abbr > mwc-icon-button,
  h3 > abbr > mwc-icon-button {
    float: right;
  }

  abbr {
    text-decoration: none;
    border-bottom: none;
  }

  #iedcontainer {
    display: grid;
    grid-gap: 12px;
    padding: 8px 12px 16px;
    box-sizing: border-box;
    grid-template-columns: repeat(auto-fit, minmax(64px, auto));
  }
`;
