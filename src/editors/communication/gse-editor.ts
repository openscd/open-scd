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
import { sizableGooseIcon } from '../../icons/icons.js';

@customElement('gse-editor')
export class GseEditor extends LitElement {
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
      ><mwc-icon slot="icon">${sizableGooseIcon}</mwc-icon></action-icon
    >`;
  }
}
