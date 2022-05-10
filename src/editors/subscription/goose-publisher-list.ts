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

import '../../filtered-list.js';
import { compareNames, getNameAttribute, newWizardEvent } from '../../foundation.js';
import { newGOOSESelectEvent, styles } from './foundation.js';
import { gooseIcon } from '../../icons/icons.js';
import { wizards } from '../../wizards/wizard-library.js';
import { classMap } from 'lit-html/directives/class-map';

let selectedGseControl: Element | undefined;
let selectedDataSet: Element | undefined | null;

function onOpenDocResetSelectedGooseMsg() {
  selectedGseControl = undefined;
  selectedDataSet = undefined;
}
addEventListener('open-doc', onOpenDocResetSelectedGooseMsg);

/** An sub element for showing all published GOOSE messages per IED. */
@customElement('goose-publisher-list')
export class GoosePublisherList extends LitElement {
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

  private onGooseSelect(gseControl: Element): void {
    if (gseControl == selectedGseControl) return;

    const ln = gseControl.parentElement;
    const dataset = ln?.querySelector(
      `DataSet[name=${gseControl.getAttribute('datSet')}]`
    );

    selectedGseControl = gseControl;
    selectedDataSet = dataset;

    this.dispatchEvent(
      newGOOSESelectEvent(
        selectedGseControl,
        selectedDataSet!
      )
    );

    this.requestUpdate();
  }

  renderGoose(gseControl: Element): TemplateResult {
    return html`<mwc-list-item
      @click=${() => this.onGooseSelect(gseControl)}
      graphic="large"
      hasMeta
    >
      <mwc-icon slot="graphic">${gooseIcon}</mwc-icon>
      <span>${gseControl.getAttribute('name')}</span>
      <mwc-icon-button
        class="${classMap({
          hidden: gseControl !== selectedGseControl,
        })}"
        slot="meta"
        icon="edit"
        @click=${() => this.openEditWizard(gseControl)}
      ></mwc-icon-button>
    </mwc-list-item>`;
  }
  
  private openEditWizard(gseControl: Element): void {
    const wizard = wizards['GSEControl'].edit(gseControl);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  protected firstUpdated(): void {
    this.dispatchEvent(
      newGOOSESelectEvent(
        selectedGseControl,
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
              ${this.getGSEControls(ied).map(gseControl =>
                this.renderGoose(gseControl)
              )}
            `
        )}
      </filtered-list>
    </section>`;
  }

  static styles = css`
    ${styles}

    mwc-list-item {
      --mdc-list-item-meta-size: 48px;
    }

    mwc-icon-button.hidden {
      display: none;
    }
  `;
}
