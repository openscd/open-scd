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
  customElement,
  html,
  property,
  query
} from "../../../../_snowpack/pkg/lit-element.js";
import {nothing} from "../../../../_snowpack/pkg/lit-html.js";
import {translate} from "../../../../_snowpack/pkg/lit-translate.js";
import "../../../../openscd/src/action-pane.js";
import "./access-point-container.js";
import "./add-access-point-dialog.js";
import {wizards} from "../../wizards/wizard-library.js";
import {Container, createAccessPoint, createServerAt} from "./foundation.js";
import {
  getDescriptionAttribute,
  getNameAttribute,
  newWizardEvent
} from "../../../../openscd/src/foundation.js";
import {newActionEvent} from "../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js";
import {newEditEventV2} from "../../../../_snowpack/link/packages/core/dist/foundation.js";
import {removeIEDWizard} from "../../wizards/ied.js";
import {editServicesWizard} from "../../wizards/services.js";
export let IedContainer = class extends Container {
  constructor() {
    super(...arguments);
    this.selectedLNClasses = [];
  }
  openEditWizard() {
    const wizard = wizards["IED"].edit(this.element);
    if (wizard)
      this.dispatchEvent(newWizardEvent(wizard));
  }
  createAccessPoint(data) {
    const inserts = [];
    const accessPoint = createAccessPoint(this.doc, data.name);
    inserts.push({
      parent: this.element,
      node: accessPoint,
      reference: null
    });
    if (data.createServerAt && data.serverAtApName) {
      const serverAt = createServerAt(this.doc, data.serverAtApName, data.serverAtDesc);
      inserts.push({
        parent: accessPoint,
        node: serverAt,
        reference: null
      });
    }
    this.dispatchEvent(newEditEventV2(inserts));
  }
  renderServicesIcon() {
    const services = this.element.querySelector("Services");
    if (!services) {
      return html``;
    }
    return html` <abbr slot="action" title="${translate("iededitor.settings")}">
      <mwc-icon-button
        icon="settings"
        @click=${() => this.openSettingsWizard(services)}
      ></mwc-icon-button>
    </abbr>`;
  }
  openSettingsWizard(services) {
    const wizard = editServicesWizard(services);
    if (wizard)
      this.dispatchEvent(newWizardEvent(wizard));
  }
  removeIED() {
    const wizard = removeIEDWizard(this.element);
    if (wizard) {
      this.dispatchEvent(newWizardEvent(() => wizard));
    } else {
      this.dispatchEvent(newActionEvent({
        old: {parent: this.element.parentElement, element: this.element}
      }));
    }
  }
  header() {
    const name = getNameAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);
    return html`${name}${desc ? html` &mdash; ${desc}` : nothing}`;
  }
  render() {
    return html` <action-pane .label="${this.header()}">
      <mwc-icon slot="icon">developer_board</mwc-icon>
      <abbr slot="action" title="${translate("remove")}">
        <mwc-icon-button
          icon="delete"
          @click=${() => this.removeIED()}
        ></mwc-icon-button>
      </abbr>
      <abbr slot="action" title="${translate("edit")}">
        <mwc-icon-button
          icon="edit"
          @click=${() => this.openEditWizard()}
        ></mwc-icon-button>
      </abbr>
      ${this.renderServicesIcon()}
      <abbr slot="action" title="${translate("iededitor.addAccessPoint")}">
        <mwc-icon-button
          icon="playlist_add"
          @click=${() => this.addAccessPointDialog.show()}
        ></mwc-icon-button>
      </abbr>
      ${Array.from(this.element.querySelectorAll(":scope > AccessPoint")).map((ap) => html`<access-point-container
          .editCount=${this.editCount}
          .doc=${this.doc}
          .element=${ap}
          .nsdoc=${this.nsdoc}
          .selectedLNClasses=${this.selectedLNClasses}
          .ancestors=${[this.element]}
        ></access-point-container>`)}
      <add-access-point-dialog
        .doc=${this.doc}
        .ied=${this.element}
        .onConfirm=${(data) => this.createAccessPoint(data)}
      ></add-access-point-dialog>
    </action-pane>`;
  }
};
IedContainer.styles = css`
    abbr {
      text-decoration: none;
      border-bottom: none;
    }
  `;
__decorate([
  property()
], IedContainer.prototype, "selectedLNClasses", 2);
__decorate([
  query("add-access-point-dialog")
], IedContainer.prototype, "addAccessPointDialog", 2);
IedContainer = __decorate([
  customElement("ied-container")
], IedContainer);
