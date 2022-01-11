import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import '../../action-pane.js';
import './ln-container.js'
import { nothing } from 'lit-html';
import { getDescriptionAttribute, getInstanceAttribute, getNameAttribute } from '../../foundation.js';

/** [[`IED`]] plugin subeditor for editing `LDevice` element. */
@customElement('ldevice-container')
export class LDeviceContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

  private header(): TemplateResult {
    const nameOrInst = getNameAttribute(this.element) ?? getInstanceAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);

    return html`${nameOrInst}${desc ? html` &mdash; ${desc}` : nothing}`;
  }

  render(): TemplateResult {
    return html`<action-pane .label="${this.header()}">
    <div id="lnContainer">
      ${Array.from(this.element.querySelectorAll(':scope > LN,LN0')).map(
        server => html`<ln-container
          .element=${server}
        ></ln-container>`)}
    </div>
    </action-pane>`;
  }

  static styles = css`
    #lnContainer {
      display: grid;
      grid-gap: 12px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, auto));
    }

    @media (max-width: 387px) {
      #lnContainer {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }`;
}
