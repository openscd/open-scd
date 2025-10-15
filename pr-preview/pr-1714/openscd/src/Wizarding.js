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
import {html, state, query} from "../../_snowpack/pkg/lit-element.js";
import {
  ifImplemented
} from "./foundation.js";
import "./wizard-dialog.js";
export function Wizarding(Base) {
  class WizardingElement extends Base {
    constructor(...args) {
      super(...args);
      this.workflow = [];
      this.addEventListener("wizard", this.onWizard);
      this.addEventListener("editor-action", () => this.wizardUI.requestUpdate());
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
    render() {
      return html`${ifImplemented(super.render())}
        <wizard-dialog .wizard=${this.workflow[0]?.() ?? []}></wizard-dialog>`;
    }
  }
  __decorate([
    state()
  ], WizardingElement.prototype, "workflow", 2);
  __decorate([
    query("wizard-dialog")
  ], WizardingElement.prototype, "wizardUI", 2);
  return WizardingElement;
}
