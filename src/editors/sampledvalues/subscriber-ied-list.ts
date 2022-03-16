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
  identity,
  newActionEvent,
  selector,
} from '../../foundation.js';
import {
  SampledValuesSelectEvent,
  IEDSampledValuesSubscriptionEvent,
  newSampledValuesSelectEvent,
  styles,
  SubscribeStatus,
} from './foundation.js';

/**
 * An IED within this IED list has 2 properties:
 * - The IED element itself.
 * - A 'partial' property indicating if the Sampled Value is fully initialized or partially.
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
      ? `[${fcdaRef}="${elementContainingFcdaReferences.getAttribute(fcdaRef)}"]`
      : ''
  )
  .join('');
}

/**
 * Internal persistent state, so it's not lost when
 * subscribing / unsubscribing.
 */
interface State {
  /** Current selected Sampled Values element */
  currentSampledValuesControl: Element | undefined;

  /** The current selected dataset */
  currentDataset: Element | undefined;

  /** The name of the IED belonging to the current selected Sampled Values */
  currentSampledValuesIEDName: string | undefined | null;

  /** List holding all current subscribed IEDs. */
  subscribedIeds: IED[];

  /** List holding all current avaialble IEDs which are not subscribed. */
  availableIeds: IED[];
}

const localState: State = {
  currentSampledValuesControl: undefined,
  currentDataset: undefined,
  currentSampledValuesIEDName: undefined,
  subscribedIeds: [],
  availableIeds: [],
};

/** An sub element for subscribing and unsubscribing IEDs to Sampled Values messages. */
@customElement('subscriber-ied-list')
export class SubscriberIEDList extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @query('div') subscriberWrapper!: Element;

  constructor() {
    super();
    this.onSampledValuesDataSetEvent = this.onSampledValuesDataSetEvent.bind(this);
    this.onIEDSubscriptionEvent = this.onIEDSubscriptionEvent.bind(this);

    const openScdElement = document.querySelector('open-scd');
    if (openScdElement) {
      openScdElement.addEventListener(
        'sampled-values-select',
        this.onSampledValuesDataSetEvent
      );
      openScdElement.addEventListener(
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
    localState.currentSampledValuesControl = event.detail.sampledValuesControl;
    localState.currentDataset = event.detail.dataset;
    localState.currentSampledValuesIEDName = localState.currentSampledValuesControl
      .closest('IED')
      ?.getAttribute('name');

    localState.subscribedIeds = [];
    localState.availableIeds = [];

    Array.from(this.doc.querySelectorAll(':root > IED'))
      .filter(ied => ied.getAttribute('name') != localState.currentSampledValuesIEDName)
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
                `ExtRef[iedName=${localState.currentSampledValuesIEDName}]` +
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
    localState.currentDataset!.querySelectorAll('FCDA').forEach(fcda => {
      if (
        !inputsElement!.querySelector(
          `ExtRef[iedName=${localState.currentSampledValuesIEDName}]` +
            `${getFcdaReferences(fcda)}`
        )
      ) {
        const extRef = createElement(ied.ownerDocument, 'ExtRef', {
          iedName: localState.currentSampledValuesIEDName!,
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

    this.dispatchEvent(
      newSampledValuesSelectEvent(
        localState.currentSampledValuesControl!,
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
          `ExtRef[iedName=${localState.currentSampledValuesIEDName}]` +
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
      newSampledValuesSelectEvent(
        localState.currentSampledValuesControl!,
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
      if (!inputsMap[id]) inputsMap[id] = <Element>(inputsElement.cloneNode(true));

      const linkedExtRef = inputsMap[id].querySelector(`ExtRef[iedName=${extRef.getAttribute('iedName')}]` +
      `${getFcdaReferences(extRef)}`);
  
      if (linkedExtRef) inputsMap[id].removeChild(linkedExtRef);
    }
  
    // create delete action for each empty inputs
    Object.entries(inputsMap).forEach(([key, value]) => {
      if (value.children.length ! == 0) {
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

  render(): TemplateResult {
    const partialSubscribedIeds = localState.availableIeds.filter(
      ied => ied.partial
    );
    const availableIeds = localState.availableIeds.filter(
      ied => !ied.partial
    );
    const smvControlName =
      localState.currentSampledValuesControl?.getAttribute('name') ?? undefined;

    return html`
      <section>
        <h1>
          ${translate('sampledvalues.subscriberIed.title', {
            selected: smvControlName
              ? localState.currentSampledValuesIEDName + ' > ' + smvControlName
              : 'IED',
          })}
        </h1>
        ${localState.currentSampledValuesControl
          ? html`<div class="subscriberWrapper">
              <mwc-list>
                <mwc-list-item noninteractive>
                  <span class="iedListTitle"
                    >${translate('sampledvalues.subscriberIed.subscribed')}</span
                  >
                </mwc-list-item>
                <li divider role="separator"></li>
                ${localState.subscribedIeds.length > 0
                  ? localState.subscribedIeds.map(
                      ied =>
                        html`<ied-element
                          .status=${SubscribeStatus.Full}
                          .element=${ied.element}
                        ></ied-element>`
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
                        html`<ied-element
                          .status=${SubscribeStatus.Partial}
                          .element=${ied.element}
                        ></ied-element>`
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
                        html`<ied-element
                          .status=${SubscribeStatus.None}
                          .element=${ied.element}
                        ></ied-element>`
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
