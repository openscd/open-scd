import { __decorate } from "../../../../_snowpack/pkg/tslib.js";
import { LitElement, html, property, customElement, css, query, } from '../../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../../_snowpack/pkg/lit-translate.js';
import '../../../../_snowpack/pkg/@material/mwc-icon-button.js';
import '../../../../_snowpack/pkg/@material/mwc-icon-button-toggle.js';
import './line-editor.js';
import './process-editor.js';
import './substation-editor.js';
import './ied-editor.js';
import { communicationMappingWizard } from '../../wizards/commmap-wizards.js';
import { gooseIcon, smvIcon, reportIcon, } from '../../../../openscd/src/icons/icons.js';
import { isPublic, newWizardEvent } from '../../../../openscd/src/foundation.js';
import { selectGseControlWizard } from '../../wizards/gsecontrol.js';
import { emptyWizard, wizards } from '../../wizards/wizard-library.js';
import { getAttachedIeds } from './foundation.js';
import { selectSampledValueControlWizard } from '../../wizards/sampledvaluecontrol.js';
import { selectReportControlWizard } from '../../wizards/reportcontrol.js';
import { tags } from '../../../../openscd/src/foundation.js';
function shouldShowIEDs() {
    return localStorage.getItem('showieds') === 'on';
}
function setShowIEDs(value) {
    localStorage.setItem('showieds', value);
}
function shouldShowFunctions() {
    return localStorage.getItem('showfunctions') === 'on';
}
function setShowFunctions(value) {
    localStorage.setItem('showfunctions', value);
}
function childTags(element) {
    if (!element)
        return [];
    return tags[element.tagName].children.filter(child => wizards[child].create !== emptyWizard);
}
/** [[`Zeroline`]] pane for displaying `Substation` and/or `IED` sections. */
let ZerolinePane = class ZerolinePane extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
        this.readonly = false;
        this.getAttachedIeds = () => [];
    }
    openCommunicationMapping() {
        const wizard = communicationMappingWizard(this.doc);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    openReportControlSelection() {
        this.dispatchEvent(newWizardEvent(() => selectReportControlWizard(this.doc.documentElement)));
    }
    openGseControlSelection() {
        this.dispatchEvent(newWizardEvent(() => selectGseControlWizard(this.doc.documentElement)));
    }
    openSampledValueControlSelection() {
        this.dispatchEvent(newWizardEvent(() => selectSampledValueControlWizard(this.doc.documentElement)));
    }
    toggleShowIEDs() {
        if (shouldShowIEDs())
            setShowIEDs('off');
        else
            setShowIEDs('on');
        this.requestUpdate();
    }
    toggleShowFunctions() {
        if (shouldShowFunctions())
            setShowFunctions('off');
        else
            setShowFunctions('on');
        this.requestUpdate();
    }
    renderIedContainer() {
        this.getAttachedIeds = shouldShowIEDs()
            ? getAttachedIeds(this.doc)
            : () => [];
        const ieds = this.getAttachedIeds?.(this.doc.documentElement) ?? [];
        return ieds.length
            ? html `<div id="iedcontainer">
          ${ieds.map(ied => html `<ied-editor
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${ied}
              ></ied-editor>`)}
        </div>`
            : html ``;
    }
    renderSubstation() {
        return this.doc?.querySelector(':root > Substation')
            ? html `<section>
          ${Array.from(this.doc.querySelectorAll('Substation') ?? [])
                .filter(isPublic)
                .map(substation => html `<substation-editor
                  .editCount=${this.editCount}
                  .doc=${this.doc}
                  .element=${substation}
                  .getAttachedIeds=${this.getAttachedIeds}
                  ?readonly=${this.readonly}
                  ?showfunctions=${shouldShowFunctions()}
                ></substation-editor>`)}
        </section>`
            : !this.doc?.querySelector(':root > Line, :root > Process')
                ? html `<h1>
          <span style="color: var(--base1)">${get('substation.missing')}</span>
        </h1>`
                : html ``;
    }
    renderLines() {
        return this.doc?.querySelector(':root > Line')
            ? html `<section>
          ${Array.from(this.doc.querySelectorAll('Line') ?? [])
                .filter(isPublic)
                .map(line => html `<line-editor
                  .editCount=${this.editCount}
                  .doc=${this.doc}
                  .element=${line}
                  .getAttachedIeds=${this.getAttachedIeds}
                  ?readonly=${this.readonly}
                  ?showfunctions=${shouldShowFunctions()}
                ></line-editor>`)}
        </section>`
            : html ``;
    }
    renderProcesses() {
        return this.doc?.querySelector(':root > Process')
            ? html `<section>
          ${Array.from(this.doc.querySelectorAll(':root > Process') ?? [])
                .filter(isPublic)
                .map(process => html `<process-editor
                  .editCount=${this.editCount}
                  .doc=${this.doc}
                  .element=${process}
                  .getAttachedIeds=${this.getAttachedIeds}
                  ?readonly=${this.readonly}
                  ?showfunctions=${shouldShowFunctions()}
                ></process-editor>`)}
        </section>`
            : html ``;
    }
    openCreateWizard(tagName) {
        const wizard = wizards[tagName].create(this.doc.documentElement);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    renderAddButtons() {
        return childTags(this.doc.documentElement).map(child => html `<mwc-list-item value="${child}"
          ><span>${child}</span></mwc-list-item
        >`);
    }
    updated() {
        if (this.addMenu && this.addButton)
            this.addMenu.anchor = this.addButton;
    }
    render() {
        return html ` <h1>
        <nav>
          <abbr slot="action" title="${get('add')}">
            <mwc-icon-button
              icon="playlist_add"
              @click=${() => (this.addMenu.open = true)}
            ></mwc-icon-button
            ><mwc-menu
              corner="BOTTOM_RIGHT"
              @action=${(e) => {
            const tagName = e.target.selected.value;
            this.openCreateWizard(tagName);
        }}
              >${this.renderAddButtons()}</mwc-menu
            ></abbr
          >
        </nav>
        <nav>
          <abbr title="${get('zeroline.showieds')}">
            <mwc-icon-button-toggle
              ?on=${shouldShowIEDs()}
              @click=${() => this.toggleShowIEDs()}
              id="showieds"
              onIcon="developer_board"
              offIcon="developer_board_off"
            ></mwc-icon-button-toggle>
          </abbr>
          <abbr title="${get('zeroline.showfunctions')}">
            <mwc-icon-button-toggle
              ?on=${shouldShowFunctions()}
              @click=${() => this.toggleShowFunctions()}
              id="showfunctions"
              onIcon="layers"
              offIcon="layers_clear"
            ></mwc-icon-button-toggle>
          </abbr>
          <abbr title="${get('zeroline.commmap')}">
            <mwc-icon-button
              id="commmap"
              icon="link"
              @click=${() => this.openCommunicationMapping()}
            ></mwc-icon-button>
          </abbr>
          <abbr title="${get('zeroline.reportcontrol')}"
            ><mwc-icon-button
              id="reportcontrol"
              @click="${() => this.openReportControlSelection()}"
              >${reportIcon}</mwc-icon-button
            ></abbr
          >
          <abbr title="${get('zeroline.gsecontrol')}"
            ><mwc-icon-button
              id="gsecontrol"
              @click="${() => this.openGseControlSelection()}"
              >${gooseIcon}</mwc-icon-button
            ></abbr
          >
          <abbr title="${get('zeroline.smvcontrol')}"
            ><mwc-icon-button
              id="smvcontrol"
              @click="${() => this.openSampledValueControlSelection()}"
              >${smvIcon}</mwc-icon-button
            ></abbr
          >
        </nav>
      </h1>
      ${this.renderIedContainer()}
      ${this.renderSubstation()}${this.renderLines()}${this.renderProcesses()}`;
    }
};
ZerolinePane.styles = css `
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
      transition: background-color 150ms linear;
    }

    h1 > nav,
    h1 > abbr > mwc-icon-button {
      float: right;
    }

    section {
      padding: 8px 12px 16px;
      display: grid;
      gap: 12px;
    }

    abbr {
      text-decoration: none;
      border-bottom: none;
    }

    #iedcontainer {
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(128px, auto));
    }
  `;
__decorate([
    property({ attribute: false })
], ZerolinePane.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], ZerolinePane.prototype, "editCount", void 0);
__decorate([
    property({ type: Boolean })
], ZerolinePane.prototype, "readonly", void 0);
__decorate([
    property({ attribute: false })
], ZerolinePane.prototype, "getAttachedIeds", void 0);
__decorate([
    query('#commmap')
], ZerolinePane.prototype, "commmap", void 0);
__decorate([
    query('#showieds')
], ZerolinePane.prototype, "showieds", void 0);
__decorate([
    query('#showfunctions')
], ZerolinePane.prototype, "showfunctions", void 0);
__decorate([
    query('#gsecontrol')
], ZerolinePane.prototype, "gsecontrol", void 0);
__decorate([
    query('#smvcontrol')
], ZerolinePane.prototype, "smvcontrol", void 0);
__decorate([
    query('#reportcontrol')
], ZerolinePane.prototype, "reportcontrol", void 0);
__decorate([
    query('#createsubstation')
], ZerolinePane.prototype, "createsubstation", void 0);
__decorate([
    query('mwc-menu')
], ZerolinePane.prototype, "addMenu", void 0);
__decorate([
    query('mwc-icon-button[icon="playlist_add"]')
], ZerolinePane.prototype, "addButton", void 0);
ZerolinePane = __decorate([
    customElement('zeroline-pane')
], ZerolinePane);
export { ZerolinePane };
//# sourceMappingURL=zeroline-pane.js.map