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
import { createDaInfoWizard } from "./da-wizard.js";
import { getValueElement } from './foundation.js';

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
  private renderValue(): TemplateResult {
    if (this.instanceElement) {
      return html`${getValueElement(this.instanceElement)?.textContent}`
    }

    return html`${getValueElement(this.element)?.textContent}`;
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

  render(): TemplateResult {
    const bType = this.element!.getAttribute('bType');

    return html`<action-pane .label="${this.header()}" icon="${this.instanceElement != null ? 'done' : ''}">
      <abbr slot="action">
        <mwc-icon-button
          title=${this.nsdoc.getDataDescription(this.element, this.ancestors).label}
          icon="info"
          @click=${() => this.dispatchEvent(newWizardEvent(
            createDaInfoWizard(this.element, this.instanceElement, this.ancestors, this.nsdoc)))}
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
      <h6>${this.renderValue()}</h6>
      ${this.toggleButton?.on && bType == 'Struct' ? this.getBDAElements().map(element =>
        html`<da-container
          .element=${element}
          .nsdoc=${this.nsdoc}
          .ancestors=${[this.element, ...this.ancestors]}
        ></da-container>`) : nothing}
    </action-pane>
    `;
  }

  static styles = css`
    h6 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 500;
      font-size: 0.8em;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      padding-left: 0.3em;
    }
  `;
}
