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
import './report-control-element-editor.js';
import '../../filtered-list.js';
import { FilteredList } from '../../filtered-list.js';

import { compareNames, identity, find } from '../../foundation.js';
import { reportIcon } from '../../icons/icons.js';
import { styles, updateElementReference } from './foundation.js';

@customElement('report-control-editor')
export class ReportControlEditor extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;

  @state()
  selectedReportControl?: Element;
  @state()
  selectedDataSet?: Element | null;

  @query('.selectionlist') selectionList!: FilteredList;
  @query('mwc-button') selectReportControlButton!: Button;

  /** Resets selected Report and its DataSet, if not existing in new doc */
  update(props: Map<string | number | symbol, unknown>): void {
    if (props.has('doc') && this.selectedReportControl) {
      const newReportControl = updateElementReference(
        this.doc,
        this.selectedReportControl
      );

      this.selectedReportControl = newReportControl ?? undefined;
      this.selectedDataSet = this.selectedReportControl
        ? updateElementReference(this.doc, this.selectedDataSet!)
        : undefined;

      if (
        !newReportControl &&
        this.selectionList &&
        this.selectionList.selected
      )
        (this.selectionList.selected as ListItem).selected = false;
    }

    super.update(props);
  }

  private selectReportControl(evt: Event): void {
    const id = ((evt.target as FilteredList).selected as ListItem).value;
    const reportControl = find(this.doc, 'ReportControl', id);
    if (!reportControl) return;

    this.selectedReportControl = reportControl;

    if (this.selectedReportControl) {
      this.selectedDataSet =
        this.selectedReportControl.parentElement?.querySelector(
          `DataSet[name="${this.selectedReportControl.getAttribute('datSet')}"]`
        );
      (evt.target as FilteredList).classList.add('hidden');
      this.selectReportControlButton.classList.remove('hidden');
    }
  }

  private renderElementEditorContainer(): TemplateResult {
    if (this.selectedReportControl !== undefined)
      return html`<div class="elementeditorcontainer">
        <data-set-element-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${this.selectedDataSet!}
        ></data-set-element-editor>
        <report-control-element-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${this.selectedReportControl}
        ></report-control-element-editor>
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

    .elementeditorcontainer {
      flex: 65%;
      margin: 4px 8px 4px 4px;
      background-color: var(--mdc-theme-surface);
      overflow-y: scroll;
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      grid-template-columns: repeat(3, 1fr);
    }

    data-set-element-editor {
      grid-column: 1 / 2;
    }

    report-control-element-editor {
      grid-column: 2 / 4;
    }

    @media (max-width: 950px) {
      .elementeditorcontainer {
        display: block;
      }
    }
  `;
}
