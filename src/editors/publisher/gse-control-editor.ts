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
    this.selectedIEDs = newIedSelection.sort(compareNames);
  }

  toggleIedFilterList(): void {
    this.iedFilterHidden = !this.iedFilterHidden;
    this.requestUpdate();
  }

  renderList(): TemplateResult {
    const iEDs = Array.from(this.doc.querySelectorAll('IED'))
      .sort(compareNames)
      .filter(isPublic);

    return html`<div>
      <filtered-list
        filternoninteractive
        class="${classMap({
          tobefilteredlist: true,
          withcontent: !this.iedFilterHidden,
        })}"
        ><mwc-icon-button
          slot="headerright"
          class="${classMap({
            openfilter: true,
            hidden: !this.iedFilterHidden,
          })}"
          icon="filter_list"
          @click=${this.toggleIedFilterList}
        ></mwc-icon-button
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
      ><filtered-list
        class="filtermenu"
        multi
        class="${classMap({
          filtermenu: true,
          hidden: this.iedFilterHidden,
        })}"
        @selected=${this.filterIeds}
        ><mwc-icon-button
          slot="headerleft"
          icon="close"
          @click=${this.toggleIedFilterList}
        ></mwc-icon-button
        >${iEDs.map(
          iED =>
            html`<mwc-check-list-item twoline value="${identity(iED)}" selected
              ><slot>${iED.getAttribute('name')}</slot
              ><slot slot="secondary"
                >${iED.getAttribute('manufacturer')}</slot
              ></mwc-check-list-item
            >`
        )}</filtered-list
      >
    </div>`;
  }

  render(): TemplateResult {
    return html`${this.renderList()}`;
  }

  static styles = css`
    filtered-list {
      margin: 4px 8px 16px;
      background-color: var(--mdc-theme-surface);
    }

    div {
      display: flex;
      flex-direction: column;
    }

    .listitem.header {
      font-weight: 500;
    }

    .tobefilteredlist.withcontent {
      width: calc(100% - 318px);
    }

    .tobefilteredlist {
      width: calc(100% - 16px);
      transition: display;
      transition-duration: 0s;
      transition-timing-function: ease;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 250ms;
    }

    .filtermenu.hidden {
      display: none;
      right: -300px;
    }

    .filtermenu {
      position: absolute;
      right: 0px;
      width: 300px;
      margin-left: 1px;
      height: 100%;
      ransition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 250ms;
      transition-property: right;
    }

    .openfilter.hidden {
      display: none;
    }
  `;
}
