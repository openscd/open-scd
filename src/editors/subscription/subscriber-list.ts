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

import '../../filtered-list.js';
import {
  Create,
  createElement,
  Delete,
  newActionEvent,
} from '../../foundation.js';
import {
  newSubscriptionEvent,
  GOOSESelectEvent,
  SubscriptionEvent,
  styles,
  SubscribeStatus,
  IEDSelectEvent,
  View,
  ViewEvent,
} from './foundation.js';
import {
  emptyInputsDeleteActions,
  getFcdaReferences
} from "../../foundation/ied.js";

/**
 * An element within this list has 2 properties:
 * - The element itself, either a GSEControl or an IED at this point.
 * - A 'partial' property indicating if the GOOSE is fully initialized or partially.
 */
interface ListElement {
  element: Element;
  partial?: boolean;
}

/** Defining view outside the class, which makes it persistent. */
let view: View = View.GOOSE_PUBLISHER;

/** An sub element for subscribing and unsubscribing IEDs to GOOSE messages. */
@customElement('subscriber-list')
export class SubscriberList extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  /** Current selected GOOSE message (when in GOOSE Publisher view) */
  currentSelectedGseControl: Element | undefined;

  /** Current selected IED (when in GOOSE Subscriber view) */
  currentSelectedIed: Element | undefined;

  /** The current used dataset for subscribing / unsubscribing */
  currentUsedDataset: Element | undefined | null;

  /** The name of the IED belonging to the current selected GOOSE */
  currentGooseIEDName: string | undefined | null;

  /** List holding all current subscribed Elements. */
  subscribedElements: ListElement[] = [];

  /** List holding all current avaialble Elements which are not subscribed. */
  availableElements: ListElement[] = [];

  @query('div') subscriberWrapper!: Element;

  constructor() {
    super();
    this.onGOOSEDataSetEvent = this.onGOOSEDataSetEvent.bind(this);
    this.onSubscriptionEvent = this.onSubscriptionEvent.bind(this);
    this.onIEDSelectEvent = this.onIEDSelectEvent.bind(this);
    this.onViewChange = this.onViewChange.bind(this);

    const parentDiv = this.closest('.container');
    if (parentDiv) {
      parentDiv.addEventListener('goose-dataset', this.onGOOSEDataSetEvent);
      parentDiv.addEventListener('subscription', this.onSubscriptionEvent);
      parentDiv.addEventListener('ied-select', this.onIEDSelectEvent);
      parentDiv.addEventListener('view', this.onViewChange);
    }
  }

  /**
   * When an IEDSelectEvent is received, check for all GOOSE messages if
   * all FCDAs are covered, or partly FCDAs are covered.
   * @param event - Incoming event.
   */
  private async onIEDSelectEvent(event: IEDSelectEvent) {
    if (!event.detail.ied) return;
    this.currentSelectedIed = event.detail.ied!;

    this.resetElements();

    const subscribedInputs = this.currentSelectedIed.querySelectorAll(`LN0 > Inputs, LN > Inputs`);

    this.doc.querySelectorAll('GSEControl').forEach(control => {
      const ied = control.closest('IED')!;

      if (ied.getAttribute('name') == this.currentSelectedIed?.getAttribute('name')) return;

      /** If no Inputs is available, it's automatically available. */
      if (subscribedInputs.length == 0) {
        this.availableElements.push({ element: control });
        return;
      }

      let numberOfLinkedExtRefs = 0;
      const dataSet = ied.querySelector(`DataSet[name="${control.getAttribute('datSet')}"]`);

      if (!dataSet) return;

      dataSet!.querySelectorAll('FCDA').forEach(fcda => {
        subscribedInputs.forEach(inputs => {
          if (
            inputs.querySelector(
              `ExtRef[iedName=${ied.getAttribute('name')}]` +
                `${getFcdaReferences(fcda)}`
            )
          ) {
            numberOfLinkedExtRefs++;
          }
        });
      });

      if (numberOfLinkedExtRefs == 0) {
        this.availableElements.push({ element: control });
        return;
      }

      if (
        numberOfLinkedExtRefs >=
        dataSet!.querySelectorAll('FCDA').length
      ) {
        this.subscribedElements.push({ element: control });
      } else {
        this.availableElements.push({ element: control, partial: true });
      }
    })

    this.requestUpdate();
  }

  /**
   * When a GOOSEDataSetEvent is received, check for all IEDs if
   * all FCDAs are covered, or partly FCDAs are covered.
   * @param event - Incoming event.
   */
  private async onGOOSEDataSetEvent(event: GOOSESelectEvent) {
    if (!event.detail.dataset || !event.detail.gseControl) return;

    this.currentSelectedGseControl = event.detail.gseControl;
    this.currentUsedDataset = event.detail.dataset;
    this.currentGooseIEDName = this.currentSelectedGseControl
      ?.closest('IED')
      ?.getAttribute('name');

    this.resetElements();

    Array.from(this.doc.querySelectorAll(':root > IED'))
      .filter(ied => ied.getAttribute('name') != this.currentGooseIEDName)
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
                `ExtRef[iedName=${this.currentGooseIEDName}]` +
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
   * When a SubscriptionEvent is received, check if
   * @param event - Incoming event.
   */
  private async onSubscriptionEvent(event: SubscriptionEvent) {
    let elementToSubscribe = event.detail.element;

    if (view == View.GOOSE_SUBSCRIBER) {
      const dataSetName = event.detail.element.getAttribute('datSet');
      this.currentUsedDataset = event.detail.element.parentElement?.querySelector(`DataSet[name="${dataSetName}"]`);
      this.currentGooseIEDName = event.detail.element.closest('IED')?.getAttribute('name');
      elementToSubscribe = this.currentSelectedIed!;
    }

    switch (event.detail.subscribeStatus) {
      case SubscribeStatus.Full: {
        this.unsubscribe(elementToSubscribe);
        break;
      }
      case SubscribeStatus.Partial: {
        this.subscribe(elementToSubscribe);
        break;
      }
      case SubscribeStatus.None: {
        this.subscribe(elementToSubscribe);
        break;
      }
    }
  }

  private async onViewChange(event: ViewEvent) {
    view = event.detail.view;

    this.currentSelectedIed = undefined;
    this.currentSelectedGseControl = undefined;
    
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
          `ExtRef[iedName=${this.currentGooseIEDName}]` +
            `${getFcdaReferences(fcda)}`
        )
      ) {
        const extRef = createElement(ied.ownerDocument, 'ExtRef', {
          iedName: this.currentGooseIEDName!,
          serviceType: 'GOOSE',
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
    if (inputsElement.parentElement) {
      this.dispatchEvent(newActionEvent({ title, actions }));
    } else {
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
          `ExtRef[iedName=${this.currentGooseIEDName}]` +
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
        this.dispatchEvent(newSubscriptionEvent(element, status ?? SubscribeStatus.None));
      }}
      graphic="avatar"
      hasMeta
      >
      <span>${
        view == View.GOOSE_PUBLISHER
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
          >${translate('subscription.subscriber.availableToSubscribe')}</span
        >
      </mwc-list-item>
      <li divider role="separator"></li>
      ${elements.length > 0
        ? elements.map(element =>
            this.renderSubscriber(SubscribeStatus.None, element.element)
          )
        : html`<mwc-list-item graphic="avatar" noninteractive>
            <span>${translate('subscription.none')}</span>
          </mwc-list-item>`}`;
  }

  renderPartiallySubscribers(elements: ListElement[]): TemplateResult {
    return html`<mwc-list-item noninteractive>
        <span class="iedListTitle"
          >${translate('subscription.subscriber.partiallySubscribed')}</span
        >
      </mwc-list-item>
      <li divider role="separator"></li>
      ${elements.length > 0
        ? elements.map(element =>
            this.renderSubscriber(SubscribeStatus.Partial, element.element)
          )
        : html`<mwc-list-item graphic="avatar" noninteractive>
            <span>${translate('subscription.none')}</span>
          </mwc-list-item>`}`;
  }

  renderFullSubscribers(): TemplateResult {
    return html`<mwc-list-item noninteractive>
        <span class="iedListTitle"
          >${translate('subscription.subscriber.subscribed')}</span
        >
      </mwc-list-item>
      <li divider role="separator"></li>
      ${this.subscribedElements.length > 0
        ? this.subscribedElements.map(element =>
            this.renderSubscriber(SubscribeStatus.Full, element.element)
          )
        : html`<mwc-list-item graphic="avatar" noninteractive>
            <span>${translate('subscription.none')}</span>
          </mwc-list-item>`}`;
  }

  renderTitle(): TemplateResult {
    const gseControlName = this.currentSelectedGseControl?.getAttribute('name') ?? undefined;

    return view == View.GOOSE_PUBLISHER
      ? html`<h1>
          ${translate('subscription.publisherGoose.subscriberTitle', {
            selected: gseControlName
              ? this.currentGooseIEDName + ' > ' + gseControlName
              : 'GOOSE',
          })}
        </h1>`
      : html`<h1>
          ${translate('subscription.subscriberGoose.publisherTitle', {
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
                <span>${view == View.GOOSE_PUBLISHER
                  ? translate('subscription.subscriber.noGooseMessageSelected')
                  : translate('subscription.subscriber.noIedSelected')}</span>
              </mwc-list-item>
            </mwc-list>
          </div>`}
      </section>
    `;
  }

  static styles = css`
    ${styles}
  `;
}
