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
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  /** The element being edited as provided to plugins by [[`OpenSCD`]]. */
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

  private renderContent(): TemplateResult {
    return html`<wizard-textfield
        label="name"
        .maybeValue=${this.name}
        helper="${translate('scl.name')}"
        required
        disabled
      >
      </wizard-textfield>
      <wizard-textfield
        label="desc"
        .maybeValue=${this.desc}
        helper="${translate('scl.desc')}"
        nullable
        disabled
      >
      </wizard-textfield>
      <filtered-list
        >${Array.from(this.element!.querySelectorAll('FCDA')).map(fcda => {
          const [ldInst, prefix, lnClass, lnInst, doName, daName, fc] = [
            'ldInst',
            'prefix',
            'lnClass',
            'lnInst',
            'doName',
            'daName',
            'fc',
          ].map(attributeName => fcda.getAttribute(attributeName) ?? '');

          return html`<mwc-list-item selected twoline value="${identity(fcda)}"
            ><span
              >${doName}${daName
                ? '.' + daName + ' ' + '[' + fc + ']'
                : ' ' + '[' + fc + ']'}</span
            ><span slot="secondary"
              >${ldInst + '/' + prefix + lnClass + lnInst}</span
            >
          </mwc-list-item>`;
        })}</filtered-list
      >`;
  }

  render(): TemplateResult {
    if (this.element)
      return html`<div class="content">
        <h2>
          <div>DataSet</div>
          <div class="headersubtitle">${identity(this.element)}</div>
        </h2>
        ${this.renderContent()}
      </div>`;

    return html`<div class="content">
      <h2>
        <div>DataSet</div>
        <div class="headersubtitle">${translate('publisher.nodataset')}</div>
      </h2>
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

      margin: 0px;
      padding-left: 0.3em;
      transition: background-color 150ms linear;
    }

    .headersubtitle {
      font-size: 16px;
      font-weight: 200;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    *[iconTrailing='search'] {
      --mdc-shape-small: 28px;
    }
  `;
}
