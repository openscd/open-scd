import { LitElement, html, TemplateResult, property, css } from 'lit-element';

import '@material/mwc-fab';
import { translate } from 'lit-translate';
import { compareNames, getNameAttribute } from '../foundation.js';
import { SelectedEvent } from '@material/mwc-list/mwc-list-foundation';

/** An editor [[`plugin`]] for subscribing IEDs to GOOSE messages using the ABB subscription method. */
export default class SubscriptionABBPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  private get ieds() : Element[] {
    return (this.doc)
      ? Array.from(this.doc.querySelectorAll(':root > IED')).sort((a,b) => compareNames(a,b))
      : [];
  }

  private getGSEControls(ied: Element) : Element[] {
    return Array.from(ied.querySelectorAll(':scope > AccessPoint > Server > LDevice > LN0[lnClass="LLN0"] > GSEControl'));
  }

  private onGooseSelect = (evt: SelectedEvent) => {
    console.log('selected!')
  };

  render(): TemplateResult {
    return html`
    <div id="containerTemplates">
      <section tabindex="0">
        <h1>${translate('subscription.publisherGoose')}</h1>
        <mwc-list
          @selected=${this.onGooseSelect}>
        ${this.ieds.map(ied =>
          ied.querySelector('GSEControl') ?
            html`
              <mwc-list-item graphic="avatar" noninteractive>
                <span>${getNameAttribute(ied)}</span>
                <mwc-icon slot="graphic" class="inverted">developer_board</mwc-icon>
              </mwc-list-item>
              <li divider role="separator"></li>
              ${this.getGSEControls(ied).map(control => 
                html`<mwc-list-item hasMeta>
                  <span>${control.getAttribute('name')}</span>
                  <mwc-icon slot="meta">edit</mwc-icon>
                </mwc-list-item>`
              )}
            ` : ``)}
        </mwc-list>
      </section>
      <section tabindex="0">
        <h1>${translate('subscription.subscriberIed')}</h1>
      </section>
    </div>`;
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
    
    :host {
      width: 100vw;
    }

    #containerTemplates {
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, auto));
    }

    @media (max-width: 387px) {
      #containerTemplates {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }
  `;
}
