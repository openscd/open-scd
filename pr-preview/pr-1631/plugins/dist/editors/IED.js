import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { css, html, LitElement, property, state, } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import { nothing } from '../../../_snowpack/pkg/lit-html.js';
import '../../../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js';
import '../../../_snowpack/pkg/@material/mwc-list/mwc-radio-list-item.js';
import '../../../openscd/src/oscd-filter-button.js';
import './ied/ied-container.js';
import './ied/element-path.js';
import { compareNames, getDescriptionAttribute, getNameAttribute, } from '../../../openscd/src/foundation.js';
import { getIcon } from '../../../openscd/src/icons/icons.js';
/** An editor [[`plugin`]] for editing the `IED` section. */
export default class IedPlugin extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
        this.selectedIEDs = [];
        this.selectedLNClasses = [];
        this.lNClassListOpenedOnce = false;
    }
    get iedList() {
        return this.doc
            ? Array.from(this.doc.querySelectorAll(':root > IED')).sort((a, b) => compareNames(a, b))
            : [];
    }
    get lnClassList() {
        const currentIed = this.selectedIed;
        const uniqueLNClassList = [];
        if (currentIed) {
            return Array.from(currentIed.querySelectorAll('LN0, LN'))
                .filter(element => element.hasAttribute('lnClass'))
                .filter(element => {
                const lnClass = element.getAttribute('lnClass') ?? '';
                if (uniqueLNClassList.includes(lnClass)) {
                    return false;
                }
                uniqueLNClassList.push(lnClass);
                return true;
            })
                .sort((a, b) => {
                const aLnClass = a.getAttribute('lnClass') ?? '';
                const bLnClass = b.getAttribute('lnClass') ?? '';
                return aLnClass.localeCompare(bLnClass);
            })
                .map(element => {
                const lnClass = element.getAttribute('lnClass');
                const label = this.nsdoc.getDataDescription(element).label;
                return [lnClass, label];
            });
        }
        return [];
    }
    get selectedIed() {
        // When there is no IED selected, or the selected IED has no parent (IED has been removed)
        // select the first IED from the List.
        if (this.selectedIEDs.length >= 1) {
            const iedList = this.iedList;
            return iedList.find(element => {
                const iedName = getNameAttribute(element);
                return this.selectedIEDs[0] === iedName;
            });
        }
        return undefined;
    }
    updated(_changedProperties) {
        super.updated(_changedProperties);
        // When the document is updated, we reset the selected IED if it no longer exists
        const isDocumentUpdated = _changedProperties.has('doc') ||
            _changedProperties.has('editCount') ||
            _changedProperties.has('nsdoc');
        if (isDocumentUpdated) {
            // if the IED exists, retain selection
            const iedExists = this.doc?.querySelector(`IED[name="${this.selectedIEDs[0]}"]`);
            if (iedExists)
                return;
            this.selectedIEDs = [];
            this.selectedLNClasses = [];
            this.lNClassListOpenedOnce = false;
            const iedList = this.iedList;
            if (iedList.length > 0) {
                const iedName = getNameAttribute(iedList[0]);
                if (iedName) {
                    this.selectedIEDs = [iedName];
                }
            }
        }
    }
    calcSelectedLNClasses() {
        const somethingSelected = this.selectedLNClasses.length > 0;
        const lnClasses = this.lnClassList.map(lnClassInfo => lnClassInfo[0]);
        let selectedLNClasses = lnClasses;
        if (somethingSelected) {
            selectedLNClasses = lnClasses.filter(lnClass => this.selectedLNClasses.includes(lnClass));
        }
        return selectedLNClasses;
    }
    render() {
        const iedList = this.iedList;
        if (iedList.length > 0) {
            return html `<section>
        <div class="header">
          <h1>${get('filters')}:</h1>

          <oscd-filter-button
            id="iedFilter"
            icon="developer_board"
            .header=${get('iededitor.iedSelector')}
            @selected-items-changed="${(e) => {
                const equalArrays = (first, second) => {
                    return (first.length === second.length &&
                        first.every((val, index) => val === second[index]));
                };
                const selectionChanged = !equalArrays(this.selectedIEDs, e.detail.selectedItems);
                if (!selectionChanged) {
                    return;
                }
                this.lNClassListOpenedOnce = false;
                this.selectedIEDs = e.detail.selectedItems;
                this.selectedLNClasses = [];
                this.requestUpdate('selectedIed');
            }}"
          >
            ${iedList.map(ied => {
                const name = getNameAttribute(ied);
                const descr = getDescriptionAttribute(ied);
                const type = ied.getAttribute('type');
                const manufacturer = ied.getAttribute('manufacturer');
                return html ` <mwc-radio-list-item
                value="${name}"
                ?twoline="${type && manufacturer}"
                ?selected="${this.selectedIEDs.includes(name ?? '')}"
              >
                ${name} ${descr ? html ` (${descr})` : html ``}
                <span slot="secondary">
                  ${type} ${type && manufacturer ? html `&mdash;` : nothing}
                  ${manufacturer}
                </span>
              </mwc-radio-list-item>`;
            })}
          </oscd-filter-button>

          <oscd-filter-button
            id="lnClassesFilter"
            multi="true"
            .header="${get('iededitor.lnFilter')}"
            @selected-items-changed="${(e) => {
                this.selectedLNClasses = e.detail.selectedItems;
                this.requestUpdate('selectedIed');
            }}"
          >
            <span slot="icon">${getIcon('lNIcon')}</span>
            ${this.lnClassList.map(lnClassInfo => {
                const value = lnClassInfo[0];
                const label = lnClassInfo[1];
                return html `<mwc-check-list-item
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
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${this.selectedIed}
          .selectedLNClasses=${this.calcSelectedLNClasses()}
          .nsdoc=${this.nsdoc}
        ></ied-container>
      </section>`;
        }
        return html `<h1>
      <span style="color: var(--base1)">${get('iededitor.missing')}</span>
    </h1>`;
    }
}
IedPlugin.styles = css `
    :host {
      width: 100vw;
    }

    section {
      padding: 8px 12px 16px;
    }

    .header {
      display: flex;
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

    .elementPath {
      margin-left: auto;
      padding-right: 12px;
    }
  `;
__decorate([
    property()
], IedPlugin.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], IedPlugin.prototype, "editCount", void 0);
__decorate([
    property()
], IedPlugin.prototype, "nsdoc", void 0);
__decorate([
    state()
], IedPlugin.prototype, "selectedIEDs", void 0);
__decorate([
    state()
], IedPlugin.prototype, "selectedLNClasses", void 0);
__decorate([
    state()
], IedPlugin.prototype, "iedList", null);
__decorate([
    state()
], IedPlugin.prototype, "lnClassList", null);
__decorate([
    state()
], IedPlugin.prototype, "selectedIed", null);
//# sourceMappingURL=IED.js.map