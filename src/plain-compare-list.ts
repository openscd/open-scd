import {
  customElement,
  LitElement,
  property,
  html,
  TemplateResult,
  css,
  state,
} from 'lit-element';
import { translate } from 'lit-translate';

import { DiffFilter, renderDiff } from './foundation/compare';

@customElement('plain-compare-list')
export class PlainCompareList extends LitElement {
  @property({ type: String })
  leftHandTitle: string = '';

  @property({ type: String })
  rightHandTitle: string = '';

  @property({ type: Object })
  leftHandObject!: Element;

  @property({ type: Object })
  rightHandObject!: Element;

  @property({ type: Object })
  filterToIgnore?: DiffFilter<Element>;

  @property({ type: String })
  leftHandSubtitle: string = '';

  @property({ type: String })
  rightHandSubtitle: string = '';

  @state()
  filterMutables: boolean = true;

  render(): TemplateResult {
    return html` 
      <div class="container">
        <div class="flex"></div>
        ${this.renderFilterCheckbox()}
      </div>
      <div class="container container--alt">
        <div class="list__container list__container--left">
          <h3 class="mdc-dialog__title">
            ${this.leftHandTitle}
          </h3>
          ${
            this.leftHandSubtitle && this.leftHandSubtitle.length > 0
              ? html`<h5 class="mdc-dialog__title">
              ${this.leftHandSubtitle}
              </h5>
              `
              : ''
          }
        </div>
        <div class="list__container">
          <h3 class="mdc-dialog__title">
            ${this.rightHandTitle}
          </h3>
          ${
            this.rightHandSubtitle && this.rightHandSubtitle.length > 0
              ? html`<h5 class="mdc-dialog__title">
              ${this.rightHandSubtitle}
              </h5>
              `
              : ''
          }
        </div>
      </div>
      ${
        this.leftHandObject && this.rightHandObject
          ? html`
          ${renderDiff(
            this.leftHandObject,
            this.rightHandObject,
            this.filterMutables ? this.filterToIgnore : {}
          )}
        `
          : ''
      }
      `;
  }

  protected renderFilterCheckbox(): TemplateResult {
    return html`<mwc-formfield
          label="${translate('compare.filterMutables')}">
            <mwc-checkbox
              ?checked=${this.filterMutables}
              @change=${() => (this.filterMutables = !this.filterMutables)}>
            </mwc-checkbox>
          </mwc-formfield>
          `;
  }

  static styles = css`
    mwc-list-item {
      --mdc-list-item-graphic-margin: 0;
    }

    .mdc-dialog__title {
      padding: 0 16px;
    }

    .container {
      display: flex;
      gap: 4px;
    }

    .container--alt {
      background: var(--base2);
    }

    .list__container {
      width: 50%;
      background: var(--base3);
    }
    .list__container--left {
      text-align: right;
    }
    .flex {
      flex: 1;
    }

    mwc-list-item[right] {
      text-align: right;
      direction: rtl;
    }
  `;
}
