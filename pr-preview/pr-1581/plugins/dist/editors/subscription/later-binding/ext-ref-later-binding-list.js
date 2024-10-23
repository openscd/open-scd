import { __decorate } from "../../../../../_snowpack/pkg/tslib.js";
import { css, customElement, html, LitElement, property, state, } from '../../../../../_snowpack/pkg/lit-element.js';
import { nothing } from '../../../../../_snowpack/pkg/lit-html.js';
import { get } from '../../../../../_snowpack/pkg/lit-translate.js';
import { getDescriptionAttribute, identity, } from '../../../../../openscd/src/foundation.js';
import { cloneElement, } from '../../../../../_snowpack/link/packages/xml/dist/index.js';
import { newActionEvent, } from '../../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js';
import { getExistingSupervision, styles, updateExtRefElement, serviceTypes, instantiateSubscriptionSupervision, removeSubscriptionSupervision, newSubscriptionChangedEvent, canRemoveSubscriptionSupervision, } from '../foundation.js';
import { getExtRefElements, getSubscribedExtRefElements, fcdaSpecification, inputRestriction, isSubscribed, } from './foundation.js';
/**
 * A sub element for showing all Ext Refs from a FCDA Element.
 * The List reacts on a custom event to know which FCDA Element was selected and updated the view.
 */
let ExtRefLaterBindingList = class ExtRefLaterBindingList extends LitElement {
    constructor() {
        super();
        this.editCount = -1;
        this.serviceTypeLookup = {
            GSEControl: 'GOOSE',
            SampledValueControl: 'SMV',
        };
        const parentDiv = this.closest('.container');
        if (parentDiv) {
            this.onFcdaSelectEvent = this.onFcdaSelectEvent.bind(this);
            parentDiv.addEventListener('fcda-select', this.onFcdaSelectEvent);
        }
    }
    async onFcdaSelectEvent(event) {
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
    unsupportedExtRefElement(extRef) {
        // Vendor does not provide data for the check
        if (!extRef.hasAttribute('pLN') ||
            !extRef.hasAttribute('pDO') ||
            !extRef.hasAttribute('pDA') ||
            !extRef.hasAttribute('pServT'))
            return false;
        // Not ready for any kind of subscription
        if (!this.currentSelectedFcdaElement)
            return true;
        const fcda = fcdaSpecification(this.currentSelectedFcdaElement);
        const input = inputRestriction(extRef);
        if (fcda.cdc === null && input.cdc === null)
            return true;
        if (fcda.bType === null && input.bType === null)
            return true;
        if (serviceTypes[this.currentSelectedControlElement?.tagName ?? ''] !==
            extRef.getAttribute('pServT'))
            return true;
        return fcda.cdc !== input.cdc || fcda.bType !== input.bType;
    }
    /**
     * Unsubscribing means removing a list of attributes from the ExtRef Element.
     *
     * @param extRefElement - The Ext Ref Element to clean from attributes.
     */
    unsubscribe(extRefElement) {
        if (!this.currentIedElement ||
            !this.currentSelectedFcdaElement ||
            !this.currentSelectedControlElement) {
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
        const removeSubscriptionActions = [];
        if (canRemoveSubscriptionSupervision(extRefElement))
            removeSubscriptionActions.push(...removeSubscriptionSupervision(this.currentSelectedControlElement, subscriberIed));
        this.dispatchEvent(newActionEvent({
            title: get(`subscription.disconnect`),
            actions: [replaceAction, ...removeSubscriptionActions],
        }));
        this.dispatchEvent(newSubscriptionChangedEvent(this.currentSelectedControlElement, this.currentSelectedFcdaElement));
    }
    /**
     * Subscribing means copying a list of attributes from the FCDA Element (and others) to the ExtRef Element.
     *
     * @param extRefElement - The Ext Ref Element to add the attributes to.
     */
    subscribe(extRefElement) {
        if (!this.currentIedElement ||
            !this.currentSelectedFcdaElement ||
            !this.currentSelectedControlElement) {
            return;
        }
        const complexAction = {
            actions: [],
            title: get(`subscription.connect`),
        };
        const replaceAction = {
            old: { element: extRefElement },
            new: {
                element: updateExtRefElement(extRefElement, this.currentSelectedControlElement, this.currentSelectedFcdaElement),
            },
        };
        complexAction.actions.push(replaceAction);
        const subscriberIed = extRefElement.closest('IED') || undefined;
        complexAction.actions.push(...instantiateSubscriptionSupervision(this.currentSelectedControlElement, subscriberIed));
        this.dispatchEvent(newActionEvent(complexAction));
        this.dispatchEvent(newSubscriptionChangedEvent(this.currentSelectedControlElement, this.currentSelectedFcdaElement));
    }
    getSubscribedExtRefElements() {
        return getSubscribedExtRefElements(this.doc.getRootNode(), this.controlTag, this.currentSelectedFcdaElement, this.currentSelectedControlElement, true);
    }
    getAvailableExtRefElements() {
        return getExtRefElements(this.doc.getRootNode(), this.currentSelectedFcdaElement, true).filter(extRefElement => !isSubscribed(extRefElement) &&
            (!extRefElement.hasAttribute('serviceType') ||
                extRefElement.getAttribute('serviceType') ===
                    this.serviceTypeLookup[this.controlTag]));
    }
    renderTitle() {
        return html `<h1>${get(`subscription.laterBinding.extRefList.title`)}</h1>`;
    }
    renderExtRefElement(extRefElement) {
        const supervisionNode = getExistingSupervision(extRefElement);
        return html ` <mwc-list-item
      graphic="large"
      ?hasMeta=${supervisionNode !== null}
      twoline
      @click=${() => this.unsubscribe(extRefElement)}
      value="${identity(extRefElement)}"
    >
      <span>
        ${extRefElement.getAttribute('intAddr')}
        ${getDescriptionAttribute(extRefElement)
            ? html ` (${getDescriptionAttribute(extRefElement)})`
            : nothing}
      </span>
      <span slot="secondary"
        >${identity(extRefElement.parentElement)}${supervisionNode !== null
            ? ` (${identity(supervisionNode)})`
            : ''}</span
      >
      <mwc-icon slot="graphic">swap_horiz</mwc-icon>
      ${supervisionNode !== null
            ? html `<mwc-icon title="${identity(supervisionNode)}" slot="meta"
            >monitor_heart</mwc-icon
          >`
            : nothing}
    </mwc-list-item>`;
    }
    renderSubscribedExtRefs() {
        const subscribedExtRefs = this.getSubscribedExtRefElements();
        return html `
      <mwc-list-item
        noninteractive
        value="${subscribedExtRefs
            .map(extRefElement => getDescriptionAttribute(extRefElement) +
            ' ' +
            identity(extRefElement))
            .join(' ')}"
      >
        <span>${get('subscription.subscriber.subscribed')}</span>
      </mwc-list-item>
      <li divider role="separator"></li>
      ${subscribedExtRefs.length > 0
            ? html `${subscribedExtRefs.map(extRefElement => this.renderExtRefElement(extRefElement))}`
            : html `<mwc-list-item graphic="large" noninteractive>
            ${get('subscription.laterBinding.extRefList.noSubscribedExtRefs')}
          </mwc-list-item>`}
    `;
    }
    renderAvailableExtRefs() {
        const availableExtRefs = this.getAvailableExtRefElements();
        return html `
      <mwc-list-item
        noninteractive
        value="${availableExtRefs
            .map(extRefElement => getDescriptionAttribute(extRefElement) +
            ' ' +
            identity(extRefElement))
            .join(' ')}"
      >
        <span> ${get('subscription.subscriber.availableToSubscribe')} </span>
      </mwc-list-item>
      <li divider role="separator"></li>
      ${availableExtRefs.length > 0
            ? html `${availableExtRefs.map(extRefElement => html ` <mwc-list-item
              graphic="large"
              ?disabled=${this.unsupportedExtRefElement(extRefElement)}
              twoline
              @click=${() => this.subscribe(extRefElement)}
              value="${identity(extRefElement)}"
            >
              <span>
                ${extRefElement.getAttribute('intAddr')}
                ${getDescriptionAttribute(extRefElement)
                ? html ` (${getDescriptionAttribute(extRefElement)})`
                : nothing}
              </span>
              <span slot="secondary"
                >${identity(extRefElement.parentElement)}</span
              >
              <mwc-icon slot="graphic">arrow_back</mwc-icon>
            </mwc-list-item>`)}`
            : html `<mwc-list-item graphic="large" noninteractive>
            ${get('subscription.laterBinding.extRefList.noAvailableExtRefs')}
          </mwc-list-item>`}
    `;
    }
    render() {
        return html ` <section tabindex="0">
      ${this.currentSelectedControlElement && this.currentSelectedFcdaElement
            ? html `
            ${this.renderTitle()}
            <filtered-list>
              ${this.renderSubscribedExtRefs()} ${this.renderAvailableExtRefs()}
            </filtered-list>
          `
            : html `
            <h1>${get('subscription.laterBinding.extRefList.noSelection')}</h1>
          `}
    </section>`;
    }
};
ExtRefLaterBindingList.styles = css `
    ${styles}

    mwc-list-item.hidden[noninteractive] + li[divider] {
      display: none;
    }
  `;
__decorate([
    property({ attribute: false })
], ExtRefLaterBindingList.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], ExtRefLaterBindingList.prototype, "editCount", void 0);
__decorate([
    property()
], ExtRefLaterBindingList.prototype, "controlTag", void 0);
__decorate([
    state()
], ExtRefLaterBindingList.prototype, "currentSelectedControlElement", void 0);
__decorate([
    state()
], ExtRefLaterBindingList.prototype, "currentSelectedFcdaElement", void 0);
__decorate([
    state()
], ExtRefLaterBindingList.prototype, "currentIedElement", void 0);
ExtRefLaterBindingList = __decorate([
    customElement('extref-later-binding-list')
], ExtRefLaterBindingList);
export { ExtRefLaterBindingList };
//# sourceMappingURL=ext-ref-later-binding-list.js.map