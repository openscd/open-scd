import {
  css,
  customElement,
  html,
  property,
  TemplateResult,
} from 'lit-element';
import { nothing } from 'lit-html';
import { get } from 'lit-translate';

import '@material/mwc-icon';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';

import '@openscd/open-scd/src/filtered-list.js';
import {
  identity,
} from '@openscd/open-scd/src/foundation.js';

import {
  createElement,
} from '@openscd/xml';

import {
  Create,
  ComplexAction,
  Delete,
  Move,
  newActionEvent,
} from '@openscd/core/foundation/deprecated/editor.js';
import {
  newSmvSubscriptionEvent,
  SmvSelectEvent,
  SmvSubscriptionEvent,
} from './foundation.js';
import { emptyInputsDeleteActions } from '@openscd/open-scd/src/foundation/ied.js';
import {
  canCreateValidExtRef,
  createExtRefElement,
  existExtRef,
  getExistingSupervision,
  getExtRef,
  getFirstSubscribedExtRef,
  IEDSelectEvent,
  instantiateSubscriptionSupervision,
  ListElement,
  removeSubscriptionSupervision,
  styles,
  SubscriberListContainer,
  SubscribeStatus,
  View,
  ViewEvent,
} from '../foundation.js';

/** Defining view outside the class, which makes it persistent. */
let view: View = View.PUBLISHER;

/** An sub element for subscribing and unsubscribing IEDs to Sampled Values messages. */
@customElement('subscriber-list-smv')
export class SubscriberList extends SubscriberListContainer {
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;

  /** Current selected Sampled Values element (when in GOOSE Publisher view) */
  currentSelectedSmvControl: Element | undefined;

  /** The name of the IED belonging to the current selected Sampled Values */
  currentSmvIedName: string | undefined | null;

  constructor() {
    super();
    this.onIEDSelectEvent = this.onIEDSelectEvent.bind(this);
    this.onSmvSelectEvent = this.onSmvSelectEvent.bind(this);
    this.onIEDSubscriptionEvent = this.onIEDSubscriptionEvent.bind(this);
    this.onViewChange = this.onViewChange.bind(this);

    const parentDiv = this.closest('.container');
    if (parentDiv) {
      parentDiv.addEventListener('ied-select', this.onIEDSelectEvent);
      parentDiv.addEventListener('smv-select', this.onSmvSelectEvent);
      parentDiv.addEventListener(
        'smv-subscription',
        this.onIEDSubscriptionEvent
      );
      parentDiv.addEventListener('view', this.onViewChange);
    }
  }

  private async onIEDSelectEvent(event: IEDSelectEvent) {
    if (!event.detail.ied) return;
    this.currentSelectedIed = event.detail.ied!;

    this.resetElements();

    const subscribedInputs = this.currentSelectedIed.querySelectorAll(
      `LN0 > Inputs, LN > Inputs`
    );

    Array.from(this.doc.querySelectorAll('SampledValueControl'))
      .filter(cb => cb.hasAttribute('datSet'))
      .forEach(control => {
        const ied = control.closest('IED')!;

        if (
          ied.getAttribute('name') ==
          this.currentSelectedIed?.getAttribute('name')
        )
          return;

        /** If no Inputs is available, it's automatically available. */
        if (subscribedInputs.length == 0) {
          this.availableElements.push({ element: control });
          return;
        }

        let numberOfLinkedExtRefs = 0;
        const dataSet = ied.querySelector(
          `DataSet[name="${control.getAttribute('datSet')}"]`
        );

        if (!dataSet) return;

        dataSet!.querySelectorAll('FCDA').forEach(fcda => {
          subscribedInputs.forEach(inputs => {
            if (getExtRef(inputs, fcda, this.currentSelectedSmvControl)) {
              numberOfLinkedExtRefs++;
            }
          });
        });

        if (numberOfLinkedExtRefs == 0) {
          this.availableElements.push({ element: control });
          return;
        }

        if (numberOfLinkedExtRefs >= dataSet!.querySelectorAll('FCDA').length) {
          this.subscribedElements.push({ element: control });
        } else {
          this.availableElements.push({ element: control, partial: true });
        }
      });

    this.requestUpdate();
  }

  private async onSmvSelectEvent(event: SmvSelectEvent) {
    if (!event.detail.dataset || !event.detail.smvControl) return;

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
            if (getExtRef(inputs, fcda, this.currentSelectedSmvControl)) {
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

  private async onIEDSubscriptionEvent(event: SmvSubscriptionEvent) {
    let iedToSubscribe = event.detail.element;

    if (view == View.SUBSCRIBER) {
      const dataSetName = event.detail.element.getAttribute('datSet');
      this.currentUsedDataset =
        event.detail.element.parentElement?.querySelector(
          `DataSet[name="${dataSetName}"]`
        );
      this.currentSelectedSmvControl = event.detail.element;
      this.currentSmvIedName = event.detail.element
        .closest('IED')
        ?.getAttribute('name');
      iedToSubscribe = this.currentSelectedIed!;
    }

    switch (event.detail.subscribeStatus) {
      case SubscribeStatus.Full: {
        this.unsubscribe(iedToSubscribe);
        break;
      }
      case SubscribeStatus.Partial: {
        this.subscribe(iedToSubscribe);
        break;
      }
      case SubscribeStatus.None: {
        this.subscribe(iedToSubscribe);
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

  private async subscribe(ied: Element): Promise<void> {
    if (!ied.querySelector('LN0')) return;

    let inputsElement = ied.querySelector('LN0 > Inputs');
    if (!inputsElement)
      inputsElement = createElement(ied.ownerDocument, 'Inputs', {});

    const complexAction: ComplexAction = {
      actions: [],
      title: get(`subscription.connect`),
    };

    this.currentUsedDataset!.querySelectorAll('FCDA').forEach(fcda => {
      if (
        !existExtRef(inputsElement!, fcda, this.currentSelectedSmvControl) &&
        canCreateValidExtRef(fcda, this.currentSelectedSmvControl)
      ) {
        const extRef = createExtRefElement(
          this.currentSelectedSmvControl,
          fcda
        );

        if (inputsElement?.parentElement)
          complexAction.actions.push({
            new: { parent: inputsElement!, element: extRef },
          });
        else inputsElement?.appendChild(extRef);
      }
    });

    // we need to extend the actions array with the actions for the instantiation of the LSVS
    const supervisionActions = instantiateSubscriptionSupervision(
      this.currentSelectedSmvControl,
      ied
    );

    if (inputsElement.parentElement) {
      complexAction.actions.concat(supervisionActions);
    } else {
      /** If the IED doesn't have a Inputs element, just append it to the first LN0 element. */
      const inputAction: (Create | Move)[] = [
        {
          new: { parent: ied.querySelector('LN0')!, element: inputsElement },
        },
      ];
      complexAction.actions = inputAction.concat(supervisionActions);
    }
    this.dispatchEvent(newActionEvent(complexAction));
  }

  private async unsubscribe(ied: Element): Promise<void> {
    const actions: Delete[] = [];
    ied.querySelectorAll('LN0 > Inputs, LN > Inputs').forEach(inputs => {
      this.currentUsedDataset!.querySelectorAll('FCDA').forEach(fcda => {
        const extRef = getExtRef(inputs, fcda, this.currentSelectedSmvControl);
        if (extRef) actions.push({ old: { parent: inputs, element: extRef } });
      });
    });

    // Check if empty Input Element should also be removed.
    actions.push(...emptyInputsDeleteActions(actions));

    // we need to extend the actions array with the actions for removing the supervision
    actions.push(
      ...removeSubscriptionSupervision(this.currentSelectedSmvControl, ied)
    );

    this.dispatchEvent(
      newActionEvent({
        title: get('subscription.disconnect'),
        actions: actions,
      })
    );
  }

  renderSubscriber(status: SubscribeStatus, element: Element): TemplateResult {
    let firstSubscribedExtRef: Element | null = null;
    let supervisionNode: Element | null = null;
    if (status !== SubscribeStatus.None) {
      if (view === View.PUBLISHER) {
        firstSubscribedExtRef = getFirstSubscribedExtRef(
          this.currentSelectedSmvControl!,
          element
        );
        supervisionNode = getExistingSupervision(firstSubscribedExtRef!);
      } else {
        firstSubscribedExtRef = getFirstSubscribedExtRef(
          element,
          this.currentSelectedIed!
        );
        supervisionNode = getExistingSupervision(firstSubscribedExtRef!);
      }
    }
    return html` <mwc-list-item
      @click=${() => {
        this.dispatchEvent(
          newSmvSubscriptionEvent(element, status ?? SubscribeStatus.None)
        );
      }}
      graphic="avatar"
      ?hasMeta=${supervisionNode !== null}
    >
      <span
        >${view == View.PUBLISHER
          ? element.getAttribute('name')
          : element.getAttribute('name') +
            ` (${element.closest('IED')?.getAttribute('name')})`}</span
      >
      <mwc-icon slot="graphic"
        >${status == SubscribeStatus.Full ? html`clear` : html`add`}</mwc-icon
      >
      ${supervisionNode !== null
        ? html`<mwc-icon title="${identity(supervisionNode)}" slot="meta"
            >monitor_heart</mwc-icon
          >`
        : nothing}
    </mwc-list-item>`;
  }

  renderUnSubscribers(elements: ListElement[]): TemplateResult {
    return html`<mwc-list-item
        noninteractive
        value="${elements
          .map(element => {
            const id = identity(element.element) as string;
            return typeof id === 'string' ? id : '';
          })
          .join(' ')}"
      >
        <span>${get('subscription.subscriber.availableToSubscribe')}</span>
      </mwc-list-item>
      <li divider role="separator"></li>
      ${elements.length > 0
        ? elements.map(element =>
            this.renderSubscriber(SubscribeStatus.None, element.element)
          )
        : html`<mwc-list-item graphic="avatar" noninteractive>
            <span>${get('subscription.none')}</span>
          </mwc-list-item>`}`;
  }

  renderPartiallySubscribers(elements: ListElement[]): TemplateResult {
    return html`<mwc-list-item
        noninteractive
        value="${elements
          .map(element => {
            const id = identity(element.element) as string;
            return typeof id === 'string' ? id : '';
          })
          .join(' ')}"
      >
        <span>${get('subscription.subscriber.partiallySubscribed')}</span>
      </mwc-list-item>
      <li divider role="separator"></li>
      ${elements.length > 0
        ? elements.map(element =>
            this.renderSubscriber(SubscribeStatus.Partial, element.element)
          )
        : html`<mwc-list-item graphic="avatar" noninteractive>
            <span>${get('subscription.none')}</span>
          </mwc-list-item>`}`;
  }

  renderFullSubscribers(): TemplateResult {
    return html`<mwc-list-item
        noninteractive
        value="${this.subscribedElements
          .map(element => {
            const id = identity(element.element) as string;
            return typeof id === 'string' ? id : '';
          })
          .join(' ')}"
      >
        <span>${get('subscription.subscriber.subscribed')}</span>
      </mwc-list-item>
      <li divider role="separator"></li>
      ${this.subscribedElements.length > 0
        ? this.subscribedElements.map(element =>
            this.renderSubscriber(SubscribeStatus.Full, element.element)
          )
        : html`<mwc-list-item graphic="avatar" noninteractive>
            <span>${get('subscription.none')}</span>
          </mwc-list-item>`}`;
  }

  renderTitle(): TemplateResult {
    const gseControlName =
      this.currentSelectedSmvControl?.getAttribute('name') ?? undefined;

    return view == View.PUBLISHER
      ? html`<h1>
          ${get('subscription.smv.publisher.subscriberTitle', {
            selected: gseControlName
              ? this.currentSmvIedName + ' > ' + gseControlName
              : 'Sampled Value',
          })}
        </h1>`
      : html`<h1>
          ${get('subscription.smv.subscriber.publisherTitle', {
            selected: this.currentSelectedIed
              ? this.currentSelectedIed.getAttribute('name')!
              : 'IED',
          })}
        </h1>`;
  }

  protected firstUpdated(): void {
    this.currentSelectedIed = undefined;
  }

  render(): TemplateResult {
    return html`
      <section tabindex="0">
        ${this.renderTitle()}
        ${this.availableElements.length != 0 ||
        this.subscribedElements.length != 0
          ? html`<div class="wrapper">
              <filtered-list>
                ${this.renderFullSubscribers()}
                ${this.renderPartiallySubscribers(
                  this.availableElements.filter(element => element.partial)
                )}
                ${this.renderUnSubscribers(
                  this.availableElements.filter(element => !element.partial)
                )}
              </filtered-list>
            </div>`
          : html`<mwc-list>
              <mwc-list-item noninteractive>
                <span>${
                  view == View.PUBLISHER
                    ? get('subscription.subscriber.noControlBlockSelected')
                    : get('subscription.subscriber.noIedSelected')
                }</span>
              </mwc-list-item>
            </mwc-list>
          </div>`}
      </section>
    `;
  }

  static styles = css`
    ${styles}

    .wrapper {
      height: 100vh;
      overflow-y: scroll;
    }
  `;
}
