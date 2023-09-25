import {
  css,
  customElement,
  html,
  LitElement,
  property,
  state,
  query,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-button';
import '@material/mwc-list/mwc-list-item';
import { Button } from '@material/mwc-button';
import { ListItem } from '@material/mwc-list/mwc-list-item';

import './data-set-element-editor.js';
import './gse-control-element-editor.js';
import '../../filtered-list.js';
import { FilteredList } from '../../filtered-list.js';

import { gooseIcon } from '../../icons/icons.js';
import { compareNames, identity, find } from '../../foundation.js';
import { styles, updateElementReference } from './foundation.js';

@customElement('gse-control-editor')
export class GseControlEditor extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  @property({ type: Number })
  editCount = -1;

  @state()
  selectedGseControl?: Element;
  @state()
  selectedDataSet?: Element | null;

  @query('.selectionlist') selectionList!: FilteredList;
  @query('mwc-button') selectGSEControlButton!: Button;

  /** Resets selected GOOSE and its DataSet, if not existing in new doc */
  update(props: Map<string | number | symbol, unknown>): void {
    if (props.has('doc') && this.selectedGseControl) {
      const newGseControl = updateElementReference(
        this.doc,
        this.selectedGseControl
      );

      this.selectedGseControl = newGseControl ?? undefined;
      this.selectedDataSet = this.selectedGseControl
        ? updateElementReference(this.doc, this.selectedDataSet!)
        : undefined;

      if (!newGseControl && this.selectionList && this.selectionList.selected)
        (this.selectionList.selected as ListItem).selected = false;
    }

    super.update(props);
  }

  private selectGSEControl(evt: Event): void {
    const id = ((evt.target as FilteredList).selected as ListItem).value;
    const gseControl = find(this.doc, 'GSEControl', id);
    if (!gseControl) return;

    this.selectedGseControl = gseControl;

    if (gseControl) {
      this.selectedDataSet = gseControl.parentElement?.querySelector(
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
          .element=${this.selectedDataSet!}
        ></data-set-element-editor>
        <gse-control-element-editor
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${this.selectedGseControl}
        ></gse-control-element-editor>
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

    gse-control-element-editor {
      grid-column: 2 / 4;
    }

    @media (max-width: 950px) {
      .elementeditorcontainer {
        display: block;
      }
    }
  `;
}
