import { css } from 'lit-element';

export const styles = css`
  :host {
    position: relative;
    z-index: -1;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }

  * {
    --mdc-theme-primary: #005496;
    --mdc-theme-secondary: #d20a11;
    --mdc-theme-background: #ffdd00;
    --mdc-theme-on-secondary: #ffdd00;
    --mdc-theme-on-background: #005496;
  }

  tt {
    font-family: 'Roboto Mono', monospace;
    font-weight: 300;
  }
`;
