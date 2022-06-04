import { css } from 'lit-element';

import '@material/mwc-list/mwc-list-item';

import { Create, isPublic } from '../../foundation.js';

export interface UpdateOptions {
  identity: string | null;
  doc: XMLDocument;
}
export interface CreateOptions {
  parent: Element;
}
export type WizardOptions = UpdateOptions | CreateOptions;

export const allDataTypeSelector = 'LNodeType, DOType, DAType, EnumType';

export function isCreateOptions(
  options: WizardOptions
): options is CreateOptions {
  return (<CreateOptions>options).parent !== undefined;
}

function containsCreateAction(actions: Create[], newAction: Create): boolean {
  return !actions.some(
    action =>
      action.new.parent === newAction.new.parent &&
      (<Element>action.new.element).getAttribute('id') ===
        (<Element>newAction.new.element).getAttribute('id')
  );
}

export function unifyCreateActionArray(actions: Create[]): Create[] {
  const uniqueActions: Create[] = [];
  for (const action of actions)
    if (containsCreateAction(uniqueActions, action)) uniqueActions.push(action);
  return uniqueActions;
}

export function addReferencedDataTypes(
  element: Element,
  parent: Element
): Create[] {
  const templates = element.closest('DataTypeTemplates')!;
  const ids = Array.from(parent.querySelectorAll(allDataTypeSelector))
    .filter(isPublic)
    .map(type => type.getAttribute('id'));

  const types = new Set(
    <string[]>Array.from(element.children)
      .map(child => child.getAttribute('type'))
      .filter(type => type !== null)
      .filter(type => !ids.includes(type))
  );

  const adjacents: Element[] = [];
  types.forEach(type => {
    const adjacent = templates.querySelector(
      `LNodeType[id="${type}"],DOType[id="${type}"],DAType[id="${type}"],EnumType[id="${type}"]`
    )!;

    if (adjacent !== null && isPublic(adjacent)) adjacents.push(adjacent);
  });

  const actions: Create[] = [];
  adjacents
    .flatMap(adjacent => addReferencedDataTypes(adjacent, parent))
    .forEach(action => actions.push(action));

  adjacents.forEach(adjacent => {
    actions.push({
      new: {
        parent,
        element: <Element>adjacent.cloneNode(true),
      },
    });
  });

  return actions;
}

/** Common `CSS` styles used by DataTypeTemplate subeditors */
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

  abbr[title] {
    border-bottom: none !important;
    cursor: inherit !important;
    text-decoration: none !important;
  }
`;
