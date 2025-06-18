import {
  css,
  customElement,
  html,
  property,
  query,
  TemplateResult,
} from 'lit-element';
import { get } from 'lit-translate';
import { nothing } from 'lit-html';

import { IconButtonToggle } from '@material/mwc-icon-button-toggle';

import '@material/mwc-icon';
import '@material/mwc-icon-button-toggle';

import {
  getDescriptionAttribute,
  getNameAttribute,
} from '@openscd/open-scd/src/foundation.js';

import '@openscd/open-scd/src/action-pane.js';

import { getFullPath } from './foundation/foundation.js';

import './doi-container.js';
import { PROTOCOL_104_PRIVATE } from './foundation/private.js';
import { Base104Container } from './base-container.js';

/**
 * Container showing all the DOI Elements, related to the 104 Protocol, of the passed IED Element in a container.
 */
@customElement('ied-104-container')
export class Ied104Container extends Base104Container {
  @property()
  element!: Element;

  @query('#toggleButton')
  toggleButton!: IconButtonToggle | undefined;

  @property()
  get doiElements(): Element[] {
    return Array.from(this.element.querySelectorAll(`DOI`))
      .filter(
        doiElement =>
          doiElement.querySelector(
            `DAI > Private[type="${PROTOCOL_104_PRIVATE}"] > Address`
          ) !== null
      )
      .sort((doi1, doi2) =>
        getFullPath(doi1, 'IED').localeCompare(getFullPath(doi2, 'IED'))
      );
  }

  protected firstUpdated(): void {
    this.requestUpdate();
  }

  @property()
  get header(): TemplateResult {
    const name = getNameAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);

    return html`${name}${desc ? html` &mdash; ${desc}` : nothing}`;
  }

  private renderDoiList(): TemplateResult {
    const dois = this.doiElements;
    return html`${dois.map(doiElement => {
      return html`
        <doi-104-container
          .editCount=${this.editCount}
          .doc="${this.doc}"
          .element="${doiElement}"
        >
        </doi-104-container>
      `;
    })}`;
  }

  render(): TemplateResult {
    return html`
      <action-pane .label="${this.header}">
        <mwc-icon slot="icon">developer_board</mwc-icon>
        <abbr slot="action" title="${get('protocol104.toggleChildElements')}">
          <mwc-icon-button-toggle
            id="toggleButton"
            on
            onIcon="keyboard_arrow_up"
            offIcon="keyboard_arrow_down"
            @click=${() => this.requestUpdate()}
          >
          </mwc-icon-button-toggle>
        </abbr>
        ${this.toggleButton?.on ? html`${this.renderDoiList()}` : nothing}
      </action-pane>
    `;
  }

  static styles = css`
    abbr {
      text-decoration: none;
      border-bottom: none;
    }
  `;
}
