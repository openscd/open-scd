import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { css, customElement, html, property, } from '../../../../_snowpack/pkg/lit-element.js';
import '../../../../_snowpack/pkg/@material/mwc-icon-button.js';
import './connectedap-editor.js';
import { compareNames, newWizardEvent, } from '../../../../openscd/src/foundation.js';
import { get } from '../../../../_snowpack/pkg/lit-translate.js';
import { createConnectedApWizard } from './wizards/connectedap.js';
import { Base104Container } from './base-container.js';
import { getTypeAttribute } from './foundation/foundation.js';
/** [[`104`]] subeditor for a `SubNetwork` element. */
let SubNetwork104Container = class SubNetwork104Container extends Base104Container {
    get bitrate() {
        const bitRate = this.element.querySelector('BitRate');
        if (bitRate === null)
            return null;
        const bitRateValue = bitRate.textContent ?? '';
        const m = bitRate.getAttribute('multiplier');
        const unit = m === null ? 'b/s' : ' ' + m + 'b/s';
        return bitRateValue ? bitRateValue + unit : null;
    }
    openConnectedAPwizard() {
        this.dispatchEvent(newWizardEvent(createConnectedApWizard(this.element)));
    }
    renderIedContainer() {
        return Array.from(this.element.querySelectorAll(':scope > ConnectedAP'))
            .map(connAP => connAP.getAttribute('iedName'))
            .filter((v, i, a) => a.indexOf(v) === i)
            .sort(compareNames)
            .map(iedName => html ` <action-pane id="iedSection" label="${iedName}">
          ${Array.from(this.element.parentElement?.querySelectorAll(`:scope > SubNetwork > ConnectedAP[iedName="${iedName}"]`) ?? []).map(connectedAP => html `<connectedap-104-editor
                class="${connectedAP.parentElement !== this.element
            ? 'disabled'
            : ''}"
                .editCount=${this.editCount}
                .doc="${this.doc}"
                .element=${connectedAP}
              ></connectedap-104-editor>`)}
        </action-pane>`);
    }
    subNetworkSpecs() {
        const type = getTypeAttribute(this.element) ?? null;
        if (!type && !this.bitrate)
            return '';
        return `(${type}${type && this.bitrate ? ` — ${this.bitrate}` : ``})`;
    }
    header() {
        const desc = this.element.getAttribute('desc') ?? null;
        const name = this.element.getAttribute('name') ?? undefined;
        return ` ${name} ${desc === null ? '' : `— ${desc}`}
    ${this.subNetworkSpecs()}`;
    }
    render() {
        return html `<action-pane label="${this.header()}">
      <abbr slot="action" title="${get('add')}">
        <mwc-icon-button
          icon="playlist_add"
          @click="${() => this.openConnectedAPwizard()}"
        ></mwc-icon-button>
      </abbr>
      <div id="iedContainer">${this.renderIedContainer()}</div>
    </action-pane> `;
    }
};
SubNetwork104Container.styles = css `
    #iedContainer {
      display: grid;
      box-sizing: border-box;
      gap: 12px;
      padding: 8px 12px 16px;
      grid-template-columns: repeat(auto-fit, minmax(150px, auto));
    }

    #iedSection:not(:focus):not(:focus-within) .disabled {
      display: none;
    }

    #iedSection .disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  `;
__decorate([
    property({ attribute: false })
], SubNetwork104Container.prototype, "element", void 0);
SubNetwork104Container = __decorate([
    customElement('subnetwork-104-container')
], SubNetwork104Container);
export { SubNetwork104Container };
//# sourceMappingURL=subnetwork-container.js.map