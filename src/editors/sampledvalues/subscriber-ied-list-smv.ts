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

import './elements/ied-element-smv.js';
import {
  Create,
  createElement,
  Delete,
  newActionEvent,
} from '../../foundation.js';
import {
  SampledValuesSelectEvent,
  IEDSampledValuesSubscriptionEvent,
  styles,
  SubscribeStatus,
} from './foundation.js';
import {
  emptyInputsDeleteActions,
  getFcdaReferences
} from "../../foundation/ied.js";

/**
 * An IED within this IED list has 2 properties:
 * - The IED element itself.
 * - A 'partial' property indicating if the Sampled Value is fully initialized or partially.
 */
interface IED {
  element: Element;
  partial?: boolean;
}

/** An sub element for subscribing and unsubscribing IEDs to Sampled Values messages. */
@customElement('subscriber-ied-list-smv')
export class SubscriberIEDListSmv extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  /** Current selected Sampled Values element */
  currentSampledValuesControl: Element | undefined;

  /** The current selected dataset */
  currentDataset: Element | undefined | null;

  /** The name of the IED belonging to the current selected Sampled Values */
  currentSampledValuesIEDName: string | undefined | null;

  /** List holding all current subscribed IEDs. */
  subscribedIeds: IED[] = [];

  /** List holding all current avaialble IEDs which are not subscribed. */
  availableIeds: IED[] = [];

  @query('div') subscriberWrapper!: Element;

  constructor() {
    super();
    this.onSampledValuesDataSetEvent = this.onSampledValuesDataSetEvent.bind(this);
    this.onIEDSubscriptionEvent = this.onIEDSubscriptionEvent.bind(this);

    const parentDiv = this.closest('div[id="containerTemplates"]');
    if (parentDiv) {
      parentDiv.addEventListener(
        'sampled-values-select',
        this.onSampledValuesDataSetEvent
      );
      parentDiv.addEventListener(
        'ied-smv-subscription',
        this.onIEDSubscriptionEvent
      );
    }
  }

  /**
   * When a SampledValuesSelectEvent is received, check for all IEDs if
   * all FCDAs are covered, or partly FCDAs are covered.
   * @param event - Incoming event.
   */
  private async onSampledValuesDataSetEvent(event: SampledValuesSelectEvent) {
    this.currentSampledValuesControl = event.detail.sampledValuesControl;
    this.currentDataset = event.detail.dataset;
    this.currentSampledValuesIEDName = this.currentSampledValuesControl
      ?.closest('IED')
      ?.getAttribute('name');

    this.subscribedIeds = [];
    this.availableIeds = [];

    Array.from(this.doc.querySelectorAll(':root > IED'))
      .filter(ied => ied.getAttribute('name') != this.currentSampledValuesIEDName)
      .forEach(ied => {
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
         this.currentDataset!.querySelectorAll('FCDA').forEach(fcda => {
          inputElements.forEach(inputs => {
            if (
              inputs.querySelector(
                `ExtRef[iedName=${this.currentSampledValuesIEDName}]` +
                  `${getFcdaReferences(fcda)}`
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

        if (
          numberOfLinkedExtRefs >=
          this.currentDataset!.querySelectorAll('FCDA').length
        ) {
          this.subscribedIeds.push({ element: ied });
        } else {
          this.availableIeds.push({ element: ied, partial: true });
        }
      });

    this.requestUpdate();
  }

  /**
   * When a IEDSubscriptionEvent is received, check if
   * @param event - Incoming event.
   */
  private async onIEDSubscriptionEvent(event: IEDSampledValuesSubscriptionEvent) {
    switch (event.detail.subscribeStatus) {
      case SubscribeStatus.Full: {
        this.unsubscribe(event.detail.ied);
        break;
      }
      case SubscribeStatus.Partial: {
        this.subscribe(event.detail.ied);
        break;
      }
      case SubscribeStatus.None: {
        this.subscribe(event.detail.ied);
        break;
      }
    }
  }

  /**
   * Full subscribe a given IED to the current dataset.
   * @param ied - Given IED to subscribe.
   */
  private async subscribe(ied: Element): Promise<void> {
    if (!ied.querySelector('LN0')) return;

    let inputsElement = ied.querySelector('LN0 > Inputs');
    if (!inputsElement)
      inputsElement = createElement(ied.ownerDocument, 'Inputs', {});

    const actions: Create[] = [];
    this.currentDataset!.querySelectorAll('FCDA').forEach(fcda => {
      if (
        !inputsElement!.querySelector(
          `ExtRef[iedName=${this.currentSampledValuesIEDName}]` +
            `${getFcdaReferences(fcda)}`
        )
      ) {
        const extRef = createElement(ied.ownerDocument, 'ExtRef', {
          iedName: this.currentSampledValuesIEDName!,
          serviceType: 'SMV',
          ldInst: fcda.getAttribute('ldInst') ?? '',
          lnClass: fcda.getAttribute('lnClass') ?? '',
          lnInst: fcda.getAttribute('lnInst') ?? '',
          prefix: fcda.getAttribute('prefix') ?? '',
          doName: fcda.getAttribute('doName') ?? '',
          daName: fcda.getAttribute('daName') ?? '',
        });

        if (inputsElement?.parentElement)
          actions.push({ new: { parent: inputsElement!, element: extRef } });
        else inputsElement?.appendChild(extRef);
      }
    });

    /** If the IED doesn't have a Inputs element, just append it to the first LN0 element. */
    const title = 'Connect';
    if (inputsElement.parentElement)
      this.dispatchEvent(newActionEvent({ title, actions }));
    else {
      const inputAction: Create = {
        new: { parent: ied.querySelector('LN0')!, element: inputsElement },
      };
      this.dispatchEvent(newActionEvent({ title, actions: [inputAction] }));
    }
  }

  /**
   * Unsubscribing a given IED to the current dataset.
   * @param ied - Given IED to unsubscribe.
   */
  private unsubscribe(ied: Element): void {
    const actions: Delete[] = [];
    ied.querySelectorAll('LN0 > Inputs, LN > Inputs').forEach(inputs => {
      this.currentDataset!.querySelectorAll('FCDA').forEach(fcda => {
        const extRef = inputs.querySelector(
          `ExtRef[iedName=${this.currentSampledValuesIEDName}]` +
            `${getFcdaReferences(fcda)}`
        );

        if (extRef) actions.push({ old: { parent: inputs, element: extRef } });
      });
    });

    // Check if empty Input Element should also be removed.
    actions.push(...emptyInputsDeleteActions(actions));

    this.dispatchEvent(
      newActionEvent({
        title: 'Disconnect',
        actions: actions,
      })
    );
  }

  protected updated(): void {
    if (this.subscriberWrapper) {
      this.subscriberWrapper.scrollTo(0, 0);
    }
  }

  render(): TemplateResult {
    const partialSubscribedIeds = this.availableIeds.filter(
      ied => ied.partial
    );
    const availableIeds = this.availableIeds.filter(
      ied => !ied.partial
    );
    const smvControlName =
    this.currentSampledValuesControl?.getAttribute('name') ?? undefined;

    return html`
      <section>
        <h1>
          ${translate('sampledvalues.subscriberIed.title', {
            selected: smvControlName
              ? this.currentSampledValuesIEDName + ' > ' + smvControlName
              : 'IED',
          })}
        </h1>
        ${this.currentSampledValuesControl
          ? html`<div class="subscriberWrapper">
              <mwc-list>
                <mwc-list-item noninteractive>
                  <span class="iedListTitle"
                    >${translate('sampledvalues.subscriberIed.subscribed')}</span
                  >
                </mwc-list-item>
                <li divider role="separator"></li>
                ${this.subscribedIeds.length > 0
                  ? this.subscribedIeds.map(
                      ied =>
                        html`<ied-element-smv
                          .status=${SubscribeStatus.Full}
                          .element=${ied.element}
                        ></ied-element-smv>`
                    )
                  : html`<mwc-list-item graphic="avatar" noninteractive>
                      <span>${translate('sampledvalues.none')}</span>
                    </mwc-list-item>`}
              </mwc-list>
              <mwc-list>
                <mwc-list-item noninteractive>
                  <span class="iedListTitle"
                    >${translate(
                      'sampledvalues.subscriberIed.partiallySubscribed'
                    )}</span
                  >
                </mwc-list-item>
                <li divider role="separator"></li>
                ${partialSubscribedIeds.length > 0
                  ? partialSubscribedIeds.map(
                      ied =>
                        html`<ied-element-smv
                          .status=${SubscribeStatus.Partial}
                          .element=${ied.element}
                        ></ied-element-smv>`
                    )
                  : html`<mwc-list-item graphic="avatar" noninteractive>
                      <span>${translate('sampledvalues.none')}</span>
                    </mwc-list-item>`}
              </mwc-list>
              <mwc-list>
                <mwc-list-item noninteractive>
                  <span class="iedListTitle"
                    >${translate(
                      'sampledvalues.subscriberIed.availableToSubscribe'
                    )}</span
                  >
                </mwc-list-item>
                <li divider role="separator"></li>
                ${availableIeds.length > 0
                  ? availableIeds.map(
                      ied =>
                        html`<ied-element-smv
                          .status=${SubscribeStatus.None}
                          .element=${ied.element}
                        ></ied-element-smv>`
                    )
                  : html`<mwc-list-item graphic="avatar" noninteractive>
                      <span>${translate('sampledvalues.none')}</span>
                    </mwc-list-item>`}
              </mwc-list>
            </div>`
          : html`<mwc-list>
              <mwc-list-item noninteractive>
                <span class="iedListTitle">${translate(
                  'sampledvalues.subscriberIed.noSampledValuesSelected'
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
