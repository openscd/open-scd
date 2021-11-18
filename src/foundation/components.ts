import { styles as dialogStyles } from '@material/mwc-dialog/mwc-dialog.css.js';
import { styles as buttonStyles } from '@material/mwc-button/styles.css.js';
import { DialogBase } from '@material/mwc-dialog/mwc-dialog-base.js';
import { ButtonBase } from '@material/mwc-button/mwc-button-base.js';

export class Dialog extends DialogBase {
  static styles = [dialogStyles];
}

export class Button extends ButtonBase {
  static styles = [buttonStyles];
}

