import {
  css,
  customElement,
  html,
  LitElement,
  property,
  state,
  TemplateResult,
} from 'lit-element';

import '@material/mwc-icon';
import '@material/mwc-list/mwc-list-item';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';

import '../../filtered-list.js';
import { FilteredList } from '../../filtered-list.js';
import {
  compareNames,
  identity,
  isPublic,
  selector,
} from '../../foundation.js';
import { gooseIcon } from '../../icons/icons.js';
import { classMap } from 'lit-html/directives/class-map';

@customElement('gse-control-editor')
export class GseControlEditor extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  @state()
  selectedIEDs: Element[] = [];
  @state()
  iedFilterHidden = true;

  filterIeds(evt: Event): void {
    const newIedSelection: Element[] = [];
    ((evt.target as FilteredList).selected as ListItemBase[]).forEach(
      listItem => {
        const id = listItem.value;
        const iED = this.doc.querySelector(selector('IED', id));
        if (iED) newIedSelection.push(iED);
      }
    );
    this.selectedIEDs = newIedSelection;
  }

  toggleIedFilterList(): void {
    this.iedFilterHidden = !this.iedFilterHidden;
    this.requestUpdate();
  }

  renderList(): TemplateResult {
    const iEDs = Array.from(this.doc.querySelectorAll('IED'))
      .sort(compareNames)
      .filter(isPublic);

    return html`<filtered-list
      ><mwc-icon-button
        slot="additionalFilter"
        icon="filter_list"
        @click=${this.toggleIedFilterList}
      ></mwc-icon-button
      ><filtered-list
        multi
        class="${classMap({
          hidden: this.iedFilterHidden,
          iedlist: true,
        })}"
        @selected=${this.filterIeds}
        >${iEDs.map(
          iED =>
            html`<mwc-check-list-item value="${identity(iED)}" selected
              >${iED.getAttribute('name')}</mwc-check-list-item
            >`
        )}</filtered-list
      >${this.selectedIEDs.flatMap(ied => {
        const ieditem = html`<mwc-list-item
            class="listitem header"
            noninteractive
            graphic="icon"
          >
            <span>${ied.getAttribute('name')}</span>
            <mwc-icon slot="graphic">developer_board</mwc-icon>
          </mwc-list-item>
          <li divider role="separator"></li>`;

        const gseControls = Array.from(ied.querySelectorAll('GSEControl')).map(
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

    .iedlist {
      position: sticky;
    }

    .hidden {
      display: none;
    }
  `;
}
