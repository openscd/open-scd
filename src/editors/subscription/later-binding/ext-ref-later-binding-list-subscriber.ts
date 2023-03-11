import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-menu';
import { Icon } from '@material/mwc-icon';
import { List } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item.js';
import { Menu } from '@material/mwc-menu';

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
import { classMap } from 'lit-html/directives/class-map.js';
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
  instantiateSubscriptionSupervision,
  removeSubscriptionSupervision,
  FcdaSelectEvent,
  newSubscriptionChangedEvent,
  canRemoveSubscriptionSupervision,
  getOrderedIeds,
  getCbReference,
  getUsedSupervisionInstances,
  newExtRefSelectionChangedEvent,
} from '../foundation.js';

import {
  isSubscribed,
  getFcdaSrcControlBlockDescription,
} from './foundation.js';

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

  @property({ type: Boolean })
  get notAutoIncrement(): boolean {
    return (
      localStorage.getItem(
        `extref-list-${this.controlTag}$notAutoIncrement`
      ) === 'true' ?? false
    );
  }

  set notAutoIncrement(value: boolean) {
    const oldValue = this.hideSubscribed;
    localStorage.setItem(
      `extref-list-${this.controlTag}$notAutoIncrement`,
      `${value}`
    );
    this.requestUpdate('notAutoIncrement', oldValue);
  }

  @property({ type: Boolean })
  get hideSubscribed(): boolean {
    return (
      localStorage.getItem(`extref-list-${this.controlTag}$hideSubscribed`) ===
        'true' ?? false
    );
  }

  set hideSubscribed(value: boolean) {
    const oldValue = this.hideSubscribed;
    localStorage.setItem(
      `extref-list-${this.controlTag}$hideSubscribed`,
      `${value}`
    );
    this.requestUpdate('hideSubscribed', oldValue);
  }

  @property({ type: Boolean })
  get hideNotSubscribed(): boolean {
    return (
      localStorage.getItem(
        `extref-list-${this.controlTag}$hideNotSubscribed`
      ) === 'true' ?? false
    );
  }

  set hideNotSubscribed(value: boolean) {
    const oldValue = this.hideNotSubscribed;
    localStorage.setItem(
      `extref-list-${this.controlTag}$hideNotSubscribed`,
      `${value}`
    );
    this.requestUpdate('hideNotSubscribed', oldValue);
  }

  @query('.filter-menu')
  filterMenu!: Menu;

  @query('.settings-menu')
  settingsMenu!: Menu;

  @query('.filter-action-menu-icon')
  filterMenuIcon!: Icon;

  @query('.settings-action-menu-icon')
  settingsMenuIcon!: Icon;

  @query('.extref-list') extRefList!: List;

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

      if (!this.notAutoIncrement) {
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
        return `${identity(a)}`.localeCompare(`${identity(b)}`);
      });
  }

  private renderTitle(): TemplateResult {
    const menuClasses = {
      'filter-off': this.hideSubscribed || this.hideNotSubscribed,
    };
    return html`<h1>
      ${translate(`subscription.laterBinding.extRefList.title`)}
      <mwc-icon-button
        class="switch-view"
        icon="alt_route"
        title="${translate(`subscription.laterBinding.extRefList.switchView`)}"
        @click=${() =>
          this.dispatchEvent(
            new Event('change-view', { bubbles: true, composed: true })
          )}
      ></mwc-icon-button>
      <mwc-icon-button
        class="filter-action-menu-icon ${classMap(menuClasses)}"
        title="${translate(`subscription.laterBinding.extRefList.filter`)}"
        icon="filter_list"
        @click=${() => {
          if (!this.filterMenu.open) this.filterMenu.show();
          else this.filterMenu.close();
        }}
      ></mwc-icon-button>
      <mwc-menu
        multi
        class="filter-menu"
        corner="BOTTOM_RIGHT"
        menuCorner="END"
      >
        <mwc-check-list-item
          class="show-subscribed"
          left
          ?selected=${!this.hideSubscribed}
        >
          <span
            >${translate('subscription.laterBinding.extRefList.bound')}</span
          >
        </mwc-check-list-item>
        <mwc-check-list-item
          class="show-not-subscribed"
          left
          ?selected=${!this.hideNotSubscribed}
        >
          <span
            >${translate('subscription.laterBinding.extRefList.unBound')}</span
          >
        </mwc-check-list-item>
      </mwc-menu>
      <mwc-icon-button
        class="settings-action-menu-icon"
        title="${translate(`subscription.laterBinding.extRefList.settings`)}"
        icon="settings"
        @click=${() => {
          if (!this.settingsMenu.open) this.settingsMenu.show();
          else this.settingsMenu.close();
        }}
      ></mwc-icon-button>
      <mwc-menu
        multi
        class="settings-menu"
        corner="BOTTOM_RIGHT"
        menuCorner="END"
      >
        <mwc-check-list-item class="" left ?selected=${!this.notAutoIncrement}>
          <span
            >${translate(
              'subscription.laterBinding.extRefList.autoIncrement'
            )}</span
          >
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

  updateBaseFilterState(): void {
    !this.hideSubscribed
      ? this.extRefList!.classList.add('show-subscribed')
      : this.extRefList!.classList.remove('show-subscribed');
    !this.hideNotSubscribed
      ? this.extRefList!.classList.add('show-not-subscribed')
      : this.extRefList!.classList.remove('show-not-subscribed');
  }

  protected firstUpdated(): void {
    this.filterMenu.anchor = <HTMLElement>this.filterMenuIcon;
    this.filterMenu.addEventListener('closed', () => {
      this.hideSubscribed = !(<Set<number>>this.filterMenu.index).has(0);
      this.hideNotSubscribed = !(<Set<number>>this.filterMenu.index).has(1);
      this.updateBaseFilterState();
    });

    this.updateBaseFilterState();

    this.settingsMenu.anchor = <HTMLElement>this.settingsMenuIcon;
    this.settingsMenu.addEventListener('closed', () => {
      this.notAutoIncrement = !(<Set<number>>this.settingsMenu.index).has(0);
    });
  }

  private renderCompleteExtRefElement(extRefElement: Element): TemplateResult {
    let subscriberFCDA: Element | undefined;
    let supervisionNode: Element | undefined;
    let controlBlockDescription: string | undefined;
    let supervisionDescription: string | undefined;

    const subscribed = isSubscribed(extRefElement);

    const filterClasses = {
      extref: true,
      'show-subscribed': subscribed,
      'show-not-subscribed': !subscribed,
    };

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
      class="${classMap(filterClasses)}"
      graphic="large"
      ?hasMeta=${supervisionNode !== undefined}
      @click=${() => {
        this.currentSelectedExtRefElement = extRefElement;

        if (!subscribed) {
          this.dispatchEvent(
            newExtRefSelectionChangedEvent(this.currentSelectedExtRefElement)
          );
        } else {
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
      i => `${identity(i)}`,
      ied => {
        const extRefs = Array.from(this.getExtRefElementsByIED(ied));
        const showSubscribed = extRefs.some(extRef => isSubscribed(extRef));
        const showNotSubscribed = extRefs.some(extRef => !isSubscribed(extRef));
        const filterClasses = {
          ied: true,
          'show-subscribed': showSubscribed,
          'show-not-subscribed': showNotSubscribed,
        };

        return html`
      <mwc-list-item
        class="${classMap(filterClasses)}"
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
            exId => `${identity(exId)}`,
            extRef => this.renderCompleteExtRefElement(extRef)
          )} 
          </mwc-list-item>`;
      }
    )}`;
  }

  render(): TemplateResult {
    const filteredListClasses = {
      'extref-list': true,
      'show-subscribed': !this.hideSubscribed,
      'show-not-subscribed': !this.hideNotSubscribed,
    };

    return html` <section tabindex="0">
      ${this.renderTitle()}
      <filtered-list class="${classMap(filteredListClasses)}" activatable
        >${this.renderExtRefsByIED()}</filtered-list
      >
    </section>`;
  }

  static styles = css`
    ${styles}

    section {
      position: relative;
    }

    .filter-action-menu-icon,
    .settings-action-menu-icon {
      float: right;
    }

    .filter-action-menu-icon.filter-off {
      color: var(--secondary);
      background-color: var(--mdc-theme-background);
    }

    /* remove all IEDs and ExtRefs if no filters */
    filtered-list:not(.show-subscribed, .show-not-subscribed) mwc-list-item {
      display: none;
    }

    /* remove IEDs taking care to respect multiple conditions */
    filtered-list.show-not-subscribed:not(.show-subscribed)
      mwc-list-item.ied.show-subscribed:not(.show-not-subscribed) {
      display: none;
    }

    filtered-list.show-subscribed:not(.show-not-subscribed)
      mwc-list-item.ied.show-not-subscribed:not(.show-subscribed) {
      display: none;
    }

    /* remove ExtRefs if not part of filter */
    filtered-list:not(.show-not-subscribed)
      mwc-list-item.extref.show-not-subscribed {
      display: none;
    }

    filtered-list:not(.show-subscribed) mwc-list-item.extref.show-subscribed {
      display: none;
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
