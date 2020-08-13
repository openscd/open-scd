import { customElement } from 'lit-element';
import { OpenSCDBase } from './open-scd-base.js';
import { styles } from './open-scd-css.js';

declare global {
  interface HTMLElementTagNameMap {
    'open-scd': OpenSCD;
  }
}

@customElement('open-scd')
export class OpenSCD extends OpenSCDBase {
  static styles = styles;
}
