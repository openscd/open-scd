import {
  css,
  customElement,
  html,
  LitElement,
  property,
  query,
  state,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-list/mwc-list-item';
import { Button } from '@material/mwc-button';
import { ListItem } from '@material/mwc-list/mwc-list-item';

import './data-set-element-editor.js';
import '../../filtered-list.js';
import { FilteredList } from '../../filtered-list.js';

import { compareNames, identity, selector } from '../../foundation.js';
import { reportIcon } from '../../icons/icons.js';
import { styles } from './foundation.js';

@customElement('report-control-editor')
export class ReportControlEditor extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;

  @state()
  selectedReportControl?: Element | null;

  @query('.selectionlist') selectionList!: FilteredList;
  @query('mwc-button') selectReportControlButton!: Button;

  private selectReportControl(evt: Event): void {
    const id = ((evt.target as FilteredList).selected as ListItem).value;
    const reportControl = this.doc.querySelector(selector('ReportControl', id));

    if (reportControl) {
      this.selectedReportControl = reportControl.parentElement?.querySelector(
        `DataSet[name="${reportControl.getAttribute('datSet')}"]`
      );
      (evt.target as FilteredList).classList.add('hidden');
      this.selectReportControlButton.classList.remove('hidden');
    }
  }

  private renderElementEditorContainer(): TemplateResult {
    if (this.selectedReportControl !== undefined)
      return html`<div class="elementeditorcontainer">
        <data-set-element-editor
          .element=${this.selectedReportControl}
        ></data-set-element-editor>
      </div>`;

    return html``;
  }

  private renderSelectionList(): TemplateResult {
    return html`<filtered-list
      activatable
      class="selectionlist"
      @action=${this.selectReportControl}
      >${Array.from(this.doc.querySelectorAll('IED'))
        .sort(compareNames)
        .flatMap(ied => {
          const ieditem = html`<mwc-list-item
              class="listitem header"
              noninteractive
              graphic="icon"
              value="${Array.from(ied.querySelectorAll('ReportControl'))
                .map(element => {
                  const id = identity(element) as string;
                  return typeof id === 'string' ? id : '';
                })
                .join(' ')}"
            >
              <span>${ied.getAttribute('name')}</span>
              <mwc-icon slot="graphic">developer_board</mwc-icon>
            </mwc-list-item>
            <li divider role="separator"></li>`;

          const reports = Array.from(ied.querySelectorAll('ReportControl')).map(
            reportCb =>
              html`<mwc-list-item
                twoline
                value="${identity(reportCb)}"
                graphic="icon"
                ><span>${reportCb.getAttribute('name')}</span
                ><span slot="secondary">${identity(reportCb)}</span>
                <mwc-icon slot="graphic">${reportIcon}</mwc-icon>
              </mwc-list-item>`
          );

          return [ieditem, ...reports];
        })}</filtered-list
    >`;
  }

  private renderToggleButton(): TemplateResult {
    return html`<mwc-button
      outlined
      label="${translate('publisher.selectbutton', { type: 'Report' })}"
      @click=${() => {
        this.selectionList.classList.remove('hidden');
        this.selectReportControlButton.classList.add('hidden');
      }}
    ></mwc-button>`;
  }

  render(): TemplateResult {
    return html`${this.renderToggleButton()}
      <div class="content">
        ${this.renderSelectionList()}${this.renderElementEditorContainer()}
      </div>`;
  }

  static styles = css`
    ${styles}
  `;
}
