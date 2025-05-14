import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { LitElement, customElement, html, property, css, state, query, } from '../../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../../_snowpack/pkg/lit-translate.js';
import '../../../../_snowpack/pkg/@material/mwc-dialog.js';
import '../../../../_snowpack/pkg/@material/mwc-icon-button.js';
import './connectedap-editor.js';
import './gse-editor.js';
import './smv-editor.js';
import { newWizardEvent, compareNames, } from '../../../../openscd/src/foundation.js';
import { newActionEvent } from '../../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js';
import { createConnectedApWizard } from '../../wizards/connectedap.js';
import { wizards } from '../../wizards/wizard-library.js';
import { getAllConnectedAPsOfSameIED } from './foundation.js';
/** [[`Communication`]] subeditor for a `SubNetwork` element. */
let SubNetworkEditor = class SubNetworkEditor extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
        this.moveTargetElement = null;
        this.newlySelectedAP = null;
    }
    /** SubNetwork attribute name */
    get name() {
        return this.element.getAttribute('name') ?? 'UNDEFINED';
    }
    /** SubNetwork attribute desc */
    get desc() {
        return this.element.getAttribute('desc') ?? null;
    }
    /** SubNetwork attribute type */
    get type() {
        return this.element.getAttribute('type') ?? null;
    }
    /** SubNetwork child elements BitRate label */
    get bitrate() {
        const bitRate = this.element.querySelector('BitRate');
        if (bitRate === null)
            return null;
        const bitRateValue = bitRate.textContent ?? '';
        const m = bitRate.getAttribute('multiplier');
        const unit = ` ${m ?? ''}b/s`;
        return bitRateValue ? bitRateValue + unit : null;
    }
    openConnectedAPwizard() {
        this.dispatchEvent(newWizardEvent(createConnectedApWizard(this.element)));
    }
    openEditWizard() {
        const wizard = wizards['SubNetwork'].edit(this.element);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    remove() {
        if (this.element)
            this.dispatchEvent(newActionEvent({
                old: {
                    parent: this.element.parentElement,
                    element: this.element,
                    reference: this.element.nextSibling,
                },
            }));
    }
    async openMoveDialog(e) {
        this.moveTargetElement = e.detail.element;
        this.newlySelectedAP = null;
        await this.updateComplete;
        this.moveDialog.show();
    }
    confirmMove() {
        if (this.moveTargetElement && this.newlySelectedAP) {
            const moveAction = {
                old: {
                    parent: this.moveTargetElement.parentElement,
                    element: this.moveTargetElement,
                    reference: null,
                },
                new: {
                    parent: this.newlySelectedAP,
                },
            };
            this.dispatchEvent(newActionEvent({
                actions: [moveAction],
                title: `Move ${this.moveTargetElement.tagName} to another ConnectedAP`,
            }));
        }
        this.moveDialog.close();
        this.moveTargetElement = null;
        this.newlySelectedAP = null;
    }
    renderSmvEditors(iedName) {
        return Array.from(this.element
            .closest('Communication')
            ?.querySelectorAll(`ConnectedAP[iedName="${iedName}"] > SMV`) ?? []).map(smv => html `<smv-editor
        class="${smv.closest('SubNetwork') !== this.element ? 'disabled' : ''}"
        .editCount=${this.editCount}
        .doc=${this.doc}
        .element=${smv}
        @request-smv-move=${(e) => this.openMoveDialog(e)}
      ></smv-editor>`);
    }
    renderGseEditors(iedName) {
        return Array.from(this.element
            .closest('Communication')
            ?.querySelectorAll(`ConnectedAP[iedName="${iedName}"] > GSE`) ?? []).map(gse => html `<gse-editor
        class="${gse.closest('SubNetwork') !== this.element ? 'disabled' : ''}"
        .editCount=${this.editCount}
        .doc=${this.doc}
        .element=${gse}
        @request-gse-move=${(e) => this.openMoveDialog(e)}
      ></gse-editor>`);
    }
    renderConnectedApEditors(iedName) {
        return Array.from(this.element.parentElement?.querySelectorAll(`:scope > SubNetwork > ConnectedAP[iedName="${iedName}"]`) ?? []).map(connectedAP => html `<connectedap-editor
          class="${connectedAP.parentElement !== this.element
            ? 'disabled'
            : ''}"
          .element=${connectedAP}
        ></connectedap-editor>`);
    }
    renderIEDs() {
        return Array.from(this.element.querySelectorAll(':scope > ConnectedAP'))
            .map(connAP => connAP.getAttribute('iedName'))
            .filter((v, i, a) => a.indexOf(v) === i)
            .sort(compareNames)
            .map(iedName => html ` <action-pane id="iedSection" label="${iedName}">
          ${this.renderConnectedApEditors(iedName)}${this.renderGseEditors(iedName)}${this.renderSmvEditors(iedName)}
        </action-pane>`);
    }
    renderSmvGseMoveDialog() {
        if (!this.moveTargetElement)
            return html ``;
        const allConnectedAPs = getAllConnectedAPsOfSameIED(this.moveTargetElement, this.doc);
        const currentConnectedAP = this.moveTargetElement.closest('ConnectedAP');
        return html `
      <mwc-dialog
        id="moveDialog"
        heading=${get('wizard.title.selectAp')}
        @closed=${() => {
            this.moveTargetElement = null;
            this.newlySelectedAP = null;
        }}
      >
        <mwc-list>
          ${allConnectedAPs.map(connectedAP => html `
              <mwc-list-item
                class=${connectedAP === this.newlySelectedAP ? 'selected' : ''}
                @click=${() => (this.newlySelectedAP = connectedAP)}
                ?selected=${connectedAP === this.newlySelectedAP}
                ?disabled=${connectedAP === currentConnectedAP}
              >
                ${connectedAP.getAttribute('iedName')} >
                ${connectedAP.getAttribute('apName')}
              </mwc-list-item>
            `)}
        </mwc-list>
        <mwc-button
          slot="primaryAction"
          icon="save"
          @click=${() => this.confirmMove()}
          ?disabled=${!this.newlySelectedAP}
        >
          ${get('save')}
        </mwc-button>
        <mwc-button
          slot="secondaryAction"
          dialogAction="close"
          style="--mdc-theme-primary: var(--mdc-theme-error)"
          >${get('close')}</mwc-button
        >
      </mwc-dialog>
    `;
    }
    subNetworkSpecs() {
        if (!this.type && !this.bitrate)
            return '';
        return `(${[this.type, this.bitrate].filter(text => !!text).join(' — ')})`;
    }
    header() {
        return `${this.name} ${this.desc === null ? '' : `— ${this.desc}`}
    ${this.subNetworkSpecs()}`;
    }
    render() {
        return html `<action-pane label="${this.header()}">
        <abbr slot="action" title="${get('edit')}">
          <mwc-icon-button
            icon="edit"
            @click=${() => this.openEditWizard()}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${get('remove')}">
          <mwc-icon-button
            icon="delete"
            @click=${() => this.remove()}
          ></mwc-icon-button>
        </abbr>
        <abbr slot="action" title="${get('add')}">
          <mwc-icon-button
            icon="playlist_add"
            @click="${() => this.openConnectedAPwizard()}"
          ></mwc-icon-button>
        </abbr>
        <div id="iedContainer">${this.renderIEDs()}</div>
      </action-pane>
      ${this.renderSmvGseMoveDialog()}`;
    }
};
SubNetworkEditor.styles = css `
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

    #iedSection:not(:focus):not(:focus-within) gse-editor {
      display: none;
    }

    #iedSection:not(:focus):not(:focus-within) smv-editor {
      display: none;
    }

    #iedSection .disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    abbr {
      text-decoration: none;
      border-bottom: none;
    }

    mwc-list-item[disabled] {
      color: var(--mdc-theme-text-disabled, #9e9e9e); /* Gray text */
      opacity: 0.6;
      pointer-events: none;
    }

    mwc-list-item.selected {
      background-color: var(--mdc-theme-primary);
      color: var(--mdc-theme-on-primary, #ffffff);
      font-weight: bold;
    }
  `;
__decorate([
    property({ attribute: false })
], SubNetworkEditor.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], SubNetworkEditor.prototype, "editCount", void 0);
__decorate([
    property({ attribute: false })
], SubNetworkEditor.prototype, "element", void 0);
__decorate([
    property({ type: String })
], SubNetworkEditor.prototype, "name", null);
__decorate([
    property({ type: String })
], SubNetworkEditor.prototype, "desc", null);
__decorate([
    property({ type: String })
], SubNetworkEditor.prototype, "type", null);
__decorate([
    property({ type: String })
], SubNetworkEditor.prototype, "bitrate", null);
__decorate([
    state()
], SubNetworkEditor.prototype, "moveTargetElement", void 0);
__decorate([
    state()
], SubNetworkEditor.prototype, "newlySelectedAP", void 0);
__decorate([
    query('#moveDialog')
], SubNetworkEditor.prototype, "moveDialog", void 0);
SubNetworkEditor = __decorate([
    customElement('subnetwork-editor')
], SubNetworkEditor);
export { SubNetworkEditor };
//# sourceMappingURL=subnetwork-editor.js.map