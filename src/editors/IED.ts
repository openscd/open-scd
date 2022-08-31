import {
  css,
  html,
  LitElement,
  property,
  PropertyValues,
  state,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-fab';
import '@material/mwc-select';
import '@material/mwc-list/mwc-list-item';
import '@material/mwc-list/mwc-check-list-item';
import '@material/mwc-list/mwc-radio-list-item';

import '../oscd-filter-button.js';
import { SelectedItemsChangedEvent } from '../oscd-filter-button.js';

import './ied/ied-container.js';
import './ied/element-path.js';

import {
  compareNames,
  getDescriptionAttribute,
  getNameAttribute,
} from '../foundation.js';
import { Nsdoc } from '../foundation/nsdoc.js';
import { nothing } from 'lit-html';

/** An editor [[`plugin`]] for editing the `IED` section. */
export default class IedPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  /** All the nsdoc files that are being uploaded via the settings. */
  @property()
  nsdoc!: Nsdoc;

  @property()
  selectedIEDs: string[] = [];

  @property()
  selectedLNClasses: string[] = [];

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);

    // When the document is updated, we reset the selected IED.
    if (_changedProperties.has('doc')) {
      const iedList = this.iedList;
      if (iedList.length > 0) {
        const iedName = getNameAttribute(iedList[0]);
        if (iedName) {
          this.selectedIEDs = [iedName];
        }
      }
    }

    if (
      _changedProperties.has('doc') ||
      _changedProperties.has('selectedIEDs')
    ) {
      this.selectedLNClasses = this.lnClassList.map(
        lnClassInfo => lnClassInfo[0]
      );
    }
  }

  private get iedList(): Element[] {
    return this.doc
      ? Array.from(this.doc.querySelectorAll(':root > IED')).sort((a, b) =>
          compareNames(a, b)
        )
      : [];
  }

  private get lnClassList(): string[][] {
    const currentIed = this.getSelectedIed();
    const uniqueLNClassList: string[] = [];
    if (currentIed) {
      return Array.from(currentIed.querySelectorAll('LN0, LN'))
        .filter(element => element.getAttribute('lnClass'))
        .filter(element => {
          const lnClass = element.getAttribute('lnClass') ?? '';
          if (uniqueLNClassList.includes(lnClass)) {
            return false;
          }
          uniqueLNClassList.push(lnClass);
          return true;
        })
        .map(element => {
          const lnClass = element.getAttribute('lnClass');
          const label = this.nsdoc.getDataDescription(element).label;
          return [lnClass, label];
        }) as string[][];
    }
    return [];
  }

  @state()
  private getSelectedIed(): Element | undefined {
    // When there is no IED selected, or the selected IED has no parent (IED has been removed)
    // select the first IED from the List.
    if (this.selectedIEDs.length >= 1) {
      const iedList = this.iedList;
      return iedList.filter(element => {
        const iedName = getNameAttribute(element);
        return this.selectedIEDs[0] === iedName;
      })[0];
    }
    return undefined;
  }

  render(): TemplateResult {
    const iedList = this.iedList;
    if (iedList.length > 0) {
      return html`<section>
        <div class="header">
          <h1>${translate('filter')}</h1>

          <oscd-filter-button
            .header=${translate('iededitor.iedSelector')}
            .selectedItems=${this.selectedIEDs}
            @selected-items-changed="${(e: SelectedItemsChangedEvent) =>
              (this.selectedIEDs = e.detail.selectedItems)}"
            icon="developer_board"
          >
            ${iedList.map(ied => {
              const name = getNameAttribute(ied);
              const descr = getDescriptionAttribute(ied);
              const type = ied.getAttribute('type');
              const manufacturer = ied.getAttribute('manufacturer');
              return html` <mwc-radio-list-item
                value="${name}"
                ?twoline="${type && manufacturer}"
                ?selected="${this.selectedIEDs.includes(name ?? '')}"
              >
                ${name} ${descr ? html` (${descr})` : html``}
                <span slot="secondary">
                  ${type} ${type && manufacturer ? html`&mdash;` : nothing}
                  ${manufacturer}
                </span>
              </mwc-radio-list-item>`;
            })}
          </oscd-filter-button>

          <oscd-filter-button
            .header="${translate('iededitor.lnFilter')}"
            .selectedItems=${this.selectedLNClasses}
            @selected-items-changed="${(e: SelectedItemsChangedEvent) =>
              (this.selectedLNClasses = e.detail.selectedItems)}"
            icon="smart_button"
            multi="true"
          >
            ${this.lnClassList.map(lnClassInfo => {
              const value = lnClassInfo[0];
              const label = lnClassInfo[1];
              return html`<mwc-check-list-item
                value="${value}"
                ?selected="${this.selectedLNClasses.includes(value)}"
              >
                ${label}
              </mwc-check-list-item>`;
            })}
          </oscd-filter-button>

          <element-path class="elementPath"></element-path>
        </div>
        <ied-container
          .doc=${this.doc}
          .element=${this.getSelectedIed()}
          .selectedLNClasses=${this.selectedLNClasses}
          .nsdoc=${this.nsdoc}
        ></ied-container>
      </section>`;
    }
    return html`<h1>
      <span style="color: var(--base1)">${translate('iededitor.missing')}</span>
    </h1>`;
  }

  static styles = css`
    :host {
      width: 100vw;
    }

    section {
      padding: 8px 12px 16px;
    }

    oscd-filter-button {
      padding-left: 20px;
    }

    .header {
      display: flex;
    }

    .elementPath {
      margin-left: auto;
      padding-right: 12px;
    }

    h1 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
    }
  `;
}
