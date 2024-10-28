import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { get } from 'lit-translate';

import '@material/mwc-icon';
import '@material/mwc-list';
import '@material/mwc-list/mwc-list-item';

import {
  getNameAttribute,
  identity,
  newWizardEvent,
} from '@openscd/open-scd/src/foundation.js';
import { newSmvSelectEvent } from './foundation.js';
import { smvIcon } from '@openscd/open-scd/src/icons/icons.js';
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
@customElement('smv-list')
export class SmvPublisherList extends LitElement {
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;

  private onSelect(smvControl: Element) {
    const ln = smvControl.parentElement;
    const dataset = ln?.querySelector(
      `DataSet[name=${smvControl.getAttribute('datSet')}]`
    );

    selectedSmvMsg = smvControl;
    selectedDataSet = dataset;

    this.dispatchEvent(newSmvSelectEvent(selectedSmvMsg, selectedDataSet!));

    this.requestUpdate();
  }

  private openEditWizard(smvControl: Element): void {
    const wizard = wizards['SampledValueControl'].edit(smvControl);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  protected updated(): void {
    this.dispatchEvent(
      newSmvSelectEvent(selectedSmvMsg, selectedDataSet ?? undefined)
    );
  }

  protected firstUpdated(): void {
    selectedSmvMsg = undefined;
    selectedDataSet = undefined;
  }

  renderSmv(smvControl: Element): TemplateResult {
    return html`<mwc-list-item
      @click=${() => this.onSelect(smvControl)}
      graphic="large"
      hasMeta
      value="${identity(smvControl)}"
    >
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

  render(): TemplateResult {
    return html` <section tabindex="0">
      <h1>${get('subscription.smv.publisher.title')}</h1>
      <filtered-list activatable>
        ${getOrderedIeds(this.doc).map(
          ied =>
            html`
              <mwc-list-item
                noninteractive
                graphic="icon"
                value="${Array.from(ied.querySelectorAll('SampledValueControl'))
                  .filter(cb => cb.hasAttribute('datSet'))
                  .map(element => {
                    const id = identity(element) as string;
                    return typeof id === 'string' ? id : '';
                  })
                  .join(' ')}"
              >
                <span>${getNameAttribute(ied)}</span>
                <mwc-icon slot="graphic">developer_board</mwc-icon>
              </mwc-list-item>
              <li divider role="separator"></li>
              ${Array.from(
                ied.querySelectorAll(
                  ':scope > AccessPoint > Server > LDevice > LN0 > SampledValueControl'
                )
              )
                .filter(cb => cb.hasAttribute('datSet'))
                .map(control => this.renderSmv(control))}
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

    mwc-list-item.hidden[noninteractive] + li[divider] {
      display: none;
    }
  `;
}
