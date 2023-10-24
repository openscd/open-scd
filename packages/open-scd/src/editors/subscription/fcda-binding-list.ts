import {
  css,
  customElement,
  html,
  LitElement,
  property,
  PropertyValues,
  query,
  state,
  TemplateResult,
} from 'lit-element';
import { nothing, SVGTemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { translate } from 'lit-translate';

import '@material/mwc-icon';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-menu';

import { Icon } from '@material/mwc-icon';
import { List } from '@material/mwc-list';
import { Menu } from '@material/mwc-menu';

import {
  getDescriptionAttribute,
  getNameAttribute,
  identity,
  newWizardEvent,
} from '../../foundation.js';
import { gooseIcon, smvIcon } from '../../icons/icons.js';
import { wizards } from '../../wizards/wizard-library.js';

import {
  getFcdaSubtitleValue,
  getFcdaTitleValue,
  newFcdaSelectEvent,
  styles,
  SubscriptionChangedEvent,
} from './foundation.js';
import { getSubscribedExtRefElements } from './later-binding/foundation.js';

type controlTag = 'SampledValueControl' | 'GSEControl';

type iconLookup = Record<controlTag, SVGTemplateResult>;

/**
 * A sub element for showing all Goose/Sampled Value Controls.
 * A control can be edited using the standard wizard.
 * And when selecting a FCDA Element a custom event is fired, so other list can be updated.
 */
@customElement('fcda-binding-list')
export class FcdaBindingList extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;
  @property()
  controlTag!: controlTag;
  @property()
  includeLaterBinding!: boolean;

  // The selected Elements when a FCDA Line is clicked.
  @state()
  private selectedControlElement: Element | undefined;
  @state()
  private selectedFcdaElement: Element | undefined;
  @state()
  private extRefCounters = new Map();

  @property({
    type: Boolean,
    hasChanged() {
      return false;
    },
  })
  get hideSubscribed(): boolean {
    return (
      localStorage.getItem(
        `fcda-binding-list-${
          this.includeLaterBinding ? 'later-binding' : 'data-binding'
        }-${this.controlTag}$hideSubscribed`
      ) === 'true' ?? false
    );
  }

  set hideSubscribed(value: boolean) {
    const oldValue = this.hideSubscribed;
    localStorage.setItem(
      `fcda-binding-list-${
        this.includeLaterBinding ? 'later-binding' : 'data-binding'
      }-${this.controlTag}$hideSubscribed`,
      `${value}`
    );
    this.requestUpdate('hideSubscribed', oldValue);
  }

  @property({
    type: Boolean,
    hasChanged() {
      return false;
    },
  })
  get hideNotSubscribed(): boolean {
    return (
      localStorage.getItem(
        `fcda-binding-list-${
          this.includeLaterBinding ? 'later-binding' : 'data-binding'
        }-${this.controlTag}$hideNotSubscribed`
      ) === 'true' ?? false
    );
  }

  set hideNotSubscribed(value: boolean) {
    const oldValue = this.hideNotSubscribed;
    localStorage.setItem(
      `fcda-binding-list-${
        this.includeLaterBinding ? 'later-binding' : 'data-binding'
      }-${this.controlTag}$hideNotSubscribed`,
      `${value}`
    );
    this.requestUpdate('hideNotSubscribed', oldValue);
  }

  @query('.actions-menu') actionsMenu!: Menu;
  @query('.actions-menu-icon') actionsMenuIcon!: Icon;
  @query('.control-block-list') controlBlockList!: List;

  private iconControlLookup: iconLookup = {
    SampledValueControl: smvIcon,
    GSEControl: gooseIcon,
  };

  constructor() {
    super();

    this.resetSelection = this.resetSelection.bind(this);
    parent.addEventListener('open-doc', this.resetSelection);

    const parentDiv = this.closest('.container');
    if (parentDiv) {
      this.resetExtRefCount = this.resetExtRefCount.bind(this);
      parentDiv.addEventListener('subscription-changed', this.resetExtRefCount);
    }
  }

  private getControlElements(): Element[] {
    if (this.doc) {
      return Array.from(this.doc.querySelectorAll(`LN0 > ${this.controlTag}`));
    }
    return [];
  }

  private getFcdaElements(controlElement: Element): Element[] {
    const lnElement = controlElement.parentElement;
    if (lnElement) {
      return Array.from(
        lnElement.querySelectorAll(
          `:scope > DataSet[name=${controlElement.getAttribute(
            'datSet'
          )}] > FCDA`
        )
      );
    }
    return [];
  }

  private resetExtRefCount(event: SubscriptionChangedEvent): void {
    if (event.detail.control && event.detail.fcda) {
      const controlBlockFcdaId = `${identity(event.detail.control)} ${identity(
        event.detail.fcda
      )}`;
      this.extRefCounters.delete(controlBlockFcdaId);
    }
  }

  private getExtRefCount(
    fcdaElement: Element,
    controlElement: Element
  ): number {
    const controlBlockFcdaId = `${identity(controlElement)} ${identity(
      fcdaElement
    )}`;
    if (!this.extRefCounters.has(controlBlockFcdaId)) {
      const extRefCount = getSubscribedExtRefElements(
        <Element>this.doc.getRootNode(),
        this.controlTag,
        fcdaElement,
        controlElement!,
        this.includeLaterBinding
      ).length;
      this.extRefCounters.set(controlBlockFcdaId, extRefCount);
    }
    return this.extRefCounters.get(controlBlockFcdaId);
  }

  private openEditWizard(controlElement: Element): void {
    const wizard = wizards[this.controlTag].edit(controlElement);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private resetSelection(): void {
    this.selectedControlElement = undefined;
    this.selectedFcdaElement = undefined;
  }

  private onFcdaSelect(controlElement: Element, fcdaElement: Element) {
    this.resetSelection();

    this.selectedControlElement = controlElement;
    this.selectedFcdaElement = fcdaElement;
  }

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);

    // When a new document is loaded or the selection is changed
    // we will fire the FCDA Select Event.
    if (
      _changedProperties.has('doc') ||
      _changedProperties.has('selectedControlElement') ||
      _changedProperties.has('selectedFcdaElement')
    ) {
      this.dispatchEvent(
        newFcdaSelectEvent(
          this.selectedControlElement,
          this.selectedFcdaElement
        )
      );
    }

    // When a new document is loaded we will reset the Map to clear old entries.
    if (_changedProperties.has('doc')) {
      this.extRefCounters = new Map();
    }
  }

  renderFCDA(controlElement: Element, fcdaElement: Element): TemplateResult {
    const fcdaCount = this.getExtRefCount(fcdaElement, controlElement);

    const filterClasses = {
      subitem: true,
      'show-subscribed': fcdaCount !== 0,
      'show-not-subscribed': fcdaCount === 0,
    };

    return html`<mwc-list-item
      graphic="large"
      ?hasMeta=${fcdaCount !== 0}
      twoline
      class="${classMap(filterClasses)}"
      @click=${() => this.onFcdaSelect(controlElement, fcdaElement)}
      value="${identity(controlElement)}
             ${identity(fcdaElement)}"
    >
      <span>${getFcdaTitleValue(fcdaElement)}</span>
      <span slot="secondary">${getFcdaSubtitleValue(fcdaElement)}</span>
      <mwc-icon slot="graphic">subdirectory_arrow_right</mwc-icon>
      ${fcdaCount !== 0 ? html`<span slot="meta">${fcdaCount}</span>` : nothing}
    </mwc-list-item>`;
  }

  updateBaseFilterState(): void {
    !this.hideSubscribed
      ? this.controlBlockList!.classList.add('show-subscribed')
      : this.controlBlockList!.classList.remove('show-subscribed');
    !this.hideNotSubscribed
      ? this.controlBlockList!.classList.add('show-not-subscribed')
      : this.controlBlockList!.classList.remove('show-not-subscribed');
  }

  protected firstUpdated(): void {
    this.actionsMenu.anchor = <HTMLElement>this.actionsMenuIcon;

    this.actionsMenu.addEventListener('closed', () => {
      this.hideSubscribed = !(<Set<number>>this.actionsMenu.index).has(0);
      this.hideNotSubscribed = !(<Set<number>>this.actionsMenu.index).has(1);
      this.updateBaseFilterState();
    });

    this.updateBaseFilterState();
  }

  renderTitle(): TemplateResult {
    const menuClasses = {
      'filter-off': this.hideSubscribed || this.hideNotSubscribed,
    };
    return html`<h1>
      ${translate(`subscription.${this.controlTag}.controlBlockList.title`)}
      <mwc-icon-button
        class="actions-menu-icon ${classMap(menuClasses)}"
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
          ?selected=${!this.hideSubscribed}
        >
          <span>${translate('subscription.subscriber.subscribed')}</span>
        </mwc-check-list-item>
        <mwc-check-list-item
          class="filter-not-subscribed"
          left
          ?selected=${!this.hideNotSubscribed}
        >
          <span>${translate('subscription.subscriber.notSubscribed')}</span>
        </mwc-check-list-item>
      </mwc-menu>
    </h1> `;
  }

  renderControls(controlElements: Element[]): TemplateResult {
    return html`<filtered-list class="control-block-list" activatable>
      ${controlElements
        .filter(controlElement => this.getFcdaElements(controlElement).length)
        .map(controlElement => {
          const fcdaElements = this.getFcdaElements(controlElement);
          const showSubscribed = fcdaElements.some(
            fcda => this.getExtRefCount(fcda, controlElement) !== 0
          );
          const showNotSubscribed = fcdaElements.some(
            fcda => this.getExtRefCount(fcda, controlElement) === 0
          );

          const filterClasses = {
            control: true,
            'show-subscribed': showSubscribed,
            'show-not-subscribed': showNotSubscribed,
          };

          return html`
            <mwc-list-item
              noninteractive
              class="${classMap(filterClasses)}"
              graphic="icon"
              twoline
              hasMeta
              value="${identity(controlElement)}${fcdaElements
                .map(
                  fcdaElement => `
                        ${getFcdaTitleValue(fcdaElement)}
                        ${getFcdaSubtitleValue(fcdaElement)}
                        ${identity(fcdaElement)}`
                )
                .join('')}"
            >
              <mwc-icon-button
                slot="meta"
                icon="edit"
                class="interactive"
                @click=${() => this.openEditWizard(controlElement)}
              ></mwc-icon-button>
              <span
                >${getNameAttribute(controlElement)}
                ${getDescriptionAttribute(controlElement)
                  ? html`${getDescriptionAttribute(controlElement)}`
                  : nothing}</span
              >
              <span slot="secondary">${identity(controlElement)}</span>
              <mwc-icon slot="graphic"
                >${this.iconControlLookup[this.controlTag]}</mwc-icon
              >
            </mwc-list-item>
            <li divider role="separator"></li>
            ${fcdaElements.map(fcdaElement =>
              this.renderFCDA(controlElement, fcdaElement)
            )}
          `;
        })}
    </filtered-list>`;
  }

  render(): TemplateResult {
    const controlElements = this.getControlElements();
    return html`<section tabindex="0">
      ${this.renderTitle()}
      ${controlElements
        ? this.renderControls(controlElements)
        : html`<h4>${translate('subscription.subscriber.notSubscribed')}</h4> `}
    </section>`;
  }

  static styles = css`
    ${styles}

    mwc-list-item.hidden[noninteractive] + li[divider] {
      display: none;
    }

    mwc-list-item {
      --mdc-list-item-meta-size: 48px;
    }

    section {
      position: relative;
    }

    .actions-menu-icon {
      float: right;
    }

    .actions-menu-icon.filter-off {
      color: var(--secondary);
      background-color: var(--mdc-theme-background);
    }

    /* Filtering rules for control blocks end up implementing logic to allow
    very fast CSS response. The following rules appear to be minimal but can be
    hard to understand intuitively for the multiple conditions. If modifying,
    it is suggested to create a truth-table to check for side-effects */

    /* remove all control blocks if no filters */
    filtered-list.control-block-list:not(.show-subscribed, .show-not-subscribed)
      mwc-list-item {
      display: none;
    }

    /* remove control blocks taking care to respect multiple conditions */
    filtered-list.control-block-list.show-not-subscribed:not(.show-subscribed)
      mwc-list-item.control.show-subscribed:not(.show-not-subscribed) {
      display: none;
    }

    filtered-list.control-block-list.show-subscribed:not(.show-not-subscribed)
      mwc-list-item.control.show-not-subscribed:not(.show-subscribed) {
      display: none;
    }

    /* remove fcdas if not part of filter */
    filtered-list.control-block-list:not(.show-not-subscribed)
      mwc-list-item.subitem.show-not-subscribed {
      display: none;
    }

    filtered-list.control-block-list:not(.show-subscribed)
      mwc-list-item.subitem.show-subscribed {
      display: none;
    }

    .interactive {
      pointer-events: all;
    }

    .subitem {
      padding-left: var(--mdc-list-side-padding, 16px);
    }
  `;
}
