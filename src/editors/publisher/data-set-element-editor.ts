import {
  css,
  customElement,
  html,
  LitElement,
  property,
  state,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-list/mwc-list-item';

import '../../wizard-textfield.js';
import '../../filtered-list.js';

import { identity } from '../../foundation.js';

@customElement('data-set-element-editor')
export class DataSetElementEditor extends LitElement {
  @property({ attribute: false })
  element!: Element | null;

  @state()
  private get name(): string | null {
    return this.element ? this.element.getAttribute('name') : 'UNDEFINED';
  }
  @state()
  private get desc(): string | null {
    return this.element ? this.element.getAttribute('desc') : 'UNDEFINED';
  }

  render(): TemplateResult {
    if (this.element)
      return html`<div class="content">
        <h2>${identity(this.element)}</h2>
        <wizard-textfield
          label="name"
          .maybeValue=${this.name}
          helper="${translate('scl.name')}"
          required
        >
        </wizard-textfield>
        <wizard-textfield
          label="desc"
          .maybeValue=${this.desc}
          helper="${translate('scl.desc')}"
          nullable
        >
        </wizard-textfield>
        <filtered-list
          >${Array.from(this.element.querySelectorAll('FCDA')).map(
            fcda =>
              html`<mwc-list-item selected value="${identity(fcda)}"
                >${(<string>identity(fcda)).split('>').pop()}</mwc-list-item
              >`
          )}</filtered-list
        >
      </div>`;

    return html`<div class="content">
      <h2>${translate('publisher.nodataset')}</h2>
    </div>`;
  }

  static styles = css`
    .content {
      display: flex;
      flex-direction: column;
      background-color: var(--mdc-theme-surface);
    }

    .content > * {
      display: block;
      margin: 4px 8px 16px;
    }

    h2 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
      transition: background-color 150ms linear;
    }

    *[iconTrailing='search'] {
      --mdc-shape-small: 28px;
    }
  `;
}
