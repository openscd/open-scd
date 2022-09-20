import {css} from "lit-element";

export function getElementByName(parent: Element, namespace: string, tagName: string): Element | null {
  const elements = parent.getElementsByTagNameNS(namespace, tagName);
  if (elements.length > 0) {
    return elements.item(0);
  }
  return null;
}

/** Common `CSS` styles used by Compas Editors subeditors */
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

  h1 {
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
`;
