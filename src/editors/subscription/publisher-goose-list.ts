import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import './elements/goose-message.js';

import { translate } from 'lit-translate';
import { compareNames, getNameAttribute } from '../../foundation.js';

/** An sub element for showing all published GOOSE messages per IED. */
@customElement('publisher-goose-list')
export class PublisherGOOSEList extends LitElement {
  @property()
  doc!: XMLDocument;

  private get ieds() : Element[] {
    return (this.doc)
      ? Array.from(this.doc.querySelectorAll(':root > IED')).sort((a,b) => compareNames(a,b))
      : [];
  }

  /**
   * Get all the published GOOSE messages, ABB method.
   * @param ied - The IED to search through.
   * @returns All the published GOOSE messages of this specific IED.
   */
  private getGSEControls(ied: Element) : Element[] {
    return Array.from(ied.querySelectorAll(':scope > AccessPoint > Server > LDevice > LN0[lnClass="LLN0"] > GSEControl'));
  }

  render(): TemplateResult {
    return html`
    <h1>${translate('subscription.publisherGoose.title')}</h1>
    <mwc-list>
    ${this.ieds.map(ied =>
      ied.querySelector('GSEControl') ?
        html`
          <mwc-list-item noninteractive graphic="icon">
            <span class="iedListTitle">${getNameAttribute(ied)}</span>
            <mwc-icon slot="graphic">developer_board</mwc-icon>
          </mwc-list-item>
          <li divider role="separator"></li>
          ${this.getGSEControls(ied).map(control =>
            html`<goose-message
              .element=${control}
            ></goose-message>`)}
        ` : ``)}
    </mwc-list>`;
  }

  static styles = css`
    h1 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
      transition: background-color 150ms linear;
    }

    mwc-list {
      height: 45rem;
      overflow-y: scroll;
    }

    .iedListTitle {
      font-weight: bold;
    }
  `;
}
