import { ListItem } from '@material/mwc-list/mwc-list-item.js';
import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-menu';
import { Menu } from '@material/mwc-menu';
import { Icon } from '@material/mwc-icon';

import {
  css,
  customElement,
  html,
  LitElement,
  property,
  PropertyValues,
  query,
  TemplateResult,
} from 'lit-element';

import { nothing } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import { get, translate } from 'lit-translate';

import {
  createUpdateAction,
  Delete,
  findControlBlocks,
  findFCDAs,
  getDescriptionAttribute,
  getNameAttribute,
  identity,
  newActionEvent,
} from '../../../foundation.js';

import {
  styles,
  updateExtRefElement,
  serviceTypes,
  instantiateSubscriptionSupervision,
  removeSubscriptionSupervision,
  FcdaSelectEvent,
  newSubscriptionChangedEvent,
  canRemoveSubscriptionSupervision,
  getOrderedIeds,
  getCbReference,
  getUsedSupervisionInstances,
} from '../foundation.js';

import {
  fcdaSpecification,
  inputRestriction,
  isSubscribed,
  getFcdaSrcControlBlockDescription,
} from './foundation.js';

// FIXME: Replace with identity function after https://github.com/openscd/open-scd/issues/1179
// is resolved
function getExtRefId(extRefElement: Element): string {
  return `${identity(extRefElement.parentElement)} ${extRefElement.getAttribute(
    'intAddr'
  )}`;
}

/**
 * A sub element for showing all Ext Refs from a FCDA Element.
 * The List reacts on a custom event to know which FCDA Element was selected and updated the view.
 */
@customElement('extref-later-binding-list-subscriber')
export class ExtRefLaterBindingListSubscriber extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  @property()
  controlTag!: 'SampledValueControl' | 'GSEControl';

  @property({ attribute: true })
  subscriberview!: boolean;

  @property({ attribute: false })
  filterOnlySubscribed =
    localStorage.getItem(
      `subscriber-later-binding-${this.controlTag}$filter-only-subscribed`
    ) === 'true' ?? false;

  @query('.actions-menu')
  actionsMenu!: Menu;

  @query('.actions-menu-icon')
  actionsMenuIcon!: Icon;

  @query('mwc-list-item.activated')
  currentActivatedExtRefItem!: ListItem;

  private supervisionData = new Map();

  selectedPublisherControlElement: Element | undefined;
  selectedPublisherFcdaElement: Element | undefined;
  selectedPublisherIedElement: Element | undefined;
  currentSelectedExtRefElement: Element | undefined;

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
    this.selectedPublisherControlElement = event.detail.control;
    this.selectedPublisherFcdaElement = event.detail.fcda;

    console.log('received onFcdaSelectEvent');
    // Retrieve the IED Element to which the FCDA belongs.
    // These ExtRef Elements will be excluded.
    this.selectedPublisherIedElement = this.selectedPublisherFcdaElement
      ? this.selectedPublisherFcdaElement.closest('IED') ?? undefined
      : undefined;

    if (
      this.currentSelectedExtRefElement &&
      !isSubscribed(this.currentSelectedExtRefElement)
    ) {
      this.subscribe(this.currentSelectedExtRefElement);
      this.reCreateSupervisionCache();
      // console.log(this.currentActivatedExtRefItem);

      // deactivate/deselect
      const activatedItem = <ListItem>(
        this.shadowRoot!.querySelector('mwc-list-item[activated].extref')!
      );
      const nextActivatableItem = <ListItem>(
        this.shadowRoot!.querySelector(
          'mwc-list-item[activated].extref ~ mwc-list-item.extref'
        )
      );
      activatedItem.selected = false;
      activatedItem.activated = false;
      activatedItem.requestUpdate();

      if (nextActivatableItem) {
        // activate/select next sibling
        nextActivatableItem!.selected = true;
        nextActivatableItem!.activated = true;
        nextActivatableItem!.requestUpdate();
      }
    }
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
    if (!this.selectedPublisherFcdaElement) return true;

    const fcda = fcdaSpecification(this.selectedPublisherFcdaElement);
    const input = inputRestriction(extRef);

    if (fcda.cdc === null && input.cdc === null) return true;
    if (fcda.bType === null && input.bType === null) return true;
    if (
      serviceTypes[this.selectedPublisherControlElement?.tagName ?? ''] !==
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
    const updateAction = createUpdateAction(extRefElement, {
      intAddr: extRefElement.getAttribute('intAddr'),
      desc: extRefElement.getAttribute('desc'),
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

    const subscriberIed = extRefElement.closest('IED') || undefined;
    const fcdaElements = findFCDAs(extRefElement);
    const removeSubscriptionActions: Delete[] = [];
    const controlBlock =
      Array.from(findControlBlocks(extRefElement))[0] ?? undefined;
    if (canRemoveSubscriptionSupervision(extRefElement))
      removeSubscriptionActions.push(
        ...removeSubscriptionSupervision(controlBlock, subscriberIed)
      );

    this.dispatchEvent(
      newActionEvent({
        title: get(`subscription.disconnect`),
        actions: [updateAction, ...removeSubscriptionActions],
      })
    );

    this.dispatchEvent(
      newSubscriptionChangedEvent(
        controlBlock,
        fcdaElements.length !== 0 ? fcdaElements[0] : undefined
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
      !this.selectedPublisherIedElement ||
      !this.selectedPublisherFcdaElement ||
      !this.selectedPublisherControlElement!
    ) {
      return;
    }

    const updateAction = updateExtRefElement(
      extRefElement,
      this.selectedPublisherControlElement,
      this.selectedPublisherFcdaElement
    );

    const subscriberIed = extRefElement.closest('IED') || undefined;
    const supervisionActions = instantiateSubscriptionSupervision(
      this.selectedPublisherControlElement,
      subscriberIed
    );

    this.dispatchEvent(
      newActionEvent({
        title: get(`subscription.connect`),
        actions: [updateAction, ...supervisionActions],
      })
    );
    this.dispatchEvent(
      newSubscriptionChangedEvent(
        this.selectedPublisherControlElement,
        this.selectedPublisherFcdaElement
      )
    );
  }

  private getExtRefElementsByIED(ied: Element): Element[] {
    return Array.from(
      ied.querySelectorAll(
        ':scope > AccessPoint > Server > LDevice > LN > Inputs > ExtRef, :scope > AccessPoint > Server > LDevice > LN0 > Inputs > ExtRef'
      )
    )
      .filter(
        extRefElement =>
          (extRefElement.hasAttribute('intAddr') &&
            !extRefElement.hasAttribute('serviceType')) ||
          extRefElement.getAttribute('serviceType') ===
            this.serviceTypeLookup[this.controlTag]
      )
      .sort((a, b) => {
        return getExtRefId(a).localeCompare(getExtRefId(b));
      });
  }

  private renderTitle(): TemplateResult {
    return html`<h1>
      ${translate(`subscription.laterBinding.extRefList.title`)}
      <mwc-icon-button
        icon="alt_route"
        title="${translate(`subscription.laterBinding.extRefList.switchView`)}"
        @click=${() =>
          this.dispatchEvent(
            new Event('change-view', { bubbles: true, composed: true })
          )}
      ></mwc-icon-button>
      <mwc-icon-button
        class="actions-menu-icon ${this.filterOnlySubscribed
          ? 'filter-on'
          : ''}"
        icon="filter_list"
        @click=${() => {
          if (!this.actionsMenu.open) this.actionsMenu.show();
          else this.actionsMenu.close();
        }}
      ></mwc-icon-button>
      <mwc-menu
        multi
        class="actions-menu"
        corner="BOTTOM_RIGHT"
        menuCorner="END"
      >
        <mwc-check-list-item
          class="filter-subscribed"
          left
          @click=${() => {
            this.actionsMenu.close();
          }}
        >
          <span>${translate('subscription.subscriber.onlyConfigured')}</span>
        </mwc-check-list-item>
      </mwc-menu>
    </h1>`;
  }

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);

    // When a new document is loaded we will reset the Map to clear old entries.
    if (_changedProperties.has('doc')) {
      this.supervisionData = new Map();
    }
  }

  private reCreateSupervisionCache() {
    this.supervisionData = new Map();
    const supervisionType =
      this.serviceTypeLookup[this.controlTag] === 'GOOSE' ? 'LGOS' : 'LSVS';
    const refSelector =
      supervisionType === 'LGOS'
        ? 'DOI[name="GoCBRef"]'
        : 'DOI[name="SvCBRef"]';

    getUsedSupervisionInstances(
      this.doc,
      this.serviceTypeLookup[this.controlTag]
    ).forEach(supervisionLN => {
      const cbRef = supervisionLN!.querySelector(
        `LN[lnClass="${supervisionType}"]>${refSelector}>DAI[name="setSrcRef"]>Val`
      )?.textContent;
      if (cbRef) this.supervisionData.set(cbRef, supervisionLN);
    });
  }

  private getCachedSupervision(extRefElement: Element): Element | undefined {
    const cbRefKey = getCbReference(extRefElement);
    return this.supervisionData.get(cbRefKey);
  }

  protected firstUpdated(): void {
    this.actionsMenu.anchor = <HTMLElement>this.actionsMenuIcon;

    this.actionsMenu.addEventListener('closed', () => {
      this.filterOnlySubscribed = (<Set<number>>this.actionsMenu.index).has(0);
      localStorage.setItem(
        `subscriber-later-binding-${this.controlTag}$filter-only-subscribed`,
        `${this.filterOnlySubscribed}`
      );
    });
  }

  private renderCompleteExtRefElement(extRefElement: Element): TemplateResult {
    let subscriberFCDA: Element | undefined;
    let supervisionNode: Element | undefined;
    let controlBlockDescription: string | undefined;
    let supervisionDescription: string | undefined;

    const subscribed = isSubscribed(extRefElement);
    if (this.filterOnlySubscribed && !subscribed) return html``;

    if (subscribed) {
      subscriberFCDA = findFCDAs(extRefElement).find(x => x !== undefined);
      supervisionNode = this.getCachedSupervision(extRefElement);
      controlBlockDescription =
        getFcdaSrcControlBlockDescription(extRefElement);
    }

    const iedName =
      extRefElement.closest('IED')!.getAttribute('name') ?? 'Unknown';
    if (supervisionNode) {
      supervisionDescription = (<string>identity(supervisionNode)).slice(
        iedName.length + 2
      );
    }

    return html`<mwc-list-item
      twoline
      class="extref"
      graphic="large"
      ?hasMeta=${supervisionNode !== undefined}
      ?disabled=${this.unsupportedExtRefElement(extRefElement)}
      @click=${() => {
        this.currentSelectedExtRefElement = extRefElement;
        if (subscribed) {
          this.unsubscribe(extRefElement);
          this.reCreateSupervisionCache();
        }
      }}
      @request-selected=${() => {
        this.currentSelectedExtRefElement = extRefElement;
        (<ListItem>(
          this.shadowRoot!.querySelector('mwc-list-item[activated].extref')!
        ))?.requestUpdate();
      }}
      value="${identity(extRefElement)} ${supervisionNode
        ? identity(supervisionNode)
        : ''}"
    >
      <span>
        ${(<string>identity(extRefElement.parentElement)).slice(
          iedName.length + 2
        )}:
        ${extRefElement.getAttribute('intAddr')}
        ${subscribed && subscriberFCDA
          ? `⬌ ${identity(subscriberFCDA) ?? 'Unknown'}`
          : ''}
      </span>
      <span slot="secondary"
        >${getDescriptionAttribute(extRefElement)
          ? html` ${getDescriptionAttribute(extRefElement)}`
          : nothing}
        ${supervisionDescription || controlBlockDescription
          ? html`(${[controlBlockDescription, supervisionDescription]
              .filter(desc => desc !== undefined)
              .join(', ')})`
          : nothing}
      </span>
      <mwc-icon slot="graphic">${subscribed ? 'link' : 'link_off'}</mwc-icon>
      ${subscribed && supervisionNode !== undefined
        ? html`<mwc-icon title="${identity(supervisionNode!)}" slot="meta"
            >monitor_heart</mwc-icon
          >`
        : nothing}
    </mwc-list-item>`;
  }

  private renderExtRefsByIED(): TemplateResult {
    if (this.supervisionData.size === 0) this.reCreateSupervisionCache();
    return html`${repeat(
      getOrderedIeds(this.doc),
      i => getExtRefId(i),
      ied =>
        html`
      <mwc-list-item
        noninteractive
        graphic="icon"
        value="${Array.from(ied.querySelectorAll('Inputs > ExtRef'))
          .map(extRef => {
            const extRefid = identity(extRef) as string;
            const supervisionId =
              this.getCachedSupervision(extRef) !== undefined
                ? identity(this.getCachedSupervision(extRef)!)
                : '';
            return `${
              typeof extRefid === 'string' ? extRefid : ''
            }${supervisionId}`;
          })
          .join(' ')}"
      >
        <span>${getNameAttribute(ied)}</span>
        <mwc-icon slot="graphic">developer_board</mwc-icon>
      </mwc-list-item>
      <li divider role="separator"></li>
          ${repeat(
            Array.from(this.getExtRefElementsByIED(ied)),
            exId => getExtRefId(exId),
            extRef => this.renderCompleteExtRefElement(extRef)
          )} 
          </mwc-list-item>`
    )}`;
  }

  render(): TemplateResult {
    return html` <section tabindex="0">
      ${this.renderTitle()}
      <filtered-list activatable>${this.renderExtRefsByIED()}</filtered-list>
    </section>`;
  }

  static styles = css`
    ${styles}

    section {
      position: relative;
    }

    .actions-menu-icon {
      float: right;
    }

    .actions-menu-icon.filter-on {
      color: var(--secondary);
      background-color: var(--mdc-theme-background);
    }

    h3 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      margin: 4px 8px 16px;
      padding-left: 0.3em;
    }

    mwc-list-item.hidden[noninteractive] + li[divider] {
      display: none;
    }
  `;
}
