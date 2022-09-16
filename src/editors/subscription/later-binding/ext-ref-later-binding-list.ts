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
  cloneElement,
  compareNames,
  getDescriptionAttribute,
  getNameAttribute,
  identity,
  newActionEvent,
  Replace,
  getSclSchemaVersion,
} from '../../../foundation.js';

import { styles, updateExtRefElement, serviceTypes } from '../foundation.js';
import { FcdaSelectEvent, getFcdaTitleValue } from './foundation.js';

/**
 * A sub element for showing all Ext Refs from a FCDA Element.
 * The List reacts on a custom event to know which FCDA Element was selected and updated the view.
 */
@customElement('extref-later-binding-list')
export class ExtRefLaterBindingList extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;
  @property()
  controlTag!: 'SampledValueControl' | 'GSEControl';

  @state()
  currentSelectedControlElement: Element | undefined;
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

  private getExtRefElements(): Element[] {
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

  private getSubscribedExtRefElements(): Element[] {
    return this.getExtRefElements().filter(element =>
      this.isSubscribedTo(element)
    );
  }

  private getAvailableExtRefElements(): Element[] {
    return this.getExtRefElements().filter(
      element => !this.isSubscribed(element)
    );
  }

  private async onFcdaSelectEvent(event: FcdaSelectEvent) {
    this.currentSelectedControlElement = event.detail.controlElement;
    this.currentSelectedFcdaElement = event.detail.fcda;

    // Retrieve the IED Element to which the FCDA belongs.
    // These ExtRef Elements will be excluded.
    this.currentIedElement = this.currentSelectedFcdaElement
      ? this.currentSelectedFcdaElement.closest('IED') ?? undefined
      : undefined;
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

  private checkEditionSpecificRequirements(extRefElement: Element): boolean {
    if (getSclSchemaVersion(extRefElement.ownerDocument) === '2003')
      return true;
    return (
      extRefElement.getAttribute('serviceType') ===
        serviceTypes[this.controlTag] &&
      extRefElement.getAttribute('srcLDInst') ===
        this.currentSelectedControlElement
          ?.closest('LDevice')
          ?.getAttribute('inst') &&
      (extRefElement.getAttribute('scrPrefix') || '') ===
        (this.currentSelectedControlElement
          ?.closest('LN0')
          ?.getAttribute('prefix') || '') &&
      extRefElement.getAttribute('srcLNClass') ===
        this.currentSelectedControlElement
          ?.closest('LN0')
          ?.getAttribute('lnClass') &&
      (extRefElement.getAttribute('srcLNInst') || '') ===
        this.currentSelectedControlElement
          ?.closest('LN0')
          ?.getAttribute('inst') &&
      extRefElement.getAttribute('srcCBName') ===
        this.currentSelectedControlElement?.getAttribute('name')
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
      this.sameAttributeValue(extRefElement, 'daName') &&
      this.checkEditionSpecificRequirements(extRefElement)
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
   * The data attribute check using attributes pLN, pDO, pDA and pServT is not supported yet by this plugin.
   * To make sure the user does not do anything prohibited, this type of ExtRef cannot be manipulated for the time being.
   * (Will be updated in the future).
   *
   * @param extRefElement - The Ext Ref Element to check.
   */
  private unsupportedExtRefElement(extRefElement: Element): boolean {
    return (
      extRefElement.hasAttribute('pLN') ||
      extRefElement.hasAttribute('pDO') ||
      extRefElement.hasAttribute('pDA') ||
      extRefElement.hasAttribute('pServT')
    );
  }

  /**
   * Unsubscribing means removing a list of attributes from the ExtRef Element.
   *
   * @param extRefElement - The Ext Ref Element to clean from attributes.
   */
  private unsubscribe(extRefElement: Element): Replace {
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

    return {
      old: { element: extRefElement },
      new: { element: clonedExtRefElement },
    };
  }

  /**
   * Subscribing means copying a list of attributes from the FCDA Element (and others) to the ExtRef Element.
   *
   * @param extRefElement - The Ext Ref Element to add the attributes to.
   */
  private subscribe(extRefElement: Element): Replace | null {
    if (
      !this.currentIedElement ||
      !this.currentSelectedFcdaElement ||
      !this.currentSelectedControlElement!
    ) {
      return null;
    }

    return {
      old: { element: extRefElement },
      new: {
        element: updateExtRefElement(
          extRefElement,
          this.currentSelectedControlElement,
          this.currentSelectedFcdaElement
        ),
      },
    };
  }

  private renderTitle(): TemplateResult {
    const controlElementName = this.currentSelectedControlElement
      ? getNameAttribute(this.currentSelectedControlElement)
      : undefined;
    const fcdaName = this.currentSelectedFcdaElement
      ? getFcdaTitleValue(this.currentSelectedFcdaElement)
      : undefined;

    return html`<h1>
      ${translate('subscription.laterBinding.extRefList.title', {
        controlTag: this.controlTag,
        controlElementName: controlElementName ?? '-',
        fcdaName: fcdaName ?? '-',
      })}
    </h1>`;
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
        <span>${translate('subscription.subscriber.subscribed')}</span>
      </mwc-list-item>
      <li divider role="separator"></li>
      ${subscribedExtRefs.length > 0
        ? html`${subscribedExtRefs.map(
            extRefElement => html` <mwc-list-item
              graphic="large"
              twoline
              @click=${() => {
                this.dispatchEvent(
                  newActionEvent(this.unsubscribe(extRefElement))
                );
              }}
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
              'subscription.laterBinding.extRefList.noSubscribedExtRefs'
            )}
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
        <span>
          ${translate('subscription.subscriber.availableToSubscribe')}
        </span>
      </mwc-list-item>
      <li divider role="separator"></li>
      ${availableExtRefs.length > 0
        ? html`${availableExtRefs.map(
            extRefElement => html` <mwc-list-item
              graphic="large"
              ?disabled=${this.unsupportedExtRefElement(extRefElement)}
              twoline
              @click=${() => {
                const replaceAction = this.subscribe(extRefElement);
                if (replaceAction) {
                  this.dispatchEvent(newActionEvent(replaceAction));
                }
              }}
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
              'subscription.laterBinding.extRefList.noAvailableExtRefs'
            )}
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
            <h1>
              ${translate('subscription.laterBinding.extRefList.noSelection')}
            </h1>
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
