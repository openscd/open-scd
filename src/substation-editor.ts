import { customElement } from 'lit-element';
import { SubstationEditorBase } from './substation-editor-base.js';
import { styles } from './substation-editor-css.js';

declare global {
  interface HTMLElementTagNameMap {
    'substation-editor': SubstationEditor;
  }
}

@customElement('substation-editor')
export class SubstationEditor extends SubstationEditorBase {
  static styles = styles;
}
