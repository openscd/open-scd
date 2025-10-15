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
  html,
  state,
  query,
  customElement,
  LitElement,
  property
} from "../../../_snowpack/pkg/lit-element.js";
import "../wizard-dialog.js";
export let OscdWizards = class extends LitElement {
  constructor() {
    super(...arguments);
    this.workflow = [];
  }
  onWizard(we) {
    const wizard = we.detail.wizard;
    if (wizard === null)
      this.workflow.shift();
    else if (we.detail.subwizard)
      this.workflow.unshift(wizard);
    else
      this.workflow.push(wizard);
    this.requestUpdate("workflow");
    this.updateComplete.then(() => this.wizardUI.updateComplete.then(() => this.wizardUI.dialog?.updateComplete.then(() => this.wizardUI.dialog?.focus())));
  }
  connectedCallback() {
    super.connectedCallback();
    this.host.addEventListener("wizard", this.onWizard.bind(this));
    this.host.addEventListener("editor-action", () => this.wizardUI.requestUpdate());
  }
  render() {
    return html`<slot></slot>
      <wizard-dialog .wizard=${this.workflow[0]?.() ?? []}></wizard-dialog>`;
  }
};
__decorate([
  property({
    type: Object
  })
], OscdWizards.prototype, "host", 2);
__decorate([
  state()
], OscdWizards.prototype, "workflow", 2);
__decorate([
  query("wizard-dialog")
], OscdWizards.prototype, "wizardUI", 2);
OscdWizards = __decorate([
  customElement("oscd-wizards")
], OscdWizards);
