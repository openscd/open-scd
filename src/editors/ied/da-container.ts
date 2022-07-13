import {
  css,
  customElement,
  html,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { nothing } from 'lit-html';
import { translate } from 'lit-translate';

import '@material/mwc-icon-button-toggle';
import { IconButtonToggle } from '@material/mwc-icon-button-toggle';

import '../../action-pane.js';
import { getNameAttribute, newWizardEvent } from '../../foundation.js';
import { wizards } from '../../wizards/wizard-library.js';
import { DaiValidationTypes, getCustomField } from './foundation/foundation.js';
import { createDaInfoWizard } from './da-wizard.js';
import {
  Container,
  getInstanceDAElement,
  getValueElement,
} from './foundation.js';
import { createDAIWizard } from '../../wizards/dai.js';
import {
  determineUninitializedStructure,
  initializeElements,
} from '../../foundation/dai.js';

/** [[`IED`]] plugin subeditor for editing `(B)DA` element. */
@customElement('da-container')
export class DAContainer extends Container {
  /**
   * The optional DAI of this (B)DA.
   */
  @property({ attribute: false })
  instanceElement!: Element;

  @query('#toggleButton')
  toggleButton: IconButtonToggle | undefined;

  private header(): TemplateResult {
    const name = getNameAttribute(this.element);
    const bType = this.element.getAttribute('bType') ?? nothing;
    const fc = this.element.getAttribute('fc');

    if (this.instanceElement) {
      return html`<b>${name}</b> &mdash; ${bType}${fc ? html` [${fc}]` : ``}`;
    } else {
      return html`${name} &mdash; ${bType}${fc ? html` [${fc}]` : ``}`;
    }
  }

  /**
   * Rendering an optional value of this (B)DA container.
   * If there is a DAI, it gets priority on top of (B)DA values.
   * @returns TemplateResult containing the value of the instance, element or nothing.
   */
  private getValue(): TemplateResult {
    if (this.instanceElement) {
      return html`<b
        >${getValueElement(this.instanceElement)?.textContent?.trim() ?? ''}</b
      >`;
    }

    return html`${getValueElement(this.element)?.textContent?.trim() ?? ''}`;
  }

  /**
   * Get the nested (B)DA element(s) if available.
   * @returns The nested (B)DA element(s) of this (B)DA container.
   */
  private getBDAElements(): Element[] {
    const type = this.element!.getAttribute('type') ?? undefined;
    const doType = this.element!.closest('SCL')!.querySelector(
      `:root > DataTypeTemplates > DAType[id="${type}"]`
    );
    if (doType != null) {
      return Array.from(doType!.querySelectorAll(':scope > BDA'));
    }
    return [];
  }

  /**
   * Use the list of ancestor to retrieve the list from DO to the current (B)DA Element.
   * This structure is used to create the initialized structure from (DOI/SDI/DAI).
   *
   * @returns The list from the DO Element to the current (B)DA Element.
   */
  private getTemplateStructure(): Element[] {
    // Search for the DO Element, this will be the starting point.
    const doElement = this.ancestors.filter(
      element => element.tagName == 'DO'
    )[0];
    // From the DO Element and below we need all the elements (BDA, SDO, DA)
    const dataStructure = this.ancestors.slice(
      this.ancestors.indexOf(doElement)
    );
    // Add the current DA Element also to the list.
    dataStructure.push(this.element);
    return dataStructure;
  }

  private openCreateWizard(): void {
    // Search the LN(0) Element to start creating the initialized structure.
    const lnElement = this.ancestors.filter(element =>
      ['LN0', 'LN'].includes(element.tagName)
    )[0];
    const templateStructure = this.getTemplateStructure();
    // First determine where to start creating new elements (DOI/SDI/DOI)
    const [parentElement, uninitializedTemplateStructure] =
      determineUninitializedStructure(lnElement, templateStructure);
    // Next create all missing elements (DOI/SDI/DOI)
    const newElement = initializeElements(uninitializedTemplateStructure);

    if (newElement) {
      const wizard = createDAIWizard(parentElement, newElement, this.element);
      if (wizard) this.dispatchEvent(newWizardEvent(wizard));
    }
  }

  private openEditWizard(): void {
    const wizard = wizards['DAI'].edit(this.element, this.instanceElement);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  render(): TemplateResult {
    const bType = this.element!.getAttribute('bType');

    return html`
      <action-pane
        .label="${this.header()}"
        icon="${this.instanceElement != null ? 'done' : ''}"
      >
        <abbr slot="action">
          <mwc-icon-button
            title=${this.nsdoc.getDataDescription(this.element, this.ancestors)
              .label}
            icon="info"
            @click=${() =>
              this.dispatchEvent(
                newWizardEvent(
                  createDaInfoWizard(
                    this.element,
                    this.instanceElement,
                    this.ancestors,
                    this.nsdoc
                  )
                )
              )}
          ></mwc-icon-button>
        </abbr>
        ${bType === 'Struct'
          ? html` <abbr
              slot="action"
              title="${translate('iededitor.toggleChildElements')}"
            >
              <mwc-icon-button-toggle
                id="toggleButton"
                onIcon="keyboard_arrow_up"
                offIcon="keyboard_arrow_down"
                @click=${() => this.requestUpdate()}
              >
              </mwc-icon-button-toggle>
            </abbr>`
          : html` <div style="display: flex; flex-direction: row;">
              <div style="display: flex; align-items: center; flex: auto;">
                <h4>${this.getValue()}</h4>
              </div>
              <div style="display: flex; align-items: center;">
                ${this.instanceElement
                  ? html`<mwc-icon-button
                      icon="edit"
                      .disabled="${!getCustomField()[
                        <DaiValidationTypes>bType
                      ]}"
                      @click=${() => this.openEditWizard()}
                    >
                    </mwc-icon-button>`
                  : html`<mwc-icon-button
                      icon="add"
                      .disabled="${!getCustomField()[
                        <DaiValidationTypes>bType
                      ]}"
                      @click=${() => this.openCreateWizard()}
                    >
                    </mwc-icon-button>`}
              </div>
            </div>`}
        ${this.toggleButton?.on && bType === 'Struct'
          ? this.getBDAElements().map(
              bdaElement =>
                html`<da-container
                  .doc=${this.doc}
                  .element=${bdaElement}
                  .instanceElement=${getInstanceDAElement(
                    this.instanceElement,
                    bdaElement
                  )}
                  .nsdoc=${this.nsdoc}
                  .ancestors=${[...this.ancestors, this.element]}
                >
                </da-container>`
            )
          : nothing}
      </action-pane>
    `;
  }

  static styles = css`
    h4 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      margin: 0px;
      padding-left: 0.3em;
      word-break: break-word; 
      white-space: pre-wrap;
    }

    mwc-icon-button {
      color: var(--mdc-theme-on-surface);
    }
  `;
}
