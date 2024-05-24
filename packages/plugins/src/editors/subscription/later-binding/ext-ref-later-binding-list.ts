import {
  css,
  customElement,
  html,
  LitElement,
  property,
  state,
  TemplateResult,
} from 'lit-element';
import { nothing } from 'lit-html';
import { get } from 'lit-translate';

import {
  getDescriptionAttribute,
  identity,
} from '@openscd/open-scd/src/foundation.js';

import {
  cloneElement,
} from '@openscd/xml';

import {
  ComplexAction,
  Delete,
  newActionEvent,
} from '@openscd/core/foundation/deprecated/editor.js';

import {
  getExistingSupervision,
  styles,
  updateExtRefElement,
  serviceTypes,
  instantiateSubscriptionSupervision,
  removeSubscriptionSupervision,
  FcdaSelectEvent,
  newSubscriptionChangedEvent,
  canRemoveSubscriptionSupervision,
} from '../foundation.js';

import {
  getExtRefElements,
  getSubscribedExtRefElements,
  fcdaSpecification,
  inputRestriction,
  isSubscribed,
} from './foundation.js';

/**
 * A sub element for showing all Ext Refs from a FCDA Element.
 * The List reacts on a custom event to know which FCDA Element was selected and updated the view.
 */
@customElement('extref-later-binding-list')
export class ExtRefLaterBindingList extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;
  @property()
  controlTag!: 'SampledValueControl' | 'GSEControl';

  @state()
  currentSelectedControlElement: Element | undefined;
  @state()
  currentSelectedFcdaElement: Element | undefined;
  @state()
  currentIedElement: Element | undefined;

  serviceTypeLookup = {
    GSEControl: 'GOOSE',
    SampledValueControl: 'SMV',
  };

  constructor() {
    super();

    const parentDiv = this.closest('.container');
    if (parentDiv) {
      this.onFcdaSelectEvent = this.onFcdaSelectEvent.bind(this);
      parentDiv.addEventListener('fcda-select', this.onFcdaSelectEvent);
    }
  }

  private async onFcdaSelectEvent(event: FcdaSelectEvent) {
    this.currentSelectedControlElement = event.detail.control;
    this.currentSelectedFcdaElement = event.detail.fcda;

    // Retrieve the IED Element to which the FCDA belongs.
    // These ExtRef Elements will be excluded.
    this.currentIedElement = this.currentSelectedFcdaElement
      ? this.currentSelectedFcdaElement.closest('IED') ?? undefined
      : undefined;
  }

  /**
   * Check data consistency of source `FCDA` and sink `ExtRef` based on
   * `ExtRef`'s `pLN`, `pDO`, `pDA` and `pServT` attributes.
   * Consistent means `CDC` and `bType` of both ExtRef and FCDA is equal.
   * In case
   *  - `pLN`, `pDO`, `pDA` or `pServT` attributes are not present, allow subscribing
   *  - no CDC or bType can be extracted, do not allow subscribing
   *
   * @param extRef - The `ExtRef` Element to check against
   */
  private unsupportedExtRefElement(extRef: Element): boolean {
    // Vendor does not provide data for the check
    if (
      !extRef.hasAttribute('pLN') ||
      !extRef.hasAttribute('pDO') ||
      !extRef.hasAttribute('pDA') ||
      !extRef.hasAttribute('pServT')
    )
      return false;

    // Not ready for any kind of subscription
    if (!this.currentSelectedFcdaElement) return true;

    const fcda = fcdaSpecification(this.currentSelectedFcdaElement);
    const input = inputRestriction(extRef);

    if (fcda.cdc === null && input.cdc === null) return true;
    if (fcda.bType === null && input.bType === null) return true;
    if (
      serviceTypes[this.currentSelectedControlElement?.tagName ?? ''] !==
      extRef.getAttribute('pServT')
    )
      return true;

    return fcda.cdc !== input.cdc || fcda.bType !== input.bType;
  }

  /**
   * Unsubscribing means removing a list of attributes from the ExtRef Element.
   *
   * @param extRefElement - The Ext Ref Element to clean from attributes.
   */
  private unsubscribe(extRefElement: Element): void {
    if (
      !this.currentIedElement ||
      !this.currentSelectedFcdaElement ||
      !this.currentSelectedControlElement!
    ) {
      return;
    }
    const clonedExtRefElement = cloneElement(extRefElement, {
      iedName: null,
      ldInst: null,
      prefix: null,
      lnClass: null,
      lnInst: null,
      doName: null,
      daName: null,
      serviceType: null,
      srcLDInst: null,
      srcPrefix: null,
      srcLNClass: null,
      srcLNInst: null,
      srcCBName: null,
    });

    const replaceAction = {
      old: { element: extRefElement },
      new: { element: clonedExtRefElement },
    };

    const subscriberIed = extRefElement.closest('IED') || undefined;
    const removeSubscriptionActions: Delete[] = [];
    if (canRemoveSubscriptionSupervision(extRefElement))
      removeSubscriptionActions.push(
        ...removeSubscriptionSupervision(
          this.currentSelectedControlElement,
          subscriberIed
        )
      );

    this.dispatchEvent(
      newActionEvent({
        title: get(`subscription.disconnect`),
        actions: [replaceAction, ...removeSubscriptionActions],
      })
    );
    this.dispatchEvent(
      newSubscriptionChangedEvent(
        this.currentSelectedControlElement,
        this.currentSelectedFcdaElement
      )
    );
  }

  /**
   * Subscribing means copying a list of attributes from the FCDA Element (and others) to the ExtRef Element.
   *
   * @param extRefElement - The Ext Ref Element to add the attributes to.
   */
  private subscribe(extRefElement: Element): void {
    if (
      !this.currentIedElement ||
      !this.currentSelectedFcdaElement ||
      !this.currentSelectedControlElement!
    ) {
      return;
    }

    const complexAction: ComplexAction = {
      actions: [],
      title: get(`subscription.connect`),
    };

    const replaceAction = {
      old: { element: extRefElement },
      new: {
        element: updateExtRefElement(
          extRefElement,
          this.currentSelectedControlElement,
          this.currentSelectedFcdaElement
        ),
      },
    };
    complexAction.actions.push(replaceAction);

    const subscriberIed = extRefElement.closest('IED') || undefined;

    complexAction.actions.push(
      ...instantiateSubscriptionSupervision(
        this.currentSelectedControlElement,
        subscriberIed
      )
    );

    this.dispatchEvent(newActionEvent(complexAction));
    this.dispatchEvent(
      newSubscriptionChangedEvent(
        this.currentSelectedControlElement,
        this.currentSelectedFcdaElement
      )
    );
  }

  private getSubscribedExtRefElements(): Element[] {
    return getSubscribedExtRefElements(
      <Element>this.doc.getRootNode(),
      this.controlTag,
      this.currentSelectedFcdaElement,
      this.currentSelectedControlElement,
      true
    );
  }

  private getAvailableExtRefElements(): Element[] {
    return getExtRefElements(
      <Element>this.doc.getRootNode(),
      this.currentSelectedFcdaElement,
      true
    ).filter(
      extRefElement =>
        !isSubscribed(extRefElement) &&
        (!extRefElement.hasAttribute('serviceType') ||
          extRefElement.getAttribute('serviceType') ===
            this.serviceTypeLookup[this.controlTag])
    );
  }

  private renderTitle(): TemplateResult {
    return html`<h1>${get(`subscription.laterBinding.extRefList.title`)}</h1>`;
  }

  private renderExtRefElement(extRefElement: Element): TemplateResult {
    const supervisionNode = getExistingSupervision(extRefElement);
    return html` <mwc-list-item
      graphic="large"
      ?hasMeta=${supervisionNode !== null}
      twoline
      @click=${() => this.unsubscribe(extRefElement)}
      value="${identity(extRefElement)}"
    >
      <span>
        ${extRefElement.getAttribute('intAddr')}
        ${getDescriptionAttribute(extRefElement)
          ? html` (${getDescriptionAttribute(extRefElement)})`
          : nothing}
      </span>
      <span slot="secondary"
        >${identity(extRefElement.parentElement)}${supervisionNode !== null
          ? ` (${identity(supervisionNode)})`
          : ''}</span
      >
      <mwc-icon slot="graphic">swap_horiz</mwc-icon>
      ${supervisionNode !== null
        ? html`<mwc-icon title="${identity(supervisionNode)}" slot="meta"
            >monitor_heart</mwc-icon
          >`
        : nothing}
    </mwc-list-item>`;
  }

  private renderSubscribedExtRefs(): TemplateResult {
    const subscribedExtRefs = this.getSubscribedExtRefElements();
    return html`
      <mwc-list-item
        noninteractive
        value="${subscribedExtRefs
          .map(
            extRefElement =>
              getDescriptionAttribute(extRefElement) +
              ' ' +
              identity(extRefElement)
          )
          .join(' ')}"
      >
        <span>${get('subscription.subscriber.subscribed')}</span>
      </mwc-list-item>
      <li divider role="separator"></li>
      ${subscribedExtRefs.length > 0
        ? html`${subscribedExtRefs.map(extRefElement =>
            this.renderExtRefElement(extRefElement)
          )}`
        : html`<mwc-list-item graphic="large" noninteractive>
            ${get('subscription.laterBinding.extRefList.noSubscribedExtRefs')}
          </mwc-list-item>`}
    `;
  }

  private renderAvailableExtRefs(): TemplateResult {
    const availableExtRefs = this.getAvailableExtRefElements();
    return html`
      <mwc-list-item
        noninteractive
        value="${availableExtRefs
          .map(
            extRefElement =>
              getDescriptionAttribute(extRefElement) +
              ' ' +
              identity(extRefElement)
          )
          .join(' ')}"
      >
        <span> ${get('subscription.subscriber.availableToSubscribe')} </span>
      </mwc-list-item>
      <li divider role="separator"></li>
      ${availableExtRefs.length > 0
        ? html`${availableExtRefs.map(
            extRefElement => html` <mwc-list-item
              graphic="large"
              ?disabled=${this.unsupportedExtRefElement(extRefElement)}
              twoline
              @click=${() => this.subscribe(extRefElement)}
              value="${identity(extRefElement)}"
            >
              <span>
                ${extRefElement.getAttribute('intAddr')}
                ${getDescriptionAttribute(extRefElement)
                  ? html` (${getDescriptionAttribute(extRefElement)})`
                  : nothing}
              </span>
              <span slot="secondary"
                >${identity(extRefElement.parentElement)}</span
              >
              <mwc-icon slot="graphic">arrow_back</mwc-icon>
            </mwc-list-item>`
          )}`
        : html`<mwc-list-item graphic="large" noninteractive>
            ${get('subscription.laterBinding.extRefList.noAvailableExtRefs')}
          </mwc-list-item>`}
    `;
  }

  render(): TemplateResult {
    return html` <section tabindex="0">
      ${this.currentSelectedControlElement && this.currentSelectedFcdaElement
        ? html`
            ${this.renderTitle()}
            <filtered-list>
              ${this.renderSubscribedExtRefs()} ${this.renderAvailableExtRefs()}
            </filtered-list>
          `
        : html`
            <h1>${get('subscription.laterBinding.extRefList.noSelection')}</h1>
          `}
    </section>`;
  }

  static styles = css`
    ${styles}

    mwc-list-item.hidden[noninteractive] + li[divider] {
      display: none;
    }
  `;
}
