import {
  css,
  html,
  LitElement,
  property,
  query,
  state,
  TemplateResult,
} from 'lit-element';

import '@material/mwc-fab';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';

import './templates2/l-node-type-editor.js';
import './templates2/d-o-type-editor.js';
import {
  createElement,
  identity,
  newActionEvent,
  newWizardEvent,
  selector,
} from '../foundation.js';
import { MultiSelectedEvent } from '@material/mwc-list/mwc-list-foundation';
import { Menu } from '@material/mwc-menu';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base';
import { classMap } from 'lit-html/directives/class-map';
import {
  compareNames,
  compareSelection,
  styles,
} from './templates2/foundation.js';
import { FilteredList } from '../filtered-list.js';
import { render } from 'lit-html';
import { translate } from 'lit-translate';
import { createLNodeTypeWizard } from './templates/lnodetype-wizard.js';
import { createDOTypeWizard } from './templates/dotype-wizards.js';
import { createDATypeWizard } from './templates/datype-wizards.js';

const templates = fetch('public/xml/templates.scd')
  .then(response => response.text())
  .then(str => new DOMParser().parseFromString(str, 'application/xml'));

const nsd74 = fetch('public/xml/IEC_61850-7-4_2007B3.nsd')
  .then(response => response.text())
  .then(str => new DOMParser().parseFromString(str, 'application/xml'));

const nsd7420 = fetch('public/xml/IEC_61850-7-420_2019A4.nsd')
  .then(response => response.text())
  .then(str => new DOMParser().parseFromString(str, 'application/xml'));

/** An editor [[`plugin`]] for editing the `IED` section. */
export default class TemplateProt extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  private get lNodeTypes(): Element[] {
    return Array.from(this.doc.querySelectorAll('LNodeType'));
  }
  private get dOTypes(): Element[] {
    return Array.from(this.doc.querySelectorAll('DOType'));
  }
  private get dATypes(): Element[] {
    return Array.from(this.doc.querySelectorAll('DAType'));
  }

  @state()
  private selectedLNodeTypes: Element[] = [];
  @state()
  private selectedDOTypes: Element[] = [];
  @state()
  private selectedDATypes: Element[] = [];
  @state()
  private hideLNodeTypeList = true;
  @state()
  private hideDOTypeList = true;
  @state()
  private hideDATypeList = true;

  @query('filtered-list.lnodetype') lNodeTypeList!: FilteredList;
  @query('filtered-list.dotype') dOTypeList!: FilteredList;
  @query('filtered-list.datype') dATypeList!: FilteredList;

  async openCreateDATypeWizard(): Promise<void> {
    this.createDataTypeTemplates();

    this.dispatchEvent(
      newWizardEvent(
        createDATypeWizard(
          this.doc.querySelector(':root > DataTypeTemplates')!,
          await templates
        )
      )
    );
  }

  async openCreateDOTypeWizard(): Promise<void> {
    this.createDataTypeTemplates();

    this.dispatchEvent(
      newWizardEvent(
        createDOTypeWizard(
          this.doc.querySelector(':root > DataTypeTemplates')!,
          await templates
        )
      )
    );
  }

  async openCreateLNodeTypeWizard(): Promise<void> {
    this.createDataTypeTemplates();

    this.dispatchEvent(
      newWizardEvent(
        createLNodeTypeWizard(
          this.doc.querySelector(':root > DataTypeTemplates')!,
          await templates,
          await nsd74,
          await nsd7420
        )
      )
    );
  }

  createDataTypeTemplates(): void {
    if (!this.doc.querySelector(':root > DataTypeTemplates'))
      this.dispatchEvent(
        newActionEvent({
          new: {
            parent: this.doc.documentElement,
            element: createElement(this.doc, 'DataTypeTemplates', {}),
          },
        })
      );
  }

  private selectDAType(evt: MultiSelectedEvent): void {
    const selectedDATypes = ((evt.target as Menu).selected as ListItemBase[])
      .map(item => this.doc.querySelector(selector('DAType', item.value)))
      .filter(datype => datype) as Element[];

    this.selectedDATypes = selectedDATypes;
  }

  private selectLNodeType(evt: MultiSelectedEvent): void {
    const selectedLNodeTypes = ((evt.target as Menu).selected as ListItemBase[])
      .map(item => this.doc.querySelector(selector('LNodeType', item.value)))
      .filter(lNodeType => lNodeType) as Element[];

    this.selectedLNodeTypes = selectedLNodeTypes;
  }

  private selectDOType(evt: MultiSelectedEvent): void {
    const selectedDOTypes = ((evt.target as Menu).selected as ListItemBase[])
      .map(item => this.doc.querySelector(selector('DOType', item.value)))
      .filter(lNodeType => lNodeType) as Element[];

    this.selectedDOTypes = selectedDOTypes;
  }

  toggleDATypeList(): void {
    this.hideDATypeList = !this.hideDATypeList;

    const sortedItems = this.dATypeList.items
      .sort(compareNames)
      .sort(compareSelection);
    render(html`${sortedItems}`, this.dATypeList);
  }

  toggleDOTypeList(): void {
    this.hideDOTypeList = !this.hideDOTypeList;

    const sortedItems = this.dOTypeList.items
      .sort(compareNames)
      .sort(compareSelection);
    render(html`${sortedItems}`, this.dOTypeList);
  }

  toggleLNodeTypeList(): void {
    this.hideLNodeTypeList = !this.hideLNodeTypeList;

    const sortedItems = this.lNodeTypeList.items
      .sort(compareNames)
      .sort(compareSelection);
    render(html`${sortedItems}`, this.lNodeTypeList);
  }

  renderDAMenuEntry(dAType: Element): TemplateResult {
    return html`<mwc-list-item value="${identity(dAType)}"
      >${dAType.getAttribute('id')}</mwc-list-item
    >`;
  }

  renderDOMenuEntry(dOType: Element): TemplateResult {
    return html`<mwc-list-item value="${identity(dOType)}"
      >${dOType.getAttribute('cdc') +
      ': ' +
      dOType.getAttribute('id')}</mwc-list-item
    >`;
  }

  renderLNodeMenuEntry(lNodeType: Element): TemplateResult {
    return html`<mwc-list-item value="${identity(lNodeType)}"
      >${lNodeType.getAttribute('lnClass') +
      ': ' +
      lNodeType.getAttribute('id')}</mwc-list-item
    >`;
  }

  renderDAMenu(): TemplateResult {
    return html`<mwc-icon-button
        class="datype"
        icon="edit_attributes"
        @click=${this.toggleDATypeList}
      ></mwc-icon-button>
      <div
        class="${classMap({
          typelistcontainer: true,
          hidden: this.hideDATypeList,
        })}"
      >
        <h1>
          ${translate('scl.DAType')}
          <nav>
            <abbr title="${translate('add')}">
              <mwc-icon-button
                icon="playlist_add"
                @click=${() => this.openCreateDATypeWizard()}
              ></mwc-icon-button>
            </abbr>
          </nav>
        </h1>
        <filtered-list
          class="datype"
          activatable
          multi
          id="menu"
          @selected=${this.selectDAType}
        >
          ${this.dATypes.map(this.renderDAMenuEntry)}
        </filtered-list>
      </div>`;
  }

  renderDOMenu(): TemplateResult {
    return html`<mwc-icon-button
        class="dotype"
        icon="data_object"
        @click=${this.toggleDOTypeList}
      ></mwc-icon-button>
      <div
        class="${classMap({
          typelistcontainer: true,
          hidden: this.hideDOTypeList,
        })}"
      >
        <h1>
          ${translate('scl.DOType')}
          <nav>
            <abbr title="${translate('add')}">
              <mwc-icon-button
                icon="playlist_add"
                @click=${() => this.openCreateDOTypeWizard()}
              ></mwc-icon-button>
            </abbr>
          </nav>
        </h1>
        <filtered-list
          class="dotype"
          activatable
          multi
          id="menu"
          @selected=${this.selectDOType}
        >
          ${this.dOTypes.map(this.renderDOMenuEntry)}
        </filtered-list>
      </div>`;
  }

  renderLNodeMenu(): TemplateResult {
    return html`<mwc-icon-button
        class="lnodetype"
        icon="smart_button"
        @click=${this.toggleLNodeTypeList}
      ></mwc-icon-button>
      <div
        class="${classMap({
          typelistcontainer: true,
          hidden: this.hideLNodeTypeList,
        })}"
      >
        <h1>
          ${translate('scl.LNodeType')}
          <nav>
            <abbr title="${translate('add')}">
              <mwc-icon-button
                icon="playlist_add"
                @click=${() => this.openCreateLNodeTypeWizard()}
              ></mwc-icon-button>
            </abbr>
          </nav>
        </h1>
        <filtered-list
          class="lnodetype"
          activatable
          multi
          id="menu"
          @selected=${this.selectLNodeType}
        >
          ${this.lNodeTypes.map(this.renderLNodeMenuEntry)}
        </filtered-list>
      </div>`;
  }

  render(): TemplateResult {
    return html`${this.renderLNodeMenu()}${this.renderDOMenu()}${this.renderDAMenu()}
      <section>
        ${this.selectedLNodeTypes.map(
          selectedLNodeType => html`<l-node-type-editor
            .element=${selectedLNodeType}
          ></l-node-type-editor>`
        )}
        ${this.selectedDOTypes.map(
          selectedDOType => html`<d-o-type-editor
            .dOType=${selectedDOType}
          ></d-o-type-editor>`
        )}
        ${this.selectedDATypes.map(
          selectedDAType => html`<d-a-type-editor
            .dAType=${selectedDAType}
          ></d-a-type-editor>`
        )}
      </section>`;
  }

  static styles = css`
    ${styles}

    :host {
      width: 100vw;
    }

    section {
      padding: 8px 12px 16px;
    }

    mwc-icon-button {
      padding: 8px;
    }

    div.typelistcontainer {
      position: fixed;
      top: 175px;
      bottom: 60px;
      left: 20px;
      max-width: calc(100% - 40px);
      background-color: var(--mdc-theme-surface);
      overflow-y: auto;
      z-index: 5;
    }

    .hidden {
      display: none;
    }

    section {
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, auto));
    }

    @media (max-width: 387px) {
      section {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }
  `;
}
