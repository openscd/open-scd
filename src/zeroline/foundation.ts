import { css, html, TemplateResult } from 'lit-element';
import {
  EditorAction,
  getValue,
  newActionEvent,
  WizardActor,
  WizardInput,
  isPublic,
} from '../foundation.js';

import { BayEditor } from './bay-editor.js';
import { VoltageLevelEditor } from './voltage-level-editor.js';

function containsReference(element: Element, iedName: string): boolean {
  return (
    Array.from(element.querySelectorAll('LNode'))
      .filter(isPublic)
      .filter(lnode => lnode.getAttribute('iedName') === iedName).length !== 0
  );
}

function isReferencedItself(element: Element, iedName: string): boolean {
  return (
    (<Element[]>Array.from(element.children)).filter(
      child =>
        child.tagName === 'LNode' && child.getAttribute('iedName') === iedName
    ).length !== 0
  );
}

function hasReferencedChildren(
  element: Element,
  iedName: string,
  multi: boolean
): boolean {
  const threshold = multi ? 1 : 0;
  return (
    (<Element[]>Array.from(element.children)).filter(child =>
      containsReference(child, iedName)
    ).length > threshold
  );
}

function isReferencedAside(element: Element, iedName: string): boolean {
  const isUnique =
    (<Element[]>Array.from(element.children)).filter(child =>
      containsReference(child, iedName)
    ).length === 1;

  if (!isUnique) return true;
  if (element.parentElement && !(element.parentElement instanceof XMLDocument))
    return isReferencedAside(element.parentElement, iedName);

  return false;
}

function isReferencedAbove(element: Element, iedName: string): boolean {
  const isReferenced = isReferencedItself(element, iedName);

  if (isReferenced) return true;

  if (element.parentElement && !(element.parentElement instanceof XMLDocument))
    return isReferencedAbove(element.parentElement, iedName);

  return false;
}

export function attachedIeds(element: Element): Element[] {
  const doc = element.ownerDocument;
  const ieds = Array.from(doc.querySelectorAll(':root > IED'));

  const attachedIeds: Element[] = [];
  ieds.forEach(ied => {
    const iedName = ied.getAttribute('name')!;

    const belongsHere =
      hasReferencedChildren(
        element,
        iedName,
        element.tagName === 'Bay' ? false : true
      ) || isReferencedItself(element, iedName);
    const belongsAbove =
      isReferencedAbove(element.parentElement!, iedName) ||
      isReferencedAside(element.parentElement!, iedName);

    if (!belongsAbove && belongsHere) attachedIeds.push(ied);
  });

  return attachedIeds;
}

export function unreferencedIeds(doc: XMLDocument): Element[] {
  const ieds = Array.from(doc.querySelectorAll(':root > IED'));
  const root = doc.querySelector(':root');
  if (!root) return [];

  const unreferencedIeds: Element[] = [];

  ieds.forEach(ied => {
    const iedName = ied.getAttribute('name')!;
    if (
      hasReferencedChildren(root, iedName, true) ||
      Array.from(doc.querySelectorAll('LNode'))
        .filter(isPublic)
        .filter(lnode => lnode.getAttribute('iedName') === iedName).length === 0
    )
      unreferencedIeds.push(ied);
  });

  return unreferencedIeds;
}

export function renderIedContainer(element: Element): TemplateResult {
  return attachedIeds(element).length > 0
    ? html`<div id="iedcontainer">
        ${attachedIeds(element).map(
          ied => html`<ied-editor .element=${ied}></ied-editor>`
        )}
        <style>
          #iedcontainer {
            display: grid;
            grid-gap: 12px;
            padding: 8px 12px 16px;
            box-sizing: border-box;
            grid-template-columns: repeat(auto-fit, minmax(64px, auto));
          }
        </style>
      </div>`
    : html``;
}

export type ElementEditor = Element & {
  element: Element;
};

interface UpdateOptions {
  element: Element;
}
interface CreateOptions {
  parent: Element;
}
export type WizardOptions = UpdateOptions | CreateOptions;

export function isCreateOptions(
  options: WizardOptions
): options is CreateOptions {
  return (<CreateOptions>options).parent !== undefined;
}

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

export function cloneElement(editor: BayEditor | VoltageLevelEditor): void {
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
        reference: element.nextElementSibling,
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
            reference: editor.element.nextElementSibling,
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
`;
