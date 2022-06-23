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

import {
  Create,
  createElement,
  Delete,
  newActionEvent,
} from '../../../foundation.js';
import {
  newSmvSubscriptionEvent,
  SmvSelectEvent,
  SmvSubscriptionEvent,
} from './foundation.js';
import {
  emptyInputsDeleteActions,
  getFcdaReferences
} from "../../../foundation/ied.js";
import { IEDSelectEvent, styles, SubscribeStatus, View, ViewEvent } from '../foundation.js';

/**
 * An IED within this IED list has 2 properties:
 * - The IED element itself.
 * - A 'partial' property indicating if the Sampled Value is fully initialized or partially.
 */
interface ListElement {
  element: Element;
  partial?: boolean;
}

/** Defining view outside the class, which makes it persistent. */
let view: View = View.PUBLISHER;

/** An sub element for subscribing and unsubscribing IEDs to Sampled Values messages. */
@customElement('subscriber-list-smv')
export class SubscriberList extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  /** Current selected Sampled Values element (when in GOOSE Publisher view) */
  currentSelectedSmvControl: Element | undefined;

  /** Current selected IED (when in GOOSE Subscriber view) */
  currentSelectedIed: Element | undefined;

  /** The current used dataset for subscribing / unsubscribing */
  currentUsedDataset: Element | undefined | null;

  /** The name of the IED belonging to the current selected Sampled Values */
  currentSmvIedName: string | undefined | null;

  /** List holding all current subscribed Elements. */
  subscribedElements: ListElement[] = [];

  /** List holding all current avaialble Elements which are not subscribed. */
  availableElements: ListElement[] = [];

  @query('div') subscriberWrapper!: Element;

  constructor() {
    super();
    this.onIEDSelectEvent = this.onIEDSelectEvent.bind(this);
    this.onSmvSelectEvent = this.onSmvSelectEvent.bind(this);
    this.onIEDSubscriptionEvent = this.onIEDSubscriptionEvent.bind(this);
    this.onViewChange = this.onViewChange.bind(this);

    const parentDiv = this.closest('.container');
    if (parentDiv) {
      parentDiv.addEventListener(
        'ied-select',
        this.onIEDSelectEvent
      );
      parentDiv.addEventListener(
        'smv-select',
        this.onSmvSelectEvent
      );
      parentDiv.addEventListener(
        'smv-subscription',
        this.onIEDSubscriptionEvent
      );
      parentDiv.addEventListener(
        'view',
        this.onViewChange
      );
    }
  }

  /**
   * When an IEDSelectEvent is received, check for all Sampled Values if
   * all FCDAs are covered, or partly FCDAs are covered.
   * @param event - Incoming event.
   */
  private async onIEDSelectEvent(event: IEDSelectEvent) {
    console.log(event);
    this.requestUpdate();
  }

  /**
   * When a SampledValuesSelectEvent is received, check for all IEDs if
   * all FCDAs are covered, or partly FCDAs are covered.
   * @param event - Incoming event.
   */
  private async onSmvSelectEvent(event: SmvSelectEvent) {
    this.currentSelectedSmvControl = event.detail.smvControl;
    this.currentUsedDataset = event.detail.dataset;
    this.currentSmvIedName = this.currentSelectedSmvControl
      ?.closest('IED')
      ?.getAttribute('name');

    this.subscribedElements = [];
    this.availableElements = [];

    Array.from(this.doc.querySelectorAll(':root > IED'))
      .filter(ied => ied.getAttribute('name') != this.currentSmvIedName)
      .forEach(ied => {
        const inputElements = ied.querySelectorAll(`LN0 > Inputs, LN > Inputs`);

        let numberOfLinkedExtRefs = 0;

        /**
         * If no Inputs element is found, we can safely say it's not subscribed.
         */
        if (!inputElements) {
          this.availableElements.push({ element: ied });
          return;
        }

        /**
         * Count all the linked ExtRefs.
         */
         this.currentUsedDataset!.querySelectorAll('FCDA').forEach(fcda => {
          inputElements.forEach(inputs => {
            if (
              inputs.querySelector(
                `ExtRef[iedName=${this.currentSmvIedName}]` +
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
          this.availableElements.push({ element: ied });
          return;
        }

        if (
          numberOfLinkedExtRefs >=
          this.currentUsedDataset!.querySelectorAll('FCDA').length
        ) {
          this.subscribedElements.push({ element: ied });
        } else {
          this.availableElements.push({ element: ied, partial: true });
        }
      });

    this.requestUpdate();
  }

  /**
   * When a IEDSubscriptionEvent is received, check if
   * @param event - Incoming event.
   */
  private async onIEDSubscriptionEvent(event: SmvSubscriptionEvent) {
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

  private async onViewChange(event: ViewEvent) {
    view = event.detail.view;

    this.currentSelectedIed = undefined;
    this.currentSelectedSmvControl = undefined;
    
    this.resetElements();
    this.requestUpdate();
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
    this.currentUsedDataset!.querySelectorAll('FCDA').forEach(fcda => {
      if (
        !inputsElement!.querySelector(
          `ExtRef[iedName=${this.currentSmvIedName}]` +
            `${getFcdaReferences(fcda)}`
        )
      ) {
        const extRef = createElement(ied.ownerDocument, 'ExtRef', {
          iedName: this.currentSmvIedName!,
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
      this.currentUsedDataset!.querySelectorAll('FCDA').forEach(fcda => {
        const extRef = inputs.querySelector(
          `ExtRef[iedName=${this.currentSmvIedName}]` +
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

  private resetElements() {
    this.subscribedElements = [];
    this.availableElements = [];
  }

  protected updated(): void {
    if (this.subscriberWrapper) {
      this.subscriberWrapper.scrollTo(0, 0);
    }
  }

  renderSubscriber(status: SubscribeStatus, element: Element): TemplateResult {
    return html` <mwc-list-item
      @click=${() => {
        this.dispatchEvent(newSmvSubscriptionEvent(element, status ?? SubscribeStatus.None));
      }}
      graphic="avatar"
      hasMeta
      >
      <span>${
        view == View.PUBLISHER
        ? element.getAttribute('name')
        : element.getAttribute('name') + ` (${element.closest('IED')?.getAttribute('name')})`
      }</span>
      <mwc-icon slot="graphic"
        >${status == SubscribeStatus.Full ? html`clear` : html`add`}</mwc-icon
      >
    </mwc-list-item>`;
  }

  renderUnSubscribers(elements: ListElement[]): TemplateResult {
    return html`<mwc-list-item noninteractive>
        <span class="iedListTitle"
          >${translate('sampledValues.subscriber.availableToSubscribe')}</span
        >
      </mwc-list-item>
      <li divider role="separator"></li>
      ${elements.length > 0
        ? elements.map(element =>
            this.renderSubscriber(SubscribeStatus.None, element.element)
          )
        : html`<mwc-list-item graphic="avatar" noninteractive>
            <span>${translate('sampledValues.none')}</span>
          </mwc-list-item>`}`;
  }

  renderPartiallySubscribers(elements: ListElement[]): TemplateResult {
    return html`<mwc-list-item noninteractive>
        <span class="iedListTitle"
          >${translate('sampledValues.subscriber.partiallySubscribed')}</span
        >
      </mwc-list-item>
      <li divider role="separator"></li>
      ${elements.length > 0
        ? elements.map(element =>
            this.renderSubscriber(SubscribeStatus.Partial, element.element)
          )
        : html`<mwc-list-item graphic="avatar" noninteractive>
            <span>${translate('sampledValues.none')}</span>
          </mwc-list-item>`}`;
  }

  renderFullSubscribers(): TemplateResult {
    return html`<mwc-list-item noninteractive>
        <span class="iedListTitle"
          >${translate('sampledValues.subscriber.subscribed')}</span
        >
      </mwc-list-item>
      <li divider role="separator"></li>
      ${this.subscribedElements.length > 0
        ? this.subscribedElements.map(element =>
            this.renderSubscriber(SubscribeStatus.Full, element.element)
          )
        : html`<mwc-list-item graphic="avatar" noninteractive>
            <span>${translate('sampledValues.none')}</span>
          </mwc-list-item>`}`;
  }

  renderTitle(): TemplateResult {
    const gseControlName = this.currentSelectedSmvControl?.getAttribute('name') ?? undefined;

    return view == View.PUBLISHER
      ? html`<h1>
          ${translate('sampledValues.publisherSmv.subscriberTitle', {
            selected: gseControlName
              ? this.currentSmvIedName + ' > ' + gseControlName
              : 'Sampled Value',
          })}
        </h1>`
      : html`<h1>
          ${translate('sampledValues.subscriberSmv.publisherTitle', {
            selected: this.currentSelectedIed
            ? this.currentSelectedIed.getAttribute('name')!
            : 'IED',
          })}
        </h1>`;
  }

  render(): TemplateResult {
    return html`
      <section tabindex="0">
        ${this.renderTitle()}
        ${this.availableElements.length != 0 ||
          this.subscribedElements.length != 0
          ? html`<div class="subscriberWrapper">
              <filtered-list id="subscribedIeds">
                ${this.renderFullSubscribers()}
                ${this.renderPartiallySubscribers(this.availableElements.filter(
                  element => element.partial
                ))}
                ${this.renderUnSubscribers(this.availableElements.filter(
                  element => !element.partial
                ))}
              </filtered-list>
            </div>`
          : html`<mwc-list>
              <mwc-list-item noninteractive>
                <span>${view == View.PUBLISHER
                  ? translate('sampledValues.subscriber.noSampledValuesSelected')
                  : translate('sampledValues.subscriber.noIedSelected')}</span>
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
