import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';

import '@material/mwc-list/mwc-list-item';
import '@material/mwc-icon';

import '../../filtered-list.js';
import { compareNames, identity } from '../../foundation.js';
import { gooseIcon } from '../../icons/icons.js';

@customElement('gse-control-editor')
export class GseControlEditor extends LitElement {
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
            >
              <span>${ied.getAttribute('name')}</span>
              <mwc-icon slot="graphic">developer_board</mwc-icon>
            </mwc-list-item>
            <li divider role="separator"></li>`;

          const gseControls = Array.from(
            ied.querySelectorAll('GSEControl')
          ).map(
            reportCb =>
              html`<mwc-list-item
                twoline
                value="${identity(reportCb)}"
                graphic="icon"
                ><span>${reportCb.getAttribute('name')}</span
                ><span slot="secondary">${identity(reportCb)}</span>
                <mwc-icon slot="graphic">${gooseIcon}</mwc-icon>
              </mwc-list-item>`
          );

          return [ieditem, ...gseControls];
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
