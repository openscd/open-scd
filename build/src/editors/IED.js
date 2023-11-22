var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorate = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
import {
  css,
  html,
  LitElement,
  property,
  state
} from "../../_snowpack/pkg/lit-element.js";
import {translate} from "../../_snowpack/pkg/lit-translate.js";
import {nothing} from "../../_snowpack/pkg/lit-html.js";
import "../../_snowpack/pkg/@material/mwc-list/mwc-check-list-item.js";
import "../../_snowpack/pkg/@material/mwc-list/mwc-radio-list-item.js";
import "../oscd-filter-button.js";
import "./ied/ied-container.js";
import "./ied/element-path.js";
import {
  compareNames,
  getDescriptionAttribute,
  getNameAttribute
} from "../foundation.js";
import {getIcon} from "../icons/icons.js";
export default class IedPlugin extends LitElement {
  constructor() {
    super(...arguments);
    this.selectedIEDs = [];
    this.selectedLNClasses = [];
  }
  get iedList() {
    return this.doc ? Array.from(this.doc.querySelectorAll(":root > IED")).sort((a, b) => compareNames(a, b)) : [];
  }
  get lnClassList() {
    const currentIed = this.selectedIed;
    const uniqueLNClassList = [];
    if (currentIed) {
      return Array.from(currentIed.querySelectorAll("LN0, LN")).filter((element) => element.hasAttribute("lnClass")).filter((element) => {
        const lnClass = element.getAttribute("lnClass") ?? "";
        if (uniqueLNClassList.includes(lnClass)) {
          return false;
        }
        uniqueLNClassList.push(lnClass);
        return true;
      }).map((element) => {
        const lnClass = element.getAttribute("lnClass");
        const label = this.nsdoc.getDataDescription(element).label;
        return [lnClass, label];
      });
    }
    return [];
  }
  get selectedIed() {
    if (this.selectedIEDs.length >= 1) {
      const iedList = this.iedList;
      return iedList.find((element) => {
        const iedName = getNameAttribute(element);
        return this.selectedIEDs[0] === iedName;
      });
    }
    return void 0;
  }
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("doc") || _changedProperties.has("nsdoc")) {
      this.selectedIEDs = [];
      this.selectedLNClasses = [];
      const iedList = this.iedList;
      if (iedList.length > 0) {
        const iedName = getNameAttribute(iedList[0]);
        if (iedName) {
          this.selectedIEDs = [iedName];
        }
      }
      this.selectedLNClasses = this.lnClassList.map((lnClassInfo) => lnClassInfo[0]);
    }
  }
  render() {
    const iedList = this.iedList;
    if (iedList.length > 0) {
      return html`<section>
        <div class="header">
          <h1>${translate("filters")}:</h1>

          <oscd-filter-button
            id="iedFilter"
            icon="developer_board"
            .header=${translate("iededitor.iedSelector")}
            @selected-items-changed="${(e) => {
        this.selectedIEDs = e.detail.selectedItems;
        this.selectedLNClasses = this.lnClassList.map((lnClassInfo) => lnClassInfo[0]);
        this.requestUpdate("selectedIed");
      }}"
          >
            ${iedList.map((ied) => {
        const name = getNameAttribute(ied);
        const descr = getDescriptionAttribute(ied);
        const type = ied.getAttribute("type");
        const manufacturer = ied.getAttribute("manufacturer");
        return html` <mwc-radio-list-item
                value="${name}"
                ?twoline="${type && manufacturer}"
                ?selected="${this.selectedIEDs.includes(name ?? "")}"
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
            id="lnClassesFilter"
            multi="true"
            .header="${translate("iededitor.lnFilter")}"
            @selected-items-changed="${(e) => {
        this.selectedLNClasses = e.detail.selectedItems;
        this.requestUpdate("selectedIed");
      }}"
          >
            <span slot="icon">${getIcon("lNIcon")}</span>
            ${this.lnClassList.map((lnClassInfo) => {
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
          .element=${this.selectedIed}
          .selectedLNClasses=${this.selectedLNClasses}
          .nsdoc=${this.nsdoc}
        ></ied-container>
      </section>`;
    }
    return html`<h1>
      <span style="color: var(--base1)">${translate("iededitor.missing")}</span>
    </h1>`;
  }
}
IedPlugin.styles = css`
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
], IedPlugin.prototype, "doc", 2);
__decorate([
  property()
], IedPlugin.prototype, "nsdoc", 2);
__decorate([
  state()
], IedPlugin.prototype, "selectedIEDs", 2);
__decorate([
  state()
], IedPlugin.prototype, "selectedLNClasses", 2);
__decorate([
  state()
], IedPlugin.prototype, "iedList", 1);
__decorate([
  state()
], IedPlugin.prototype, "lnClassList", 1);
__decorate([
  state()
], IedPlugin.prototype, "selectedIed", 1);
