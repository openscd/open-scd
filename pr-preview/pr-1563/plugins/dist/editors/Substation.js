import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { LitElement, html, property, css } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import '../../../_snowpack/pkg/@material/mwc-fab.js';
import './substation/zeroline-pane.js';
import { newWizardEvent } from '../../../openscd/src/foundation.js';
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