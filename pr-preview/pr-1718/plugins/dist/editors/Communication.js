import { __decorate } from "../../../_snowpack/pkg/tslib.js";
import { LitElement, html, property, css } from '../../../_snowpack/pkg/lit-element.js';
import { get } from '../../../_snowpack/pkg/lit-translate.js';
import '../../../_snowpack/pkg/@material/mwc-fab.js';
import './communication/subnetwork-editor.js';
import { newWizardEvent, isPublic } from '../../../openscd/src/foundation.js';
import { createElement } from '../../../_snowpack/link/packages/xml/dist/index.js';
import { newActionEvent } from '../../../_snowpack/link/packages/core/dist/foundation/deprecated/editor.js';
import { createSubNetworkWizard } from '../wizards/subnetwork.js';
/** An editor [[`plugin`]] for editing the `Communication` section. */
export default class CommunicationPlugin extends LitElement {
    constructor() {
        super(...arguments);
        this.editCount = -1;
    }
    /**
     * Creates the Communication Element and returns the created Element
     * @returns {Element} Communication `Element`
     */
    createCommunication() {
        const element = createElement(this.doc, 'Communication', {});
        this.dispatchEvent(newActionEvent({
            new: {
                parent: this.doc.documentElement,
                element: element,
            },
        }));
        return element;
    }
    /** Opens a [[`WizardDialog`]] for creating a new `SubNetwork` element. */
    openCreateSubNetworkWizard() {
        const parent = this.doc.querySelector(':root > Communication') ||
            this.createCommunication();
        this.dispatchEvent(newWizardEvent(createSubNetworkWizard(parent)));
    }
    render() {
        if (!this.doc?.querySelector(':root > Communication >SubNetwork'))
            return html `<h1>
        <span style="color: var(--base1)">${get('communication.missing')}</span
        ><mwc-fab
          extended
          icon="add"
          label="${get('subnetwork.wizard.title.add')}"
          @click=${() => this.openCreateSubNetworkWizard()}
        ></mwc-fab>
      </h1>`;
        return html `<mwc-fab
        extended
        icon="add"
        label="${get('subnetwork.wizard.title.add')}"
        @click=${() => this.openCreateSubNetworkWizard()}
      ></mwc-fab>
      <section>
        ${Array.from(this.doc.querySelectorAll('SubNetwork') ?? [])
            .filter(isPublic)
            .map(subnetwork => html `<subnetwork-editor
                .editCount=${this.editCount}
                .doc=${this.doc}
                .element=${subnetwork}
              ></subnetwork-editor>`)}
      </section> `;
    }
}
CommunicationPlugin.styles = css `
    :host {
      width: 100vw;
    }

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

    section {
      outline: none;
      padding: 8px 12px 16px;
    }

    subnetwork-editor {
      margin: 8px 12px 16px;
    }

    mwc-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
    }
  `;
__decorate([
    property()
], CommunicationPlugin.prototype, "doc", void 0);
__decorate([
    property({ type: Number })
], CommunicationPlugin.prototype, "editCount", void 0);
//# sourceMappingURL=Communication.js.map