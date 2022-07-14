import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { compareNames, identity } from '../../foundation.js';

@customElement('data-set-editor')
export class DataSetEditor extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;

  renderList(): TemplateResult {
    return html`<filtered-list
      >${Array.from(this.doc.querySelectorAll('IED'))
        .sort(compareNames)
        .flatMap(ied => {
          const ieditem = html`<mwc-list-item
              class="listitem header"
              noninteractive
              graphic="icon"
              value="${Array.from(ied.querySelectorAll('DataSet'))
                .map(element => {
                  const id = identity(element) as string;
                  return typeof id === 'string' ? id : '';
                })
                .join('')}"
            >
              <span>${ied.getAttribute('name')}</span>
              <mwc-icon slot="graphic">developer_board</mwc-icon>
            </mwc-list-item>
            <li divider role="separator"></li>`;

          const dataSets = Array.from(ied.querySelectorAll('DataSet')).map(
            reportCb =>
              html`<mwc-list-item twoline value="${identity(reportCb)}"
                ><span>${reportCb.getAttribute('name')}</span
                ><span slot="secondary">${identity(reportCb)}</span>
              </mwc-list-item>`
          );

          return [ieditem, ...dataSets];
        })}</filtered-list
    >`;
  }

  render(): TemplateResult {
    return html`${this.renderList()}`;
  }

  static styles = css`
    filtered-list {
      margin: 4px 8px 16px;
      background-color: var(--mdc-theme-surface);
    }

    .listitem.header {
      font-weight: 500;
    }
  `;
}
