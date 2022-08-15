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
import { translate } from 'lit-translate';

import {
  compareNames,
  getDescriptionAttribute,
  getNameAttribute,
  identity,
} from '../../../foundation.js';

import { styles } from '../foundation.js';
import { FcdaSelectEvent, getFcdaTitleValue } from './foundation.js';

/**
 * A sub element for showing all Ext Refs from a FCDA Element.
 * The List reacts on a custom event to know which FCDA Element was selected and updated the view.
 */
@customElement('extref-later-binding-list')
export class ExtRefLaterBindingList extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @state()
  currentSelectedSvcElement: Element | undefined;
  @state()
  currentSelectedFcdaElement: Element | undefined;
  @state()
  currentIedElement: Element | undefined;

  constructor() {
    super();
    this.onFcdaSelectEvent = this.onFcdaSelectEvent.bind(this);

    const parentDiv = this.closest('.container');
    if (parentDiv) {
      parentDiv.addEventListener('fcda-select', this.onFcdaSelectEvent);
    }
  }

  private getExtRefsElements(): Element[] {
    if (this.doc) {
      return Array.from(this.doc.querySelectorAll('ExtRef'))
        .filter(element => element.hasAttribute('intAddr'))
        .filter(element => element.closest('IED') !== this.currentIedElement)
        .sort((a, b) =>
          compareNames(
            `${a.getAttribute('intAddr')}`,
            `${b.getAttribute('intAddr')}`
          )
        );
    }
    return [];
  }

  private getSubscribedExtRefsElements(): Element[] {
    return this.getExtRefsElements().filter(element =>
      this.isSubscribedTo(element)
    );
  }

  private getAvailableExtRefsElements(): Element[] {
    return this.getExtRefsElements().filter(
      element => !this.isSubscribed(element)
    );
  }

  private async onFcdaSelectEvent(event: FcdaSelectEvent) {
    this.currentSelectedSvcElement = event.detail.svc;
    this.currentSelectedFcdaElement = event.detail.fcda;

    // Retrieve the IED Element to which the FCDA belongs.
    // These ExtRef Elements will be excluded.
    this.currentIedElement = this.currentSelectedFcdaElement
      ? this.currentSelectedFcdaElement.closest('IED') ?? undefined
      : undefined;

    await this.requestUpdate();
  }

  private sameAttributeValue(
    extRefElement: Element,
    attributeName: string
  ): boolean {
    return (
      extRefElement.getAttribute(attributeName) ===
      this.currentSelectedFcdaElement?.getAttribute(attributeName)
    );
  }

  /**
   * Check if specific attributes from the ExtRef Element are the same as the ones from the FCDA Element
   * and also if the IED Name is the same. If that is the case this ExtRef subscribes to the selected FCDA
   * Element.
   *
   * @param extRefElement - The Ext Ref Element to check.
   */
  private isSubscribedTo(extRefElement: Element): boolean {
    return (
      extRefElement.getAttribute('iedName') ===
        this.currentIedElement?.getAttribute('name') &&
      this.sameAttributeValue(extRefElement, 'ldInst') &&
      this.sameAttributeValue(extRefElement, 'prefix') &&
      this.sameAttributeValue(extRefElement, 'lnClass') &&
      this.sameAttributeValue(extRefElement, 'lnInst') &&
      this.sameAttributeValue(extRefElement, 'doName') &&
      this.sameAttributeValue(extRefElement, 'daName')
    );
  }

  /**
   * Check if the ExtRef is already subscribed to a FCDA Element.
   *
   * @param extRefElement - The Ext Ref Element to check.
   */
  private isSubscribed(extRefElement: Element): boolean {
    return (
      extRefElement.hasAttribute('iedName') &&
      extRefElement.hasAttribute('ldInst') &&
      extRefElement.hasAttribute('prefix') &&
      extRefElement.hasAttribute('lnClass') &&
      extRefElement.hasAttribute('lnInst') &&
      extRefElement.hasAttribute('doName') &&
      extRefElement.hasAttribute('daName')
    );
  }

  /**
   * Certain ExtRef Elements are not allowed to be subscribed to by this plugin.
   * They are using a deprecated way which isn't support in this plugin.
   *
   * @param extRefElement - The Ext Ref Element to check.
   */
  private disableExtRefItem(extRefElement: Element): boolean {
    return (
      extRefElement.hasAttribute('pLN') ||
      extRefElement.hasAttribute('pDO') ||
      extRefElement.hasAttribute('pDA') ||
      extRefElement.hasAttribute('pServT')
    );
  }

  private renderTitle(): TemplateResult {
    const svcName = this.currentSelectedSvcElement
      ? getNameAttribute(this.currentSelectedSvcElement)
      : undefined;
    const fcdaName = this.currentSelectedFcdaElement
      ? getFcdaTitleValue(this.currentSelectedFcdaElement)
      : undefined;

    return html`<h1>
      ${translate('subscription.smvLaterBinding.extRefList.title', {
        svcName: svcName ?? '-',
        fcdaName: fcdaName ?? '-',
      })}
    </h1>`;
  }

  private renderSubscribedExtRefs(): TemplateResult {
    const subscribedExtRefs = this.getSubscribedExtRefsElements();
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
        <span>${translate('subscription.subscriber.subscribed')}</span>
      </mwc-list-item>
      <li divider role="separator"></li>
      ${subscribedExtRefs.length > 0
        ? html`${subscribedExtRefs.map(
            extRefElement => html` <mwc-list-item
              graphic="large"
              twoline
              value="${identity(extRefElement)}"
            >
              <span>
                ${extRefElement.getAttribute('intAddr')}
                ${getDescriptionAttribute(extRefElement)
                  ? html` (${getDescriptionAttribute(extRefElement)})`
                  : nothing}
              </span>
              <span slot="secondary">${identity(extRefElement)}</span>
              <mwc-icon slot="graphic">swap_horiz</mwc-icon>
            </mwc-list-item>`
          )}`
        : html`<mwc-list-item graphic="large" noninteractive>
            ${translate(
              'subscription.smvLaterBinding.extRefList.noSubscribedExtRefs'
            )}
          </mwc-list-item>`}
    `;
  }

  private renderAvailableExtRefs(): TemplateResult {
    const availableExtRefs = this.getAvailableExtRefsElements();
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
        <span>
          ${translate('subscription.subscriber.availableToSubscribe')}
        </span>
      </mwc-list-item>
      <li divider role="separator"></li>
      ${availableExtRefs.length > 0
        ? html`${availableExtRefs.map(
            extRefElement => html` <mwc-list-item
              graphic="large"
              .disabled=${this.disableExtRefItem(extRefElement)}
              twoline
              value="${identity(extRefElement)}"
            >
              <span>
                ${extRefElement.getAttribute('intAddr')}
                ${getDescriptionAttribute(extRefElement)
                  ? html` (${getDescriptionAttribute(extRefElement)})`
                  : nothing}
              </span>
              <span slot="secondary">${identity(extRefElement)}</span>
              <mwc-icon slot="graphic">arrow_back</mwc-icon>
            </mwc-list-item>`
          )}`
        : html`<mwc-list-item graphic="large" noninteractive>
            ${translate(
              'subscription.smvLaterBinding.extRefList.noAvailableExtRefs'
            )}
          </mwc-list-item>`}
    `;
  }

  render(): TemplateResult {
    return html` <section tabindex="0">
      ${this.renderTitle()}
      ${this.currentSelectedSvcElement && this.currentSelectedFcdaElement
        ? html`
            <filtered-list>
              ${this.renderSubscribedExtRefs()} ${this.renderAvailableExtRefs()}
            </filtered-list>
          `
        : nothing}
    </section>`;
  }

  static styles = css`
    ${styles}

    mwc-list-item.hidden[noninteractive] + li[divider] {
      display: none;
    }
  `;
}
