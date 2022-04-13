import {
  css,
  customElement,
  html,
  LitElement,
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
import { Nsdoc } from '../../foundation/nsdoc.js';
import { wizards } from '../../wizards/wizard-library.js';
import { DaiValidationTypes, getCustomField } from './foundation/foundation.js';

/** [[`IED`]] plugin subeditor for editing `(B)DA` element. */
@customElement('da-container')
export class DAContainer extends LitElement {
  /**
   * The (B)DA itself.
   */
  @property({ attribute: false })
  element!: Element;

  /**
   * The optional DAI of this (B)DA.
   */
  @property({ attribute: false })
  instanceElement!: Element;

  @property({ attribute: false })
  daParent!: Element

  @property()
  ancestors: Element[] = [];

  @property()
  nsdoc!: Nsdoc;

  @query('#toggleButton')
  toggleButton: IconButtonToggle | undefined;

  private header(): TemplateResult {
    const name = getNameAttribute(this.element);
    const bType = this.element.getAttribute('bType') ?? nothing;
    const fc = this.element.getAttribute("fc");

    if (this.instanceElement) {
      return html`<b>${name}</b> &mdash; ${bType}${fc ? html` [${fc}]`: ``}`;
    } else {
      return html`${name} &mdash; ${bType}${fc ? html` [${fc}]`: ``}`;
    }
  }

  /**
   * Rendering an optional value of this (B)DA container.
   * If there is a DAI, it get's priority on top of (B)DA values.
   * @returns TemplateResult containing the value of the instance, element or nothing.
   */
  private getValue(): string | null | undefined {
    if (this.instanceElement) {
      return this.getValueElement(this.instanceElement)?.textContent?.trim()
    }

    return this.getValueElement(this.element)?.textContent?.trim();
  }

  /**
   * Get the 'Val' element of another element.
   * @param element - The element to search for an 'Val' element.
   * @returns the 'Val' element, or null if not found.
   */
  private getValueElement(element: Element): Element | null {
    return element.querySelector('Val') ?? null;
  }


  /**
   * Get the nested (B)DA element(s) if available.
   * @returns The nested (B)DA element(s) of this (B)DA container.
   */
  private getBDAElements(): Element[] {
    const type = this.element!.getAttribute('type') ?? undefined;
    const doType =  this.element!.closest('SCL')!.querySelector(`:root > DataTypeTemplates > DAType[id="${type}"]`);
    if (doType != null) {
      return Array.from(doType!.querySelectorAll(':scope > BDA'))
    }
    return [];
  }
  
  private openEditWizard(): void {
    const wizard = wizards['DAI'].edit(this.element, this.instanceElement);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  render(): TemplateResult {
    const bType = this.element!.getAttribute('bType');
    const value = this.getValue() ?? '';

    return html`<action-pane .label="${this.header()}" icon="${this.instanceElement != null ? 'done' : ''}">
      <abbr slot="action">
        <mwc-icon-button
          title=${this.nsdoc.getDataDescription(this.element, this.ancestors).label}
          icon="info"
        ></mwc-icon-button>
      </abbr>
      ${bType == 'Struct' ? html`<abbr slot="action" title="${translate('iededitor.toggleChildElements')}">
        <mwc-icon-button-toggle
          id="toggleButton"
          onIcon="keyboard_arrow_up"
          offIcon="keyboard_arrow_down"
          @click=${() => this.requestUpdate()}
        ></mwc-icon-button-toggle>
      </abbr>` : nothing}
      ${this.instanceElement && getCustomField()[<DaiValidationTypes>bType] ?
        html`<div style="display: flex; flex-direction: row;">
          <div id="value">
            <h4>${value}</h4>
          </div>
          <div style="display: flex; align-items: center;">
            <mwc-icon-button
              icon="edit"
              @click=${() => this.openEditWizard()}
            ></mwc-icon-button>
          </div>
        </div>` :
        html`<h4>${value}</h4>`}
      ${this.toggleButton?.on && bType == 'Struct' ? this.getBDAElements().map(element =>
        html`<da-container
          .element=${element}
          .nsdoc=${this.nsdoc}
          .daParent=${this.daParent ?? this.element}
          .ancestors=${[this.element, ...this.ancestors]}
        ></da-container>`) : nothing}
    </action-pane>
    `;
  }

  static styles = css`
    h4 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      padding-left: 0.3em;
    }

    #value {
      flex: auto;
      align-items: center;
      display: flex;
    }

    mwc-icon-button {
      color: var(--mdc-theme-on-surface);
    }
  `;
}
