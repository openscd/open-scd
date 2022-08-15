import {
  css,
  customElement,
  html,
  LitElement,
  property,
  PropertyValues,
  state,
  TemplateResult,
} from 'lit-element';
import { nothing } from 'lit-html';
import { translate } from 'lit-translate';

import '@material/mwc-icon';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';

import {
  compareNames,
  getDescriptionAttribute,
  getNameAttribute,
  identity,
  newWizardEvent,
} from '../../../foundation.js';
import { smvIcon } from '../../../icons/icons.js';
import { wizards } from '../../../wizards/wizard-library.js';

import { styles } from '../foundation.js';

import { getFcdaTitleValue, newFcdaSelectEvent } from './foundation.js';

/**
 * A sub element for showing all Sampled Value Controls.
 * A Sample Value Control can be edited using the standard wizard.
 * And when selecting a FCDA Element a custom event is fired, so other list can be updated.
 */
@customElement('svc-later-binding-list')
export class SVCLaterBindingList extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  // The selected Elements when a FCDA Line is clicked.
  @state()
  selectedSvcElement: Element | undefined;
  @state()
  selectedFcdaElement: Element | undefined;

  constructor() {
    super();

    this.resetSelection = this.resetSelection.bind(this);
    window.addEventListener('open-doc', this.resetSelection);
  }

  private getSvcElements(): Element[] {
    if (this.doc) {
      return Array.from(
        this.doc.querySelectorAll('LN0 > SampledValueControl')
      ).sort((a, b) => compareNames(`${identity(a)}`, `${identity(b)}`));
    }
    return [];
  }

  private getFcdaElements(svcElement: Element): Element[] {
    const lnElement = svcElement.parentElement;
    if (lnElement) {
      return Array.from(
        lnElement.querySelectorAll(
          `:scope > DataSet[name=${svcElement.getAttribute('datSet')}] > FCDA`
        )
      ).sort((a, b) => compareNames(`${identity(a)}`, `${identity(b)}`));
    }
    return [];
  }

  private openEditWizard(svcElement: Element): void {
    const wizard = wizards['SampledValueControl'].edit(svcElement);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  private resetSelection(): void {
    this.selectedSvcElement = undefined;
    this.selectedFcdaElement = undefined;
  }

  private onFcdaSelect(svcElement: Element, fcdaElement: Element) {
    this.resetSelection();

    this.selectedSvcElement = svcElement;
    this.selectedFcdaElement = fcdaElement;
  }

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);

    // When the document is updated, we will fire the event again.
    if (
      _changedProperties.has('doc') ||
      _changedProperties.has('selectedSvcElement') ||
      _changedProperties.has('selectedFcdaElement')
    ) {
      this.dispatchEvent(
        newFcdaSelectEvent(this.selectedSvcElement, this.selectedFcdaElement)
      );
    }
  }

  renderFCDA(svcElement: Element, fcdaElement: Element): TemplateResult {
    return html`<mwc-list-item
      graphic="large"
      twoline
      class="subitem"
      @click=${() => this.onFcdaSelect(svcElement, fcdaElement)}
      value="${identity(svcElement)} ${identity(fcdaElement)}"
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
    </mwc-list-item>`;
  }

  render(): TemplateResult {
    const svcElements = this.getSvcElements();
    return html` <section tabindex="0">
      ${svcElements.length > 0
        ? html`<h1>
              ${translate('subscription.smvLaterBinding.svcList.title')}
            </h1>
            <filtered-list>
              ${svcElements.map(svcElement => {
                const fcdaElements = this.getFcdaElements(svcElement);
                return html`
                  <mwc-list-item
                    noninteractive
                    graphic="icon"
                    twoline
                    hasMeta
                    value="${identity(svcElement)} ${fcdaElements
                      .map(fcdaElement => identity(fcdaElement) as string)
                      .join(' ')}"
                  >
                    <mwc-icon-button
                      slot="meta"
                      icon="edit"
                      class="interactive"
                      @click=${() => this.openEditWizard(svcElement)}
                    ></mwc-icon-button>
                    <span
                      >${getNameAttribute(svcElement)}
                      ${getDescriptionAttribute(svcElement)
                        ? html`${getDescriptionAttribute(svcElement)}`
                        : nothing}</span
                    >
                    <span slot="secondary">${identity(svcElement)}</span>
                    <mwc-icon slot="graphic">${smvIcon}</mwc-icon>
                  </mwc-list-item>
                  <li divider role="separator"></li>
                  ${fcdaElements.map(fcdaElement =>
                    this.renderFCDA(svcElement, fcdaElement)
                  )}
                `;
              })}
            </filtered-list>`
        : html`<h1>
            ${translate('subscription.smvLaterBinding.svcList.noSvcFound')}
          </h1>`}
    </section>`;
  }

  static styles = css`
    ${styles}

    mwc-list-item.hidden[noninteractive] + li[divider] {
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
