import { styles as dialogStyles } from '@material/mwc-dialog/mwc-dialog.css.js';
import { styles as buttonStyles } from '@material/mwc-button/styles.css.js';
import { styles as checkboxStyles } from '@material/mwc-checkbox/mwc-checkbox.css.js';
import { styles as circularProgressFourColorStyles } from '@material/mwc-circular-progress-four-color/mwc-circular-progress-four-color.css.js';
import { styles as selectStyles } from '@material/mwc-select/mwc-select.css.js';
import { DialogBase } from '@material/mwc-dialog/mwc-dialog-base.js';
import { ButtonBase } from '@material/mwc-button/mwc-button-base.js';
import { CheckboxBase } from '@material/mwc-checkbox/mwc-checkbox-base.js';
import { CircularProgressFourColorBase } from '@material/mwc-circular-progress-four-color/mwc-circular-progress-four-color-base.js';
import { SelectBase } from '@material/mwc-select/mwc-select-base.js';

export class Dialog extends DialogBase {
  static styles = [dialogStyles];
}

export class Button extends ButtonBase {
  static styles = [buttonStyles];
}

export class Checkbox extends CheckboxBase {
  static styles = [checkboxStyles];
}

export class CircularProgressFourColor extends CircularProgressFourColorBase {
  static styles = [circularProgressFourColorStyles];
}

export class Select extends SelectBase {
  static styles = [selectStyles];
}

