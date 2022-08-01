import {
  css,
  customElement,
  html,
  LitElement,
  property as state,
  query,
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

import { gooseIcon } from '../../icons/icons.js';
import { compareNames, identity, selector } from '../../foundation.js';
import { styles } from './foundation.js';

@customElement('gse-control-editor')
export class GseControlEditor extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @state({ attribute: false })
  doc!: XMLDocument;

  @state()
  selectedGseControl?: Element | null;

  @query('.selectionlist') selectionList!: FilteredList;
  @query('mwc-button') selectGSEControlButton!: Button;

  private selectGSEControl(evt: Event): void {
    const id = ((evt.target as FilteredList).selected as ListItem).value;
    const gseControl = this.doc.querySelector(selector('GSEControl', id));

    if (gseControl) {
      this.selectedGseControl = gseControl.parentElement?.querySelector(
        `DataSet[name="${gseControl.getAttribute('datSet')}"]`
      );
      (evt.target as FilteredList).classList.add('hidden');
      this.selectGSEControlButton.classList.remove('hidden');
    }
  }

  private renderElementEditorContainer(): TemplateResult {
    if (this.selectedGseControl !== undefined)
      return html`<div class="elementeditorcontainer">
        <data-set-element-editor
          .element=${this.selectedGseControl}
        ></data-set-element-editor>
      </div>`;

    return html``;
  }

  renderSelectionList(): TemplateResult {
    return html`<filtered-list
      activatable
      @action=${this.selectGSEControl}
      class="selectionlist"
      >${Array.from(this.doc.querySelectorAll('IED'))
        .sort(compareNames)
        .flatMap(ied => {
          const ieditem = html`<mwc-list-item
              class="listitem header"
              noninteractive
              graphic="icon"
              value="${Array.from(ied.querySelectorAll('GSEControl'))
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

  private renderToggleButton(): TemplateResult {
    return html`<mwc-button
      outlined
      label="${translate('publisher.selectbutton', { type: 'GOOSE' })}"
      @click=${() => {
        this.selectionList.classList.remove('hidden');
        this.selectGSEControlButton.classList.add('hidden');
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
