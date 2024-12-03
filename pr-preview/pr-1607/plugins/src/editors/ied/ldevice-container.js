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
  query,
  state
} from "../../../../_snowpack/pkg/lit-element.js";
import {nothing} from "../../../../_snowpack/pkg/lit-html.js";
import {get} from "../../../../_snowpack/pkg/lit-translate.js";
import {
  getDescriptionAttribute,
  getInstanceAttribute,
  getNameAttribute,
  getLdNameAttribute,
  newWizardEvent
} from "../../../../openscd/src/foundation.js";
import {logicalDeviceIcon} from "../../../../openscd/src/icons/ied-icons.js";
import "../../../../openscd/src/action-pane.js";
import "./ln-container.js";
import {wizards} from "../../wizards/wizard-library.js";
import {Container} from "./foundation.js";
export let LDeviceContainer = class extends Container {
  constructor() {
    super(...arguments);
    this.selectedLNClasses = [];
  }
  openEditWizard() {
    const wizard = wizards["LDevice"].edit(this.element);
    if (wizard)
      this.dispatchEvent(newWizardEvent(wizard));
  }
  header() {
    const nameOrInst = getNameAttribute(this.element) ?? getInstanceAttribute(this.element);
    const desc = getDescriptionAttribute(this.element);
    const ldName = getLdNameAttribute(this.element);
    return html`${nameOrInst}${desc ? html` &mdash; ${desc}` : nothing}${ldName ? html` &mdash; ${ldName}` : nothing}`;
  }
  firstUpdated() {
    this.requestUpdate();
  }
  updated(_changedProperties) {
    super.updated(_changedProperties);
    if (_changedProperties.has("selectedLNClasses")) {
      this.requestUpdate("lnElements");
    }
  }
  get lnElements() {
    return Array.from(this.element.querySelectorAll(":scope > LN,LN0")).filter((element) => {
      const lnClass = element.getAttribute("lnClass") ?? "";
      return this.selectedLNClasses.includes(lnClass);
    });
  }
  render() {
    const lnElements = this.lnElements;
    return html`<action-pane .label="${this.header()}">
      <mwc-icon slot="icon">${logicalDeviceIcon}</mwc-icon>
      <abbr slot="action" title="${get("edit")}">
        <mwc-icon-button
          icon="edit"
          @click=${() => this.openEditWizard()}
        ></mwc-icon-button>
      </abbr>
      ${lnElements.length > 0 ? html`<abbr
            slot="action"
            title="${get("iededitor.toggleChildElements")}"
          >
            <mwc-icon-button-toggle
              on
              id="toggleButton"
              onIcon="keyboard_arrow_up"
              offIcon="keyboard_arrow_down"
              @click=${() => this.requestUpdate()}
            ></mwc-icon-button-toggle>
          </abbr>` : nothing}
      <div id="lnContainer">
        ${this.toggleButton?.on ? lnElements.map((ln) => html`<ln-container
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${ln}
                .nsdoc=${this.nsdoc}
                .ancestors=${[...this.ancestors, this.element]}
              ></ln-container> `) : nothing}
      </div>
    </action-pane>`;
  }
};
LDeviceContainer.styles = css`
    #lnContainer {
      display: grid;
      grid-gap: 12px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, auto));
    }

    abbr {
      text-decoration: none;
    }

    @media (max-width: 387px) {
      #lnContainer {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }
  `;
__decorate([
  property()
], LDeviceContainer.prototype, "selectedLNClasses", 2);
__decorate([
  query("#toggleButton")
], LDeviceContainer.prototype, "toggleButton", 2);
__decorate([
  state()
], LDeviceContainer.prototype, "lnElements", 1);
LDeviceContainer = __decorate([
  customElement("ldevice-container")
], LDeviceContainer);
