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
import { translate } from 'lit-translate';

import '@material/mwc-icon';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';
import { ListItem } from '@material/mwc-list/mwc-list-item.js';

import {
  compareNames,
  getDescriptionAttribute,
  getNameAttribute,
  identity,
  newWizardEvent,
} from '../../../foundation.js';
import { gooseIcon, smvIcon } from '../../../icons/icons.js';
import { wizards } from '../../../wizards/wizard-library.js';

import { styles } from '../foundation.js';

import {
  getFcdaTitleValue,
  getSubscribedExtRefElements,
  newFcdaSelectEvent,
} from './foundation.js';

type controlTag = 'SampledValueControl' | 'GSEControl';

type iconLookup = Record<controlTag, SVGTemplateResult>;

/**
 * A sub element for showing all Goose/Sampled Value Controls.
 * A control can be edited using the standard wizard.
 * And when selecting a FCDA Element a custom event is fired, so other list can be updated.
 */
@customElement('fcda-later-binding-list')
export class FCDALaterBindingList extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;
  @property()
  controlTag!: controlTag;

  // The selected Elements when a FCDA Line is clicked.
  @state()
  selectedControlElement: Element | undefined;
  @state()
  selectedFcdaElement: Element | undefined;
  @state()
  extRefCounters = new Map();

  @property({ attribute: false })
  iconControlLookup: iconLookup;

  @query('.subitem[selected]')
  selectedItem!: ListItem;

  constructor() {
    super();

    this.iconControlLookup = {
      SampledValueControl: smvIcon,
      GSEControl: gooseIcon,
    };

    this.resetSelection = this.resetSelection.bind(this);
    parent.addEventListener('open-doc', this.resetSelection);

    this.resetExtRefCount = this.resetExtRefCount.bind(this);
    parent.addEventListener('lb-subscription-change', this.resetExtRefCount);
  }

  private getControlElements(): Element[] {
    if (this.doc) {
      return Array.from(
        this.doc.querySelectorAll(`LN0 > ${this.controlTag}`)
      ).sort((a, b) => compareNames(`${identity(a)}`, `${identity(b)}`));
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
      ).sort((a, b) => compareNames(`${identity(a)}`, `${identity(b)}`));
    }
    return [];
  }

  private resetExtRefCount(): void {
    if (this.selectedFcdaElement) {
      const controlBlockFcdaId = `${identity(this.selectedControlElement!)} ${identity(this.selectedFcdaElement)}`;
      this.extRefCounters.delete(controlBlockFcdaId);
    }
  }

  private getExtRefCount(fcdaElement: Element, controlElement: Element): number {
    const controlBlockFcdaId = `${identity(controlElement)} ${identity(fcdaElement)}`;
    if (!this.extRefCounters.has(controlBlockFcdaId)) {
      const currentIedElement = fcdaElement.closest('IED');
      const extRefCount = getSubscribedExtRefElements(
        this.doc,
        currentIedElement!,
        fcdaElement,
        controlElement!,
        this.controlTag
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

    // When the document is updated, we will fire the event again.
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
  }

  renderFCDA(controlElement: Element, fcdaElement: Element): TemplateResult {
    const fcdaCount = this.getExtRefCount(fcdaElement, controlElement);
    return html`<mwc-list-item
      graphic="large"
      ?hasMeta=${fcdaCount !== 0}
      twoline
      class="subitem"
      @click=${() => this.onFcdaSelect(controlElement, fcdaElement)}
      value="${identity(controlElement)} ${identity(fcdaElement)}"
    >
      <span>${getFcdaTitleValue(fcdaElement)}</span>
      <span slot="secondary">
        ${fcdaElement.getAttribute('ldInst')}${fcdaElement.hasAttribute(
          'ldInst'
        ) && fcdaElement.hasAttribute('prefix')
          ? html`/`
          : nothing}${fcdaElement.getAttribute('prefix')}
        ${fcdaElement.getAttribute('lnClass')}
        ${fcdaElement.getAttribute('lnInst')}
      </span>
      <mwc-icon slot="graphic">subdirectory_arrow_right</mwc-icon>
      ${fcdaCount !== 0 ? html`<span slot="meta">${fcdaCount}</span>` : nothing}
    </mwc-list-item>`;
  }

  render(): TemplateResult {
    const controlElements = this.getControlElements();
    return html` <section tabindex="0">
      ${controlElements.length > 0
        ? html`<h1>
              ${translate(
                `subscription.laterBinding.${this.controlTag}.controlBlockList.title`
              )}
            </h1>
            <filtered-list activatable>
              ${controlElements.map(controlElement => {
                const fcdaElements = this.getFcdaElements(controlElement);
                return html`
                  <mwc-list-item
                    noninteractive
                    graphic="icon"
                    twoline
                    hasMeta
                    value="${identity(controlElement)} ${fcdaElements
                      .map(fcdaElement => identity(fcdaElement) as string)
                      .join(' ')}"
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
            </filtered-list>`
        : html`<h1>
            ${translate(
              `subscription.laterBinding.${this.controlTag}.controlBlockList.noControlBlockFound`
            )}
          </h1>`}
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

    .interactive {
      pointer-events: all;
    }

    .subitem {
      padding-left: var(--mdc-list-side-padding, 16px);
    }
  `;
}
