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
import { smvIcon } from '../../icons/icons.js';
import { styles } from './foundation.js';

@customElement('sampled-value-control-editor')
export class SampledValueControlEditor extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;

  @state()
  selectedSampledValueControl?: Element | null;

  @query('.selectionlist') selectionList!: FilteredList;
  @query('mwc-button') selectSampledValueControlButton!: Button;

  private selectSMVControl(evt: Event): void {
    const id = ((evt.target as FilteredList).selected as ListItem).value;
    const smvControl = this.doc.querySelector(
      selector('SampledValueControl', id)
    );

    if (smvControl) {
      this.selectedSampledValueControl =
        smvControl.parentElement?.querySelector(
          `DataSet[name="${smvControl.getAttribute('datSet')}"]`
        );
      (evt.target as FilteredList).classList.add('hidden');
      this.selectSampledValueControlButton.classList.remove('hidden');
    }
  }

  private renderElementEditorContainer(): TemplateResult {
    if (this.selectedSampledValueControl !== undefined)
      return html`<div class="elementeditorcontainer">
        <data-set-element-editor
          .element=${this.selectedSampledValueControl}
        ></data-set-element-editor>
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
  `;
}
