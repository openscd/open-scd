import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-icon';
import '@material/mwc-list/mwc-list-item';

import '../../../filtered-list.js';
import { compareNames, getNameAttribute } from '../../../foundation.js';
import { newGOOSESelectEvent, styles } from '../foundation.js';
import { gooseIcon } from '../../../icons/icons.js';

let selectedGooseMsg: Element | undefined;
let selectedDataSet: Element | undefined | null;

function onOpenDocResetSelectedGooseMsg() {
  selectedGooseMsg = undefined;
  selectedDataSet = undefined;
}
addEventListener('open-doc', onOpenDocResetSelectedGooseMsg);

/** An sub element for showing all published GOOSE messages per IED. */
@customElement('publisher-goose-list')
export class PublisherGOOSEList extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  private get ieds(): Element[] {
    return this.doc
      ? Array.from(this.doc.querySelectorAll(':root > IED')).sort((a, b) =>
          compareNames(a, b)
        )
      : [];
  }

  /**
   * Get all the published GOOSE messages.
   * @param ied - The IED to search through.
   * @returns All the published GOOSE messages of this specific IED.
   */
  private getGSEControls(ied: Element): Element[] {
    return Array.from(
      ied.querySelectorAll(
        ':scope > AccessPoint > Server > LDevice > LN0 > GSEControl'
      )
    );
  }

  private onGooseSelect(element: Element): void {
    const ln = element.parentElement;
    const dataset = ln?.querySelector(
      `DataSet[name=${element.getAttribute('datSet')}]`
    );

    selectedGooseMsg = element;
    selectedDataSet = dataset;

    this.dispatchEvent(
      newGOOSESelectEvent(
        selectedGooseMsg,
        selectedDataSet!
      )
    );
  }

  renderGoose(element: Element): TemplateResult {
    return html`<mwc-list-item
      @click=${() => this.onGooseSelect(element)}
      graphic="large"
    >
      <span>${element.getAttribute('name')}</span>
      <mwc-icon slot="graphic">${gooseIcon}</mwc-icon>
    </mwc-list-item>`;
  }

  protected firstUpdated(): void {
    this.dispatchEvent(
      newGOOSESelectEvent(
        selectedGooseMsg,
        selectedDataSet ?? undefined
      )
    );
  }

  render(): TemplateResult {
    return html` <section tabindex="0">
      <h1>${translate('subscription.publisherGoose.title')}</h1>
      <filtered-list>
        ${this.ieds.map(
          ied =>
            html`
              <mwc-list-item noninteractive graphic="icon">
                <span>${getNameAttribute(ied)}</span>
                <mwc-icon slot="graphic">developer_board</mwc-icon>
              </mwc-list-item>
              <li divider role="separator"></li>
              ${this.getGSEControls(ied).map(control =>
                this.renderGoose(control)
              )}
            `
        )}
      </filtered-list>
    </section>`;
  }

  static styles = css`
    ${styles}
  `;
}
