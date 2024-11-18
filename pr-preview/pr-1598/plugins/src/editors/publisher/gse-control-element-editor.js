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
  LitElement,
  property
} from "../../../../_snowpack/pkg/lit-element.js";
import {get} from "../../../../_snowpack/pkg/lit-translate.js";
import "../../../../_snowpack/pkg/@material/mwc-formfield.js";
import "../../../../_snowpack/pkg/@material/mwc-checkbox.js";
import "../../../../openscd/src/wizard-checkbox.js";
import "../../../../openscd/src/wizard-select.js";
import "../../../../openscd/src/wizard-textfield.js";
import {identity} from "../../../../openscd/src/foundation.js";
import {maxLength, patterns} from "../../wizards/foundation/limits.js";
import {typeNullable, typePattern} from "../../wizards/foundation/p-types.js";
import {ifDefined} from "../../../../_snowpack/pkg/lit-html/directives/if-defined.js";
export let GseControlElementEditor = class extends LitElement {
  get gSE() {
    const cbName = this.element.getAttribute("name");
    const iedName = this.element.closest("IED")?.getAttribute("name");
    const apName = this.element.closest("AccessPoint")?.getAttribute("name");
    const ldInst = this.element.closest("LDevice")?.getAttribute("inst");
    return this.element.ownerDocument.querySelector(`:root > Communication > SubNetwork > ConnectedAP[iedName="${iedName}"][apName="${apName}"] > GSE[ldInst="${ldInst}"][cbName="${cbName}"]`);
  }
  renderGseContent() {
    const gSE = this.gSE;
    if (!gSE)
      return html`<div class="content">
        <h3>
          <div>Communication Settings (GSE)</div>
          <div class="headersubtitle">No connection to SubNetwork</div>
        </h3>
      </div>`;
    const minTime = gSE.querySelector("MinTime")?.innerHTML.trim() ?? null;
    const maxTime = gSE.querySelector("MaxTime")?.innerHTML.trim() ?? null;
    const hasInstType = Array.from(gSE.querySelectorAll("Address > P")).some((pType) => pType.getAttribute("xsi:type"));
    const attributes = {};
    ["MAC-Address", "APPID", "VLAN-ID", "VLAN-PRIORITY"].forEach((key) => {
      if (!attributes[key])
        attributes[key] = gSE.querySelector(`Address > P[type="${key}"]`)?.innerHTML.trim() ?? null;
    });
    return html`<div class="content">
      <h3>Communication Settings (GSE)</h3>
      <mwc-formfield label="${get("connectedap.wizard.addschemainsttype")}"
        ><mwc-checkbox
          id="instType"
          ?checked="${hasInstType}"
          disabled
        ></mwc-checkbox></mwc-formfield
      >${Object.entries(attributes).map(([key, value]) => html`<wizard-textfield
            label="${key}"
            ?nullable=${typeNullable[key]}
            .maybeValue=${value}
            pattern="${ifDefined(typePattern[key])}"
            required
            disabled
          ></wizard-textfield>`)}<wizard-textfield
        label="MinTime"
        .maybeValue=${minTime}
        nullable
        suffix="ms"
        type="number"
        disabled
      ></wizard-textfield
      ><wizard-textfield
        label="MaxTime"
        .maybeValue=${maxTime}
        nullable
        suffix="ms"
        type="number"
        disabled
      ></wizard-textfield>
    </div>`;
  }
  renderGseControlContent() {
    const [name, desc, type, appID, fixedOffs, securityEnabled] = [
      "name",
      "desc",
      "type",
      "appID",
      "fixedOffs",
      "securityEnabled"
    ].map((attr) => this.element?.getAttribute(attr));
    return html`<div class="content">
      <wizard-textfield
        label="name"
        .maybeValue=${name}
        helper="${get("scl.name")}"
        required
        validationMessage="${get("textfield.required")}"
        pattern="${patterns.asciName}"
        maxLength="${maxLength.cbName}"
        dialogInitialFocus
        disabled
      ></wizard-textfield>
      <wizard-textfield
        label="desc"
        .maybeValue=${desc}
        nullable
        helper="${get("scl.desc")}"
        disabled
      ></wizard-textfield>
      <wizard-select
        label="type"
        .maybeValue=${type}
        helper="${get("scl.type")}"
        nullable
        required
        disabled
        >${["GOOSE", "GSSE"].map((type2) => html`<mwc-list-item value="${type2}">${type2}</mwc-list-item>`)}</wizard-select
      >
      <wizard-textfield
        label="appID"
        .maybeValue=${appID}
        helper="${get("scl.id")}"
        required
        validationMessage="${get("textfield.nonempty")}"
        disabled
      ></wizard-textfield>
      <wizard-checkbox
        label="fixedOffs"
        .maybeValue=${fixedOffs}
        nullable
        helper="${get("scl.fixedOffs")}"
        disabled
      ></wizard-checkbox>
      <wizard-select
        label="securityEnabled"
        .maybeValue=${securityEnabled}
        nullable
        required
        helper="${get("scl.securityEnable")}"
        disabled
        >${["None", "Signature", "SignatureAndEncryption"].map((type2) => html`<mwc-list-item value="${type2}">${type2}</mwc-list-item>`)}</wizard-select
      >
    </div>`;
  }
  render() {
    return html`<h2 style="display: flex;">
        <div style="flex:auto">
          <div>GSEControl</div>
          <div class="headersubtitle">${identity(this.element)}</div>
        </div>
      </h2>
      <div class="parentcontent">
        ${this.renderGseControlContent()}${this.renderGseContent()}
      </div>`;
  }
};
GseControlElementEditor.styles = css`
    .parentcontent {
      display: grid;
      grid-gap: 12px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(316px, auto));
    }

    .content {
      border-left: thick solid var(--mdc-theme-on-primary);
    }

    .content > * {
      display: block;
      margin: 4px 8px 16px;
    }

    h2,
    h3 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      margin: 4px 8px 16px;
      padding-left: 0.3em;
    }

    .headersubtitle {
      font-size: 16px;
      font-weight: 200;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    *[iconTrailing='search'] {
      --mdc-shape-small: 28px;
    }

    @media (max-width: 950px) {
      .content {
        border-left: 0px solid var(--mdc-theme-on-primary);
      }
    }
  `;
__decorate([
  property({attribute: false})
], GseControlElementEditor.prototype, "doc", 2);
__decorate([
  property({attribute: false})
], GseControlElementEditor.prototype, "element", 2);
__decorate([
  property({attribute: false})
], GseControlElementEditor.prototype, "gSE", 1);
GseControlElementEditor = __decorate([
  customElement("gse-control-element-editor")
], GseControlElementEditor);
