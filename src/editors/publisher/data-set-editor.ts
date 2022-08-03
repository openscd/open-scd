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
import { styles } from './foundation.js';

@customElement('data-set-editor')
export class DataSetEditor extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property({ attribute: false })
  set doc(newDoc: XMLDocument) {
    if (this._doc === newDoc) return;

    const newDataSet = this._selectedDataSetId
      ? newDoc.querySelector(selector('DataSet', this._selectedDataSetId))
      : null;

    if (newDataSet) this.selectedDataSet = newDataSet;
    else this.selectedDataSet = undefined;

    if (!newDataSet && this.selectionList && this.selectionList.selected)
      (this.selectionList.selected as ListItem).selected = false;

    this._doc = newDoc;

    this.requestUpdate();
  }
  get doc(): XMLDocument {
    return this._doc;
  }
  private _doc!: XMLDocument;

  @state()
  set selectedDataSet(newSelection: Element | undefined) {
    this._selectedDataSet = newSelection;
    this._selectedDataSetId = identity(this._selectedDataSet ?? null);

    this.requestUpdate();
  }
  get selectedDataSet(): Element | undefined {
    return this._selectedDataSet;
  }
  private _selectedDataSet?: Element;
  private _selectedDataSetId?: string | number;

  @query('.selectionlist') selectionList!: FilteredList;
  @query('mwc-button') selectDataSetButton!: Button;

  private selectDataSet(evt: Event): void {
    const id = ((evt.target as FilteredList).selected as ListItem).value;
    const dataSet = this.doc.querySelector(selector('DataSet', id));

    if (dataSet) {
      this.selectedDataSet = dataSet;
      (evt.target as FilteredList).classList.add('hidden');
      this.selectDataSetButton.classList.remove('hidden');
    }
  }

  private renderElementEditorContainer(): TemplateResult {
    if (this.selectedDataSet)
      return html`<div class="elementeditorcontainer">
        <data-set-element-editor
          .element=${this.selectedDataSet}
        ></data-set-element-editor>
      </div>`;

    return html``;
  }

  private renderSelectionList(): TemplateResult {
    return html`<filtered-list
      activatable
      @action=${this.selectDataSet}
      class="selectionlist"
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
                .join(' ')}"
            >
              <span>${ied.getAttribute('name')}</span>
              <mwc-icon slot="graphic">developer_board</mwc-icon>
            </mwc-list-item>
            <li divider role="separator"></li>`;

          const dataSets = Array.from(ied.querySelectorAll('DataSet')).map(
            dataSet =>
              html`<mwc-list-item twoline value="${identity(dataSet)}"
                ><span>${dataSet.getAttribute('name')}</span
                ><span slot="secondary">${identity(dataSet)}</span>
              </mwc-list-item>`
          );

          return [ieditem, ...dataSets];
        })}</filtered-list
    >`;
  }

  private renderToggleButton(): TemplateResult {
    return html`<mwc-button
      outlined
      label="${translate('publisher.selectbutton', { type: 'DataSet' })}"
      @click=${() => {
        this.selectionList.classList.remove('hidden');
        this.selectDataSetButton.classList.add('hidden');
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

    data-set-element-editor {
      flex: auto;
    }
  `;
}
