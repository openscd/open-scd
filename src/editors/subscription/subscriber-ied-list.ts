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

import './elements/ied-element.js';
import {
  Create,
  createElement,
  Delete,
  newActionEvent,
} from '../../foundation.js';
import {
  GOOSESelectEvent,
  IEDSubscriptionEvent,
  newGOOSESelectEvent,
  styles,
  SubscribeStatus,
} from './foundation.js';

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

/**
 * Internal persistent state, so it's not lost when
 * subscribing / unsubscribing.
 */
interface State {
  /** Current selected GSEControl element */
  currentGseControl: Element | undefined;

  /** The current selected dataset */
  currentDataset: Element | undefined;

  /** The name of the IED belonging to the current selected GOOSE */
  currentGooseIEDName: string | undefined | null;

  /** List holding all current subscribed IEDs. */
  subscribedIeds: IED[];

  /** List holding all current avaialble IEDs which are not subscribed. */
  availableIeds: IED[];
}

const localState : State = {
  currentGseControl: undefined,
  currentDataset: undefined,
  currentGooseIEDName: undefined,
  subscribedIeds: [],
  availableIeds: []
}

/** An sub element for subscribing and unsubscribing IEDs to GOOSE messages. */
@customElement('subscriber-ied-list')
export class SubscriberIEDList extends LitElement {
  @property()
  doc!: XMLDocument;
  
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
  private async onGOOSEDataSetEvent(event: GOOSESelectEvent) {
    localState.currentGseControl = event.detail.gseControl;
    localState.currentDataset = event.detail.dataset;
    localState.currentGooseIEDName = localState.currentGseControl.closest('IED')?.getAttribute('name');

    localState.subscribedIeds = [];
    localState.availableIeds = [];

    Array.from(this.doc.querySelectorAll(':root > IED'))
    .filter(ied => ied.getAttribute('name') != localState.currentGooseIEDName)
    .forEach(ied => {
      const inputElements = ied.querySelectorAll(`LN0 > Inputs, LN > Inputs`);

      let numberOfLinkedExtRefs = 0;
      
      /**
       * If no Inputs element is found, we can safely say it's not subscribed.
       */
      if (!inputElements) {
        localState.availableIeds.push({element: ied});
        return;
      }

      /**
       * Count all the linked ExtRefs.
       */
      localState.currentDataset!.querySelectorAll('FCDA').forEach(fcda => {
        inputElements.forEach(inputs => {
          if(inputs.querySelector(`ExtRef[iedName=${localState.currentGooseIEDName}]` +
            `${fcdaReferences.map(fcdaRef =>
              fcda.getAttribute(fcdaRef)
                ? `[${fcdaRef}="${fcda.getAttribute(fcdaRef)}"]`
                : '').join('')
              }`)) {
              numberOfLinkedExtRefs++;
            }
        })
      })

      /**
       * Make a distinction between not subscribed at all,
       * partially subscribed and fully subscribed.
       */
      if (numberOfLinkedExtRefs == 0) {
        localState.availableIeds.push({element: ied});
        return;
      }

      if (numberOfLinkedExtRefs == localState.currentDataset!.querySelectorAll('FCDA').length) {
        localState.subscribedIeds.push({element: ied});
      } else {
        localState.availableIeds.push({element: ied, partial: true});
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
        this.unsubscribe(event.detail.element)
        break;
      }
      case SubscribeStatus.Partial: {
        this.subscribe(event.detail.element)
        break;
      }
      case SubscribeStatus.None: {
        this.subscribe(event.detail.element)
        break;
      }
    }
  }

  /**
   * Full subscribe a given IED to the current dataset.
   * @param ied - Given IED to subscribe.
   */
  private async subscribe(ied: Element): Promise<void> {
    const clone: Element = <Element>ied.cloneNode(true);

    let inputsElement = clone.querySelector('LN0 > Inputs');
    if (!inputsElement) {
      inputsElement = createElement(ied.ownerDocument, 'Inputs', {});
    }

    /** Updating the ExtRefs according the dataset */
    localState.currentDataset!.querySelectorAll('FCDA').forEach(fcda => {
      if(!inputsElement!.querySelector(`ExtRef[iedName=${localState.currentGooseIEDName}]` +
        `${fcdaReferences.map(fcdaRef =>
          fcda.getAttribute(fcdaRef)
            ? `[${fcdaRef}="${fcda.getAttribute(fcdaRef)}"]`
            : '').join('')
          }`)) {
            const extRef = createElement(
              ied.ownerDocument, 
              'ExtRef',
              {
                iedName: localState.currentGooseIEDName!,
                serviceType: 'GOOSE',
                ldInst: fcda.getAttribute('ldInst') ?? '',
                lnClass: fcda.getAttribute('lnClass') ?? '',
                lnInst: fcda.getAttribute('lnInst') ?? '',
                prefix: fcda.getAttribute('prefix') ?? '',
                doName: fcda.getAttribute('doName') ?? '',
                daName: fcda.getAttribute('daName') ?? ''
              });

            inputsElement?.appendChild(extRef);
        }
    });

    /** If the IED doesn't have a Inputs element, just append it to the first LN0 element. */
    if (!inputsElement.parentElement) {
      clone.querySelector('LN0')?.append(inputsElement);
    }

    this.replaceElement(ied, clone);

    this.dispatchEvent(
      newGOOSESelectEvent(
        localState.currentGseControl!,
        localState.currentDataset!
      )
    );
  }

  /**
   * Unsubscribing a given IED to the current dataset.
   * @param ied - Given IED to unsubscribe.
   */
  private unsubscribe(ied: Element): void {
    const clone: Element = <Element>ied.cloneNode(true);

    clone.querySelectorAll('LN0 > Inputs, LN > Inputs').forEach(inputs => {
      localState.currentDataset!.querySelectorAll('FCDA').forEach(fcda => {
        const extRef = inputs.querySelector(`ExtRef[iedName=${localState.currentGooseIEDName}]` +
          `${fcdaReferences.map(fcdaRef =>
            fcda.getAttribute(fcdaRef)
              ? `[${fcdaRef}="${fcda.getAttribute(fcdaRef)}"]`
              : '').join('')
            }`);
  
          if (extRef) inputs.removeChild(extRef!);
      });
    });

    this.replaceElement(ied, clone);

    this.dispatchEvent(
      newGOOSESelectEvent(
        localState.currentGseControl!,
        localState.currentDataset!
      )
    );
  }

  /**
   * Replacing an element in the current opened file.
   * @param original - The original element.
   * @param clone - The element to replace the original with.
   */
  private async replaceElement(original: Element, clone: Element) {
    const parent = original.parentElement;

    this.dispatchEvent(
      newActionEvent({
        old: {
          parent: parent!,
          element: original,
          reference: original.nextSibling
        }
      })
    );

    this.dispatchEvent(
      newActionEvent({
        new: {
          parent: parent!,
          element: clone,
          reference: clone.nextSibling
        }
      })
    );
  }

  protected updated(): void {
    if (this.subscriberWrapper) {
      this.subscriberWrapper.scrollTo(0,0);
    }
  }

  render(): TemplateResult {
    const partialSubscribedIeds = localState.availableIeds.filter(ied => ied.partial);
    const gseControlName = localState.currentGseControl?.getAttribute('name') ?? undefined;

    return html`
      <section>
        <h1>${translate('subscription.subscriberIed.title', {
          selected: gseControlName ? localState.currentGooseIEDName + ' > ' + gseControlName : 'IED'
        })}</h1>
        ${localState.currentGseControl ?
        html`<div class="subscriberWrapper">
          <mwc-list>
            <mwc-list-item noninteractive>
              <span class="iedListTitle">${translate('subscription.subscriberIed.subscribed')}</span>
            </mwc-list-item>
            <li divider role="separator"></li>
            ${localState.subscribedIeds.length > 0 ?
              localState.subscribedIeds.map(ied => html`<ied-element .status=${SubscribeStatus.Full} .element=${ied.element}></ied-element>`)
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
              ${localState.availableIeds.length > 0 ?
                localState.availableIeds.map(ied => html`<ied-element .status=${SubscribeStatus.None} .element=${ied.element}></ied-element>`)
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
