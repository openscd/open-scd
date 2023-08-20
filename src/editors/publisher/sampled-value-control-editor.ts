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
import './sampled-value-control-element-editor.js';
import { FilteredList } from '../../filtered-list.js';

import { compareNames, identity, find } from '../../foundation.js';
import { smvIcon } from '../../icons/icons.js';
import { styles, updateElementReference } from './foundation.js';

@customElement('sampled-value-control-editor')
export class SampledValueControlEditor extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;

  @state()
  selectedSampledValueControl?: Element;
  @state()
  selectedDataSet?: Element | null;

  @query('.selectionlist') selectionList!: FilteredList;
  @query('mwc-button') selectSampledValueControlButton!: Button;

  /** Resets selected SMV and its DataSet, if not existing in new doc */
  update(props: Map<string | number | symbol, unknown>): void {
    if (props.has('doc') && this.selectedSampledValueControl) {
      const newSampledValueControl = updateElementReference(
        this.doc,
        this.selectedSampledValueControl
      );

      this.selectedSampledValueControl = newSampledValueControl ?? undefined;
      this.selectedDataSet = this.selectedSampledValueControl
        ? updateElementReference(this.doc, this.selectedDataSet!)
        : undefined;

      if (
        !newSampledValueControl &&
        this.selectionList &&
        this.selectionList.selected
      )
        (this.selectionList.selected as ListItem).selected = false;
    }

    super.update(props);
  }

  private selectSMVControl(evt: Event): void {
    const id = ((evt.target as FilteredList).selected as ListItem).value;
    const smvControl = find(this.doc, 'SampledValueControl', id);
    if (!smvControl) return;

    this.selectedSampledValueControl = smvControl;

    if (smvControl) {
      this.selectedDataSet =
        smvControl.parentElement?.querySelector(
          `DataSet[name="${smvControl.getAttribute('datSet')}"]`
        ) ?? null;
      (evt.target as FilteredList).classList.add('hidden');
      this.selectSampledValueControlButton.classList.remove('hidden');
    }
  }

  private renderElementEditorContainer(): TemplateResult {
    if (this.selectedSampledValueControl !== undefined)
      return html`<div class="elementeditorcontainer">
        <data-set-element-editor
          .element=${this.selectedDataSet!}
        ></data-set-element-editor>
        <sampled-value-control-element-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${this.selectedSampledValueControl}
        ></sampled-value-control-element-editor>
      </div>`;

    return html``;
  }

  private renderSelectionList(): TemplateResult {
    return html`<filtered-list
      activatable
      @action=${this.selectSMVControl}
      class="selectionlist"
      >${Array.from(this.doc.querySelectorAll('IED'))
        .sort(compareNames)
        .flatMap(ied => {
          const ieditem = html`<mwc-list-item
              class="listitem header"
              noninteractive
              graphic="icon"
              value="${Array.from(ied.querySelectorAll('SampledValueControl'))
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

          const sampledValueControls = Array.from(
            ied.querySelectorAll('SampledValueControl')
          ).map(
            reportCb =>
              html`<mwc-list-item
                twoline
                value="${identity(reportCb)}"
                graphic="icon"
                ><span>${reportCb.getAttribute('name')}</span
                ><span slot="secondary">${identity(reportCb)}</span>
                <mwc-icon slot="graphic">${smvIcon}</mwc-icon>
              </mwc-list-item>`
          );

          return [ieditem, ...sampledValueControls];
        })}</filtered-list
    >`;
  }

  private renderToggleButton(): TemplateResult {
    return html`<mwc-button
      outlined
      label="${translate('publisher.selectbutton', { type: 'SMV' })}"
      @click=${() => {
        this.selectionList.classList.remove('hidden');
        this.selectSampledValueControlButton.classList.add('hidden');
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

    sampled-value-control-element-editor {
      grid-column: 2 / 4;
    }

    @media (max-width: 950px) {
      .elementeditorcontainer {
        display: block;
      }
    }
  `;
}
