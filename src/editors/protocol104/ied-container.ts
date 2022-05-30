import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  TemplateResult
} from "lit-element";
import { translate } from "lit-translate";
import { nothing } from "lit-html";

import { IconButtonToggle } from "@material/mwc-icon-button-toggle";

import '@material/mwc-icon';
import '@material/mwc-icon-button-toggle';

import { getDescriptionAttribute, getNameAttribute } from "../../foundation.js";

import '../../action-pane.js';

import {
  getFullPath,
  PRIVATE_TYPE_104
} from "./foundation/foundation.js";

import './doi-container.js';

/**
 * Container showing all the DOI Elements, related to the 104 Protocol, of the passed IED Element in a container.
 */
@customElement('ied-104-container')
export class Ied104Container extends LitElement {
  @property()
  element!: Element;

  @query('#toggleButton')
  toggleButton!: IconButtonToggle | undefined;

  private getDoiElements(): Element[] {
    return Array.from(this.element.querySelectorAll(`DOI`))
      .filter(doiElement => doiElement.querySelector(`DAI > Private[type="${PRIVATE_TYPE_104}"]`) !== null)
      .sort((doi1, doi2) => getFullPath(doi1, 'IED').localeCompare(getFullPath(doi2, 'IED')) );
  }

  protected firstUpdated(): void {
    this.requestUpdate();
  }

  private header(): TemplateResult {
    const name = getNameAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);

    return html`${name}${desc ? html` &mdash; ${desc}` : nothing}`;
  }

  private renderDoiList(): TemplateResult {
    const dois = this.getDoiElements();
    return html `${dois.map(doiElement => {
        return html`
          <doi-104-container .element="${doiElement}"></doi-104-container>
        `;
    })}`;
  }

  render(): TemplateResult {
    return html`
      <action-pane .label="${this.header()}">
        <mwc-icon slot="icon">developer_board</mwc-icon>
        <abbr slot="action" title="${translate('protocol104.toggleChildElements')}">
          <mwc-icon-button-toggle
            id="toggleButton"
            on
            onIcon="keyboard_arrow_up"
            offIcon="keyboard_arrow_down"
            @click=${() => this.requestUpdate()}>
          </mwc-icon-button-toggle>
        </abbr>
        ${this.toggleButton?.on
          ? html `${this.renderDoiList()}`
          : nothing}
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
