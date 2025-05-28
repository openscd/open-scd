import { __decorate } from "../../../../../_snowpack/pkg/tslib.js";
import { css, customElement, html, LitElement, property, state, } from '../../../../../_snowpack/pkg/lit-element.js';
import { nothing } from '../../../../../_snowpack/pkg/lit-html.js';
import { get } from '../../../../../_snowpack/pkg/lit-translate.js';
import { identity, } from '../../../../../openscd/src/foundation.js';
import { createElement, } from '../../../../../_snowpack/link/packages/xml/dist/index.js';
import { newActionEvent, } from '../../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js';
import { canCreateValidExtRef, createExtRefElement, existExtRef, getExtRef, getExistingSupervision, newSubscriptionChangedEvent, removeSubscriptionSupervision, instantiateSubscriptionSupervision, styles, canRemoveSubscriptionSupervision, } from '../foundation.js';
import { getSubscribedExtRefElements } from './foundation.js';
import { emptyInputsDeleteActions } from '../../../../../openscd/src/foundation/ied.js';
/**
 * A sub element for showing all Ext Refs from a FCDA Element.
 * The List reacts on a custom event to know which FCDA Element was selected and updated the view.
 */
let ExtRefLnBindingList = class ExtRefLnBindingList extends LitElement {
    constructor() {
        super();
        this.editCount = -1;
        const parentDiv = this.closest('.container');
        if (parentDiv) {
            this.onFcdaSelectEvent = this.onFcdaSelectEvent.bind(this);
            parentDiv.addEventListener('fcda-select', this.onFcdaSelectEvent);
        }
    }
    getLNElements() {
        if (this.doc) {
            return Array.from(this.doc.querySelectorAll('LDevice > LN0, LDevice > LN')).filter(element => element.closest('IED') !== this.currentIedElement);
        }
        return [];
    }
    getSubscribedLNElements() {
        return this.getLNElements().filter(element => getSubscribedExtRefElements(element, this.controlTag, this.currentSelectedFcdaElement, this.currentSelectedControlElement, false).length > 0);
    }
    getAvailableLNElements() {
        return this.getLNElements().filter(element => getSubscribedExtRefElements(element, this.controlTag, this.currentSelectedFcdaElement, this.currentSelectedControlElement, false).length == 0);
    }
    async onFcdaSelectEvent(event) {
        this.currentSelectedControlElement = event.detail.control;
        this.currentSelectedFcdaElement = event.detail.fcda;
        // Retrieve the IED Element to which the FCDA belongs.
        // These LN Elements will be excluded.
        this.currentIedElement = this.currentSelectedFcdaElement
            ? this.currentSelectedFcdaElement.closest('IED') ?? undefined
            : undefined;
    }
    subscribe(lnElement) {
        if (!this.currentIedElement ||
            !this.currentSelectedFcdaElement ||
            !this.currentSelectedControlElement) {
            return null;
        }
        const complexAction = {
            actions: [],
            title: get(`subscription.connect`),
        };
        let inputsElement = lnElement.querySelector(':scope > Inputs');
        if (!inputsElement) {
            inputsElement = createElement(lnElement.ownerDocument, 'Inputs', {});
            complexAction.actions.push({
                new: { parent: lnElement, element: inputsElement },
            });
        }
        if (!existExtRef(inputsElement, this.currentSelectedFcdaElement, this.currentSelectedControlElement) &&
            canCreateValidExtRef(this.currentSelectedFcdaElement, this.currentSelectedControlElement)) {
            const extRef = createExtRefElement(this.currentSelectedControlElement, this.currentSelectedFcdaElement);
            complexAction.actions.push({
                new: { parent: inputsElement, element: extRef },
            });
        }
        // we need to extend the actions array with the actions for the instation of the LGOS
        const subscriberIed = lnElement.closest('IED') || undefined;
        complexAction.actions.push(...instantiateSubscriptionSupervision(this.currentSelectedControlElement, subscriberIed));
        return complexAction;
    }
    unsubscribe(lnElement) {
        if (!this.currentIedElement ||
            !this.currentSelectedFcdaElement ||
            !this.currentSelectedControlElement) {
            return null;
        }
        const actions = [];
        const inputElement = lnElement.querySelector(':scope > Inputs');
        const extRefElement = getExtRef(inputElement, this.currentSelectedFcdaElement, this.currentSelectedControlElement);
        if (extRefElement) {
            actions.push({ old: { parent: inputElement, element: extRefElement } });
        }
        // Check if empty Input Element should also be removed.
        actions.push(...emptyInputsDeleteActions(actions));
        // we need to extend the actions array with the actions for removing the supervision
        const subscriberIed = lnElement.closest('IED') || undefined;
        if (extRefElement && canRemoveSubscriptionSupervision(extRefElement))
            actions.push(...removeSubscriptionSupervision(this.currentSelectedControlElement, subscriberIed));
        return {
            title: get('subscription.disconnect'),
            actions: actions,
        };
    }
    bindingNotSupported(lnElement) {
        const iedElement = lnElement.closest('IED');
        return ((iedElement
            .querySelector(':scope > AccessPoint > Services > ClientServices, :scope > Services > ClientServices')
            ?.getAttribute('noIctBinding') ?? 'false') === 'true');
    }
    buildLNTitle(lnElement) {
        const prefix = lnElement.getAttribute('prefix');
        const inst = lnElement.getAttribute('inst');
        const data = this.nsdoc.getDataDescription(lnElement);
        return `${prefix ? `${prefix} - ` : ''}${data.label} ${inst ? ` - ${inst}` : ''}`;
    }
    renderTitle() {
        return html `<h1>${get(`subscription.binding.extRefList.title`)}</h1>`;
    }
    renderSubscribedLN(lnElement) {
        const extRefs = getSubscribedExtRefElements(lnElement, this.controlTag, this.currentSelectedFcdaElement, this.currentSelectedControlElement, false);
        const supervisionNode = getExistingSupervision(extRefs[0]);
        return html `<mwc-list-item
      graphic="large"
      ?hasMeta=${supervisionNode !== null}
      ?disabled=${this.bindingNotSupported(lnElement)}
      twoline
      value="${identity(lnElement)}"
      @click=${() => {
            const replaceAction = this.unsubscribe(lnElement);
            if (replaceAction) {
                this.dispatchEvent(newActionEvent(replaceAction));
                this.dispatchEvent(newSubscriptionChangedEvent(this.currentSelectedControlElement, this.currentSelectedFcdaElement));
            }
        }}
    >
      <span>${this.buildLNTitle(lnElement)}</span>
      <span slot="secondary"> ${identity(lnElement.closest('LDevice'))} </span>
      <mwc-icon slot="graphic">close</mwc-icon>
      ${supervisionNode !== null
            ? html `<mwc-icon title="${identity(supervisionNode)}" slot="meta"
            >monitor_heart</mwc-icon
          >`
            : nothing}</mwc-list-item
    >`;
    }
    renderSubscribedLNs() {
        const subscribedLNs = this.getSubscribedLNElements();
        return html `
      <mwc-list-item
        noninteractive
        value="${subscribedLNs
            .map(lnElement => this.buildLNTitle(lnElement) +
            ' ' +
            identity(lnElement.closest('LDevice')))
            .join(' ')}"
      >
        <span>${get('subscription.subscriber.subscribed')}</span>
      </mwc-list-item>
      <li divider role="separator"></li>
      ${subscribedLNs.length > 0
            ? html `${subscribedLNs.map(lN => this.renderSubscribedLN(lN))}`
            : html `<mwc-list-item graphic="large" noninteractive>
            ${get('subscription.binding.extRefList.noSubscribedLNs')}
          </mwc-list-item>`}
    `;
    }
    renderAvailableLNs() {
        const availableLNs = this.getAvailableLNElements();
        return html `
      <mwc-list-item
        noninteractive
        value="${availableLNs
            .map(lnElement => this.buildLNTitle(lnElement) +
            ' ' +
            identity(lnElement.closest('LDevice')))
            .join(' ')}"
      >
        <span> ${get('subscription.subscriber.availableToSubscribe')} </span>
      </mwc-list-item>
      <li divider role="separator"></li>
      ${availableLNs.length > 0
            ? html `${availableLNs.map(lnElement => html ` <mwc-list-item
              graphic="large"
              ?disabled=${this.bindingNotSupported(lnElement)}
              twoline
              value="${identity(lnElement)}"
              @click=${() => {
                const replaceAction = this.subscribe(lnElement);
                if (replaceAction) {
                    this.dispatchEvent(newActionEvent(replaceAction));
                    this.dispatchEvent(newSubscriptionChangedEvent(this.currentSelectedControlElement, this.currentSelectedFcdaElement));
                }
            }}
            >
              <span>${this.buildLNTitle(lnElement)}</span>
              <span slot="secondary">
                ${identity(lnElement.closest('LDevice'))}
              </span>
              <mwc-icon slot="graphic">add</mwc-icon>
            </mwc-list-item>`)}`
            : html `<mwc-list-item graphic="large" noninteractive>
            ${get('subscription.binding.extRefList.noAvailableLNs')}
          </mwc-list-item>`}
    `;
    }
    render() {
        return html ` <section tabindex="0">
      ${this.currentSelectedControlElement && this.currentSelectedFcdaElement
            ? html `
            ${this.renderTitle()}
            <filtered-list>
              ${this.renderSubscribedLNs()} ${this.renderAvailableLNs()}
            </filtered-list>
          `
            : html `
            <h1>${get('subscription.binding.extRefList.noSelection')}</h1>
          `}
    </section>`;
    }
};
ExtRefLnBindingList.styles = css `
    ${styles}

    mwc-list-item.hidden[noninteractive] + li[divider] {
      display: none;
    }
  `;
__decorate([
    property({ attribute: false })
], ExtRefLnBindingList.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], ExtRefLnBindingList.prototype, "editCount", void 0);
__decorate([
    property()
], ExtRefLnBindingList.prototype, "nsdoc", void 0);
__decorate([
    property()
], ExtRefLnBindingList.prototype, "controlTag", void 0);
__decorate([
    state()
], ExtRefLnBindingList.prototype, "currentSelectedControlElement", void 0);
__decorate([
    state()
], ExtRefLnBindingList.prototype, "currentSelectedFcdaElement", void 0);
__decorate([
    state()
], ExtRefLnBindingList.prototype, "currentIedElement", void 0);
ExtRefLnBindingList = __decorate([
    customElement('extref-ln-binding-list')
], ExtRefLnBindingList);
export { ExtRefLnBindingList };
//# sourceMappingURL=ext-ref-ln-binding-list.js.map