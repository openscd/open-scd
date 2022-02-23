import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';
import { GOOSEDataSetEvent } from '../../foundation.js';

/**
 * An IED within this IED list has 2 properties:
 * - The IED element itself.
 * - A 'partial' property indicating if the GOOSE is fully initialized or partially.
 */
interface IED {
  element: Element;
  partial?: boolean;
}

/** An sub element for subscribing and unsubscribing IEDs to GOOSE messages. */
@customElement('subscriber-ied-list')
export class SubscriberIEDList extends LitElement {
  @property()
  doc!: XMLDocument;

  /** List holding all current subscribed IEDs. */
  subscribedIeds: IED[] = [];

  /** List holding all current avaialble IEDs which are not subscribed. */
  availableIeds: IED[] = [];

  /** Current selected IED. */
  iedName!: string;

  /** Current selected GOOSE message. */
  gseName!: string;
  
  @query('div') subscriberWrapper!: Element;

  constructor() {
    super();
    this.onGOOSEDataSetEvent = this.onGOOSEDataSetEvent.bind(this);
    const openScdElement = document.querySelector('open-scd');
    if (openScdElement) {
      openScdElement.addEventListener('goose-dataset', this.onGOOSEDataSetEvent);
    }
  }

  /**
   * When a GOOSEDataSetEvent is received, check for all IEDs if
   * all FCDAs are covered, or partly FCDAs are covered.
   * @param event - Incoming event.
   */
  private async onGOOSEDataSetEvent(event: GOOSEDataSetEvent) {
    this.iedName = event.detail.iedName;
    this.gseName = event.detail.gseName;

    const dataSet = event.detail.dataset;

    this.clearIedLists();

    Array.from(this.doc.querySelectorAll(':root > IED')).forEach(ied => {
      const inputs = ied.querySelector(`LN0[lnClass="LLN0"] > Inputs`);

      let partiallySubscribed = false;
      
      /**
       * If no Inputs element is found, we can safely say it's not subscribed.
       */
      if (!inputs) {
        this.availableIeds.push({element: ied});
        return;
      }

      /**
       * If there is an ExtRef element, we just search for the first linked FCDA that cannot be found.
       * It so, it's partially subscribed.
       */
      dataSet.querySelectorAll('FCDA').forEach(fcda => {
        if(!inputs.querySelector(`ExtRef[iedName=${event.detail.iedName}][serviceType="GOOSE"]` +
          `${
            fcda.getAttribute('ldInst')
              ? `[ldInst="${fcda.getAttribute('ldInst')}"]`
              : ``
          }${
            fcda.getAttribute('lnClass')
              ? `[lnClass="${fcda.getAttribute('lnClass')}"]`
              : ``
          }${
            fcda.getAttribute('lnInst')
              ? `[lnInst="${fcda.getAttribute('lnInst')}"]`
              : ``
          }${
            fcda.getAttribute('prefix')
              ? `[prefix="${fcda.getAttribute('prefix')}"]`
              : ``
          }${
            fcda.getAttribute('doName')
              ? `[doName="${fcda.getAttribute('doName')}"]`
              : ``
          }${
            fcda.getAttribute('daName')
              ? `[daName="${fcda.getAttribute('daName')}"]`
              : ``
          }`)) {
            partiallySubscribed = true;
          }
      })

      partiallySubscribed ? this.availableIeds.push({element: ied, partial: true}) : this.subscribedIeds.push({element: ied})
      
    })

    this.requestUpdate();
  }

  /**
   * Clear all the IED lists.
   */
  private clearIedLists() {
    this.subscribedIeds = [];
    this.availableIeds = [];
  }

  protected updated(): void {
    if (this.subscriberWrapper) {
      this.subscriberWrapper.scrollTo(0,0);
    }
  }

  render(): TemplateResult {
    const partialSubscribedIeds = this.availableIeds.filter(ied => ied.partial);

    return html`
      <h1>${translate('subscription.subscriberIed.title', {
        selected: this.gseName ? this.iedName+'>'+this.gseName : 'IED'
      })}</h1>
      ${this.gseName ?
      html`<div class="subscriberWrapper">
        <mwc-list>
          <mwc-list-item noninteractive>
            <span class="iedListTitle">${translate('subscription.subscriberIed.subscribed')}</span>
          </mwc-list-item>
          <li divider role="separator"></li>
          ${this.subscribedIeds.length > 0 ?
            this.subscribedIeds.map(ied => html`
            <mwc-list-item graphic="avatar" hasMeta>
              <span>${ied.element.getAttribute('name')}</span>
              <mwc-icon slot="graphic">clear</mwc-icon>
            </mwc-list-item>`)
            : html`<mwc-list-item graphic="avatar" noninteractive>
              <span>${translate('subscription.none')}</span>
            </mwc-list-item>`}
          </mwc-list>
          <mwc-list>
            <mwc-list-item noninteractive>
              <span class="iedListTitle">${translate('subscription.subscriberIed.partiallySubscribed')}</span>
            </mwc-list-item>
            <li divider role="separator"></li>
            ${partialSubscribedIeds.length > 0 ?
              partialSubscribedIeds.map(ied => html`
              <mwc-list-item graphic="avatar" hasMeta>
                <span>${ied.element.getAttribute('name')}</span>
                <mwc-icon slot="graphic">add</mwc-icon>
              </mwc-list-item>`)
              : html`<mwc-list-item graphic="avatar" noninteractive>
              <span>${translate('subscription.none')}</span>
            </mwc-list-item>`}
          </mwc-list>
          <mwc-list>
            <mwc-list-item noninteractive>
              <span class="iedListTitle">${translate('subscription.subscriberIed.availableToSubscribe')}</span>
            </mwc-list-item>
            <li divider role="separator"></li>
            ${this.availableIeds.length > 0 ?
              this.availableIeds.map(ied => html`
              <mwc-list-item graphic="avatar" hasMeta>
                <span>${ied.element.getAttribute('name')}</span>
                <mwc-icon slot="graphic">add</mwc-icon>
              </mwc-list-item>`)
              : html`<mwc-list-item graphic="avatar" noninteractive>
              <span>${translate('subscription.none')}</span>
            </mwc-list-item>`}
          </mwc-list>` : html`<mwc-list>
            <mwc-list-item noninteractive>
              <span class="iedListTitle">${translate('subscription.subscriberIed.noGooseMessageSelected')}</span>
            </mwc-list-item>
          </mwc-list>
        </div>`}
      `;
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

    .subscriberWrapper {
      height: 45rem;
      overflow-y: scroll;
    }

    .iedListTitle {
      font-weight: bold;
    }
  `;
}
