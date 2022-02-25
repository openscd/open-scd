import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult,
} from 'lit-element';

import './elements/ied-element.js';

import { translate } from 'lit-translate';
import { GOOSEDataSetEvent, IEDSubscriptionEvent, SubscribeStatus } from '../../foundation.js';
import { styles } from '../templates/foundation.js';

/**
 * An IED within this IED list has 2 properties:
 * - The IED element itself.
 * - A 'partial' property indicating if the GOOSE is fully initialized or partially.
 */
interface IED {
  element: Element;
  partial?: boolean;
}

/**
 * All available FCDA references that are used to link ExtRefs.
 */
const fcdaReferences = [
  "ldInst",
  "lnClass",
  "lnInst",
  "prefix",
  "doName",
  "daName",
];

/** An sub element for subscribing and unsubscribing IEDs to GOOSE messages. */
@customElement('subscriber-ied-list')
export class SubscriberIEDList extends LitElement {
  @property()
  doc!: XMLDocument;

  /** List holding all current subscribed IEDs. */
  subscribedIeds: IED[] = [];

  /** List holding all current avaialble IEDs which are not subscribed. */
  availableIeds: IED[] = [];

  currentSelectedGooseIED!: string;

  currentSelectedGoose!: string;

  currentSelectedGooseDataset!: Element;
  
  @query('div') subscriberWrapper!: Element;

  constructor() {
    super();
    this.onGOOSEDataSetEvent = this.onGOOSEDataSetEvent.bind(this);
    this.onIEDSubscriptionEvent = this.onIEDSubscriptionEvent.bind(this);
  
    const openScdElement = document.querySelector('open-scd');
    if (openScdElement) {
      openScdElement.addEventListener('goose-dataset', this.onGOOSEDataSetEvent);
      openScdElement.addEventListener('ied-subscription', this.onIEDSubscriptionEvent);
    }
  }

  /**
   * When a GOOSEDataSetEvent is received, check for all IEDs if
   * all FCDAs are covered, or partly FCDAs are covered.
   * @param event - Incoming event.
   */
  private async onGOOSEDataSetEvent(event: GOOSEDataSetEvent) {
    this.currentSelectedGooseIED = event.detail.iedName;
    this.currentSelectedGoose = event.detail.gseName;
    this.currentSelectedGooseDataset = event.detail.dataset;

    this.clearIedLists();

    Array.from(this.doc.querySelectorAll(':root > IED')).forEach(ied => {
      const inputs = ied.querySelector(`LN0[lnClass="LLN0"] > Inputs`);

      let numberOfLinkedExtRefs = 0;
      
      /**
       * If no Inputs element is found, we can safely say it's not subscribed.
       */
      if (!inputs) {
        this.availableIeds.push({element: ied});
        return;
      }

      /**
       * Count all the linked ExtRefs.
       */
      this.currentSelectedGooseDataset.querySelectorAll('FCDA').forEach(fcda => {
        if(inputs.querySelector(`ExtRef[iedName=${this.currentSelectedGooseIED}][serviceType="GOOSE"]` +
          `${fcdaReferences.map(fcdaRef =>
            fcda.getAttribute(fcdaRef)
              ? `[${fcdaRef}="${fcda.getAttribute(fcdaRef)}"]`
              : '').join('')
            }`)) {
            numberOfLinkedExtRefs++;
          }
      })

      /**
       * Make a distinction between not subscribed at all,
       * partially subscribed and fully subscribed.
       */
      if (numberOfLinkedExtRefs == 0) {
        this.availableIeds.push({element: ied});
        return;
      }

      if (numberOfLinkedExtRefs == this.currentSelectedGooseDataset.querySelectorAll('FCDA').length) {
        this.subscribedIeds.push({element: ied});
      } else {
        this.availableIeds.push({element: ied, partial: true});
      }
      
    })

    this.requestUpdate();
  }

  /**
   * When a IEDSubscriptionEvent is received, check if 
   * @param event - Incoming event.
   */
  private async onIEDSubscriptionEvent(event: IEDSubscriptionEvent) {
    switch (event.detail.subscribeStatus) {
      case SubscribeStatus.Full: {
        console.log("Full Subscribed");
        break;
      }
      case SubscribeStatus.Partial: {
        console.log("Partial Subscribed");
        break;
      }
      case SubscribeStatus.None: {
        console.log("Not Subscribed");
        break;
      }
    }
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
      <section>
        <h1>${translate('subscription.subscriberIed.title', {
          selected: this.currentSelectedGoose ? this.currentSelectedGooseIED + ' > ' + this.currentSelectedGoose : 'IED'
        })}</h1>
        ${this.currentSelectedGoose ?
        html`<div class="subscriberWrapper">
          <mwc-list>
            <mwc-list-item noninteractive>
              <span class="iedListTitle">${translate('subscription.subscriberIed.subscribed')}</span>
            </mwc-list-item>
            <li divider role="separator"></li>
            ${this.subscribedIeds.length > 0 ?
              this.subscribedIeds.map(ied => html`<ied-element .status=${SubscribeStatus.Full} .element=${ied.element}></ied-element>`)
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
                partialSubscribedIeds.map(ied => html`<ied-element .status=${SubscribeStatus.Partial} .element=${ied.element}></ied-element>`)
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
                this.availableIeds.map(ied => html`<ied-element .status=${SubscribeStatus.None} .element=${ied.element}></ied-element>`)
                : html`<mwc-list-item graphic="avatar" noninteractive>
                <span>${translate('subscription.none')}</span>
              </mwc-list-item>`}
            </mwc-list>` : html`<mwc-list>
              <mwc-list-item noninteractive>
                <span class="iedListTitle">${translate('subscription.subscriberIed.noGooseMessageSelected')}</span>
              </mwc-list-item>
            </mwc-list>
          </div>`}
        </section>
      `;
  }

  static styles = css`
    ${styles}

    h1 {
      overflow: unset;
      white-space: unset;
      text-overflow: unset;
    }
    
    .subscriberWrapper {
      height: 100vh;
      overflow-y: scroll;
    }

    .iedListTitle {
      font-weight: bold;
    }
  `;
}
