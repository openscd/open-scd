import { css } from 'lit-element';

export const styles = css`
  main {
    padding: 16px;
  }

  * {
    --mdc-theme-primary: #005496;
    --mdc-theme-secondary: #d20a11;
    --mdc-theme-background: #ffdd00;
    --mdc-theme-on-secondary: #ffdd00;
    --mdc-theme-on-background: #005496;
  }

  h1,
  h2 {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
  }

  mwc-dialog {
    display: flex;
    flex-direction: column;
  }

  mwc-dialog > * {
    display: block;
    margin-top: 24px;
  }

  pre {
    font-family: 'Roboto Mono', monospace;
    font-weight: 300;
  }

  mwc-fab {
    position: fixed;
    bottom: 32px;
    right: 32px;
  }
`;
