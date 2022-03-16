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

import './elements/sampled-values-message.js';
import { compareNames, getNameAttribute } from '../../foundation.js';
import { styles } from './foundation.js';

/** An sub element for showing all Sampled Values per IED. */
@customElement('sampled-values-list')
export class SampledValuesList extends LitElement {
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
   * Get all the Sampled Values.
   * @param ied - The IED to search through.
   * @returns All the Sampled Values of this specific IED.
   */
  private getSampledValuesControls(ied: Element): Element[] {
    return Array.from(
      ied.querySelectorAll(
        ':scope > AccessPoint > Server > LDevice > LN0 > SampledValueControl'
      )
    );
  }

  render(): TemplateResult {
    return html` <section>
      <h1>${translate('sampledvalues.sampledValuesList.title')}</h1>
      <mwc-list>
        ${this.ieds.map(ied =>
          ied.querySelector('SampledValueControl')
            ? html`
                <mwc-list-item noninteractive graphic="icon">
                  <span class="iedListTitle">${getNameAttribute(ied)}</span>
                  <mwc-icon slot="graphic">developer_board</mwc-icon>
                </mwc-list-item>
                <li divider role="separator"></li>
                ${this.getSampledValuesControls(ied).map(
                  control =>
                    html`<sampled-values-message .element=${control}></sampled-values-message>`
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
