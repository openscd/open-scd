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

import '../../action-pane.js';
import { getNameAttribute } from '../../foundation.js';

/** [[`IED`]] plugin subeditor for editing `(B)DA` element. */
@customElement('da-container')
export class DAContainer extends LitElement {
  /**
   * The DA itself.
   */
  @property({ attribute: false })
  element!: Element;

  /**
   * The optional DAI of this (B)DA.
   */
  @property({ attribute: false })
  instanceElement!: Element;
  
  @query('#toggleButton') toggleButton!: HTMLElement;

  private header(): TemplateResult {
    const name = getNameAttribute(this.element);
    const bType = this.element!.getAttribute('bType') ?? nothing;

    if (this.instanceElement) {
      return html`<b>${name}</b> &mdash; ${bType}`;
    } else {
      return html`${name} &mdash; ${bType}`;
    }
  }

  /**
   * Rendering an optional value of this (B)DA container.
   * If there is a DAI, it get's priority on top of (B)DA values.
   * @returns TemplateResult containing the value of the instance, element or nothing.
   */
  private renderValue(): TemplateResult {
    if (this.instanceElement) {
      return html`${this.getValueElement(this.instanceElement)?.textContent}`
    }

    return html`${this.getValueElement(this.element)?.textContent}`;
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

  private toggle(): void {
    this.toggleButton.setAttribute('icon',
      this.toggleButton.getAttribute('icon') == 'keyboard_arrow_down' ? 'keyboard_arrow_up' : 'keyboard_arrow_down');

    this.shadowRoot!.querySelectorAll(':scope > action-pane > da-container').forEach(element => {
      element.hasAttribute('hidden') ? element.removeAttribute('hidden') : element.setAttribute('hidden', '');
    })
  }

  render(): TemplateResult {
    const bType = this.element!.getAttribute('bType');

    return html`<action-pane .label="${this.header()}" icon="${this.instanceElement != null ? 'done' : ''}">
      ${bType == 'Struct' ? html`<abbr slot="action" title="${translate('iededitor.toggleChildElements')}">
        <mwc-icon-button
          id="toggleButton"
          icon="keyboard_arrow_down"
          @click=${() => this.toggle()}
        ></mwc-icon-button>
      </abbr>` : nothing}
      <h6>${this.renderValue()}</h6>
      ${bType == 'Struct' ? this.getBDAElements().map(element =>
        html`<da-container
          .element=${element}
          hidden>
        </da-container>`) : nothing}
    </action-pane>
    `;
  }

  static styles = css`
    h6 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 0.8em;
      overflow: visible;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      padding-left: 0.3em;
    }
  `;
}