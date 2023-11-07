import {
  css,
  customElement,
  html,
  LitElement,
  property,
  TemplateResult,
} from 'lit-element';
import { translate } from 'lit-translate';

import '@material/mwc-formfield';
import '@material/mwc-checkbox';

import '../../wizard-checkbox.js';
import '../../wizard-select.js';
import '../../wizard-textfield.js';

import { identity } from '../../foundation.js';
import { maxLength, patterns } from '../../wizards/foundation/limits.js';
import { typeNullable, typePattern } from '../../wizards/foundation/p-types.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

@customElement('gse-control-element-editor')
export class GseControlElementEditor extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property({ attribute: false })
  doc!: XMLDocument;
  /** The element being edited as provided to plugins by [[`OpenSCD`]]. */
  @property({ attribute: false })
  element!: Element;
  @property({ attribute: false })
  get gSE(): Element | null | undefined {
    const cbName = this.element.getAttribute('name');
    const iedName = this.element.closest('IED')?.getAttribute('name');
    const apName = this.element.closest('AccessPoint')?.getAttribute('name');
    const ldInst = this.element.closest('LDevice')?.getAttribute('inst');

    return this.element.ownerDocument.querySelector(
      `:root > Communication > SubNetwork > ` +
        `ConnectedAP[iedName="${iedName}"][apName="${apName}"] > ` +
        `GSE[ldInst="${ldInst}"][cbName="${cbName}"]`
    );
  }

  private renderGseContent(): TemplateResult {
    const gSE = this.gSE;
    if (!gSE)
      return html`<div class="content">
        <h3>
          <div>Communication Settings (GSE)</div>
          <div class="headersubtitle">No connection to SubNetwork</div>
        </h3>
      </div>`;

    const minTime = gSE.querySelector('MinTime')?.innerHTML.trim() ?? null;
    const maxTime = gSE.querySelector('MaxTime')?.innerHTML.trim() ?? null;

    const hasInstType = Array.from(gSE.querySelectorAll('Address > P')).some(
      pType => pType.getAttribute('xsi:type')
    );

    const attributes: Record<string, string | null> = {};

    ['MAC-Address', 'APPID', 'VLAN-ID', 'VLAN-PRIORITY'].forEach(key => {
      if (!attributes[key])
        attributes[key] =
          gSE.querySelector(`Address > P[type="${key}"]`)?.innerHTML.trim() ??
          null;
    });

    return html`<div class="content">
      <h3>Communication Settings (GSE)</h3>
      <mwc-formfield
        label="${translate('connectedap.wizard.addschemainsttype')}"
        ><mwc-checkbox
          id="instType"
          ?checked="${hasInstType}"
          disabled
        ></mwc-checkbox></mwc-formfield
      >${Object.entries(attributes).map(
        ([key, value]) =>
          html`<wizard-textfield
            label="${key}"
            ?nullable=${typeNullable[key]}
            .maybeValue=${value}
            pattern="${ifDefined(typePattern[key])}"
            required
            disabled
          ></wizard-textfield>`
      )}<wizard-textfield
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

  private renderGseControlContent(): TemplateResult {
    const [name, desc, type, appID, fixedOffs, securityEnabled] = [
      'name',
      'desc',
      'type',
      'appID',
      'fixedOffs',
      'securityEnabled',
    ].map(attr => this.element?.getAttribute(attr));

    return html`<div class="content">
      <wizard-textfield
        label="name"
        .maybeValue=${name}
        helper="${translate('scl.name')}"
        required
        validationMessage="${translate('textfield.required')}"
        pattern="${patterns.asciName}"
        maxLength="${maxLength.cbName}"
        dialogInitialFocus
        disabled
      ></wizard-textfield>
      <wizard-textfield
        label="desc"
        .maybeValue=${desc}
        nullable
        helper="${translate('scl.desc')}"
        disabled
      ></wizard-textfield>
      <wizard-select
        label="type"
        .maybeValue=${type}
        helper="${translate('scl.type')}"
        nullable
        required
        disabled
        >${['GOOSE', 'GSSE'].map(
          type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`
        )}</wizard-select
      >
      <wizard-textfield
        label="appID"
        .maybeValue=${appID}
        helper="${translate('scl.id')}"
        required
        validationMessage="${translate('textfield.nonempty')}"
        disabled
      ></wizard-textfield>
      <wizard-checkbox
        label="fixedOffs"
        .maybeValue=${fixedOffs}
        nullable
        helper="${translate('scl.fixedOffs')}"
        disabled
      ></wizard-checkbox>
      <wizard-select
        label="securityEnabled"
        .maybeValue=${securityEnabled}
        nullable
        required
        helper="${translate('scl.securityEnable')}"
        disabled
        >${['None', 'Signature', 'SignatureAndEncryption'].map(
          type => html`<mwc-list-item value="${type}">${type}</mwc-list-item>`
        )}</wizard-select
      >
    </div>`;
  }

  render(): TemplateResult {
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

  static styles = css`
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
}
