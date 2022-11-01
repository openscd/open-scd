import {
  LitElement,
  TemplateResult,
  html,
  customElement,
  property,
  state,
} from 'lit-element';

import '@material/mwc-icon';

import '../../action-icon.js';
import { sizableSmvIcon } from '../../icons/icons.js';

@customElement('smv-editor')
export class SmvEditor extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ attribute: false })
  element!: Element;

  @state()
  get label(): string {
    return (
      this.element.getAttribute('ldInst') +
      '/' +
      this.element.getAttribute('cbName')
    );
  }

  render(): TemplateResult {
    return html`<action-icon label="${this.label}"
      ><mwc-icon slot="icon">${sizableSmvIcon}</mwc-icon>
    </action-icon>`;
  }
}
