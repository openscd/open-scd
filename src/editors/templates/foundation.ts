import { css } from 'lit-element';

import {
  EditorAction,
  getValue,
  WizardAction,
  WizardInput,
} from '../../foundation.js';

interface UpdateOptions {
  element: Element;
}
interface CreateOptions {
  parent: Element;
  templates: XMLDocument;
}
export type WizardOptions = UpdateOptions | CreateOptions;

export function isCreateOptions(
  options: WizardOptions
): options is CreateOptions {
  return (<CreateOptions>options).parent !== undefined;
}

export function updateIDNamingAction(element: Element): WizardAction {
  return (inputs: WizardInput[]): EditorAction[] => {
    const id = getValue(inputs.find(i => i.label === 'id')!)!;
    const desc = getValue(inputs.find(i => i.label === 'desc')!);

    if (
      id === element.getAttribute('id') &&
      desc === element.getAttribute('desc')
    )
      return [];

    const newElement = <Element>element.cloneNode(false);
    newElement.setAttribute('id', id);
    if (desc === null) newElement.removeAttribute('desc');
    else newElement.setAttribute('desc', desc);

    return [{ old: { element }, new: { element: newElement } }];
  };
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

  abbr[title] {
    border-bottom: none !important;
    cursor: inherit !important;
    text-decoration: none !important;
  }
`;
