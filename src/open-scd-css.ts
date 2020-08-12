import { css } from 'lit-element';

export const styles = css`
  * {
    --mdc-theme-primary: #005496;
    --mdc-theme-secondary: #d20a11;
    --mdc-theme-background: #ffdd00;
    --mdc-theme-on-secondary: #ffdd00;
    --mdc-theme-on-background: #005496;
  }

  #file-input {
    display: none;
  }

  #log {
    --mdc-dialog-max-width: 92vw;
  }

  mwc-circular-progress-four-color {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    --mdc-circular-progress-bar-color-1: #005496;
    --mdc-circular-progress-bar-color-2: #d20a11;
    --mdc-circular-progress-bar-color-3: #005496;
    --mdc-circular-progress-bar-color-4: #ffdd00;
  }

  tt {
    font-family: 'Roboto Mono', monospace;
    font-weight: 300;
  }
`;
