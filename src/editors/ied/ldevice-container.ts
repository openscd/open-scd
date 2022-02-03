import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';

import '../../action-pane.js';
import './ln-container.js'
import { nothing } from 'lit-html';
import { getDescriptionAttribute, getInstanceAttribute, getNameAttribute } from '../../foundation.js';
import { IconButtonToggle } from '@material/mwc-icon-button-toggle';
import { translate } from 'lit-translate';
import { Nsdoc } from '../../foundation/nsdoc.js';

/** [[`IED`]] plugin subeditor for editing `LDevice` element. */
@customElement('ldevice-container')
export class LDeviceContainer extends LitElement {
  @property({ attribute: false })
  element!: Element;

  @property()
  nsdoc!: Nsdoc;
  
  @query('#toggleButton') toggleButton!: IconButtonToggle | undefined;

  private header(): TemplateResult {
    const nameOrInst = getNameAttribute(this.element) ?? getInstanceAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);

    return html`${nameOrInst}${desc ? html` &mdash; ${desc}` : nothing}`;
  }

  protected firstUpdated(): void {
    this.requestUpdate();
  }

  render(): TemplateResult {
    const lnElements = Array.from(this.element.querySelectorAll(':scope > LN,LN0'));
    
    return html`<action-pane .label="${this.header()}">
      ${lnElements.length > 0 ? html`<abbr slot="action" title="${translate('iededitor.toggleChildElements')}">
        <mwc-icon-button-toggle
          on
          id="toggleButton"
          onIcon="keyboard_arrow_up"
          offIcon="keyboard_arrow_down"
          @click=${() => this.requestUpdate()}
        ></mwc-icon-button-toggle>
      </abbr>` : nothing}
      <div id="lnContainer">
        ${this.toggleButton?.on ? lnElements.map(ln => html`<ln-container
            .element=${ln}
            .nsdoc=${this.nsdoc}
          ></ln-container>
          `) : nothing}
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
