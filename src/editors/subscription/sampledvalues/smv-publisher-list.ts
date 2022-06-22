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
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';

import { getNameAttribute, newWizardEvent } from '../../../foundation.js';
import { newSmvSelectEvent } from './foundation.js';
import { smvIcon } from '../../../icons/icons.js';
import { getOrderedIeds, styles } from '../foundation.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { wizards } from '../../../wizards/wizard-library.js';

let selectedSmvMsg: Element | undefined;
let selectedDataSet: Element | undefined | null;

function onOpenDocResetSelectedSmvMsg() {
  selectedSmvMsg = undefined;
  selectedDataSet = undefined;
}
addEventListener('open-doc', onOpenDocResetSelectedSmvMsg);

/** An sub element for showing all Sampled Values per IED. */
@customElement('smv-publisher-list')
export class SmvPublisherList extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;

  private onSelect(smvControl: Element) {
    const ln = smvControl.parentElement;
    const dataset = ln?.querySelector(
      `DataSet[name=${smvControl.getAttribute('datSet')}]`
    );

    selectedSmvMsg = smvControl;
    selectedDataSet = dataset;

    this.dispatchEvent(
      newSmvSelectEvent(
        selectedSmvMsg,
        selectedDataSet!
      )
    );

    this.requestUpdate();
  }

  renderSmv(smvControl: Element): TemplateResult {
    return html`<mwc-list-item
      @click=${() => this.onSelect(smvControl)}
      graphic="large"
      hasMeta>
      <mwc-icon slot="graphic">${smvIcon}</mwc-icon>
      <span>${smvControl.getAttribute('name')}</span>
      <mwc-icon-button
        class="${classMap({
          hidden: smvControl !== selectedSmvMsg,
        })}"
        slot="meta"
        icon="edit"
        @click=${() => this.openEditWizard(smvControl)}
      ></mwc-icon-button>
    </mwc-list-item>`;
  }
  
  private openEditWizard(smvControl: Element): void {
    const wizard = wizards['SampledValueControl'].edit(smvControl);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  protected firstUpdated(): void {
    this.dispatchEvent(
      newSmvSelectEvent(
        selectedSmvMsg,
        selectedDataSet ?? undefined
      )
    );
  }

  render(): TemplateResult {
    return html` <section tabindex="0">
      <h1>${translate('sampledvalues.sampledValuesList.title')}</h1>
      <mwc-list>
        ${getOrderedIeds(this.doc).map(ied =>
            html`
              <mwc-list-item noninteractive graphic="icon">
                <span>${getNameAttribute(ied)}</span>
                <mwc-icon slot="graphic">developer_board</mwc-icon>
              </mwc-list-item>
              <li divider role="separator"></li>
              ${Array.from(
                  ied.querySelectorAll(
                    ':scope > AccessPoint > Server > LDevice > LN0 > SampledValueControl'
                  )
                ).map(control => this.renderSmv(control))
              }
            `
        )}
      </mwc-list>
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
