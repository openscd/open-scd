var WizardHost_1;
import { __decorate } from "tslib";
import { createRef, ref } from 'lit/directives/ref.js';
import { css, html, LitElement } from 'lit';
import { customElement, eventOptions, property, state, } from 'lit/decorators.js';
import { html as staticHtml, unsafeStatic } from 'lit/static-html.js';
import { spread } from '@open-wc/lit-helpers';
import { pluginTag } from './Plugging.js';
import '@material/mwc-dialog';
import '../components/card.js';
function isWizardingClass(c) {
    if (!c) {
        return false;
    }
    return Boolean(c.canInspect && c.canCreate);
}
const TAG_NAME = 'oscd-wizard-host';
let WizardHost = WizardHost_1 = class WizardHost extends LitElement {
    constructor() {
        super(...arguments);
        this.wizards = [];
        this.activeWizardProps = {};
        this.activeWizards = [];
        this.activeWizardPropsList = [];
        this.dialogRef = createRef();
        // Declare reactive properties
        this.name = 'World';
    }
    render() {
        return html `
      <slot
        @oscd-wizard-creation-request=${this.handleWizardCreationRequest}
        @oscd-wizard-inspection-request=${this.handleWizardInspectionRequest}
      ></slot>

      ${this.renderActiveWizards()}
    `;
    }
    renderActiveWizards() {
        if (this.activeWizards.length === 0 ||
            this.activeWizardPropsList.length === 0 ||
            this.activeWizards.length !== this.activeWizardPropsList.length) {
            return html ``;
        }
        return html `
      <dialog
        open
        @click=${this.handleBackdropClick}
        @keypress=${() => { }}
        @oscd-wizard-finished=${this.handleWizardFinished}
      >
        ${this.activeWizards.map((wizard, i) => {
            const stackLevel = this.activeWizards.length - i - 1;
            return WizardHost_1.renderActiveWizard2(wizard, this.activeWizardPropsList[i], stackLevel);
        })}
      </dialog>
    `;
    }
    static renderActiveWizard2(wizard, wizardProps, stackLevel = 0) {
        if (!wizard || !wizardProps) {
            return html ``;
        }
        const tagName = pluginTag(wizard.src);
        const props = {
            '.element': wizardProps.element,
            '.tagName': wizardProps.tagName,
            '.parent': wizardProps.parent,
        };
        const renderedWizard = staticHtml `<${unsafeStatic(tagName)} ${spread(props)}></${unsafeStatic(tagName)}>`;
        return html `
      <oscd-card stackLevel=${stackLevel}> ${renderedWizard} </oscd-card>
    `;
    }
    renderActiveWizard(wizard, wizardProps) {
        if (!wizard || !wizardProps) {
            return html ``;
        }
        const tagName = pluginTag(wizard.src);
        const props = {
            '.element': wizardProps.element,
            '.tagName': wizardProps.tagName,
            '.parent': wizardProps.parent,
        };
        const renderedWizard = staticHtml `<${unsafeStatic(tagName)} ${spread(props)}></${unsafeStatic(tagName)}>`;
        // we use mwc-dialog to get the "card" visual,
        // because there is no component for it
        return html `
      <dialog
        open
        @click=${this.handleBackdropClick}
        @keypress=${() => { }}
        @oscd-wizard-finished=${this.handleWizardFinished}
      >
        <mwc-dialog
          ${ref(this.dialogRef)}
          open
          scrimClickAction=""
          hideActions
          class="no-bg"
        >
          <div>${renderedWizard}</div>
        </mwc-dialog>
      </dialog>
    `;
    }
    handleBackdropClick(e) {
        const isTargetTheBackdrop = this.dialogRef.value === e.target;
        if (!isTargetTheBackdrop) {
            return;
        }
        this.handleWizardFinished();
    }
    handleWizardCreationRequest(e) {
        var _a;
        const tagName = e.detail.tagName;
        console.log({ level: 'dev', msg: 'wizarding creation', e });
        const availableWizards = (_a = this.wizards) === null || _a === void 0 ? void 0 : _a.filter(w => WizardHost_1.doesWizardSupportCreation(tagName, w));
        if ((availableWizards === null || availableWizards === void 0 ? void 0 : availableWizards.length) === 0) {
            console.warn({
                level: 'warn',
                msg: 'no wizards available for creation, stopping',
                tagName,
            });
            return;
        }
        const newActiveWizard = availableWizards === null || availableWizards === void 0 ? void 0 : availableWizards[availableWizards.length - 1];
        if (!newActiveWizard) {
            console.warn({
                level: 'warn',
                msg: 'could not retrieve last wizard, stopping',
                tagName,
            });
            return;
        }
        // might need to set them at the same time
        this.activeWizardProps = e.detail;
        this.activeWizard = newActiveWizard;
        this.activeWizards.push(newActiveWizard);
        this.activeWizardPropsList.push(e.detail);
    }
    handleWizardInspectionRequest(e) {
        var _a;
        const el = e.detail.element;
        const { tagName } = el;
        const availableWizards = (_a = this.wizards) === null || _a === void 0 ? void 0 : _a.filter(w => WizardHost_1.doesWizardSupportInspection(tagName, w));
        if ((availableWizards === null || availableWizards === void 0 ? void 0 : availableWizards.length) === 0) {
            console.warn({
                level: 'warn',
                msg: 'no wizards available for inspection, stopping',
                tagName,
            });
            return;
        }
        const newActiveWizard = availableWizards === null || availableWizards === void 0 ? void 0 : availableWizards[availableWizards.length - 1];
        if (!newActiveWizard) {
            console.warn({
                level: 'warn',
                msg: 'could not retrieve last wizard, stopping',
                tagName,
            });
            return;
        }
        // might need to set them at the same time
        this.activeWizardProps = e.detail;
        this.activeWizard = newActiveWizard;
        this.activeWizards.push(newActiveWizard);
        this.activeWizardPropsList.push(e.detail);
    }
    handleWizardFinished() {
        this.activeWizards.pop();
        this.activeWizardPropsList.pop();
        this.requestUpdate();
        // this.activeWizard = undefined;
    }
    static doesWizardSupportInspection(tagName, wizard) {
        const wizardClass = WizardHost_1.extractWizardClass(wizard);
        if (!wizardClass) {
            return false;
        }
        const supportsInspection = wizardClass === null || wizardClass === void 0 ? void 0 : wizardClass.canInspect(tagName);
        return supportsInspection;
    }
    static doesWizardSupportCreation(tagName, wizard) {
        const wizardClass = WizardHost_1.extractWizardClass(wizard);
        if (!wizardClass) {
            return false;
        }
        const supportsCreation = wizardClass === null || wizardClass === void 0 ? void 0 : wizardClass.canCreate(tagName);
        return supportsCreation;
    }
    static extractWizardClass(wizard) {
        const wizardTag = pluginTag(wizard.src);
        const wizardClass = customElements.get(wizardTag);
        if (!wizardClass) {
            console.log({
                level: 'warn',
                msg: 'wizard not found',
                wizardTag,
                src: wizard.src,
            });
            return undefined;
        }
        if (!isWizardingClass(wizardClass)) {
            console.log({
                level: 'warn',
                msg: 'wizard is not a wizarding class',
                wizardClass,
                wizardTag,
                src: wizard.src,
            });
            return undefined;
        }
        return wizardClass;
    }
};
WizardHost.styles = css `
    :host {
      color: blue;
    }

    dialog {
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      background: #0000004a;
      z-index: 1000;
      opacity: 1;
      backdrop-filter: blur(2px);
      outline: none;
      border: none;
    }

    .no-bg {
      --mdc-dialog-scrim-color: none;
    }
  `;
__decorate([
    property({ type: Array })
], WizardHost.prototype, "wizards", void 0);
__decorate([
    state()
], WizardHost.prototype, "activeWizard", void 0);
__decorate([
    state()
], WizardHost.prototype, "activeWizardProps", void 0);
__decorate([
    state()
], WizardHost.prototype, "activeWizards", void 0);
__decorate([
    state()
], WizardHost.prototype, "activeWizardPropsList", void 0);
__decorate([
    eventOptions({ capture: true })
], WizardHost.prototype, "handleBackdropClick", null);
__decorate([
    property()
], WizardHost.prototype, "name", void 0);
WizardHost = WizardHost_1 = __decorate([
    customElement(TAG_NAME)
], WizardHost);
export { WizardHost };
//# sourceMappingURL=Wizarding.js.map