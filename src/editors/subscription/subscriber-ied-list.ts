import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import './elements/ied-element.js';

import { translate } from 'lit-translate';
import { GOOSEDataSetEvent, IEDSubscriptionEvent } from '../../foundation.js';

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

  /** Current selected dataset, linked to the current selected GOOSE message. */
  dataSet!: Element;

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
    this.iedName = event.detail.iedName;
    this.gseName = event.detail.gseName;

    this.dataSet = event.detail.dataset;

    this.clearIedLists();

    Array.from(this.doc.querySelectorAll(':root > IED')).forEach(ied => {
      const extRefs = Array.from(ied.querySelectorAll(`LN0[lnClass="LLN0"] > Inputs > ExtRef[iedName=${event.detail.iedName}]`));
      
      /**
       * If no ExtRef element is found, we can safely say it's not subscribed.
       */
      if (extRefs.length == 0) {
        this.availableIeds.push({element: ied});
        return;
      }

      /**
       * If there is an ExtRef element, we just search for the first linked FCDA that cannot be found.
       * It so, it's partially subscribed.
       */
      this.dataSet.querySelectorAll('FCDA').forEach(fcda => {
        if (extRefs.filter(extRef =>
          extRef.parentElement!.querySelector(`
            ExtRef[ldInst="${fcda.getAttribute('ldInst')}"]
            [lnClass="${fcda.getAttribute('lnClass')}"]
            [lnInst="${fcda.getAttribute('lnInst')}"]
            [prefix="${fcda.getAttribute('prefix')}"]
            [doName="${fcda.getAttribute('doName')}"]
            [daName="${fcda.getAttribute('daName')}"]
            [serviceType="GOOSE"]`)) == null) {
          this.availableIeds.push({element: ied, partial: true});
          return;
        }
      })

      /**
       * Otherwise, it's full subscribed!
       */
      this.subscribedIeds.push({element: ied})
    })

    this.requestUpdate();
  }

  private async onIEDSubscriptionEvent(event: IEDSubscriptionEvent) {
    const inputsElement = this.doc.querySelector(`IED[name="${event.detail.iedName}"] > AccessPoint > Server > LDevice > LN0[lnClass="LLN0"] > Inputs`);
    const extRefs = Array.from(inputsElement!.querySelectorAll(`ExtRef[iedName=${this.iedName}]`));
    console.log(this.dataSet)
    extRefs.forEach(ref => console.log(ref))
  }

  /**
   * Clear all the IED lists.
   */
  private clearIedLists() {
    this.subscribedIeds = [];
    this.availableIeds = [];
  }

  render(): TemplateResult {
    const partialSubscribedIeds = this.availableIeds.filter(ied => ied.partial);

    return html`
      <h1>${translate('subscription.subscriberIed.title', {
        selected: this.gseName ? this.iedName+'>'+this.gseName : 'IED'
      })}</h1>
      ${this.gseName ?
      html`<mwc-list>
        <mwc-list-item noninteractive>
          <span class="iedListTitle">${translate('subscription.subscriberIed.subscribed')}</span>
        </mwc-list-item>
        <li divider role="separator"></li>
        ${this.subscribedIeds.length > 0 ?
          this.subscribedIeds.map(ied => html`<ied-element .element=${ied.element}></ied-element>`)
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
            partialSubscribedIeds.map(ied => html`<ied-element .element=${ied.element}></ied-element>`)
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
            this.availableIeds.map(ied => html`<ied-element .element=${ied.element}></ied-element>`)
            : html`<mwc-list-item graphic="avatar" noninteractive>
            <span>${translate('subscription.none')}</span>
          </mwc-list-item>`}
        </mwc-list>` : html`<mwc-list>
          <mwc-list-item noninteractive>
            <span class="iedListTitle">${translate('subscription.subscriberIed.noGooseMessageSelected')}</span>
          </mwc-list-item>
        </mwc-list>`}
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

    .iedListTitle {
      font-weight: bold;
    }
  `;
}
