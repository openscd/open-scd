import { __decorate } from "tslib";
import { LitElement, html, property, css } from 'lit-element';
import { get } from 'lit-translate';
import '@material/mwc-fab';
import './substation/zeroline-pane.js';
import { newWizardEvent } from '../foundation.js';
import { wizards } from '../wizards/wizard-library.js';
/** An editor [[`plugin`]] for editing the `Substation` section. */
export default class SubstationPlugin extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
    }
    /** Opens a [[`WizardDialog`]] for creating a new `Substation` element. */
    openCreateSubstationWizard() {
        const wizard = wizards['Substation'].create(this.doc.documentElement);
        if (wizard)
            this.dispatchEvent(newWizardEvent(wizard));
    }
    render() {
        return html ` <zeroline-pane
        .editCount=${this.editCount}
        .doc=${this.doc}
      ></zeroline-pane>
      ${!this.doc?.querySelector(':root > Substation, :root > Line, :root > Process')
            ? html `<h1>
            <mwc-fab
              extended
              icon="add"
              label="${get('substation.wizard.title.add')}"
              @click=${() => this.openCreateSubstationWizard()}
            ></mwc-fab>
          </h1>`
            : html ``}`;
    }
}
SubstationPlugin.styles = css `
    mwc-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
    }

    :host {
      width: 100vw;
    }
  `;
__decorate([
    property()
], SubstationPlugin.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], SubstationPlugin.prototype, "editCount", void 0);
//# sourceMappingURL=Substation.js.map