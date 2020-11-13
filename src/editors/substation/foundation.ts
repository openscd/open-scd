import { css } from 'lit-element';

export const styles = css`
  main,
  section {
    background-color: var(--mdc-theme-surface);
    transition: box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
    margin: 8px 12px 16px;
    overflow: auto;
  }

  main:focus,
  section:focus {
    box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  }

  main:focus-within,
  section:focus-within {
    outline: 2px solid var(--mdc-theme-primary);
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
  }

  main:focus-within > h1,
  section:focus-within > h2,
  section:focus-within > h3 {
    color: var(--mdc-theme-surface);
    background-color: var(--mdc-theme-primary);
  }

  h1 > nav,
  h2 > nav,
  h3 > nav,
  h1 > mwc-icon-button,
  h2 > mwc-icon-button,
  h3 > mwc-icon-button {
    float: right;
  }
`;
