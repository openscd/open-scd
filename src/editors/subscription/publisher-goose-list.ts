import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-icon';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';

import './elements/goose-message.js';
import { compareNames, getNameAttribute } from '../../foundation.js';
import { styles } from './foundation.js';

/** An sub element for showing all published GOOSE messages per IED. */
@customElement('publisher-goose-list')
export class PublisherGOOSEList extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  private get ieds(): Element[] {
    return this.doc
      ? Array.from(this.doc.querySelectorAll(':root > IED')).sort((a, b) =>
          compareNames(a, b)
        )
      : [];
  }

  /**
   * Get all the published GOOSE messages.
   * @param ied - The IED to search through.
   * @returns All the published GOOSE messages of this specific IED.
   */
  private getGSEControls(ied: Element): Element[] {
    return Array.from(
      ied.querySelectorAll(
        ':scope > AccessPoint > Server > LDevice > LN0 > GSEControl'
      )
    );
  }

  render(): TemplateResult {
    return html` <section>
      <h1>${translate('subscription.publisherGoose.title')}</h1>
      <mwc-list>
        ${this.ieds.map(ied =>
          ied.querySelector('GSEControl')
            ? html`
                <mwc-list-item noninteractive graphic="icon">
                  <span class="iedListTitle">${getNameAttribute(ied)}</span>
                  <mwc-icon slot="graphic">developer_board</mwc-icon>
                </mwc-list-item>
                <li divider role="separator"></li>
                ${this.getGSEControls(ied).map(
                  control =>
                    html`<goose-message .element=${control}></goose-message>`
                )}
              `
            : ``
        )}
      </mwc-list>
    </section>`;
  }

  static styles = css`
    ${styles}

    mwc-list {
      height: 100vh;
      overflow-y: scroll;
    }

    .iedListTitle {
      font-weight: bold;
    }
  `;
}
