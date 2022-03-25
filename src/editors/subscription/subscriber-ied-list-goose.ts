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
  identity,
  newActionEvent,
  selector,
} from '../../foundation.js';
import {
  newIEDSubscriptionEvent,
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
  'ldInst',
  'lnClass',
  'lnInst',
  'prefix',
  'doName',
  'daName',
];

/**
 * Get all the FCDA attributes containing values from a specific element.
 * @param elementContainingFcdaReferences - The element to use
 * @returns FCDA references
 */
function getFcdaReferences(elementContainingFcdaReferences: Element): string {
  return fcdaReferences
    .map(fcdaRef =>
      elementContainingFcdaReferences.getAttribute(fcdaRef)
        ? `[${fcdaRef}="${elementContainingFcdaReferences.getAttribute(
            fcdaRef
          )}"]`
        : ''
    )
    .join('');
}

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

const localState: State = {
  currentGseControl: undefined,
  currentDataset: undefined,
  currentGooseIEDName: undefined,
  subscribedIeds: [],
  availableIeds: [],
};

/** An sub element for subscribing and unsubscribing IEDs to GOOSE messages. */
@customElement('subscriber-ied-list-goose')
export class SubscriberIEDListGoose extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @query('div') subscriberWrapper!: Element;

  constructor() {
    super();
    this.onGOOSEDataSetEvent = this.onGOOSEDataSetEvent.bind(this);
    this.onIEDSubscriptionEvent = this.onIEDSubscriptionEvent.bind(this);

    const parentDiv = this.closest('div[id="containerTemplates"]');
    if (parentDiv) {
      parentDiv.addEventListener('goose-dataset', this.onGOOSEDataSetEvent);
      parentDiv.addEventListener(
        'ied-subscription',
        this.onIEDSubscriptionEvent
      );
    }
  }

  /**
   * When a GOOSEDataSetEvent is received, check for all IEDs if
   * all FCDAs are covered, or partly FCDAs are covered.
   * @param event - Incoming event.
   */
  private async onGOOSEDataSetEvent(event: GOOSESelectEvent) {
    console.log('onGOOSESelect');
    localState.currentGseControl = event.detail.gseControl;
    localState.currentDataset = event.detail.dataset;
    localState.currentGooseIEDName = localState.currentGseControl
      .closest('IED')
      ?.getAttribute('name');

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
          localState.availableIeds.push({ element: ied });
          return;
        }

        /**
         * Count all the linked ExtRefs.
         */
        localState.currentDataset!.querySelectorAll('FCDA').forEach(fcda => {
          inputElements.forEach(inputs => {
            if (
              inputs.querySelector(
                `ExtRef[iedName=${localState.currentGooseIEDName}]` +
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
          localState.availableIeds.push({ element: ied });
          return;
        }

        if (
          numberOfLinkedExtRefs >=
          localState.currentDataset!.querySelectorAll('FCDA').length
        ) {
          localState.subscribedIeds.push({ element: ied });
        } else {
          localState.availableIeds.push({ element: ied, partial: true });
        }
      });

    this.requestUpdate();
  }

  /**
   * When a IEDSubscriptionEvent is received, check if
   * @param event - Incoming event.
   */
  private async onIEDSubscriptionEvent(event: IEDSubscriptionEvent) {
    console.log('onGOOSEIEDSub');
    switch (event.detail.subscribeStatus) {
      case SubscribeStatus.Full: {
        this.unsubscribe(event.detail.element);
        break;
      }
      case SubscribeStatus.Partial: {
        this.subscribe(event.detail.element);
        break;
      }
      case SubscribeStatus.None: {
        this.subscribe(event.detail.element);
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
    localState.currentDataset!.querySelectorAll('FCDA').forEach(fcda => {
      if (
        !inputsElement!.querySelector(
          `ExtRef[iedName=${localState.currentGooseIEDName}]` +
            `${getFcdaReferences(fcda)}`
        )
      ) {
        const extRef = createElement(ied.ownerDocument, 'ExtRef', {
          iedName: localState.currentGooseIEDName!,
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
    const actions: Delete[] = [];
    ied.querySelectorAll('LN0 > Inputs, LN > Inputs').forEach(inputs => {
      localState.currentDataset!.querySelectorAll('FCDA').forEach(fcda => {
        const extRef = inputs.querySelector(
          `ExtRef[iedName=${localState.currentGooseIEDName}]` +
            `${getFcdaReferences(fcda)}`
        );

        if (extRef) actions.push({ old: { parent: inputs, element: extRef } });
      });
    });

    this.dispatchEvent(
      newActionEvent({
        title: 'Disconnect',
        actions: this.extendDeleteActions(actions),
      })
    );

    this.dispatchEvent(
      newGOOSESelectEvent(
        localState.currentGseControl!,
        localState.currentDataset!
      )
    );
  }

  /**
   * Creating Delete actions in case Inputs elements are empty.
   * @param extRefDeleteActions - All Delete actions for ExtRefs.
   * @returns Possible delete actions for empty Inputs elements.
   */
  private extendDeleteActions(extRefDeleteActions: Delete[]): Delete[] {
    if (!extRefDeleteActions.length) return [];

    // Initialize with the already existing ExtRef Delete actions.
    const extendedDeleteActions: Delete[] = extRefDeleteActions;
    const inputsMap: Record<string, Element> = {};

    for (const extRefDeleteAction of extRefDeleteActions) {
      const extRef = <Element>extRefDeleteAction.old.element;
      const inputsElement = <Element>extRefDeleteAction.old.parent;

      const id = identity(inputsElement);
      if (!inputsMap[id])
        inputsMap[id] = <Element>inputsElement.cloneNode(true);

      const linkedExtRef = inputsMap[id].querySelector(
        `ExtRef[iedName=${extRef.getAttribute('iedName')}]` +
          `${getFcdaReferences(extRef)}`
      );

      if (linkedExtRef) inputsMap[id].removeChild(linkedExtRef);
    }

    // create delete action for each empty inputs
    Object.entries(inputsMap).forEach(([key, value]) => {
      if (value.children.length! == 0) {
        const doc = extRefDeleteActions[0].old.parent.ownerDocument!;
        const inputs = doc.querySelector(selector('Inputs', key));

        if (inputs && inputs.parentElement) {
          extendedDeleteActions.push({
            old: { parent: inputs.parentElement, element: inputs },
          });
        }
      }
    });

    return extendedDeleteActions;
  }

  protected updated(): void {
    if (this.subscriberWrapper) {
      this.subscriberWrapper.scrollTo(0, 0);
    }
  }

  renderSubscriber(status: SubscribeStatus, element: Element): TemplateResult {
    return html` <mwc-list-item
      @click=${() => {
        this.dispatchEvent(
          newIEDSubscriptionEvent(element, status ?? SubscribeStatus.None)
        );
      }}
      graphic="avatar"
      hasMeta
    >
      <span>${element.getAttribute('name')}</span>
      <mwc-icon slot="graphic"
        >${status == SubscribeStatus.Full ? html`clear` : html`add`}</mwc-icon
      >
    </mwc-list-item>`;
  }

  renderUnSubscribers(ieds: IED[]): TemplateResult {
    return html`<mwc-list-item noninteractive>
        <span class="iedListTitle"
          >${translate('subscription.subscriberIed.availableToSubscribe')}</span
        >
      </mwc-list-item>
      <li divider role="separator"></li>
      ${ieds.length > 0
        ? ieds.map(ied =>
            this.renderSubscriber(SubscribeStatus.None, ied.element)
          )
        : html`<mwc-list-item graphic="avatar" noninteractive>
            <span>${translate('subscription.none')}</span>
          </mwc-list-item>`}`;
  }

  renderPartiallySubscribers(ieds: IED[]): TemplateResult {
    return html`<mwc-list-item noninteractive>
        <span class="iedListTitle"
          >${translate('subscription.subscriberIed.partiallySubscribed')}</span
        >
      </mwc-list-item>
      <li divider role="separator"></li>
      ${ieds.length > 0
        ? ieds.map(ied =>
            this.renderSubscriber(SubscribeStatus.Partial, ied.element)
          )
        : html`<mwc-list-item graphic="avatar" noninteractive>
            <span>${translate('subscription.none')}</span>
          </mwc-list-item>`}`;
  }

  renderFullSubscribers(): TemplateResult {
    return html`<mwc-list-item noninteractive>
        <span class="iedListTitle"
          >${translate('subscription.subscriberIed.subscribed')}</span
        >
      </mwc-list-item>
      <li divider role="separator"></li>
      ${localState.subscribedIeds.length > 0
        ? localState.subscribedIeds.map(ied =>
            this.renderSubscriber(SubscribeStatus.Full, ied.element)
          )
        : html`<mwc-list-item graphic="avatar" noninteractive>
            <span>${translate('subscription.none')}</span>
          </mwc-list-item>`}`;
  }

  render(): TemplateResult {
    const partialSubscribedIeds = localState.availableIeds.filter(
      ied => ied.partial
    );
    const availableIeds = localState.availableIeds.filter(ied => !ied.partial);
    const gseControlName =
      localState.currentGseControl?.getAttribute('name') ?? undefined;

    return html`
      <section>
        <h1>
          ${translate('subscription.subscriberIed.title', {
            selected: gseControlName
              ? localState.currentGooseIEDName + ' > ' + gseControlName
              : 'IED',
          })}
        </h1>
        ${localState.currentGseControl
          ? html`<div class="subscriberWrapper">
              <filtered-list id="subscribedIeds">
                ${this.renderFullSubscribers()}
                ${this.renderPartiallySubscribers(partialSubscribedIeds)}
                ${this.renderUnSubscribers(availableIeds)}
              </filtered-list>
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
