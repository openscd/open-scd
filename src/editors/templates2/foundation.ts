import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { css } from 'lit-element';

export function getReferencedChild(element: Element): Element | undefined {
  if (element.tagName === 'DO' || element.tagName === 'SDO')
    return (
      element.ownerDocument.querySelector(
        `DOType[id="${element.getAttribute('type')}"]`
      ) ?? undefined
    );

  if (element.tagName === 'DA' || element.tagName === 'BDA')
    return (
      element.ownerDocument.querySelector(
        `DAType[id="${element.getAttribute('type')}"]`
      ) ?? undefined
    );

  return undefined;
}

/** Sorts selected `ListItem`s to the top and disabled ones to the bottom. */
export function compareSelection(a: ListItemBase, b: ListItemBase): number {
  if (a.disabled !== b.disabled) return b.disabled ? -1 : 1;

  if (a.selected !== b.selected) return a.selected ? -1 : 1;

  return 0;
}

/** Sorts selected `ListItem`s to the top and disabled ones to the bottom. */
export function compareNames(a: ListItemBase, b: ListItemBase): number {
  if (a.innerText > b.innerText) return 1;
  if (a.innerText < b.innerText) return -1;
  return 0;
}

/** Common `CSS` styles used by DataTypeTemplate subeditors */
export const styles = css`
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
