import {
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
import './da-container.js';

import {
  getDescriptionAttribute,
  getNameAttribute,
  newWizardEvent,
} from '../../foundation.js';
import { createDoInfoWizard } from './do-wizard.js';
import {
  Container,
  findDOTypeElement,
  getInstanceDAElement,
} from './foundation.js';

/** [[`IED`]] plugin subeditor for editing `DO` element. */
@customElement('do-container')
export class DOContainer extends Container {
  /**
   * The optional DOI of this DO.
   */
  @property({ attribute: false })
  instanceElement!: Element;

  @query('#toggleButton') toggleButton: IconButtonToggle | undefined;

  private header(): TemplateResult {
    const name = getNameAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);

    if (this.instanceElement != null) {
      return html`<b>${name}${desc ? html` &mdash; ${desc}` : nothing}</b>`;
    } else {
      return html`${name}${desc ? html` &mdash; ${desc}` : nothing}`;
    }
  }

  /**
   * Get the nested SDO element(s).
   * @returns The nested SDO element(s) of this DO container.
   */
  private getDOElements(): Element[] {
    const doType = findDOTypeElement(this.element);
    if (doType != null) {
      return Array.from(doType.querySelectorAll(':scope > SDO'));
    }
    return [];
  }

  /**
   * Get the nested (B)DA element(s).
   * @returns The nested (B)DA element(s) of this DO container.
   */
  private getDAElements(): Element[] {
    const type = this.element.getAttribute('type') ?? undefined;
    const doType = this.element
      .closest('SCL')!
      .querySelector(`:root > DataTypeTemplates > DOType[id="${type}"]`);
    if (doType != null) {
      return Array.from(doType!.querySelectorAll(':scope > DA'));
    }
    return [];
  }

  /**
   * Get the instance element (SDI) of a (S)DO element (if available)
   * @param dO - The (S)DO object to search with.
   * @returns The optional SDI element.
   */
  private getInstanceDOElement(dO: Element): Element | null {
    const sdoName = getNameAttribute(dO);
    if (this.instanceElement) {
      return this.instanceElement.querySelector(
        `:scope > SDI[name="${sdoName}"]`
      );
    }
    return null;
  }

  render(): TemplateResult {
    const daElements = this.getDAElements();
    const doElements = this.getDOElements();

    return html`<action-pane
      .label="${this.header()}"
      icon="${this.instanceElement != null ? 'done' : ''}"
    >
      <abbr slot="action">
        <mwc-icon-button
          title=${this.nsdoc.getDataDescription(this.element).label}
          icon="info"
          @click=${() =>
            this.dispatchEvent(
              newWizardEvent(
                createDoInfoWizard(
                  this.element,
                  this.instanceElement,
                  this.ancestors,
                  this.nsdoc
                )
              )
            )}
        ></mwc-icon-button>
      </abbr>
      ${daElements.length > 0 || doElements.length > 0
        ? html`<abbr
            slot="action"
            title="${translate('iededitor.toggleChildElements')}"
          >
            <mwc-icon-button-toggle
              id="toggleButton"
              onIcon="keyboard_arrow_up"
              offIcon="keyboard_arrow_down"
              @click=${() => this.requestUpdate()}
            ></mwc-icon-button-toggle>
          </abbr>`
        : nothing}
      ${this.toggleButton?.on
        ? daElements.map(
            daElement =>
              html`<da-container
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${daElement}
                .instanceElement=${getInstanceDAElement(
                  this.instanceElement,
                  daElement
                )}
                .nsdoc=${this.nsdoc}
                .ancestors=${[...this.ancestors, this.element]}
              ></da-container>`
          )
        : nothing}
      ${this.toggleButton?.on
        ? doElements.map(
            doElement =>
              html`<do-container
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${doElement}
                .instanceElement=${this.getInstanceDOElement(doElement)}
                .nsdoc=${this.nsdoc}
                .ancestors=${[...this.ancestors, this.element]}
              ></do-container>`
          )
        : nothing}
    </action-pane> `;
  }
}
