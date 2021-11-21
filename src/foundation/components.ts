import { styles as dialogStyles } from '@material/mwc-dialog/mwc-dialog.css.js';
import { styles as buttonStyles } from '@material/mwc-button/styles.css.js';
import { styles as checkboxStyles } from '@material/mwc-checkbox/mwc-checkbox.css.js';
import { styles as circularProgressFourColorStyles } from '@material/mwc-circular-progress-four-color/mwc-circular-progress-four-color.css.js';
import { styles as selectStyles } from '@material/mwc-select/mwc-select.css.js';
import { styles as drawerStyles } from '@material/mwc-drawer/mwc-drawer.css.js';
import { styles as fabStyles } from '@material/mwc-fab/mwc-fab.css.js';
import { styles as formFieldStyles } from '@material/mwc-formfield/mwc-formfield.css.js';
import { styles as iconButtonStyles } from '@material/mwc-icon-button/mwc-icon-button.css.js';
import { styles as listItemStyles } from '@material/mwc-list/mwc-list-item.css.js';
import { styles as checkListItemStyles } from '@material/mwc-list/mwc-control-list-item.css.js';
import { styles as listStyles } from '@material/mwc-list/mwc-list.css.js';

import { DialogBase } from '@material/mwc-dialog/mwc-dialog-base.js';
import { ButtonBase } from '@material/mwc-button/mwc-button-base.js';
import { CheckboxBase } from '@material/mwc-checkbox/mwc-checkbox-base.js';
import { CircularProgressFourColorBase } from '@material/mwc-circular-progress-four-color/mwc-circular-progress-four-color-base.js';
import { SelectBase } from '@material/mwc-select/mwc-select-base.js';
import { DrawerBase } from '@material/mwc-drawer/mwc-drawer-base.js';
import { FabBase } from '@material/mwc-fab/mwc-fab-base.js';
import { FormfieldBase } from '@material/mwc-formfield/mwc-formfield-base.js';
import { IconButtonBase } from '@material/mwc-icon-button/mwc-icon-button-base.js';
import { IconButtonToggleBase } from '@material/mwc-icon-button-toggle/mwc-icon-button-toggle-base.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base.js';
import { CheckListItemBase } from '@material/mwc-list/mwc-check-list-item-base.js';
import { RadioListItemBase } from '@material/mwc-list/mwc-radio-list-item-base.js';
import { ListBase } from '@material/mwc-list/mwc-list-base.js';

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

export class Drawer extends DrawerBase {
  static styles = [drawerStyles];
}

export class Fab extends FabBase {
  static styles = [fabStyles];
}

export class Formfield extends FormfieldBase {
  static styles = [formFieldStyles];
}

export class IconButton extends IconButtonBase {
  static styles = [iconButtonStyles];
}

export class IconButtonToggle extends IconButtonToggleBase {
  static styles = [iconButtonStyles];
}

export class ListItem extends ListItemBase {
  static styles = [listItemStyles];
}

export class CheckListItem extends CheckListItemBase {
  static styles = [listItemStyles, checkListItemStyles];
}

export class RadioListItem extends RadioListItemBase {
  static styles = [listItemStyles, checkListItemStyles];
}

export class List extends ListBase {
  static styles = [listStyles];
}
