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

import '@material/mwc-icon';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';

import { styles } from '../templates/foundation.js';
import { GOOSESelectEvent } from './foundation.js';

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
  'ldInst',
  'lnClass',
  'lnInst',
  'prefix',
  'doName',
  'daName',
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

  /** Current selected IED. */
  iedName!: string;

  /** Current selected GSEControl element. */
  gseControl!: Element;

  @query('div') subscriberWrapper!: Element;

  constructor() {
    super();
    this.onGOOSEDataSetEvent = this.onGOOSEDataSetEvent.bind(this);
    const openScdElement = document.querySelector('open-scd');
    if (openScdElement) {
      openScdElement.addEventListener(
        'goose-dataset',
        this.onGOOSEDataSetEvent
      );
    }
  }

  /**
   * When a GOOSEDataSetEvent is received, check for all IEDs if
   * all FCDAs are covered, or partly FCDAs are covered.
   * @param event - Incoming event.
   */
  private async onGOOSEDataSetEvent(event: GOOSESelectEvent) {
    this.iedName = event.detail.iedName;
    this.gseControl = event.detail.gseControl;

    const dataSet = event.detail.dataset;

    this.clearIedLists();

    Array.from(this.doc.querySelectorAll(':root > IED')).forEach(ied => {
      const inputElements = ied.querySelectorAll(`LN0 > Inputs, LN > Inputs`);

      let numberOfLinkedExtRefs = 0;

      /**
       * If no Inputs element is found, we can safely say it's not subscribed.
       */
      if (!inputElements) {
        this.availableIeds.push({ element: ied });
        return;
      }

      /**
       * Count all the linked ExtRefs.
       */
      dataSet.querySelectorAll('FCDA').forEach(fcda => {
        inputElements.forEach(inputs => {
          if (
            inputs.querySelector(
              `ExtRef[iedName=${event.detail.iedName}]` +
                `${fcdaReferences
                  .map(fcdaRef =>
                    fcda.getAttribute(fcdaRef)
                      ? `[${fcdaRef}="${fcda.getAttribute(fcdaRef)}"]`
                      : ''
                  )
                  .join('')}`
            )
          ) {
            numberOfLinkedExtRefs++;
          }
        });
      });

      /**
       * Make a distinction between not subscribed at all,
       * partially subscribed and fully subscribed.
       */
      if (numberOfLinkedExtRefs == 0) {
        this.availableIeds.push({ element: ied });
        return;
      }

      if (numberOfLinkedExtRefs == dataSet.querySelectorAll('FCDA').length) {
        this.subscribedIeds.push({ element: ied });
      } else {
        this.availableIeds.push({ element: ied, partial: true });
      }
    });

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
      this.subscriberWrapper.scrollTo(0, 0);
    }
  }

  render(): TemplateResult {
    const partialSubscribedIeds = this.availableIeds.filter(ied => ied.partial);
    const gseControlName = this.gseControl?.getAttribute('name') ?? undefined;

    return html`
      <section>
        <h1>
          ${translate('subscription.subscriberIed.title', {
            selected: gseControlName
              ? this.iedName + ' > ' + gseControlName
              : 'IED',
          })}
        </h1>
        ${this.gseControl
          ? html`<div class="subscriberWrapper">
              <mwc-list>
                <mwc-list-item noninteractive>
                  <span class="iedListTitle"
                    >${translate('subscription.subscriberIed.subscribed')}</span
                  >
                </mwc-list-item>
                <li divider role="separator"></li>
                ${this.subscribedIeds.length > 0
                  ? this.subscribedIeds.map(
                      ied => html` <mwc-list-item graphic="avatar" hasMeta>
                        <span>${ied.element.getAttribute('name')}</span>
                        <mwc-icon slot="graphic">clear</mwc-icon>
                      </mwc-list-item>`
                    )
                  : html`<mwc-list-item graphic="avatar" noninteractive>
                      <span>${translate('subscription.none')}</span>
                    </mwc-list-item>`}
              </mwc-list>
              <mwc-list>
                <mwc-list-item noninteractive>
                  <span class="iedListTitle"
                    >${translate(
                      'subscription.subscriberIed.partiallySubscribed'
                    )}</span
                  >
                </mwc-list-item>
                <li divider role="separator"></li>
                ${partialSubscribedIeds.length > 0
                  ? partialSubscribedIeds.map(
                      ied => html` <mwc-list-item graphic="avatar" hasMeta>
                        <span>${ied.element.getAttribute('name')}</span>
                        <mwc-icon slot="graphic">add</mwc-icon>
                      </mwc-list-item>`
                    )
                  : html`<mwc-list-item graphic="avatar" noninteractive>
                      <span>${translate('subscription.none')}</span>
                    </mwc-list-item>`}
              </mwc-list>
              <mwc-list>
                <mwc-list-item noninteractive>
                  <span class="iedListTitle"
                    >${translate(
                      'subscription.subscriberIed.availableToSubscribe'
                    )}</span
                  >
                </mwc-list-item>
                <li divider role="separator"></li>
                ${this.availableIeds.length > 0
                  ? this.availableIeds.map(
                      ied => html` <mwc-list-item graphic="avatar" hasMeta>
                        <span>${ied.element.getAttribute('name')}</span>
                        <mwc-icon slot="graphic">add</mwc-icon>
                      </mwc-list-item>`
                    )
                  : html`<mwc-list-item graphic="avatar" noninteractive>
                      <span>${translate('subscription.none')}</span>
                    </mwc-list-item>`}
              </mwc-list>
            </div>`
          : html`<mwc-list>
              <mwc-list-item noninteractive>
                <span class="iedListTitle">${translate(
                  'subscription.subscriberIed.noGooseMessageSelected'
                )}</span>
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
